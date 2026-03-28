import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';

const schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  try {
    const { sessionId } = schema.parse(await req.json());
    const { data, error } = await supabaseAdmin.from('builder_sessions').select('*').eq('id', sessionId).single();
    if (error) throw error;
    return NextResponse.json({ proposal: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to generate proposal' }, { status: 400 });
  }
}
