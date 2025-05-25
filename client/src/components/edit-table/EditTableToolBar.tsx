import { ToolBar } from "#components/core/layout/Toolbar";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";
import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { TbFilterCog, TbPlus } from "react-icons/tb";
import type { EditTableEndpoint } from "./edit-table.provider.types";

export function EditTableToolBar({
  endpoint,
}: {
  endpoint: EditTableEndpoint;
}) {
  return (
    <header className="edit-table-toolbar">
      <Flex h={48} align="center" justify="space-between" px={6}>
        <TextInput placeholder="Search..." type="search" size="xs" />

        <ToolBar>
          <ActionIcon
            title={`Configure ${getSingularNameFromEndpoint(endpoint)} List`}
            variant="light"
          >
            <TbFilterCog />
          </ActionIcon>
          <ActionIcon
            title={`Add ${getSingularNameFromEndpoint(endpoint)}`}
            variant="light"
            color="blue"
          >
            <TbPlus />
          </ActionIcon>
        </ToolBar>
      </Flex>
    </header>
  );
}
