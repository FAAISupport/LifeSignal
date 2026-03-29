import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';

export interface OrgContext {
  userId: string;
  orgId: string;
  role: string;
  orgName: string;
  orgSlug: string;
}

export async function getOrgContext(): Promise<OrgContext | null> {
  const supabase = await createServerSupabase();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    return null;
  }

  const { data: membership, error } = await supabase
    .from('organization_members')
    .select('org_id, role, organizations(name, slug)')
    .eq('user_id', authData.user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !membership) {
    return null;
  }

  const org = Array.isArray(membership.organizations)
    ? membership.organizations[0]
    : membership.organizations;

  return {
    userId: authData.user.id,
    orgId: membership.org_id,
    role: membership.role,
    orgName: org?.name ?? 'Organization',
    orgSlug: org?.slug ?? '',
  };
}

export async function requireOrgContext(): Promise<OrgContext> {
  const context = await getOrgContext();

  if (!context) {
    throw new Error('No organization membership found');
  }

  return context;
}

export async function requireOrgContextOrRedirect() {
  const context = await getOrgContext();

  if (!context) {
    redirect('/onboarding');
  }

  return context;
}
