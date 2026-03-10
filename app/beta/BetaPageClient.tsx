"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { BetaWaitlistForm } from "@/components/BetaWaitlistForm"

export default function BetaPageClient() {
  const searchParams = useSearchParams()

  const referralCode = useMemo(() => {
    return searchParams.get("ref") ?? ""
  }, [searchParams])

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
        <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
          Join the LifeSignal Beta
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Get early access to LifeSignal
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Join families, caregivers, and recovery partners using LifeSignal to
          make sure someone always knows when a loved one is safe.
        </p>

        <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <BetaWaitlistForm referralCode={referralCode} />
        </div>
      </section>
    </main>
  )
}

