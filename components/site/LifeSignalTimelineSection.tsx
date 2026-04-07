"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    period: "Early 2025",
    title: "Problem Discovery",
    description:
      "LifeSignal began with a simple realization: too many seniors and vulnerable people living alone could go unnoticed when something went wrong."
  },
  {
    period: "Mid 2025",
    title: "Core Concept Defined",
    description:
      "The core operating model was established: We check in. They respond. If they do not, we escalate."
  },
  {
    period: "Late 2025",
    title: "Architecture Built",
    description:
      "The platform direction became clear with Next.js, Supabase, and Twilio forming the backbone of a real safety infrastructure system."
  },
  {
    period: "Late 2025",
    title: "MVP Development",
    description:
      "LifeSignal moved from concept to working product with check-ins, escalation flows, and a growing operational vision."
  },
  {
    period: "Early 2026",
    title: "FaithSignal Expansion",
    description:
      "The mission expanded into churches and coordinated care, opening a major distribution path through FaithSignal."
  },
  {
    period: "Now",
    title: "Ready for Scale",
    description:
      "Today, LifeSignal stands as a platform with a clear story, product direction, milestone history, and go-to-market momentum."
  }
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

export default function LifeSignalTimelineSection() {
  return (
    <section className="relative overflow-hidden bg-black pt-10 pb-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_35%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
            Our Journey
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From a Simple Safety Problem to a Platform Built to Scale
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            LifeSignal started with one urgent question: what happens when someone living
            alone cannot ask for help? This is the timeline of how that question became a
            real platform.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_80px_1fr]">
          <div className="hidden lg:block" />

          <div className="relative hidden lg:flex justify-center">
            <div className="absolute top-0 h-full w-px bg-gradient-to-b from-cyan-500/20 via-cyan-400 to-cyan-500/20" />
          </div>

          <div className="hidden lg:block" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-3 space-y-10"
          >
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.title}
                  variants={item}
                  className="grid items-start gap-6 lg:grid-cols-[1fr_80px_1fr]"
                >
                  <div className={isLeft ? "block" : "hidden lg:block"} />

                  <div className="relative flex justify-start lg:justify-center">
                    <div className="absolute left-5 top-0 h-full w-px bg-slate-800 lg:hidden" />
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950 text-sm font-bold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                      {index + 1}
                    </div>
                  </div>

                  <div className={isLeft ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3 lg:row-start-1"}>
                    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur">
                      <div className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
                        {milestone.period}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-slate-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-20 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-950 to-cyan-950/20 p-8 text-center"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Where We Are Now
          </div>
          <h3 className="mt-3 text-3xl font-bold text-white">
            Built from urgency. Positioned for scale.
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            LifeSignal is no longer just an idea. It is a defined platform with a clear
            mission, product direction, and milestone path toward real-world deployment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


