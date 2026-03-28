import { NextResponse } from 'next/server';
import { z } from 'zod';
import { acknowledgeEscalation } from '@/services/lifesignal/escalation.service';

const schema = z.object({ token: z.string().min(8), note: z.string().min(2).default('Acknowledged') });

export async function POST(req: Request) {
  try {
    const { token, note } = schema.parse(await req.json());
    const event = await acknowledgeEscalation(token, note);
    return NextResponse.json({ event });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Acknowledge failed' }, { status: 400 });
  }
}
