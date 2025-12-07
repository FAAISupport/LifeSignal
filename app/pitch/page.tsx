'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

const Section = ({ id, title, eyebrow, children }: SectionProps) => (
  <section
    id={id}
    className="py-16 md:py-24 px-4 sm:px-8 lg:px-24 bg-slate-50 border-b border-slate-200"
  >
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide uppercase text-sky-500 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
        {title}
      </h2>
      <div className="text-slate-700 text-base md:text-lg leading-relaxed">
        {children}
      </div>
    </motion.div>
  </section>
);

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700">
    {children}
  </span>
);

export default function PitchPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_55%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-24 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-medium mb-4 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Automated daily safety calls</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              LifeSignal
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-100 max-w-xl mb-6">
              Daily peace of mind for families of independent seniors. Automated
              wellness calls that never forget and never get tired.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-slate-900/20 hover:bg-slate-50 transition">
                View Product Demo
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/40 text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition">
                Download Investor Deck
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm text-slate-100/90">
              <Pill>High-margin SaaS</Pill>
              <Pill>Zero hardware</Pill>
              <Pill>Senior-friendly</Pill>
              <Pill>LifeSignal.app</Pill>
            </div>
          </motion.div>

          {/* Right: mock UI card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-3xl bg-white/15 blur-2xl" />
              <div className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full bg-emerald-400/50 blur-xl" />

              <div className="relative bg-white/95 text-slate-900 rounded-3xl shadow-2xl shadow-slate-900/30 p-5 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-sky-500 uppercase tracking-wide">
                      Today&apos;s Check-In
                    </p>
                    <p className="text-sm text-slate-500">
                      Calling:{' '}
                      <span className="font-semibold">Grandma Jo</span>
                    </p>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-lg">
                    ✓
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Daily call</span>
                    <span className="text-xs rounded-full bg-sky-50 text-sky-600 px-2 py-0.5">
                      9:00 AM
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Response</span>
                    <span className="text-xs rounded-full bg-emerald-50 text-emerald-600 px-2 py-0.5">
                      Pressed 1 · OK
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Escalation</span>
                    <span className="text-xs rounded-full bg-slate-100 text-slate-600 px-2 py-0.5">
                      Not needed
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-600">100%</span>{' '}
                  of scheduled calls completed this week.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section
        id="problem"
        eyebrow="The Problem"
        title="Emergencies that no one knows about."
      >
        <p className="mb-4">
          Millions of seniors live alone. When something goes wrong, hours—or
          days—can pass before anyone notices. Families live with a constant
          background of worry.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>1 in 4 seniors will fall this year.</li>
          <li>Panic buttons don&apos;t work if they aren&apos;t worn.</li>
          <li>
            There&apos;s no simple, automated way to confirm{' '}
            <span className="font-semibold">“They&apos;re okay today.”</span>
          </li>
        </ul>
      </Section>

      {/* SOLUTION */}
      <Section
        id="solution"
        eyebrow="The Solution"
        title="A daily wellness check that always runs."
      >
        <p className="mb-4">
          LifeSignal is an automated safety net built on simple phone calls. No
          apps, no logins, no new hardware—just the phone they already trust.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <h3 className="font-semibold mb-2 text-sm">For Seniors</h3>
            <p className="text-sm text-slate-600">
              Answer a friendly automated call and press 1 to confirm
              they&apos;re okay. That&apos;s it.
            </p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <h3 className="font-semibold mb-2 text-sm">For Families</h3>
            <p className="text-sm text-slate-600">
              Get instant alerts if something seems wrong—instead of discovering
              a problem days later.
            </p>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works" title="How LifeSignal Works">
        <div className="grid md:grid-cols-4 gap-4 mt-2">
          {[
            'LifeSignal places the scheduled call.',
            'Senior answers and confirms with a single key press.',
            'No response triggers an SMS follow-up.',
            'Still no response? The escalation tree calls family and caregivers.',
          ].map((text, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white shadow-sm p-4 flex flex-col gap-2"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-sm font-bold">
                {idx + 1}
              </span>
              <p className="text-sm text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO WE HELP */}
      <Section id="who" title="Who LifeSignal Helps">
        <div className="grid md:grid-cols-4 gap-4 mt-2">
          {['Families', 'Independent Seniors', 'Caregivers', 'Facilities'].map(
            (label) => (
              <div
                key={label}
                className="rounded-2xl bg-white shadow-sm p-4 flex flex-col gap-1"
              >
                <span className="text-sm font-semibold">{label}</span>
                <p className="text-xs text-slate-500">
                  Fits naturally into existing routines with almost no setup.
                </p>
              </div>
            ),
          )}
        </div>
      </Section>

      {/* MARKET */}
      <Section id="market" title="Massive, emotionally driven market.">
        <p className="mb-4">
          LifeSignal sits at the intersection of elder-care, safety, and family
          peace of mind.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <p className="text-3xl font-extrabold text-sky-500 mb-1">58M</p>
            <p className="text-sm text-slate-600">
              Seniors in the U.S. today, and growing.
            </p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <p className="text-3xl font-extrabold text-violet-500 mb-1">
              $400B
            </p>
            <p className="text-sm text-slate-600">
              Annual elder-care spending in the U.S.
            </p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <p className="text-3xl font-extrabold text-emerald-500 mb-1">
              &lt;0.1%
            </p>
            <p className="text-sm text-slate-600">
              Of U.S. seniors needed to reach $1M+ ARR.
            </p>
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" title="Simple subscription pricing.">
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          {[
            { name: 'Basic', price: '$14/mo', note: '1 senior' },
            { name: 'Plus', price: '$29/mo', note: 'Up to 3 seniors' },
            { name: 'Family', price: '$49/mo', note: 'Up to 10 seniors' },
          ].map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl bg-white shadow-sm p-5 flex flex-col items-center text-center gap-2"
            >
              <p className="text-xs font-semibold tracking-wide uppercase text-sky-500">
                {tier.name}
              </p>
              <p className="text-3xl font-extrabold text-slate-900">
                {tier.price}
              </p>
              <p className="text-sm text-slate-500">{tier.note}</p>
              <ul className="text-xs text-slate-500 mt-2 space-y-1">
                <li>Daily automated check-in</li>
                <li>Missed-call alerts</li>
                <li>SMS notifications</li>
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Facility plans start at $199–$499/month for multi-resident
          buildings.
        </p>
      </Section>

      {/* UNIT ECONOMICS */}
      <Section id="unit-econ" title="Exceptionally strong unit economics.">
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Gross Margin
            </p>
            <p className="text-3xl font-extrabold text-emerald-500">95%</p>
            <p className="text-xs text-slate-500 mt-1">
              Twilio and infra costs are a fraction of subscription revenue.
            </p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
              LTV : CAC
            </p>
            <p className="text-3xl font-extrabold text-sky-500">20 : 1</p>
            <p className="text-xs text-slate-500 mt-1">
              High retention and emotional value create outsized lifetime value.
            </p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Break-even
            </p>
            <p className="text-3xl font-extrabold text-violet-500">9</p>
            <p className="text-xs text-slate-500 mt-1">
              Paying families needed to cover core infrastructure.
            </p>
          </div>
        </div>
      </Section>

      {/* TECHNOLOGY */}
      <Section id="tech" title="Built on proven infrastructure.">
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          {[
            {
              name: 'Vercel',
              desc: 'Global edge network for the LifeSignal web experience.',
            },
            {
              name: 'Supabase',
              desc: 'Authentication, data, and scheduled jobs for check-ins.',
            },
            {
              name: 'Twilio',
              desc: 'Reliable voice and SMS backbone trusted worldwide.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white shadow-sm p-4 flex flex-col gap-1"
            >
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* VISION */}
      <Section id="vision" title="A world where no senior is ever left unseen.">
        <p className="mb-3">
          LifeSignal starts with daily check-ins, but the long-term vision is a
          complete safety and wellness layer for independent seniors.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>AI-powered conversational wellness checks</li>
          <li>Medication reminders and adherence tracking</li>
          <li>Behavior pattern alerts and trend detection</li>
          <li>Dashboards for facilities, agencies, and care networks</li>
        </ul>
      </Section>

      {/* ASK */}
      <Section id="ask" title="Funding ask.">
        <div className="grid md:grid-cols-2 gap-6 items-center mt-2">
          <div className="rounded-2xl bg-white shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Raising
            </p>
            <p className="text-4xl font-extrabold text-emerald-500">$250k</p>
            <p className="text-sm text-slate-600 mt-2">
              To scale acquisition, harden the platform, and expand into
              facilities and partnerships.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900 text-slate-50 p-5">
            <p className="text-xs font-semibold uppercase text-sky-400 mb-1">
              Use of funds
            </p>
            <ul className="text-sm space-y-1">
              <li>• Marketing & customer acquisition</li>
              <li>• Facility & channel partnerships</li>
              <li>• AI voice & safety feature development</li>
              <li>• Infrastructure & support readiness</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-100 py-10 px-4 sm:px-8 lg:px-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-sky-400">
              LifeSignal
            </p>
            <p className="text-sm text-slate-300">
              Daily peace of mind for families of independent seniors.
            </p>
          </div>
          <div className="text-sm text-slate-300 text-right">
            <p>Founder: Judd Spence</p>
            <p>lifesignal.app</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
