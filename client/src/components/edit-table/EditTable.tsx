import { Box, Flex } from "@mantine/core";
import { EditTableHeader } from "./EditTableHeader";
import { EditTableBody } from "./EditTableBody";
import { EditTableProvider } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";

export function EditTable({ endpoint }: { endpoint: EditTableEndpoint }) {
  return (
    <EditTableProvider endpoint={endpoint}>
      <Box className={`edit-table ${endpoint}`}>
        <Flex className="edit-table-container" direction="column">
          <EditTableHeader endpoint={endpoint} />
          <EditTableBody endpoint={endpoint} />
        </Flex>
      </Box>
    </EditTableProvider>
  );
}
