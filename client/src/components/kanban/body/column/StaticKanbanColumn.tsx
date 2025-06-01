import type { DetailsHTMLAttributes } from "react";
import { Badge, Box, Flex, Group } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";
import { ColumnCountIndicator } from "./ColumnCountIndicator";
import { StaticKanbanCard } from "#components/kanban/cards/StaticKanbanCard";
import type { Task } from "#types/task.types";
import type { useTaskDrawer } from "#hooks/kanban/useTaskDrawer";

export interface StaticKanbanColumnProps
  extends DetailsHTMLAttributes<HTMLDetailsElement> {
  status: {
    id: number;
    name: string;
  };
  items: Task[];
  taskDrawerController: ReturnType<typeof useTaskDrawer>;
}

export function StaticKanbanColumn({
  status,
  children,
  className,
  taskDrawerController: [_, { openEditTaskDrawer }],
  items,
  ...props
}: StaticKanbanColumnProps) {
  const statusClassName = status.name.toLowerCase().replace(" ", "-");
  const classNames = `column static ${statusClassName}${className ? ` ${className}` : ""}`;

  return (
    <Box component="details" className={classNames} {...props}>
      <Flex component="summary" justify="space-between" align="center" p="xs">
        <Badge color="dark" className={`badge-status-${statusClassName}`}>
          {status.name}
        </Badge>

        <Box mr={6}>
          <Group>
            {items.length > 0 && <ColumnCountIndicator count={items.length} />}
            <Box className="arrow" lh={0}>
              <TbChevronDown />
            </Box>
          </Group>
        </Box>
      </Flex>
      <Box>
        {!!children && <Box className="sticky">{children}</Box>}
        <Flex direction="column" gap="xs" p="xs">
          {items.map((item) => {
            return (
              <StaticKanbanCard
                key={item.id}
                task={item}
                onEditClick={() => openEditTaskDrawer(item)}
              />
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
