"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Mode = "signin" | "signup";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode = (searchParams.get("mode") as Mode) || "signin";

  const [mode, setMode] = React.useState<Mode>(initialMode);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMode(initialMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function setModeAndUrl(next: Mode) {
    setMode(next);
    setNotice(null);
    setError(null);

    // Keep URL in sync without hard refresh
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    window.history.replaceState({}, "", url.toString());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      if (!email.trim()) {
        setError("Please enter an email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message || "Sign in failed.");
          return;
        }

        setNotice("Signed in. Redirecting…");
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // mode === "signup"
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // If you have email confirmations OFF in Supabase, user signs in immediately.
          // If confirmations are ON, they’ll need to confirm via email first.
        },
      });

      if (error) {
        setError(error.message || "Account creation failed.");
        return;
      }

      setNotice(
        "Account created. If email confirmation is enabled, check your inbox to confirm before signing in."
      );
      // Optionally switch back to sign-in after signup
      setModeAndUrl("signin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-14">
      <div className="rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-brand-navy">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            {mode === "signin"
              ? "Use your email and password to sign in."
              : "Create an account with your email and password."}
          </p>
        </div>

        {/* Segmented Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-2xl border border-neutral-200 bg-neutral-50 p-1">
            <button
              type="button"
              onClick={() => setModeAndUrl("signin")}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-semibold transition",
                mode === "signin"
                  ? "bg-white text-brand-navy shadow-sm"
                  : "text-neutral-600 hover:text-brand-navy"
              )}
              aria-pressed={mode === "signin"}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setModeAndUrl("signup")}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-semibold transition",
                mode === "signup"
                  ? "bg-white text-brand-navy shadow-sm"
                  : "text-neutral-600 hover:text-brand-navy"
              )}
              aria-pressed={mode === "signup"}
            >
              Create account
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/20"
              placeholder="••••••••"
              minLength={6}
            />
            <div className="mt-2 text-xs text-neutral-500">
              Minimum 6 characters.
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {notice ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {notice}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full rounded-2xl px-4 py-3 text-sm font-semibold transition",
              "bg-brand-navy text-white hover:opacity-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {loading
              ? mode === "signin"
                ? "Signing in…"
                : "Creating…"
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>

          {mode === "signin" ? (
            <div className="text-center text-sm text-neutral-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setModeAndUrl("signup")}
                className="font-semibold text-brand-navy hover:underline"
              >
                Create one
              </button>
            </div>
          ) : (
            <div className="text-center text-sm text-neutral-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setModeAndUrl("signin")}
                className="font-semibold text-brand-navy hover:underline"
              >
                Sign in
              </button>
            </div>
          )}
        </form>

        {/* Small compliance note */}
        <p className="mt-8 text-center text-xs text-neutral-500">
          LifeSignal is a non-medical daily wellness check-in service. Not an
          emergency response system.
        </p>
      </div>
    </div>
  );
}
