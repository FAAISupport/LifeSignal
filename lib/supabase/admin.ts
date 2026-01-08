import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
}

if (!serviceKey) {
  throw new Error("Missing env var: SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
