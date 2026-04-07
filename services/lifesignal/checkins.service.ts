import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const RESPONDED_STATUSES = ["responded", "help_requested", "resolved"];

export type CheckinRecord = {
  id: string;
  org_id: string;
  member_id: string;
  status: "pending" | "sent" | "responded" | "help_requested" | "missed" | "escalated" | "resolved";
  due_at: string;
  sent_at: string | null;
  response_text: string | null;
};

export async function listDueCheckins(nowIso: string) {
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("checkins")
    .select("id, org_id, member_id, status, due_at, sent_at, response_text")
    .lte("due_at", nowIso)
    .in("status", ["pending", "sent"])
    .order("due_at", { ascending: true })
    .limit(200);

  if (error) {
    throw new Error(`Failed to list due checkins: ${error.message}`);
  }

  return (data ?? []) as CheckinRecord[];
}

export async function markCheckinSent(checkinId: string, sentAtIso: string) {
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("checkins")
    .update({ status: "sent", sent_at: sentAtIso })
    .eq("id", checkinId)
    .in("status", ["pending", "sent"])
    .select("id, org_id, member_id, status, due_at, sent_at, response_text")
    .maybeSingle<CheckinRecord>();

  if (error) {
    throw new Error(`Failed to mark checkin sent: ${error.message}`);
  }

  return data;
}

export async function markCheckinMissed(checkinId: string) {
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("checkins")
    .update({ status: "missed", escalated_at: new Date().toISOString() })
    .eq("id", checkinId)
    .in("status", ["pending", "sent"])
    .select("id, org_id, member_id, status, due_at, sent_at, response_text")
    .maybeSingle<CheckinRecord>();

  if (error) {
    throw new Error(`Failed to mark checkin missed: ${error.message}`);
  }

  return data;
}

export async function respondToCheckin(input: {
  checkinId: string;
  responseText: string;
}) {
  const admin = createSupabaseAdminClient();
  const normalizedResponse = input.responseText.trim();
  const lower = normalizedResponse.toLowerCase();
  const helpRequested = lower.includes("help") || lower.includes("sos") || lower.includes("911");

  const { data: current, error: currentError } = await admin
    .from("checkins")
    .select("id, org_id, member_id, status")
    .eq("id", input.checkinId)
    .maybeSingle<{ id: string; org_id: string; member_id: string; status: string }>();

  if (currentError || !current) {
    throw new Error(currentError?.message ?? "Checkin not found");
  }

  if (RESPONDED_STATUSES.includes(current.status)) {
    return {
      id: current.id,
      org_id: current.org_id,
      member_id: current.member_id,
      status: current.status,
      response_text: normalizedResponse,
      alreadyProcessed: true,
    };
  }

  const nextStatus = helpRequested ? "help_requested" : "responded";

  const { data, error } = await admin
    .from("checkins")
    .update({
      status: nextStatus,
      response_text: normalizedResponse,
      response_received_at: new Date().toISOString(),
      resolved_at: helpRequested ? null : new Date().toISOString(),
    })
    .eq("id", input.checkinId)
    .select("id, org_id, member_id, status, response_text")
    .maybeSingle<{ id: string; org_id: string; member_id: string; status: string; response_text: string }>();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update checkin response");
  }

  return {
    ...data,
    alreadyProcessed: false,
  };
}

