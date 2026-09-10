import { type SignInDto, SignInResponse } from "./types";
import { apiInstance } from "@shared/api";
import { APIS } from "@shared/config";

export const signIn = async (dto: SignInDto): Promise<SignInResponse> => {
	const { data } = await apiInstance.post(APIS.auth.signIn, dto);

	return data;
};