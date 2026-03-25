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
  if (!trimmed) return null;

  if (trimmed.startsWith("+")) {
    return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;

  return null;
}

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function betaUrl(req: NextRequest) {
  return new URL("/beta", req.url);
}

function fail(req: NextRequest, code: string) {
  const url = betaUrl(req);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = clean(formData.get("name"));
    const email = clean(formData.get("email")).toLowerCase();
    const phone = normalizePhone(clean(formData.get("phone")));
    const useCase = clean(formData.get("useCase"));
    const referralCode = clean(formData.get("referralCode")).toUpperCase();
    const notes = clean(formData.get("notes"));
    const messagingConsent = clean(formData.get("messagingConsent"));

    if (!name || !email || !phone) {
      return fail(req, "missing-required-fields");
    }

    if (messagingConsent !== "yes") {
      return fail(req, "missing-consent");
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

    const { data: existingSignup, error: existingError } = await supabase
      .from("waitlist_signups")
      .select("id, personal_referral_code")
      .eq("email", email)
      .maybeSingle();

    if (existingError) {
      console.error("existing signup lookup failed:", existingError);
      return fail(req, "existing-lookup-failed");
    }

    if (existingSignup) {
      const url = betaUrl(req);
      url.searchParams.set("joined", "1");
      url.searchParams.set("existing", "1");

      if (existingSignup.personal_referral_code) {
        url.searchParams.set("your_ref", existingSignup.personal_referral_code);
      }

      return NextResponse.redirect(url);
    }

    let validReferrerCode: string | null = null;

    if (referralCode) {
      const { data: referrerRow, error: referrerError } = await supabase
        .from("waitlist_signups")
        .select("email, personal_referral_code")
        .eq("personal_referral_code", referralCode)
        .maybeSingle();

      if (referrerError) {
        console.error("referrer lookup failed:", referrerError);
        return fail(req, "referrer-lookup-failed");
      }

      if (referrerRow && referrerRow.email?.toLowerCase() !== email) {
        validReferrerCode = referrerRow.personal_referral_code;
      }
    }

    const { data: insertedSignup, error: insertError } = await supabase
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
      .select("id, personal_referral_code")
      .single();

    if (insertError) {
      console.error("waitlist insert failed:", insertError);
      return fail(req, "waitlist-insert-failed");
    }

    try {
      await recordConsent({
        phoneE164: phone,
        email,
        fullName: name,
        source: "beta_form",
        status: "opted_in",
        channel: "both",
        ipAddress,
        userAgent,
        formPath: "/beta",
        referrer,
        metadata: {
          useCase,
          referralCode,
          referredByCode: validReferrerCode,
          notes,
          origin: "waitlist_join_route",
        },
      });
    } catch (consentError) {
      console.error("consent logging failed:", consentError);
    }

    const { error: refreshError } = await supabase.rpc("refresh_waitlist_rankings");

    if (refreshError) {
      console.error("ranking refresh failed:", refreshError);
      return fail(req, "ranking-refresh-failed");
    }

    const { data: refreshedSignup, error: refreshedSignupError } = await supabase
      .from("waitlist_signups")
      .select("personal_referral_code, waitlist_position")
      .eq("id", insertedSignup.id)
      .single();

    if (refreshedSignupError) {
      console.error("refreshed signup lookup failed:", refreshedSignupError);
      return fail(req, "post-insert-lookup-failed");
    }

    const url = betaUrl(req);
    url.searchParams.set("joined", "1");

    if (refreshedSignup.personal_referral_code) {
      url.searchParams.set("your_ref", refreshedSignup.personal_referral_code);
    }

    if (referralCode) {
      url.searchParams.set("ref", referralCode);
    }

    if (typeof refreshedSignup.waitlist_position === "number") {
      url.searchParams.set("position", String(refreshedSignup.waitlist_position));
    }

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("waitlist join fatal error:", error);
    return fail(req, "fatal");
  }
}

