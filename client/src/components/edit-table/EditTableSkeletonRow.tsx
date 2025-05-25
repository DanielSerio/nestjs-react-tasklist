import { EDIT_TABLE_COLUMNS } from "#const/edit-table";
import { Skeleton } from "@mantine/core";
import type { EditTableEndpoint } from "./edit-table.provider.types";
import { EditTableCell } from "./EditTableCell";
import { EditTableRow, type EditTableRowProps } from "./EditTableRow";

export interface EditTableSkeletonRowProps extends EditTableRowProps {
  endpoint: EditTableEndpoint;
}

export function EditTableSkeletonRow({
  endpoint,
  ...props
}: EditTableSkeletonRowProps) {
  return (
    <EditTableRow className="skeleton" {...props}>
      {EDIT_TABLE_COLUMNS[endpoint].map((column) => {
        return (
          <EditTableCell
            align={column.meta?.align}
            label={column.header as string}
            key={column.id}
          >
            <Skeleton style={{ flex: 1 }} h={18} w={column.size} />
          </EditTableCell>
        );
      })}
    </EditTableRow>
  );
}
