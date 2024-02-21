'use client';
import React, { useRef, useState } from 'react';

import { skillsData } from '../data/skillsData';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ProjectCard from './ProjectCard';
type Props = {
  projects: object[];
};

const ProjectsSection = (props: Props) => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ['start end', '-25vh start'],
  });
  console.log('projects', props.projects);
  return (
    <div className="mt-[10vh]  w-full flex max-w-[1000px] flex-wrap mx-auto">
      <div
        ref={projectsRef}
        className="relative h-fit  flex justify-between w-full">
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 0.5], [-1000, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative">
          <h2 className="uppercase text-[#292040] text-8xl font-bold tracking-wide">
            Projects
          </h2>
          <p className="absolute text-right right-0 bottom-2 font-light w-2/3 text-sm text-white">
            Featured work and Project Showcase{' '}
          </p>
        </motion.div>
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 0.5], [1000, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="my-auto">
          <Image
            src="/images/code-icon.png"
            alt="Skills"
            width={70}
            height={70}
          />
        </motion.div>
      </div>
      <div className="min-h-screen w-full mt-[10vh]">
        {[1, 2, 3, 4].map((project, index) => (
          <ProjectCard project={project} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
