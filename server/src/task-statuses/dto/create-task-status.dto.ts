import { TaskStatusCreate } from "#types/task.types";

export class CreateTaskStatusDto implements TaskStatusCreate {
  name: string;
}
