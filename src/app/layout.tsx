import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import { client } from '../../sanity/lib/client';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Luna's Portfolio",
  description: `
    I am a front-end developer and designer with a passion for creating beautiful and functional websites. I specialize in React, Next.js, and Tailwind CSS. I am also experienced in working with headless CMSs like Sanity.io and WordPress. I am currently available for freelance work.
  `,
  icons: [
    {
      url: '/images/luna-logo.png',
      rel: 'icon',
      href: '/images/luna-logo.png',
    },
  ],
  keywords: [
    'Front End Developer',
    'Full Stack Developer',
    'Freelance Developer',
    'Freelance Designer',
    'Web Developer',
    'Web Designer',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Sanity.io',
    'WordPress',
    'Freelance',
  ].join(', '),
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  openGraph: {
    images: [
      {
        url: '/images/luna-logo.png',
        alt: `Image for Luna's logo.`,
      },
    ],
    title: "Luna's Portfolio",
    description: `
      I am a front-end developer and designer with a passion for creating beautiful and functional websites. I specialize in React, Next.js, and Tailwind CSS. I am also experienced in working with headless CMSs like Sanity.io and WordPress. I am currently available for freelance work.
    `,
    url: `https://www.luna-cuevas.com/`,
    type: 'article',
    locale: 'en_US',
    siteName: "Luna's Portfolio",
  },
  twitter: {
    title: "Luna's Portfolio",
    site: 'https://www.luna-cuevas.com/',
    card: 'summary_large_image',
    description: `
      I am a front-end developer and designer with a passion for creating beautiful and functional websites. I specialize in React, Next.js, and Tailwind CSS. I am also experienced in working with headless CMSs like Sanity.io and WordPress. I am currently available for freelance work.`,
    images: [
      {
        url: '/images/luna-logo.png',
        alt: `Image for Luna's logo.`,
      },
    ],
  },

  metadataBase: new URL('https://www.luna-cuevas.com/'),
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
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ED7F1Y8X3R"></script>
        <script>
          {`  
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ED7F1Y8X3R');
          `}
        </script>
      </Head>
      <body
        className={`${inter.className} bg-[#050716] relative overflow-x-hidden h-screen overflow-y-scroll`}>
        <Navigation projectSlug={slug} />
        {children}
      </body>
    </html>
  );
}
