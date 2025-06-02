import type { Task } from "#types/task.types";

export interface TaskCreateFormProps {
  onCancelClick: () => void;
}

export interface TaskEditFormProps extends TaskCreateFormProps {
  task: Task;
}
