"use client";

import { FC } from "react";
import { Typography } from "../typography";
import { cn } from "../../lib";
import { TInputVariants } from "./types";
import { inputVariants } from "./variants";

interface IProps
	extends
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		TInputVariants {
	label?: string;
	error?: string | undefined;
}

export const Input: FC<IProps> = ({
	className,
	label,
	size,
	error,
	...props
}) => {
	return (
		<div className={"flex flex-col gap-3 w-full"}>
			<Typography size={"body-m"} className={"font-medium"}>
				{label}
			</Typography>

			<div className={"w-full flex flex-col gap-[6px]"}>
				<input {...props} className={cn(inputVariants({ size, className }))} />
				{error && (
					<Typography size={"body-xs"} className={"text-red-500"}>
						{error}
					</Typography>
				)}
			</div>
		</div>
	);
};