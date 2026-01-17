import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <SiteHeader />

        {/* 👇 prose ONLY wraps content, not header/footer */}
        <main className="mx-auto max-w-7xl px-6 py-10">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
