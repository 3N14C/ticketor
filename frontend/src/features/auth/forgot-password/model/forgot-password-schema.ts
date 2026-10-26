import { z } from "zod";

export const ForgotPasswordSchema = z.object({
	email: z.email({
		error: "Не валидный email",
	}),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export const defaultForgotPasswordSchemaValues: ForgotPasswordFormValues = {
	email: "",
};
