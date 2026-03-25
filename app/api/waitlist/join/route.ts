import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone } = body;

    if (!email || !name) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ SAFE EXISTING LOOKUP
    const { data: existing, error: lookupError } = await supabase
      .from("waitlist_signups")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      console.error("Lookup error:", lookupError.message);
      return NextResponse.redirect("/beta?error=existing-lookup-failed");
    }

    if (existing) {
      return NextResponse.redirect("/beta?error=already-joined");
    }

    // ✅ GENERATE REFERRAL CODE
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // ✅ INSERT USER
    const { error: insertError } = await supabase
      .from("waitlist_signups")
      .insert([
        {
          name,
          email,
          phone,
          personal_referral_code: referralCode,
        },
      ]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return NextResponse.redirect("/beta?error=insert-failed");
    }

    return NextResponse.redirect("/beta?success=joined");
  } catch (error) {
    console.error("Join error:", error);
    return NextResponse.redirect("/beta?error=unknown");
  }
}
