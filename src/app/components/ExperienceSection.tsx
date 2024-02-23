'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PortableText } from '@portabletext/react';

type Props = {
  experiences: any[];
};

const ExperienceSection = (props: Props) => {
  const { experiences } = props;
  const experienceRef = useRef<HTMLDivElement>(null);
  const [openJobIndex, setOpenJobIndex] = useState<number | boolean>(false);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ['start end', '-10vh start'],
  });

  // Move useTransform hooks to the top level of the component
  const xInitial = useTransform(scrollYProgress, [0, 0.5], [-1000, 0]);
  const xFinal = useTransform(scrollYProgress, [0, 0.5], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [1000, 0]);

  const formattedDates = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    return `${start.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })} - ${
      end
        ? end.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })
        : 'Present'
    }`;
  };

  const toggleJob = (index: number) => {
    setOpenJobIndex(openJobIndex === index ? false : index);
  };

  return (
    <div
      id="experience"
      className="my-[10vh]  h-fit text-white w-full flex max-w-[1000px] flex-wrap mx-auto">
      <div
        ref={experienceRef}
        className="relative h-fit  flex justify-between w-full">
        <motion.div
          style={{
            x: xInitial,
            opacity: opacity,
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative">
          <h2 className="uppercase text-[#292040] text-5xl lg:text-9xl font-bold tracking-wide">
            Experience
          </h2>
          <p className="absolute text-right right-0 bottom-2 font-light hidden md:block md:w-2/3 text-base text-white">
            A Story of Growth, Learning, & Professional Development
          </p>
        </motion.div>
        <motion.div
          style={{
            x: xFinal,
            opacity: opacity,
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="my-auto hidden md:block">
          <Image
            src="/images/resume-icon.png"
            alt="Skills"
            width={80}
            height={80}
          />
        </motion.div>
      </div>
      <div className="w-full text-white mt-12">
        {experiences.map((job, index) => (
          <motion.div
            whileHover={{
              scale: 1.05,
              color: '#CACDED',
            }}
            style={{
              y: y,
              opacity: opacity,
            }}
            key={index}
            className={`pb-4 my-6 md:px-4 h-auto transition-[max-height] ease-in-out overflow-hidden duration-300 border-b border-white
          ${openJobIndex === index ? 'max-h-96' : 'max-h-24'}
           `}>
            <button
              className="flex flex-col sm:flex-row justify-between w-full align-middle"
              onClick={() => toggleJob(index)}>
              <div className="flex gap-2 justify-between w-full md:w-fit">
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

                <div className=" w-full md:w-fit flex-col justify-center md:justify-start text-center md:text-left mx-auto flex ">
                  <h3 className="md:text-2xl text-lg">{job.position}</h3>
                  <p>{job.company}</p>
                </div>
              </div>
              <p className="md:text-xl pl-[30px] text-base mx-auto md:mx-0">
                {formattedDates(job.startDate, job.endDate)}
              </p>
            </button>
            {openJobIndex === index && (
              <div className="my-4">
                <PortableText
                  components={{
                    list: ({ children }) => (
                      <ul className="list-disc list-inside ml-4">{children}</ul>
                    ),
                  }}
                  value={job.responsibilities}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
