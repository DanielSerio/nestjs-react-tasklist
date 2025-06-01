import { ActionIcon, Flex, Text } from "@mantine/core";
import { TbPlus } from "react-icons/tb";

export function KanbanHeader() {
  return (
    <Flex
      h={48}
      className="kanban-header"
      align="center"
      justify="space-between"
      p="xs"
    >
      <Text size="xl">Tasks</Text>

      <ActionIcon title="Add Task" variant="light" color="blue">
        <TbPlus />
      </ActionIcon>
    </Flex>
  );
}
