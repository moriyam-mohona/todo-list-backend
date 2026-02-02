import z from "zod";

const createStatusZodScheme = z.object({
  body: z.object({
    status: z
      .string()
      .min(1, "Status  is required")
      .max(50, "Status must be under 50 characters"),
  }),
});

const updateStatusZodSchema = z.object({
  body: z.object({
    status: z.string().min(1, "Status can't be empty"),
  }),
});

export const StatusValidation = {
  createStatusZodScheme,
  updateStatusZodSchema,
};
