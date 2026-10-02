// Writes the public Web3Forms access key into src/data/forms.ts from the WEB3FORMS_ACCESS_KEY env var.
// Usage: WEB3FORMS_ACCESS_KEY=... node scripts/set-web3forms-key.mjs
// The key is designed to be public (it is embedded in the contact page HTML), but this script never prints it.
import { writeFileSync } from 'node:fs';
const key = (process.env.WEB3FORMS_ACCESS_KEY || '').trim();
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key)) {
  console.error('WEB3FORMS_ACCESS_KEY is missing or not a UUID; nothing written.');
  process.exit(1);
}
const out = `// Web3Forms (https://web3forms.com) settings for the /contact quote form.
// The access key is public by design: Web3Forms keys are meant to be embedded in client-side HTML.
// Regenerate with: node scripts/set-web3forms-key.mjs
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY = '${key}';
export const QUOTE_SUBJECT = 'New quote request — soundelectric.com';
export const QUOTE_FROM_NAME = 'Sound Electric Website';
`;
writeFileSync(new URL('../src/data/forms.ts', import.meta.url), out);
console.log('Wrote src/data/forms.ts (key length ' + key.length + ')');
