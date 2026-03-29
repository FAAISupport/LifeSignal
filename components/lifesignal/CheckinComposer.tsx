'use client';

import { useState } from 'react';

export function CheckinComposer({ memberId }: { memberId: string }) {
  const [message, setMessage] = useState('Hi from your care team. Reply YES to confirm you are okay.');
  const [channel, setChannel] = useState<'sms' | 'voice'>('sms');

  async function send() {
    const response = await fetch('/api/lifesignal/checkins/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, channel, message }),
    });
    const json = await response.json();
    if (!response.ok) return alert(json.error);
    alert(`Check-in sent: ${json.result.checkinId}`);
  }

  return (
    <div className='rounded-2xl border bg-white p-4'>
      <h3 className='font-semibold'>Send test check-in</h3>
      <textarea className='mt-2 w-full rounded-xl border p-2' value={message} onChange={(e) => setMessage(e.target.value)} />
      <select className='mt-2 rounded-xl border p-2' value={channel} onChange={(e) => setChannel(e.target.value as 'sms' | 'voice')}>
        <option value='sms'>SMS</option>
        <option value='voice'>Voice</option>
      </select>
      <button type='button' onClick={send} className='ml-2 rounded-xl bg-indigo-600 px-4 py-2 text-white'>Send</button>
    </div>
  );
}
