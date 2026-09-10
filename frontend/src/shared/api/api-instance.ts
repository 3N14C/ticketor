import axios, { CreateAxiosDefaults } from "axios";
import { registerErrorInterceptor } from "./error-interceptor";

const options: CreateAxiosDefaults = {
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
	withCredentials: true,
};

export const apiInstance = axios.create(options);

registerErrorInterceptor(apiInstance);
