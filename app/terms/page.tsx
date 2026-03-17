import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | LifeSignal",
  description:
    "Review the LifeSignal terms of use, including service scope, acceptable use, limitations, and important disclaimers."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#03112a,#020817)]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Terms of Use
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              LifeSignal Terms of Use
            </h1>
            <p className="mt-6 text-lg leading-9 text-slate-300">
              Effective date: March 14, 2026
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-20">
          <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-lg leading-9 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white">1. Purpose of the service</h2>
              <p className="mt-3">
                LifeSignal is intended to provide structured daily check-ins,
                basic status visibility, and trusted-contact notification
                workflows. The platform is designed to support routine awareness
                and communication.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">2. Not emergency or medical care</h2>
              <p className="mt-3">
                LifeSignal is not a medical device, emergency dispatch service,
                or substitute for professional medical, legal, or emergency
                assistance. Users should not rely on LifeSignal as their sole
                means of emergency response.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">3. User responsibilities</h2>
              <p className="mt-3">
                Users are responsible for providing accurate contact
                information, maintaining up-to-date escalation contacts, and
                using the service in a lawful and appropriate way.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4. Availability and interruptions</h2>
              <p className="mt-3">
                While LifeSignal aims to provide reliable service, availability
                may be affected by carrier delivery issues, internet outages,
                third-party service disruptions, maintenance, or other technical
                problems outside direct control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5. Acceptable use</h2>
              <p className="mt-3">
                Users may not use the platform for unlawful activity, abusive
                messaging, harassment, fraud, or any purpose that violates the
                rights or safety of others.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">6. Limitation of liability</h2>
              <p className="mt-3">
                To the fullest extent permitted by law, LifeSignal and its
                operators are not liable for indirect, incidental, special, or
                consequential damages arising from use of or inability to use
                the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">7. Changes</h2>
              <p className="mt-3">
                These terms may be updated from time to time. Continued use of
                the service after updates are posted constitutes acceptance of
                the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">8. Contact</h2>
              <p className="mt-3">
                Questions regarding these terms may be directed to{" "}
                <a
                  href="mailto:support@lifesignal.app"
                  className="text-sky-300 transition hover:text-sky-200"
                >
                  support@lifesignal.app
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

