import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {
  project: number;
  index: number;
};

const ProjectCard = (props: Props) => {
  const { index } = props;
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
      className="flex text-white rounded-xl my-6 py-6 bg-[#141625] w-full justify-between px-[10%]">
      <div className="w-1/2">
        <h2 className="text-3xl gap-2 flex">
          <span className="text-[#bb84e8]">0{index + 1}</span>
          Project Card
        </h2>
        <p className="my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante.
        </p>
        <div className="flex gap-4 my-2">
          <p>Stack:</p>
          <ul className="flex gap-4">
            <li>Skill</li>
            <li>Skill</li>
            <li>Skill</li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button id="bn30" type="button">
            <a href="#">View Site</a>
          </button>
          <button id="bn30" type="button">
            <a href="#">View Code</a>
          </button>
        </div>
      </div>
      <div>
        <Image
          src="/images/tech-icon.png"
          alt="Skills"
          width={50}
          height={50}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
