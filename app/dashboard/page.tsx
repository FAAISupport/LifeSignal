// app/dashboard/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 pb-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          LifeSignal Dashboard (coming soon)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl">
          This is where families will be able to manage check-in schedules, update contact
          information, and review recent activity for their loved ones.
        </p>
        <ul className="mt-5 list-disc list-inside text-sm text-slate-700">
          <li>View today&apos;s check-ins and statuses</li>
          <li>Edit senior details and contact info</li>
          <li>Adjust check-in times and frequency</li>
          <li>Review missed-check history</li>
        </ul>
        <p className="mt-5 text-xs text-slate-500">
          Authentication is not wired yet. When you&apos;re ready, we&apos;ll connect this
          page to your chosen auth provider and restrict access to logged-in users only.
        </p>
      </main>
      <Footer />
    </>
  );
}
