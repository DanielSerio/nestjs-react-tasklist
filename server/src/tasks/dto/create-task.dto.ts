import { TaskCreate } from "#types/task.types";

export class CreateTaskDto implements TaskCreate {
  name: string;
  categoryId: number | null;
  priority: number | null;
}
