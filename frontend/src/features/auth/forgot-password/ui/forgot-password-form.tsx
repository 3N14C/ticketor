"use client";

import { FC } from "react";
import { useForm } from "@tanstack/react-form";
import {
	defaultForgotPasswordSchemaValues,
	ForgotPasswordSchema,
} from "../model/forgot-password-schema";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { Typography } from "@shared/ui/typography";
import { useForgotPassword } from "../model/use-forgot-password";
import { getFieldError } from "@shared/lib/form";

export const ForgotPasswordForm: FC = () => {
	const { submit } = useForgotPassword();

	const form = useForm({
		defaultValues: defaultForgotPasswordSchemaValues,
		validators: {
			onChange: ForgotPasswordSchema,
		},
		onSubmit: async ({ value }) => {
			submit(value.email);
		},
	});

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		await form.handleSubmit();
	};

	return (
		<form onSubmit={handleSubmit} className={"w-full flex flex-col gap-4"}>
			<form.Field
				name={"email"}
				children={(fieldApi) => (
					<Input
						label={"Email"}
						placeholder={"Enter your email"}
						type={"email"}
						onChange={(e) => fieldApi.handleChange(e.target.value)}
						onBlur={fieldApi.handleBlur}
						error={getFieldError(fieldApi.state.meta.errors)}
					/>
				)}
			/>

			<Button size={"56"} type={"submit"}>
				<Typography size={"button-xl"}>Continue</Typography>
			</Button>
		</form>
	);
};