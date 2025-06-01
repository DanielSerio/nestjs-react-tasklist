import type { Task } from "#types/task.types";
import { Box, Flex, ScrollArea, Text } from "@mantine/core";
import type { DetailsHTMLAttributes } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";

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
  const classNames = `column static${className ? ` ${className}` : ""}`;

  return (
    <Box component="details" className={classNames} {...props}>
      <Flex component="summary" justify="space-between" align="center" p="xs">
        <Text size="xl" fw="lighter">
          {status.name}
        </Text>

        <Box className="arrow" lh={0}>
          <TbChevronDown />
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
