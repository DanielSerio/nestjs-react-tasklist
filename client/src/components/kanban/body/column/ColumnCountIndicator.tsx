import { Badge } from "@mantine/core";

export function ColumnCountIndicator({ count }: { count: number }) {
  return (
    <Badge
      title={`${count} Task${count === 1 ? "" : "s"}`}
      style={{ border: "1px solid var(--mantine-color-default-border)" }}
      size="xs"
      variant="light"
      color="gray"
      className={`count-indicator-${name}`}
    >
      {~~count}
    </Badge>
  );
}
