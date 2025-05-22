import { TaskCategoryCreate } from "#types/task.types";

export class CreateTaskCategoryDto implements TaskCategoryCreate {
  name: string;
}
