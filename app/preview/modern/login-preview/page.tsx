import Link from "next/link";

export default function ModernPreviewLogin() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between">
        <Link href="/preview/modern" className="text-sm font-semibold text-neutral-900">
          ← Back
        </Link>
        <Link
          href="/preview/modern/dashboard"
          className="text-sm font-semibold text-neutral-700 hover:underline"
        >
          Dashboard shell
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">Welcome back</h1>
          <p className="mt-2 text-sm text-neutral-600">Preview UI only (no auth)</p>
        </div>

        {/* Segmented toggle (visual only) */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-2xl border border-neutral-200 bg-neutral-50 p-1">
            <button
              type="button"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm"
            >
              Sign in
            </button>
            <button
              type="button"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Create
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-4">
          <input
            className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            type="password"
            className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
            placeholder="Password"
            autoComplete="current-password"
          />

          <button
            type="button"
            className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Sign in (preview)
          </button>

          <div className="text-center text-xs text-neutral-500">Forgot password (preview)</div>
        </form>
      </div>
    </main>
  );
}
