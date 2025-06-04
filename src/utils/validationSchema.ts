import mongoose from "mongoose";
import { z } from "zod";

const isValidObjectId = (value: string): boolean =>
  mongoose.Types.ObjectId.isValid(value);

// ✅ User Validation Schemas
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters.")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email is too short.")
    .max(100, "Email cannot exceed 100 characters."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password cannot exceed 100 characters."),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(5, "Email is too short.")
    .max(100, "Email is too long."),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(100, "Password cannot exceed 100 characters."),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters.")
    .trim()
    .optional(),

  email: z
    .string()
    .email("Invalid email address.")
    .min(5, "Email is too short.")
    .max(100, "Email is too long.")
    .optional(),
});

export const UpdateUserPassSchema = z.object({
  password: z
    .string()
    .max(100, "Current password cannot exceed 100 characters."),

  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters.")
    .max(100, "New password cannot exceed 100 characters."),
});

// ✅ Tag Validation Schema
export const CreateTagSchema = z.object({
  name: z
    .string()
    .min(2, "Tag name must be at least 2 characters.")
    .max(100, "Tag name cannot exceed 100 characters.")
    .trim(),

  description: z
    .string()
    .min(2, "Description must be at least 2 characters.")
    .max(200, "Description cannot exceed 200 characters.")
    .trim(),

  slug: z.string().trim().optional(),
});

// ✅ Post Validation Schema
export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title cannot exceed 100 characters.")
    .trim(),

  content: z
    .string()
    .min(2, "Content must be at least 2 characters.")
    .max(200, "Content cannot exceed 200 characters.")
    .trim(),

  tags: z
    .array(z.string().min(1, "Each tag must not be empty."))
    .min(1, "Please select at least one tag.")
    .max(10, "You cannot select more than 10 tags.")
    .refine((tags) => tags.every(isValidObjectId), {
      message: "One or more tag IDs are invalid.",
    }),
});

// ✅ Answer Schema
export const AddAnswerSchema = z.object({
  content: z
    .string()
    .min(2, "Answer must be at least 2 characters.")
    .max(200, "Answer cannot exceed 200 characters.")
    .trim(),

  question: z
    .string({
      required_error: "Question ID is required.",
      invalid_type_error: "Question ID must be a string.",
    })
    .refine(isValidObjectId, { message: "Invalid question ID format." }),
});

// ✅ Vote Schema
export const AddVoteSchema = z.object({
  postId: z
    .string({
      required_error: "Post ID is required.",
      invalid_type_error: "Post ID must be a string.",
    })
    .refine(isValidObjectId, { message: "Invalid post ID format." }),

  voteType: z.boolean({
    required_error: "Vote type is required.",
    invalid_type_error: "Vote type must be true (upvote) or false (downvote).",
  }),
});

// ✅ Accept Answer Schema
export const AcceptAnswerSchema = z.object({
  question: z
    .string({
      required_error: "Question ID is required.",
      invalid_type_error: "Question ID must be a string.",
    })
    .refine(isValidObjectId, { message: "Invalid question ID format." }),

  answer: z
    .string({
      required_error: "Answer ID is required.",
      invalid_type_error: "Answer ID must be a string.",
    })
    .refine(isValidObjectId, { message: "Invalid answer ID format." }),
});
