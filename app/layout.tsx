import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LifeSignal",
  description: "Daily check-ins and family peace of mind."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#020817] text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

