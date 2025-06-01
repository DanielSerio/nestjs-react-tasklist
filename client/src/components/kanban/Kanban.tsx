import { Box, Flex } from "@mantine/core";
import { StaticKanban } from "./body/StaticKanban";
import { DraggableKanban } from "./body/DraggableKanban";
import type { KanbanProps } from "./types";
import { KanbanHeader } from "./header/KanbanHeader";

export function Kanban({
  taskDrawerController,
  tasks,
  statusesQuery,
  categoriesQuery,
}: KanbanProps) {
  const queriesAreResolved =
    tasks.isSuccess && statusesQuery.isSuccess && categoriesQuery.isSuccess;

  return (
    <Box className="kanban">
      <Flex className="kanban-inner" direction="column">
        <KanbanHeader
          actionsDisabled={!queriesAreResolved}
          taskDrawerController={taskDrawerController}
        />

        <Flex className="kanban-body">
          <StaticKanban
            taskDrawerController={taskDrawerController}
            isLoading={tasks.isLoading || !queriesAreResolved}
            tasks={tasks.data}
            statusesQuery={statusesQuery}
            categoriesQuery={categoriesQuery}
          />
          <DraggableKanban
            taskDrawerController={taskDrawerController}
            isLoading={tasks.isLoading || !queriesAreResolved}
            tasks={tasks.data}
            statusesQuery={statusesQuery}
            categoriesQuery={categoriesQuery}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
