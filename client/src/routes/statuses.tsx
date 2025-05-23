import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { EditTable } from "#components/edit-table/EditTable";
import "../styles/export/statuses.scss";

export const Route = createFileRoute("/statuses")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShellMain>
      <EditTable endpoint="statuses" />
    </AppShellMain>
  );
}
