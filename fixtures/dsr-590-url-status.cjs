// DSR-590 JOB-ZZ-IDLE-11: read-only HTTP status of the 11 eco-friendly URLs (TOP + 9 details + finder) in ja/en,
// both prefixes (A1). Record only, no verdict – tells QA when the pages land.
// Usage: ENV=dev node fixtures/dsr-590-url-status.cjs  → markdown table on stdout
const path = require('path');
const ENV = process.env.ENV || 'dev';
require('dotenv').config({ path: path.resolve(__dirname, '..', 'envs', `${ENV}.env`), quiet: true });
const base = (process.env.BASE_URL || '').replace(/\/$/, '');
const slugs = ['', 'recycled', 'water-saving', 'renewal', 'bio-based', 'bluesign-approved', 'circularity',
  'sustainable-metal-finish', 'natural-fiber', 'non-plated', 'sustainable-solution-finder'];

(async () => {
  console.log(`Checked (UTC): ${new Date().toISOString()} · ${base}\n`);
  console.log('| # | Page | ja | en | /master/ja | /master/en |');
  console.log('|---:|---|---|---|---|---|');
  for (const [i, slug] of slugs.entries()) {
    const cells = [];
    for (const prefix of ['/ja', '/en', '/master/ja', '/master/en']) {
      const r = await fetch(`${base}${prefix}/product/performance/sustainable${slug ? '/' + slug : ''}`, { redirect: 'manual' });
      cells.push(r.status >= 300 && r.status < 400 ? `${r.status} → ${r.headers.get('location')}` : String(r.status));
    }
    console.log(`| ${i + 1} | ${slug ? `…/sustainable/${slug}` : '/{lang}/product/performance/sustainable (TOP)'} | ${cells.join(' | ')} |`);
  }
})();
