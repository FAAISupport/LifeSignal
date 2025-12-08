import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">You&apos;re all set.</h1>
        <p className="text-sm text-slate-600">
          We&apos;ll start sending daily check-in texts at your chosen time.
          If we can&apos;t confirm your loved one is okay, we&apos;ll alert you
          right away.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-semibold"
        >
          Back to LifeSignal
        </Link>
      </div>
    </div>
  );
}
