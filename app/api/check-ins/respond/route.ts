import { NextResponse } from 'next/server';
import { resolveCheckInResponse } from '@/lib/checkins/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await resolveCheckInResponse({
      checkInId: typeof body.checkInId === 'string' ? body.checkInId : undefined,
      fromPhone: String(body.fromPhone || ''),
      body: String(body.body || ''),
      providerSid: typeof body.providerSid === 'string' ? body.providerSid : undefined,
      rawPayload: body,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error.' },
      { status: 500 }
    );
  }
}
