import { type ColumnDef } from "@tanstack/react-table";

import type { TaskCategory, TaskStatus } from "#types/task.types";
import type { Pretty } from "#types/utility.types";

export type EditTableEntity = Pretty<TaskStatus & TaskCategory>;

const defaultColumns: ColumnDef<EditTableEntity>[] = [
  {
    header: "ID",
    accessorKey: "id",
    size: 30,
    enableResizing: false,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    size: 250,
    enableResizing: false,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    accessorFn: (row) => row.createdAt.toLocaleString(),
    size: 120,
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    accessorFn: (row) =>
      row.updatedAt ? row.updatedAt.toLocaleString() : null,
    size: 120,
  },
  {
    header: "Actions",
    id: "actions",
    size: 60,
  },
];

export const EDIT_TABLE_COLUMNS = {
  categories: [...defaultColumns],
  statuses: [...defaultColumns],
} as const;
