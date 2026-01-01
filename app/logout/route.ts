import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  return NextResponse.redirect(new URL("/login", env.APP_BASE_URL));
}
