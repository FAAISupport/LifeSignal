import { supabaseAdmin } from '@/lib/supabase/admin';

export async function acknowledgeEscalation(token: string, note: string) {
  const { data: event, error } = await supabaseAdmin
    .from('escalation_events')
    .update({ acknowledged_at: new Date().toISOString(), detail: note })
    .eq('ack_token', token)
    .select('*')
    .single();

  if (error) throw error;
  return event;
}
