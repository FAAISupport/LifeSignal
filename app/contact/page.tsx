import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | LifeSignal",
  description:
    "Contact LifeSignal to ask questions about family use, caregiver workflows, community deployment, or product availability."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#03112a,#020817)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Contact LifeSignal
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Questions, rollout conversations, and early interest.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
              We’re happy to talk through family use, caregiver workflows,
              community deployment, or general questions about the platform.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Reach out
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Contact details
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-9 text-slate-300">
              <div>
                <p className="font-semibold text-white">Email</p>
                <a
                  href="mailto:support@lifesignal.app"
                  className="text-sky-300 transition hover:text-sky-200"
                >
                  support@lifesignal.app
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Best for</p>
                <p>
                  Questions about setup, rollout timing, caregiver use,
                  community use, partnerships, and general product fit.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              What to include
            </p>
            <ul className="mt-4 space-y-3 text-lg leading-9 text-slate-200">
              <li>Whether you are asking as a family, caregiver, or community</li>
              <li>How many people you may want to support</li>
              <li>Whether you prefer text, voice, or both</li>
              <li>Any timing questions around availability or rollout</li>
              <li>Any special concerns around privacy, adoption, or ease of use</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}





