import z from "zod";

const taskCreateZodSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be under 100 characters"),
    taskImage: z.string().url("Task image must be a valid URL"),
    description: z.string().min(1, "Description is required"),
    priority: z.string().min(1, "Priority is required"),
    status: z.string().min(1, "Status is required"),
    isVital: z.boolean().optional(),
  }),
});

export const TaskValidation = {
  taskCreateZodSchema,
};
