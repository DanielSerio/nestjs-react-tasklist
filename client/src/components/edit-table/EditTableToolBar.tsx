import { Flex, TextInput } from "@mantine/core";

export function EditTableToolBar() {
  return (
    <header className="edit-table-toolbar">
      <Flex h={48} align="center" justify="space-between" px={6}>
        <TextInput placeholder="Search..." type="search" size="xs" />
      </Flex>
    </header>
  );
}
