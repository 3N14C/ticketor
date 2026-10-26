import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthSignUp } from "@shared/api";
import { PAGES } from "@shared/config";
import type { SignUpFormValues } from "./sign-up-schema";

export const useSignUp = () => {
	const router = useRouter();
	const { mutate, isPending } = useAuthSignUp({
		mutation: {
			onSuccess: ({ message }) => {
				router.replace(PAGES.home);
				toast.success(message);
			},
			onError: ({ message }) => {
				toast.error(message);
			},
		},
	});

	return {
		signUp: ({ name, email, password }: SignUpFormValues) => mutate({ data: { name, email, password } }),
		isPending,
	};
};
