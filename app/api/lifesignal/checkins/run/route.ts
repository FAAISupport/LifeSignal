import { NextResponse } from 'next/server';
import { z } from 'zod';
import { executeCheckin } from '@/lib/lifesignal/checkin-engine';
import { requireOrgContext } from '@/lib/supabase/org';

const schema = z.object({ memberId: z.string().uuid(), message: z.string().min(5), channel: z.enum(['sms', 'voice']) });

export async function POST(req: Request) {
  try {
    const context = await requireOrgContext();
    const payload = schema.parse(await req.json());
    const result = await executeCheckin({ orgId: context.orgId, memberId: payload.memberId, message: payload.message, channel: payload.channel });
    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Check-in run failed';
    const status = message === 'Unauthorized' ? 401 : message === 'No organization membership found' ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
