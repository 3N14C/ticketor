import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { APIS } from "../../config";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

export const registerRefreshInterceptor = (instance: AxiosInstance): void => {
	let refreshPromise: Promise<unknown> | null = null;

	instance.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const config = error.config as RetriableRequestConfig | undefined;

			const isUnauthorized = error.response?.status === 401;
			const isRefreshCall = config?.url === APIS.auth.refreshTokens;
			const isCredentialsCall = config?.url === APIS.auth.signIn || config?.url === APIS.auth.signUp;
			const alreadyRetried = config?._retry;

			if (!config || !isUnauthorized || isRefreshCall || isCredentialsCall || alreadyRetried) {
				return Promise.reject(error);
			}

			config._retry = true;

			if (!refreshPromise) {
				refreshPromise = instance.post(APIS.auth.refreshTokens).finally(() => {
					refreshPromise = null;
				});
			}

			try {
				await refreshPromise;
				return instance(config);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
	);
};