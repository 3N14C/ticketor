import { z } from "zod";

export const signUpSchema = z
	.object({
		username: z
			.string()
			.min(3, { error: "Name must be at least 3 characters" })
			.max(20, { error: "Name must be at most 20 characters" }),
		email: z.email({ error: "Invalid email" }),
		password: z
			.string()
			.min(8, { error: "Password must be at least 8 characters" })
			.regex(/[a-z]/, {
				error: "Password must contain a lowercase letter",
			})
			.regex(/[A-Z]/, {
				error: "Password must contain an uppercase letter",
			})
			.regex(/\d/, { error: "Password must contain a number" })
			.regex(/[^A-Za-z0-9]/, { error: "Password must contain a symbol" }),
		confirmPassword: z.string().min(1, { error: "Confirm your password" }),
	})
	.refine((value) => value.password === value.confirmPassword, {
		error: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const defaultSignUpValues: SignUpFormValues = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};