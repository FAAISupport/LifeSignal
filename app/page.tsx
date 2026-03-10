import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WaitlistCounter from "@/components/WaitlistCounter"
import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-white text-slate-900">

      <Navbar />

      <section className="bg-gradient-to-r from-sky-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <p className="text-sky-600 font-semibold">
            LifeSignal Beta
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
            Peace of mind for the people you love most.
          </h1>

          <p className="text-lg text-slate-600 mt-6 max-w-2xl">
            LifeSignal automatically checks in on loved ones living alone.
            If they don’t respond, trusted contacts are alerted.
          </p>

          <WaitlistCounter />

          <div className="flex gap-4 mt-10">
            <Link
              href="/beta"
              className="bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-700"
            >
              Join the Beta
            </Link>

            <a
              href="#how"
              className="border px-6 py-3 rounded-xl font-semibold"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-6 text-slate-500">
            Built for families, caregivers, communities, and healthcare recovery teams.
          </p>

        </div>
      </section>


      <section id="how" className="py-24 border-t">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            A simple 3-step safety check-in
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl">
                Daily Check-In
              </h3>

              <p className="mt-3 text-slate-600">
                LifeSignal sends a simple text message every day asking if the person is safe.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl">
                Quick Response
              </h3>

              <p className="mt-3 text-slate-600">
                They reply with one tap:  
                1 = I'm safe  
                2 = I need help
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl">
                Smart Alerts
              </h3>

              <p className="mt-3 text-slate-600">
                If they don't respond, LifeSignal alerts trusted contacts immediately.
              </p>
            </div>

          </div>

        </div>
      </section>


      <section className="py-24 bg-slate-50 border-t">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Built for real life
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-16">

            <div>
              <h3 className="font-semibold text-lg">Families</h3>
              <p className="text-slate-600 mt-2">
                Know your loved ones are safe without constant phone calls.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Seniors</h3>
              <p className="text-slate-600 mt-2">
                Maintain independence while giving family peace of mind.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Recovery Patients</h3>
              <p className="text-slate-600 mt-2">
                Post-surgery monitoring when someone returns home.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Caregivers</h3>
              <p className="text-slate-600 mt-2">
                Simple safety monitoring without complex technology.
              </p>
            </div>

          </div>

        </div>
      </section>


      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-4xl font-bold">
            Help us build the future of safety check-ins
          </h2>

          <p className="text-slate-600 mt-6">
            Join the LifeSignal beta and help shape the product before launch.
          </p>

          <Link
            href="/beta"
            className="inline-block mt-10 bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sky-700"
          >
            Join the Beta Program
          </Link>

        </div>
      </section>


      <Footer />

    </main>
  )
}
