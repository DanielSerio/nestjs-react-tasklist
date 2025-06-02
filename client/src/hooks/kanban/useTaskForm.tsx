import type { Task, TaskCreate } from "#types/task.types";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";

import { z } from "zod";

export function useTaskCreateForm() {
  return useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      categoryId: null,
      name: "",
      priority: null,
    },
    validate: zodResolver(
      z.object({
        categoryId: z.coerce
          .number()
          .int()
          .positive()
          .nullable()
          .transform((v) => (v === null || v <= 0 ? "" : v)),
        name: z.string().trim().min(1).max(355),
        priority: z.coerce
          .number()
          .int()
          .nullable()
          .transform((v) => (v === null || v <= 0 ? "" : v)),
      } satisfies Record<keyof TaskCreate, any>)
    ),
  });
}

export type TaskCreateFormType = ReturnType<typeof useTaskCreateForm>;

export function useTaskEditForm(
  task: Omit<Task, "createdAt" | "updatedAt" | "deletedAt">
) {
  return useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      id: task.id,
      categoryId:
        task.categoryId && task.categoryId >= 1 ? `${task.categoryId}` : null,
      statusId: task.statusId ? `${task.statusId}` : null,
      name: task.name ?? "",
      priority: task.priority ?? "",
    },
    validate: zodResolver(
      z.object({
        id: z.number().int().positive(),
        categoryId: z.coerce
          .number()
          .int()
          .positive()
          .nullable()
          .transform((v) => (`${v}` === "" || v === null || v <= 0 ? "" : v)),
        statusId: z.coerce.number().int().positive(),
        name: z.string().trim().min(1).max(512),
        priority: z.coerce
          .number()
          .int()
          .nullable()
          .transform((v) => (`${v}` === "" || v === null || v <= 0 ? "" : v)),
      } satisfies Record<
        keyof Omit<Task, "createdAt" | "updatedAt" | "deletedAt">,
        any
      >)
    ),
  });
}

export type TaskEditFormType = ReturnType<typeof useTaskEditForm>;
