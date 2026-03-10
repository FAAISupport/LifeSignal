import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import WaitlistCounter from "@/components/WaitlistCounter"

const verticals = [
  {
    title: "Families",
    body: "Protect loved ones living independently with daily check-ins and guardian alerts.",
    href: "/families",
  },
  {
    title: "Caregivers",
    body: "Monitor multiple people from one dashboard with alerts, status tracking, and workflows.",
    href: "/caregivers",
  },
  {
    title: "Recover",
    body: "Support safer post-hospital recovery with check-ins, reminders, and escalation logic.",
    href: "/recovery",
  },
  {
    title: "Community",
    body: "Build trusted local circles of care with neighbors, volunteers, and community responders.",
    href: "/community",
  },
  {
    title: "Senior Living",
    body: "Add a digital safety layer for residents while preserving independence and dignity.",
    href: "/senior-living",
  },
  {
    title: "Healthcare",
    body: "Extend care beyond discharge with monitoring workflows designed for vulnerable recovery periods.",
    href: "/healthcare",
  },
]

const steps = [
  {
    title: "Daily check-in",
    body: "LifeSignal sends a simple message asking if everything is okay.",
    icon: "/icons/checkin.png",
  },
  {
    title: "Fast confirmation",
    body: "Your loved one confirms with a tap, text reply, or phone response.",
    icon: "/icons/guardian.png",
  },
  {
    title: "Escalation if needed",
    body: "If no response comes in, LifeSignal alerts family, caregivers, or trusted guardians.",
    icon: "/icons/alert.png",
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-900">
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-sky-50 via-white to-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
              <div className="inline-flex items-center rounded-full border border-sky-200 bg-white px-3 py-1 text-sm font-medium text-sky-700 shadow-sm">
                Human safety monitoring for independent living
              </div>

              <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
                Peace of mind for the people you love most.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                LifeSignal automatically checks in on loved ones living alone.{" "}
                <span className="font-semibold text-slate-900">
                  If they don’t respond, trusted contacts are alerted.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/beta"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700"
                >
                  Join the Beta
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  See How It Works
                </Link>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Built for families, caregivers, communities, and healthcare recovery teams.
              </p>

              <div className="mt-6">
                <WaitlistCounter />
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-sky-100/60">
                <Image
                  src="/family-dashboard.png"
                  alt="LifeSignal family monitoring dashboard"
                  width={1200}
                  height={900}
                  className="h-auto w-full rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 text-center md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            The emotional reality
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            The question families ask every day
          </h2>
          <div className="mt-8 space-y-3 text-lg text-slate-600">
            <p>Did mom wake up today?</p>
            <p>Is dad okay after surgery?</p>
            <p>Did grandma take her medication?</p>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
            Millions of people live alone. LifeSignal helps make sure silence never goes unnoticed.
          </p>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                A simple safety signal, every day
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <Image
                    src={step.icon}
                    alt=""
                    width={72}
                    height={72}
                    className="h-16 w-16"
                  />
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Vertical portals
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              One platform. Multiple care scenarios.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              LifeSignal supports families, caregivers, communities, and recovery teams through focused portals built on one shared monitoring system.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {verticals.map((vertical) => (
              <Link
                key={vertical.title}
                href={vertical.href}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-sky-700">
                  {vertical.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {vertical.body}
                </p>
                <div className="mt-6 text-sm font-semibold text-sky-700">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Why LifeSignal
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Built to be simple, human, and dependable
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                LifeSignal is designed to protect independence, not replace it. The experience stays easy for the person checking in while giving families and caregivers clarity when it matters most.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "No complicated hardware required",
                "Designed for seniors, families, and caregivers",
                "Escalation workflows when it matters most",
                "Recovery and caregiver use cases built in",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-sky-600">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center text-white md:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">
              Early access
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Join the LifeSignal beta waitlist
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-sky-50">
              We’re inviting early families, caregivers, and recovery-focused partners to help shape the future of safety monitoring.
            </p>

            <div className="mt-8">
              <Link
                href="/beta"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50"
              >
                Join Beta
              </Link>
            </div>

            <div className="mt-6 text-sm text-sky-100">
              Every life deserves a signal.
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
