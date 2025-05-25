import { Box, Flex } from "@mantine/core";
import { EditTableHeader } from "./EditTableHeader";
import { EditTableBody } from "./EditTableBody";
import { EditTableProvider } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";
import { EditTableConfigModal } from "./modal/EditTableConfigModal";
import { useDisclosure } from "@mantine/hooks";
import { useEditTableDrawer } from "#hooks/edit-table/useEditTableDrawer";
import { EditTableDrawer } from "./drawer/EditTableDrawer";

export function EditTable({ endpoint }: { endpoint: EditTableEndpoint }) {
  const configModalController = useDisclosure();
  const [isOpen, { close, open }] = configModalController;
  const drawerController = useEditTableDrawer({ endpoint });
  const launchCreateDrawer = () => {
    const methods = drawerController[1];

    methods.openDrawer({
      mode: "create",
    });
  };

  return (
    <EditTableProvider endpoint={endpoint}>
      <EditTableConfigModal isOpen={isOpen} close={close} />
      <EditTableDrawer controller={drawerController} />
      <Box className={`edit-table ${endpoint}`}>
        <Flex className="edit-table-container" direction="column">
          <EditTableHeader
            endpoint={endpoint}
            launchConfigModal={() => open()}
            launchCreateDrawer={launchCreateDrawer}
          />
          <EditTableBody endpoint={endpoint} />
        </Flex>
      </Box>
    </EditTableProvider>
  );
}
