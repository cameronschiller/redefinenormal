// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Deployment is configured by environment, never hardcoded:
 *   SITE_URL   – full origin, e.g. https://username.github.io or https://your-domain.com
 *   BASE_PATH  – "/" for a custom domain or user site, "/repo-name" for a project page
 * The GitHub Actions workflow sets both from repository variables.
 */
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // Cast: @tailwindcss/vite and Astro can resolve different Vite type versions.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
  build: { inlineStylesheets: 'auto' },
});
