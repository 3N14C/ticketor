import { z } from "zod";
import type { SignUpRequest } from "@shared/api";

export const signUpSchema = z
	.object({
		name: z.string().trim().min(3, { error: "Name must be at least 3 characters" }).max(20, { error: "Name must be at most 20 characters" }),
		email: z.email({ error: "Invalid email" }),
		password: z.string().min(8, { error: "Password must be at least 8 characters" }).max(255),
		confirmPassword: z.string().nonempty({ error: "Confirm your password" }),
	})
	.refine((value) => value.password === value.confirmPassword, {
		error: "Passwords do not match",
		path: ["confirmPassword"],
	}) satisfies z.ZodType<SignUpRequest>;

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const defaultSignUpValues: SignUpFormValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};