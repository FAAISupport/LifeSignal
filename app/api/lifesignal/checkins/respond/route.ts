import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { createEscalationForCheckin } from '@/lib/lifesignal/escalation-engine';

const schema = z.object({ checkinId: z.string().uuid(), response: z.enum(['YES', 'OK', 'HELP']) });

export async function POST(req: Request) {
  try {
    const { checkinId, response } = schema.parse(await req.json());
    const { data: checkin } = await supabaseAdmin.from('checkins').select('*').eq('id', checkinId).single();
    if (!checkin) throw new Error('Check-in not found');

    if (response === 'HELP') {
      const incident = await createEscalationForCheckin(checkin.org_id, checkin.member_id, checkin.id, 'Member requested help via check-in response.');
      await supabaseAdmin.from('checkins').update({ status: 'escalated', responded_at: new Date().toISOString(), response_text: response }).eq('id', checkinId);
      return NextResponse.json({ status: 'escalated', incidentId: incident.id });
    }

    await supabaseAdmin.from('checkins').update({ status: 'confirmed', responded_at: new Date().toISOString(), response_text: response }).eq('id', checkinId);
    return NextResponse.json({ status: 'confirmed' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Response handling failed' }, { status: 400 });
  }
}
