import { supabaseAdmin } from '@/lib/supabase/admin';

export async function createEscalationForCheckin(orgId: string, memberId: string, checkinId: string, reason: string) {
  const { data: incident, error } = await supabaseAdmin
    .from('incidents')
    .insert({ org_id: orgId, member_id: memberId, source: 'checkin', severity: 'high', escalation_status: 'open', notes: reason })
    .select('*')
    .single();

  if (error) throw error;

  await supabaseAdmin.from('escalation_events').insert({
    org_id: orgId,
    member_id: memberId,
    incident_id: incident.id,
    checkin_id: checkinId,
    event_type: 'escalation_started',
    detail: reason,
  });

  return incident;
}
