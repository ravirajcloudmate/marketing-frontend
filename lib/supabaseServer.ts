import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  );
}

export const supabaseServer = createClient(supabaseUrl ?? "", serviceRoleKey ?? "", {
  auth: {
    persistSession: false,
  },
});

