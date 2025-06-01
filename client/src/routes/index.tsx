import { Kanban } from "#components/kanban/Kanban";
import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import "../styles/export/dashboard.scss";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShellMain>
      <Kanban />
    </AppShellMain>
  );
}
