import Image from 'next/image';
import Cube from './components/Cube';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import TestimonialsSection from './components/TestimonialsSection';
import Contact from './components/Contact';
import { sanityClient } from './utils/sanityClient';
import ProgressBar from './components/ProgressBar';

export default async function Home() {
  async function getData() {
    try {
      const data = await sanityClient.fetch('*[_type == "project"]');

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const projectsData = await getData();

  return (
    <main className="flex min-h-screen overflow-hidden px-[5vw]  relative flex-wrap">
      <ProgressBar />

      <div className="h-screen max-w-[1000px] mx-auto flex flex-wrap">
        <div className="absolute w-screen z-0 left-0 right-0 m-auto h-screen opacity-10">
          <Image
            src="/images/hero-bg.webp"
            alt="Luna's Portfolio"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className=" z-10 flex flex-wrap mx-auto">
          <div className="m-auto w-1/2">
            <h1
              style={{
                textShadow: '2px 5px 3px rgb(238 114 238 / 84%)',
              }}
              className='text-7xl md:text-8xl font-["spacerave"] text-[#cacdee]'>
              Luna <br />
              Cuevas
            </h1>{' '}
            <p className="text-white text-2xl">Front End Developer</p>
          </div>

          <div className="w-1/2 h-[40vh] m-auto">
            <Cube />
          </div>

          <div className="text-white w-full px-[25%]">
            <h3 className="text-4xl font-mono">Hi,</h3>
            <p className="my-2 font-light ">
              I'm Luna, an experienced developer and designer. I specialize in
              building performant, accessible, and beautiful web applications
              using Next.js, Tailwind, and TypeScript.
            </p>
          </div>
        </div>
      </div>

      <SkillsSection />

      <ProjectsSection projects={projectsData} />

      <ExperienceSection />

      <TestimonialsSection />

      <Contact />
    </main>
  );
}
