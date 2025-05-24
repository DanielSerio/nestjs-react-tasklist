import type { EditTableContextState } from "./edit-table.provider.types";

export const initialState: Omit<EditTableContextState, "endpoint"> = {
  sort: [],
  filter: [],
  globalSearch: "",
  select: "*",
  limit: 25,
  offset: 0,
};

export const initialMethods = {
  setGlobalSearch() { },
  addSorting() { },
  removeSorting() { },
  setSorting() { },
  addFilter() { },
  removeFilter() { },
  setFilter() { },
  setLimit() { },
  setOffset() { },
  setSelect() { },
};