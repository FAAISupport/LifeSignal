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

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { count, error } = await supabase
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({ ok: true, count: count ?? 0 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        count: 0,
        error:
          error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
