import z from "zod";

const createStatusZodScheme = z.object({
  body: z.object({
    name: z.string().min(1, "Status name is required").max(50, "Status name must be under 50 characters"),
  }),
});

export const StatusValidation = {
  createStatusZodScheme,
};
