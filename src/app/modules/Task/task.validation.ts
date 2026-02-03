import z from "zod";

const taskCreateZodSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be under 100 characters"),
    taskImage: z.string().url(),
    description: z.string().min(1, "Description is required"),
    priorityId: z.string().min(1, "Priority is required"),
    statusId: z.string().min(1, "Status is required"),
    date: z.coerce
      .date()
      .refine((val) => val.getTime() >= Date.now() - 60000, {
        message: "Date cannot be in the past",
      }),
    isVital: z.boolean().optional(),
  }),
});

export const TaskValidation = {
  taskCreateZodSchema,
};
