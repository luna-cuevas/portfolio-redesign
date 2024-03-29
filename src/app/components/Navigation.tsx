'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  projectSlug: string;
};

const Navigation = (props: Props) => {
  const { projectSlug } = props;
  const baseURL =
    // if in dev mode, use localhost
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.luna-cuevas.com';

  return (
    <nav className="flex md:w-full relative z-[50000] bg-[#050716] h-[80px] border-b-[#bb84e88a] border-b-2 align-middle justify-between px-[10%]">
      <div className="relative my-auto">
        <Image
          src="/images/luna-logo.png"
          alt="Luna's Portfolio"
          width={40}
          height={40}
        />
      </div>
      <div className="hidden md:flex justify-between ">
        <ul className="flex my-auto gap-4 text-white">
          <Link href="/">Home</Link>
          <Link href={`${baseURL}#skills`}>Skills</Link>
          <Link href={`${baseURL}/projects/${projectSlug}`}>Portfolio</Link>
          <Link href={`${baseURL}#experience`}>Experience</Link>
          <Link href={`${baseURL}#testimonials`}>Testimonies</Link>
          <Link href={`${baseURL}#contact`}>Contact</Link>
        </ul>
      </div>

      <button
        className="md:hidden "
        onClick={() => {
          document.getElementById('mobile-nav')?.classList.toggle('hidden');
        }}>
        {/* hamburger svg */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div
        id="mobile-nav"
        className="hidden z-[50000] border-b-[#bb84e88a] py-2 border-b-2 md:hidden gap-4 absolute bottom-0 top-full right-0 bg-[#050716] w-full h-fit">
        <ul className="flex my-auto w-fit mx-auto text-center underline flex-col gap-4 text-white">
          <Link href="/">Home</Link>
          <Link href={`${baseURL}#skills`}>Skills</Link>
          <Link href={`${baseURL}/projects/${projectSlug}`}>Portfolio</Link>
          <Link href={`${baseURL}#experience`}>Experience</Link>
          <Link href={`${baseURL}#testimonials`}>Testimonies</Link>
          <Link href={`${baseURL}#contact`}>Contact</Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
