// app/how-it-works/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-16 pt-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          How LifeSignal works
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl">
          Under the hood, LifeSignal is a simple idea: a daily “I&apos;m okay” signal that
          reassures families without disrupting a senior&apos;s independence.
        </p>

        <section className="mt-10 grid lg:grid-cols-2 gap-10 text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              1. Set up a routine that fits their life
            </h2>
            <p className="text-slate-700">
              You choose one or more check-in times—morning, afternoon, evening. You tell
              us how they prefer to be contacted (call or text) and who should be alerted if
              we can&apos;t reach them.
            </p>
            <ul className="list-disc list-inside text-slate-700">
              <li>Pick 1–4 check-in windows per day</li>
              <li>Add up to 5 family or friend contacts</li>
              <li>Adjust times anytime as routines change</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              2. Daily &ldquo;I&apos;m okay&rdquo; check-ins
            </h2>
            <p className="text-slate-700">
              At the scheduled times, LifeSignal reaches out. For calls, they press a
              button to confirm. For texts, they reply YES. That&apos;s it—no apps, no
              passwords.
            </p>
            <p className="text-slate-700">
              Behind the scenes, our system records each response and keeps a gentle
              history of good days, missed check-ins, and patterns you can review with
              your family or care team.
            </p>
          </div>
        </section>

        <section className="mt-12 grid lg:grid-cols-2 gap-10 text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              3. What happens if they don&apos;t respond?
            </h2>
            <p className="text-slate-700">
              LifeSignal doesn&apos;t panic on the first missed call. We try again within a
              short window. If there&apos;s still no answer, we follow your instructions:
            </p>
            <ul className="list-disc list-inside text-slate-700">
              <li>Alert primary contact by text and email</li>
              <li>Optionally notify additional contacts</li>
              <li>Mark this as a &ldquo;missed check-in&rdquo; for your history</li>
            </ul>
            <p className="text-slate-700">
              You decide what happens next—call, visit, or involve local services if you
              believe there&apos;s an emergency.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              4. Designed for places like The Villages
            </h2>
            <p className="text-slate-700">
              Communities like The Villages are full of independent, active seniors whose
              families don&apos;t always live nearby. LifeSignal is built for exactly that
              situation: high independence, high activity, and the need for just a bit more
              reassurance.
            </p>
            <p className="text-slate-700">
              It&apos;s also flexible enough to support nearby towns and rural areas where
              neighbors help each other keep an eye on loved ones.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Respect first, technology second</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-3xl">
            LifeSignal is intentionally simple. No cameras, no microphones, no tracking.
            Seniors keep their privacy and autonomy; families get a reliable way to know
            when something might be wrong, without constant phone calls or nagging.
          </p>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
