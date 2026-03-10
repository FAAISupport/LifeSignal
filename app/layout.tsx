import "./globals.css"

export const metadata = {
  title: "LifeSignal",
  description: "Daily safety check-ins for families, caregivers, and recovery monitoring.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
