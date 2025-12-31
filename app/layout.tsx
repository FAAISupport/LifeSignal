import "./globals.css";
import React from "react";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "LifeSignal",
  description: "Daily safety check-ins for peace of mind."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-neutral-900">
        <Nav />
        <main className="container-page py-10 md:py-14">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
