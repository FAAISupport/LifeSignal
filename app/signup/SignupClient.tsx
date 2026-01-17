"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import type { SignupState } from "./page";
import { signupAction } from "./page";

export default function SignupClient() {
  const [state, formAction, pending] = useActionState<SignupState, FormData>(
    signupAction,
    { status: "idle" }
  );

  return (
    <>
      {state.status === "sent" && (
        <div className="mt-5 rounded-2xl border border-brand-blue/20 bg-brand-mist p-4">
          <div className="text-sm font-semibold text-brand-navy">
            Check your email to confirm your account
          </div>
          <div className="mt-1 text-sm text-neutral-700">
            We sent a confirmation link to{" "}
            <span className="font-semibold">{state.email}</span>.
            <br />
            <span className="font-semibold">
              You will not be allowed to log in until you click the link.
            </span>
          </div>
          <div className="mt-3 text-xs text-neutral-600">
            If you don’t see it, check your spam folder. Then return to{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-brand-navy">
              login
            </Link>
            .
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="text-sm font-semibold text-red-800">Signup failed</div>
          <div className="mt-1 text-sm text-red-800/90">{state.message}</div>
        </div>
      )}

      {/* If you want to hide the form after email is sent, wrap in: state.status !== "sent" */}
      <form action={formAction} className="mt-5 grid gap-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input name="name" required autoComplete="name" disabled={pending} />
        </div>

        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" name="email" required autoComplete="email" disabled={pending} />
        </div>

        <div className="grid gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            disabled={pending}
          />
          <div className="text-xs text-neutral-500">Minimum 8 characters.</div>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account…" : "Continue"}
        </Button>

        <p className="text-xs text-neutral-500">
          By creating an account, you agree to receive service messages and acknowledge our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-brand-navy">
            terms
          </Link>
          .
        </p>
      </form>
    </>
  );
}
