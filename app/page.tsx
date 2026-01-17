import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="pill">Daily safety check-ins • SMS or voice</div>
          <h1 className="headline">
            Peace of mind for families.
            <br />
            Calm check-ins for loved ones.
          </h1>
          <p className="subhead">
            LifeSignal checks in at the time you choose. If your loved one doesn’t respond, we notify the family contacts you set — and log every step for trust and clarity.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/signup">
              <Button>Start with Check-In</Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="secondary">See how it works</Button>
            </Link>
          </div>

          <div className="text-xs text-neutral-500">
            Not an emergency service. For emergencies, call local emergency services.
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[40px] bg-brand-blue/10 blur-2xl" />
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-brand-navy">Today’s Check-In</div>
              <div className="rounded-full bg-brand-lavender/25 px-3 py-1 text-xs font-medium text-brand-navy">
                Scheduled 9:00 AM
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-neutral-200 bg-brand-mist p-5">
              <div className="text-sm text-neutral-700">Message</div>
              <div className="mt-2 text-base font-medium text-brand-navy">
                Hi Mary — just checking in. Reply <span className="font-semibold">YES</span> if you’re okay.
              </div>
              <div className="mt-4 flex gap-2">
                <div className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-brand-navy shadow-soft">
                  YES
                </div>
                <div className="rounded-2xl bg-white px-3 py-2 text-sm text-neutral-600 shadow-soft">
                  Later
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-3xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">Status</div>
                <div className="mt-1 font-semibold text-brand-navy">Pending</div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">Contacts</div>
                <div className="mt-1 font-semibold text-brand-navy">3 notified</div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">Log</div>
                <div className="mt-1 font-semibold text-brand-navy">Audit ready</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-brand-navy md:text-3xl">How it works</h2>
          <p className="mt-2 text-sm text-neutral-700">
            Three steps. Calm, consistent, and easy for seniors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <div className="text-sm font-semibold text-brand-navy">1) Check-In</div>
            <p className="mt-2 text-sm text-neutral-700">
              A quick text or call at the time you choose.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold text-brand-navy">2) Confirm</div>
            <p className="mt-2 text-sm text-neutral-700">
              A simple “YES” or “Press 1” confirms they’re okay.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold text-brand-navy">3) Alert</div>
            <p className="mt-2 text-sm text-neutral-700">
              If there’s no response, family contacts are notified based on your settings.
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-brand-blue/15 bg-white/70 p-6">
          <div>
            <div className="text-sm font-semibold text-brand-navy">Ready to try LifeSignal?</div>
            <div className="mt-1 text-sm text-neutral-700">Start with Check-In, upgrade anytime.</div>
          </div>
          <Link href="/pricing">
            <Button>View pricing</Button>
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="text-sm font-semibold text-brand-navy">Consent-first messaging</div>
          <p className="mt-2 text-sm text-neutral-700">
            Clear TCPA-style consent language, opt-out handling, and a clean audit trail.
          </p>
        </Card>
        <Card>
          <div className="text-sm font-semibold text-brand-navy">Every step logged</div>
          <p className="mt-2 text-sm text-neutral-700">
            Check-ins, responses, and escalations are recorded for transparency and trust.
          </p>
        </Card>
        <Card>
          <div className="text-sm font-semibold text-brand-navy">Built for calm UX</div>
          <p className="mt-2 text-sm text-neutral-700">
            Senior-friendly wording, minimal steps, and simple “YES / Press 1” confirmations.
          </p>
        </Card>



      </section>
    </div>
  );
}
