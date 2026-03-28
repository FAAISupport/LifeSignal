import { supabaseAdmin } from '@/lib/supabase/admin';

export async function listIncidents(orgId: string) {
  const { data, error } = await supabaseAdmin
    .from('incidents')
    .select('*, monitored_members(full_name)')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return data;
}
