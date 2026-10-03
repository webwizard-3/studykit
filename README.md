# StudyKit

Free, fast calculators and study tools for students, built with React + Vite.
Every tool runs entirely in the browser — no backend, no accounts.

## What's inside

- 20 tools (calculators, timers, planners, text utilities) under `src/pages/tools/`
- Shared layout, search, SEO and ad-placeholder components under `src/components/` and `src/layouts/`
- A single tool registry (`src/data/tools.js`) driving navigation, search and the sitemap
- `public/robots.txt`, `public/sitemap.xml` (auto-generated), `public/site.webmanifest`, `public/favicon.svg`

## Before you deploy

Search the project for `TODO` and `.example` — a few placeholders need real
values before going live:

- `src/components/Seo.jsx` — `SITE_URL`
- `scripts/generate-sitemap.mjs` — `SITE_URL`
- `public/robots.txt` — the `Sitemap:` line
- `src/pages/Contact.jsx` — `CONTACT_EMAIL`
- `src/pages/Privacy.jsx` — the analytics/advertising placeholder sections, once you know what you're actually using

## Commands

- `npm install` — install dependencies (only needed once, or after changing dependencies)
- `npm run dev` — start the local dev server
- `npm run build` — create a production build in `dist/` (also regenerates `public/sitemap.xml` first)
- `npm run preview` — serve the production build locally, to sanity-check it before deploying
- `npm run lint` — check the code for obvious issues

See the full setup walkthrough in the chat this project was built in for
exact step-by-step terminal instructions.
