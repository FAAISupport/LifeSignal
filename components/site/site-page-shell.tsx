import type { ReactNode } from "react";

type SitePageShellProps = {
  children: ReactNode;
};

export default function SitePageShell({ children }: SitePageShellProps) {
  return <main className="min-h-screen bg-[#020817] text-white">{children}</main>;
}

