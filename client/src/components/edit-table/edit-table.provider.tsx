import {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from "react";
import { EDIT_TABLE_COLUMNS, type EditTableEntity } from "#const/edit-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEntityList } from "#hooks/useEntityList";
import type {
  EditTableContextMethods,
  EditTableContextObject,
  EditTableContextState,
  EditTableContextType,
  EditTableEndpoint,
  EditTableReducerAction,
} from "./edit-table.provider.types";
import { initialMethods, initialState } from "./edit-table.const";
import { globalSearchReducer } from "./reducer/global-search";
import { selectReducer } from "./reducer/select";
import { setLimitReducer, setOffsetReducer } from "./reducer/paging";
import {
  addSortReducer,
  removeSortReducer,
  setSortReducer,
} from "./reducer/sorting";

const EditTableContext = createContext<EditTableContextType>([
  {
    state: {
      ...initialState,
      endpoint: "statuses",
    },
    table: {} as ReturnType<typeof useReactTable<EditTableEntity>>,
  },
  initialMethods,
]);

function reducer(state: EditTableContextState, action: EditTableReducerAction) {
  switch (action.name) {
    case "set-search":
      return globalSearchReducer(state, action);
    case "set-select":
      return selectReducer(state, action);
    case "set-limit":
      return setLimitReducer(state, action);
    case "set-offset":
      return setOffsetReducer(state, action);
    case "add-sort":
      return addSortReducer(state, action);
    case "remove-sort":
      return removeSortReducer(state, action);
    case "set-sort":
      return setSortReducer(state, action);
    default:
      return state;
  }
}
const data = [] as any[];

export const EditTableProvider = ({
  children,
  endpoint,
}: PropsWithChildren<{ endpoint: EditTableEndpoint }>) => {
  //TODO: initialState should be set from url params once url state mirroring is implemented
  const [state, dispatch] = useReducer(reducer, { ...initialState, endpoint });
  const query = useEntityList({
    endpoint,
    paging: {
      limit: state.limit,
      offset: state.offset,
    },
    sort: state.sort,
    filter: state.filter,
    select: state.select,
    globalSearch: state.globalSearch,
  });
  const table = useReactTable<EditTableEntity>({
    columns: [...EDIT_TABLE_COLUMNS[endpoint]],
    data: query.data?.records ?? data,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: query.data?.totals?.records ?? 0,
    getCoreRowModel: getCoreRowModel(),
  });

  const methods: EditTableContextMethods = {
    setGlobalSearch: (search: string) =>
      dispatch({ name: "set-search", payload: search }),
    setSelect: (select: string[] | "*") =>
      dispatch({ name: "set-select", payload: select }),
    setLimit: (limit: number) =>
      dispatch({ name: "set-limit", payload: limit }),
    setOffset: (offset: number) =>
      dispatch({ name: "set-offset", payload: offset }),
    addSorting: (column: string, desc: boolean) =>
      dispatch({ name: "add-sort", payload: { id: column, desc } }),
  };
  return (
    <EditTableContext.Provider
      value={[
        {
          state,
          table,
        },
        methods,
      ]}
    >
      {children}
    </EditTableContext.Provider>
  );
};

export const useEditTableContext = () => useContext(EditTableContext);
