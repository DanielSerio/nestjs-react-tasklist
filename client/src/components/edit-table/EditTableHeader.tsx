import { Flex } from "@mantine/core";
import { EditTableColumnHeaders } from "./EditTableColumnHeaders";
import { EditTableToolBar } from "./EditTableToolBar";
import { useEditTableContext } from "./edit-table.provider";

export function EditTableHeader() {
  const [{ table }] = useEditTableContext();

  return (
    <Flex direction="column" component="header">
      <EditTableToolBar />
      <EditTableColumnHeaders table={table} />
    </Flex>
  );
}
