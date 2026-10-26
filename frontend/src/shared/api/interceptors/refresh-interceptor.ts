import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { CREDENTIALS_ENDPOINTS, REFRESH_ENDPOINT } from "./refresh-endpoints";

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
			const isRefreshCall = config?.url === REFRESH_ENDPOINT;
			const isCredentialsCall = !!config?.url && CREDENTIALS_ENDPOINTS.includes(config.url);
			const alreadyRetried = config?._retry;

			if (!config || !isUnauthorized || isRefreshCall || isCredentialsCall || alreadyRetried) {
				return Promise.reject(error);
			}

			config._retry = true;

			if (!refreshPromise) {
				refreshPromise = instance.post(REFRESH_ENDPOINT).finally(() => {
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