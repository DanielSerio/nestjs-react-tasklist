import { Flex } from "@mantine/core";
import { EditTableHeader } from "./EditTableHeader";
import { EditTableBody } from "./EditTableBody";
import {
  EditTableProvider,
  type EditTableEndpoint,
} from "./edit-table.provider";

export function EditTable({ endpoint }: { endpoint: EditTableEndpoint }) {
  return (
    <EditTableProvider endpoint={endpoint}>
      <Flex>
        <EditTableHeader />
        <EditTableBody />
      </Flex>
    </EditTableProvider>
  );
}
