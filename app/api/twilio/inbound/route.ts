import { NextResponse } from 'next/server';
import { resolveCheckInResponse } from '@/lib/checkins/service';

function buildVoiceTwiml(checkInId: string | null) {
  const action = checkInId ? `/api/twilio/inbound?checkInId=${encodeURIComponent(checkInId)}` : '/api/twilio/inbound';
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Gather input="speech dtmf" numDigits="1" action="${action}" method="POST"><Say>Hello from LifeSignal. Press 1 or say YES if you are safe. Press 2 or say HELP if you need assistance.</Say></Gather><Say>We did not receive a response. Goodbye.</Say></Response>`;
}

function xml(body: string) {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('mode') === 'voice') {
    return xml(buildVoiceTwiml(url.searchParams.get('checkInId')));
  }

  return NextResponse.json({ ok: true, message: 'Twilio inbound endpoint is ready.' });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const checkInId = formData.get('checkInId')?.toString() || new URL(request.url).searchParams.get('checkInId') || undefined;
  const fromPhone = formData.get('From')?.toString() || '';
  const body = formData.get('Body')?.toString() || formData.get('SpeechResult')?.toString() || formData.get('Digits')?.toString() || '';
  const providerSid = formData.get('MessageSid')?.toString() || formData.get('CallSid')?.toString() || undefined;

  try {
    const result = await resolveCheckInResponse({
      checkInId,
      fromPhone,
      body,
      providerSid,
      rawPayload: Object.fromEntries(formData.entries()),
    });

    const message = result.action === 'updated'
      ? 'Thanks. Your LifeSignal response has been recorded.'
      : 'Thanks. We could not match that response, but our team can still review it.';

    return xml(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${message}</Message></Response>`);
  } catch (error) {
    return xml(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${error instanceof Error ? error.message : 'Unable to process response.'}</Message></Response>`);
  }
}
