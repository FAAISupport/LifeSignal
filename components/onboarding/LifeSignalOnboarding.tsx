'use client';

import { useMemo, useState } from "react";

type RoleOption = "family" | "self" | "church";

const roleCards: Array<{ key: RoleOption; icon: string; title: string; body: string }> = [
  {
    key: "family",
    icon: "👵",
    title: "Someone I care about",
    body: "Best for families, caregivers, and loved ones helping someone stay safe at home.",
  },
  {
    key: "self",
    icon: "🙋",
    title: "Myself",
    body: "Best for people setting up their own safety routine and backup plan.",
  },
  {
    key: "church",
    icon: "⛪",
    title: "My church or community",
    body: "Best for churches, care teams, and organized volunteer support.",
  },
];

export default function LifeSignalOnboarding() {
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const totalSteps = 6;
  const currentStep = 1;

  const progressWidth = useMemo(() => `${(currentStep / totalSteps) * 100}%`, [currentStep, totalSteps]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            LifeSignal onboarding
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white">
            Set up protection before you set up an account.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            This flow should feel like a safety setup, not a software setup. Start by choosing who this is for.
          </p>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span>Progress</span>
              <span>{currentStep} / {totalSteps}</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-cyan-400 transition-all duration-300" style={{ width: progressWidth }} />
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3">
              <div className="text-sm font-semibold text-white">Step 1</div>
              <div className="text-sm text-cyan-100">Choose the onboarding path</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">Step 2 · Set the first check-in</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">Step 3 · Explain what happens next</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">Step 4 · Add a guardian</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">Step 5 · Run a live-style test</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">Step 6 · Create the account</div>
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Design goal</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              The first screen should reduce confusion fast and make the next action obvious.
            </p>
          </div>
        </aside>

        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 lg:p-8">
          <p className="text-sm font-medium text-cyan-300">Step 1</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Who are you setting this up for?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Pick the starting point so the onboarding flow can use the right language and sensible defaults from the beginning.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {roleCards.map((role) => {
              const selected = selectedRole === role.key;

              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setSelectedRole(role.key)}
                  className={`rounded-3xl border p-5 text-left transition`}
                >
                  <div className="text-3xl">{role.icon}</div>
                  <div className="mt-4 text-lg font-semibold text-white">{role.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{role.body}</p>
                  <div className="mt-4 text-sm font-semibold text-cyan-200">
                    {selected ? "Selected" : "Choose this path"}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-sm font-semibold text-cyan-200">Current selection</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {selectedRole === "family" && "You are setting this up for someone you care about. Next we should capture the first daily check-in time."}
              {selectedRole === "self" && "You are setting this up for yourself. Next we should build your first daily check-in routine."}
              {selectedRole === "church" && "You are setting this up for a church or community. Next we should define the first care check-in schedule."}
              {!selectedRole && "Choose one option to continue into the correct onboarding path."}
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="text-sm text-slate-400">
              {selectedRole ? "Great. The next screen should capture the first check-in details." : "Select a role to enable the next step."}
            </div>

            <button
              type="button"
              disabled={!selectedRole}
              className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}






