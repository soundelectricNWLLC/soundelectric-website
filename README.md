# Sound Electric NW: commercial redesign prototype

Standalone Astro 5 + Tailwind CSS v4 static site.

## Deploy

The live site is the Cloudflare Worker `soundelectric`, which serves the static assets in `dist/`. Configuration is `wrangler.jsonc`.

```bash
npm run build
npx wrangler deploy
```

To upload a version first and deploy that version separately: `npx wrangler versions upload`, then `npx wrangler versions deploy`.

Build with Node.js 22. Astro 5 needs Node.js 18.20.8+, 20.3+, or 22+.

`public/_headers` sends `X-Robots-Tag: noindex` only on `*.pages.dev` and `*.workers.dev` hosts. Those rules do not apply on soundelectric.com.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview
node scripts/make-assets.mjs   # regenerate favicons + og-image (needs `npm run preview` running)
node scripts/shots.mjs         # full-page screenshots to ../redesign-shots (ALL=1 for every page)
```

Uses Playwright-core with the system Chrome at `/usr/bin/google-chrome`. Override it with `CHROME=/path`.

## Where things live
- `src/data/site.ts`: business facts (phone, email, license), service-area list, service copy, FAQ
- `src/data/projects.ts`: project cards (**all placeholders**)
- `src/components/Panelboard.astro`: original SVG illustration of a commercial bolt-on panelboard, PRL1a-style (deadfront and interior modes)
- `src/layouts/Base.astro`: SEO meta, Open Graph and Twitter tags, plus Electrician JSON-LD (no street address, areaServed Seattle/King County)
- `public/`: favicon.svg/png, apple-touch-icon, og-image.png, robots.txt. The sitemap comes from @astrojs/sitemap.

## Needs real content before launch
- Project cards (Home + /projects): real job photos, city or neighborhood, year, scope
- Testimonial block (Home): a real client quote, used with permission, or delete the block
- Owner bio and team or job-site photo (/about)
- Confirm the service-area city list in `src/data/site.ts`
- Confirm the FAQ answers (scheduling around business hours, GC/PM work, permits)
- Replace the panelboard illustrations with Jeremiah's own photos of PRL1a installs, if wanted

## Not wired
- Quote form (/contact) is UI only. Connect it to a Cloudflare Pages Function or Worker (e.g. send through Resend or MailChannels),
  Formspree or Web3Forms, and add Cloudflare Turnstile. Then remove `data-prototype`, the "Prototype · not wired" tag and the submit stub script.

## Imagery
No stock photos are used. All art is original inline SVG and CSS. Icons come from Lucide (ISC license) through `lucide-static`.
Fonts are Inter and Space Grotesk (SIL OFL), self-hosted through @fontsource.
Free-license photo search (2026-10-01) for commercial bolt-on panelboards:
- Wikimedia Commons: "File:Eaton_circuit_breaker_panel_open.JPG" (CC BY-SA 3.0) and "File:Electrical_panel_opened.jpg" (CC BY-SA 4.0).
  Both are **residential plug-on load centers**, so they were rejected.
- Unsplash and Pexels ("breaker panel", "panelboard"): only DIN-rail/European boards, industrial control panels or residential panels. No PRL1a-style panelboard, so nothing was used.
