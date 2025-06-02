import { Button, type ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes } from "react";
import { TbCancel } from "react-icons/tb";

export function CancelButton(
  props: Omit<
    ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
    "fullWidth" | "color" | "rightSection" | "children"
  >
) {
  return (
    <Button {...props} fullWidth color="gray" rightSection={<TbCancel />}>
      Cancel
    </Button>
  );
}
