import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PAGES } from "@shared/config";
import { signUp } from "../api/sign-up";
import { type SignUpFormValues } from "./sign-up-schema";
import { toast } from "sonner";
import { ApiError } from "@shared/api";

export const useSignUp = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: ({ username, email, password }: SignUpFormValues) =>
			signUp({ username, email, password }),
		onSuccess: ({ message }) => {
			router.push(PAGES.auth.signIn);
			toast.success(message);
		},
		onError: ({ message }: ApiError) => {
			toast.error(message);
		},
	});
};