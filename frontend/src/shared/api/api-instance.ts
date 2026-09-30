import axios, { CreateAxiosDefaults } from "axios";
import { registerErrorInterceptor } from "./interceptors/error-interceptor";
import { registerRefreshInterceptor } from "./interceptors/refresh-interceptor";

const options: CreateAxiosDefaults = {
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
	withCredentials: true,
};

export const apiInstance = axios.create(options);

registerRefreshInterceptor(apiInstance);
registerErrorInterceptor(apiInstance);