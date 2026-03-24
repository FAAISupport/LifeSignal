import type { Metadata } from "next";
import LifeSignalDemoDashboards from "@/components/demo/LifeSignalDemoDashboards";

export const metadata: Metadata = {
  title: "LifeSignal Demo Dashboards",
  description:
    "Interactive Family, Caregiver, Recover, PostOP, and Agency dashboard previews for LifeSignal."
};

export default async function DemoDashboardsPage({
  searchParams
}: {
  searchParams?: Promise<{ role?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const allowedRoles = new Set(["family", "caregiver", "recover", "postop", "agency"]);
  const initialRole = allowedRoles.has(params.role ?? "") ? params.role : "family";

  return <LifeSignalDemoDashboards initialRole={initialRole as "family" | "caregiver" | "recover" | "postop" | "agency"} />;
}

