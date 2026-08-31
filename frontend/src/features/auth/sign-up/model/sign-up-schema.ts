import { z } from "zod";

export const defaultSignUpSchemaValues = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export const SignUpSchema = z
	.object({
		username: z
			.string()
			.min(3, { error: "Имя должно содержать 3 символа" })
			.max(20, { error: "Имя должно содержать 20 символов" }),
		email: z.email({ error: "Неверный email" }),
		password: z
			.string()
			.min(8, { error: "Пароль должен содержать 8 символов" }),
		confirmPassword: z
			.string()
			.min(8, { error: "Пароль должен содержать 8 символов" }),
	})
	.refine((arg) => arg.password === arg.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});