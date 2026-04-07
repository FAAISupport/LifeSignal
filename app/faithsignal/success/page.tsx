import Link from "next/link";

type SuccessPageProps = {
  searchParams?: Promise<{
    session_id?: string;
    org?: string;
  }>;
};

export default async function FaithSignalSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const sessionId = resolvedSearchParams?.session_id?.trim() || "";
  const organizationId = resolvedSearchParams?.org?.trim() || "";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white px-4 py-1 text-sm font-medium text-emerald-700">
              FaithSignal Activated
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Your church is on the way to a stronger care system
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Your checkout was successful. FaithSignal is now ready for the next
              step: getting your church configured so your leaders can begin using
              the system with confidence.
            </p>

            {sessionId ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
                <span className="font-semibold text-slate-900">Stripe session:</span>{" "}
                {sessionId}
              </div>
            ) : null}

            {organizationId ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
                <span className="font-semibold text-slate-900">Organization ID:</span>{" "}
                {organizationId}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">What happens next</h2>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                    Step 1
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">Complete onboarding</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Enter your church details, define your care priorities, and
                    identify the members or households you want to support first.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                    Step 2
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">Assign leaders and volunteers</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Decide who should receive alerts, who manages care workflows,
                    and who handles follow-up tasks when someone needs help.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                    Step 3
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">Launch your first care workflows</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Start with a focused rollout like daily member check-ins,
                    pastoral care rounds, or prayer request triage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Next Action
              </div>

              <h2 className="mt-2 text-2xl font-bold">Finish setting up your church</h2>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Move directly into onboarding so your church can start using
                FaithSignal with a clear structure from day one.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href="/faithsignal/onboarding"
                  className="block rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Continue to onboarding
                </Link>

                <Link
                  href={organizationId ? `/faithsignal/dashboard?org=${encodeURIComponent(organizationId)}` : "/faithsignal/dashboard"}
                  className="block rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Go to FaithSignal dashboard
                </Link>

                <Link
                  href="/faithsignal"
                  className="block rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Back to FaithSignal
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}



