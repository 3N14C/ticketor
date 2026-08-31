import { z } from "zod";

export const defaultForgotPasswordSchemaValues = {
	email: "",
};

export const ForgotPasswordSchema = z.object({
	email: z.email({
		error: "Не валидный email",
	}),
});