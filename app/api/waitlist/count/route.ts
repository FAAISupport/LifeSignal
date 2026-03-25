import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function GET() {
  try {
    const supabase = createClient(
      getEnv("NEXT_PUBLIC_SUPABASE_URL"),
      getEnv("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: { persistSession: false, autoRefreshToken: false },
      }
    );

    const { count, error } = await supabase
      .from("waitlist_signups")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(`Count query failed: ${error.message}`);
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    console.error("/api/waitlist/count failed:", message);

    return NextResponse.json(
      { count: 0, error: message },
      { status: 500 }
    );
  }
}

