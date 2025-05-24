import type { EditTableEntity } from "#const/edit-table";
import type { ColumnFiltersState, SortingState, useReactTable } from "@tanstack/react-table";
import type { ETGlobalSearchAction } from "./reducer/global-search";
import type { ETSelectAction } from "./reducer/select";
import type { ETPagingLimitAction, ETPagingOffsetAction } from "./reducer/paging";
import type { ETAddSortAction, ETRemoveSortAction, ETSetSortAction } from "./reducer/sorting";
import type { ETAddFilterAction, ETRemoveFilterAction, ETSetFilterAction } from "./reducer/filtering";
import type { useEntityList } from "#hooks/useEntityList";

export type EditTableEndpoint = "statuses" | "categories";

export interface EditTableContextState {
  endpoint: EditTableEndpoint;
  sort: SortingState;
  filter: ColumnFiltersState;
  globalSearch: string;
  select: string;
  limit: number;
  offset: number;
}

export interface EditTableContextObject {
  state: EditTableContextState;
  table: ReturnType<typeof useReactTable<EditTableEntity>>;
  query: ReturnType<typeof useEntityList>;
}

export interface EditTableContextMethods {
  // Search methods
  setGlobalSearch: (search: string) => void;
  // Sort methods
  addSorting: (column: string, desc: boolean) => void;
  removeSorting: (column: string) => void;
  setSorting: (sort: SortingState | null) => void;
  // Filter methods
  addFilter: (column: string, value: string) => void;
  removeFilter: (column: string) => void;
  setFilter: (filter: ColumnFiltersState | null) => void;
  // Pagination methods
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  // Select methods
  setSelect: (select: string[] | "*") => void;
}
export type EditTableContextType = [
  EditTableContextObject,
  EditTableContextMethods,
];

export type ETActionName = 'set-search' | 'set-select' | 'set-limit' |
  'set-offset' | 'add-sort' | 'remove-sort' | 'set-sort' | 'set-filter' |
  'add-filter' | 'remove-filter';

export interface ETAction {
  name: ETActionName;
  payload: any;
}

export type EditTableReducerAction = ETAction & (
  ETGlobalSearchAction | ETSelectAction | ETPagingLimitAction |
  ETPagingOffsetAction | ETSetSortAction | ETAddSortAction | ETRemoveSortAction |
  ETSetFilterAction | ETAddFilterAction | ETRemoveFilterAction
);