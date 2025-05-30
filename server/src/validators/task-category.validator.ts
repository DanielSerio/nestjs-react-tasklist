import { TaskCategoryCreate } from "#types/task.types";
import { z } from "zod";

export class TaskCategoryValidator {
  private static _local = {
    name: z.string().trim().min(1, `Category name is required`).max(24, `Category name is too long (max 24)`)
  };

  static forCreate = z.object({
    name: this._local.name
  } satisfies Record<keyof TaskCategoryCreate, any>);


  static forUpdate = z.object({
    name: this._local.name,
  } satisfies Record<keyof TaskCategoryCreate, any>);
}