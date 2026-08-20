import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name must contain no more than 50 characters"),

  email: z.email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});
