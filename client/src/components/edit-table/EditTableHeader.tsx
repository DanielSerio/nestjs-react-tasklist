import { Flex } from "@mantine/core";
import { EditTableColumnHeaders } from "./EditTableColumnHeaders";
import { EditTableToolBar } from "./EditTableToolBar";

export function EditTableHeader() {
  return (
    <Flex direction="column" component="header">
      <EditTableToolBar />
      <EditTableColumnHeaders />
    </Flex>
  );
}
