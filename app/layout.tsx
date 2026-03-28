import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ChurchOS Builder V3',
  description: 'Multi-tenant care automation platform for churches and ministries.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-slate-50 text-slate-900 antialiased'>
        <header className='border-b bg-white'>
          <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
            <Link href='/' className='text-lg font-bold'>ChurchOS Builder V3</Link>
            <div className='space-x-4 text-sm'>
              <Link href='/pricing'>Pricing</Link>
              <Link href='/builder'>Builder</Link>
              <Link href='/auth/login'>Login</Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
