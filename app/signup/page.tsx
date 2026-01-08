import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/AuthShell";

async function signupAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "");

  const sb = await supabaseServer();
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw new Error(error.message);

  if (data.user) {
    await sb.from("profiles").upsert({ user_id: data.user.id, name, role: "user" });
  }

  redirect("/dashboard");
}

export default function Page() {
  return (
    <AuthShell
      title="Create your LifeSignal account."
      subtitle="You’ll add the senior profile, check-in time, and family contacts next."
      footer={
        <p className="text-sm text-neutral-700">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-navy underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue/60">
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

        <form action={signupAction} className="mt-5 grid gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input name="name" required autoComplete="name" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" name="email" required autoComplete="email" />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input type="password" name="password" required minLength={8} autoComplete="new-password" />
            <div className="text-xs text-neutral-500">Minimum 8 characters.</div>
          </div>

          <Button type="submit" className="w-full">Continue</Button>

          <p className="text-xs text-neutral-500">
            By creating an account, you agree to receive service messages and acknowledge our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-brand-navy">terms</Link>.
          </p>
        </form>
      </Card>
    </AuthShell>
  );
}
