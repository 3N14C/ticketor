import { useRouter } from "next/navigation";
import { PAGES } from "@shared/config";

export const useForgotPassword = () => {
	const router = useRouter();

	const submit = (email: string) => {
		return router.push(PAGES.auth.resetPassword(email));
	};

	return {
		submit,
	};
};