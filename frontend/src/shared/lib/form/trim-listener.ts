import type { AnyFieldApi } from "@tanstack/react-form";

export const trimListener = {
	onBlur: ({ fieldApi }: { fieldApi: AnyFieldApi }) => {
		fieldApi.setValue((value: string) => value.trim());
	},
};
