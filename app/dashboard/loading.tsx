export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-56 rounded bg-neutral-200" />
        <div className="h-10 w-96 rounded bg-neutral-200" />
        <div className="h-4 w-80 rounded bg-neutral-200" />
        <div className="mt-10 h-52 w-full rounded-2xl bg-neutral-200" />
      </div>
    </div>
  );
}
