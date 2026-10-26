const API_PREFIX = "/api/v1";

export const APIS = {
	auth: {
		signUp: `${API_PREFIX}/auth/sign-up`,
		signIn: `${API_PREFIX}/auth/sign-in`,
		me: `${API_PREFIX}/auth/me`,
		refreshTokens: `${API_PREFIX}/auth/refresh-tokens`,
	},
};