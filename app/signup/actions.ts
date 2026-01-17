"use server";

import { supabaseServer } from "@/lib/supabase/server";

export type SignupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "sent"; email: string };

export async function signupAction(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
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

  return { status: "sent", email };
}
