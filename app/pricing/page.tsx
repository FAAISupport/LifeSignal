// app/pricing/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SubscribeForm from "@/components/SubscribeForm";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-16 pt-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Simple monthly pricing
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl">
          All plans include daily check-ins, configurable alerts, and friendly support.
          No contracts, setup fees, or equipment to buy.
        </p>

        {/* Plans */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Lite</h2>
            <p className="mt-1 text-sm text-slate-600">
              Once-daily check-in for low-risk seniors.
            </p>
            <div className="mt-4 text-3xl font-extrabold text-slate-900">
              $39<span className="text-base font-medium text-slate-500">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• 1 daily check-in</li>
              <li>• Up to 2 contacts</li>
              <li>• SMS or voice calls</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-sky-500 rounded-2xl p-6 shadow-sm relative">
            <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-semibold">
              Most popular
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Standard</h2>
            <p className="mt-1 text-sm text-slate-600">
              Morning & evening reassurance for everyday peace of mind.
            </p>
            <div className="mt-4 text-3xl font-extrabold text-slate-900">
              $69<span className="text-base font-medium text-slate-500">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• 2 daily check-ins</li>
              <li>• Up to 3 contacts</li>
              <li>• Reminder support for meds & appointments</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Plus</h2>
            <p className="mt-1 text-sm text-slate-600">
              For higher-risk seniors or families wanting extra assurance.
            </p>
            <div className="mt-4 text-3xl font-extrabold text-slate-900">
              $99<span className="text-base font-medium text-slate-500">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Up to 4 daily check-ins</li>
              <li>• Up to 5 contacts</li>
              <li>• Priority alert workflow</li>
            </ul>
          </div>
        </section>

        {/* Comparison section */}
        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How LifeSignal compares
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl">
            LifeSignal isn&apos;t a replacement for medical alert devices or in-home caregivers.
            It fills the gap between &ldquo;totally on their own&rdquo; and
            &ldquo;full-time care.&rdquo;
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200 bg-white rounded-2xl overflow-hidden">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="px-4 py-3 border-b border-slate-200">Option</th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Typical Monthly Cost
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    What it provides
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Great for…
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-900">LifeSignal</td>
                  <td className="px-4 py-3 text-slate-700">$39–$99</td>
                  <td className="px-4 py-3 text-slate-700">
                    Daily check-ins, missed-check alerts, reminder support, peace of mind.
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    Independent seniors who need light-touch reassurance.
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Medical alert pendant
                  </td>
                  <td className="px-4 py-3 text-slate-700">$30–$60</td>
                  <td className="px-4 py-3 text-slate-700">
                    Emergency button for falls, may call a monitoring center or 911.
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    Seniors at fall risk who are willing to wear a device.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    In-home caregiver
                  </td>
                  <td className="px-4 py-3 text-slate-700">$4,000–$6,000+</td>
                  <td className="px-4 py-3 text-slate-700">
                    Hands-on help with daily living, transportation, and care tasks.
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    Seniors who need daily assistance beyond simple check-ins.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Start / form */}
        <section id="start" className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Request early access
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl">
            During our launch phase, we&apos;re onboarding families in The Villages and
            surrounding areas. Share a few details and we&apos;ll follow up to complete your
            setup.
          </p>
          <SubscribeForm />
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
