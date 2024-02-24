const fs = require('fs');
const path = require('path');
const { client } = require('../../../sanity/lib/client');

// Base URL of your site
const BASE_URL = 'https://www.luna-cuevas.com/';

// Static paths (add your static routes here)
const staticPaths = ['', '/'];

// Function to fetch dynamic paths from Sanity (for example, project slugs)
async function fetchDynamicPaths() {
  const query = `*[_type == "project"]{ "slug": slug.current }`;
  const projects = await client.fetch(query);
  return projects.map((project) => `/projects/${project.slug}`);
}

// Function to generate sitemap.xml content
function generateSitemapContent(paths) {
  const urlSet = paths
    .map((path) => {
      return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`;
}

// Main function to generate the sitemap
async function generateSitemap() {
  const dynamicPaths = await fetchDynamicPaths();
  const allPaths = staticPaths.concat(dynamicPaths);
  const sitemapContent = generateSitemapContent(allPaths);

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap.xml'),
    sitemapContent
  );
  console.log('Sitemap generated!');
}

generateSitemap().catch(console.error);
