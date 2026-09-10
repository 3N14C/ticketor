import { z } from "zod";

export const signInSchema = z.object({
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
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const defaultSignInSchemaValues: SignInFormValues = {
	email: "",
	password: "",
};