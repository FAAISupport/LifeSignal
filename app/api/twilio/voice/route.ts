import { NextResponse } from "next/server";

import { buildVoiceFinalResponse, buildVoiceGatherResponse, parseVoiceIntent } from "@/lib/twilio";
import { createAdminClient } from "@/lib/supabase/admin";
import { respondToCheckin } from "@/services/lifesignal/checkins.service";
import { escalateCheckinIfNeeded } from "@/lib/lifesignal/escalation-engine";

function xml(body: string) {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function findLatestOpenCheckinByPhone(phone: string) {
  const admin = createAdminClient();

  const { data: member } = await admin
    .from("monitored_members")
    .select("id, org_id")
    .eq("phone_e164", phone)
    .maybeSingle<{ id: string; org_id: string }>();

  if (!member) return null;

  const { data: checkin } = await admin
    .from("checkins")
    .select("id, org_id, member_id")
    .eq("org_id", member.org_id)
    .eq("member_id", member.id)
    .in("status", ["pending", "sent", "help_requested"])
    .order("due_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string; org_id: string; member_id: string }>();

  return checkin ?? null;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const from = String(form.get("From") ?? "").trim();
    const digits = String(form.get("Digits") ?? "").trim();

    if (!from) {
      return xml(buildVoiceFinalResponse("We could not identify your call. Goodbye."));
    }

    if (!digits) {
      const actionUrl = new URL(request.url);
      return xml(buildVoiceGatherResponse(actionUrl.toString()));
    }

    const checkin = await findLatestOpenCheckinByPhone(from);
    if (!checkin) {
      return xml(buildVoiceFinalResponse("No active check-in was found for this number. Goodbye."));
    }

    const intent = parseVoiceIntent(digits);

    if (intent === "confirm") {
      await respondToCheckin({ checkinId: checkin.id, responseText: "1" });
      return xml(buildVoiceFinalResponse("Thank you. Your check-in is confirmed."));
    }

    if (intent === "help") {
      await respondToCheckin({ checkinId: checkin.id, responseText: "HELP" });
      await escalateCheckinIfNeeded({
        orgId: checkin.org_id,
        memberId: checkin.member_id,
        checkinId: checkin.id,
        reason: "help_requested",
      });
      return xml(buildVoiceFinalResponse("Help request received. Your care team is being notified now."));
    }

    return xml(buildVoiceFinalResponse("Invalid selection. Please answer the next check-in call."));
  } catch {
    return xml(buildVoiceFinalResponse("We could not process your response. Goodbye."));
  }
}
