import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { EditTable } from "#components/edit-table/EditTable";
import "../styles/export/statuses.scss";
import { useListDefaults } from "#hooks/useListDefaults";

export const Route = createFileRoute("/statuses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { limit, offset, sort, search, filter } = useListDefaults("/statuses");

  return (
    <AppShellMain>
      <EditTable
        endpoint="statuses"
        limit={limit}
        offset={offset}
        sort={sort}
        search={search}
        filter={filter}
      />
    </AppShellMain>
  );
}
