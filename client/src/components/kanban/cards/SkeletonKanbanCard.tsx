import { Card, Skeleton, type CardProps } from "@mantine/core";
import { StaticCardSection } from "./StaticKanbanCard";

export default function SkeletonKanbanCard({ className, ...props }: CardProps) {
  const classNames = `kanban-card${className ? ` ${className}` : ""}`;

  return (
    <Card withBorder className={classNames} {...props}>
      <StaticCardSection>
        <Skeleton h={120} />
      </StaticCardSection>
    </Card>
  );
}
