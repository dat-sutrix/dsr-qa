// DSR-638 JOB-ZZ-IDLE-22: read-only HTTP status of old/new page paths (fixtures/paths.ts) on .aem.page and .aem.live,
// plus the top-level blocks inside <main> (raw EDS HTML). Record only, no verdict.
// Usage: ENV=dev node fixtures/dsr-638-path-status.cjs  → markdown table on stdout
const path = require('path');
const ENV = process.env.ENV || 'dev';
require('dotenv').config({ path: path.resolve(__dirname, '..', 'envs', `${ENV}.env`), quiet: true });
const live = (process.env.BASE_URL || '').replace(/\/$/, '');
const preview = live.replace('.aem.live', '.aem.page');
// Keep in sync with fixtures/paths.ts (pathMoves).
const moves = [
  ['list-catalog', l => `/master/${l}/test-space/list-catalog`, l => `/${l}/library/catalog`],
  ['video-list', l => `/master/${l}/test-space/video-list`, l => `/${l}/library/video/search`],
  ['product-list', l => `/master/${l}/test-space/product-list`, l => `/${l}/product/performance/sustainable/product-index`],
  ['article-list', l => `/master/${l}/test-space/article-list`, l => `/${l}/library/article`],
  ['actual-cases', l => `/master/${l}/test-space/actual-cases`, l => `/${l}/product/application/industrial/actual-cases`],
  ['/{lang}/product-list', l => `/${l}/product-list`, l => `/${l}/product/search`],
  ['/{lang}/search-condition', l => `/${l}/search-condition`, l => `/${l}/product/select`],
];
const skip = new Set(['metadata', 'section-metadata']);
// Main block = first block that is not a page title.
const main = bs => bs.find(b => b.split(' ')[0] !== 'title');
// Blocks = class of divs at depth 2 under <main> (main > section div > block div).
function blocks(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) return [];
  const out = []; let depth = 0;
  for (const t of m[1].matchAll(/<(\/?)div([^>]*)>/g)) {
    if (t[1]) { depth--; continue; }
    depth++;
    const cls = (t[2].match(/class="([^"]+)"/) || [])[1];
    if (depth === 2 && cls) { const b = cls.trim().replace(/\s+/g, ' '); if (!skip.has(b.split(' ')[0]) && !out.includes(b)) out.push(b); }
  }
  return out;
}
async function probe(base, p) {
  try {
    const res = await fetch(base + p, { redirect: 'manual' });
    const loc = res.headers.get('location');
    const html = res.status === 200 ? await res.text() : '';
    return { status: res.status + (loc ? ` →${loc.replace(base, '')}` : ''), blocks: blocks(html) };
  } catch (e) { return { status: `ERR ${e.message}`, blocks: [] }; }
}
(async () => {
  console.log(`Checked (UTC): ${new Date().toISOString()} · ${preview} / ${live}\n`);
  console.log('| Page | lang | old path | old .page | old .live | old blocks (.live, else .page) | new path | new .page | new .live | new blocks (.live, else .page) | same main block |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  for (const [name, oldP, newP] of moves) for (const l of ['ja', 'en']) {
    const [op, ol, np, nl] = await Promise.all([probe(preview, oldP(l)), probe(live, oldP(l)), probe(preview, newP(l)), probe(live, newP(l))]);
    const ob = ol.blocks.length ? ol.blocks : op.blocks, nb = nl.blocks.length ? nl.blocks : np.blocks;
    const same = !ob.length || !nb.length ? 'n/a' : (main(ob) === main(nb) ? `yes (${main(ob)})` : main(ob)?.split(' ')[0] === main(nb)?.split(' ')[0] ? `same block, variant differs (${main(ob)} vs ${main(nb)})` : `no (${main(ob)} vs ${main(nb)})`);
    console.log(`| ${name} | ${l} | ${oldP(l)} | ${op.status} | ${ol.status} | ${ob.join(', ') || '–'} | ${newP(l)} | ${np.status} | ${nl.status} | ${nb.join(', ') || '–'} | ${same} |`);
  }
})();
