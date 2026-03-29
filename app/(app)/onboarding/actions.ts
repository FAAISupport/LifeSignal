'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { getOrgContext } from '@/lib/supabase/org';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function createOrganizationAction(formData: FormData) {
  const supabase = await createServerSupabase();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect('/auth/login');
  }

  const existingContext = await getOrgContext();
  if (existingContext) {
    redirect('/dashboard');
  }

  const name = String(formData.get('name') ?? '').trim();
  const preferredSlug = String(formData.get('slug') ?? '').trim();
  const slug = slugify(preferredSlug || name);

  if (!name || !slug) {
    redirect('/onboarding?error=invalid_org_fields');
  }

  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert({
      name,
      slug,
      plan: 'core',
      status: 'active',
    })
    .select('id')
    .single();

  if (orgError || !org) {
    const reason = orgError?.code === '23505' ? 'slug_taken' : 'org_create_failed';
    redirect(`/onboarding?error=${reason}`);
  }

  const { error: membershipError } = await supabase.from('organization_members').insert({
    org_id: org.id,
    user_id: authData.user.id,
    role: 'owner',
  });

  if (membershipError) {
    await supabase.from('organizations').delete().eq('id', org.id);
    redirect('/onboarding?error=membership_create_failed');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
