import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";
import { Header } from "#components/core/layout/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppShell header={{ height: 48 }}>
      <Header />
      <Outlet />
    </AppShell>
  );
}
