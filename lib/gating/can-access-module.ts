import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function canAccessModule(orgId: string, moduleKey: string) {
  const { data, error } = await supabase
    .from("feature_entitlements")
    .select("id")
    .eq("organization_id", orgId)
    .eq("feature_key", moduleKey)
    .maybeSingle();

  if (error) {
    return false;
  }

  return !!data;
}


