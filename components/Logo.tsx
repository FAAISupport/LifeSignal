import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ls_g" x1="10" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2F6FED" />
            <stop offset="1" stopColor="#B9A7E6" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="26" stroke="url(#ls_g)" strokeWidth="6" />
        <path
          d="M14 34h10l4-10 6 20 5-12h11"
          stroke="#0B1B3A"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="leading-none">
        <div className="text-sm font-semibold text-brand-navy">LifeSignal</div>
        <div className="text-[11px] text-neutral-500">Just checking in</div>
      </div>
    </div>
  );
}
