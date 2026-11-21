import type { APIRoute } from 'astro';
import { site } from '../config/site';

export const GET: APIRoute = ({ site: origin }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = new URL(`${base}/sitemap-index.xml`, origin).href;
  // While review mode is on, keep the draft out of search engines.
  const body = site.reviewMode
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
