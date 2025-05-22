import { TaskStatusCreate } from "#types/task.types";
import { z } from "zod";

export class TaskStatusValidator {
  private _local = {
    name: z.string().trim().min(1, `Status name is required`).max(24, `Status name is too long (max 24)`)
  };

  forCreate = z.object({
    name: this._local.name
  } satisfies Record<keyof TaskStatusCreate, any>);


  forUpdate = z.object({
    name: this._local.name,
  } satisfies Record<keyof TaskStatusCreate, any>);
}