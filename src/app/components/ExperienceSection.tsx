'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {};

const ExperienceSection = (props: Props) => {
  const experienceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ['start end', '-10vh start'],
  });

  const [openJobIndex, setOpenJobIndex] = useState<number | boolean>(false);

  const toggleJob = (index: number) => {
    setOpenJobIndex(openJobIndex === index ? false : index);
  };

  return (
    <div className="mt-[10vh] text-white w-full flex max-w-[1000px] flex-wrap mx-auto">
      <div
        ref={experienceRef}
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
            Experience
          </h2>
          <p className="absolute text-right right-0 bottom-2 font-light w-2/3 text-sm text-white">
            A Story of Growth, Learning, & Professional Development
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
            src="/images/resume-icon.png"
            alt="Skills"
            width={80}
            height={80}
          />
        </motion.div>
      </div>
      <div className="w-full text-white mt-12">
        {[1, 2, 3].map((job, index) => (
          <motion.div
            whileHover={{
              scale: 1.05,
              // i want the text to be changing color on hover like a gradient or something
              color: '#CACDED',
            }}
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [1000, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
            }}
            key={index}
            className={`pb-4 my-6 px-4 h-auto transition-[max-height] ease-in-out overflow-hidden duration-300 border-b border-white
          ${openJobIndex === index ? 'max-h-96' : 'max-h-24'}
           `}>
            <button
              className="flex justify-between w-full align-middle"
              onClick={() => toggleJob(index)}>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="m-auto"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  {openJobIndex !== index && (
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                  )}
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>

                <div className="text-left">
                  <h3 className="text-2xl">Position</h3>
                  <p>Company</p>
                </div>
              </div>
              <p className="text-xl">(2020 - 2021)</p>
            </button>
            {openJobIndex === index && (
              <ul className="px-4">
                {[1, 2, 3].map((experience, i) => (
                  <li key={i}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Porro repellendus excepturi dignissimos.
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
