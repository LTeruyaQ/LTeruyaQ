# Leandro Teruya — Portfolio Site

Terminal/hacker-themed, bilingual (PT/EN) personal portfolio. Built with
**[Astro](https://astro.build) + React islands**, recreated from a Claude Design
handoff prototype.

## Stack
- **Astro** (static output) + **@astrojs/react** for the interactive island
- Plain CSS (`src/styles/styles.css`) — design tokens in `:root`
- No backend; the contact form is a front-end mock (wire it to a service later)

## Features
- Terminal **boot intro** sequence (skippable; replays via the `▶_` nav button)
- Mouse-reactive **particle network** canvas + scanline/vignette FX
- **PT/EN** language toggle (persisted in `localStorage`)
- Glitch + scramble text, kinetic marquees, animated counters
- **Draggable** tech board (affinity stars) and Netflix-style **project carousel**
- Career **timeline**, Badge Union callout, contact section

## Develop
```bash
cd site
npm install
npm run dev      # http://localhost:4321
```

## Build
```bash
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Content
All copy and data (i18n strings, skills, experience, projects, socials) live in
`src/data/content.js`. The hero photo is `src/assets/hero.png`.

## Deploy (GitHub Pages — optional)
If you deploy as a **project** site (`lteruyaq.github.io/<repo>/`), set `site`
and `base` in `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://lteruyaq.github.io',
  base: '/LTeruyaQ',
  integrations: [react()],
});
```
For a dedicated `lteruyaq.github.io` repo, no `base` is needed.
