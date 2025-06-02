import { Button, Loader, type ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import type { IconType } from "react-icons/lib";

export interface SubmitButtonProps
  extends PropsWithChildren<
    Omit<
      ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
      "fullWidth" | "rightSection" | "children"
    >
  > {
  isBusy: boolean;
  icon: IconType & FC;
}

export function SubmitButton({
  isBusy,
  disabled,
  icon: Icon,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      {...props}
      fullWidth
      rightSection={isBusy ? <Loader color="gray" size="xs" /> : <Icon />}
      disabled={isBusy || disabled}
    >
      {children}
    </Button>
  );
}
