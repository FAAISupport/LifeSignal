import Link from "next/link";
import { headers } from "next/headers";

type SuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getOriginFromHeaders(host: string | null, proto: string | null) {
  if (!host) {
    return "http://localhost:3000";
  }

  const protocol = proto || (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export default async function BetaSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto");
  const origin = getOriginFromHeaders(host, proto);

  const codeParam = params.code;
  const code = typeof codeParam === "string" ? codeParam : "";
  const referralLink = code ? `${origin}/beta?ref=${encodeURIComponent(code)}` : "";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-950/40 backdrop-blur sm:p-10 lg:p-12">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-lg font-medium text-emerald-200">
              You’re on the list
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your LifeSignal beta signup is confirmed.
            </h1>

            <p className="mt-6 text-lg leading-9 text-slate-300">
              Now use your personal referral link to invite family members,
              caregivers, neighbors, and community contacts. Every real signup
              through your link helps push you higher in the waitlist.
            </p>

            {code ? (
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-lg text-slate-400">Your referral code</p>
                  <p className="mt-2 break-all text-2xl font-bold text-white">
                    {code}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-5">
                  <p className="text-lg text-sky-200">Your referral link</p>
                  <p className="mt-2 break-all text-base font-medium text-white">
                    {referralLink}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 text-amber-200">
                Your signup was recorded, but no referral code was found in the
                redirect. You can still go back and join again if needed.
              </div>
            )}

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-lg text-slate-400">Best people to invite</p>
                <p className="mt-2 text-base font-semibold text-white">
                  Siblings, caregivers, neighbors
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-lg text-slate-400">Best communities</p>
                <p className="mt-2 text-base font-semibold text-white">
                  Churches, HOAs, senior groups
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-lg text-slate-400">Goal</p>
                <p className="mt-2 text-base font-semibold text-white">
                  Move up the line before launch
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/beta"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                Back to beta page
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

