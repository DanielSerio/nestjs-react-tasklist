import { AppShellHeader, Flex, Text } from "@mantine/core";
import { MainNav } from "../navigation/MainNav";
import { Link, useRouterState } from "@tanstack/react-router";
import { getPageTitle } from "#utilities/page.helpers";

export function Header() {
  const routerState = useRouterState();
  const resolvedPathname = routerState.resolvedLocation?.pathname;
  const title = getPageTitle(resolvedPathname ?? "");

  return (
    <AppShellHeader>
      <Flex
        h={48}
        justify="space-between"
        align="center"
        pl={"xs"}
        className="toolbar"
      >
        <Flex align="center" gap="xs">
          <Text
            variant="gradient"
            fw="bolder"
            gradient={{ from: "cyan", to: "teal" }}
          >
            <Link to="/">TaskList</Link>
          </Text>
          <Text fw="lighter">{title}</Text>
        </Flex>

        <MainNav resolvedPathname={resolvedPathname} />
      </Flex>
    </AppShellHeader>
  );
}
