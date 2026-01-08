"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function LoginClient() {
  const router = useRouter();
  // Use the same @supabase/ssr browser client as the rest of the app,
  // so auth cookies stay in sync with server components.
  const supabase = React.useMemo(() => supabaseBrowser(), []);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { error } = await supabase.auth.getSession();

        // Clean up stale/broken local tokens to stop the spam.
        if (error && (error as any).code === "refresh_token_not_found") {
          await supabase.auth.signOut();
          if (!cancelled) router.refresh();
        }
      } catch {
        try {
          await supabase.auth.signOut();
        } catch {}
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function signInWithEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    if (!email) return;

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
      },
    });
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-gray-600">
        Enter your email and we’ll send a magic link.
      </p>

      <form onSubmit={signInWithEmail} className="mt-6 space-y-3">
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
        <Button type="submit" variant="primary" className="w-full">
          Send magic link
        </Button>
      </form>
    </div>
  );
}
