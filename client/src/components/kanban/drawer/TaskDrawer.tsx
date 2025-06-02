import { Drawer } from "@mantine/core";
import type { useTaskDrawer } from "#hooks/kanban/useTaskDrawer";
import { TaskForm } from "../forms/TaskForm";

export function TaskDrawer({
  controller: [state, methods],
}: {
  controller: ReturnType<typeof useTaskDrawer>;
}) {
  return (
    <Drawer
      title={state.context === null ? "Create Task" : "Edit Task"}
      position="right"
      opened={state.isOpen}
      onClose={methods.dismissTaskDrawer}
    >
      <TaskForm
        task={state.context}
        dismissDrawer={methods.dismissTaskDrawer}
      />
    </Drawer>
  );
}
