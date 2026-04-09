import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type QueueStatus = "queued" | "processing" | "ready_to_escalate";
type ScenarioKey = "daily" | "late" | "none" | "critical";

type DispatchQueueItem = {
  id: string;
  title: string;
  description: string;
  status: QueueStatus;
  scheduledAt: string;
  scenario: ScenarioKey;
  source: "api";
  checkInId?: string | null;
  recipientId?: string | null;
};

function mapCheckinToQueueItem(row: Record<string, any>): DispatchQueueItem {
  const status = String(row.status || "pending");
  const attempts = Number(row.attempts_made || 0);
  const scheduledAt = row.scheduled_for || row.window_start || row.created_at || new Date().toISOString();

  let queueStatus: QueueStatus = "queued";
  let scenario: ScenarioKey = "daily";
  let description = "Check-in is queued for outbound dispatch.";

  if (status === "pending" && attempts > 0) {
    queueStatus = "processing";
    scenario = "late";
    description = "Retry or fallback processing is underway.";
  } else if (status === "missed" || status === "escalating") {
    queueStatus = "ready_to_escalate";
    scenario = "none";
    description = "This item is waiting on escalation handling.";
  } else if (status === "help_requested") {
    queueStatus = "ready_to_escalate";
    scenario = "critical";
    description = "Help was requested and urgent handling is required.";
  }

  return {
    id: String(row.id),
    title: `Dispatch item for ${row.recipient_name || row.recipient_id || "unknown recipient"}`,
    description,
    status: queueStatus,
    scheduledAt,
    scenario,
    source: "api",
    checkInId: row.id ?? null,
    recipientId: row.recipient_id ?? null,
  };
}

export async function GET(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const url = new URL(req.url);
    const scenario = url.searchParams.get("scenario");
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("care_checkins")
      .select("id, recipient_id, scheduled_for, window_start, created_at, status, attempts_made, metadata")
      .in("status", ["pending", "missed", "escalating", "help_requested"])
      .order("scheduled_for", { ascending: true })
      .limit(50);

    if (error) {
      throw new Error(error.message);
    }

    const recipientIds = Array.from(new Set((data || []).map((row) => row.recipient_id).filter(Boolean)));

    let recipientMap = new Map<string, string>();
    if (recipientIds.length > 0) {
      const { data: recipients, error: recipientsError } = await supabase
        .from("care_recipients")
        .select("id, full_name")
        .in("id", recipientIds);

      if (recipientsError) {
        throw new Error(recipientsError.message);
      }

      recipientMap = new Map((recipients || []).map((row: any) => [row.id, row.full_name]));
    }

    const items = (data || []).map((row: any) =>
      mapCheckinToQueueItem({
        ...row,
        recipient_name: recipientMap.get(row.recipient_id) || null,
      })
    );

    const filtered = scenario ? items.filter((item) => item.scenario === scenario) : items;

    return NextResponse.json({
      ok: true,
      message: "Dispatch queue loaded successfully.",
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to load dispatch queue.",
      },
      { status: 500 }
    );
  }
}