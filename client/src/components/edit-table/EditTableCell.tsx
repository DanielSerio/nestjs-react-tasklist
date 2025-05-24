import { Box, Flex } from "@mantine/core";
import React, {
  forwardRef,
  type AreaHTMLAttributes,
  type ForwardedRef,
} from "react";

export interface EditTableCellComponentProps
  extends AreaHTMLAttributes<HTMLDivElement> {
  label: string;
}

function EditTableCellComponent(
  { label, children, ...props }: EditTableCellComponentProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex className="cell" align="center" {...props} ref={ref}>
      <Box className="label" component="span">
        {label}
      </Box>
      <Box className="value" component="span">
        {children}
      </Box>
    </Flex>
  );
}

export const EditTableCell = forwardRef(EditTableCellComponent);
