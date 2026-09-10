"use client";

import { FC, HTMLAttributes } from "react";
import { tagToSize, typographyVariants } from "./variants";
import { TTypographyVariants } from "./types";
import { cn } from "../../lib/style";

interface IProps extends HTMLAttributes<HTMLElement>, TTypographyVariants {
	children: React.ReactNode;
}

export const Typography: FC<IProps> = ({
	children,
	size,
	className,
	tag,
	...props
}) => {
	const Tag = tag ?? "p";
	const resolvedSize = size ?? tagToSize[Tag as keyof typeof tagToSize];

	return (
		<Tag
			className={cn(typographyVariants({ size: resolvedSize, className }))}
			{...props}
		>
			{children}
		</Tag>
	);
};