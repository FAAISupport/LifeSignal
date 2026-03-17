import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  buildReferralLink,
  extractReferralCode,
  normalizeEmail,
  randomReferralCode,
} from "@/lib/waitlist";

export const dynamic = "force-dynamic";

type WaitlistRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  use_case: string | null;
  notes: string | null;
  referral_code: string;
  referred_by_code: string | null;
  referrals_count: number;
  created_at: string;
};

async function parseRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return {
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      phone: String(body.phone ?? ""),
      useCase: String(body.useCase ?? ""),
      notes: String(body.notes ?? ""),
      referralCode: String(body.referralCode ?? ""),
    };
  }

  const formData = await request.formData();

  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    useCase: String(formData.get("useCase") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    referralCode: String(formData.get("referralCode") ?? ""),
  };
}

async function generateUniqueReferralCode() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = randomReferralCode(8);

    const { data } = await supabaseAdmin
      .from("waitlist_entries")
      .select("id")
      .eq("referral_code", code)
      .maybeSingle();

    if (!data) {
      return code;
    }
  }

  throw new Error("Failed to generate a unique referral code");
}

function getOrigin(request: Request) {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  return url.origin;
}

function wantsJson(request: Request) {
  const accept = request.headers.get("accept") || "";
  const contentType = request.headers.get("content-type") || "";
  return accept.includes("application/json") || contentType.includes("application/json");
}

async function incrementReferrer(code: string) {
  const { data: referrer } = await supabaseAdmin
    .from("waitlist_entries")
    .select("id, referrals_count")
    .eq("referral_code", code)
    .maybeSingle();

  if (!referrer) {
    return false;
  }

  const { error } = await supabaseAdmin
    .from("waitlist_entries")
    .update({
      referrals_count: (referrer.referrals_count ?? 0) + 1,
    })
    .eq("id", referrer.id);

  if (error) {
    throw error;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const input = await parseRequest(request);

    const name = input.name.trim();
    const email = normalizeEmail(input.email);
    const phone = input.phone.trim();
    const useCase = input.useCase.trim();
    const notes = input.notes.trim();
    const referredByCode = extractReferralCode(input.referralCode);
    const origin = getOrigin(request);

    if (!name || !email) {
      const errorPayload = { error: "Name and email are required." };

      if (wantsJson(request)) {
        return NextResponse.json(errorPayload, { status: 400 });
      }

      return NextResponse.redirect(
        new URL("/beta?error=missing-required-fields", origin),
        { status: 303 }
      );
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("waitlist_entries")
      .select("*")
      .eq("email", email)
      .maybeSingle<WaitlistRow>();

    if (existingError) {
      throw existingError;
    }

    let row: WaitlistRow | null = existing ?? null;

    if (row) {
      if (!row.referred_by_code && referredByCode && referredByCode !== row.referral_code) {
        const referredByApplied = await incrementReferrer(referredByCode);

        if (referredByApplied) {
          const { data: updatedRow, error: updateExistingError } = await supabaseAdmin
            .from("waitlist_entries")
            .update({
              referred_by_code: referredByCode,
            })
            .eq("id", row.id)
            .select("*")
            .single<WaitlistRow>();

          if (updateExistingError) {
            throw updateExistingError;
          }

          row = updatedRow;
        }
      }
    } else {
      const referralCode = await generateUniqueReferralCode();
      let validReferredByCode: string | null = null;

      if (referredByCode && referredByCode !== referralCode) {
        const { data: referredByRow } = await supabaseAdmin
          .from("waitlist_entries")
          .select("id")
          .eq("referral_code", referredByCode)
          .maybeSingle();

        if (referredByRow) {
          validReferredByCode = referredByCode;
        }
      }

      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("waitlist_entries")
        .insert({
          name,
          email,
          phone: phone || null,
          use_case: useCase || null,
          notes: notes || null,
          referral_code: referralCode,
          referred_by_code: validReferredByCode,
        })
        .select("*")
        .single<WaitlistRow>();

      if (insertError) {
        throw insertError;
      }

      row = inserted;

      if (validReferredByCode) {
        await incrementReferrer(validReferredByCode);
      }
    }

    if (!row) {
      throw new Error("Failed to create or retrieve waitlist entry");
    }

    const referralLink = buildReferralLink(origin, row.referral_code);
    const successUrl = new URL("/beta/success", origin);

    successUrl.searchParams.set("code", row.referral_code);
    successUrl.searchParams.set("email", row.email);

    if (wantsJson(request)) {
      return NextResponse.json({
        ok: true,
        referralCode: row.referral_code,
        referralLink,
        referralsCount: row.referrals_count,
      });
    }

    return NextResponse.redirect(successUrl, { status: 303 });
  } catch (error) {
    console.error("waitlist join error", error);

    const origin = getOrigin(request);

    if (wantsJson(request)) {
      return NextResponse.json(
        { error: "Unable to join the waitlist right now." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL("/beta?error=join-failed", origin), {
      status: 303,
    });
  }
}
