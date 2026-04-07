"use client";

import { motion } from "framer-motion";

const slides = [
  {
    title: "Field Agent AI",
    subtitle: "Building the Safety Infrastructure Layer for Everyday Life",
  },
  {
    title: "The Problem",
    subtitle: "Millions live alone with no daily safety verification",
  },
  {
    title: "The Gap",
    subtitle: "No one owns the daily safety layer",
  },
  {
    title: "LifeSignal",
    subtitle: "We check in. They respond. We escalate.",
  },
  {
    title: "How It Works",
    subtitle: "SMS -> Timer -> Escalation -> Human Response",
  },
  {
    title: "Why This Wins",
    subtitle: "Simple, network-driven, behavior-based",
  },
  {
    title: "Market Entry",
    subtitle: "Starting in The Villages, scaling nationwide",
  },
  {
    title: "The Ask",
    subtitle: ",500 for 5% equity - staggered investment",
  },
  {
    title: "The Vision",
    subtitle: "Every person checked on, every day",
  },
];

export default function ShariPitch() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
        {slides.map((slide, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.7 }}
            className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 text-center shadow-2xl backdrop-blur"
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-4 text-lg text-cyan-300 md:text-2xl">
              {slide.subtitle}
            </p>
          </motion.section>
        ))}
      </div>
    </main>
  );
}



