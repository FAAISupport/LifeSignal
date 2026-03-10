"use client"

import { useState } from "react"

export function BetaWaitlistForm({ referralCode = "" }: { referralCode?: string }) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("family")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/waitlist/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          interest,
          referralCode,
          message
        }),
      })

      if (!res.ok) throw new Error("Failed to join waitlist")

      setSuccess(true)
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold text-green-600">
          You're on the waitlist 🎉
        </h3>
        <p className="mt-2 text-gray-600">
          We'll notify you when LifeSignal beta opens.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="First name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          placeholder="Last name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <input
        placeholder="Email address"
        type="email"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Phone number"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      >
        <option value="family">Family member</option>
        <option value="caregiver">Caregiver</option>
        <option value="community">Community partner</option>
        <option value="healthcare">Healthcare provider</option>
      </select>

      <textarea
        placeholder="How would you use LifeSignal?"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700 transition"
        disabled={loading}
      >
        {loading ? "Joining..." : "Join the Beta"}
      </button>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </form>
  )
}
