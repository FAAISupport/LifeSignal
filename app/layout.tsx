// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeSignal — Daily Check-ins for Independent Seniors",
  description:
    "LifeSignal provides daily phone and text check-ins for seniors living alone. If they don't respond, family is alerted automatically.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">{children}</body>
    </html>
  );
}
