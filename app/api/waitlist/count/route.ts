import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json({ ok: false, count: 0, error: "Missing env" });
    }

    const supabase = createClient(url, key);

    const { count, error } = await supabase
      .from("waitlist_users")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({ ok: true, count: count ?? 0 });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      count: 0,
      error: err instanceof Error ? err.message : "Unknown"
    });
  }
}


