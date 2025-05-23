import {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from "react";
import { EDIT_TABLE_COLUMNS, type EditTableEntity } from "#const/edit-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

export type EditTableEndpoint = "statuses" | "categories";
export interface EditTableContextObject {
  state: {
    endpoint: EditTableEndpoint;
  };
  table: ReturnType<typeof useReactTable<EditTableEntity>>;
}
export interface EditTableContextMethods {
  log(): void;
}
export type EditTableContextType = [
  EditTableContextObject,
  EditTableContextMethods,
];

const EditTableContext = createContext<EditTableContextType>([
  {
    state: { endpoint: "statuses" },
    table: {} as ReturnType<typeof useReactTable<EditTableEntity>>,
  },
  { log() {} },
]);

//TODO: create and type actions. add separate case functions for readability
function reducer(
  state: Pick<EditTableContextObject, "state">["state"],
  action: { name: string; payload?: any }
) {
  switch (action.name) {
    default:
      return state;
  }
}
const data = [] as any[];

export const EditTableProvider = ({
  children,
  endpoint,
}: PropsWithChildren<{ endpoint: EditTableEndpoint }>) => {
  const [state] = useReducer(reducer, { endpoint });
  const table = useReactTable<EditTableEntity>({
    columns: [...EDIT_TABLE_COLUMNS[endpoint]],
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const methods = {
    log() {
      console.log("logged");
    },
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
