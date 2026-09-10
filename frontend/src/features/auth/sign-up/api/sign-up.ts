import { apiInstance } from "@shared/api";
import { SignUpDto, SignUpResponse } from "./types";
import { APIS } from "@shared/config";

export const signUp = async (dto: SignUpDto): Promise<SignUpResponse> => {
	const { data } = await apiInstance.post<SignUpResponse>(
		APIS.auth.signUp,
		dto
	);

	return data;
};