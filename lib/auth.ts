// lib/auth.ts
import { supabaseServer } from "@/lib/supabase/server";

export type Profile = {
  id?: string;
  user_id?: string;

  email?: string | null;
  full_name?: string | null;

  // common admin flags / role fields (support multiple schemas)
  role?: string | null;
  is_admin?: boolean | null;

  // allow extra columns without typing fights
  [key: string]: any;
};

export type UserAndProfile = {
  user: {
    id: string;
    email?: string | null;
    [key: string]: any;
  };
  profile: Profile | null;
  isAdmin: boolean;
};

/**
 * Requires a signed-in user or throws.
 * Use in server components / server actions.
 */
export async function requireUser() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("Not authenticated");
  }

  return data.user;
}

/**
 * Fetches user + profile in one call site.
 * - Will NOT crash if profiles table/row is missing; profile becomes null.
 * - Computes isAdmin from common profile fields.
 *
 * app/admin/* expects this export.
 */
export async function getUserAndProfile(): Promise<UserAndProfile> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("Not authenticated");
  }

  const user = data.user;

  // Try to load profile. If table doesn't exist or row missing, return null profile.
  let profile: Profile | null = null;

  try {
    // Attempt 1: profiles.id = auth.uid()
    const attempt1 = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!attempt1.error) {
      profile = (attempt1.data as Profile) ?? null;
    } else {
      // Attempt 2: profiles.user_id = auth.uid() (common schema)
      const attempt2 = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!attempt2.error) profile = (attempt2.data as Profile) ?? null;
    }
  } catch {
    profile = null;
  }

  const role = typeof profile?.role === "string" ? profile.role.toLowerCase() : null;
  const isAdmin = profile?.is_admin === true || role === "admin";

  return {
    // IMPORTANT: spread first, then override so we do NOT duplicate keys
    user: { ...user, id: user.id, email: user.email ?? null },
    profile,
    isAdmin,
  };
}

/**
 * Optional helper.
 */
export async function requireAdmin() {
  const { user, profile, isAdmin } = await getUserAndProfile();
  if (!isAdmin) throw new Error("Not authorized");
  return { user, profile };
}
