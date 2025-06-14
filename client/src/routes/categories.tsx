import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { EditTable } from "#components/edit-table/EditTable";
import "../styles/export/categories.scss";
import { useListDefaults } from "#hooks/useListDefaults";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  const { limit, offset, sort, search, filter } =
    useListDefaults("/categories");

  return (
    <AppShellMain>
      <EditTable
        endpoint="categories"
        limit={limit}
        offset={offset}
        sort={sort}
        search={search}
        filter={filter}
      />
    </AppShellMain>
  );
}
