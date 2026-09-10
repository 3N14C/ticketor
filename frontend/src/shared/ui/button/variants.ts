import { cva } from "class-variance-authority";

export const buttonVariants = cva("flex items-center gap-2 justify-center px-4 w-full transition-colors duration-300 not-disabled:cursor-pointer disabled:cursor-not-allowed [&_*]:duration-300", {
	variants: {
		size: {
			"28": "h-[28px]",
			"32": "h-[32px]",
			"40": "h-[40px]",
			"48": "h-[48px]",
			"56": "h-[56px]",
		},
		variant: {
			primary: "bg-primary-500 rounded-[4px] [&_*]:text-black hover:bg-primary-600 active:bg-primary-300 disabled:bg-neutral-400",
			text: "bg-transparent [&_*]:text-primary-500 rounded-[4px] hover:[&_*]:text-primary-600 active:[&_*]:text-primary-300 disabled:[&_*]:text-neutral-600",
			outline:
				"bg-transparent border border-primary-500 [&_*]:text-primary-500 rounded-[4px]" +
				" hover:[&_*]:text-primary-600 active:[&_*]:text-primary-300 disabled:[&_*]:text-neutral-600" +
				" hover:border-primary-600 active:border-primary-300 disabled:border-neutral-400",
		},
	},
	defaultVariants: {
		size: "28",
		variant: "primary",
	},
});