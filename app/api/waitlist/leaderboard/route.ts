import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase env vars for leaderboard", {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!serviceRoleKey,
      });

      return json(200, { count: 0, rows: [] });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Leaderboard query error", error);
      return json(200, { count: 0, rows: [] });
    }

    return json(200, {
      count: count ?? 0,
      rows: [],
    });
  } catch (error) {
    console.error("Unhandled leaderboard error", error);
    return json(200, { count: 0, rows: [] });
  }
}
