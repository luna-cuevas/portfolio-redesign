import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Luna's Portfolio",
  description:
    'A portfolio website for Luna, a software engineer and designer.',
  icons: [
    {
      url: '/images/luna-logo.png',
      rel: 'icon',
      href: '/images/luna-logo.png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050716] `}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
