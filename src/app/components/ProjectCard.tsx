'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { File } from 'sanity';
import { urlForImage } from '../../../sanity/lib/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  project: {
    title: string;
    images: File[];
    skills: string[];
    body: any[];
    demoLink: string;
    gitLink: string;
    slug: { current: string };
  };
  index: number;
};

const ProjectCard = (props: Props) => {
  const { project, index } = props;
  const { title, skills, body, demoLink, gitLink, images, slug } = project;

  const imageURLs = images.map((image: File) => {
    return urlForImage(image);
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', '50vh end'],
  });

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: useTransform(scrollYProgress, [0, 0.5], [1000, 0]),
        opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
      }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-wrap text-white rounded-xl my-6 py-6 bg-[#141625] w-full justify-between px-6">
      <div className="md:w-1/2 w-full">
        <Link className="cursor-pointer flex w-fit" href={`/projects/${title}`}>
          <h2 className="text-3xl gap-2 flex w-fit">
            <span className="text-[#bb84e8]">0{index + 1}</span>
            {title}
          </h2>
        </Link>

        <Link
          className="cursor-pointer w-full flex md:hidden my-4"
          href={`/projects/${slug.current}`}>
          <div className="relative w-full h-[20vh]">
            <Image
              src={imageURLs[0] || '/images/placeholder.png'}
              alt="Project Image"
              fill
              objectPosition="top left"
              className="rounded-xl object-cover"
              sizes=" (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
        <PortableText
          components={{
            block: ({ children }) => {
              return <p className="my-4 font-light">{children}</p>;
            },
            list: ({ children }) => (
              <ul className="list-disc list-inside ml-4">{children}</ul>
            ),
          }}
          value={body.slice(0, 1)}
        />
        <div className="flex gap-4 my-4">
          <ul className="flex gap-4 flex-wrap justify-center mx-auto">
            {skills.map((skill, index) => (
              <li
                style={{
                  borderImage:
                    'linear-gradient(to right, #4568dc, #b06ab3) 1 1 100%',
                }}
                className="border-2 text-sm"
                key={index}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 mx-auto w-fit">
          <button id="bn30" type="button">
            <Link href={`/projects/${slug.current}`}>View More</Link>
          </button>
          <button id="bn30" type="button">
            <Link href={demoLink}>View Site</Link>
          </button>
          <button id="bn30" type="button">
            <Link href={gitLink}>
              <Image
                src="/images/skills/github.svg"
                alt="Github Icon"
                width={20}
                height={20}
              />
            </Link>
          </button>
        </div>
      </div>
      <Link
        className="cursor-pointer relative h-full  w-full md:w-[45%] hidden md:block text-center"
        href={`/projects/${slug.current}`}>
        <Image
          src={imageURLs[0] || '/images/placeholder.png'}
          alt="Project Image"
          className="object-cover"
          objectPosition="top left"
          fill
        />
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
