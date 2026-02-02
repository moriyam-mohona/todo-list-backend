import z from "zod";

const createPriorityZodSchema = z.object({
  body: z.object({
    priority: z
      .string()
      .min(1, "Priority is required")
      .max(50, "Priority must be under 50 characters"),
  }),
});

export const PriorityValidation = {
  createPriorityZodSchema,
};
