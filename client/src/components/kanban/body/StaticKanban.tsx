import { useEffect } from "react";
import { Flex } from "@mantine/core";
import type { StaticKanbanProps } from "../types";
import { StaticKanbanColumn } from "./column/StaticKanbanColumn";

export function StaticKanban({
  isLoading,
  tasks,
  statusesQuery,
}: StaticKanbanProps) {
  useEffect(() => {
    console.info(tasks);
  }, [tasks]);

  //TODO: skeleton here
  if (isLoading || statusesQuery.isLoading) {
    return <>Loading...</>;
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
            key={status.id}
            status={{ id: status.id, name: status.name }}
            items={items}
          />
        );
      })}
    </Flex>
  );
}
