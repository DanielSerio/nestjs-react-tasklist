import { Flex } from "@mantine/core";
import { EditTableColumnHeaders } from "./EditTableColumnHeaders";
import { EditTableToolBar } from "./EditTableToolBar";
import { useEditTableContext } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";

export function EditTableHeader({ endpoint }: { endpoint: EditTableEndpoint }) {
  const [{ table }] = useEditTableContext();

  return (
    <Flex direction="column" component="header">
      <EditTableToolBar endpoint={endpoint} />
      <EditTableColumnHeaders table={table} />
    </Flex>
  );
}
