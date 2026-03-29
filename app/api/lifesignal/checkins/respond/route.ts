import { NextResponse } from "next/server";
import { z } from "zod";

import { escalateCheckinIfNeeded } from "@/lib/lifesignal/escalation-engine";
import { respondToCheckin } from "@/services/lifesignal/checkins.service";

const respondSchema = z.object({
  checkinId: z.string().uuid(),
  responseText: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const payload = respondSchema.parse(await request.json());
    const checkin = await respondToCheckin({
      checkinId: payload.checkinId,
      responseText: payload.responseText,
    });

    let escalation = null;
    if (checkin.status === "help_requested") {
      escalation = await escalateCheckinIfNeeded({
        orgId: checkin.org_id,
        memberId: checkin.member_id,
        checkinId: checkin.id,
        reason: "help_requested",
      });
    }

    return NextResponse.json(
      {
        ok: true,
        checkin,
        escalation,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Invalid request payload", issues: error.issues }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Failed to record checkin response";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
