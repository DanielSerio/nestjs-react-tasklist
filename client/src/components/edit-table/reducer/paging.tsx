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

export interface ETPagingCountAction extends ETAction {
  name: "set-record-count";
  payload: number;
}

export interface ETPagingPageChangeAction extends ETAction {
  name:
    | "go-to-next-page"
    | "go-to-previous-page"
    | "go-to-first-page"
    | "go-to-last-page";
  payload?: never;
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

export function setRecordCountReducer(
  state: EditTableContextState,
  payload: ETPagingCountAction
) {
  return {
    ...state,
    totalRecords: payload.payload,
  };
}

export function goToNextPageReducer(
  state: EditTableContextState,
  _: ETPagingPageChangeAction
) {
  if (state.offset + state.limit <= state.totalRecords) {
    return {
      ...state,
      offset: state.offset + state.limit,
    };
  }

  return state;
}

export function goToLastPageReducer(
  state: EditTableContextState,
  _: ETPagingPageChangeAction
) {
  const lastPage = Math.ceil(state.totalRecords / state.limit);

  if (state.offset + state.limit <= state.totalRecords) {
    return {
      ...state,
      offset: (lastPage - 1) * state.limit,
    };
  }

  return state;
}

export function goToPreviousPageReducer(
  state: EditTableContextState,
  _: ETPagingPageChangeAction
) {
  if (state.offset - state.limit >= 0) {
    return {
      ...state,
      offset: state.offset - state.limit,
    };
  }

  return state;
}

export function goToFirstPageReducer(
  state: EditTableContextState,
  _: ETPagingPageChangeAction
) {
  return {
    ...state,
    offset: 0,
  };
}
