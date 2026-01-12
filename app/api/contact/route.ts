import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const sb = await supabaseServer();

  const { error } = await sb.from("contact_messages").insert({
    name,
    email,
    phone: phone || null,
    message,
    created_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Unable to save message." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
}
