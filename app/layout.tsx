import type { Metadata } from 'next';
import './globals.css';
const origin = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
const description = 'Bhavya Chauhan, Software Developer and AI/ML Engineer. Explore experience at Grid Apps LLC and ONGC, computer vision projects, full-stack development and student leadership.';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: 'Bhavya Chauhan | Software Developer & AI/ML Engineer',
  description,
  authors: [{ name: 'Bhavya Chauhan' }],
  alternates: { canonical: '/' },
  openGraph: { title: 'Bhavya Chauhan | Software Developer & AI/ML Engineer', description, type: 'website', locale: 'en_IN', url: '/', siteName: 'Bhavya Chauhan' },
  twitter: { card: 'summary_large_image', title: 'Bhavya Chauhan | Software Developer & AI/ML Engineer', description },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
