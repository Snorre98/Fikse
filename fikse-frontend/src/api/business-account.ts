import axios, { type AxiosResponse } from "axios";
import { BACKEND_URL } from "./constants";

interface createBusinessAccount {
	// TODO: add correct fields
	form_data: string;
}

export async function createBusinessAccount(
	data: createBusinessAccount,
): Promise<AxiosResponse> {
	const url = `${BACKEND_URL}/create-busniness-account`;
	const response = await axios.post(url, data, { withCredentials: true });
	return response.data;
}
