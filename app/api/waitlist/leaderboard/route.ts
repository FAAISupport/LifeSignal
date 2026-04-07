import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json({ ok: false, leaderboard: [] });
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("waitlist_users")
      .select("*")
      .limit(10);

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      leaderboard: data ?? []
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      leaderboard: [],
      error: err instanceof Error ? err.message : "Unknown"
    });
  }
}


