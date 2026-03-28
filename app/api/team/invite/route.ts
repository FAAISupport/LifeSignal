import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createInvite } from '@/services/team/invites.service';

const schema = z.object({ email: z.string().email(), role: z.string().min(4) });

export async function POST(req: Request) {
  try {
    const { email, role } = schema.parse(await req.json());
    const invite = await createInvite('00000000-0000-0000-0000-000000000000', email, role, 'system');
    return NextResponse.json({ invite });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invite failed' }, { status: 400 });
  }
}
