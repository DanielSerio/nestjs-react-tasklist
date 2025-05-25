import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { TbFilterCog, TbPlus } from "react-icons/tb";
import { ToolBar } from "#components/core/layout/Toolbar";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";
import type { EditTableHeaderProps } from "./EditTableHeader";

export interface EditTableToolBarProps extends EditTableHeaderProps {}

export function EditTableToolBar({
  endpoint,
  launchConfigModal,
}: EditTableToolBarProps) {
  return (
    <header className="edit-table-toolbar">
      <Flex h={48} align="center" justify="space-between" px={6}>
        <TextInput placeholder="Search..." type="search" size="xs" />

        <ToolBar>
          <ActionIcon
            title={`Configure ${getSingularNameFromEndpoint(endpoint)} List`}
            variant="light"
            onClick={launchConfigModal}
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
