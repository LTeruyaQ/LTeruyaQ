import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// The whole portfolio is a single highly-interactive React island
// (boot sequence, particle canvas, draggable boards, localStorage i18n),
// so it is mounted with `client:only="react"` in src/pages/index.astro.
// SEO-relevant metadata lives in the .astro page <head>.
//
// If you deploy to GitHub Pages as a *project* site (lteruyaq.github.io/<repo>/),
// set `site` and `base` accordingly, e.g.:
//   site: 'https://lteruyaq.github.io', base: '/LTeruyaQ'
export default defineConfig({
  integrations: [react()],
});
