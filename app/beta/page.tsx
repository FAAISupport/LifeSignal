import Link from "next/link";
import SitePageShell from "@/components/site/site-page-shell";
import WaitlistStats from "./_components/waitlist-stats";

const perks = [
  "Join the early-access waitlist",
  "Unlock priority through referrals",
  "Get product updates as LifeSignal rolls out",
  "Help shape features for families, caregivers, and communities",
];

const viralSteps = [
  {
    step: "01",
    title: "Join the waitlist",
    description:
      "Reserve your place by submitting your name, email, and who you plan to use LifeSignal for.",
  },
  {
    step: "02",
    title: "Get your referral link",
    description:
      "After joining, you receive a personal invite link you can share with friends, family members, caregivers, and community contacts.",
  },
  {
    step: "03",
    title: "Move up the line",
    description:
      "When someone joins through your link, your position improves. The more qualified referrals you bring in, the faster you rise.",
  },
];

const audiences = [
  "Families supporting aging parents",
  "Adults living alone who want an extra layer of reassurance",
  "Neighbors and guardian circles",
  "Caregivers and care teams",
  "Recovery and accountability support networks",
  "Senior communities and local organizations",
];

const examples = [
  {
    title: "Invite a sibling",
    description:
      "If both of you are helping a parent, you both get visibility and you move up together through shared interest.",
  },
  {
    title: "Invite neighbors",
    description:
      "Trusted nearby contacts become part of the future guardian network and help validate local demand.",
  },
  {
    title: "Invite a community",
    description:
      "HOAs, church groups, senior communities, and care teams can join early and signal broader adoption potential.",
  },
];

type BetaPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BetaPage({ searchParams }: BetaPageProps) {
  const params = await searchParams;

  const referralCodeParam = params.ref;
  const referralCode =
    typeof referralCodeParam === "string" ? referralCodeParam : "";

  const errorParam = params.error;
  const error = typeof errorParam === "string" ? errorParam : "";

  const joinedParam = params.joined;
  const joined = typeof joinedParam === "string" ? joinedParam === "1" : false;

  const existingParam = params.existing;
  const existing =
    typeof existingParam === "string" ? existingParam === "1" : false;

  const yourRefParam = params.your_ref;
  const yourRef = typeof yourRefParam === "string" ? yourRefParam : "";

  const shareLink = yourRef
    ? `https://lifesignal.app/beta?ref=${encodeURIComponent(yourRef)}`
    : "";

  return (
    <SitePageShell>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.20),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(167,139,250,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Beta access
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Join the LifeSignal waitlist and rise faster by inviting others.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
                LifeSignal is rolling out to early families, caregivers, and
                communities first. Join the beta waitlist now, then unlock
                priority placement through a built-in referral system designed
                to reward real interest and real network growth.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {perks.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#join-waitlist"
                  className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
                >
                  Join the waitlist
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <div>
              <WaitlistStats />
            </div>
          </div>
        </div>
      </section>

      <section id="join-waitlist" className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Join now
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get on the list before public launch.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-9 text-slate-300">
                Join the beta waitlist now. After signup, your referral link can
                help you move ahead as more people join through your invite.
              </p>

              {referralCode ? (
                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-lg text-emerald-200">
                  You are joining with referral code{" "}
                  <span className="font-semibold">{referralCode}</span>.
                </div>
              ) : null}

              {joined ? (
                <div className="mt-6 space-y-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-200">
                  <p className="text-lg font-semibold">
                    {existing
                      ? "You are already on the waitlist."
                      : "You're in — welcome to the LifeSignal beta waitlist."}
                  </p>

                  {yourRef ? (
                    <>
                      <div>
                        <p className="text-sm uppercase tracking-wide text-emerald-300">
                          Your referral code
                        </p>
                        <p className="mt-1 text-xl font-bold text-white">{yourRef}</p>
                      </div>

                      <div>
                        <p className="text-sm uppercase tracking-wide text-emerald-300">
                          Your referral link
                        </p>
                        <p className="mt-1 break-all text-white">{shareLink}</p>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}

              {error ? (
                <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-lg text-rose-200">
                  Something went wrong while joining the waitlist. Please try
                  again.
                </div>
              ) : null}

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg text-slate-400">Best fit for</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Families, caregivers, communities, and support networks
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg text-slate-400">Launch advantage</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Early access plus priority influenced by referrals
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <form
                action="/api/waitlist/join"
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="consentSource" value="beta_form" />
                <input type="hidden" name="consentStatus" value="opted_in" />
                <input type="hidden" name="consentChannel" value="both" />
                <input type="hidden" name="consentVersion" value="v1" />
                <input type="hidden" name="consentFormPath" value="/beta" />

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-lg font-medium text-slate-200"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Judd Spence"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-lg font-medium text-slate-200"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="judd.spence@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-lg font-medium text-slate-200"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(352) 555-0123"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/50"
                  />
                  <p className="mt-2 text-sm text-slate-400">
                    Required for SMS and voice beta enrollment.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="useCase"
                    className="mb-2 block text-lg font-medium text-slate-200"
                  >
                    Who are you most interested in using LifeSignal for?
                  </label>
                  <select
                    id="useCase"
                    name="useCase"
                    defaultValue=""
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-sky-400/50"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="myself">Myself</option>
                    <option value="parent">A parent or loved one</option>
                    <option value="family">My family or guardian circle</option>
                    <option value="caregiving">A caregiving use case</option>
                    <option value="community">A community or organization</option>
                    <option value="recovery">
                      Recovery or accountability support
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="referralCode"
                    className="mb-2 block text-lg font-medium text-slate-200"
                  >
                    Referral code or invite link
                  </label>
                  <input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    defaultValue={referralCode}
                    placeholder="Optional"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-lg font-medium text-slate-200"
                  >
                    What made you interested?
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Tell us a little about your situation or why LifeSignal matters to you."
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/50"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <label
                    htmlFor="messagingConsent"
                    className="flex cursor-pointer items-start gap-3"
                  >
                    <input
                      id="messagingConsent"
                      name="messagingConsent"
                      type="checkbox"
                      value="yes"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                    />
                    <span className="text-sm leading-6 text-slate-300">
                      I agree to receive transactional SMS and/or voice safety
                      check-ins, reminders, and caregiver notifications from
                      LifeSignal. Message frequency varies. Msg &amp; data rates
                      may apply. Reply STOP to opt out and HELP for help. View
                      our{" "}
                      <Link
                        href="/consent"
                        className="font-medium text-sky-300 underline"
                      >
                        Consent Policy
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-sky-300 underline"
                      >
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-sky-300 underline"
                      >
                        Terms
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
                >
                  Join the waitlist
                </button>

                <p className="text-lg leading-6 text-slate-400">
                  After joining, you can receive a personal referral link to
                  share and improve your waitlist position as others sign up
                  through you.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Viral waitlist engine
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              This is not just a signup form. It is a growth loop.
            </h2>
            <p className="mt-4 text-lg leading-9 text-slate-300">
              LifeSignal works best in connected networks, so the beta waitlist
              is designed to reward people who bring in other real users and
              communities that care about safety monitoring.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {viralSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-bold text-sky-300">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Who should join early
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Best for people and groups who already care for others.
              </h2>
              <ul className="mt-6 grid gap-3 text-slate-300">
                {audiences.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Referral ideas
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Natural ways people will share LifeSignal.
              </h2>
              <div className="mt-6 space-y-4">
                {examples.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg leading-9 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-[36px] border border-sky-400/20 bg-gradient-to-br from-sky-500/15 via-slate-900 to-violet-500/10 p-8 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Start now
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get your spot, then grow your priority.
              </h2>
              <p className="mt-4 text-lg leading-9 text-slate-300">
                Join the LifeSignal beta waitlist today, then use your referral
                link to invite the people who would benefit most from a smarter
                daily safety system.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#join-waitlist"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                Join the waitlist
              </a>
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
    </SitePageShell>
  );
}

