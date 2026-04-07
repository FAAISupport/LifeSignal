import { randomUUID } from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient as createServerClient } from "@/lib/supabase/server";

export type OrganizationRole = "owner" | "admin" | "manager" | "member" | "viewer";

type InviteRecord = {
  id: string;
  org_id: string;
  email: string;
  role: OrganizationRole;
  invited_by_user_id: string;
  token: string;
  status: "pending" | "accepted" | "revoked" | "expired";
  expires_at: string;
};

export async function createInvite(params: {
  orgId: string;
  email: string;
  role: OrganizationRole;
  invitedByUserId: string;
  expiresInDays?: number;
}) {
  const supabase = await createServerClient();
  const now = new Date();
  const expires = new Date(now.getTime() + (params.expiresInDays ?? 7) * 24 * 60 * 60 * 1000);

  const supabaseAny = supabase as any;

  const { data, error } = await supabaseAny
    .from("invites")
    .insert({
      org_id: params.orgId,
      email: params.email.trim().toLowerCase(),
      role: params.role,
      invited_by_user_id: params.invitedByUserId,
      token: randomUUID(),
      status: "pending",
      expires_at: expires.toISOString(),
    })
    .select("id, org_id, email, role, invited_by_user_id, token, status, expires_at")
    .single();

  if (error) {
    throw new Error(`Failed to create invite: ${error.message}`);
  }

  return data;
}

export async function listInvites(orgId: string) {
  const supabase = await createServerClient();
  const supabaseAny = supabase as any;

  const { data, error } = await supabaseAny
    .from("invites")
    .select("id, org_id, email, role, invited_by_user_id, token, status, expires_at")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to list invites: ${error.message}`);
  }

  return data as InviteRecord[];
}

export async function acceptInvite(params: { token: string; userId: string }) {
  const admin = createSupabaseAdminClient();

  const { data: invite, error: inviteError } = await admin
    .from("invites")
    .select("id, org_id, email, role, invited_by_user_id, token, status, expires_at")
    .eq("token", params.token)
    .maybeSingle();

  if (inviteError) {
    throw new Error(`Failed to fetch invite: ${inviteError.message}`);
  }

  if (!invite) {
    throw new Error("Invite was not found.");
  }

  if (invite.status !== "pending") {
    throw new Error("Invite is no longer pending.");
  }

  if (new Date(invite.expires_at).getTime() <= Date.now()) {
    const { error: expireError } = await admin
      .from("invites")
      .update({ status: "expired" })
      .eq("id", invite.id)
      .eq("status", "pending");

    if (expireError) {
      throw new Error(`Failed to mark invite expired: ${expireError.message}`);
    }

    throw new Error("Invite has expired.");
  }

  const { data: userResult, error: userError } = await admin.auth.admin.getUserById(params.userId);
  if (userError || !userResult.user) {
    throw new Error("Unable to validate current user.");
  }

  const userEmail = userResult.user.email?.trim().toLowerCase();
  if (!userEmail || userEmail !== invite.email.trim().toLowerCase()) {
    throw new Error("Invite email does not match the signed-in user.");
  }

  const { error: memberError } = await admin.from("organization_members").upsert(
    {
      org_id: invite.org_id,
      user_id: params.userId,
      role: invite.role,
      status: "active",
      invited_by_user_id: invite.invited_by_user_id,
      joined_at: new Date().toISOString(),
    },
    {
      onConflict: "org_id,user_id",
      ignoreDuplicates: false,
    },
  );

  if (memberError) {
    throw new Error(`Failed to attach member to organization: ${memberError.message}`);
  }

  const { error: updateInviteError } = await admin
    .from("invites")
    .update({
      status: "accepted",
      accepted_by_user_id: params.userId,
      accepted_at: new Date().toISOString(),
    })
    .eq("id", invite.id)
    .eq("status", "pending");

  if (updateInviteError) {
    throw new Error(`Failed to finalize invite: ${updateInviteError.message}`);
  }

  return {
    orgId: invite.org_id,
    role: invite.role,
  };
}




