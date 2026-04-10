import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const checkinId = url.searchParams.get("checkinId") || "";

  const actionUrl = `/api/twilio/voice/checkin/respond?checkinId=${checkinId}`;

  return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, {
    headers: { "Content-Type": "text/xml" },
  });
}


