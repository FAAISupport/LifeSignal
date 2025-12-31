import { Card } from "@/components/ui/Card";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">How it works</h1>
      <Card>
        <ol className="space-y-2 text-sm text-neutral-700">
          <li>
            <b>1.</b> Add a senior profile, schedule, and family contacts.
          </li>
          <li>
            <b>2.</b> LifeSignal sends a daily text or call.
          </li>
          <li>
            <b>3.</b> A reply confirms “OK”. No reply triggers a family alert.
          </li>
        </ol>
      </Card>
    </div>
  );
}
