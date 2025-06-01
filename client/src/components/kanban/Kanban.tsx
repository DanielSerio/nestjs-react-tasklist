import { Box, Flex } from "@mantine/core";

export function Kanban() {
  return (
    <Box className="kanban">
      <Flex className="kanban-inner" direction="column">
        <Flex>Header</Flex>
        <Flex>
          <Box>Container</Box>
        </Flex>
      </Flex>
    </Box>
  );
}
