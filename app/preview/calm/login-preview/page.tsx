import Link from "next/link";

export default function CalmPreviewLogin() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between">
        <Link href="/preview/calm" className="text-sm font-semibold text-neutral-900">
          ← Back to Calm Home
        </Link>
        <Link
          href="/preview/calm/dashboard"
          className="text-sm font-semibold text-neutral-700 hover:underline"
        >
          View Dashboard Shell
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">Sign in</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Preview UI only (no auth). This layout is optimized for clarity and trust.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Sign in (preview)
          </button>

          <div className="text-center text-sm text-neutral-600">
            New here? <span className="font-semibold text-neutral-900">Create account</span>{" "}
            <span className="text-neutral-400">(preview)</span>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-neutral-500">
          Not an emergency service. For emergencies, call local emergency services.
        </p>
      </div>
    </main>
  );
}
