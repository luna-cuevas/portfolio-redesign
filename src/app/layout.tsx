import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import { client } from '../../sanity/lib/client';

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

async function getData() {
  try {
    const project = await client.fetch(
      '*[_type == "project"] | order(order asc){slug} [0...1]'
    );

    return { slug: project[0].slug.current };
  } catch (error) {
    console.error(error);
    return { slug: [] };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { slug } = await getData();

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#050716] relative overflow-x-hidden h-screen overflow-y-scroll`}>
        <Navigation projectSlug={slug} />
        {children}
      </body>
    </html>
  );
}
