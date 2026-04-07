import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { featureCatalog } from "@/lib/feature-catalog";

type DashboardPageProps = {
  searchParams?: Promise<{
    org?: string;
  }>;
};

type OrganizationRow = {
  id: string;
  name: string | null;
  email: string | null;
  created_at?: string | null;
};

type OnboardingRow = {
  organization_id: string;
  church_name: string;
  admin_name: string | null;
  admin_email: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  attendance_band: string | null;
  care_priorities: string[] | null;
  selected_feature_keys: string[] | null;
  member_count: number | null;
  updated_at?: string | null;
  created_at?: string | null;
};

type EntitlementRow = {
  organization_id: string;
  feature_key: string;
  source: string;
  created_at?: string | null;
};

type SubscriptionRow = {
  organization_id: string;
  plan: string | null;
  status: string | null;
  stripe_subscription_id: string | null;
  created_at?: string | null;
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

async function loadDashboardData(organizationId?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || (!anonKey && !serviceRoleKey)) {
    return {
      error:
        "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY.",
      organization: null as OrganizationRow | null,
      onboarding: null as OnboardingRow | null,
      entitlements: [] as EntitlementRow[],
      subscription: null as SubscriptionRow | null,
    };
  }

  const supabase = createClient(url, serviceRoleKey || anonKey!);

  const organizationQuery = supabase
    .from("organizations")
    .select("id, name, email, created_at");

  const organizationResult = organizationId
    ? await organizationQuery.eq("id", organizationId).maybeSingle<OrganizationRow>()
    : await organizationQuery
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle<OrganizationRow>();

  if (organizationResult.error || !organizationResult.data) {
    return {
      error:
        organizationId
          ? organizationResult.error?.message || "That organization could not be found."
          : organizationResult.error?.message || "No organization record found yet. Complete onboarding first.",
      organization: null as OrganizationRow | null,
      onboarding: null as OnboardingRow | null,
      entitlements: [] as EntitlementRow[],
      subscription: null as SubscriptionRow | null,
    };
  }

  const organization = organizationResult.data;

  const [onboardingResult, entitlementsResult, subscriptionResult] = await Promise.all([
    supabase
      .from("faithsignal_onboarding")
      .select(
        "organization_id, church_name, admin_name, admin_email, phone, city, state, attendance_band, care_priorities, selected_feature_keys, member_count, updated_at, created_at"
      )
      .eq("organization_id", organization.id)
      .maybeSingle<OnboardingRow>(),

    supabase
      .from("feature_entitlements")
      .select("organization_id, feature_key, source, created_at")
      .eq("organization_id", organization.id)
      .order("created_at", { ascending: false })
      .returns<EntitlementRow[]>(),

    supabase
      .from("subscriptions")
      .select("organization_id, plan, status, stripe_subscription_id, created_at")
      .eq("organization_id", organization.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<SubscriptionRow>(),
  ]);

  return {
    error:
      onboardingResult.error?.message ||
      entitlementsResult.error?.message ||
      subscriptionResult.error?.message ||
      "",
    organization,
    onboarding: onboardingResult.data ?? null,
    entitlements: entitlementsResult.data ?? [],
    subscription: subscriptionResult.data ?? null,
  };
}

export default async function FaithSignalDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const organizationId = resolvedSearchParams?.org?.trim() || undefined;

  const { error, organization, onboarding, entitlements, subscription } =
    await loadDashboardData(organizationId);

  const entitlementKeys = Array.from(
    new Set([
      ...(onboarding?.selected_feature_keys ?? []),
      ...entitlements.map((item) => item.feature_key),
    ])
  );

  const activeFeatures = featureCatalog.filter((feature) =>
    entitlementKeys.includes(feature.key)
  );

  const monthlyFeatureTotal = activeFeatures.reduce(
    (sum, feature) => sum + feature.monthlyPrice,
    0
  );

  const memberCount = onboarding?.member_count ?? 0;
  const memberCoverageTotal = memberCount > 0 ? memberCount * 2.99 : 0;
  const monthlyTotal = monthlyFeatureTotal + memberCoverageTotal;

  const carePriorities = onboarding?.care_priorities ?? [];
  const churchName =
    onboarding?.church_name || organization?.name || "Your Church";
  const adminEmail = onboarding?.admin_email || organization?.email || "—";
  const adminName = onboarding?.admin_name || "—";
  const location = [onboarding?.city, onboarding?.state].filter(Boolean).join(", ") || "—";

  const recommendedNextMoves =
    activeFeatures.length === 0
      ? [
          "Complete onboarding and select your first FaithSignal modules.",
          "Choose one care workflow to launch first.",
          "Add your first members or households to monitor.",
        ]
      : [
          "Review your active feature set and confirm alert owners.",
          "Launch one high-confidence care workflow first.",
          "Use weekly reviews to expand adoption gradually.",
        ];

  const dashboardHref = organization?.id
    ? `/faithsignal/dashboard?org=${encodeURIComponent(organization.id)}`
    : "/faithsignal/dashboard";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                FaithSignal Care Center
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight">
                {churchName} dashboard
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                This dashboard reads the selected organization directly from the
                URL so the church you just onboarded is the one you see here.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/faithsignal"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Add features
              </Link>

              <Link
                href="/faithsignal/onboarding"
                className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Update setup
              </Link>
            </div>
          </div>

          {organization?.id ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Active organization ID: <span className="font-semibold">{organization.id}</span>
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Enabled features</div>
            <div className="mt-2 text-3xl font-bold">{activeFeatures.length}</div>
            <div className="mt-2 text-sm text-slate-600">Live from feature entitlements</div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Member coverage count</div>
            <div className="mt-2 text-3xl font-bold">{memberCount}</div>
            <div className="mt-2 text-sm text-slate-600">From onboarding profile</div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Care priorities</div>
            <div className="mt-2 text-3xl font-bold">{carePriorities.length}</div>
            <div className="mt-2 text-sm text-slate-600">Active focus areas selected</div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Estimated monthly setup</div>
            <div className="mt-2 text-3xl font-bold">{formatMoney(monthlyTotal)}</div>
            <div className="mt-2 text-sm text-slate-600">Features + member coverage</div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-12 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                  Organization Profile
                </div>
                <h2 className="mt-2 text-2xl font-bold">Live church setup</h2>
              </div>

              <Link
                href="/faithsignal/onboarding"
                className="text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                Edit setup
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Church</div>
                <div className="mt-1 text-lg font-semibold">{churchName}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Admin name</div>
                <div className="mt-1 text-lg font-semibold">{adminName}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Admin email</div>
                <div className="mt-1 break-all text-lg font-semibold">{adminEmail}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Location</div>
                <div className="mt-1 text-lg font-semibold">{location}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Attendance band</div>
                <div className="mt-1 text-lg font-semibold">
                  {onboarding?.attendance_band || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Subscription status</div>
                <div className="mt-1 text-lg font-semibold">
                  {subscription?.status || "No subscription record yet"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Care Priorities
            </div>
            <h2 className="mt-2 text-2xl font-bold">What this church is focused on</h2>

            <div className="mt-6 grid gap-4">
              {carePriorities.length > 0 ? (
                carePriorities.map((priority) => (
                  <div
                    key={priority}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="text-base font-semibold">{priority}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                  No care priorities have been saved yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Enabled Modules
            </div>
            <h2 className="mt-2 text-2xl font-bold">Live feature entitlements</h2>

            <div className="mt-6 space-y-4">
              {activeFeatures.length > 0 ? (
                activeFeatures.map((feature) => {
                  const entitlement = entitlements.find(
                    (item) => item.feature_key === feature.key
                  );

                  return (
                    <div
                      key={feature.key}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                            {feature.category}
                          </div>
                          <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {feature.description}
                          </p>
                          <div className="mt-3 text-xs text-slate-500">
                            Source: {entitlement?.source || "onboarding"}
                          </div>
                        </div>

                        <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                          {formatMoney(feature.monthlyPrice)}/mo
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                  No enabled features found yet. Add modules from the FaithSignal storefront
                  or complete onboarding.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Billing Snapshot
            </div>
            <h2 className="mt-2 text-2xl font-bold">Current monthly footprint</h2>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="text-slate-500">Feature subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(monthlyFeatureTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="text-slate-500">Member coverage</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(memberCoverageTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="text-slate-500">Plan</span>
                <span className="font-semibold text-slate-900">
                  {subscription?.plan || "A la carte"}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between text-base font-bold">
                  <span>Estimated monthly total</span>
                  <span>{formatMoney(monthlyTotal)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/faithsignal"
              className="mt-6 block rounded-2xl bg-sky-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Manage features
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Next Best Moves
            </div>
            <h2 className="mt-2 text-2xl font-bold">Recommended actions</h2>

            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
              {recommendedNextMoves.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Quick Links
            </div>
            <h2 className="mt-2 text-2xl font-bold">Stay in this organization</h2>

            <div className="mt-6 space-y-3">
              <Link
                href={dashboardHref}
                className="block rounded-2xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Refresh this dashboard
              </Link>

              <Link
                href={organization?.id ? `/faithsignal/success?org=${encodeURIComponent(organization.id)}` : "/faithsignal/success"}
                className="block rounded-2xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View success page
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}





