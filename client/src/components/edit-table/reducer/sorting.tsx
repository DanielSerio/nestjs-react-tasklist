import type { SortingState } from "@tanstack/react-table";
import type {
  EditTableContextState,
  ETAction,
} from "../edit-table.provider.types";

interface SortValue {
  id: string;
  desc: boolean;
}

export interface ETAddSortAction extends ETAction {
  name: "add-sort";
  payload: SortValue;
}

export interface ETRemoveSortAction extends ETAction {
  name: "remove-sort";
  payload: string;
}

export interface ETSetSortAction extends ETAction {
  name: "set-sort";
  payload: SortingState | null;
}

export function addSortReducer(
  state: EditTableContextState,
  action: ETAddSortAction
) {
  if (!state.sort.some((srt) => srt.id === action.payload.id)) {
    const newSort = [...state.sort, action.payload];

    return {
      ...state,
      sort: newSort,
    };
  } else {
    const foundItemIndex = state.sort.findIndex(
      (srt) => srt.id === action.payload.id
    );

    if (foundItemIndex > -1) {
      const copy = state.sort.slice();
      const existing = copy[foundItemIndex];

      if (existing.desc === false) {
        copy.splice(foundItemIndex, 1);

        state.sort = copy;

        return state;
      }

      copy.splice(foundItemIndex, 1, {
        ...existing,
        desc: !existing.desc,
      });

      state.sort = copy;

      return state;
    }
  }

  return state;
}

export function removeSortReducer(
  state: EditTableContextState,
  action: ETRemoveSortAction
) {
  const newSort = state.sort.filter((s) => s.id !== action.payload);

  return {
    ...state,
    sort: newSort,
  };
}

export function setSortReducer(
  state: EditTableContextState,
  action: ETSetSortAction
) {
  return {
    ...state,
    sort: action.payload ?? [],
  };
}
