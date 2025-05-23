import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
