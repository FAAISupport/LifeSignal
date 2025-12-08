export default function CheckinInvalid() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Link not found</h1>
        <p className="text-sm text-slate-600">
          This check-in link is invalid or has expired. If this was a mistake,
          please contact your family directly.
        </p>
      </div>
    </div>
  );
}
