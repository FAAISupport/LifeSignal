import type { ReactNode } from "react";

export function DashboardShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
        ) : null}
      </div>

      <div>{children}</div>
    </div>
  );
}


