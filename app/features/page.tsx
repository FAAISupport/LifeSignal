import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-4xl flex-col items-start px-6 pt-10 pb-16 sm:px-8 lg:px-10">
        <div className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-200">
          FaithSignal storefront
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          The feature storefront now lives under FaithSignal.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          To keep the main LifeSignal site focused, the public feature catalog and a la carte Stripe checkout now live inside the FaithSignal experience.
        </p>
        <Link
          href="/faithsignal#feature-storefront"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
        >
          Go to FaithSignal features
        </Link>
      </section>
    </main>
  );
}



