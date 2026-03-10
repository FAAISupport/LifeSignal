import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 8);
}

function randomCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

async function generateUniqueReferralCode(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  seed: string
) {
  for (let i = 0; i < 10; i += 1) {
    const candidate = `${slugify(seed) || "user"}${randomCode(4)}`.toUpperCase();

    const { data } = await supabase
      .from("waitlist_entries")
      .select("id")
      .eq("referral_code", candidate)
      .maybeSingle();

    if (!data) return candidate;
  }

  return `LS${randomCode(8)}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName =
      typeof body.lastName === "string" ? body.lastName.trim() : "";
    const fullName =
      typeof body.fullName === "string" && body.fullName.trim()
        ? body.fullName.trim()
        : [firstName, lastName].filter(Boolean).join(" ");
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const interest =
      typeof body.interest === "string" ? body.interest.trim() : "family";
    const useCase =
      typeof body.useCase === "string" ? body.useCase.trim() : "";
    const source =
      typeof body.source === "string" ? body.source.trim() : "beta-page";
    const consent = Boolean(body.consent);
    const incomingReferralCode =
      typeof body.referralCode === "string"
        ? body.referralCode.trim().toUpperCase()
        : "";

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: existing } = await supabase
      .from("waitlist_entries")
      .select("id, referral_code")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const { count } = await supabase
        .from("waitlist_entries")
        .select("*", { count: "exact", head: true });

      return NextResponse.json(
        {
          ok: true,
          alreadyJoined: true,
          message: "You are already on the waitlist.",
          referralCode: existing.referral_code ?? null,
          count: count ?? 0,
        },
        { status: 200 }
      );
    }

    let referredBy: string | null = null;

    if (incomingReferralCode) {
      const { data: referrer } = await supabase
        .from("waitlist_entries")
        .select("id, referral_code, referrals_count, priority_score")
        .eq("referral_code", incomingReferralCode)
        .maybeSingle();

      if (referrer?.referral_code) {
        referredBy = referrer.referral_code;

        await supabase
          .from("waitlist_entries")
          .update({
            referrals_count: (referrer.referrals_count ?? 0) + 1,
            priority_score: (referrer.priority_score ?? 0) + 5,
          })
          .eq("id", referrer.id);
      }
    }

    const referralCode = await generateUniqueReferralCode(
      supabase,
      firstName || fullName || email.split("@")[0]
    );

    const { error: insertError } = await supabase.from("waitlist_entries").insert({
      first_name: firstName || null,
      last_name: lastName || null,
      full_name: fullName || null,
      email,
      phone: phone || null,
      interest: interest || null,
      use_case: useCase || null,
      consent,
      source,
      referral_code: referralCode,
      referred_by: referredBy,
      referrals_count: 0,
      priority_score: referredBy ? 5 : 0,
    });

    if (insertError) {
      throw insertError;
    }

    const { count } = await supabase
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      ok: true,
      message: "You are on the list. Watch your inbox for beta updates.",
      referralCode,
      referredBy,
      count: count ?? 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
