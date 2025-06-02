import type { Task } from "#types/task.types";
import { CreateTaskForm } from "./CreateTaskForm";
import { EditTaskForm } from "./EditTaskForm";

/**
 * HOC To get the proper task form.
 */
export function TaskForm({
  task,
  dismissDrawer,
}: {
  task: Task | null;
  dismissDrawer: () => void;
}) {
  if (task) {
    return <EditTaskForm task={task} onDismiss={dismissDrawer} />;
  }

  return <CreateTaskForm onDismiss={dismissDrawer} />;
}
