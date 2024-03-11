import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoredState, setStoredState } from "./utils";
import {
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
  Chip,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const CryptolensKeyResponse = z.object({
  licenseKey: z.object({
    key: z.string(),
    expires: z.coerce.date(),
  }),
});

type CryptolensKeyResponse = z.infer<typeof CryptolensKeyResponse>;

type FormValues = {
  licenseKey: string;
};

export const LicenseKeySettings = () => {
  const queryClient = useQueryClient();

  const storedStateQuery = useQuery({
    queryKey: ["storedStateQuery"],
    queryFn: getStoredState,
  });

  const storedStateMutation = useMutation({
    mutationFn: setStoredState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storedStateQuery"] });
    },
  });

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { licenseKey: "" },
  });

  const [cryptolensKey, setCryptolensKey] = useState("");

  const cryptolensKeyQuery = useQuery({
    queryKey: ["cryptolensKey", cryptolensKey],
    queryFn: () =>
      fetch(
        `https://app.cryptolens.io/api/key/GetKey?token=WyI3NjEwOTAxMSIsIndLSy9lK2dKQXZvWnVuQk1ZVXpzYXh3SEp3Q0pMU05DVXlPcHVhZUEiXQ==&ProductId=8245&Key=${cryptolensKey}&Sign=True`
      )
        .then((response) => response.json())
        .then((data) => CryptolensKeyResponse.parse(data))
        .then(({ licenseKey }) => {
          if (storedStateQuery.data) {
            storedStateMutation.mutate({
              ...storedStateQuery.data,
              extensionSettings: {
                cryptolens: {
                  key: licenseKey.key,
                  expiresAt: licenseKey.expires.getTime(),
                },
              },
            });
          }

          reset();
          setCryptolensKey("");
        }),
    enabled: cryptolensKey.length > 0,
    retry: 1,
    refetchOnWindowFocus: false,
  });

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

  return (
    <Stack spacing="xs">
      {storedStateQuery.data.extensionSettings.cryptolens !== undefined ? (
        <>
          <Stack spacing={0}>
            <Title order={6}>Activated License Key</Title>
            <Text size="sm">
              {storedStateQuery.data.extensionSettings.cryptolens.key}
            </Text>
            <Title order={6}>Status</Title>
            <Box>
              {storedStateQuery.data.extensionSettings.cryptolens.expiresAt <
              new Date().getTime() ? (
                <Badge color="orange" variant="filled">
                  Expired
                </Badge>
              ) : (
                <Badge color="green" variant="filled">
                  Valid
                </Badge>
              )}
            </Box>
          </Stack>
          <Button
            variant="light"
            color="red"
            leftIcon={<IconTrash size="1rem" />}
            onClick={() =>
              storedStateMutation.mutate({
                ...storedStateQuery.data,
                extensionSettings: {},
              })
            }
          >
            Remove
          </Button>
        </>
      ) : (
        <>
          <Text size="sm">
            Activate a license key to gain full access to the extension. Don't
            have a license key? Obtain one <Anchor target="_blank">here</Anchor>
            .
          </Text>
          <form
            onSubmit={handleSubmit((data) => setCryptolensKey(data.licenseKey))}
          >
            <Stack spacing="xs">
              <TextInput
                label="License Key"
                {...register("licenseKey")}
                required
                disabled={cryptolensKeyQuery.isFetching}
                error={cryptolensKeyQuery.isError && "Invalid license key"}
              />
              <Button type="submit" loading={cryptolensKeyQuery.isFetching}>
                Activate
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
};
