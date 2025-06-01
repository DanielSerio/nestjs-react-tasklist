import { Button, Drawer } from "@mantine/core";
import type { useTaskDrawer } from "#hooks/kanban/useTaskDrawer";

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
      <Button color="gray" onClick={methods.dismissTaskDrawer}>
        Cancel
      </Button>
    </Drawer>
  );
}
