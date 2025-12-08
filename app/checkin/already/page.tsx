export default function CheckinAlready() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Already checked in</h1>
        <p className="text-sm text-slate-600">
          We already recorded this check-in. No further action is needed.
        </p>
      </div>
    </div>
  );
}
