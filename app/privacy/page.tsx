export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold text-brand-navy">Privacy</h1>
      <p className="text-neutral-700">
        LifeSignal collects only what we need to deliver daily check-ins and notify designated contacts if a check-in is missed.
      </p>
      <div className="space-y-3 text-sm text-neutral-700">
        <p><span className="font-semibold text-brand-navy">What we store:</span> account email, senior profile details, check-in preferences, contact phone numbers, and check-in activity logs.</p>
        <p><span className="font-semibold text-brand-navy">What we donâ€™t do:</span> sell personal information, run advertising profiles, or share phone numbers outside of your configured contacts and messaging providers.</p>
        <p><span className="font-semibold text-brand-navy">Messaging providers:</span> SMS and voice are delivered through Twilio. Payments are processed through Paddle.</p>
      </div>
      <p className="text-xs text-neutral-500">
        This page is informational and not legal advice. Update it with your counsel before broad launch.
      </p>
    </div>
  );
}

