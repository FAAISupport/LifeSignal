import Link from "next/link";

export default function WarmPreviewLogin() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between">
        <Link href="/preview/warm" className="text-sm font-semibold text-neutral-900">
          ← Back
        </Link>
        <Link
          href="/preview/warm/dashboard"
          className="text-sm font-semibold text-neutral-700 hover:underline"
        >
          Dashboard preview
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-[34px] border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">Welcome</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Preview UI only. Big inputs, low stress, friendly tone.
        </p>

        <form className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input
              className="mt-2 w-full rounded-full border border-neutral-200 px-5 py-3 text-sm outline-none focus:border-neutral-400"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-full border border-neutral-200 px-5 py-3 text-sm outline-none focus:border-neutral-400"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Sign in (preview)
          </button>

          <div className="text-center text-sm text-neutral-600">
            Need help setting this up?{" "}
            <span className="font-semibold text-rose-700">Contact support</span>{" "}
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
