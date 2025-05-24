import { ActionIcon, Box, Flex } from "@mantine/core";
import { TbMinus, TbSortAscending, TbSortDescending } from "react-icons/tb";
import { useEditTableContext } from "./edit-table.provider";
import { useCallback } from "react";

export interface EditTableSortControlProps {
  label: string;
  column: string;
}

export function EditTableSortControl({
  label,
  column,
}: EditTableSortControlProps) {
  const [
    {
      state: { sort },
    },
    { addSorting, removeSorting },
  ] = useEditTableContext();

  const getCurrentSorting = () => {
    const sortIndex = sort.findIndex((s) => s.id === column);
    const isDescending = sort[sortIndex]?.desc;

    if (sortIndex === -1) {
      return null;
    } else if (isDescending) {
      return "desc";
    }
    return "asc";
  };

  const handleSortClick = useCallback(() => {
    if (sort.length === 0 || !sort.some((s) => s.id === column)) {
      addSorting(column, false);
    } else {
      const current = getCurrentSorting();

      if (current === null) {
        addSorting(column, false);

        return;
      }

      const isDescending = current === "desc";

      removeSorting(column);

      if (!isDescending) {
        addSorting(column, !isDescending);
      }
    }
  }, [sort]);

  const getSortIcon = () => {
    const current = getCurrentSorting();
    const isDescending = current === "desc";

    if (current === null) {
      return <TbMinus />;
    } else if (isDescending) {
      return <TbSortDescending />;
    }

    return <TbSortAscending />;
  };

  return (
    <Flex align="center" gap="xs">
      <Box>{label}</Box>
      <ActionIcon
        className="sort-btn"
        variant="light"
        color={getCurrentSorting() === null ? "gray" : "teal"}
        p={0}
        onClick={handleSortClick}
      >
        {getSortIcon()}
      </ActionIcon>
    </Flex>
  );
}
