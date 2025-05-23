import { NAV_ITEMS } from "#const/navigation";
import { ActionIcon, Menu } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { TbMenu2 } from "react-icons/tb";

export function MainNav({ resolvedPathname }: { resolvedPathname?: string }) {
  const navigate = useNavigate();

  return (
    <Menu classNames={{ dropdown: "main-nav" }}>
      <Menu.Target>
        <ActionIcon size="xl" fz={36} variant="subtle" color="dark">
          <TbMenu2 />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Menu</Menu.Label>
        {NAV_ITEMS.map((item) => {
          return (
            <Menu.Item
              className={item.path === resolvedPathname ? "active" : undefined}
              key={item.path}
              onClick={() => navigate({ to: item.path })}
            >
              {item.label}
            </Menu.Item>
          );
        })}
        <Menu.Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item disabled>Darkmode</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
