import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { AuthShell } from "@/components/AuthShell";
import SignupClient from "./SignupClient";

export type SignupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "sent"; email: string };

export async function signupAction(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  "use server";

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    return {
      status: "error",
      message: "Server misconfiguration: NEXT_PUBLIC_APP_URL is not set.",
    };
  }

  const sb = await supabaseServer();

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appUrl}/auth/confirm?next=/login?verified=1`,
    },
  });

  if (error) return { status: "error", message: error.message };

  if (data.user) {
    await sb.from("profiles").upsert({ user_id: data.user.id, name, role: "user" });
  }

  // IMPORTANT: do NOT redirect — user must confirm email first
  return { status: "sent", email };
}

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
