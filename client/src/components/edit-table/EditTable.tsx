import { Box, Flex } from "@mantine/core";
import { EditTableHeader } from "./EditTableHeader";
import { EditTableBody } from "./EditTableBody";
import { EditTableProvider } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";
import { EditTableConfigModal } from "./modal/EditTableConfigModal";
import { useDisclosure } from "@mantine/hooks";
import {
  useEditTableDrawer,
  type EditTableDeletePayload,
} from "#hooks/edit-table/useEditTableDrawer";
import { EditTableDrawer } from "./drawer/EditTableDrawer";
import type { EditTableEntity } from "#const/edit-table";

export function EditTable({ endpoint }: { endpoint: EditTableEndpoint }) {
  const configModalController = useDisclosure();
  const [isOpen, { close, open }] = configModalController;
  const drawerController = useEditTableDrawer({ endpoint });
  const methods = drawerController[1];

  const launchCreateDrawer = () =>
    methods.openDrawer({
      mode: "create",
    });

  const launchUpdateDrawer = (record: EditTableEntity) =>
    methods.openDrawer({
      mode: "update",
      payload: record,
    });

  const launchDeleteDrawer = (pl: EditTableDeletePayload) =>
    methods.openDrawer({
      mode: "delete",
      payload: pl,
    });

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
          <EditTableBody
            endpoint={endpoint}
            launchUpdateDrawer={launchUpdateDrawer}
            launchDeleteDrawer={launchDeleteDrawer}
          />
        </Flex>
      </Box>
    </EditTableProvider>
  );
}
