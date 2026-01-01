export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { createSeniorAndContacts } from "@/app/dashboard/actions";
import NewLovedOneWizard from "@/components/dashboard/NewLovedOneWizard";
import { redirect } from "next/navigation";

async function createAction(formData: FormData) {
  "use server";

  // Ensure field exists for audit trail
  if (!formData.get("consent_ip")) {
    formData.set("consent_ip", "");
  }

  const res = await createSeniorAndContacts(formData);

  if (!res.ok) {
    redirect(
      "/dashboard/seniors/new?error=" +
        encodeURIComponent(res.error ?? "Unable to create loved one")
    );
  }

  redirect(`/dashboard/seniors/${res.data.seniorId}?created=1`);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const errorMsg =
    typeof searchParams?.error === "string" ? searchParams.error : "";

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-neutral-600">Add a loved one</div>
          <h1 className="text-2xl font-semibold text-brand-navy">
            Create a profile
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Two quick steps. You’ll land on settings after creation.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-neutral-50"
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
