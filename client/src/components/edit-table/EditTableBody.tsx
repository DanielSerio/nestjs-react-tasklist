import { Box, Text } from "@mantine/core";
import { useEditTableContext } from "./edit-table.provider";

export function EditTableBody() {
  const [{ table, query }] = useEditTableContext();

  if (!query.isLoading && table.getRowModel().rows.length === 0) {
    return (
      <Box className="edit-table-body">
        <Text size="xl" ta="center" c="hsla(145,3%,80%,0.5)">
          No Records Found
        </Text>
      </Box>
    );
  }

  return (
    <Box className="edit-table-body">
      <div>EditTableBody</div>
    </Box>
  );
}
