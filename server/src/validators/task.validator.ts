import { TaskCreate, TaskUpdate } from "#types/task.types";
import { z } from "zod";

export class TaskValidator {
  private static _local = {
    name: z.string().trim().min(1, `Task name is required`).max(512, `Task name is too long (max 255)`),
    categoryId: z.coerce.number().int().positive().nullable(),
    priority: z.number().int().nonnegative().nullable()
  };

  static forCreate = z.object({
    name: this._local.name,
    categoryId: this._local.categoryId,
    priority: this._local.priority
  } satisfies Record<keyof TaskCreate, any>);

  static forUpdate = z.object({
    name: this._local.name,
    categoryId: this._local.categoryId,
    priority: this._local.priority,
    statusId: z.coerce.number().int().positive(),
  } satisfies Record<keyof TaskUpdate, any>).partial();
}