// @ts-check
import { writeFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SHOW_PROJECTS } from './src/data/features.mjs';

export default defineConfig({
  site: 'https://soundelectric.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && (SHOW_PROJECTS || !page.includes('/projects')),
    }),
    {
      name: 'hide-projects-redirect',
      hooks: {
        // Cloudflare Workers static assets honor dist/_redirects. Only emit it
        // while projects are hidden, so turning SHOW_PROJECTS back on republishes the page.
        'astro:build:done': ({ dir }) => {
          if (SHOW_PROJECTS) return;
          writeFileSync(new URL('_redirects', dir), '/projects / 302\n/projects/ / 302\n');
        },
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
