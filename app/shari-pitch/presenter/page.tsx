const timeline = [
  {
    step: '01',
    title: 'It started with a real problem',
    body: 'Too many people live alone with no real safety net. Families worry. Churches care, but cannot monitor everyone. Caregivers cannot be everywhere at once. When something goes wrong, people often find out too late.',
  },
  {
    step: '02',
    title: 'The idea became a platform',
    body: 'LifeSignal was built around one simple loop: We check in. They respond. We escalate. That simple loop became a larger platform for safety, care coordination, and fast response.',
  },
  {
    step: '03',
    title: 'The market became obvious',
    body: 'This is not a made-up problem. It is visible in The Villages, across Florida, and anywhere independence matters. Seniors, families, churches, and caregivers all feel this pain already.',
  },
  {
    step: '04',
    title: 'Now it needs fuel',
    body: 'The bottleneck is no longer the vision. It is not effort. It is not commitment. The bottleneck is the ongoing cost of keeping the platform alive, improving it, and launching it the right way.',
  },
];

const problemPoints = [
  'The product is real',
  'The use case is real',
  'The market is real',
  'The costs are real too',
];

const askPoints = [
  ',500 total investment',
  ',500 every 30 days',
  '3 total monthly tranches',
  '5% equity',
  'Monthly checkpoints',
  'Ability to stop if progress is not there',
];

const upsidePoints = [
  'Early ownership before public traction',
  'Position in a platform with multiple market paths',
  'Clear visibility into real-world progress',
  'A structured entry instead of a blind lump-sum risk',
];

export default function ShariPitchPresenterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
          <div className="max-w-6xl space-y-8">
            <p className="text-cyan-300 text-lg font-medium uppercase tracking-[0.45em]">
              Private Investor Presentation
            </p>

            <h1 className="max-w-6xl text-6xl font-semibold leading-[1.05] lg:text-8xl">
              Shari,
              <span className="block text-white/95">LifeSignal is no longer an idea.</span>
              <span className="block text-cyan-300">It is a real build with a real market.</span>
            </h1>

            <p className="max-w-5xl text-2xl leading-10 text-slate-300 lg:text-3xl lg:leading-[1.5]">
              This is the point where a good idea either stalls out from lack of support
              or breaks through because someone helps give it momentum.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-base text-slate-400">Stage</div>
              <div className="mt-3 text-3xl font-semibold">Built + Launching</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-base text-slate-400">Ask</div>
              <div className="mt-3 text-3xl font-semibold">,500</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-base text-slate-400">Structure</div>
              <div className="mt-3 text-3xl font-semibold">,500 x 3</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-base text-slate-400">Equity</div>
              <div className="mt-3 text-3xl font-semibold">5%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-18 lg:px-12">
        <div className="max-w-5xl">
          <p className="text-cyan-300 text-lg font-medium uppercase tracking-[0.4em]">The story</p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight lg:text-6xl">
            Why this matters
          </h2>
        </div>

        <div className="mt-12 grid gap-6">
          {timeline.map((item) => (
            <div key={item.step} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10">
              <div className="text-cyan-300 text-xl font-semibold">{item.step}</div>
              <h3 className="mt-3 text-3xl font-semibold lg:text-4xl">{item.title}</h3>
              <p className="mt-5 max-w-6xl text-2xl leading-10 text-slate-300 lg:text-[2rem] lg:leading-[1.55]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-8 py-18 lg:px-12">
          <div className="max-w-5xl">
            <p className="text-cyan-300 text-lg font-medium uppercase tracking-[0.4em]">The reality</p>
            <h2 className="mt-4 text-5xl font-semibold leading-tight lg:text-6xl">
              The problem is not belief.
              <span className="block text-cyan-300">The problem is runway.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {problemPoints.map((point) => (
              <div key={point} className="rounded-3xl border border-white/10 bg-slate-950/70 p-7 text-3xl font-medium text-slate-100">
                {point}
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-6xl text-2xl leading-10 text-slate-300 lg:text-3xl lg:leading-[1.55]">
            Hosting, messaging, backend infrastructure, testing, deployment, and rollout all cost money every month.
            Without support, momentum slows down. With support, LifeSignal moves from build-stage effort into launch-stage traction.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-18 lg:px-12">
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/6 p-10">
            <p className="text-cyan-300 text-lg font-medium uppercase tracking-[0.4em]">The ask</p>
            <h2 className="mt-4 text-5xl font-semibold leading-tight lg:text-6xl">
              A fair deal.
              <span className="block text-white">A measured structure.</span>
            </h2>

            <div className="mt-10 grid gap-4">
              {askPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-slate-950/65 p-6 text-2xl text-slate-100 lg:text-3xl">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10">
            <p className="text-cyan-300 text-lg font-medium uppercase tracking-[0.4em]">What you get</p>
            <h2 className="mt-4 text-5xl font-semibold leading-tight lg:text-6xl">
              Real upside.
              <span className="block text-white">Not just goodwill.</span>
            </h2>

            <div className="mt-10 grid gap-4">
              {upsidePoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-slate-950/65 p-6 text-2xl text-slate-100 lg:text-3xl">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-24 lg:px-12">
        <div className="rounded-[2.25rem] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.10),rgba(15,23,42,0.78))] p-10 lg:p-14">
          <p className="text-cyan-300 text-lg font-medium uppercase tracking-[0.4em]">Closing</p>
          <h2 className="mt-4 max-w-6xl text-5xl font-semibold leading-tight lg:text-7xl">
            I would rather build this with someone I know and trust
            <span className="block text-white/95">than open the door to a stranger.</span>
          </h2>

          <p className="mt-8 max-w-6xl text-2xl leading-10 text-slate-200 lg:text-3xl lg:leading-[1.55]">
            LifeSignal is already moving.
            This is the moment where support turns effort into momentum.
          </p>

          <p className="mt-6 max-w-5xl text-2xl leading-10 text-slate-300 lg:text-[2rem] lg:leading-[1.55]">
            This is not about helping me dream something up.
            It is about helping me push something real across the line.
          </p>
        </div>
      </section>
    </main>
  );
}
