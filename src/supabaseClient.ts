import { createClient } from '@supabase/supabase-js'
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string ?? "N/A";
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string ?? "N/A";

console.log(supabaseUrl)

if (import.meta.env.VITE_SUPABASE_URL) {
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  }
  
  if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
    supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables");
  }
  
export const supabase = createClient(supabaseUrl, supabaseAnonKey);