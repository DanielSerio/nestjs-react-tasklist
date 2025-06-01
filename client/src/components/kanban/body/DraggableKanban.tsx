import { useDraggableKanban } from "#hooks/kanban/useKanban";
import { Box, Flex } from "@mantine/core";
import type { DraggableKanbanProps } from "../types";

export function DraggableKanban({
  statusesQuery,
  categoriesQuery,
  tasks,
}: DraggableKanbanProps) {
  const kanban = useDraggableKanban({
    statusesQuery,
    categoriesQuery,
    tasks,
  });

  return (
    <Flex className="draggable-containers">
      <Box>Draggable Container</Box>
      <Box>Draggable Container</Box>
      <Box>Draggable Container</Box>
      <Box>Draggable Container</Box>
      <Box>Draggable Container</Box>
      <Box>Draggable Container</Box>
    </Flex>
  );
}
