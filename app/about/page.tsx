import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About LifeSignal | LifeSignal",
  description:
    "Learn about the mission behind LifeSignal and why it was built to provide simple, human-centered daily safety check-ins for independent living."
};

const principles = [
  {
    title: "Simplicity",
    description:
      "If someone can answer a text or press a button on a phone call, they should be able to use LifeSignal."
  },
  {
    title: "Dignity",
    description:
      "Safety should not require constant surveillance, invasive monitoring, or complicated technology."
  },
  {
    title: "Connection",
    description:
      "The most important alerts should go to real people who care and can respond in a meaningful way."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#03112a,#020817)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              About LifeSignal
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Built to help people stay independent without being left alone.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
              LifeSignal exists to create a simple daily signal of safety for
              people living independently, and a calmer sense of reassurance for
              the people who care about them.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Why it was built
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Too many people fall into the gap between “totally fine” and “full emergency.”
            </h2>
            <p className="mt-5 text-lg leading-9 text-slate-300">
              Many people do not need a complex medical monitoring system. They
              need something much simpler: a dependable daily check-in, a gentle
              reminder if that check-in is missed, and a trusted response path
              if something feels off.
            </p>
            <p className="mt-4 text-lg leading-9 text-slate-300">
              LifeSignal was built for that real-world middle ground. It is
              designed for seniors, families, caregivers, recovery support
              environments, and connected communities that want something more
              dependable than casual texting and less invasive than constant
              tracking.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Mission
            </p>
            <p className="mt-4 text-lg leading-9 text-slate-200">
              Our mission is to help people live with more independence and more
              dignity, while giving families and support networks a clearer way
              to know when everything is okay and when something may need
              attention.
            </p>
            <p className="mt-4 text-lg leading-9 text-slate-200">
              LifeSignal is intentionally human-centered. It is not about
              replacing relationships. It is about making those relationships
              easier to support with consistency and clarity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Core philosophy
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Three principles shape the product.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-slate-900 to-indigo-500/10 p-8 md:p-12">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Learn more
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Explore how LifeSignal works and how it protects privacy while keeping people connected.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/how-it-works"
                className="rounded-full bg-sky-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                How it works
              </Link>
              <Link
                href="/safety-privacy"
                className="rounded-full border border-white/15 px-5 py-3 text-lg font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                Safety & privacy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


