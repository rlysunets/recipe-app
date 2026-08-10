import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50),

  email: z.email(),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});
