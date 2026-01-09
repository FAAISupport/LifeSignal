"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";

function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error("Missing Supabase public env vars");
  return createClient(url, anon, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
}

export default function LoginClient() {
  const router = useRouter();
  const supabase = React.useMemo(() => supabaseBrowser(), []);

  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Clean up stale/broken sessions without spamming logs
    (async () => {
      const { error } = await supabase.auth.getSession();
      if (error && (error as any).code === "refresh_token_not_found") {
        await supabase.auth.signOut();
        router.refresh();
      }
    })();
  }, [router, supabase]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (!email.trim() || !password) {
        setError("Email and password are required.");
        return;
      }

      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        // Signed in
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // mode === "signup"
      const origin =
        typeof window !== "undefined" ? window.location.origin : undefined;

      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          // If email confirmation is enabled, Supabase will send a confirmation email.
          // This is NOT a magic link login — it’s a confirmation step.
          emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage(
        "Account created. If email confirmation is enabled, check your inbox to confirm before signing in."
      );
      setMode("signin");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {mode === "signin"
          ? "Use your email and password to sign in."
          : "Create an account with your email and password."}
      </p>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          variant={mode === "signin" ? "primary" : "outline"}
          onClick={() => {
            setMode("signin");
            setError(null);
            setMessage(null);
          }}
        >
          Sign in
        </Button>
        <Button
          type="button"
          variant={mode === "signup" ? "primary" : "outline"}
          onClick={() => {
            setMode("signup");
            setError(null);
            setMessage(null);
          }}
        >
          Create account
        </Button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            minLength={6}
          />
          <p className="mt-1 text-xs text-gray-500">
            Minimum 6 characters.
          </p>
        </div>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            {message}
          </div>
        ) : null}

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading
            ? "Please wait…"
            : mode === "signin"
            ? "Sign in"
            : "Create account"}
        </Button>
      </form>
    </div>
  );
}
