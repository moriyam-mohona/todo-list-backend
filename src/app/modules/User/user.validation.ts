import z from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    userName: z.string().min(1, "User Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    isAgreed: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};
