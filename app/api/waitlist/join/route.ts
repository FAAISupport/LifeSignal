import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getTwilioClient } from "@/lib/twilio/client";

const WAITLIST_TABLE = process.env.WAITLIST_TABLE_NAME || "waitlist_entries";

type WaitlistPayload = {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  referralCode?: string;
  referredBy?: string;
  consent?: boolean;
  consentSource?: string;
  notes?: string;
  metadata?: Record<string, unknown> | null;
};

function makeReferralCode(name: string, emailOrPhone: string) {
  const seed = (name + emailOrPhone)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10) || "guest";

  const suffix = Math.random().toString(36).slice(2, 8);
  return seed + suffix;
}

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizePhone(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "true" || v === "1" || v === "yes" || v === "on";
  }
  return false;
}

function safeObject(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return { raw: value };
    }
  }
  return null;
}

async function readPayload(req: NextRequest): Promise<WaitlistPayload> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    return (body ?? {}) as WaitlistPayload;
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await req.formData();
    return {
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      source: String(form.get("source") ?? ""),
      referralCode: String(form.get("referralCode") ?? ""),
      referredBy: String(form.get("referredBy") ?? ""),
      consent: normalizeBoolean(form.get("consent")),
      consentSource: String(form.get("consentSource") ?? ""),
      notes: String(form.get("notes") ?? ""),
      metadata: safeObject(form.get("metadata")),
    };
  }

  return {};
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Waitlist join endpoint ready",
    method: "GET",
  });
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      );
    }

    const payload = await readPayload(req);

    const firstName = normalizeString(payload.firstName);
    const lastName = normalizeString(payload.lastName);
    const explicitName = normalizeString(payload.name);
    const email = normalizeEmail(payload.email);
    const phone = normalizePhone(payload.phone);
    const source = normalizeString(payload.source) || "website";
    const referredBy = normalizeString(payload.referredBy);
    const consent = normalizeBoolean(payload.consent);
    const consentSource = normalizeString(payload.consentSource) || "lifesignal_onboarding_form";
    const notes = normalizeString(payload.notes);
    const metadata = safeObject(payload.metadata);

    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "Email or phone is required" },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { ok: false, error: "SMS consent is required" },
        { status: 400 }
      );
    }

    const fullName =
      explicitName ||
      [firstName, lastName].filter(Boolean).join(" ").trim() ||
      phone ||
      email ||
      "LifeSignal Contact";

    const supabase = createClient(url, key);

    const referralCode =
      normalizeString(payload.referralCode) || makeReferralCode(fullName, email || phone);

    let existingQuery = supabase
      .from(WAITLIST_TABLE)
      .select("id, email, phone, referral_code");

    if (email) {
      existingQuery = existingQuery.eq("email", email);
    } else {
      existingQuery = existingQuery.eq("phone", phone);
    }

    const { data: existing, error: existingError } = await existingQuery.maybeSingle();

    if (existingError) {
      return NextResponse.json(
        { ok: false, error: "Failed checking existing entry", details: existingError.message },
        { status: 500 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent") || null;
    const page = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || null;

    let entryId: string | null = null;

    if (existing) {
      entryId = existing.id;

      const { error: updateError } = await supabase
        .from(WAITLIST_TABLE)
        .update({
          name: fullName,
          email: email || null,
          phone: phone || null,
          consent: true,
          consent_source: consentSource,
          opt_in_status: "pending",
          opt_in_requested_at: new Date().toISOString(),
          opt_in_page: page,
          opt_in_ip: ip,
          opt_in_user_agent: userAgent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (updateError) {
        return NextResponse.json(
          { ok: false, error: "Failed updating waitlist entry", details: updateError.message },
          { status: 500 }
        );
      }
    } else {
      const row = {
        name: fullName,
        email: email || null,
        phone: phone || null,
        source,
        referral_code: referralCode,
        referred_by: referredBy || null,
        consent: true,
        consent_source: consentSource,
        opt_in_status: "pending",
        opt_in_requested_at: new Date().toISOString(),
        opt_in_page: page,
        opt_in_ip: ip,
        opt_in_user_agent: userAgent,
        notes: notes || null,
        metadata: {
          ...(metadata ?? {}),
          first_name: firstName || null,
          last_name: lastName || null,
        },
      };

      const { data, error } = await supabase
        .from(WAITLIST_TABLE)
        .insert(row)
        .select("id, referral_code")
        .single();

      if (error) {
        return NextResponse.json(
          { ok: false, error: "Failed to create waitlist entry", details: error.message },
          { status: 500 }
        );
      }

      entryId = data.id;
    }

    let confirmationMessageSid: string | null = null;

    if (phone) {
      try {
        const client = getTwilioClient();
        const sms = await client.messages.create({
          from: process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM_NUMBER || "",
          to: phone,
          body:
            "LifeSignal: You are enrolled in safety check-ins and alerts. " +
            "Reply YES to confirm you want to receive messages. Reply STOP to opt out, HELP for help.",
        });

        confirmationMessageSid = sms.sid;

        if (entryId) {
          await supabase
            .from(WAITLIST_TABLE)
            .update({
              opt_in_confirmation_message_sid: confirmationMessageSid,
              updated_at: new Date().toISOString(),
            })
            .eq("id", entryId);
        }
      } catch (twilioError) {
        console.error("Failed to send double opt-in SMS", twilioError);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Waitlist entry saved. Confirmation text sent.",
      referralCode: existing?.referral_code ?? referralCode,
      optInStatus: "pending",
      confirmationMessageSid,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json(
      { ok: false, error: "Unexpected server error.", details: message },
      { status: 500 }
    );
  }
}



