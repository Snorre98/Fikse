import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import type { Tables } from "../supabase";

export async function getCountryVat(): Promise<{
  data: Tables<"CountryVAT">[] | null;
  error: PostgrestError | null;
}> {
    const {data, error} = await supabase
        .from("CountryVAT")
        .select("*");
    return { data, error };
}