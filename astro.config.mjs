// @ts-check
import { writeFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SHOW_PROJECTS, SHOW_ABOUT_PAGE } from './src/data/features.mjs';

export default defineConfig({
  site: 'https://soundelectric.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && (SHOW_PROJECTS || !page.includes('/projects')) && (SHOW_ABOUT_PAGE || !page.includes('/about')),
    }),
    {
      name: 'hidden-pages-redirects',
      hooks: {
        // Cloudflare Workers static assets honor dist/_redirects. Only emit rules for
        // pages that are hidden, so turning a flag back on republishes the page.
        'astro:build:done': ({ dir }) => {
          const rules = [];
          if (!SHOW_PROJECTS) rules.push('/projects / 302', '/projects/ / 302');
          if (!SHOW_ABOUT_PAGE) rules.push('/about / 301', '/about/ / 301');
          if (rules.length) writeFileSync(new URL('_redirects', dir), rules.join('\n') + '\n');
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // Give the shared stylesheet a neutral name. Vite names it after the first page that
          // imports it (it was /_astro/about.*.css), which looks like an About link to a grep.
          assetFileNames: (asset) =>
            (asset.names?.[0] ?? asset.name ?? '').endsWith('.css') ? '_astro/site.[hash][extname]' : '_astro/[name].[hash][extname]',
        },
      },
    },
  },
});
