import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type OrgRole = "owner" | "admin" | "manager" | "member" | "viewer";

export type AuthContext = {
  user: {
    id: string;
    email: string | null;
  };
  profile: Record<string, unknown> | null;
  organizationId: string | null;
  role: OrgRole | null;
  membership: {
    id?: string;
    orgId: string;
    org_id: string;
    role: OrgRole;
    status?: string | null;
  } | null;
};

const MEMBERSHIP_TABLE_CANDIDATES = [
  "organization_members",
  "organization_memberships",
  "memberships",
] as const;

const PROFILE_TABLE_CANDIDATES = ["profiles"] as const;

function normalizeRole(value: unknown): OrgRole {
  if (
    value === "owner" ||
    value === "admin" ||
    value === "manager" ||
    value === "member" ||
    value === "viewer"
  ) {
    return value;
  }

  return "member";
}

function pickOrgId(row: Record<string, unknown> | null | undefined): string | null {
  if (!row) return null;

  const candidates = ["organization_id", "org_id", "team_id"];
  for (const key of candidates) {
    const value = row[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

async function loadProfile(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string
) {
  for (const table of PROFILE_TABLE_CANDIDATES) {
    const { data, error } = await (supabase as any)
      .from(table)
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!error) return (data as Record<string, unknown> | null) ?? null;
  }

  return null;
}

async function loadMembership(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string
) {
  for (const table of MEMBERSHIP_TABLE_CANDIDATES) {
    const { data, error } = await (supabase as any)
      .from(table)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      const row = data as Record<string, unknown>;
      const orgId = pickOrgId(row);

      if (orgId) {
        return {
          id: typeof row.id === "string" ? row.id : undefined,
          orgId,
          org_id: orgId,
          role: normalizeRole(row.role),
          status: typeof row.status === "string" ? row.status : null,
        };
      }
    }
  }

  return null;
}

export const getAuthContext = cache(async (): Promise<AuthContext | null> => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const [profile, membership] = await Promise.all([
    loadProfile(supabase, user.id),
    loadMembership(supabase, user.id),
  ]);

  return {
    user: {
      id: user.id,
      email: user.email ?? null,
    },
    profile,
    organizationId: membership?.orgId ?? null,
    role: membership?.role ?? null,
    membership,
  };
});

