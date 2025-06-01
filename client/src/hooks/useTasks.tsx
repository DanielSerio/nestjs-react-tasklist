import { BASE_URL } from "#const/api";
import { QUERY_KEYS } from "#const/query-client";
import type { Task } from "#types/task.types";
import { useQuery } from "@tanstack/react-query";

export function useTasks(mock?: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.tasks.list, `mock=${mock ?? ""}`],
    async queryFn() {
      const response = await fetch(
        `${BASE_URL}/tasks${mock ? `?mock=${mock}` : ""}`
      );

      return (await response.json()) as Record<number, Task[]>;
    },
  });
}
