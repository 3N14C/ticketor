import type { Metadata } from "next";
import { SignUp } from "@pages/auth";

export const metadata: Metadata = {
	title: "Sign Up",
};

export default function SignUpPage() {
	return <SignUp />;
}
