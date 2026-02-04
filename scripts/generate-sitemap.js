import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { SitemapStream, streamToPromise } from 'sitemap';

const DOMAIN = 'https://bar.ravstormdev.top';


const PAGE_GLOB = './src/pages/**/*.{jsx,tsx}';

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: DOMAIN });

  const files = glob.sync(PAGE_GLOB);

  files.forEach((file) => {
    let url = file
      .replace('./src/pages', '')
      .replace(/\.(jsx|tsx)$/, '')
      .replace(/\/index$/, '');

    if (url === '') url = '/';

    sitemap.write({
      url,
      changefreq: 'weekly',
      priority: url === '/' ? 1.0 : 0.8,
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap).then((data) =>
    data.toString()
  );

  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }

  fs.writeFileSync(path.resolve('./public/sitemap.xml'), xml);

  console.log('✅ sitemap.xml generated');
}

generateSitemap();
