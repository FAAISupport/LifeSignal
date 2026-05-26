import * as React from "react";

export function StatusCard({
  title,
  value,
  description,
}: {
  title: string;
  value: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
      {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}
