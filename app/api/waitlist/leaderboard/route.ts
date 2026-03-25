import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("waitlist")
      .select("*");

    if (error) {
      console.error("Leaderboard error:", error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({
      count: data?.length || 0
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ count: 0 });
  }
}
