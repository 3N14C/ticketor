"use client";

import { FC } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@shared/ui/input";
import { getFieldError } from "@shared/utils/get-field-error";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";
import Link from "next/link";
import { PAGES } from "@shared/config";
import {
	defaultSignUpSchemaValues,
	SignUpSchema,
} from "../model/sign-up-schema";

export const SignUpForm: FC = () => {
	const form = useForm({
		defaultValues: defaultSignUpSchemaValues,
		validators: {
			onChange: SignUpSchema,
		},
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
				name={"username"}
				children={(fieldApi) => (
					<Input
						onBlur={fieldApi.handleBlur}
						onChange={(e) => fieldApi.handleChange(e.target.value)}
						value={fieldApi.state.value}
						label={"Username"}
						placeholder={"Enter your name"}
						size={"56"}
						error={getFieldError(fieldApi.state.meta.errors)}
					/>
				)}
			/>

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

			<div className={"flex flex-col gap-[6px] w-full"}>
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
				<Typography size={"body-xs"} className={"text-neutral-50"}>
					Use 8+ characters with a mix of letters, numbers & symbols
				</Typography>
			</div>

			<form.Field
				name={"confirmPassword"}
				children={(fieldApi) => (
					<Input
						onBlur={fieldApi.handleBlur}
						onChange={(e) => fieldApi.handleChange(e.target.value)}
						error={getFieldError(fieldApi.state.meta.errors)}
						value={fieldApi.state.value}
						label={"Confirm Password"}
						placeholder={"Re-enter password"}
						size={"56"}
					/>
				)}
			/>

			<div className={"flex flex-col gap-2"}>
				<Typography className={"text-[10.5px] text-neutral-200"}>
					By signing up you agree to Ticketor&apos;s{" "}
					<Link
						href={PAGES.home}
						className={"underline decoration-neutral-200"}
					>
						<Typography
							tag={"span"}
							className={"text-[10.5px] text-neutral-200"}
						>
							Terms of Service
						</Typography>
					</Link>{" "}
					and{" "}
					<Link
						href={PAGES.home}
						className={"underline decoration-neutral-200"}
					>
						<Typography
							tag={"span"}
							className={"text-neutral-200 text-[10.5px]"}
						>
							Privacy Policy
						</Typography>
					</Link>
				</Typography>
				<Button size={"56"} type={"submit"}>
					<Typography size={"button-xl"}>Sign Up</Typography>
				</Button>
			</div>
		</form>
	);
};