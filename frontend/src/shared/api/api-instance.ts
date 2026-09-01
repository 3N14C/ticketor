import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
	baseURL: `${process.env.BACKEND_URL}/api`,
	withCredentials: true,
};

export const apiInstance = axios.create(options);