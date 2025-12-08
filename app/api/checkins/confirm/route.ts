import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect("/checkin/invalid");
  }

  const { data: rows, error } = await supabaseAdmin
    .from("checkins")
    .select("*")
    .eq("token", token)
    .limit(1);

  if (error || !rows?.length) {
    return NextResponse.redirect("/checkin/invalid");
  }

  const checkin = rows[0];

  if (checkin.status === "ok") {
    return NextResponse.redirect("/checkin/already");
  }

  await supabaseAdmin
    .from("checkins")
    .update({
      status: "ok",
      responded_at: new Date().toISOString(),
    })
    .eq("id", checkin.id);

  return NextResponse.redirect("/checkin/thank-you");
}
