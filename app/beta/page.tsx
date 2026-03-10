"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string }
  | { status: "loading"; message: string };

export default function BetaPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("family");
  const [useCase, setUseCase] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const fullName = useMemo(
    () => [firstName.trim(), lastName.trim()].filter(Boolean).join(" "),
    [firstName, lastName]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!consent) {
      setSubmitState({
        status: "error",
        message: "Please agree to receive beta updates before joining.",
      });
      return;
    }

    setSubmitState({
      status: "loading",
      message: "Submitting your beta request...",
    });

    try {
      const res = await fetch("/api/waitlist/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          fullName,
          email,
          phone,
          interest,
          useCase,
          referralCode,
          consent,
          source: "beta-page",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || "Something went wrong while submitting your request."
        );
      }

      setSubmitState({
        status: "success",
        message:
          data?.message ||
          "You are on the list. Watch your inbox for beta updates.",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setInterest("family");
      setUseCase("");
      setReferralCode("");
      setConsent(false);
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit the form right now.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(167,139,250,0.14),_transparent_26%),linear-gradient(to_bottom,_#f8fbff,_#ffffff)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">
                Early Access • Founding Beta
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Join the LifeSignal Beta and help shape a safer way to check on
                the people we love.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                LifeSignal is built for families, caregivers, seniors living
                alone, and post-op recovery support. Get early access, help shape
                the product, and secure priority status before public launch.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Early access
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Get priority entry into the first wave of active beta users.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Direct input
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Help influence features, workflows, and recovery monitoring.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Priority updates
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Be first to hear about launch milestones and rollout access.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                  Why people are joining
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">
                      Family reassurance
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Daily check-ins that help families know when a loved one is
                      okay without constant calling.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">
                      Recovery monitoring
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      A simple post-op support layer for patients who need extra
                      attention after going home.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] md:p-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                    Reserve your spot
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Join the beta waitlist
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Fill this out to request early access and beta updates.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-500"
                        placeholder="Judd"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                        placeholder="Spence"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                      placeholder="judd.spence@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                      placeholder="(352) 555-1234"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="interest"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        I am interested as a
                      </label>
                      <select
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                      >
                        <option value="family">Family member</option>
                        <option value="caregiver">Caregiver</option>
                        <option value="senior">Independent senior</option>
                        <option value="recovery">Post-op recovery user</option>
                        <option value="facility">Facility or provider</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="referralCode"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Referral code
                      </label>
                      <input
                        id="referralCode"
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="useCase"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Tell us how you would use LifeSignal
                    </label>
                    <textarea
                      id="useCase"
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                      placeholder="Example: I want daily check-ins for my mom who lives alone in Florida."
                    />
                  </div>

                  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                    />
                    <span className="text-sm leading-6 text-slate-600">
                      I agree to receive beta-related email and product updates
                      from LifeSignal.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitState.status === "loading"}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitState.status === "loading"
                      ? "Submitting..."
                      : "Join the Beta"}
                  </button>

                  <div
                    className={
                      submitState.status === "success"
                        ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                        : submitState.status === "error"
                        ? "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                        : submitState.status === "loading"
                        ? "rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700"
                        : "hidden"
                    }
                  >
                    {submitState.message}
                  </div>

                  <p className="text-xs leading-5 text-slate-500">
                    By joining, you are requesting early access to the LifeSignal
                    beta program. Access may be rolled out in stages.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
              How beta access works
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              A simple path into early access
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-lg font-bold text-sky-700">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Join the waitlist
              </h3>
              <p className="mt-3 text-slate-600">
                Submit your information and tell us how you plan to use
                LifeSignal.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-lg font-bold text-sky-700">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Get priority updates
              </h3>
              <p className="mt-3 text-slate-600">
                We will share rollout updates, access notifications, and product
                improvements with early members first.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-lg font-bold text-sky-700">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Start using the beta
              </h3>
              <p className="mt-3 text-slate-600">
                Accepted users receive onboarding details and first access to the
                LifeSignal beta experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                Built for families
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                “I need a simple way to know my loved one is okay without making
                five phone calls a day.”
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                Built for recovery
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                “After surgery, even one simple daily check-in would give our
                family a lot more peace of mind.”
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                Built for reassurance
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                “The best products feel easy. LifeSignal should feel like
                reassurance, not extra work.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Beta questions people are likely to ask
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Is the beta free?
              </h3>
              <p className="mt-2 text-slate-600">
                Early beta access is intended for testing, feedback, and rollout
                validation.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Do I need an app?
              </h3>
              <p className="mt-2 text-slate-600">
                LifeSignal is designed around simple check-ins and low-friction
                access, especially for real-world use cases.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Can I join for a parent or loved one?
              </h3>
              <p className="mt-2 text-slate-600">
                Yes. Many people join because they want a simple safety and
                reassurance layer for someone they care about.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Will referral codes matter?
              </h3>
              <p className="mt-2 text-slate-600">
                Referral codes can help track interest sources and support
                priority waitlist workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
