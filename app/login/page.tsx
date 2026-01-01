export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/AuthShell";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const next = String(formData.get("next") ?? "/dashboard");

  const sb = await supabaseServer();
  const { error } = await sb.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      "/login?error=" + encodeURIComponent(error.message)
    );
  }

  // IMPORTANT: honor ?next=
  redirect(next || "/dashboard");
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { next?: string; error?: string };
}) {
  const next =
    typeof searchParams?.next === "string"
      ? searchParams.next
      : "/dashboard";

  const errorMsg =
    typeof searchParams?.error === "string"
      ? searchParams.error
      : "";

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Log in to manage your loved ones, contacts, and check-in preferences."
      footer={
        <p className="text-sm text-neutral-700">
          New to LifeSignal?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand-navy underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue/60"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <Card className="overflow-hidden">
        <div className="rounded-2xl border border-brand-blue/10 bg-brand-mist p-4">
          <div className="text-sm font-semibold text-brand-navy">
            Log in
          </div>
          <div className="mt-1 text-xs text-neutral-600">
            Secure access to your dashboard
          </div>
        </div>

        {errorMsg ? (
          <div className="mx-4 mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
            {errorMsg}
          </div>
        ) : null}

        <form action={loginAction} className="mt-5 grid gap-4 px-4 pb-4">
          {/* Preserve intended destination */}
          <input type="hidden" name="next" value={next} />

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
            />
          </div>

          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full">
            Log in
          </Button>

          <div className="text-center text-xs text-neutral-500">
            Having trouble? Email{" "}
            <a
              className="underline underline-offset-4 hover:text-brand-navy"
              href="mailto:support@lifesignal.app"
            >
              support@lifesignal.app
            </a>
          </div>
        </form>
      </Card>
    </AuthShell>
  );
}
