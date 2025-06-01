import type { Task } from "#types/task.types";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Text,
  type CardSectionProps,
} from "@mantine/core";
import type { AreaHTMLAttributes, PropsWithChildren } from "react";
import { TbEdit } from "react-icons/tb";

export interface StaticKanbanCardProps
  extends AreaHTMLAttributes<HTMLDivElement> {
  task: Task;
}

function StaticCardSection({
  children,
  ...props
}: PropsWithChildren<CardSectionProps>) {
  return (
    <Card.Section px="xs" py={6} {...props}>
      {children}
    </Card.Section>
  );
}

export function StaticKanbanCard({
  task,
  children,
  className,
  ...props
}: StaticKanbanCardProps) {
  const classNames = `kanban-card${className ? ` ${className}` : ""}`;

  return (
    <Card withBorder className={classNames} {...props}>
      <StaticCardSection c="header" withBorder>
        <Flex align="center" justify="space-between">
          <Text fz="lg">
            {new Date(Date.parse(`${task.createdAt}`)).toLocaleDateString(
              "en-US"
            )}
          </Text>
          {typeof task.priority === "number" && (
            <Flex align="center" gap="xs">
              <Text fz="sm" style={{ opacity: 0.8 }}>
                Priority
              </Text>
              <Badge variant="light" fw="normal">
                <Text fw="bolder">{task.priority}</Text>
              </Badge>
            </Flex>
          )}
        </Flex>
      </StaticCardSection>

      <StaticCardSection className="body" withBorder>
        <Text fz="sm">{task.name}</Text>
        {children}
      </StaticCardSection>

      <StaticCardSection c="footer">
        <Group justify="flex-end">
          <Button variant="subtle" size="xs" rightSection={<TbEdit />}>
            <Text fz="sm">Edit</Text>
          </Button>
        </Group>
      </StaticCardSection>
    </Card>
  );
}
