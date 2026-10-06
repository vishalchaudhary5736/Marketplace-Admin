import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email")),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginState = z.infer<typeof LoginSchema>;

export const RecoveryCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Backup code is required")
    .min(9, "Backup code must be at least 9 characters"),
});

export type RecoveryCodeState = z.infer<typeof RecoveryCodeSchema>;
