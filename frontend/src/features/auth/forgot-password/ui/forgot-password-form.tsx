"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultForgotPasswordSchemaValues, ForgotPasswordFormValues, ForgotPasswordSchema } from "../model/forgot-password-schema";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { Typography } from "@shared/ui/typography";
import { useForgotPassword } from "../model/use-forgot-password";

export const ForgotPasswordForm: FC = () => {
	const { submit } = useForgotPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormValues>({
		defaultValues: defaultForgotPasswordSchemaValues,
		resolver: zodResolver(ForgotPasswordSchema),
		mode: "onChange",
	});

	return (
		<form onSubmit={handleSubmit(({ email }) => submit(email))} className={"w-full flex flex-col gap-4"}>
			<Input {...register("email")} label={"Email"} placeholder={"Enter your email"} type={"email"} error={errors.email} />

			<Button size={"56"} type={"submit"}>
				<Typography size={"button-xl"}>Continue</Typography>
			</Button>
		</form>
	);
};