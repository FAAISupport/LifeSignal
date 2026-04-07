"use client";

import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LifeSignalTimelineSection from "@/components/site/LifeSignalTimelineSection";

function Counter({
  value,
  suffix = "",
  duration = 1.8
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      }
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const audiences = [
  {
    title: "Families",
    body: "For loved ones who want peace of mind without needing to call every hour."
  },
  {
    title: "Caregivers",
    body: "For people responsible for daily oversight, follow-up, and fast visibility."
  },
  {
    title: "Churches",
    body: "For care teams that need a structured system so fewer people fall through the cracks."
  }
];

const previewCards = [
  {
    title: "Daily Check-In Status",
    lines: ["8:00 AM check-in sent", "Response received", "Status: Safe"]
  },
  {
    title: "Missed Response Alert",
    lines: ["No response detected", "Retry attempted", "Escalation triggered"]
  },
  {
    title: "Care Team View",
    lines: ["Needs attention: 3", "Resolved today: 7", "Active incidents: 1"]
  }
];

const animatedStats = [
  { value: 24, suffix: "/7", label: "Quiet protection" },
  { value: 3, suffix: "-Step", label: "Safety loop" },
  { value: 2, suffix: " Channels", label: "SMS + Voice" },
  { value: 100, suffix: "%", label: "Escalation focus" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <LifeSignalTimelineSection />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold text-cyan-400">Why LifeSignal Exists</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            LifeSignal was built around one hard truth: people can go unnoticed when something goes wrong.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            We did not want to build another app that gets ignored. We wanted to build safety infrastructure that checks, tracks, and acts.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {animatedStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-3xl border border-cyan-500/20 bg-slate-950/80 p-8 text-center shadow-xl shadow-cyan-950/10"
            >
              <div className="text-4xl font-bold text-cyan-300">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-white">How LifeSignal Works</h2>
            <p className="mt-4 text-lg text-slate-300">
              A simple loop designed for real-world safety.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { n: "1", title: "We Check In", body: "A daily text or voice prompt is sent automatically." },
              { n: "2", title: "They Respond", body: "One quick response confirms everything is okay." },
              { n: "3", title: "We Escalate", body: "If there is no response, the right people are alerted fast." }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-800 bg-black p-8"
              >
                <div className="text-xl font-bold text-cyan-400">{step.n}</div>
                <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white">Who It Is For</h2>
          <p className="mt-4 text-lg text-slate-300">
            Built for the people carrying care responsibility every day.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8"
            >
              <h3 className="text-2xl font-semibold text-cyan-300">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-black to-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-white">Platform Preview</h2>
            <p className="mt-4 text-lg text-slate-300">
              A simple visual of what LifeSignal feels like in action.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {previewCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-cyan-500/20 bg-slate-950 p-8 shadow-xl shadow-cyan-950/10"
              >
                <div className="text-sm uppercase tracking-[0.18em] text-cyan-300">
                  Dashboard
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{card.title}</h3>
                <div className="mt-6 space-y-3">
                  {card.lines.map((line) => (
                    <div
                      key={line}
                      className="rounded-2xl border border-slate-800 bg-black px-4 py-3 text-slate-300"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-cyan-500/20 bg-gradient-to-r from-slate-950 to-cyan-950/20 p-10 text-center"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Ready to See More
            </div>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Built for real people. Real situations. Real safety.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              LifeSignal is designed to make daily safety checks automatic, visible, and actionable.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/beta"
                className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Join the Beta
              </Link>
              <Link
                href="/faithsignal"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400"
              >
                Explore FaithSignal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
