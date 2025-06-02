import { BASE_URL } from "#const/api";
import { QUERY_KEYS } from "#const/query-client";
import type { TaskCreate, TaskUpdate } from "#types/task.types";
import { useMutation } from "@tanstack/react-query";

export const useCreateTaskMutation = () =>
  useMutation({
    mutationKey: [...QUERY_KEYS.tasks.create],
    async mutationFn({ task }: { task: TaskCreate }) {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      return await response.json();
    },
  });

export const useUpdateTaskMutation = (id: number) =>
  useMutation({
    mutationKey: [...QUERY_KEYS.tasks.update, id],
    async mutationFn({ task }: { task: TaskUpdate }) {
      const response = await fetch(`${BASE_URL}/tasks/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      return await response.json();
    },
  });

export const useDeleteTaskMutation = (id: number) =>
  useMutation({
    mutationKey: [...QUERY_KEYS.tasks.delete, id],
    async mutationFn() {
      const response = await fetch(`${BASE_URL}/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    },
  });
