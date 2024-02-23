import React from 'react';
import { client } from '../../../../sanity/lib/client';
import ProjectDetails from '@/app/components/ProjectDetails';
import { urlForImage } from '../../../../sanity/lib/image';
import { Metadata, ResolvingMetadata } from 'next';
import { File } from 'sanity';

type Project = {
  title: string;
  images: string[];
  skills: string[];
  body: any[];
  demoLink: string;
  gitLink: string;
  slug: { current: string };
};

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  project: Project;
  projects?: Project[];
};

async function getProjectData({ slug }: { slug: string }) {
  try {
    const query = `*[_type == "project" && slug.current == $slug][0]`;
    const project = await client.fetch(query, { slug });

    const convertImage = (image: File) => {
      return urlForImage(image);
    };

    project.images = project.images.map((image: File) => {
      return convertImage(image);
    });

    // The query already returns the first matched document or undefined if not found
    return { project };
  } catch (error) {
    console.error('Error fetching project data:', error);
    return { project: null };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await getProjectData({
    slug: params.slug,
  });

  return {
    title: project.title || 'Luna Cuevas',
    category: 'technology',
    openGraph: {
      images: [
        {
          url: project.images[0],
          alt: `Image for ${project.title}`,
        },
      ],
      title: project.title,
      description: `Description for ${
        project.title
      } | Tech Stack: ${project.skills.join(', ')}`,
      url: `https://www.luna-cuevas.com/projects/${project.slug.current}`,
      type: 'article',
      locale: 'en_US',
      siteName: "Luna's Portfolio",
    },
    twitter: {
      title: project.title,
      site: 'https://www.luna-cuevas.com/',
      card: 'summary_large_image',
      description: `Description for ${
        project.title
      } | Tech Stack: ${project.skills.join(', ')}`,
      images: [
        {
          url: project.images[0],
          alt: `Image for ${project.title}`,
        },
      ],
    },
    description: `Description for ${
      project.title
    } | Tech Stack: ${project.skills.join(', ')}`,
    metadataBase: new URL('https://www.luna-cuevas.com/'),
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

async function getData() {
  try {
    const projects = await client.fetch('*[_type == "project"]');
    return { projects };
  } catch (error) {
    console.error(error);
    return { project: null };
  }
}

const page = async ({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
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
