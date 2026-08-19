import { cva } from "class-variance-authority";

export const typographyVariants = cva(
	"text-white transition-colors duration-300",
	{
		variants: {
			size: {
				"display-xl":
					"font-extrabold text-[84px] tracking-[-3%] leading-[110%]",
				"display-1": "font-extrabold text-[64px] leading-[140%]",
				"display-l": "font-extrabold text-[60px] tracking-[-2%] leading-[140%]",
				"display-2": "font-extrabold text-[48px] leading-[140%]",
				"display-m": "font-extrabold text-[48px] tracking-[-4%] leading-[110%]",
				"display-s": "font-bold text-[42px] tracking-[0%] leading-[100%]",
				h1: "font-bold text-[44px] leading-[140%]",
				h2: "font-bold text-[42px] tracking-[0px] leading-[140%]",
				h3: "font-bold text-[36px] tracking-[0px] leading-[140%]",
				h4: "font-bold text-[32px] tracking-[0px] leading-[140%]",
				h5: "font-bold text-[20px] tracking-[0px] leading-[140%]",
				h6: "font-bold text-[16px] tracking-[0px] leading-[140%]",
				"body-xl": "font-normal text-[20px] tracking-[0px] leading-[140%]",
				"body-l": "font-normal text-[18px] tracking-[0px] leading-[140%]",
				"body-m": "font-normal text-[16px] tracking-[0px] leading-[150%]",
				"body-s": "font-normal text-[14px] tracking-[0px] leading-[150%]",
				"body-xs": "font-normal text-[12px] tracking-[0px] leading-[150%]",
				"caption-l": "font-extrabold text-[14px] tracking-[0px] leading-[140%]",
				"caption-m": "font-normal text-[14px] tracking-[0px] leading-[140%]",
				"caption-s": "font-medium text-[12px] tracking-[0px] leading-[140%]",
				"button-xl": "font-extrabold text-[16px] tracking-[0px] leading-[140%]",
				"button-l": "font-medium text-[16px] tracking-[0px] leading-[140%]",
				"button-m": "font-bold text-[14px] tracking-[0px] leading-[140%]",
				"button-s": "font-medium text-[14px] tracking-[0px] leading-[140%]",
				"label-m": "font-medium text-[12px] tracking-[0.8px] leading-[140%]",
				"label-s": "font-normal text-[12px] tracking-[0.8px] leading-[140%]",
			},
			tag: {
				p: "",
				h1: "",
				h2: "",
				h3: "",
				h4: "",
				h5: "",
				h6: "",
				span: "",
			},
		},
		defaultVariants: {
			size: "body-m",
			tag: "p",
		},
	}
);

export const tagToSize = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
} as const satisfies Partial<
	Record<
		NonNullable<Parameters<typeof typographyVariants>[0]>["tag"] & string,
		NonNullable<Parameters<typeof typographyVariants>[0]>["size"] & string
	>
>;