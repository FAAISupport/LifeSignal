import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ ok: true, status: "payment_notice_received" });
}
