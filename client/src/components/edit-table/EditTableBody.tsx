import { ActionIcon, Box, Text } from "@mantine/core";
import { LayoutHelpers } from "#utilities/layout.helpers";
import { useEditTableContext } from "./edit-table.provider";
import { EditTableSkeletonRow } from "./EditTableSkeletonRow";
import type { EditTableEndpoint } from "./edit-table.provider.types";
import { EditTableRow } from "./EditTableRow";
import { EditTableCell } from "./EditTableCell";
import type { ReactNode } from "react";
import { TbTrash } from "react-icons/tb";
import { PseudoLink } from "#components/core/utility/PseudoLink";

export function EditTableBody({ endpoint }: { endpoint: EditTableEndpoint }) {
  const [{ table, query }] = useEditTableContext();
  const { gridTemplateColumns } = LayoutHelpers.getGridColumnProfile(
    table.getAllColumns().map((col) => col.columnDef)
  );

  if (query.isLoading && table.getRowModel().rows.length === 0) {
    return (
      <Box className="edit-table-body">
        <EditTableSkeletonRow
          endpoint={endpoint}
          gridTemplateColumns={gridTemplateColumns}
        />
        <EditTableSkeletonRow
          endpoint={endpoint}
          gridTemplateColumns={gridTemplateColumns}
        />
        <EditTableSkeletonRow
          endpoint={endpoint}
          gridTemplateColumns={gridTemplateColumns}
        />
        <EditTableSkeletonRow
          endpoint={endpoint}
          gridTemplateColumns={gridTemplateColumns}
        />
        <EditTableSkeletonRow
          endpoint={endpoint}
          gridTemplateColumns={gridTemplateColumns}
        />
      </Box>
    );
  }

  if (!query.isLoading && table.getRowModel().rows.length === 0) {
    return (
      <Box className="edit-table-body">
        <Text lh={"96px"} size="xl" ta="center" c="hsla(145,3%,80%,0.5)">
          No Records Found
        </Text>
      </Box>
    );
  }

  return (
    <Box className="edit-table-body">
      {table.getRowModel().rows.map((row) => {
        return (
          <EditTableRow key={row.id} gridTemplateColumns={gridTemplateColumns}>
            {row.getVisibleCells().map((cell) => {
              const columnID = cell.getContext().column.columnDef.id;

              if (columnID === "actions") {
                return (
                  <EditTableCell
                    key={cell.id}
                    label={cell.column.columnDef.header as string}
                  >
                    <ActionIcon mt={3} size="xs" color="red" variant="subtle">
                      <TbTrash />
                    </ActionIcon>
                  </EditTableCell>
                );
              }

              return (
                <EditTableCell
                  key={cell.id}
                  label={cell.column.columnDef.header as string}
                >
                  <PseudoLink>{cell.renderValue() as ReactNode}</PseudoLink>
                </EditTableCell>
              );
            })}
          </EditTableRow>
        );
      })}
    </Box>
  );
}
