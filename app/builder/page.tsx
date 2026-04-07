import { BuilderFlow } from "@/components/builder/BuilderFlow";

const outcomes = [
  "Map church care needs to the right module stack",
  "Estimate pricing instantly as your scope changes",
  "Generate a proposal even when the backend is offline",
  "Move from discovery to rollout with a concrete package",
];

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.24),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.18),transparent_30%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-200">
                ChurchOS Builder
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Build a church care system that leadership can understand and actually deploy.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This builder translates pastoral care goals into a concrete package: member monitoring, escalation,
                incident follow-up, analytics, and team collaboration. It is designed to move from interest to a usable
                proposal in one sitting, and now supports a la carte feature checkout through Stripe.
              </p>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              {outcomes.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 text-slate-900 shadow-2xl sm:p-8">
          <BuilderFlow />
        </div>
      </section>
    </main>
  );
}



