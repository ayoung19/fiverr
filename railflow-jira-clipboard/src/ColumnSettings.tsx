import {
  Alert,
  Button,
  Center,
  Checkbox,
  Group,
  TextInput,
  LoadingOverlay,
  Stack,
  Title,
  Text,
  Box,
  Space,
  ActionIcon,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  StoredState,
  getStoredState,
  getTransformedCsv,
  setStoredState,
} from "./utils";
import {
  IconAlertCircle,
  IconCircleX,
  IconInfoCircle,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const updateStoredState = async (storedState: Required<StoredState>) => {
  await chrome.runtime.sendMessage({
    type: "forwardCopy",
    value: getTransformedCsv(storedState),
  });

  await setStoredState(storedState);
};

export const ColumnSettings = () => {
  const queryClient = useQueryClient();

  const storedStateQuery = useQuery({
    queryKey: ["storedStateQuery"],
    queryFn: getStoredState,
  });

  const storedStateMutation = useMutation({
    mutationFn: updateStoredState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storedStateQuery"] });
    },
  });

  const [inputValue, setInputValue] = useState("");

  if (storedStateQuery.isLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  if (storedStateQuery.isError) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        {String(storedStateQuery.error)}
      </Alert>
    );
  }

  const { originalCsv, project, projectToColumnSettings, ...rest } =
    storedStateQuery.data;

  if (originalCsv === undefined || project == undefined) {
    return (
      <Alert icon={<IconInfoCircle size="1rem" />} title="Warning!">
        Copy CSV using the extension to change column options.
      </Alert>
    );
  }

  const columnSettings = Object.entries(projectToColumnSettings[project]).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  const selectedColumns = columnSettings
    .filter(([_, v]) => v)
    .filter(([k, _]) =>
      k.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    );
  const unselectedColumns = columnSettings
    .filter(([_, v]) => !v)
    .filter(([k, _]) =>
      k.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    );

  return (
    <Stack spacing="xs">
      <Title order={6}>Project: Test</Title>
      <TextInput
        icon={<IconSearch size="1rem" />}
        placeholder="Search column options"
        label="Column options"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        rightSection={
          inputValue.length > 0 && (
            <ActionIcon size="sm" onClick={() => setInputValue("")}>
              <IconCircleX size="0.875rem" />
            </ActionIcon>
          )
        }
      />
      <Box h={400} sx={{ overflowY: "scroll" }}>
        <Stack spacing={0}>
          {inputValue.length === 0 && selectedColumns.length > 0 && (
            <Text size="xs" fw={700}>
              Selected Columns
            </Text>
          )}
          {selectedColumns.map(([k, v]) => (
            <Button
              variant="subtle"
              onClick={() => {
                if (selectedColumns.length === 1) {
                  notifications.show({
                    title: "Warning",
                    message: "At least one column must be selected.",
                  });
                } else {
                  storedStateMutation.mutate({
                    ...rest,
                    originalCsv,
                    project,
                    projectToColumnSettings: {
                      ...projectToColumnSettings,
                      [project]: {
                        ...projectToColumnSettings[project],
                        [k]: !projectToColumnSettings[project][k],
                      },
                    },
                  });
                }
              }}
              sx={{
                ".mantine-Button-inner": {
                  justifyContent: "flex-start",
                },
              }}
              fullWidth
            >
              <Group w="100%" noWrap>
                <Checkbox checked={v} readOnly />
                <Text truncate="end" sx={{ minWidth: 0 }}>
                  {k}
                </Text>
              </Group>
            </Button>
          ))}
          {inputValue.length === 0 && unselectedColumns.length > 0 && (
            <>
              <Space h="xs" />
              <Text size="xs" fw={700}>
                Unselected Columns
              </Text>
            </>
          )}
          {unselectedColumns
            .filter(([_, v]) => !v)
            .map(([k, v]) => (
              <Button
                variant="subtle"
                onClick={() =>
                  storedStateMutation.mutate({
                    ...rest,
                    originalCsv,
                    project,
                    projectToColumnSettings: {
                      ...projectToColumnSettings,
                      [project]: {
                        ...projectToColumnSettings[project],
                        [k]: !projectToColumnSettings[project][k],
                      },
                    },
                  })
                }
                sx={{
                  ".mantine-Button-inner": {
                    justifyContent: "flex-start",
                  },
                }}
                fullWidth
              >
                <Group w="100%" noWrap>
                  <Checkbox checked={v} readOnly />
                  <Text truncate="end" sx={{ minWidth: 0 }}>
                    {k}
                  </Text>
                </Group>
              </Button>
            ))}
          {selectedColumns.length + unselectedColumns.length === 0 && (
            <Center>
              <Text size="sm">No Columns Found</Text>
            </Center>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
