// Usage: node scripts/shots.mjs [baseUrl] [outDir]
import { chromium } from 'playwright-core';
import { SHOW_ABOUT_PAGE } from '../src/data/features.mjs';
const base = process.argv[2] || 'http://127.0.0.1:4321';
const out = process.argv[3] || '../redesign-shots';
const shots = [
  ['home-desktop-1440.png', '/', 1440, 900],
  ['home-mobile-390.png', '/', 390, 844],
  ['services-desktop-1440.png', '/services/', 1440, 900],
  ...(process.env.ALL ? [['projects-desktop-1440.png', '/projects/', 1440, 900], ...(SHOW_ABOUT_PAGE ? [['about-desktop-1440.png', '/about/', 1440, 900]] : []), ['contact-desktop-1440.png', '/contact/', 1440, 900], ['contact-mobile-390.png', '/contact/', 390, 844]] : []),
];
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', headless: true });
for (const [file, path, w, h] of shots) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1, isMobile: w < 500, hasTouch: w < 500 });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  // Grow the viewport to the full page height so fixed/sticky bars render at their true top/bottom positions.
  const full = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: w, height: full });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/${file}`, fullPage: true });
  console.log('saved', `${out}/${file}`);
  await ctx.close();
}
await browser.close();
