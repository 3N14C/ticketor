import { apiInstance } from "@shared/api";
import { SignUpDto, SignUpResponse } from "./types";

export const signUp = async (dto: SignUpDto): Promise<SignUpResponse> => {
	const { data } = await apiInstance.post<SignUpResponse>(
		"v1/auth/sign-up",
		dto
	);

	return data;
};