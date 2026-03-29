'use client';

import { useState } from 'react';

export function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('volunteer');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });
    if (!response.ok) return alert('Invite failed');
    setEmail('');
    alert('Invite created');
  }

  return (
    <form onSubmit={submit} className='flex flex-wrap gap-2 rounded-2xl border bg-white p-4'>
      <input className='rounded-xl border px-3 py-2' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
      <select className='rounded-xl border px-3 py-2' value={role} onChange={(e) => setRole(e.target.value)}>
        {['admin', 'pastor', 'care_manager', 'volunteer', 'viewer'].map((r) => <option key={r}>{r}</option>)}
      </select>
      <button className='rounded-xl bg-slate-900 px-4 py-2 text-white'>Send invite</button>
    </form>
  );
}
