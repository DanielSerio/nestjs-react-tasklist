import type { Task } from "#types/task.types";
import { Badge, Box, Flex, Group, ScrollArea, Text } from "@mantine/core";
import type { DetailsHTMLAttributes } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { ColumnCountIndicator } from "./ColumnCountIndicator";

export interface StaticKanbanColumnProps
  extends DetailsHTMLAttributes<HTMLDetailsElement> {
  status: {
    id: number;
    name: string;
  };
  items: Task[];
}

export function StaticKanbanColumn({
  status,
  children,
  className,
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
        {items.map((item) => {
          return <div key={item.id}>{JSON.stringify(item)}</div>;
        })}
      </Box>
    </Box>
  );
}
