import React from "react";

export function Card({
  className = "",
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft ${className}`}>
      {children}
    </div>
  );
}
