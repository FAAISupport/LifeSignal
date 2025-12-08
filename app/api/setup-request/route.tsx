import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("setup_requests")
      .insert(body);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Setup request failed:", err);
    return NextResponse.json(
      { error: "Backend error" },
      { status: 500 }
    );
  }
}
