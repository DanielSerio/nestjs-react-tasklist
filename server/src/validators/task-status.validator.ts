import { TaskStatusCreate } from "#types/task.types";
import { z } from "zod";

export class TaskStatusValidator {
  private static _local = {
    name: z.string().trim().min(1, `Status name is required`).max(24, `Status name is too long (max 24)`)
  };

  static forCreate = z.object({
    name: this._local.name
  } satisfies Record<keyof TaskStatusCreate, any>);


  static forUpdate = z.object({
    name: this._local.name,
  } satisfies Record<keyof TaskStatusCreate, any>);
}