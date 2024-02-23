import React from 'react';
import { client } from '../../../../sanity/lib/client';
import ProjectDetails from '@/app/components/ProjectDetails';
import { urlForImage } from '../../../../sanity/lib/image';
import { File } from 'sanity';

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

async function getData() {
  try {
    const projects = await client.fetch('*[_type == "project"]');
    return { projects };
  } catch (error) {
    console.error(error);
    return { project: null };
  }
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { projects } = await getData();

  const convertImage = (image: File) => {
    return urlForImage(image);
  };
  const formattedProjects = projects.map((project: { images: File[] }) => {
    return {
      ...project,
      images: project.images.map((image: File) => {
        return convertImage(image);
      }),
    };
  });

  return (
    <main className="flex min-h-[90vh] mx-auto max-w-[1200px] overflow-hidden  text-white  relative flex-wrap">
      <ProjectDetails projects={formattedProjects} />
    </main>
  );
};

export default page;
