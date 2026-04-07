import { NextRequest, NextResponse } from "next/server";

function xml(body: string) {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const person = url.searchParams.get("person") || "there";

  const twiml = <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="dtmf speech" numDigits="1" timeout="5" action="/api/twilio/voice/checkin/respond" method="POST">
    <Say voice="alice">
      Hello . This is your LifeSignal safety check-in.
      If you are okay, press 1.
      If you need help, press 2.
      If we do not hear from you, we may contact your guardian.
    </Say>
  </Gather>
  <Say voice="alice">
    We did not receive a response. Goodbye.
  </Say>
</Response>;

  return xml(twiml);
}

export const POST = GET;
