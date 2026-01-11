"use client";

import { useMemo, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    const supabase = createClient();

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

      router.push("/dashboard");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600">
          Use your email and password to sign in.
        </p>

        <div className="mt-6 inline-flex w-full rounded-xl border bg-slate-50 p-1">
          <button type="button" onClick={() => setMode("signin")} className="w-1/2 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-sm">
            Sign in
          </button>
          <button type="button" onClick={() => setMode("signup")} className="w-1/2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
            Create account
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button type="submit" className="w-full">
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>

          {message && <p className="text-sm text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
