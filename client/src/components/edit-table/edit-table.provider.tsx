import { createContext, useReducer, type PropsWithChildren } from "react";

export type EditTableEndpoint = "statuses" | "categories";
export interface EditTableContextObject {
  endpoint: EditTableEndpoint;
}
export interface EditTableContextMethods {
  log(): void;
}
export type EditTableContextType = [
  EditTableContextObject,
  EditTableContextMethods,
];

const EditTableContext = createContext<EditTableContextType>([
  { endpoint: "statuses" },
  { log() {} },
]);

//TODO: create and type actions. add separate case functions for readability
function reducer(
  state: EditTableContextObject,
  action: { name: string; payload?: any }
) {
  switch (action.name) {
    default:
      return state;
  }
}

export const EditTableProvider = ({
  children,
  endpoint,
}: PropsWithChildren<{ endpoint: EditTableEndpoint }>) => {
  const [state] = useReducer(reducer, { endpoint });
  const methods = {
    log() {
      console.log("logged");
    },
  };
  return (
    <EditTableContext.Provider value={[state, methods]}>
      {children}
    </EditTableContext.Provider>
  );
};
