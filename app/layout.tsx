import type { Metadata } from 'next';
import './globals.css';
import SecurityGuard from '@/components/SecurityGuard';

export const metadata: Metadata = {
  title: 'A Romantic Proposal Site',
  description: 'A personalized luxury romantic proposal experience celebrating our love story, memories, and future together.',
  openGraph: {
    title: 'A Romantic Proposal Site',
    description: 'Every moment led us here. A personalized romantic love story.',
    url: 'https://forever-begins.vercel.app',
    siteName: 'A Romantic Proposal Site',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'A Romantic Proposal Site',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Romantic Proposal Site',
    description: 'A personalized luxury romantic proposal experience.',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
  },
  themeColor: '#0d0414',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-midnight text-rose-100 min-h-screen">
        {/* Security Inspector & DevTools Lock */}
        <SecurityGuard />
        {children}
      </body>
    </html>
  );
}
