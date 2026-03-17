import Link from "next/link";
import SitePageShell from "@/components/site/site-page-shell";

export default function ContactSuccessPage() {
  return (
    <SitePageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-950/40 backdrop-blur sm:p-10 lg:p-12">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-lg font-medium text-emerald-200">
              Message received
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your message was sent successfully.
            </h1>

            <p className="mt-6 text-lg leading-9 text-slate-300">
              Thanks for reaching out about LifeSignal. Your submission has been
              captured and is ready for follow-up.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-lg text-slate-400">Captured in Supabase</p>
                <p className="mt-2 text-base font-semibold text-white">
                  Ready for review
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-lg text-slate-400">Best next step</p>
                <p className="mt-2 text-base font-semibold text-white">
                  Join the beta waitlist too
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-lg text-slate-400">Use case</p>
                <p className="mt-2 text-base font-semibold text-white">
                  Family, caregiver, or community
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/beta"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                Join the beta
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                Back to contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePageShell>
  );
}

