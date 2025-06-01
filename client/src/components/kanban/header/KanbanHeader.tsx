import { ActionIcon, Flex, Loader, Text } from "@mantine/core";
import type { useTaskDrawer } from "#hooks/kanban/useTaskDrawer";
import { TbPlus } from "react-icons/tb";

export function KanbanHeader({
  actionsDisabled,
  taskDrawerController: [{ isOpen }, { openCreateTaskDrawer }],
}: {
  actionsDisabled: boolean;
  taskDrawerController: ReturnType<typeof useTaskDrawer>;
}) {
  const isDisabled = actionsDisabled || isOpen;

  return (
    <Flex
      h={48}
      className="kanban-header"
      align="center"
      justify="space-between"
      p="xs"
    >
      <Text size="xl">Tasks</Text>

      <ActionIcon
        title="Add Task"
        variant="light"
        color="blue"
        disabled={isDisabled}
        onClick={openCreateTaskDrawer}
      >
        {!actionsDisabled && <TbPlus />}
        {!!actionsDisabled && <Loader color="gray" size="xs" />}
      </ActionIcon>
    </Flex>
  );
}
