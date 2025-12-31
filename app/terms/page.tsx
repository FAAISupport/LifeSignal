export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold text-brand-navy">Terms</h1>
      <p className="text-neutral-700">
        LifeSignal provides wellness check-ins via text and/or phone call. It is not an emergency service.
      </p>
      <div className="space-y-3 text-sm text-neutral-700">
        <p><span className="font-semibold text-brand-navy">Not emergency:</span> If you believe someone is in immediate danger, contact local emergency services.</p>
        <p><span className="font-semibold text-brand-navy">Your responsibility:</span> You are responsible for configuring accurate contact information and check-in preferences.</p>
        <p><span className="font-semibold text-brand-navy">Messaging consent:</span> You agree to receive automated messages/calls for check-ins and alerts. You can opt out by texting STOP.</p>
      </div>
      <p className="text-xs text-neutral-500">
        This page is informational and not legal advice. Update it with your counsel before broad launch.
      </p>
    </div>
  );
}
