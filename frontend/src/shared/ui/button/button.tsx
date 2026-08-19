"use client";

import { FC } from "react";
import { VariantProps } from "class-variance-authority";
import { TButtonVariants } from "./types";
import { cn } from "../../lib";
import { buttonVariants } from "./variants";

interface IProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<TButtonVariants> {
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