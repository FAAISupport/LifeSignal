import { NextResponse } from 'next/server';
import { z } from 'zod';
import { executeCheckin } from '@/lib/lifesignal/checkin-engine';

const schema = z.object({ memberId: z.string().uuid(), message: z.string().min(5), channel: z.enum(['sms', 'voice']), orgId: z.string().uuid().optional() });

export async function POST(req: Request) {
  try {
    const payload = schema.parse(await req.json());
    const result = await executeCheckin({ orgId: payload.orgId ?? '00000000-0000-0000-0000-000000000000', memberId: payload.memberId, message: payload.message, channel: payload.channel });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Check-in run failed' }, { status: 400 });
  }
}
