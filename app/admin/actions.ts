"use server";
import { getUserAndProfile } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function requireAdmin() {
  const { profile } = await getUserAndProfile();
  if (!profile || profile.role !== "admin") throw new Error("Not authorized");
}

export async function toggleSeniorBetaOverride(seniorId: string, value: boolean) {
  await requireAdmin();
  await supabaseAdmin.from("seniors").update({ beta_override: value }).eq("id", seniorId);
}
