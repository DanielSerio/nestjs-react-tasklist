import { Box, Flex, Text } from "@mantine/core";
import { useDraggableKanban } from "#hooks/kanban/useKanban";
import type { DraggableKanbanProps } from "../types";

//TODO: Draggable kanban from @dnd-kit
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
    <>
      <Flex className="draggable-containers">
        <Box></Box>
        <Box></Box>
        <Box className="temporary-banner">
          <Text fz="h1" fw="lighter" opacity={0.5}>
            Draggable Kanban UI Coming Soon
          </Text>
        </Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Flex>
    </>
  );
}
