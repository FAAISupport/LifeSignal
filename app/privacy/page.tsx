export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 leading-7 text-slate-700">
          LifeSignal collects only the information reasonably necessary to deliver
          safety check-ins, reminders, caregiver notifications, and account support.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Name, phone number, and email address</li>
            <li>Check-in preferences and reminder schedules</li>
            <li>Consent records, timestamps, and support interactions</li>
            <li>Technical data such as IP address, device, and browser information</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How we use information</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Operate the LifeSignal service</li>
            <li>Send transactional safety and reminder messages</li>
            <li>Notify designated caregivers or responders when configured</li>
            <li>Maintain security, compliance, and audit records</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">SMS and voice privacy</h2>
          <p className="text-slate-700">
            Consent to receive SMS or voice communications is used only for
            transactional and operational purposes related to LifeSignal services.
            Message frequency varies. Msg &amp; data rates may apply.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Data sharing</h2>
          <p className="text-slate-700">
            We do not sell personal information. We may share information with service
            providers that support platform operations, communications delivery, hosting,
            analytics, fraud prevention, or legal compliance.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Your choices</h2>
          <p className="text-slate-700">
            You may opt out of SMS at any time by replying STOP. For assistance, reply
            HELP or contact us through our website.
          </p>
        </section>

        <p className="mt-12 text-sm text-slate-500">Last updated: March 24, 2026</p>
      </div>
    </main>
  );
}

