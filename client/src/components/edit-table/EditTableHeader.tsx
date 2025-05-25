import { Flex } from "@mantine/core";
import { EditTableColumnHeaders } from "./EditTableColumnHeaders";
import { EditTableToolBar } from "./EditTableToolBar";
import { useEditTableContext } from "./edit-table.provider";
import type { EditTableEndpoint } from "./edit-table.provider.types";

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
  const [{ table }] = useEditTableContext();

  return (
    <Flex direction="column" component="header">
      <EditTableToolBar
        endpoint={endpoint}
        launchConfigModal={launchConfigModal}
        launchCreateDrawer={launchCreateDrawer}
      />
      <EditTableColumnHeaders table={table} />
    </Flex>
  );
}
