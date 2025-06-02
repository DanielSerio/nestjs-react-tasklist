import { useEffect } from "react";
import { Flex } from "@mantine/core";
import type { StaticKanbanProps } from "../types";
import { StaticKanbanColumn } from "./column/StaticKanbanColumn";
import SkeletonKanbanCard from "../cards/SkeletonKanbanCard";
import { StaticSkeletonKanbanColumn } from "./column/StaticSkeletonKanbanColumn";

export function StaticKanban({
  isLoading,
  tasks,
  statusesQuery,
  taskDrawerController,
}: StaticKanbanProps) {
  useEffect(() => {
    console.info(tasks);
  }, [tasks]);

  if (isLoading || statusesQuery.isLoading) {
    return (
      <Flex direction="column" className="containers">
        {[...new Array(3)].map((_, i) => {
          return (
            <StaticSkeletonKanbanColumn key={i + 1}>
              <SkeletonKanbanCard />
              <SkeletonKanbanCard />
              <SkeletonKanbanCard />
            </StaticSkeletonKanbanColumn>
          );
        })}
      </Flex>
    );
  }

  //TODO: error component here
  if (statusesQuery.error) {
    return <>{statusesQuery.error.message}</>;
  }

  if (!tasks) {
    return;
  }

  return (
    <Flex direction="column" className="containers">
      {statusesQuery.data?.records.map((status) => {
        const items = tasks[status.id] ?? [];

        return (
          <StaticKanbanColumn
            taskDrawerController={taskDrawerController}
            key={status.id}
            status={{ id: status.id, name: status.name }}
            items={items}
          />
        );
      })}
    </Flex>
  );
}
