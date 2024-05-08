import Image from 'next/image';
import Cube from './components/Cube';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import TestimonialsSection from './components/TestimonialsSection';
import Contact from './components/Contact';
import { client } from '../../sanity/lib/client';
import ProgressBar from './components/ProgressBar';
import Head from 'next/head';

export default async function Home() {
  async function getData() {
    try {
      const projects = await client.fetch(
        '*[_type == "project"] | order(order asc)'
      );
      const experiences = await client.fetch(
        '*[_type == "experience"] | order(order asc)'
      );
      return { projects, experiences };
    } catch (error) {
      console.error(error);
      return { projects: [], experiences: [] };
    }
  }
  const { projects, experiences } = await getData();

  return (
    <main className="flex  px-[5vw] w-full  flex-col relative ">
      <ProgressBar />

      <div className="h-[calc(100vh-80px)] w-full overflow-hidden  mx-auto flex flex-col">
        <div className="absolute w-screen z-0 left-0 right-0 m-auto h-screen opacity-10">
          <Image
            src="/images/hero-bg.webp"
            alt="Luna's Portfolio"
            fill
            priority
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className=" z-10 w-full h-full flex flex-wrap flex-col md:flex-row mx-auto overflow-hidden">
          <div className=" my-auto w-full md:w-1/2 text-center ">
            <h1
              style={{
                textShadow: '2px 5px 3px rgb(238 114 238 / 84%)',
              }}
              className='text-6xl  md:text-8xl font-["spacerave"] text-[#cacdee]'>
              Luna <br />
              Cuevas
            </h1>{' '}
            <p className="text-white text-2xl">Full Stack Developer</p>
          </div>

          <div className="md:w-1/2 w-full flex justify-center h-[40vh] m-auto overflow-hidden">
            <Cube />
          </div>

          <div className="text-white flex  flex-col justify-center w-full  md:px-[25%]">
            <h3 className="text-4xl font-mono mx-0">Hi,</h3>
            <p className="my-2 font-light break-words">
              I&apos;m Luna, an experienced developer and designer. I specialize
              in building performant, accessible, and beautiful web applications
              using Next.js, Tailwind, and TypeScript.
            </p>
          </div>
        </div>
      </div>

      <SkillsSection />

      <ProjectsSection projects={projects.splice(0, 3)} />

      <ExperienceSection experiences={experiences} />

      <TestimonialsSection />

      <Contact />
    </main>
  );
}
