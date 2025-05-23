import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShellMain>
      <h1>Landing</h1>
    </AppShellMain>
  );
}
