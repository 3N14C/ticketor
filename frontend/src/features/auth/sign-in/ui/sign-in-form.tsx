"use client";

import { FC } from "react";
import { Input } from "@shared/ui/input";
import { Typography } from "@shared/ui/typography";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { Button } from "@shared/ui/button";
import { useForm } from "@tanstack/react-form";
import { getFieldError, trimListener } from "@shared/lib/form";
import { defaultSignInSchemaValues, signInSchema } from "../model/sign-in-schema";
import { useSignIn } from "../model/use-sign-in";
import { LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const SignInForm: FC = () => {
	const { mutate, isPending } = useSignIn();
	const form = useForm({
		defaultValues: defaultSignInSchemaValues,
		validators: {
			onChange: signInSchema,
		},
		formId: "sign-in",
		onSubmit: async ({ value }) => {
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
							type={"password"}
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

			<form.Subscribe
				selector={(state) => state.canSubmit}
				children={(canSubmit) => (
					<Button disabled={isPending || !canSubmit} size={"56"} type={"submit"}>
						{!isPending ? <Typography size={"button-xl"}>Sign in</Typography> : <HugeiconsIcon icon={LoaderCircle} className={"animate-spin"} />}
					</Button>
				)}
			/>
		</form>
	);
};