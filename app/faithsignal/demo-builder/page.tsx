"use client";

import { useState } from "react";

export default function DemoBuilder() {
  const [form, setForm] = useState({
    churchName: "",
    city: "",
    size: "",
    pastor: "",
    goal: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-3xl font-bold text-cyan-400">
          {form.churchName || "Your Church"} Care Dashboard
        </h1>
        <p className="mt-4">Location: {form.city || "N/A"}</p>
        <p>Pastor: {form.pastor || "N/A"}</p>
        <p>Church Size: {form.size || "N/A"}</p>
        <p>Primary Goal: {form.goal || "N/A"}</p>

        <div className="mt-6 rounded-xl bg-gray-900 p-6">
          <h2 className="text-xl font-semibold">Live Scenario</h2>
          <p className="mt-2">
            3 members missed check-ins, volunteers were dispatched, and leadership was notified.
          </p>
        </div>

        <p className="mt-6 text-cyan-300">
          This is what your church could look like with FaithSignal.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-6 text-3xl font-bold">Build Your Church Demo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Church Name"
          className="w-full bg-gray-900 p-3"
          value={form.churchName}
          onChange={(e) => setForm({ ...form, churchName: e.target.value })}
        />
        <input
          placeholder="City"
          className="w-full bg-gray-900 p-3"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          placeholder="Size (e.g. 100 members)"
          className="w-full bg-gray-900 p-3"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <input
          placeholder="Pastor Name"
          className="w-full bg-gray-900 p-3"
          value={form.pastor}
          onChange={(e) => setForm({ ...form, pastor: e.target.value })}
        />
        <input
          placeholder="Primary Goal"
          className="w-full bg-gray-900 p-3"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />

        <button type="submit" className="rounded bg-cyan-500 px-6 py-3 text-black font-semibold">
          Generate Demo
        </button>
      </form>
    </div>
  );
}
