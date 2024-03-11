import { Box, Container, Tabs } from "@mantine/core";
import { IconColumns3, IconKey } from "@tabler/icons-react";
import { ColumnSettings } from "./ColumnSettings";

import "./popup.css";
import { LicenseKeySettings } from "./LicenseKeySettings";

export const Popup = () => {
  return (
    <Tabs defaultValue="column-settings">
      <Tabs.List>
        <Tabs.Tab
          value="column-settings"
          w="50%"
          icon={<IconColumns3 size="0.875rem" />}
        >
          Column
        </Tabs.Tab>
        <Tabs.Tab
          value="license-key-settings"
          w="50%"
          icon={<IconKey size="0.875rem" />}
        >
          License Key
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="column-settings">
        <Container fluid>
          <Box pt="md" pb="md">
            <ColumnSettings />
          </Box>
        </Container>
      </Tabs.Panel>

      <Tabs.Panel value="license-key-settings">
        <Container fluid>
          <Box pt="md" pb="md">
            <LicenseKeySettings />
          </Box>
        </Container>
      </Tabs.Panel>
    </Tabs>
  );
};
