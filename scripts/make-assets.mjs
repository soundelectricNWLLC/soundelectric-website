// Generates favicon PNGs and the 1200x630 og-image from the running preview server.
// Usage: node scripts/make-assets.mjs [baseUrl]
import sharp from 'sharp';
import { chromium } from 'playwright-core';
const base = process.argv[2] || 'http://127.0.0.1:4321';
await sharp('public/favicon.svg', { density: 384 }).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp('public/favicon.svg', { density: 768 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp('public/favicon.svg', { density: 768 }).resize(512, 512).png().toFile('public/icon-512.png');

const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  const panel = document.querySelector('figure svg')?.outerHTML ?? '';
  const logo = document.querySelector('header a')?.innerHTML ?? '';
  document.body.className = 'bg-night-900';
  document.body.innerHTML = `
  <div style="width:1200px;height:630px;position:relative;overflow:hidden" class="bg-night-900">
    <div class="bg-grid mask-radial" style="position:absolute;inset:0"></div>
    <div style="position:absolute;right:-120px;top:-160px;width:640px;height:640px;border-radius:9999px;background:rgba(255,217,26,.16);filter:blur(80px)"></div>
    <div style="position:absolute;left:72px;top:64px">${logo}</div>
    <div style="position:absolute;left:72px;top:170px;width:680px">
      <p class="eyebrow">Licensed · Bonded · Insured · WA ${'SOUNDEN771M6'}</p>
      <h1 class="font-display text-white" style="font-size:72px;line-height:1.02;font-weight:600;margin-top:22px">Commercial electrician in <span class="text-gradient">Seattle</span>.</h1>
      <p style="margin-top:26px;font-size:24px;color:#cbd5e1">Tenant improvements · Build-outs · LED retrofits · Panel upgrades · EV charging</p>
      <p style="margin-top:34px;font-size:30px;font-weight:700;color:#ffd91a" class="font-display">(425) 971-7987</p>
    </div>
    <div style="position:absolute;right:56px;top:40px;width:370px">${panel}</div>
  </div>`;
});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: 'public/og-image.png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('assets done');
