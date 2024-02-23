'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { skillsData } from '../data/skillsData';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {};

const SkillsSection = (props: Props) => {
  const [skillHovered, setSkillHovered] = useState<string | null>('');
  const skillsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: skillsRef,
    offset: ['start end', '-25vh start'],
  });

  return (
    <div
      id="skills"
      className="pt-[10vh] overflow-hidden flex max-w-[1000px] flex-col mx-auto">
      <div ref={skillsRef} className="relative  flex justify-between w-full">
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 0.5], [-1000, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          }}
          transition={{
            duration: 3,
            delay: 0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative">
          <h2 className="uppercase text-[#292040] text-5xl md:text-9xl font-bold tracking-wide">
            Skills
          </h2>
          <p className="absolute text-right right-0 bottom-2 font-light hidden md:flex md:w-2/3 text-sm text-white">
            My current areas of proficiency and focus of technologies include:
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
            src="/images/tech-icon.png"
            alt="Skills"
            width={50}
            height={50}
          />
        </motion.div>
      </div>

      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 0.5], [1000, 0]),
          opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex my-8 mx-auto justify-center flex-wrap gap-8">
        {skillsData.map((skill, index) => (
          <button
            onMouseEnter={() => {
              setSkillHovered(skill.name);
            }}
            onMouseLeave={() => {
              setSkillHovered('');
            }}
            key={index}
            id="bn30"
            style={{}}
            className={`flex relative border-2 align-middle w-[125px] h-[125px] border-white justify-between my-4 text-white`}>
            {skillHovered == skill.name ? (
              <h3 className="z-20  align-middle flex m-auto text-lg text-center">
                {skill.name}
              </h3>
            ) : (
              <div className="m-auto  p-4">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={60}
                  height={60}
                  className="z-0"
                  style={{
                    filter:
                      skill.name == 'NextJS' || skill.name == 'Shopify'
                        ? 'invert(100%)'
                        : 'none',
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsSection;
