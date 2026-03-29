'use client';

import { useState } from 'react';

export default function AcceptInvitePage() {
  const [token, setToken] = useState('');

  async function accept() {
    const response = await fetch('/api/team/accept-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const json = await response.json();
    if (!response.ok) return alert(json.error);
    alert('Invite accepted.');
    window.location.href = '/dashboard';
  }

  return (
    <main className='mx-auto max-w-md p-8'>
      <div className='space-y-3 rounded-2xl border bg-white p-6'>
        <h1 className='text-2xl font-semibold'>Accept invite</h1>
        <input className='w-full rounded-xl border p-2' value={token} onChange={(e) => setToken(e.target.value)} placeholder='Invite token' />
        <button onClick={accept} className='rounded-xl bg-slate-900 px-4 py-2 text-white'>Accept</button>
      </div>
    </main>
  );
}
