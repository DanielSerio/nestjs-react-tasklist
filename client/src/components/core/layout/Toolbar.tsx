import { Group, type GroupProps } from "@mantine/core";

export function ToolBar({ gap, px, children }: GroupProps) {
  return (
    <Group className="toolbar" gap={gap ?? "xs"} px={px ?? "xs"}>
      {children}
    </Group>
  );
}
