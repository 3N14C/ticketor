import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/sign-in";
import { SignInDto } from "../api/types";
import { toast } from "sonner";
import { ApiError } from "@shared/api";
import { PAGES } from "@shared/config";

export const useSignIn = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: (dto: SignInDto) => signIn(dto),
		onSuccess: ({ message }) => {
			router.replace(PAGES.home);
			toast.success(message);
		},
		onError: ({ message }: ApiError) => {
			toast.error(message);
		},
	});
};