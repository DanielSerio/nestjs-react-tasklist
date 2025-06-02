import { useRef, type DetailsHTMLAttributes } from "react";
import { Badge, Box, Flex, Group, Skeleton } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";

export interface StaticKanbanColumnProps
  extends DetailsHTMLAttributes<HTMLDetailsElement> {}

export function StaticSkeletonKanbanColumn({
  children,
  className,
  ...props
}: StaticKanbanColumnProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const classNames = `column static ${className ? ` ${className}` : ""}`;

  return (
    <Box
      component="details"
      open={true}
      className={classNames}
      {...props}
      ref={ref}
    >
      <Flex component="summary" justify="space-between" align="center" p="xs">
        <Badge color="dark">
          <Skeleton w={96} h={24} />
        </Badge>

        <Box mr={6}>
          <Group>
            <Skeleton w={36} h={24} />
            <Box className="arrow" lh={0} opacity={0.4}>
              <TbChevronDown />
            </Box>
          </Group>
        </Box>
      </Flex>
      <Box>
        <Flex direction="column" gap="xs" p="xs">
          {children}
        </Flex>
      </Box>
    </Box>
  );
}
