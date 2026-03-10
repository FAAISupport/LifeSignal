import type { Metadata } from 'next';
import './globals.css';
import { Shell } from '@/components/Shell';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} | Daily Safety Check-Ins for Loved Ones`,
    template: `%s | ${site.name}`
  },
  description:
    'LifeSignal helps families, caregivers, communities, and healthcare teams monitor loved ones living independently with automated safety check-ins and alert escalation.',
  openGraph: {
    title: `${site.name} | Peace of mind for the people you love most.`,
    description:
      'Automated safety check-ins and alert escalation for families, caregivers, recovery monitoring, senior living, and healthcare partners.',
    siteName: site.name,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Daily Safety Check-Ins`,
    description:
      'Remote human safety monitoring with friendly check-ins, recovery support, and trusted contact escalation.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
