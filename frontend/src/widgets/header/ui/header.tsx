"use client";

import { FC } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Lock, Login, Search } from "@hugeicons/core-free-icons";
import { Typography } from "@shared/ui/typography";
import { Logo } from "@shared/ui/logo";
import { Button } from "@shared/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PAGES } from "@shared/config";

interface IProps {
	className?: string;
}

export const Header: FC<IProps> = ({ className }) => {
	const router = useRouter();

	return (
		<div className={className}>
			<div className={"max-w-[1440px] w-full mx-auto flex items-center h-[65px] justify-center"}>
				<div className={"bg-black rounded-[12px] w-full h-full flex justify-center"}>
					<div className={"max-w-[630px] w-full mx-auto flex items-center justify-between"}>
						<Logo />

						<div className={"flex items-center gap-4 max-w-[400px] w-full ml-auto"}>
							<Link href={""}>
								<Typography className={"text-white"}>Movies</Typography>
							</Link>
							<Link href={""}>
								<Typography className={"text-white"}>Cinemas</Typography>
							</Link>
						</div>
					</div>
				</div>

				<div className={"bg-black rounded-[12px] max-w-[435px] w-full h-full flex justify-center"}>
					<div className={"max-w-[300px] w-full mx-auto flex items-center justify-between"}>
						<HugeiconsIcon icon={Search} className={"text-white"} />

						<div className={"flex items-center gap-2"}>
							<Button onClick={() => router.push(PAGES.auth.signIn)} variant={"text"} className={"[&_*]:text-white!"}>
								<HugeiconsIcon icon={Lock} />
								<Typography>Login</Typography>
							</Button>
						</div>

						<div className={"flex items-center gap-2"}>
							<Link href={PAGES.auth.signUp}>
								<Button variant={"text"}>
									<HugeiconsIcon icon={Login} className={"text-primary-500"} />
									<Typography>Sign Up</Typography>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
