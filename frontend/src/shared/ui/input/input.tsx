"use client";

import { FC } from "react";
import { Typography } from "../typography";
import { cn } from "../../lib/style";
import { TInputVariants } from "./types";
import { inputVariants } from "./variants";
import { FieldError } from "react-hook-form";

interface IProps extends Omit<React.ComponentProps<"input">, "size">, TInputVariants {
	label?: string;
	error?: FieldError | undefined;
}

export const Input: FC<IProps> = ({ className, label, size, error, ...props }) => {
	return (
		<div className={"flex flex-col gap-3 w-full"}>
			<Typography size={"body-m"} className={"font-medium"}>
				{label}
			</Typography>

			<div className={"w-full flex flex-col gap-[6px]"}>
				<input {...props} className={cn(inputVariants({ size, className }))} />
				{error && (
					<Typography size={"body-xs"} className={"text-red-500"}>
						{error.message}
					</Typography>
				)}
			</div>
		</div>
	);
};