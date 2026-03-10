"use client";

import { useEffect, useState } from "react";

export default function WaitlistCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/waitlist/count", { cache: "no-store" });
        const data = await res.json();

        if (mounted && typeof data?.count === "number") {
          setCount(data.count);
        }
      } catch {}
    };

    load();
    const timer = setInterval(load, 15000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="mt-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
      {count} people already joined the waitlist
    </div>
  );
}
