import { z } from "zod";

export const defaultSignInSchemaValues = {
	email: "",
	password: "",
};

export const SignInSchema = z.object({
	email: z.email({ error: "Неверный email" }),
	password: z.string().min(8, { error: "Пароль должен содержать 8 символов" }),
});