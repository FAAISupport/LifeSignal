'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      setLoading(false);
      alert(error?.message ?? 'Unable to login.');
      return;
    }

    const { data: memberships } = await supabase
      .from('organization_members')
      .select('org_id')
      .eq('user_id', data.user.id)
      .limit(1);

    router.push(memberships && memberships.length > 0 ? '/dashboard' : '/onboarding');
  }

  return (
    <main className='mx-auto max-w-md p-8'>
      <form onSubmit={login} className='space-y-3 rounded-2xl border bg-white p-6'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <input
          className='w-full rounded-xl border p-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <input
          className='w-full rounded-xl border p-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
          required
        />
        <button disabled={loading} className='rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-60'>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
