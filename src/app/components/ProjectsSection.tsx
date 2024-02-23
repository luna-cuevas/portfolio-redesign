'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ProjectCard from './ProjectCard';
import { File } from 'sanity';
import Link from 'next/link';

type Project = {
  title: string;
  images: File[];
  skills: string[];
  body: any[];
  demoLink: string;
  gitLink: string;
  slug: { current: string };
};

type Props = {
  projects: Project[];
};

const ProjectsSection = (props: Props) => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress: projectsScrollYProgress } = useScroll({
    target: projectsRef,
    offset: ['start end', '-25vh start'],
  });

  const { scrollYProgress: buttonScrollYProgress } = useScroll({
    target: buttonRef,
    offset: ['start end', '-25vh start'],
  });

  // Animation for the projects element
  const projectsX = useTransform(projectsScrollYProgress, [0, 0.5], [-1000, 0]);
  const projectsOpacity = useTransform(
    projectsScrollYProgress,
    [0.3, 0.5],
    [0, 1]
  );

  // Animation for the button element
  const buttonY = useTransform(buttonScrollYProgress, [0.3, 0.5], [200, 0]);
  const buttonOpacity = useTransform(buttonScrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div className="my-[10vh]  h-fit w-full flex max-w-[1000px] flex-wrap mx-auto">
      <div
        ref={projectsRef}
        className="relative h-fit  flex justify-between w-full">
        <motion.div
          style={{
            x: projectsX,
            opacity: projectsOpacity,
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative">
          <h2 className="uppercase text-[#292040] text-5xl lg:text-9xl font-bold tracking-wide">
            Projects
          </h2>
          <p className="absolute text-right right-0 bottom-2 font-light hidden md:block md:w-2/3 text-base text-white">
            Featured work and Project Showcase{' '}
          </p>
        </motion.div>
        <motion.div
          style={{
            x: useTransform(projectsScrollYProgress, [0, 0.5], [1000, 0]),
            opacity: useTransform(projectsScrollYProgress, [0.3, 0.5], [0, 1]),
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="my-auto hidden md:block">
          <Image
            src="/images/code-icon.png"
            alt="Skills"
            width={70}
            height={70}
          />
        </motion.div>
      </div>
      <div className=" w-full flex flex-col ">
        {props.projects.map((project, index) => (
          <ProjectCard project={project} key={index} index={index} />
        ))}
      </div>
      <motion.div
        style={{
          y: buttonY,
          opacity: buttonOpacity,
        }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex justify-center mx-auto">
        <button ref={buttonRef} id="bn30" type="button" className="text-white ">
          <Link
            href={`
          /projects/${props.projects[0].slug.current}
          `}>
            View All Projects
          </Link>
        </button>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
