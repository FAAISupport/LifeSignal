// app/layout.tsx
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "LifeSignal",
  description: "Daily check-ins with escalation to family when it matters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
        {/* Header */}
        <SiteHeader />

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer (ALWAYS at bottom) */}
        <SiteFooter />
      </body>
    </html>
  );
}
