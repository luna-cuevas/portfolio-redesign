import { MetadataRoute } from 'next'
import { client } from '../../sanity/lib/client'

async function fetchDynamicPaths() {
  try {
    const query = `*[_type == "project"]{ "slug": slug.current }`;
    const projects = await client.fetch(query);

    // Correctly access the `slug` property for each project
    return projects.map((project: any) => `/projects/${project.slug.current}`);
  } catch (error) {
    console.error(error);
    return [];
  }
}

const dynamicPaths = await fetchDynamicPaths();


export default function sitemap(): MetadataRoute.Sitemap {

  const staticPaths = [
    '/',
    '',
  ];



  const combinedPaths = [...staticPaths, ...dynamicPaths];

  combinedPaths.map((path) => {
    return {
      url: path,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  })

  console.log(combinedPaths);



  return combinedPaths;

  // [
  //   {
  //     url: 'https://acme.com',
  //     lastModified: new Date(),
  //     changeFrequency: 'yearly',
  //     priority: 1,
  //   },
  //   {
  //     url: 'https://acme.com/about',
  //     lastModified: new Date(),
  //     changeFrequency: 'monthly',
  //     priority: 0.8,
  //   },
  //   {
  //     url: 'https://acme.com/blog',
  //     lastModified: new Date(),
  //     changeFrequency: 'weekly',
  //     priority: 0.5,
  //   },
  // ]
}