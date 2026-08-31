"use client";

import { FC } from "react";
import { Logo } from "@shared/ui/logo";
import { Typography } from "@shared/ui/typography";
import Link from "next/link";
import { PAGES } from "@shared/config";
import { GoogleOauth } from "@features/auth/oauth-google";
import { SignUpForm } from "@features/auth";

export const SignUp: FC = () => {
	return (
		<div className={"h-screen flex items-center justify-between w-full"}>
			<div className={"max-w-[365px] w-full mx-auto flex flex-col gap-8"}>
				<div className={"flex flex-col gap-4 items-center"}>
					<Logo />
					<Typography tag={"h6"} className={"text-white capitalize"}>
						create your account
					</Typography>
				</div>

				<div className={"flex flex-col gap-2"}>
					<SignUpForm />

					<div className={"flex items-center gap-2"}>
						<Typography className={"text-neutral-100"} size={"label-l"}>
							Already have an account?
						</Typography>
						<Link href={PAGES.auth.signIn}>
							<Typography size={"button-s"} className={"text-primary-500"}>
								Sign In
							</Typography>
						</Link>
					</div>
				</div>

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
				</div>
			</div>
		</div>
	);
};