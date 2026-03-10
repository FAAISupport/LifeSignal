export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-slate-600">
        <p className="font-semibold text-slate-800">LifeSignal</p>
        <p className="mt-2">
          Daily safety check-ins for seniors, recovery patients, and families.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Field Agent AI
        </p>
      </div>
    </footer>
  )
}
