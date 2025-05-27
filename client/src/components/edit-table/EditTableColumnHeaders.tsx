import { Box } from "@mantine/core";
import type { useEditTableContext } from "./edit-table.provider";
import { EditTableCell } from "./EditTableCell";
import { LayoutHelpers } from "#utilities/layout.helpers";
import { EditTableSortControl } from "./EditTableSortControl";

export interface EditTableColumnHeadersProps {
  table: ReturnType<typeof useEditTableContext>[0]["table"];
  state: ReturnType<typeof useEditTableContext>[0]["state"];
  addSorting: (column: string, desc: boolean) => void;
  removeSorting: (column: string) => void;
}

export function EditTableColumnHeaders({
  table,
  state,
  addSorting,
  removeSorting,
}: EditTableColumnHeadersProps) {
  const { gridTemplateColumns } = LayoutHelpers.getGridColumnProfile(
    table.getAllColumns().map((col) => col.columnDef)
  );

  return (
    <Box className="column-headers" style={{ gridTemplateColumns }}>
      {table.getFlatHeaders().map((header) => {
        const text = header.getContext().column.columnDef.header;

        if (text === "Actions") {
          return (
            <EditTableCell key={header.id} label={text as string}>
              {header.isPlaceholder ? null : text}
            </EditTableCell>
          );
        }

        return (
          <EditTableCell key={header.id} label={text as string}>
            {header.isPlaceholder ? null : (
              <EditTableSortControl
                label={text as string}
                column={header.id}
                sort={state.sort}
                addSorting={addSorting}
                removeSorting={removeSorting}
              />
            )}
          </EditTableCell>
        );
      })}
    </Box>
  );
}
