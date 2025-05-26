import type { PostgrestError } from "@supabase/supabase-js";
import type { BusninessAccountDto } from "./dto";
import { supabase } from "../../supabaseClient";

export async function getBusinessAccounts(): Promise<{
	data: BusninessAccountDto[];
	error: PostgrestError | null;
}> {
	try {
		const { data, error } = await supabase.from("BusinessAccount").select("*");

		return {
			data: (data as BusninessAccountDto[]) || [],
			error,
		};
	} catch (error) {
		console.error(error);
		return {
			data: [],
			error: error as PostgrestError,
		};
	}
}

export async function getBusinessAccount(business_id: string) {
	const { data, error } = await supabase
		.from("BusinessAccount")
		.select("*")
		.eq("id", business_id)
		.single();

	return {
		data: data as BusninessAccountDto,
		error,
	};
}

export async function postBusinessAccount(postData: BusninessAccountDto){
	const { data, error } = await supabase
		.from('BusinessAccount')
		.insert(postData)
		.select();
	if (error) {
		console.error("Error posting business account:", error);
		throw error;
	}
	
	return data;
}
