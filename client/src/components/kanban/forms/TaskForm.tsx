import type { Task } from "#types/task.types";
import { CreateTaskForm } from "./CreateTaskForm";
import { EditTaskForm } from "./EditTaskForm";

/**
 * HOC To get the proper task form.
 */
export function TaskForm({ task }: { task: Task | null }) {
  if (task) {
    return <EditTaskForm task={task} />;
  }

  return <CreateTaskForm />;
}
