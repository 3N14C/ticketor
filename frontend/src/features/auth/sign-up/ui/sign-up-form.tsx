"use client";

import { FC } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@shared/ui/input";
import { getFieldError } from "@shared/utils/get-field-error";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { defaultSignUpValues, signUpSchema } from "../model/sign-up-schema";
import { useSignUp } from "../model/use-sign-up";
import { trimListener } from "@shared/lib/form";

export const SignUpForm: FC = () => {
	const { mutate, isPending } = useSignUp();
	const form = useForm({
		defaultValues: defaultSignUpValues,
		validators: {
			onChange: signUpSchema,
		},
		formId: "sign-up",
		onSubmit: ({ value }) => {
			mutate(value);
		},
	});

	const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		void form.handleSubmit();
	};

	return (
		<form onSubmit={onSubmit} className={"flex flex-col items-start gap-4"}>
			<form.Field
				name={"username"}
				listeners={trimListener}
				children={(fieldApi) => (
					<Input
						onBlur={fieldApi.handleBlur}
						onChange={(e) => fieldApi.handleChange(e.target.value)}
						value={fieldApi.state.value}
						label={"Name"}
						placeholder={"Enter your name"}
						size={"56"}
						autoComplete={"username"}
						error={getFieldError(fieldApi.state.meta.errors)}
					/>
				)}
			/>

			<form.Field
				name={"email"}
				listeners={trimListener}
				children={(fieldApi) => (
					<Input
						onBlur={fieldApi.handleBlur}
						onChange={(e) => fieldApi.handleChange(e.target.value)}
						value={fieldApi.state.value}
						label={"Email"}
						placeholder={"name@example.com"}
						size={"56"}
						type={"email"}
						autoComplete={"email"}
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
							type={"password"}
							autoComplete={"new-password"}
							size={"56"}
						/>
					)}
				/>
				<Typography size={"body-xs"} className={"text-neutral-50"}>
					Use 8+ characters with lowercase, uppercase, a number & a symbol
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
						type={"password"}
						autoComplete={"new-password"}
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

				<form.Subscribe
					selector={(state) => state.canSubmit}
					children={(canSubmit) => (
						<Button
							size={"56"}
							type={"submit"}
							disabled={isPending || !canSubmit}
						>
							<Typography size={"button-xl"}>
								{isPending ? "Signing Up..." : "Sign Up"}
							</Typography>
						</Button>
					)}
				/>
			</div>
		</form>
	);
};