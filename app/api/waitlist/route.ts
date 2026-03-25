import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase env vars", {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!serviceRoleKey,
      });

      return json(500, {
        success: false,
        error: "Server configuration error",
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return json(400, {
        success: false,
        error: "Invalid JSON body",
      });
    }

    const raw = body as Record<string, unknown>;

    const name =
      typeof raw.name === "string" ? raw.name.trim() : "";

    const email =
      typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";

    const phone =
      typeof raw.phone === "string" ? raw.phone.trim() : "";

    const interest =
      typeof raw.interest === "string"
        ? raw.interest.trim()
        : typeof raw.role === "string"
        ? raw.role.trim()
        : typeof raw.relationship === "string"
        ? raw.relationship.trim()
        : "";

    const city =
      typeof raw.city === "string" ? raw.city.trim() : "";

    const state =
      typeof raw.state === "string" ? raw.state.trim() : "";

    const referralCode =
      typeof raw.referral_code === "string"
        ? raw.referral_code.trim()
        : typeof raw.referralCode === "string"
        ? raw.referralCode.trim()
        : "";

    const referredBy =
      typeof raw.referred_by === "string"
        ? raw.referred_by.trim()
        : typeof raw.referredBy === "string"
        ? raw.referredBy.trim()
        : "";

    if (!name || !email || !phone) {
      return json(400, {
        success: false,
        error: "Name, email, and phone are required",
      });
    }

    const insertPayload: Record<string, unknown> = {
      name,
      email,
      phone,
      interest,
    };

    if (city) insertPayload.city = city;
    if (state) insertPayload.state = state;
    if (referralCode) insertPayload.referral_code = referralCode;
    if (referredBy) insertPayload.referred_by = referredBy;

    const { data, error } = await supabase
      .from("waitlist")
      .insert(insertPayload)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase waitlist insert error", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        insertPayload,
      });

      const message =
        error.code === "23505"
          ? "You are already on the waitlist"
          : "Failed to join waitlist";

      return json(500, {
        success: false,
        error: message,
        code: error.code ?? null,
      });
    }

    return json(200, {
      success: true,
      id: data?.id ?? null,
      created_at: data?.created_at ?? null,
    });
  } catch (error) {
    console.error("Unhandled waitlist API error", error);

    return json(500, {
      success: false,
      error: "Unexpected server error",
    });
  }
}

export async function GET() {
  return json(200, {
    ok: true,
    route: "/api/waitlist",
  });
}
