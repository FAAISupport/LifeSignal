import React from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
          <Link href="/logout" className="hover:underline">Log out</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
