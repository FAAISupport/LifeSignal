import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { createEscalationForCheckin } from '@/lib/lifesignal/escalation-engine';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const checkinId = url.searchParams.get('checkinId');

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="dtmf" timeout="6" numDigits="1" action="/api/twilio/voice?checkinId=${checkinId}" method="POST">
    <Say>FaithSignal care check-in. Press 1 if you are okay. Press 2 to request help now.</Say>
  </Gather>
  <Say>We did not receive a response. Your care team will follow up.</Say>
</Response>`;

  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const checkinId = url.searchParams.get('checkinId');
  const form = await req.formData();
  const digits = String(form.get('Digits') ?? '');

  if (!checkinId) return new NextResponse('<?xml version="1.0"?><Response><Say>Invalid request.</Say></Response>', { headers: { 'Content-Type': 'text/xml' } });

  const { data: checkin } = await supabaseAdmin.from('checkins').select('*').eq('id', checkinId).single();
  if (!checkin) return new NextResponse('<?xml version="1.0"?><Response><Say>Check-in not found.</Say></Response>', { headers: { 'Content-Type': 'text/xml' } });

  if (digits === '1') {
    await supabaseAdmin.from('checkins').update({ status: 'confirmed', response_text: 'DTMF_1', responded_at: new Date().toISOString() }).eq('id', checkinId);
    return new NextResponse('<?xml version="1.0"?><Response><Say>Thank you. Your check-in is confirmed.</Say></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }

  await supabaseAdmin.from('checkins').update({ status: 'escalated', response_text: 'DTMF_2', responded_at: new Date().toISOString() }).eq('id', checkinId);
  await createEscalationForCheckin(checkin.org_id, checkin.member_id, checkin.id, 'Voice prompt help requested.');
  return new NextResponse('<?xml version="1.0"?><Response><Say>Help request logged. Your care team has been notified.</Say></Response>', { headers: { 'Content-Type': 'text/xml' } });
}
