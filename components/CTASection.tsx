// components/CTASection.tsx
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="pt-16">
      <div className="bg-sky-600 rounded-2xl p-6 sm:p-8 text-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.3)] grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to try LifeSignal?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-sky-100">
            Start with a 14-day free trial. Set up your loved one&apos;s check-in
            schedule in minutes and see how daily reassurance feels—for them and for you.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <Link
            href="/pricing#start"
            className="inline-flex w-full sm:w-auto justify-center items-center bg-white text-sky-700 font-medium px-5 py-3 rounded-xl hover:bg-slate-100"
          >
            Start free trial
          </Link>
          <p className="text-[0.7rem] text-sky-100">
            Trial flow and online signup will run through our secure LifeSignal account
            system. For early pilot access, contact support@lifesignal.com.
          </p>
        </div>
      </div>
    </section>
  );
}
