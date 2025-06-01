import { Box, Flex } from "@mantine/core";
import { StaticKanban } from "./body/StaticKanban";
import { DraggableKanban } from "./body/DraggableKanban";
import type { KanbanProps } from "./types";
import { KanbanHeader } from "./header/KanbanHeader";

export function Kanban({ tasks, statusesQuery, categoriesQuery }: KanbanProps) {
  return (
    <Box className="kanban">
      <Flex className="kanban-inner" direction="column">
        <KanbanHeader />

        <Flex className="kanban-body">
          <StaticKanban
            isLoading={tasks.isLoading}
            tasks={tasks.data}
            statusesQuery={statusesQuery}
            categoriesQuery={categoriesQuery}
          />
          <DraggableKanban
            isLoading={tasks.isLoading}
            tasks={tasks.data}
            statusesQuery={statusesQuery}
            categoriesQuery={categoriesQuery}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
