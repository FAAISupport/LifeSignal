import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type SeedBody = {
  recipientName?: string;
  recipientPhone?: string;
  escalationContactName?: string;
  escalationContactPhone?: string;
  escalationContactRole?: "guardian" | "family" | "caregiver" | "neighbor" | "facility_staff" | "emergency_contact";
  channelMode?: "sms" | "voice" | "both";
  minutesUntilDue?: number;
  responseWindowMinutes?: number;
  retryDelayMinutes?: number;
  escalationDelayMinutes?: number;
  maxAttempts?: number;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRole);
}

function getBearerToken(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function assertAuthorized(req: NextRequest) {
  const seedSecret = process.env.DEV_SEED_SECRET || process.env.CRON_SECRET;

  if (!seedSecret) {
    throw new Error("Missing DEV_SEED_SECRET or CRON_SECRET");
  }

  if (getBearerToken(req) !== seedSecret) {
    throw new Error("Unauthorized");
  }
}

function normalizePhone(input: string) {
  const trimmed = input.trim();
  return trimmed.startsWith("+") ? trimmed : "+1" + trimmed.replace(/\D/g, "");
}

function makeId(prefix: string) {
  return prefix + "_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

function addMinutes(base: Date, minutes: number) {
  return new Date(base.getTime() + minutes * 60 * 1000);
}

export async function POST(req: NextRequest) {
  try {
    assertAuthorized(req);

    const body = (await req.json().catch(() => ({}))) as SeedBody;
    const supabase = getSupabaseAdmin();
    const now = new Date();

    const recipientName = body.recipientName || "LifeSignal Test Recipient";
    const recipientPhone = normalizePhone(body.recipientPhone || "+13525550101");
    const escalationContactName = body.escalationContactName || "LifeSignal Test Guardian";
    const escalationContactPhone = normalizePhone(body.escalationContactPhone || "+13525550102");
    const escalationContactRole = body.escalationContactRole || "guardian";
    const channelMode = body.channelMode || "both";

    const minutesUntilDue = Number.isFinite(body.minutesUntilDue) ? Number(body.minutesUntilDue) : 0;
    const responseWindowMinutes = Number.isFinite(body.responseWindowMinutes) ? Number(body.responseWindowMinutes) : 15;
    const retryDelayMinutes = Number.isFinite(body.retryDelayMinutes) ? Number(body.retryDelayMinutes) : 5;
    const escalationDelayMinutes = Number.isFinite(body.escalationDelayMinutes) ? Number(body.escalationDelayMinutes) : 5;
    const maxAttempts = Number.isFinite(body.maxAttempts) ? Number(body.maxAttempts) : 3;

    const scheduledFor = addMinutes(now, minutesUntilDue);
    const windowStart = scheduledFor;
    const windowEnd = addMinutes(scheduledFor, responseWindowMinutes);

    const channels =
      channelMode === "sms"
        ? ["sms"]
        : channelMode === "voice"
          ? ["voice"]
          : ["sms", "voice"];

    const recipientUpsert = await supabase
      .from("care_recipients")
      .upsert(
        {
          id: makeId("rec"),
          full_name: recipientName,
          phone: recipientPhone,
          timezone: "America/New_York",
          preferred_channels: channels,
          confirmation_keywords: ["yes", "ok", "okay", "1", "y", "safe"],
          help_keywords: ["help", "sos", "911", "emergency", "urgent"],
          is_active: true,
          metadata: {
            source: "dev.seed-test-care",
            seeded_at: now.toISOString(),
          },
          updated_at: now.toISOString(),
        },
        {
          onConflict: "phone",
          ignoreDuplicates: false,
        }
      )
      .select("id, full_name, phone, preferred_channels")
      .single();

    if (recipientUpsert.error) {
      throw recipientUpsert.error;
    }

    const recipient = recipientUpsert.data;

    const contactUpsert = await supabase
      .from("care_escalation_contacts")
      .upsert(
        {
          id: makeId("esc"),
          recipient_id: recipient.id,
          name: escalationContactName,
          phone: escalationContactPhone,
          role: escalationContactRole,
          priority: 1,
          can_acknowledge: true,
          is_active: true,
          metadata: {
            notify_sms: true,
            notify_voice: channelMode !== "sms",
            step_delay_minutes: 2,
            source: "dev.seed-test-care",
            seeded_at: now.toISOString(),
          },
          updated_at: now.toISOString(),
        },
        {
          onConflict: "id",
          ignoreDuplicates: false,
        }
      )
      .select("id, recipient_id, name, phone, role, priority")
      .single();

    if (contactUpsert.error) {
      throw contactUpsert.error;
    }

    const checkinInsert = await supabase
      .from("care_checkins")
      .insert({
        id: makeId("chk"),
        recipient_id: recipient.id,
        scheduled_for: scheduledFor.toISOString(),
        window_start: windowStart.toISOString(),
        window_end: windowEnd.toISOString(),
        channels,
        attempts_made: 0,
        max_attempts: maxAttempts,
        retry_delay_minutes: retryDelayMinutes,
        escalation_delay_minutes: escalationDelayMinutes,
        status: "pending",
        metadata: {
          source: "dev.seed-test-care",
          seeded_at: now.toISOString(),
          seed_note: "Created for end-to-end Twilio testing",
        },
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .select("*")
      .single();

    if (checkinInsert.error) {
      throw checkinInsert.error;
    }

    return NextResponse.json({
      ok: true,
      recipient: recipientUpsert.data,
      escalationContact: contactUpsert.data,
      checkin: checkinInsert.data,
      nextSteps: {
        runCheckinsCron: "/api/cron/checkins/run",
        runEscalationsCron: "/api/cron/escalations/run",
        replyYes: "Recipient replies YES to confirm",
        replyHelp: "Recipient replies HELP to open incident",
        replyAck: "Escalation contact replies ACK after escalation",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 500;

    console.error("[dev:seed-test-care:error]", error);

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status }
    );
  }
}
