export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Terms &amp; Conditions</h1>
        <p className="mt-4 leading-7 text-slate-700">
          By using LifeSignal, you agree to these terms for access to safety
          check-ins, reminders, caregiver notifications, and related platform features.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Service nature</h2>
          <p className="text-slate-700">
            LifeSignal is a monitoring and notification service. It is not emergency
            dispatch, medical advice, or a replacement for calling 911 or local emergency services.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Messaging consent</h2>
          <p className="text-slate-700">
            By opting in, you agree to receive transactional SMS and/or voice messages
            related to safety check-ins, reminders, caregiver alerts, and service operations.
            Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out
            and HELP for help.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">User responsibilities</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Provide accurate enrollment and contact information</li>
            <li>Keep caregiver and emergency contact details current</li>
            <li>Use the service lawfully and with proper authorization</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Availability</h2>
          <p className="text-slate-700">
            Delivery of text or voice communications may depend on carrier networks,
            connectivity, third-party providers, and device availability.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Limitation of liability</h2>
          <p className="text-slate-700">
            To the maximum extent allowed by law, LifeSignal is provided on an as-available
            basis without guarantees of uninterrupted delivery or emergency intervention.
          </p>
        </section>

        <p className="mt-12 text-sm text-slate-500">Last updated: March 24, 2026</p>
      </div>
    </main>
  );
}

