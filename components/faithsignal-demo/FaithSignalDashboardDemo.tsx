"use client";

import { stats } from "@/components/faithsignal-demo/data";

export default function FaithSignalDashboardDemo() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-10">
      
      <h1 className="text-4xl font-bold mb-8">
        FaithSignal Command Center
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <div 
            key={s.label} 
            className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
          >
            <div className="text-sm text-white/60">{s.label}</div>
            <div className="text-4xl font-bold mt-2">{s.value}</div>
            <div className="text-cyan-300 text-sm mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">🔥 Active Alerts</h2>
          <p className="text-white/60 text-sm">
            High-risk members and missed check-ins surface here in real time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">🙏 Prayer Queue</h2>
          <p className="text-white/60 text-sm">
            Urgent and confidential prayer requests routed instantly.
          </p>
        </div>

      </div>

    </main>
  );
}
