import { ActionIcon, Box, Flex, Popover, TextInput } from "@mantine/core";
import {
  TbBook2,
  TbChevronLeft,
  TbChevronRight,
  TbChevronsLeft,
  TbChevronsRight,
  TbFilterCog,
  TbPlus,
} from "react-icons/tb";
import { ToolBar } from "#components/core/layout/Toolbar";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";
import type { EditTableHeaderProps } from "./EditTableHeader";
import { useEditTableContext } from "./edit-table.provider";

export interface EditTableToolBarProps extends EditTableHeaderProps {
  searchInputValue: string;
  onSearchChange: (value: string) => void;
}

export function EditTableToolBar({
  endpoint,
  searchInputValue,
  launchConfigModal,
  launchCreateDrawer,
  onSearchChange,
}: EditTableToolBarProps) {
  const [
    { state, table },
    { goToNextPage, goToFirstPage, goToPreviousPage, goToLastPage },
  ] = useEditTableContext();
  const currentPage = state.offset / state.limit + 1;
  const totalPages = Math.ceil(table.getRowCount() / state.limit);

  const PagingToolbar = () => {
    return (
      <ToolBar>
        <ActionIcon
          disabled={currentPage === 1}
          size="md"
          variant="light"
          color="gray"
          onClick={goToFirstPage}
        >
          <TbChevronsLeft />
        </ActionIcon>
        <ActionIcon
          disabled={currentPage === 1}
          size="md"
          variant="light"
          color="gray"
          onClick={goToPreviousPage}
        >
          <TbChevronLeft />
        </ActionIcon>
        <Box>
          {currentPage} / {totalPages}
        </Box>
        <ActionIcon
          disabled={currentPage === totalPages}
          size="md"
          variant="light"
          color="gray"
          onClick={goToNextPage}
        >
          <TbChevronRight />
        </ActionIcon>
        <ActionIcon
          disabled={currentPage === totalPages}
          size="md"
          variant="light"
          color="gray"
          onClick={goToLastPage}
        >
          <TbChevronsRight />
        </ActionIcon>
      </ToolBar>
    );
  };

  return (
    <header className="edit-table-toolbar">
      <Flex h={48} align="center" justify="space-between" px={6}>
        <TextInput
          placeholder="Search..."
          type="search"
          size="xs"
          value={searchInputValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <Flex>
          <Box visibleFrom="sm">
            <PagingToolbar />
          </Box>
          <Box hiddenFrom="sm">
            <Popover>
              <Popover.Target>
                <ActionIcon variant="light" color="gray">
                  <TbBook2 />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <PagingToolbar />
              </Popover.Dropdown>
            </Popover>
          </Box>

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
              onClick={launchCreateDrawer}
            >
              <TbPlus />
            </ActionIcon>
          </ToolBar>
        </Flex>
      </Flex>
    </header>
  );
}
