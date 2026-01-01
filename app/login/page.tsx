import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/AuthShell";

function friendlyAuthError(message: string) {
  const m = (message || "").toLowerCase();

  if (m.includes("email not confirmed")) {
    return "Your email isn’t confirmed yet. Please check your inbox for the confirmation email, then try again.";
  }
  if (m.includes("invalid login credentials")) {
    return "That email/password combo didn’t work. Double-check and try again.";
  }
  if (m.includes("user not found")) {
    return "No account found with that email. Create an account first.";
  }
  return "Login failed. Please try again.";
}

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?error=" + encodeURIComponent("Please enter email and password."));
  }

  const sb = await supabaseServer();
  const { error } = await sb.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=" + encodeURIComponent(friendlyAuthError(error.message)));
  }

  redirect("/dashboard");
}

async function facebookAction() {
  "use server";

  const sb = await supabaseServer();

  const base = (process.env.APP_BASE_URL || "").replace(/\/+$/, "");
  const redirectTo = base ? `${base}/auth/callback` : undefined;

  const { data, error } = await sb.auth.signInWithOAuth({
    provider: "facebook",
    options: redirectTo ? { redirectTo } : {},
  });

  if (error) {
    redirect("/login?error=" + encodeURIComponent("Facebook login failed. Please try again."));
  }

  redirect(data.url);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const errorMsg = typeof searchParams?.error === "string" ? searchParams.error : "";

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
          <div className="text-sm font-semibold text-brand-navy">Log in</div>
          <div className="mt-1 text-xs text-neutral-600">Secure access to your dashboard</div>
        </div>

        {errorMsg ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {errorMsg}
            {errorMsg.toLowerCase().includes("confirmed") ? (
              <div className="mt-2 text-xs text-amber-900/80">
                Tip: Search your inbox for “Supabase” and check spam/junk folders.
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          <form action={facebookAction}>
            <Button type="submit" className="w-full" variant="outline">
              Continue with Facebook
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <div className="text-xs text-neutral-500">or</div>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <form action={loginAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" name="email" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input type="password" name="password" required autoComplete="current-password" />
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
        </div>
      </Card>
    </AuthShell>
  );
}
