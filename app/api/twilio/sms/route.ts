import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { createEscalationForCheckin } from '@/lib/lifesignal/escalation-engine';

export async function POST(req: Request) {
  const form = await req.formData();
  const from = String(form.get('From') ?? '');
  const body = String(form.get('Body') ?? '').trim().toUpperCase();

  const { data: member } = await supabaseAdmin.from('monitored_members').select('*').eq('phone', from).single();
  if (!member) return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Member not found.</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });

  const { data: checkin } = await supabaseAdmin
    .from('checkins')
    .select('*')
    .eq('member_id', member.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!checkin) return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>No pending check-in found.</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });

  if (body === 'YES' || body === 'OK') {
    await supabaseAdmin.from('checkins').update({ status: 'confirmed', response_text: body, responded_at: new Date().toISOString() }).eq('id', checkin.id);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Thanks, your check-in is confirmed.</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }

  if (body === 'HELP') {
    await supabaseAdmin.from('checkins').update({ status: 'escalated', response_text: body, responded_at: new Date().toISOString() }).eq('id', checkin.id);
    await createEscalationForCheckin(member.org_id, member.id, checkin.id, 'SMS HELP received from member.');
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Help request received. Care team alerted.</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }

  return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Reply YES, OK, or HELP.</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
}
