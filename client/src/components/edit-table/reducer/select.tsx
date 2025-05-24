import type {
  EditTableContextState,
  ETAction,
} from "../edit-table.provider.types";

export interface ETSelectAction extends ETAction {
  name: "set-select";
  payload: string[] | "*";
}

export function selectReducer(
  state: EditTableContextState,
  action: ETSelectAction
) {
  return {
    ...state,
    select:
      typeof action.payload === "string"
        ? action.payload
        : action.payload.join(","),
  };
}
