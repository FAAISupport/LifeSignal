import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      count: count ?? 0,
    });
  } catch (error) {
    console.error("waitlist count error", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
