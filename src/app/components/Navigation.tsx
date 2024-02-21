import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav className="flex justify-between px-[10%] py-4">
      <div className="relative">
        <Image
          src="/images/luna-logo.png"
          alt="Luna's Portfolio"
          width={50}
          height={50}
        />
      </div>
      <ul className="flex gap-4 text-white">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="#experience">Experience</Link>
        </li>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="#testimonies">Testimonies</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
