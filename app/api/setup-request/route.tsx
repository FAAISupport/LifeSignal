// app/api/setup-request/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase environment vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel."
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Expecting whatever your form sends.
    // Adjust these keys to match your actual frontend field names.
    const {
      name,
      email,
      seniorName,
      seniorCity,
      plan,
    } = body;

    const supabase = getSupabaseServerClient();

    // If your table is called "setup_requests", leave this as-is.
    // If it’s actually named "setup-requests", change the line below to .from("setup-requests")
    const { data, error } = await supabase.from("setup_requests").insert({
      requester_name: name,
      requester_email: email,
      senior_name: seniorName,
      senior_city: seniorCity,
      plan,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error (setup-request):", error);
      return NextResponse.json(
        { ok: false, error: "Database insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err) {
    console.error("API /api/setup-request error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error handling setup request" },
      { status: 500 }
    );
  }
}
