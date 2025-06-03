import { optional, z } from "zod";
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(100, "Username must not exceed 100 characters")
    .trim(),

  email: z
    .string()
    .min(5, "Email is too short")
    .max(100, "Email is too long")
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, "Email is too short")
    .max(100, "Email is too long")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must not exceed 100 characters"),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(100, "Username must not exceed 100 characters")
    .trim()
    .optional(),

  email: z
    .string()
    .min(5, "Email is too short")
    .max(100, "Email is too long")
    .email("Invalid email format")
    .optional(),
});

export const UpdateUserPassSchema = z.object({
  password: z.string().max(100, "Password must not exceed 100 characters"),

  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export const CreateTagSchema = z.object({
  name: z
    .string()
    .min(2, "Tag name must be at least 2 characters")
    .max(100, "Tag name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(200, "Description must not exceed 200 characters")
    .trim(),

  slug: z.string().trim().optional(),
});
