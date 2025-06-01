import { useEffect, useState } from "react";
import type { useEntityList } from "#hooks/useEntityList";
import type { Task } from "#types/task.types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { Pretty } from "#types/utility.types";

interface UseKanbanParamsBase {
  statusesQuery: ReturnType<typeof useEntityList>;
  categoriesQuery: ReturnType<typeof useEntityList>;
  tasks?: Record<number, Task[]>;
}

export type UseKanbanParams = Pretty<UseKanbanParamsBase>;

export interface SortableTask {
  id: UniqueIdentifier;
  task: Task;
}

function createSortableTask<ID extends UniqueIdentifier>(
  id: ID,
  task: Task
): SortableTask {
  return {
    id,
    task,
  };
}

function createSortableTasks<ID extends UniqueIdentifier>(
  tasks: Record<number, Task[]>
) {
  const newTasks = {} as Record<number, SortableTask[]>;
  let id: number = 1;

  for (const statusId in tasks) {
    newTasks[statusId] = tasks[statusId].map((task) =>
      createSortableTask<ID>(id as ID, task)
    );

    id += 1;
  }

  return newTasks;
}

export function useDraggableKanban(params: UseKanbanParams) {
  const [sortableTasks, setSortableTasks] = useState<
    Record<number, SortableTask[]>
  >({});

  useEffect(() => {
    if (params.tasks && Object.keys(params.tasks).length) {
      setSortableTasks(createSortableTasks(params.tasks));
    }
  }, [params.tasks]);

  const state = {
    sortableTasks,
  };

  const methods = {
    setSortableTasks,
  };

  return [state, methods] as const;
}

export type UseKanban = ReturnType<typeof useDraggableKanban>;
