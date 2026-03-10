"use client"
import { useEffect, useState } from "react"

export default function WaitlistCounter() {
  const [count,setCount] = useState<number | null>(null)

  useEffect(()=>{
    fetch("/api/waitlist/count")
      .then(r=>r.json())
      .then(d=>setCount(d.count))
      .catch(()=>{})
  },[])

  if(count===null) return null

  return (
    <div className="mt-4 inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
      {count} people already joined the waitlist
    </div>
  )
}
