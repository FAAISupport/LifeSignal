import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';

const schema = z.object({ token: z.string().min(8) });

export async function POST(req: Request) {
  try {
    const { token } = schema.parse(await req.json());
    const { data: invite, error } = await supabaseAdmin.from('invites').select('*').eq('token', token).single();
    if (error || !invite) throw new Error('Invite not found');
    await supabaseAdmin.from('invites').update({ status: 'accepted', accepted_at: new Date().toISOString() }).eq('id', invite.id);
    return NextResponse.json({ accepted: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Accept failed' }, { status: 400 });
  }
}
