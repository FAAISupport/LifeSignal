import { NextRequest, NextResponse } from "next/server";
import { recordConsent } from "@/lib/compliance/consent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent");

    const result = await recordConsent({
      phoneE164: body.phone,
      email: body.email ?? null,
      fullName: body.fullName ?? null,
      source: body.source ?? "website",
      status: body.status ?? "opted_in",
      channel: body.channel ?? "both",
      ipAddress,
      userAgent,
      formPath: body.formPath ?? "/beta",
      referrer: req.headers.get("referer"),
      metadata: body.metadata ?? {},
    });

    return NextResponse.json({ ok: true, consent: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}


