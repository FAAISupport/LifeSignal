import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { AuthShell } from "@/components/AuthShell";
import SignupClient from "./SignupClient";

export default function Page() {
  return (
    <AuthShell
      title="Create your LifeSignal account."
      subtitle="You’ll add the senior profile, check-in time, and family contacts next."
      footer={
        <p className="text-sm text-neutral-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-navy underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue/60"
          >
            Log in
          </Link>
        </p>
      }
    >
      <Card className="overflow-hidden">
        <div className="rounded-2xl border border-brand-blue/10 bg-brand-mist p-4">
          <div className="text-sm font-semibold text-brand-navy">Create account</div>
          <div className="mt-1 text-xs text-neutral-600">Takes less than a minute</div>
        </div>

        <SignupClient />
      </Card>
    </AuthShell>
  );
}
