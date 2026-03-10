"use client"

import { useState } from "react"

export function BetaWaitlistForm({ referralCode = "" }: { referralCode?: string }) {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const res = await fetch("/api/waitlist/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          referralCode,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong")
      }

      setMessage("You are on the LifeSignal beta waitlist.")
      setEmail("")
      setFullName("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Judd Spence"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-0 transition focus:border-sky-500"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="judd@example.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-0 transition focus:border-sky-500"
          required
        />
      </div>

      <input type="hidden" name="referralCode" value={referralCode} />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Joining..." : "Join Beta"}
      </button>

      {message ? (
        <p className="text-sm text-emerald-600">{message}</p>
      ) : null}

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}
    </form>
  )
}
