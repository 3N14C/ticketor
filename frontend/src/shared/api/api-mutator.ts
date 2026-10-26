import type { AxiosRequestConfig } from "axios";
import { apiInstance } from "./api-instance";
import type { ApiError } from "./api-error";

export const apiMutator = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> =>
	apiInstance<T>({ ...config, ...options }).then(({ data }) => data);

export type ErrorType<E = unknown> = E extends unknown ? ApiError : never;
export type BodyType<T> = T;
