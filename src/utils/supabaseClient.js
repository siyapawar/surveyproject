import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file and the server is restarted."
  );
  // Optionally, you could throw an error here or handle it differently
  // For now, supabase will remain undefined if keys are missing.
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the potentially initialized client
export { supabase };
