import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LifeSignal",
  description:
    "Review the LifeSignal privacy policy, including what information is collected, how it is used, and how the platform approaches data minimization."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#03112a,#020817)]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Privacy Policy
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              LifeSignal Privacy Policy
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
              <h2 className="text-xl font-semibold text-white">1. Information we collect</h2>
              <p className="mt-3">
                LifeSignal may collect basic account and contact information,
                check-in response data, escalation contact details, and message
                delivery or status information necessary to operate the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">2. How information is used</h2>
              <p className="mt-3">
                Information is used to deliver check-ins, process responses,
                support alert routing, maintain system records, improve service
                reliability, and communicate with users about the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">3. Data minimization approach</h2>
              <p className="mt-3">
                LifeSignal is intentionally designed to avoid unnecessary
                collection of highly invasive monitoring data. The platform
                focuses on routine safety signals rather than constant
                surveillance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4. Sharing of information</h2>
              <p className="mt-3">
                Information may be shared with service providers or technology
                partners who help operate the platform, subject to appropriate
                safeguards. Information may also be shared when required by law
                or to protect safety, rights, or property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5. Security</h2>
              <p className="mt-3">
                Reasonable administrative, technical, and organizational
                measures are used to protect information. However, no system can
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">6. Retention</h2>
              <p className="mt-3">
                Information may be retained for as long as necessary to operate
                the service, meet legal obligations, resolve disputes, and
                maintain appropriate records.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">7. Policy updates</h2>
              <p className="mt-3">
                This privacy policy may be updated from time to time. Updates
                become effective when posted on this page unless otherwise
                stated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">8. Contact</h2>
              <p className="mt-3">
                Privacy questions may be directed to{" "}
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

