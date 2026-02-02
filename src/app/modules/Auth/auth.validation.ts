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

const changePasswordZodSchema = z.object({
  body: z
    .object({
      oldPassword: z
        .string()
        .min(6, "Old Password must be at least 6 characters long"),
      newPassword: z
        .string()
        .min(6, "New Password must be at least 6 characters long"),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "New password must be different from old password",
    }),
});

const updateProfileZodSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    profileImage: z.string().optional(),
    contactNo: z
      .string()
      .min(8, "Contact number is too short")
      .max(15, "Contact number is too long")
      .optional(),
    position: z.string().min(2, "Position is too short").optional(),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  changePasswordZodSchema,
  updateProfileZodSchema,
};
