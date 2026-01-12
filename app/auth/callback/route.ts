import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=` + encodeURIComponent("Missing OAuth code. Please try again.")
    );
  }

  const sb = await supabaseServer();
  const { error } = await sb.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth callback error:", error.message);
    return NextResponse.redirect(
      `${origin}/login?error=` +
        encodeURIComponent("Authentication failed. Please try again.")
    );
  }

  // Safety: only allow internal relative redirects
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  return NextResponse.redirect(`${origin}${safeNext}`);
}
