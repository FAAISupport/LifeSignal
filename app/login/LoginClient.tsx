"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.72 1.22 9.22 3.62l6.84-6.84C35.9 2.46 30.39 0 24 0 14.64 0 6.59 5.38 2.68 13.22l7.98 6.19C12.46 13.2 17.77 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.6c-.54 2.9-2.15 5.36-4.58 7.04l7.02 5.44c4.1-3.78 6.46-9.36 6.46-16.73z"
      />
      <path
        fill="#FBBC05"
        d="M10.66 28.59A14.5 14.5 0 0 1 9.9 24c0-1.6.28-3.15.76-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.92 7.53 2.68 10.78l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.39 0 11.76-2.11 15.68-5.77l-7.02-5.44c-1.95 1.31-4.45 2.08-8.66 2.08-6.23 0-11.54-3.7-13.34-8.91l-7.98 6.19C6.59 42.62 14.64 48 24 48z"
      />
    </svg>
  );
}

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const nextParam = sp?.get("next") || "/dashboard";
  const nextUrl = nextParam.startsWith("/") ? nextParam : "/dashboard";

  const supabase = React.useMemo(() => supabaseBrowser(), []);

  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  // If already signed in, go to destination
  React.useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace(nextUrl);
        router.refresh();
      }
    })();
  }, [router, supabase, nextUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const cleanEmail = email.trim();
      if (!cleanEmail || !password) {
        setError("Email and password are required.");
        return;
      }

      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        router.replace(nextUrl);
        router.refresh();
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: origin
            ? `${origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`
            : undefined,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage(
        "Account created. If email confirmation is enabled, check your inbox to confirm, then sign in."
      );
      setMode("signin");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setError(null);
    setMessage(null);

    if (!origin) {
      setError("Unable to start Google sign-in.");
      return;
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
      },
    });

    if (oauthError) setError(oauthError.message);
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {mode === "signin"
              ? "Use your email and password to sign in."
              : "Create an account with your email and password."}
          </p>
        </div>

        {/* Always-visible toggle */}
        <div className="mt-5 grid grid-cols-2 gap-2">
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

        {/* Google button */}
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full justify-center gap-2"
            onClick={signInWithGoogle}
          >
            <GoogleIcon className="h-4 w-4" />
            Continue with Google
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="text-xs text-slate-500">or</div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Email/password form */}
        <form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-slate-900">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-300 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-900">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-300 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
            />
            <p className="mt-1 text-xs text-slate-500">Minimum 6 characters.</p>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {message}
            </div>
          ) : null}

          {/* Submit button */}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-500">
          By continuing you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </div>
  );
}
