"use client";

import { FC, useState } from "react";
import { AuthMe200 } from "@shared/api";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover";
import { Typography } from "@shared/ui/typography";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown, Settings } from "@hugeicons/core-free-icons";
import { cn } from "@shared/lib/style";
import { Button } from "@shared/ui/button";
import Link from "next/link";
import { PAGES } from "@shared/config";

interface IProps {
	user: AuthMe200;
}

export const AuthenticatedHeaderProfile: FC<IProps> = ({ user }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger className={"flex items-center justify-between max-w-[200px] w-full"}>
				<div className={"bg-white rounded-full size-10"} />

				<Typography size={"button-l"}>{user.name}</Typography>

				<HugeiconsIcon
					icon={ChevronDown}
					className={cn("text-white transition-transform duration-150", {
						"rotate-180": isOpen,
					})}
				/>
			</PopoverTrigger>
			<PopoverContent className={"bg-primary"}>
				<Link href={PAGES.profile.settings}>
					<Button variant={"text"} size={"32"} className={"[&_*]:text-white!"}>
						<HugeiconsIcon icon={Settings} size={20} className={"text-white"} />
						<Typography size={"button-s"}>Settings</Typography>
					</Button>
				</Link>
			</PopoverContent>
		</Popover>
	);
};