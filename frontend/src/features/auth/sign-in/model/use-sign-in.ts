import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthSignIn } from "@shared/api";
import { PAGES } from "@shared/config";
import type { SignInFormValues } from "./sign-in-schema";

export const useSignIn = () => {
	const router = useRouter();
	const { mutate, isPending } = useAuthSignIn({
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
		signIn: (values: SignInFormValues) => mutate({ data: values }),
		isPending,
	};
};
