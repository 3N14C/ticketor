import { cva } from "class-variance-authority";

export const inputVariants = cva(
	"w-full px-4 bg-neutral-900 border border-neutral-500 rounded-[4px] text-white placeholder:text-neutral-300",
	{
		variants: {
			size: {
				"40": "h-[40px]",
				"48": "h-[48px]",
				"56": "h-[56px]",
			},
		},
		defaultVariants: {
			size: "48",
		},
	}
);