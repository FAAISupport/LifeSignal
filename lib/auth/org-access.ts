import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type OrgRole = "owner" | "admin" | "manager" | "member" | "viewer";

export type OrgMembership = {
  org_id: string;
  user_id: string;
  role: OrgRole;
  status: string;
};

export async function getCurrentMembership() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("organization_members")
    .select("org_id, user_id, role, status")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .maybeSingle<OrgMembership>();

  return data ?? null;
}

export async function requireMembership(allowedRoles?: OrgRole[]) {
  const membership = await getCurrentMembership();

  if (!membership) {
    redirect("/auth/login?error=You%20must%20be%20logged%20in");
  }

  if (allowedRoles && !allowedRoles.includes(membership.role)) {
    redirect("/dashboard?error=Insufficient%20permissions");
  }

  return membership;
}
