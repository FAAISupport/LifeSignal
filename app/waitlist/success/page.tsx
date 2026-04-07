import Link from "next/link";

type SuccessPageProps = {
  searchParams?: Promise<{
    code?: string;
    email?: string;
    rank?: string;
  }>;
};

export default async function WaitlistSuccessPage({ searchParams }: SuccessPageProps) {
  const params = (await searchParams) ?? {};
  const code = params.code ?? "";
  const email = params.email ?? "";
  const rank = params.rank ?? "";

  const shareUrl = code ? "/beta?ref=" + code : "/beta";
  const shareText = code
    ? "I just joined the LifeSignal waitlist. Use my link to join too: " + shareUrl
    : "I just joined the LifeSignal waitlist.";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-900 px-8 py-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              You are in
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome to the LifeSignal waitlist
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
              Your spot has been saved. Now you can move up the list by inviting other people who
              would benefit from simple daily safety check-ins and fast escalation when something
              feels wrong.
            </p>
          </div>

          <div className="px-8 py-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email
                </div>
                <div className="mt-3 break-all text-base font-semibold text-slate-900">
                  {email || "Saved successfully"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Referral Code
                </div>
                <div className="mt-3 break-all text-base font-semibold text-slate-900">
                  {code || "Pending"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Current Rank
                </div>
                <div className="mt-3 text-base font-semibold text-slate-900">
                  {rank || "We will calculate this shortly"}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">Why refer people?</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <p>
                  Every referral can help you move higher on the waitlist, which can improve your
                  chances of getting earlier access.
                </p>
                <p>
                  It also helps us grow the Guardian Network faster. The more families, caregivers,
                  neighbors, and community members who join, the stronger the safety net becomes.
                </p>
                <p>
                  LifeSignal is built for people who want a simple system that checks in, waits for
                  a response, and escalates when needed. Referring others helps us bring that to
                  more households sooner.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Suggested share message
              </div>
              <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-800">
                {shareText}
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Share your referral link with friends, family, caregivers, church groups, and local
                community members who care about safety and daily check-ins.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={shareUrl}
                className="inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Share your referral link
              </Link>

              <Link
                href="/waitlist/dashboard"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                View live waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



