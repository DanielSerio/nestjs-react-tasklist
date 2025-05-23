import { Box, Flex } from "@mantine/core";
import { EditTableHeader } from "./EditTableHeader";
import { EditTableBody } from "./EditTableBody";
import {
  EditTableProvider,
  type EditTableEndpoint,
} from "./edit-table.provider";

export function EditTable({ endpoint }: { endpoint: EditTableEndpoint }) {
  return (
    <EditTableProvider endpoint={endpoint}>
      <Box className={`edit-table ${endpoint}`}>
        <Flex className="edit-table-container" direction="column">
          <EditTableHeader />
          <EditTableBody />
        </Flex>
      </Box>
    </EditTableProvider>
  );
}
