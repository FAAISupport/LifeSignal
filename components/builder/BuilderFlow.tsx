'use client';

import { useMemo, useState } from 'react';
import { NeedsAssessment } from '@/components/builder/NeedsAssessment';
import { AIRecommendations } from '@/components/builder/AIRecommendations';
import { ModuleSelector } from '@/components/builder/ModuleSelector';
import { PricingEngine } from '@/components/builder/PricingEngine';
import type { BuilderChurchProfile, BuilderRecommendation } from '@/types/builder';

const defaultProfile: BuilderChurchProfile = {
  churchName: '',
  contactName: '',
  contactEmail: '',
  phone: '',
  cityState: '',
  attendanceBand: 'under_100',
  ministryFocus: 'Pastoral care',
};

export function BuilderFlow({ referralCode }: { referralCode?: string }) {
  const [profile, setProfile] = useState<BuilderChurchProfile>(defaultProfile);
  const [pains, setPains] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<BuilderRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const canContinue = useMemo(() => profile.churchName.length > 1 && profile.contactEmail.includes('@'), [profile]);

  const togglePain = (pain: string) => {
    setPains((p) => (p.includes(pain) ? p.filter((x) => x !== pain) : [...p, pain]));
  };

  const toggleModule = (key: string) => {
    setSelectedModules((s) => (s.includes(key) ? s.filter((x) => x !== key) : [...s, key]));
  };

  async function recommend() {
    setLoading(true);
    try {
      const response = await fetch('/api/builder/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, pains, selectedModules }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? 'Failed recommendation');
      setRecommendation(json.recommendation);
    } finally {
      setLoading(false);
    }
  }

  async function saveAndContinue() {
    const response = await fetch('/api/builder/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, pains, selectedModules, referralCode }),
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error ?? 'Unable to save');
      return;
    }
    window.location.href = `/builder/results?sessionId=${json.session.id}`;
  }

  return (
    <div className='space-y-8'>
      <section className='grid gap-4 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2'>
        {Object.entries(profile).map(([k, v]) => (
          <label key={k} className='space-y-1 text-sm'>
            <span className='text-slate-600'>{k}</span>
            <input
              className='w-full rounded-xl border border-slate-300 px-3 py-2'
              value={v}
              onChange={(e) => setProfile((prev) => ({ ...prev, [k]: e.target.value }))}
            />
          </label>
        ))}
      </section>

      <section>
        <h3 className='mb-3 text-xl font-semibold'>Needs Assessment</h3>
        <NeedsAssessment selected={pains} onToggle={togglePain} />
      </section>

      <section>
        <h3 className='mb-3 text-xl font-semibold'>Module Selection</h3>
        <ModuleSelector selectedModules={selectedModules} onToggle={toggleModule} />
      </section>

      <PricingEngine selectedModules={selectedModules} />

      <div className='flex flex-wrap gap-3'>
        <button disabled={!canContinue || loading} type='button' onClick={recommend} className='rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-50'>
          {loading ? 'Generating...' : 'Get AI recommendation'}
        </button>
        <button disabled={!canContinue || selectedModules.length === 0} type='button' onClick={saveAndContinue} className='rounded-xl bg-indigo-600 px-4 py-2 text-white disabled:opacity-50'>
          Save & continue
        </button>
      </div>

      <AIRecommendations recommendation={recommendation} />
    </div>
  );
}
