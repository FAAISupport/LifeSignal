import { redirect } from "next/navigation";

import { getAuthContext, type OrgRole } from "@/lib/auth/get-auth-context";

const ROLE_ORDER: Record<OrgRole, number> = {
  viewer: 0,
  member: 1,
  manager: 2,
  admin: 3,
  owner: 4,
};

export type MembershipRequirement = OrgRole[];

function hasRequiredRole(currentRole: OrgRole, allowedRoles: MembershipRequirement) {
  return allowedRoles.some((role) => ROLE_ORDER[currentRole] >= ROLE_ORDER[role]);
}

export async function requireAuth() {
  const auth = await getAuthContext();

  if (!auth?.user) {
    redirect("/auth/login");
  }

  return auth;
}

export async function requireMembership(allowedRoles: MembershipRequirement = ["viewer"]) {
  const auth = await requireAuth();

  if (!auth.membership?.orgId) {
    redirect("/auth/signup");
  }

  if (!hasRequiredRole(auth.membership.role, allowedRoles)) {
    redirect("/unauthorized");
  }

  return auth.membership;
}

export async function requireOrganizationRole(allowedRoles: MembershipRequirement = ["viewer"]) {
  const auth = await requireAuth();

  if (!auth.membership?.orgId) {
    redirect("/auth/signup");
  }

  if (!hasRequiredRole(auth.membership.role, allowedRoles)) {
    redirect("/unauthorized");
  }

  return auth;
}

