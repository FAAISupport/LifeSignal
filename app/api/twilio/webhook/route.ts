import { NextRequest, NextResponse } from 'next/server';

// Twilio will POST here when a call finishes / SMS received
export async function POST(req: NextRequest) {
  const formData = await req.formData(); // Twilio sends x-www-form-urlencoded

  const from = formData.get('From');
  const to = formData.get('To');
  const digits = formData.get('Digits');

  console.log('Twilio webhook', { from, to, digits });

  // TODO: record response in Supabase, trigger escalation, etc.

  // Respond with TwiML (XML) if you want Twilio to say something
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">Thank you. Your check in has been received.</Say>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
