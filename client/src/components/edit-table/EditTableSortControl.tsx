import { ActionIcon, Box, Flex } from "@mantine/core";
import { TbMinus, TbSortAscending, TbSortDescending } from "react-icons/tb";

export interface EditTableSortControlProps {
  label: string;
  column: string;
  sort: { id: string; desc: boolean }[];
  addSorting: (column: string, desc: boolean) => void;
  removeSorting: (column: string) => void;
}

export function EditTableSortControl({
  label,
  column,
  sort,
  addSorting,
  removeSorting,
}: EditTableSortControlProps) {
  if (!sort) {
    return <></>;
  }

  const handleSortClick = () => {
    if (sort.length === 0 || !sort.some((s) => s.id === column)) {
      // No item yet. add it.
      addSorting(column, false);

      return;
    }

    const currentItem = sort.find((s) => s.id === column) ?? null;

    if (currentItem) {
      const nextValue =
        currentItem.desc === true
          ? null
          : currentItem.desc === false
            ? true
            : false;

      if (nextValue === null) {
        removeSorting(column);
      } else {
        addSorting(column, nextValue);
      }

      return;
    } else {
      addSorting(column, false);

      return;
    }
  };

  const getSortIcon = () => {
    const current = sort.find((s) => s.id === column)?.desc ?? null;
    const isDescending = current === true;

    if (current === null) {
      return <TbMinus />;
    } else if (isDescending) {
      return <TbSortDescending />;
    }

    return <TbSortAscending />;
  };

  const getColor = () =>
    ((sort ?? []).find((s) => s.id === column)?.desc ?? null) === null
      ? "gray"
      : "teal";

  return (
    <Flex align="center" gap="xs">
      <Box>{label}</Box>
      <ActionIcon
        className="sort-btn"
        variant="light"
        color={getColor()}
        p={0}
        onClick={handleSortClick}
      >
        {getSortIcon()}
      </ActionIcon>
    </Flex>
  );
}
