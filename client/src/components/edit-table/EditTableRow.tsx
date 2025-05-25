import { forwardRef, type AreaHTMLAttributes, type ForwardedRef } from "react";

export interface EditTableRowProps extends AreaHTMLAttributes<HTMLDivElement> {
  gridTemplateColumns: string;
}

function EditTableRowComponent(
  {
    children,
    className,
    gridTemplateColumns,
    style,
    ...props
  }: EditTableRowProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const classNames = `row${className ? ` ${className}` : ""}`;

  return (
    <div
      className={classNames}
      style={{ ...style, gridTemplateColumns }}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
}

export const EditTableRow = forwardRef(EditTableRowComponent);
