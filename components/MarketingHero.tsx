import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function MarketingHero() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          A simple daily check-in that keeps families calm.
        </h1>
        <p className="mt-4 text-neutral-700">
          LifeSignal checks in by text or call. If there’s no response, it alerts
          family contacts. Everything is logged.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/signup">
            <Button>Start</Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="ghost">See how it works</Button>
          </Link>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          Reply STOP to opt out at any time. Consent stored for audit.
        </p>
      </div>
      <Card>
        <div className="text-sm font-medium">What you get</div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li>• Daily check-in by SMS or voice</li>
          <li>• Family notifications on misses</li>
          <li>• “Help” escalation</li>
          <li>• Full activity timeline</li>
          <li>• Subscription billing</li>
        </ul>
      </Card>
    </div>
  );
}
