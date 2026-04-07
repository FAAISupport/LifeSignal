import { useMemo, useState } from "react";
import {
  featureCatalog as FEATURE_CATALOG,
  featureCategories as FEATURE_CATEGORIES,
  type FeatureCategory,
} from "@/lib/feature-catalog";
const ALL_CATEGORY = "all" as const;
const categoryOptions = [ALL_CATEGORY, ...Object.keys(FEATURE_CATEGORIES)] as const;

type CategoryFilter = (typeof categoryOptions)[number];

export function FeatureStorefront() {
  const [category, setCategory] = useState<CategoryFilter>(ALL_CATEGORY);
  const [cart, setCart] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartSet = useMemo(() => new Set(cart), [cart]);

  const visibleFeatures = useMemo(() => {
    if (category === ALL_CATEGORY) return FEATURE_CATALOG;
    return FEATURE_CATALOG.filter((feature) => feature.category === category);
  }, [category]);

  const cartItems = useMemo(
    () => FEATURE_CATALOG.filter((feature) => cartSet.has(feature.key)),
    [cartSet],
  );

  const monthlyTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.monthlyPrice, 0),
    [cartItems],
  );

  function toggleCart(key: string) {
    setCart((current) => {
      if (current.includes(key)) {
        return current.filter((item) => item !== key);
      }

      return [...current, key];
    });
  }

  async function handleCheckout() {
    if (cartItems.length === 0) {
      setError("Add at least one feature to the cart before checkout.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/features/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: cartItems.map((item) => item.key) }),
      });

      const payload = (await response.json()) as { ok?: boolean; url?: string; error?: string };

      if (!response.ok || !payload.ok || !payload.url) {
        throw new Error(payload.error ?? "Unable to start Stripe checkout.");
      }

      window.location.assign(payload.url);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unexpected error";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {categoryOptions.map((option) => {
            const active = option === category;
            const label = option === ALL_CATEGORY ? "All features" : String(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-sky-400 bg-sky-500 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/40 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleFeatures.map((feature) => {
            const inCart = cartSet.has(feature.key);
            return (
              <article
                key={feature.key}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#071226_0%,#06101d_100%)] p-6 shadow-[0_10px_40px_rgba(2,6,23,0.35)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/80">
                      {feature.category}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <div className="shrink-0 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-100">
                    ${feature.monthlyPrice}/mo
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-sky-200">{feature.description}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="min-h-[20px] text-xs font-medium text-emerald-300">
                    {feature.badge ?? ""}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCart(feature.key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      inCart
                        ? "border border-emerald-300/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20"
                        : "bg-sky-500 text-white hover:bg-sky-400"
                    }`}
                  >
                    {inCart ? "Remove from cart" : "Add to cart"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="sticky top-24 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/80">A la carte cart</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">Build your own stack</h2>
          </div>
          <div className="rounded-full bg-sky-500/15 px-3 py-1 text-sm font-semibold text-sky-100">{cartItems.length} items</div>
        </div>

        <div className="mt-6 space-y-3">
          {cartItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm leading-7 text-slate-300">
              Start adding features and this cart becomes a Stripe-ready monthly subscription checkout.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.key} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-400">{item.description}</div>
                  </div>
                  <div className="text-sm font-semibold text-sky-100">${item.monthlyPrice}/mo</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Estimated monthly total</span>
            <span className="text-2xl font-bold text-white">${monthlyTotal}</span>
          </div>
          <p className="mt-2 text-xs leading-6 text-slate-400">
            Checkout uses Stripe subscriptions with one line item per selected feature.
          </p>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</div>
        ) : null}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={submitting || cartItems.length === 0}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {submitting ? "Redirecting to Stripe..." : "Checkout with Stripe"}
        </button>

        <a
          href="/builder"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400/40 hover:text-white"
        >
          Need a packaged rollout instead?
        </a>
      </aside>
    </div>
  );
}










