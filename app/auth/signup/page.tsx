'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/onboarding';
  }

  return (
    <main className='mx-auto max-w-md p-8'>
      <form onSubmit={signup} className='space-y-3 rounded-2xl border bg-white p-6'>
        <h1 className='text-2xl font-semibold'>Sign up</h1>
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
        <button disabled={loading} className='rounded-xl bg-indigo-600 px-4 py-2 text-white disabled:opacity-60'>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </main>
  );
}
