import { createServerSupabase } from '@/lib/supabase/server';

export interface OrgContext {
  userId: string;
  orgId: string;
  role: string;
}

export async function requireOrgContext(): Promise<OrgContext> {
  const supabase = await createServerSupabase();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error('Unauthorized');
  }

  const { data: membership, error } = await supabase
    .from('organization_members')
    .select('org_id, role')
    .eq('user_id', authData.user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (error || !membership) {
    throw new Error('No organization membership found');
  }

  return {
    userId: authData.user.id,
    orgId: membership.org_id,
    role: membership.role,
  };
}
