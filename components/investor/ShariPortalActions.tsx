"use client";
export default function Actions({ advisorUrl }: { advisorUrl: string }) {
  return (
    <div className="mt-6">
      <a href={advisorUrl} className="bg-cyan-400 text-black px-4 py-3 rounded-xl font-semibold">
        Send to Advisor
      </a>
    </div>
  );
}
