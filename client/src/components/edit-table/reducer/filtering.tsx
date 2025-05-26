import type { ColumnFiltersState } from "@tanstack/react-table";
import type {
  EditTableContextState,
  ETAction,
} from "../edit-table.provider.types";

interface FilterValue {
  id: string;
  value: unknown;
  operator:
    | "ct"
    | "sw"
    | "ew"
    | "eq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin";
}

export interface ETAddFilterAction extends ETAction {
  name: "add-filter";
  payload: FilterValue;
}

export interface ETRemoveFilterAction extends ETAction {
  name: "remove-filter";
  payload: string;
}
export interface ETSetFilterAction extends ETAction {
  name: "set-filter";
  payload: ColumnFiltersState | null;
}

export function addFilterReducer(
  state: EditTableContextState,
  action: ETAddFilterAction
) {
  const newFilter = [...state.filter, action.payload];

  return {
    ...state,
    filter: newFilter,
  };
}

export function removeFilterReducer(
  state: EditTableContextState,
  action: ETRemoveFilterAction
) {
  const newFilter = state.filter.filter((f) => f.id !== action.payload);

  return {
    ...state,
    filter: newFilter,
  };
}

export function setFilterReducer(
  state: EditTableContextState,
  action: ETSetFilterAction
) {
  return {
    ...state,
    filter: action.payload ?? [],
  };
}
