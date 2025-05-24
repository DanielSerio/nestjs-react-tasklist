import type {
  EditTableContextState,
  ETAction,
} from "../edit-table.provider.types";

export interface ETGlobalSearchAction extends ETAction {
  name: "set-search";
  payload: string;
}

export function globalSearchReducer(
  state: EditTableContextState,
  action: ETGlobalSearchAction
) {
  return {
    ...state,
    globalSearch: action.payload,
  };
}
