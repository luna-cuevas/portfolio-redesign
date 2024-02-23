'use client';
import React, { useEffect, useRef, useState } from 'react';
import CarouselPage from './Carousel';
import { useParams, useRouter } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {
  projects: {
    title: string;
    images: string[];
    skills: string[];
    body: any[];
    demoLink: string;
    gitLink: string;
    slug: { current: string };
  }[];
};

const ProjectDetails = (props: Props) => {
  const { projects } = props;
  const [viewProject, setViewProject] = useState('');
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', '50vh end'],
  });
  useEffect(() => {
    setViewProject(params.slug);
  }, []);

  return (
    <div
      className="h-[calc(100vh-80px)] w-full flex border-x-2 border-[#292040]"
      id="projects">
      <div
        className={`flex flex-col ${
          menuOpen ? 'w-2/3' : 'w-0 md:w-2/3'
        } transition-[width] duration-500 h-full absolute  z-[30000] bg-[#050716] md:relative  border-r-2 border-[#292040]`}>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className={`border-2  md:hidden border-[#bb84e8] bg-[#141625] rounded-full ${
            menuOpen ? 'left-[65%]' : 'left-0'
          } top-0 bottom-0 my-auto z-[30005] h-fit transition-all duration-500 fixed`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${menuOpen ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#bb84e8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          className={`flex flex-col ${
            menuOpen ? 'visible' : 'invisible md:visible'
          } justify-between z-[30000] items-center border-b border-[#bb84e8] md:px-4 py-4 `}>
          <h2 className="uppercase text-[#bb84e8] text-2xl font-bold tracking-wide">
            Projects
          </h2>
        </div>
        {projects.map((project) => {
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                router.replace(`/projects/${project.slug.current}`);
              }}
              key={project.title}
              className={`flex flex-col
                ${menuOpen ? 'visible' : 'invisible md:visible'}
                 justify-between items-center ${
                   viewProject === project.slug.current
                     ? 'bg-[#292040]'
                     : 'bg-transparent'
                 } border-b border-[#292040] md:px-4 py-4 `}>
              <h2 className="md:text-xl mb-2 text-base m-0 ">
                {project.title}
              </h2>
              <div>
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={100}
                  height={100}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
      <div
        className={`relative w-full transition-all duration-500  overflow-y-scroll scroll-shadows`}>
        <div
          className={`flex flex-col justify-between sticky z-[3000] bg-[#050716] top-0 items-center border-b border-[#bb84e8] md:px-4 py-4 `}>
          <h2 className="uppercase text-[#bb84e8] text-2xl font-bold tracking-wide">
            Description
          </h2>
        </div>
        {projects.map((project) => {
          if (viewProject === project.slug.current) {
            return (
              <motion.div
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                initial={{
                  y: 800,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                key={project.title}
                className="flex flex-col justify-center px-[5%] pb-4">
                <div className="flex flex-wrap w-full mx-auto ">
                  <div className="flex flex-col my-4 w-full">
                    <h2 className="md:text-2xl text-xl w-fit mx-auto mb-4">
                      {project.title}
                    </h2>
                    <ul className="flex gap-4 mx-auto flex-wrap">
                      {project.skills.map((skill) => {
                        return (
                          <li
                            style={{
                              borderImage:
                                'linear-gradient(to right, #4568dc, #b06ab3) 1 1 100%',
                            }}
                            className="border-2  text-xs"
                            key={skill}>
                            {skill}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="w-full h-[30vh]">
                  <CarouselPage
                    itemsPerSlide={1}
                    images={project.images.map((image) => {
                      return { src: image, alt: project.title };
                    })}
                  />{' '}
                </div>

                <div className="my-4">
                  <PortableText
                    components={{
                      block: ({ children }) => {
                        return <p className="my-4 font-light">{children}</p>;
                      },
                      list: ({ children }) => (
                        <ul className="list-disc list-inside ml-4">
                          {children}
                        </ul>
                      ),
                    }}
                    value={project.body}
                  />
                </div>

                <div className="flex items-center gap-4 mx-auto">
                  <button id="bn30" type="button">
                    <a href={project.demoLink}>View Site</a>
                  </button>
                  <button id="bn30" type="button">
                    <a href={project.gitLink}>
                      <Image
                        src="/images/skills/github.svg"
                        alt="Github Icon"
                        width={18}
                        height={18}
                      />
                    </a>
                  </button>
                </div>
              </motion.div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProjectDetails;
