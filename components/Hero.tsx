// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="brand-gradient border-b border-slate-200/60"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #e0f2fe 0%, #ffffff 40%, #f1f5f9 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-700 uppercase">
            For seniors living alone
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Daily “I&apos;m okay” check-ins
            <br />
            <span className="text-sky-600">
              so families can breathe easier.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            LifeSignal calls or texts your loved one every day at scheduled times.
            If they don&apos;t respond, we automatically alert family or friends.
            No devices, apps, or in-home hardware needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pricing#start"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm px-5 py-3 rounded-xl shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
            >
              Start 14-day free trial
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-sm px-5 py-3 rounded-xl border border-slate-200"
            >
              See how LifeSignal works
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            No equipment • Cancel anytime • Designed for seniors in communities like
            The Villages, FL
          </p>
        </div>
        <div className="lg:pl-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] space-y-4">
            <h2 className="text-base font-semibold text-slate-900">At a glance</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Check-ins
                </dt>
                <dd className="font-semibold">1–4 times per day</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Contacts
                </dt>
                <dd className="font-semibold">Up to 5 family members</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Phones
                </dt>
                <dd className="font-semibold">Works with any phone</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Monthly plans
                </dt>
                <dd className="font-semibold">From $39/mo</dd>
              </div>
            </dl>
            <p className="text-xs text-slate-500">
              LifeSignal is not a medical alert or 911 service. It&apos;s a proactive daily
              reassurance service that complements your existing safety devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
