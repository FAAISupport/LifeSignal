import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-sky-600">
          LifeSignal
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/beta" className="text-sm font-semibold text-slate-700 hover:text-sky-600">
            Beta
          </Link>

          <Link
            href="/beta"
            className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700"
          >
            Join Beta
          </Link>
        </div>
      </div>
    </nav>
  )
}
