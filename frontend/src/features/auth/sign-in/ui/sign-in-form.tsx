"use client";

import { FC } from "react";
import { Input } from "@shared/ui/input";
import { Typography } from "@shared/ui/typography";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { Button } from "@shared/ui/button";
import { useForm } from "@tanstack/react-form";
import { getFieldError } from "@shared/utils/get-field-error";
import {
	defaultSignInSchemaValues,
	SignInSchema,
} from "../model/sign-in-schema";

export const SignInForm: FC = () => {
	const form = useForm({
		defaultValues: defaultSignInSchemaValues,
		validators: {
			onChange: SignInSchema,
		},
		formId: "sign-in",
		onSubmit: async ({ value }) => {},
	});

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
			className={"flex flex-col items-start gap-4"}
		>
			<form.Field
				name={"email"}
				children={(fieldApi) => (
					<Input
						onBlur={fieldApi.handleBlur}
						onChange={(e) => fieldApi.handleChange(e.target.value)}
						value={fieldApi.state.value}
						label={"Email"}
						placeholder={"name@example.com"}
						size={"56"}
						error={getFieldError(fieldApi.state.meta.errors)}
					/>
				)}
			/>

			<div className={"flex flex-col gap-3 w-full"}>
				<form.Field
					name={"password"}
					children={(fieldApi) => (
						<Input
							onBlur={fieldApi.handleBlur}
							onChange={(e) => fieldApi.handleChange(e.target.value)}
							error={getFieldError(fieldApi.state.meta.errors)}
							value={fieldApi.state.value}
							label={"Password"}
							placeholder={"Enter your password"}
							size={"56"}
						/>
					)}
				/>

				<div className={"flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<input type={"checkbox"} />
						<Typography size={"body-xs"} className={"text-neutral-300"}>
							Remember me
						</Typography>
					</div>

					<Link href={PAGES.auth.forgotPassword}>
						<Typography size={"body-xs"} className={"text-primary-500"}>
							Forgot password?
						</Typography>
					</Link>
				</div>
			</div>

			<Button size={"56"} type={"submit"}>
				<Typography size={"button-xl"}>Sign In</Typography>
			</Button>
		</form>
	);
};