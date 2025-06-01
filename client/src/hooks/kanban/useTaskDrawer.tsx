import type { Task } from "#types/task.types";
import { useCallback, useReducer } from "react";

export type TaskDrawerActionName = "open-create" | "open-edit" | "dismiss";

interface TaskDrawerActionBasis {
  name: TaskDrawerActionName;
  payload?: Task;
}

export interface TaskDrawerOpenCreateAction extends TaskDrawerActionBasis {
  name: "open-create";
  payload?: never;
}

export interface TaskDrawerOpenEditAction extends TaskDrawerActionBasis {
  name: "open-edit";
  payload: Task;
}

export interface TaskDrawerDismissAction extends TaskDrawerActionBasis {
  name: "dismiss";
  payload?: never;
}

export type TaskDrawerAction =
  | TaskDrawerOpenCreateAction
  | TaskDrawerOpenEditAction
  | TaskDrawerDismissAction;

export interface TaskDrawerState {
  isOpen: boolean;
  context: null | Task;
}

function reducer(state: TaskDrawerState, action: TaskDrawerAction) {
  switch (action.name) {
    case "dismiss":
      return {
        isOpen: false,
        context: null,
      };
    case "open-create":
      return {
        isOpen: true,
        context: null,
      };
    case "open-edit":
      return {
        isOpen: true,
        context: action.payload,
      };
    default:
      return state;
  }
}

export function useTaskDrawer() {
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    context: null,
  });

  const openCreateTaskDrawer = useCallback(
    () => dispatch({ name: "open-create" }),
    [dispatch]
  );
  const openEditTaskDrawer = useCallback(
    (task: Task) => dispatch({ name: "open-edit", payload: task }),
    [dispatch]
  );
  const dismissTaskDrawer = useCallback(
    () => dispatch({ name: "dismiss" }),
    [dispatch]
  );

  const methods = {
    openCreateTaskDrawer,
    openEditTaskDrawer,
    dismissTaskDrawer,
  };

  return [state, methods] as const;
}
