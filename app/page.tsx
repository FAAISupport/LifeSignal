// app/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* How it works (summary) */}
        <section id="how" className="pt-12 sm:pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How LifeSignal works
          </h2>
          <p className="mt-2 text-slate-700 max-w-2xl text-sm sm:text-base">
            Setup takes just a few minutes. After that, LifeSignal quietly runs in the
            background, checking in on your loved one every day.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3 text-sm sm:text-base">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">
                Choose schedule & contacts
              </h3>
              <p className="mt-2 text-slate-700">
                Pick daily check-in times and the people we should notify if we can&apos;t
                reach your loved one.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">
                Daily “I&apos;m okay” check-in
              </h3>
              <p className="mt-2 text-slate-700">
                At the scheduled time, LifeSignal calls or texts. The senior simply responds
                to confirm they&apos;re okay.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">
                Smart follow-ups & alerts
              </h3>
              <p className="mt-2 text-slate-700">
                If there&apos;s no response, LifeSignal tries again and then alerts family so
                they can call, visit, or request a welfare check.
              </p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Built for seniors and the families who love them
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3 text-sm sm:text-base">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-900">Seniors living alone</h3>
              <p className="mt-2 text-slate-700">
                Especially in communities like The Villages, where independence is
                everything but family doesn&apos;t live down the street.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-900">
                Adult children out of state
              </h3>
              <p className="mt-2 text-slate-700">
                You don&apos;t want to nag or call 3 times a day, but you still want to know
                if something might be wrong.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-900">Caregivers & neighbors</h3>
              <p className="mt-2 text-slate-700">
                Share responsibility by adding multiple contacts. Everyone sees the same
                signals and can act quickly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ summary */}
        <section id="faq" className="pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">
                Is LifeSignal a medical alert service?
              </h3>
              <p className="mt-2">
                No. LifeSignal doesn&apos;t replace 911, medical alert pendants, or emergency
                services. We provide proactive daily check-ins and notify family if something
                looks wrong.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Does this work with landlines?
              </h3>
              <p className="mt-2">
                Yes. LifeSignal works with any phone that can receive calls. For text-based
                check-ins, a mobile phone is required, but the service itself is fully usable
                with landlines.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
