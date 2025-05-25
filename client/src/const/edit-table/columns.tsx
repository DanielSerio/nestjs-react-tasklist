import { type ColumnDef } from "@tanstack/react-table";

import type { TaskCategory, TaskStatus } from "#types/task.types";
import type { Pretty } from "#types/utility.types";

export type EditTableEntity = Pretty<TaskStatus & TaskCategory>;

type ColumnDefWithMeta = ColumnDef<EditTableEntity> & {
  meta?: {
    align?: "left" | "center" | "right";
  };
};

const defaultColumns: ColumnDefWithMeta[] = [
  {
    header: "ID",
    accessorKey: "id",
    id: "id",
    size: 30,
    enableResizing: false,
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      align: "center",
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    id: "name",
    size: 250,
    enableResizing: false,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    id: "createdAt",
    accessorFn: (row) => row.createdAt.toLocaleString(),
    size: 120,
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    id: "updatedAt",
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
