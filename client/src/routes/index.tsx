import { Kanban } from "#components/kanban/Kanban";
import { AppShellMain } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import "../styles/export/dashboard.scss";
import { useEntityList } from "#hooks/useEntityList";
import { useTasks } from "#hooks/useTasks";
import { TaskDrawer } from "#components/kanban/drawer/TaskDrawer";
import { useTaskDrawer } from "#hooks/kanban/useTaskDrawer";

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

  const tasks = useTasks();
  const taskDrawerController = useTaskDrawer();

  return (
    <AppShellMain>
      <TaskDrawer controller={taskDrawerController} />
      <Kanban
        tasks={tasks}
        taskDrawerController={taskDrawerController}
        statusesQuery={statusesQuery}
        categoriesQuery={categoriesQuery}
      />
    </AppShellMain>
  );
}
