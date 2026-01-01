export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { createSeniorAndContacts } from "@/app/dashboard/actions";
import NewLovedOneWizard from "@/components/dashboard/NewLovedOneWizard";

async function createAction(formData: FormData) {
  "use server";

  if (!formData.get("consent_ip")) formData.set("consent_ip", "");

  const res = await createSeniorAndContacts(formData);

  if (!res.ok) {
    redirect("/dashboard/seniors/new?error=" + encodeURIComponent(res.error));
  }

  redirect(`/dashboard/seniors/${res.data.seniorId}?created=1`);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const sb = await supabaseServer();
  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) {
    redirect("/login?next=" + encodeURIComponent("/dashboard/seniors/new"));
  }

  const errorMsg = typeof searchParams?.error === "string" ? searchParams.error : "";

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-neutral-600">Add a loved one</div>
          <h1 className="text-2xl font-semibold text-brand-navy">Create a profile</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Two quick steps. You’ll land on settings after creation.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-neutral-200 bg-white hover:bg-neutral-50"
        >
          ← Back to dashboard
        </Link>
      </div>

      <Card>
        {errorMsg ? (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {errorMsg}
          </div>
        ) : null}

        <NewLovedOneWizard action={createAction} />
      </Card>
    </div>
  );
}
