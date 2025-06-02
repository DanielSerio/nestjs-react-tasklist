import { QueryClient } from "@tanstack/react-query";

export const QUERY_CLIENT = new QueryClient();

export const QUERY_KEYS = {
  statuses: {
    list: ["statuses", "list"],
  },
  categories: {
    list: ["categories", "list"],
  },
  tasks: {
    list: ["tasks", "list"],
    create: ["tasks", "create"],
    update: ["tasks", "update"],
    delete: ["tasks", "delete"],
  },
};
