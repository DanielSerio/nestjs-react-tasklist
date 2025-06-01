import type { AnchorHTMLAttributes } from "react";
import { TbCategory2, TbHome2, TbStatusChange } from "react-icons/tb";

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
  label: string;
  icon?: React.ReactNode;
}
export const NAV_ITEMS: NavItemProps[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: <TbHome2 />,
  },
  {
    path: "/statuses",
    label: "Statuses",
    icon: <TbStatusChange />,
  },
  {
    path: "/categories",
    label: "Categories",
    icon: <TbCategory2 />,
  },
];
