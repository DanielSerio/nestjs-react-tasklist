import { Kanban } from "#components/kanban/Kanban";
import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import "../styles/export/dashboard.scss";
import { useEntityList } from "#hooks/useEntityList";
import { useTasks } from "#hooks/useTasks";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const statusesQuery = useEntityList({
    endpoint: "statuses",
    paging: {
      limit: 100_000,
      offset: 0,
    },
  });

  const categoriesQuery = useEntityList({
    endpoint: "categories",
    paging: {
      limit: 100_000,
      offset: 0,
    },
  });

  const tasks = useTasks(12);

  return (
    <AppShellMain>
      <Kanban
        tasks={tasks}
        statusesQuery={statusesQuery}
        categoriesQuery={categoriesQuery}
      />
    </AppShellMain>
  );
}
