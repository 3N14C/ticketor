"use client";

import { FC } from "react";
import { TButtonVariants } from "./types";
import { buttonVariants } from "./variants";
import { cn } from "../../lib/style";

interface IProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, TButtonVariants {
	children: React.ReactNode;
}

export const Button: FC<IProps> = ({
	children,
	size,
	variant,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			className={cn(buttonVariants({ size, variant, className }))}
		>
			{children}
		</button>
	);
};