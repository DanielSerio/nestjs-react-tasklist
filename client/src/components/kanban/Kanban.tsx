import { Box, Flex } from "@mantine/core";
import { StaticKanban } from "./body/StaticKanban";
import { DraggableKanban } from "./body/DraggableKanban";

export function Kanban() {
  return (
    <Box className="kanban">
      <Flex className="kanban-inner" direction="column">
        <Flex className="kanban-header">Header</Flex>
        <Flex className="kanban-body">
          <StaticKanban />
          <DraggableKanban />
        </Flex>
      </Flex>
    </Box>
  );
}
