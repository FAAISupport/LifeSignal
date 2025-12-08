// app/page.tsx
'use client';

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Remove <Navbar /> here – layout.tsx already has the nav */}
      <Hero />
      <CTASection />
      <Footer />
    </main>
  );
}
