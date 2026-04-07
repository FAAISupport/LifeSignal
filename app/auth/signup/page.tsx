import { randomUUID } from "node:crypto";

import Link from "next/link";
import { redirect } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function slugifyOrganizationName(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || `org-${randomUUID().slice(0, 8)}`;
}

async function signup(formData: FormData) {
  "use server";

  const organizationName = String(formData.get("organizationName") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!organizationName || !fullName || !email || !password) {
    redirect("/auth/signup?error=All%20fields%20are%20required");
  }

  const supabase = await createSupabaseServerClient();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (signUpError || !signUpData.user) {
    redirect(`/auth/signup?error=${encodeURIComponent(signUpError?.message ?? "Failed to create account")}`);
  }

  const admin = createAdminClient();
  const slugBase = slugifyOrganizationName(organizationName);
  const slug = `${slugBase}-${randomUUID().slice(0, 6)}`;

  const { data: organization, error: orgError } = await admin
    .from("organizations")
    .insert({
      name: organizationName,
      slug,
      owner_user_id: signUpData.user.id,
    })
    .select("id")
    .single<{ id: string }>();

  if (orgError || !organization) {
    redirect(`/auth/signup?error=${encodeURIComponent(orgError?.message ?? "Failed to create organization")}`);
  }

  const { error: membershipError } = await admin.from("organization_members").insert({
    org_id: organization.id,
    user_id: signUpData.user.id,
    role: "owner",
    status: "active",
    joined_at: new Date().toISOString(),
  });

  if (membershipError) {
    redirect(`/auth/signup?error=${encodeURIComponent(membershipError.message)}`);
  }

  redirect(
    "/auth/login?message=Account%20created.%20If%20email%20confirmation%20is%20enabled,%20please%20confirm%20your%20email%20before%20logging%20in.",
  );
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl font-semibold">Create your organization</h1>
      <p className="mt-2 text-sm text-gray-600">Sign up as owner and bootstrap your ChurchOS workspace.</p>

      {params.error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{params.error}</p>
      ) : null}

      <form action={signup} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="organizationName">
          Organization name
        </label>
        <input
          id="organizationName"
          name="organizationName"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          autoComplete="name"
        />

        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          autoComplete="email"
        />

        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create account
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link className="text-blue-600 hover:text-blue-700" href="/auth/login">
          Log in
        </Link>
      </p>
    </main>
  );
}

