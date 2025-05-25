import { Box, Flex } from "@mantine/core";
import { forwardRef, type AreaHTMLAttributes, type ForwardedRef } from "react";

export interface EditTableCellComponentProps
  extends AreaHTMLAttributes<HTMLDivElement> {
  label: string;
  align?: "left" | "center" | "right";
}

function EditTableCellComponent(
  { label, align, children, ...props }: EditTableCellComponentProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex className="cell" align="center" {...props} ref={ref}>
      <Box className="label" component="span">
        {label}
      </Box>
      <Box
        className={`value${align ? ` align-${align}` : ""}`}
        component="span"
      >
        {children}
      </Box>
    </Flex>
  );
}

export const EditTableCell = forwardRef(EditTableCellComponent);
