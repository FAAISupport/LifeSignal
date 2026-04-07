"use client";

import { useEffect, useMemo, useState } from "react";
import { featureCatalog } from "@/lib/feature-catalog";

type FeatureItem = {
  key: string;
  title: string;
  description?: string;
  category?: string;
  monthlyPrice?: number | string;
  price?: number | string;
};

type FaithSignalStorefrontProps = {
  initialSelectedKeys?: string[];
  churchName?: string;
  referralCode?: string;
};

function toNumericPrice(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function slugToLabel(value: string) {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function FaithSignalStorefront({
  initialSelectedKeys = [],
  churchName,
  referralCode,
}: FaithSignalStorefrontProps) {
  const catalog = featureCatalog as FeatureItem[];

  const validInitialSelectedKeys = useMemo(() => {
    const catalogKeys = new Set(catalog.map((feature) => feature.key));
    return Array.from(new Set(initialSelectedKeys)).filter((key) =>
      catalogKeys.has(key)
    );
  }, [catalog, initialSelectedKeys]);

  const categories = useMemo(() => {
    const set = new Set<string>();

    for (const feature of catalog) {
      if (feature.category?.trim()) {
        set.add(feature.category.trim());
      }
    }

    return ["All", ...Array.from(set)];
  }, [catalog]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedKeys, setSelectedKeys] = useState<string[]>(validInitialSelectedKeys);
  const [organizationName, setOrganizationName] = useState(churchName ?? "");
  const [customerEmail, setCustomerEmail] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setSelectedKeys(validInitialSelectedKeys);
  }, [validInitialSelectedKeys]);

  useEffect(() => {
    if (churchName) {
      setOrganizationName(churchName);
    }
  }, [churchName]);

  const filteredFeatures = useMemo(() => {
    if (activeCategory === "All") return catalog;

    return catalog.filter((feature) => feature.category === activeCategory);
  }, [activeCategory, catalog]);

  const selectedFeatures = useMemo(() => {
    const selectedSet = new Set(selectedKeys);
    return catalog.filter((feature) => selectedSet.has(feature.key));
  }, [catalog, selectedKeys]);

  const subtotal = useMemo(() => {
    return selectedFeatures.reduce((sum, feature) => {
      return (
        sum +
        toNumericPrice(
          feature.monthlyPrice ?? feature.price ?? 0
        )
      );
    }, 0);
  }, [selectedFeatures]);

  const memberCoverageTotal = useMemo(() => {
    return memberCount > 0 ? memberCount * 2.99 : 0;
  }, [memberCount]);

  const grandTotal = subtotal + memberCoverageTotal;

  function isSelected(key: string) {
    return selectedKeys.includes(key);
  }

  function toggleFeature(key: string) {
    setErrorMessage("");
    setSuccessMessage("");

    setSelectedKeys((current) => {
      if (current.includes(key)) {
        return current.filter((item) => item !== key);
      }

      return [...current, key];
    });
  }

  async function handleCheckout() {
    setErrorMessage("");
    setSuccessMessage("");

    if (selectedKeys.length === 0) {
      setErrorMessage("Select at least one FaithSignal feature before checkout.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/features/cart-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedFeatureKeys: selectedKeys,
          organizationId,
          organizationName,
          customerEmail,
          memberCount,
          referralCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string" ? data.error : "Unable to start checkout."
        );
      }

      if (!data?.url) {
        throw new Error("Stripe did not return a checkout URL.");
      }

      setSuccessMessage("Redirecting to secure checkout...");
      window.location.href = data.url;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Checkout failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50",
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredFeatures.map((feature) => {
            const price = toNumericPrice(feature.monthlyPrice ?? feature.price ?? 0);
            const selected = isSelected(feature.key);

            return (
              <div
                key={feature.key}
                className={[
                  "rounded-3xl border p-6 shadow-sm transition",
                  selected
                    ? "border-sky-500 bg-sky-50"
                    : "border-slate-200 bg-white hover:border-slate-300",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                      {feature.category || "FaithSignal"}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {feature.title || slugToLabel(feature.key)}
                    </h3>
                  </div>

                  <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200">
                    {formatMoney(price)}/mo
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {feature.description || "FaithSignal module"}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="text-sm text-slate-500">
                    {selected ? "Added to cart" : "Available a la carte"}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFeature(feature.key)}
                    className={[
                      "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                      selected
                        ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        : "bg-sky-600 text-white hover:bg-sky-700",
                    ].join(" ")}
                  >
                    {selected ? "Remove" : "Add to cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            FaithSignal Cart
          </div>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {churchName ? `${churchName} Setup` : "Your Church Setup"}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Choose exactly the services your church wants. Start with a focused setup,
            then add more care infrastructure as you grow.
          </p>

          {referralCode ? (
            <div className="mt-4 rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm text-slate-700">
              Referral code applied: <span className="font-semibold">{referralCode}</span>
            </div>
          ) : null}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Church name
              </label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="First Baptist Church"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Admin email
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="admin@church.org"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Organization ID
              </label>
              <input
                type="text"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                placeholder="Optional existing organization UUID"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Active member coverage count
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={memberCount}
                onChange={(e) => {
                  const parsed = Number.parseInt(e.target.value || "0", 10);
                  setMemberCount(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
                }}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                Optional per-member monthly coverage is billed at $2.99 each.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Selected features</span>
              <span>{selectedFeatures.length}</span>
            </div>

            <div className="mt-4 space-y-3">
              {selectedFeatures.length > 0 ? (
                selectedFeatures.map((feature) => {
                  const price = toNumericPrice(
                    feature.monthlyPrice ?? feature.price ?? 0
                  );

                  return (
                    <div
                      key={feature.key}
                      className="flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {feature.title || slugToLabel(feature.key)}
                        </div>
                        <div className="text-xs text-slate-500">
                          {feature.category || "FaithSignal"}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {formatMoney(price)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-slate-500">
                  Your a la carte selections will appear here.
                </div>
              )}

              {memberCount > 0 ? (
                <div className="flex items-start justify-between gap-3 border-t border-slate-100 pt-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Active Member Coverage
                    </div>
                    <div className="text-xs text-slate-500">
                      {memberCount} × $2.99 per month
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {formatMoney(memberCoverageTotal)}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Feature subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-bold text-slate-900">
                <span>Estimated monthly total</span>
                <span>{formatMoney(grandTotal)}</span>
              </div>
            </div>
          </div>

          {errorMessage ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {successMessage ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting || selectedKeys.length === 0}
            className={[
              "mt-6 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition",
              isSubmitting || selectedKeys.length === 0
                ? "cursor-not-allowed bg-slate-300 text-slate-500"
                : "bg-sky-600 text-white hover:bg-sky-700",
            ].join(" ")}
          >
            {isSubmitting ? "Starting checkout..." : "Checkout selected features"}
          </button>
        </div>
      </aside>
    </div>
  );
}


