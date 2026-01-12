import Link from "next/link";
import Script from "next/script";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact | LifeSignal",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { sent?: string; error?: string };
}) {
  const sent = searchParams?.sent === "1";
  const error = searchParams?.error;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      {/* reCAPTCHA v2 script (only loads if key is configured at build time) */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      ) : null}

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

        {sent ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            ✅ Message sent. We’ll get back to you as soon as possible.
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </div>
        ) : null}

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

          {/* reCAPTCHA v2 checkbox (optional) */}
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <div className="pt-2">
              <div
                className="g-recaptcha"
                data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              />
              <p className="mt-2 text-xs text-neutral-500">
                This helps prevent spam. If you don’t see the checkbox, refresh the page.
              </p>
            </div>
          ) : null}

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
