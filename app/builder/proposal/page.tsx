import { ProposalView } from '@/components/builder/ProposalView';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function ProposalPage({ searchParams }: { searchParams: Promise<{ sessionId?: string }> }) {
  const { sessionId } = await searchParams;
  const { data } = sessionId
    ? await supabaseAdmin.from('builder_sessions').select('*').eq('id', sessionId).single()
    : { data: null };

  if (!data) return <main className='p-6'>Session not found.</main>;

  return (
    <main className='mx-auto max-w-5xl px-6 py-10'>
      <ProposalView profile={data.profile} selectedModules={data.selected_modules} tier={data.suggested_tier} />
    </main>
  );
}
