const milestones = [
  {
    period: "Early 2025",
    title: "Problem Discovery",
    status: "Started",
    points: [
      "Recognized the gap in daily safety verification for seniors and vulnerable people living alone",
      "Identified that existing solutions were too passive, reactive, or app-dependent",
      "Core insight formed: safety should run like infrastructure"
    ]
  },
  {
    period: "Mid 2025",
    title: "LifeSignal Concept Defined",
    status: "Milestone",
    points: [
      "Created the core LifeSignal loop: We check in → They respond → We escalate",
      "Positioned LifeSignal as a Safety Infrastructure Platform",
      "Began shaping the family, caregiver, and community use cases"
    ]
  },
  {
    period: "Late 2025",
    title: "System Architecture Built",
    status: "Milestone",
    points: [
      "Established core stack around Next.js, Supabase, and Twilio",
      "Designed check-in engine, escalation engine, and event logging model",
      "Defined auditable workflows and risk-aware system thinking"
    ]
  },
  {
    period: "Late 2025",
    title: "MVP Development",
    status: "Milestone",
    points: [
      "Built initial check-in and escalation functionality",
      "Created early product flows for SMS-based daily safety check-ins",
      "Moved from concept into working product form"
    ]
  },
  {
    period: "Early 2026",
    title: "FaithSignal Expansion",
    status: "Milestone",
    points: [
      "Expanded into church care infrastructure through FaithSignal",
      "Framed churches as a distribution and trust network",
      "Defined large feature catalog for pastoral care, follow-up, and crisis coordination"
    ]
  },
  {
    period: "2026",
    title: "Go-To-Market Systems",
    status: "Milestone",
    points: [
      "Built pitch scripts, outreach flows, referral ideas, and local marketing assets",
      "Focused first-market testing around The Villages",
      "Started preparing investor, pilot, and church-facing collateral"
    ]
  },
  {
    period: "Now",
    title: "Current Position",
    status: "You Are Here",
    points: [
      "LifeSignal has evolved from idea to platform strategy",
      "FaithSignal is positioned as a scalable vertical",
      "The business now has product direction, market story, and milestone narrative"
    ]
  },
  {
    period: "Next",
    title: "Scale Phase",
    status: "Upcoming",
    points: [
      "Launch more polished demos and landing pages",
      "Convert church and family pilots into recurring revenue",
      "Expand regionally and strengthen the growth engine"
    ]
  }
];

const stages = [
  { label: "Idea", value: 10 },
  { label: "Concept", value: 22 },
  { label: "Architecture", value: 36 },
  { label: "MVP", value: 50 },
  { label: "Expansion", value: 68 },
  { label: "Go-To-Market", value: 82 },
  { label: "Now", value: 90 },
  { label: "Scale", value: 100 }
];

export default function LifeSignalTimelinePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-cyan-950 bg-gradient-to-b from-slate-950 to-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
            LifeSignal Timeline
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-cyan-400 sm:text-5xl">
            Where LifeSignal Started, Where It Is Now, and the Milestones In Between
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A visual founder timeline showing how LifeSignal moved from problem recognition
            to platform vision, product development, FaithSignal expansion, and current scale readiness.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Growth Path</h2>
              <p className="mt-1 text-sm text-slate-400">
                From idea to infrastructure to scale.
              </p>
            </div>
            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Current Stage: Go-To-Market / Early Scale
            </div>
          </div>

          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-slate-800" />
            <div className="absolute left-0 top-5 h-1 rounded-full bg-cyan-500" style={{ width: "90%" }} />

            <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
              {stages.map((stage) => (
                <div key={stage.label} className="flex flex-col items-center text-center">
                  <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400 bg-black text-xs font-bold text-cyan-300 shadow-lg shadow-cyan-500/20">
                    {stage.value}
                  </div>
                  <div className="mt-3 text-sm font-medium text-slate-200">{stage.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold text-cyan-300">Milestone Track</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                The key moments that shaped the company from concept to the current platform position.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-800" />

            <div className="space-y-8">
              {milestones.map((item, index) => (
                <div key={item.title} className="relative pl-16">
                  <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-950 text-cyan-300">
                    {index + 1}
                  </div>

                  <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-black/30">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-medium text-cyan-300">{item.period}</div>
                        <h3 className="mt-1 text-2xl font-semibold text-white">{item.title}</h3>
                      </div>
                      <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                        {item.status}
                      </div>
                    </div>

                    <ul className="mt-5 space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-slate-300">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          <span className="leading-7">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



