import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const providerSid = formData.get('MessageSid')?.toString() || formData.get('CallSid')?.toString() || '';
    const payload = Object.fromEntries(formData.entries());

    const { error } = await supabaseAdmin.from('message_events').insert({
      provider_sid: providerSid || null,
      event_type: 'provider_status',
      payload,
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, { status: 500 });
  }
}
