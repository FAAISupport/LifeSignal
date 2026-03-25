import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("telemetry_snapshots")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      ok: true,
      snapshots: data ?? [],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    console.error("/api/telemetry GET failed:", message);

    return NextResponse.json(
      {
        ok: false,
        error: message,
        snapshots: [],
      },
      { status: 500 }
    );
  }
}
