import { ActionIcon, AppShellHeader, Flex, Menu } from "@mantine/core";
import { TbMenu2 } from "react-icons/tb";
import { MainNav } from "../navigation/MainNav";

export function Header() {
  return (
    <AppShellHeader>
      <Flex
        h={48}
        justify="space-between"
        align="center"
        pl={"xs"}
        className="toolbar"
      >
        <div>Header Text</div>
        <MainNav />
      </Flex>
    </AppShellHeader>
  );
}
