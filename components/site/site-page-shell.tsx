import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SitePageShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {children}
    </main>
  );
}


