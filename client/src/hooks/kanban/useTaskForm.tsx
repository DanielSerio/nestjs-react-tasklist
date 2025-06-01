import type { Task, TaskCreate } from "#types/task.types";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";

import { z } from "zod";

export function useTaskCreateForm() {
  return useForm({
    mode: "controlled",
    initialValues: {
      categoryId: null,
      name: "",
      priority: null,
    },
    validate: zodResolver(
      z.object({
        categoryId: z
          .number()
          .int()
          .positive()
          .nullable()
          .transform((v) => (v === null ? "" : v)),
        name: z.string().trim().min(1).max(255),
        priority: z
          .number()
          .int()
          .nullable()
          .transform((v) => (v === null ? "" : v)),
      } satisfies Record<keyof TaskCreate, any>)
    ),
  });
}

export type TaskCreateFormType = ReturnType<typeof useTaskCreateForm>;

export function useTaskEditForm(
  task: Omit<Task, "createdAt" | "updatedAt" | "deletedAt">
) {
  console.log(
    JSON.stringify({
      id: task.id,
      categoryId: task.categoryId ?? "",
      statusId: task.statusId ?? "",
      name: task.name ?? "",
      priority: task.priority ?? "",
    })
  );
  const form = useForm({
    mode: "controlled",
    initialValues: {
      id: task.id,
      categoryId: task.categoryId ?? "",
      statusId: task.statusId ?? "",
      name: task.name ?? "",
      priority: task.priority ?? "",
    },
    validate: zodResolver(
      z.object({
        id: z.number().int().positive(),
        categoryId: z
          .number()
          .int()
          .positive()
          .nullable()
          .transform((v) => (v === null ? "" : v)),
        statusId: z.number().int().positive(),
        name: z.string().trim().min(1).max(255),
        priority: z
          .number()
          .int()
          .nullable()
          .transform((v) => (v === null ? "" : v)),
      } satisfies Record<
        keyof Omit<Task, "createdAt" | "updatedAt" | "deletedAt">,
        any
      >)
    ),
  });

  return form;
}

export type TaskEditFormType = ReturnType<typeof useTaskEditForm>;
