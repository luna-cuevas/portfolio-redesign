import { MetadataRoute } from 'next'
import { client } from '../../sanity/lib/client'

async function fetchDynamicPaths() {
  try {
    const query = `*[_type == "project"]{ "slug": slug.current }`;
    const projects = await client.fetch(query);

    // Correctly access the `slug` property for each project
    return projects.map((project: any) => `/projects/${project.slug}`);
  } catch (error) {
    console.error(error);
    return [];
  }
}

var dynamicPaths = await fetchDynamicPaths();


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.luna-cuevas.com';

  const staticPaths = [
    '/',
    '',
  ];



  const combinedPaths = [...staticPaths, ...dynamicPaths];

  const formattedPaths = combinedPaths.map((path) => {
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  })

  console.log(formattedPaths);



  return combinedPaths;

}