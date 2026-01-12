"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { supabaseBrowser } from "@/lib/supabase/client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

type Mode = "signin" | "signup";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextUrl = useMemo(() => {
    const n = searchParams.get("next");
    if (!n) return "/dashboard";
    if (n.startsWith("/") && !n.startsWith("//")) return n;
    return "/dashboard";
  }, [searchParams]);

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setMessage("Please enter your email.");
      return;
    }
    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    const supabase = supabaseBrowser();

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        router.push(nextUrl);
        router.refresh();
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      // If email confirmation is enabled, user may not be logged in yet, but this is still OK.
      router.push("/dashboard");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Card>
        <h1 className="text-2xl font-semibold text-brand-navy">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Use your email and password to sign in.
        </p>

        {/* Mode Toggle */}
        <div className="mt-6 inline-flex w-full rounded-xl border border-neutral-200 bg-neutral-50 p-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            disabled={isSubmitting}
            className={[
              "w-1/2 rounded-lg px-3 py-2 text-sm font-medium transition",
              mode === "signin"
                ? "bg-white shadow-sm text-neutral-900"
                : "text-neutral-600 hover:text-neutral-900",
            ].join(" ")}
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            disabled={isSubmitting}
            className={[
              "w-1/2 rounded-lg px-3 py-2 text-sm font-medium transition",
              mode === "signup"
                ? "bg-white shadow-sm text-neutral-900"
                : "text-neutral-600 hover:text-neutral-900",
            ].join(" ")}
          >
            Create account
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder="••••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <div className="mt-1 text-xs text-neutral-500">Minimum 6 characters</div>
          </div>

          {/* ✅ The missing visible submit button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "signin"
                ? "Signing in…"
                : "Creating account…"
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </Button>

          {message ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {message}
            </div>
          ) : null}
        </form>

        <div className="mt-6 text-xs text-neutral-500">
          LifeSignal is not an emergency service. For emergencies, call local emergency services.
        </div>
      </Card>
    </div>
  );
}
