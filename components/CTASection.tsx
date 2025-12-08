export default function CTASection() {
  return (
    <section className="bg-sky-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to try LifeSignal?
        </h2>
        <p className="text-base md:text-lg text-sky-100 mb-6">
          Start with a 14-day free trial. Set up your loved one&apos;s daily
          check-in schedule in minutes and feel the peace it brings.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full bg-white text-sky-700 px-6 py-3 text-sm md:text-base font-semibold shadow-lg shadow-slate-900/20 hover:bg-slate-100 transition"
          >
            Start Free Trial
          </a>

        </div>

        <p className="mt-4 text-xs md:text-sm text-sky-100/80">
          No apps. No hardware. Just a daily phone check-in and smart alerts if
          something seems wrong.
        </p>
      </div>
    </section>
  );
}
