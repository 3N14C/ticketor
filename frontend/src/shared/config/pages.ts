export const PAGES = {
	home: "/",
	auth: {
		signIn: "/auth/sign-in",
		signUp: "/auth/sign-up",
		forgotPassword: "/auth/forgot-password",
		resetPassword: (email: string) => `/auth/reset-password?email=${email}`,
	},
};