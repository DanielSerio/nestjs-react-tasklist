import type { Task } from "#types/task.types";

export interface TaskCreateFormProps {
  onDismiss: () => void;
}

export interface TaskEditFormProps extends TaskCreateFormProps {
  task: Task;
}
