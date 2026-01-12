import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact | LifeSignal",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <Card>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-brand-navy">Contact Us</h1>
          <Link href="/" className="text-sm text-neutral-600 hover:underline">
            ← Back to home
          </Link>
        </div>

        <p className="mt-2 text-sm text-neutral-600">
          Have a question about LifeSignal, pricing, or support? Send us a message and we’ll get back
          to you.
        </p>

        <form action="/api/contact" method="POST" className="mt-6 grid gap-4">
          <div>
            <Label>Name</Label>
            <Input name="name" placeholder="Your name" required />
          </div>

          <div>
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div>
            <Label>Phone (optional)</Label>
            <Input name="phone" placeholder="(optional)" />
          </div>

          <div>
            <Label>Message</Label>
            <textarea
              name="message"
              required
              rows={6}
              className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
              placeholder="Tell us what you need help with…"
            />
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
            If this is an emergency, call local emergency services. LifeSignal is not an emergency
            response service.
          </div>

          <Button type="submit" className="w-full">
            Send message
          </Button>

          <p className="text-xs text-neutral-500">
            By submitting, you agree we can respond to you by email or phone.
          </p>
        </form>
      </Card>
    </div>
  );
}
