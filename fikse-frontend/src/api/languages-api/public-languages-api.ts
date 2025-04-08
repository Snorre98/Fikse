import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import type { Tables } from "../supabase";

export async function getLanguages(): Promise<{
  data: Tables<"SupportedLanguages">[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase
    .from("SupportedLanguages")
    .select("*");
  
  return { data, error };
}