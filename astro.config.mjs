// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Custom apex domain served from GitHub Pages, so `site` is the bare domain
// and `base` stays at the default `/`.
export default defineConfig({
  site: 'https://bridgeappsllc.com',
});
