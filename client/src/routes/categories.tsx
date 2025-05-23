import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { EditTable } from "#components/edit-table/EditTable";
import "../styles/export/categories.scss";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShellMain>
      <EditTable endpoint="categories" />
    </AppShellMain>
  );
}
