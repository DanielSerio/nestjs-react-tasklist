import { Box, Flex } from "@mantine/core";
import type { StaticKanbanProps } from "../types";
import { useEffect } from "react";

export function StaticKanban({ tasks }: StaticKanbanProps) {
  useEffect(() => {
    console.info(tasks);
  }, [tasks]);

  return (
    <Flex direction="column" className="containers">
      <Box>Static Container</Box>
      <Box>Static Container</Box>
      <Box>Static Container</Box>
      <Box>Static Container</Box>
      <Box>Static Container</Box>
      <Box>Static Container</Box>
    </Flex>
  );
}
