import { Flex } from "@mantine/core";
import { EditTableColumnHeaders } from "./EditTableColumnHeaders";
import { EditTableToolBar } from "./EditTableToolBar";
import { useEditTableContext } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";
import { useEditTableGlobalSearch } from "#hooks/edit-table/useEditTableGlobalSearch";
import { useEffect } from "react";

export interface EditTableHeaderProps {
  endpoint: EditTableEndpoint;
  launchConfigModal: () => void;
  launchCreateDrawer: () => void;
}

export function EditTableHeader({
  endpoint,
  launchConfigModal,
  launchCreateDrawer,
}: EditTableHeaderProps) {
  const [{ table, state }, { setGlobalSearch, addSorting, removeSorting }] =
    useEditTableContext();
  const globalSearchController = useEditTableGlobalSearch(state.globalSearch);
  const [{ globalSearchText, inputText }, setSearchFieldText] =
    globalSearchController;

  useEffect(() => {
    setGlobalSearch(globalSearchText);
    setSearchFieldText(globalSearchText);
  }, [globalSearchText]);

  return (
    <Flex direction="column" component="header">
      <EditTableToolBar
        endpoint={endpoint}
        searchInputValue={inputText}
        onSearchChange={setSearchFieldText}
        launchConfigModal={launchConfigModal}
        launchCreateDrawer={launchCreateDrawer}
      />
      <EditTableColumnHeaders
        table={table}
        state={state}
        addSorting={addSorting}
        removeSorting={removeSorting}
      />
    </Flex>
  );
}
