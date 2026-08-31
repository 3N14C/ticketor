"use client";

import { FC } from "react";
import { Logo } from "@shared/ui/logo";
import { Typography } from "@shared/ui/typography";
import { ForgotPasswordForm } from "@features/auth/forgot-password";
import Link from "next/link";
import { PAGES } from "@shared/config";

export const ForgotPassword: FC = () => {
	return (
		<div
			className={
				"flex flex-col h-screen items-center w-full max-w-[360px] mx-auto justify-center gap-8"
			}
		>
			<div className={"flex flex-col gap-8 items-center"}>
				<Logo />

				<Typography size={"body-xxl"}>Forgot Password?</Typography>
			</div>

			<div className={"flex flex-col w-full gap-4"}>
				<ForgotPasswordForm />

				<div className={"flex items-center gap-2"}>
					<Typography>Don&apos;t have an account?</Typography>

					<Link href={PAGES.auth.signIn}>
						<Typography size={"button-s"} className={"text-primary-500"}>
							Sign Up
						</Typography>
					</Link>
				</div>
			</div>
		</div>
	);
};