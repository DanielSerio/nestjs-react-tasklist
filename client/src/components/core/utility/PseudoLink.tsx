import type { ButtonHTMLAttributes } from "react";

export function PseudoLink({
  className,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  return (
    <button
      type="button"
      className={`pseudo-link${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
