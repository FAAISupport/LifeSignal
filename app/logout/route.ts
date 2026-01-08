// app/logout/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await supabaseServer();
    await supabase.auth.signOut();
  } catch {
    // Even if signOut fails, still redirect away.
  }

  const url = new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "https://lifesignal.app");
  return NextResponse.redirect(url);
}
