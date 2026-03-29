import { supabaseAdmin } from '@/lib/supabase/admin';

export async function createInvite(orgId: string, email: string, role: string, invitedBy: string) {
  const token = crypto.randomUUID();
  const { data, error } = await supabaseAdmin
    .from('invites')
    .insert({ org_id: orgId, email, role, invited_by: invitedBy, token, status: 'pending' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
