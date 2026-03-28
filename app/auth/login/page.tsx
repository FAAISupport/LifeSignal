'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    window.location.href = '/dashboard';
  }

  return <main className='mx-auto max-w-md p-8'><form onSubmit={login} className='space-y-3 rounded-2xl border bg-white p-6'><h1 className='text-2xl font-semibold'>Login</h1><input className='w-full rounded-xl border p-2' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' /><input className='w-full rounded-xl border p-2' value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' /><button className='rounded-xl bg-slate-900 px-4 py-2 text-white'>Sign in</button></form></main>;
}
