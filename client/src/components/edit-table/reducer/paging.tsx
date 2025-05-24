import type {
  EditTableContextState,
  ETAction,
} from "../edit-table.provider.types";

export interface ETPagingLimitAction extends ETAction {
  name: "set-limit";
  payload: number;
}

export interface ETPagingOffsetAction extends ETAction {
  name: "set-offset";
  payload: number;
}

export function setLimitReducer(
  state: EditTableContextState,
  action: ETPagingLimitAction
) {
  return {
    ...state,
    limit: action.payload,
    offset: 0,
  };
}

export function setOffsetReducer(
  state: EditTableContextState,
  action: ETPagingOffsetAction
) {
  return {
    ...state,
    offset: action.payload,
  };
}
