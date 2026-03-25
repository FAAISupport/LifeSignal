import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { recordConsent } from "@/lib/compliance/consent";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizePhone(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("+")) {
    return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return null;
}

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function buildBetaUrl(req: NextRequest) {
  return new URL("/beta", req.url);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = clean(formData.get("name"));
    const email = clean(formData.get("email")).toLowerCase();
    const phoneRaw = clean(formData.get("phone"));
    const phone = normalizePhone(phoneRaw);
    const useCase = clean(formData.get("useCase"));
    const referralCode = clean(formData.get("referralCode")).toUpperCase();
    const notes = clean(formData.get("notes"));
    const messagingConsent = clean(formData.get("messagingConsent"));

    const consentSource = clean(formData.get("consentSource")) || "beta_form";
    const consentStatus = clean(formData.get("consentStatus")) || "opted_in";
    const consentChannel = clean(formData.get("consentChannel")) || "both";
    const consentFormPath = clean(formData.get("consentFormPath")) || "/beta";

    const redirectUrl = buildBetaUrl(req);

    if (!name || !email || !phone || messagingConsent !== "yes") {
      redirectUrl.searchParams.set("error", "1");
      return NextResponse.redirect(redirectUrl);
    }

    const supabase = createClient(
      getEnv("NEXT_PUBLIC_SUPABASE_URL"),
      getEnv("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: { persistSession: false, autoRefreshToken: false },
      }
    );

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent");
    const referrer = req.headers.get("referer");

    const { data: existingSignup, error: existingLookupError } = await supabase
      .from("waitlist_signups")
      .select("id, email, personal_referral_code")
      .eq("email", email)
      .maybeSingle();

    if (existingLookupError) {
      throw new Error(`Existing signup lookup failed: ${existingLookupError.message}`);
    }

    if (existingSignup) {
      redirectUrl.searchParams.set("joined", "1");
      redirectUrl.searchParams.set("existing", "1");

      if (existingSignup.personal_referral_code) {
        redirectUrl.searchParams.set("your_ref", existingSignup.personal_referral_code);
      }

      if (referralCode) {
        redirectUrl.searchParams.set("ref", referralCode);
      }

      return NextResponse.redirect(redirectUrl);
    }

    let validReferrerCode: string | null = null;

    if (referralCode) {
      const { data: referrerRow, error: referrerError } = await supabase
        .from("waitlist_signups")
        .select("email, personal_referral_code")
        .eq("personal_referral_code", referralCode)
        .maybeSingle();

      if (referrerError) {
        throw new Error(`Referrer lookup failed: ${referrerError.message}`);
      }

      if (referrerRow && referrerRow.email.toLowerCase() !== email) {
        validReferrerCode = referrerRow.personal_referral_code;
      }
    }

    const { data: insertedSignup, error: waitlistError } = await supabase
      .from("waitlist_signups")
      .insert({
        name,
        email,
        phone,
        use_case: useCase || null,
        referral_code: referralCode || null,
        referred_by: validReferrerCode || null,
        referred_by_code: validReferrerCode || null,
        notes: notes || null,
        metadata: {
          source: "beta_form",
          original_referral_code_input: referralCode || null,
        },
      })
      .select("id, personal_referral_code, waitlist_position")
      .single();

    if (waitlistError) {
      throw new Error(`Waitlist insert failed: ${waitlistError.message}`);
    }

    await recordConsent({
      phoneE164: phone,
      email,
      fullName: name,
      source:
        consentSource === "beta_form" ||
        consentSource === "website" ||
        consentSource === "caregiver_enrollment" ||
        consentSource === "manual_admin" ||
        consentSource === "inbound_sms" ||
        consentSource === "voice_opt_in"
          ? consentSource
          : "beta_form",
      status:
        consentStatus === "opted_in" ||
        consentStatus === "opted_out" ||
        consentStatus === "help_requested" ||
        consentStatus === "pending"
          ? consentStatus
          : "opted_in",
      channel:
        consentChannel === "sms" ||
        consentChannel === "voice" ||
        consentChannel === "both"
          ? consentChannel
          : "both",
      ipAddress,
      userAgent,
      formPath: consentFormPath,
      referrer,
      metadata: {
        useCase,
        referralCode,
        referredByCode: validReferrerCode,
        notes,
        origin: "waitlist_join_route",
      },
    });

    const { error: refreshError } = await supabase.rpc("refresh_waitlist_rankings");
    if (refreshError) {
      throw new Error(`Ranking refresh failed: ${refreshError.message}`);
    }

    const { data: refreshedSignup, error: refreshedSignupError } = await supabase
      .from("waitlist_signups")
      .select("personal_referral_code, waitlist_position")
      .eq("id", insertedSignup.id)
      .single();

    if (refreshedSignupError) {
      throw new Error(`Refreshed signup lookup failed: ${refreshedSignupError.message}`);
    }

    redirectUrl.searchParams.set("joined", "1");

    if (referralCode) {
      redirectUrl.searchParams.set("ref", referralCode);
    }

    if (refreshedSignup.personal_referral_code) {
      redirectUrl.searchParams.set("your_ref", refreshedSignup.personal_referral_code);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Waitlist join failed:", error);
    const redirectUrl = buildBetaUrl(req);
    redirectUrl.searchParams.set("error", "1");
    return NextResponse.redirect(redirectUrl);
  }
}
