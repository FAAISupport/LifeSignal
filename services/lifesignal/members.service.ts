import { supabaseAdmin } from '@/lib/supabase/admin';

export async function listMembers(orgId: string) {
  const { data, error } = await supabaseAdmin
    .from('monitored_members')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
