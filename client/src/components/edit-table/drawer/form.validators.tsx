import { z } from "zod";

export const FormValidators = {
  categories: {
    create: z.object({
      name: z.string().trim().min(1).max(24),
    }),
  },
  statuses: {
    create: z.object({
      name: z.string().trim().min(1).max(24),
    }),
  },
} as const;
