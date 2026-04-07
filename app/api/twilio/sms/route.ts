import { NextResponse } from "next/server";

import { parseSmsIntent, buildSmsResponse } from "@/lib/twilio";
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

  const { data: member, error: memberError } = await admin
    .from("monitored_members")
    .select("id, org_id")
    .eq("phone_e164", phone)
    .maybeSingle<{ id: string; org_id: string }>();

  if (memberError || !member) {
    return null;
  }

  const { data: checkin } = await admin
    .from("checkins")
    .select("id, org_id, member_id, status")
    .eq("org_id", member.org_id)
    .eq("member_id", member.id)
    .in("status", ["pending", "sent", "help_requested"])
    .order("due_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string; org_id: string; member_id: string; status: string }>();

  return checkin ?? null;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const from = String(form.get("From") ?? "").trim();
    const body = String(form.get("Body") ?? "").trim();

    if (!from) {
      return xml(buildSmsResponse("We could not verify your sender number. Please try again."));
    }

    const checkin = await findLatestOpenCheckinByPhone(from);
    if (!checkin) {
      return xml(buildSmsResponse("No active check-in was found for this number."));
    }

    const intent = parseSmsIntent(body);

    if (intent === "yes") {
      await respondToCheckin({ checkinId: checkin.id, responseText: "YES" });
      return xml(buildSmsResponse("Thank you. Your check-in has been recorded as safe."));
    }

    if (intent === "help") {
      await respondToCheckin({ checkinId: checkin.id, responseText: "HELP" });
      await escalateCheckinIfNeeded({
        orgId: checkin.org_id,
        memberId: checkin.member_id,
        checkinId: checkin.id,
        reason: "help_requested",
      });

      return xml(buildSmsResponse("Help request received. We are notifying your care team now."));
    }

    return xml(buildSmsResponse("Please reply YES if you are safe or HELP if you need immediate assistance."));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected SMS processing error";
    return xml(buildSmsResponse(`We could not process your response. ${message}`));
  }
}
