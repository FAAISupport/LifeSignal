import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/auth/login');
  }

  return children;
}
