import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const checkinId = url.searchParams.get("checkinId") || "";
  const actionUrl = `/api/twilio/voice/checkin/respond?checkinId=${checkinId}`;

  const body = `<?xml version="1.0" encoding="UTF-8"?><Response><Gather input="dtmf speech" numDigits="1" timeout="5" action="${actionUrl}" method="POST"><Say>Hello. This is your LifeSignal check-in. Press 1 if you are safe, or press 2 if you need help.</Say></Gather><Say>We did not receive a response. Goodbye.</Say></Response>`;

  return new Response(body, {
    headers: { "Content-Type": "text/xml" },
  });
}
