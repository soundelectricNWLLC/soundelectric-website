# Sound Electric: commercial redesign prototype

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
- `src/data/site.ts`: business facts (phone, email, license), service-area list, service copy, industries, FAQ. The public name is Sound Electric. `legalName` is Sound Electric NW LLC, used only as JSON-LD `legalName` and in the copyright line.
- `src/data/features.mjs`: `SHOW_PROJECTS`, `SHOW_TESTIMONIAL`, `SHOW_OWNER_BIO`, and `SHOW_JOB_SITE_PHOTO` (all `false` until real content exists)
- `src/data/projects.ts`: project cards (**all placeholders**; not rendered while `SHOW_PROJECTS` is false)
- `src/components/Panelboard.astro`: original SVG illustration of a commercial bolt-on panelboard, PRL1a-style (deadfront and interior modes)
- `src/layouts/Base.astro`: SEO meta, Open Graph and Twitter tags, plus Electrician JSON-LD (no street address, areaServed Greater Seattle Area plus the city list)
- `public/`: favicon.svg/png, apple-touch-icon, og-image.png, robots.txt. The sitemap comes from @astrojs/sitemap.

## Industries
Home (`/#industries`) and Services list the industries in `src/data/site.ts`. Dental clinics and veterinary clinics are specialties. Offices, restaurants, and service work are the other entries.

## Needs real content before launch
- Project cards (Home + /projects): real job photos, city or neighborhood, year, scope, then set `SHOW_PROJECTS` to `true` in `src/data/features.mjs`
- Testimonial block (Home): a real client quote, used with permission, then set `SHOW_TESTIMONIAL` to `true` in `src/data/features.mjs`
- Owner bio (/about): verifiable facts, then set `SHOW_OWNER_BIO` to `true` in `src/data/features.mjs`
- Job-site photo (/about): a real photo of Jeremiah or the crew, then set `SHOW_JOB_SITE_PHOTO` to `true` in `src/data/features.mjs`
- Confirm the service-area city list in `src/data/site.ts`
- Confirm the FAQ answers (scheduling around business hours, GC/PM work, permits)
- Replace the panelboard illustrations with Jeremiah's own photos of PRL1a installs, if wanted

## Quote form (/contact)
- Sent from the browser straight to Web3Forms (`https://api.web3forms.com/submit`, fetch + JSON, no page reload). Submissions email jeremiah@soundelectric.com.
- Settings live in `src/data/forms.ts` (endpoint, public access key, subject, from name `Sound Electric Website`). Regenerate it with
  `WEB3FORMS_ACCESS_KEY=... node scripts/set-web3forms-key.mjs`. Web3Forms keys are public by design.
- Fields: name, company, email, phone, project_type (sent as the readable label), message. `replyto` is set to the visitor's email.
- Spam: Web3Forms server-side filtering plus the hidden `botcheck` honeypot. Optional upgrades: hCaptcha (free) or Turnstile (Web3Forms Pro).
- If you ever add a Content-Security-Policy, it must allow `connect-src https://api.web3forms.com` (and `form-action` for the no-JS fallback).

## Imagery
No stock photos are used. All art is original inline SVG and CSS. Icons come from Lucide (ISC license) through `lucide-static`.
Fonts are Inter and Space Grotesk (SIL OFL), self-hosted through @fontsource.
Free-license photo search (2026-10-01) for commercial bolt-on panelboards:
- Wikimedia Commons: "File:Eaton_circuit_breaker_panel_open.JPG" (CC BY-SA 3.0) and "File:Electrical_panel_opened.jpg" (CC BY-SA 4.0).
  Both are **residential plug-on load centers**, so they were rejected.
- Unsplash and Pexels ("breaker panel", "panelboard"): only DIN-rail/European boards, industrial control panels or residential panels. No PRL1a-style panelboard, so nothing was used.
