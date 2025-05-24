import { Flex } from "@mantine/core";
import type { useEditTableContext } from "./edit-table.provider";
import { EditTableCell } from "./EditTableCell";

export interface EditTableColumnHeadersProps {
  table: ReturnType<typeof useEditTableContext>[0]["table"];
}

export function EditTableColumnHeaders({ table }: EditTableColumnHeadersProps) {
  return (
    <Flex>
      {table.getFlatHeaders().map((header) => {
        const text = header.getContext().column.columnDef.header;

        return (
          <EditTableCell key={header.id} label={text as string}>
            {header.isPlaceholder ? null : (text as string)}
          </EditTableCell>
        );
      })}
    </Flex>
  );
}
