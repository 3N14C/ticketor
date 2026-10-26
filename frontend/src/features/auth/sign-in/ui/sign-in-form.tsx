"use client";

import { FC } from "react";
import { Input } from "@shared/ui/input";
import { Typography } from "@shared/ui/typography";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { Button } from "@shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultSignInSchemaValues, SignInFormValues, signInSchema } from "../model/sign-in-schema";
import { LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSignIn } from "../model/use-sign-in";

export const SignInForm: FC = () => {
	const { signIn, isPending } = useSignIn();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormValues>({
		defaultValues: defaultSignInSchemaValues,
		resolver: zodResolver(signInSchema),
		mode: "onChange",
	});

	return (
		<form onSubmit={handleSubmit(signIn)} className={"flex flex-col items-start gap-4"}>
			<Input {...register("email")} label={"Email"} placeholder={"name@example.com"} size={"56"} type={"email"} error={errors.email} />

			<div className={"flex flex-col gap-3 w-full"}>
				<Input {...register("password")} error={errors.password} label={"Password"} type={"password"} placeholder={"Enter your password"} size={"56"} />

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

			<Button disabled={isPending} size={"56"} type={"submit"}>
				{!isPending ? <Typography size={"button-xl"}>Sign in</Typography> : <HugeiconsIcon icon={LoaderCircle} className={"animate-spin"} />}
			</Button>
		</form>
	);
};