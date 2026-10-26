"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@shared/ui/input";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { defaultSignUpValues, SignUpFormValues, signUpSchema } from "../model/sign-up-schema";
import { useAuthSignUp } from "@shared/api/generated";

export const SignUpForm: FC = () => {
	const { mutate, isPending } = useAuthSignUp();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormValues>({
		defaultValues: defaultSignUpValues,
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
	});

	const onSubmit = (data: SignUpFormValues) => {
		mutate({ data });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-start gap-4"}>
			<Input {...register("name")} label={"Name"} placeholder={"Enter your name"} size={"56"} autoComplete={"username"} error={errors.name} />

			<Input {...register("email")} label={"Email"} placeholder={"name@example.com"} size={"56"} type={"email"} autoComplete={"email"} error={errors.email} />

			<div className={"flex flex-col gap-[6px] w-full"}>
				<Input
					{...register("password", { deps: ["confirmPassword"] })}
					error={errors.password}
					label={"Password"}
					placeholder={"Enter your password"}
					type={"password"}
					autoComplete={"new-password"}
					size={"56"}
				/>
				<Typography size={"body-xs"} className={"text-neutral-50"}>
					Use 8+ characters with lowercase, uppercase, a number & a symbol
				</Typography>
			</div>

			<Input {...register("confirmPassword")} error={errors.confirmPassword} label={"Confirm Password"} placeholder={"Re-enter password"} type={"password"} autoComplete={"new-password"} size={"56"} />

			<div className={"flex flex-col gap-2"}>
				<Typography className={"text-[10.5px] text-neutral-200"}>
					By signing up you agree to Ticketor&apos;s{" "}
					<Link href={PAGES.home} className={"underline decoration-neutral-200"}>
						<Typography tag={"span"} className={"text-[10.5px] text-neutral-200"}>
							Terms of Service
						</Typography>
					</Link>{" "}
					and{" "}
					<Link href={PAGES.home} className={"underline decoration-neutral-200"}>
						<Typography tag={"span"} className={"text-neutral-200 text-[10.5px]"}>
							Privacy Policy
						</Typography>
					</Link>
				</Typography>

				<Button size={"56"} type={"submit"} disabled={isPending}>
					<Typography size={"button-xl"}>{isPending ? "Signing Up..." : "Sign Up"}</Typography>
				</Button>
			</div>
		</form>
	);
};