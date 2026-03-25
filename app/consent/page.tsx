export default function ConsentPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">LifeSignal Consent &amp; Opt-In Policy</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          LifeSignal provides transactional safety monitoring messages for seniors,
          caregivers, and individuals who want structured wellness check-ins.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How users opt in</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Submitting a LifeSignal form on our website</li>
            <li>Being enrolled by a caregiver, family member, or authorized organization</li>
            <li>Providing express consent during onboarding</li>
            <li>Replying START after previously opting out</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Message types</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Daily wellness and safety check-ins</li>
            <li>Medication and recovery reminders</li>
            <li>Missed check-in alerts to designated caregivers</li>
            <li>Operational account notifications related to the service</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Frequency</h2>
          <p className="text-slate-700">
            Message frequency varies based on the user's care plan, schedule,
            reminder settings, and escalation rules.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Opt-out instructions</h2>
          <p className="text-slate-700">
            Users may opt out of SMS messages at any time by replying STOP.
            Users may opt back in by replying START.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Help</h2>
          <p className="text-slate-700">
            For help, reply HELP to any LifeSignal message or visit{" "}
            <a className="font-medium underline" href="https://lifesignal.app">
              https://lifesignal.app
            </a>.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">No marketing or promotional messaging</h2>
          <p className="text-slate-700">
            LifeSignal messaging is strictly transactional and service-related.
            We do not use this channel for promotional campaigns.
          </p>
        </section>

        <p className="mt-12 text-sm text-slate-500">Last updated: March 24, 2026</p>
      </div>
    </main>
  );
}

