"use client";

import { FC } from "react";
import { Logo } from "@shared/ui/logo";
import { Typography } from "@shared/ui/typography";
import { GoogleOauth } from "@features/auth/oauth-google/ui/google-oauth";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { SignInForm } from "@features/auth/sign-in";

export const SignIn: FC = () => {
	return (
		<div className={"h-screen flex items-center justify-between w-full"}>
			<div className={"max-w-[365px] w-full mx-auto flex flex-col gap-8"}>
				<div className={"flex flex-col gap-4 items-center"}>
					<Logo />
					<Typography tag={"h6"} className={"text-white capitalize"}>
						sign in
					</Typography>
				</div>

				<SignInForm />

				<div className={"flex flex-col gap-4"}>
					<div className={"flex items-center gap-[26px]"}>
						<hr className={"h-px border-neutral-500 w-full bg-neutral-500"} />
						<Typography
							size={"body-xl"}
							className={"uppercase text-neutral-500"}
						>
							or
						</Typography>
						<hr className={"h-px border-neutral-500 w-full bg-neutral-500"} />
					</div>

					<GoogleOauth />

					<div className={"flex items-center gap-2"}>
						<Typography>Don&apos;t have an account?</Typography>
						<Link href={PAGES.auth.signUp}>
							<Typography className={"text-primary-500"}>Sign up</Typography>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};