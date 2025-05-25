import { Box, Flex } from "@mantine/core";
import { EditTableHeader } from "./EditTableHeader";
import { EditTableBody } from "./EditTableBody";
import { EditTableProvider } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";
import { EditTableConfigModal } from "./modal/EditTableConfigModal";
import { useDisclosure } from "@mantine/hooks";

export function EditTable({ endpoint }: { endpoint: EditTableEndpoint }) {
  const configModalController = useDisclosure();
  const [isOpen, { close, open }] = configModalController;

  return (
    <EditTableProvider endpoint={endpoint}>
      <EditTableConfigModal isOpen={isOpen} close={close} />
      <Box className={`edit-table ${endpoint}`}>
        <Flex className="edit-table-container" direction="column">
          <EditTableHeader
            endpoint={endpoint}
            launchConfigModal={() => open()}
          />
          <EditTableBody endpoint={endpoint} />
        </Flex>
      </Box>
    </EditTableProvider>
  );
}
