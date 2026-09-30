import axios, { AxiosInstance } from "axios";
import { ApiError } from "../api-error";

interface NestErrorBody {
	message?: string | string[];
	statusCode?: number;
}

const toApiError = (error: unknown): ApiError => {
	if (!axios.isAxiosError<NestErrorBody>(error)) {
		return new ApiError("Something went wrong");
	}

	if (error.code === "ERR_NETWORK") {
		return new ApiError("Network error");
	}

	const raw = error.response?.data?.message;
	const message = Array.isArray(raw) ? raw[0] : raw;

	return new ApiError(typeof message === "string" && message ? message : "Request failed", error.response?.status);
};

export const registerErrorInterceptor = (instance: AxiosInstance): void => {
	instance.interceptors.response.use(
		(response) => response,
		(error) => Promise.reject(toApiError(error))
	);
};
