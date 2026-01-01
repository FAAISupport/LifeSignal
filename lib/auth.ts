import { supabaseServer } from "@/lib/supabase/server";

export async function requireUser() {
  const sb = await supabaseServer();
  const { data, error } = await sb.auth.getUser();
  if (error || !data?.user) throw new Error("Not authenticated");
  return data.user;
}

export async function getUserAndProfile() {
  const sb = await supabaseServer();
  const { data: authData } = await sb.auth.getUser();
  const user = authData?.user ?? null;
  if (!user) return { user: null, profile: null };

  const { data: profile } = await sb
    .from("profiles")
    .select("user_id,name,role")
    .eq("user_id", user.id)
    .maybeSingle();

  return { user, profile: profile ?? null };
}
