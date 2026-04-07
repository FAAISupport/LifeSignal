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

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const digits = String(form.get("Digits") ?? "");
  const speech = String(form.get("SpeechResult") ?? "").toLowerCase();

  let twiml = "";

  if (digits === "1" || speech.includes("okay") || speech.includes("ok")) {
    twiml = <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Thank you. Your LifeSignal check-in is marked safe. Goodbye.</Say>
</Response>;
  } else if (digits === "2" || speech.includes("help")) {
    twiml = <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Thank you. We are marking this as needing help and will notify your guardian. Goodbye.</Say>
</Response>;
  } else {
    twiml = <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Sorry, we could not understand your response. Goodbye.</Say>
</Response>;
  }

  return xml(twiml);
}
