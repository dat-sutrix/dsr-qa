export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// A1 (URL design P076–P087): TOP /{lang}/product/performance/sustainable, fallback /master/{lang}/….
// DEV 2026-10-19 (JOB-ZZ-IDLE-11): every TOP / detail / finder URL 404 in ja and en, both prefixes.
const root = '/product/performance/sustainable';
const prefixes = (lang: string) => [`/${lang}`, `/master/${lang}`];
// JOB-20261019-08: C14 demo page (Ngoc, Jira 61343/61370, 19/10) first, then URL-design paths (A1). ja 200, en 404 on 2026-10-19.
export const topDemoPath = (lang: string) => `/master/${lang}/test-space/dsr-590-eco-top-page`;
export const topPaths = (lang: string) => [topDemoPath(lang), ...prefixes(lang).map(p => `${p}${root}`)];
// Language prefix of a resolved path: /ja or /master/ja (demo and URL-design paths differ).
export const langPrefix = (path: string) => path.match(/^(\/master)?\/(ja|en|zh|cn)(?=\/)/)?.[0] ?? '';
export const detailPaths = (lang: string, slug: string) => prefixes(lang).map(p => `${p}${root}/${slug}`);
// JOB-20261022-04: C15 demo page (Ngoc, Jira DSR-590 21/10) – demo data only, layout check only.
export const detailDemoPath = (lang: string) => `/master/${lang}/test-space/dsr-590-eco-detail-page`;
// Demo pages carry placeholder content: content-value TCs skip there (JOB-20261022-04).
export const isDemo = (path: string) => path.includes('/test-space/');
export const demoData = 'demo data (Ngọc 21/10)';
// 4.0: finder page P087 (S10).
export const finderSlug = 'sustainable-solution-finder';
export const finderPaths = (lang: string) => detailPaths(lang, finderSlug);

// TD-590-02 (A3): 9 categories of the URL design P078–P086, in URL-design order. Figma shows 8 dots / 9 cards (Q37 open).
export const categorySlugs = [
  'recycled', 'water-saving', 'renewal', 'bio-based', 'bluesign-approved',
  'circularity', 'sustainable-metal-finish', 'natural-fiber', 'non-plated',
] as const;

// TD-590-03: detail page リサイクル (recycled). Spec: "if missing use any published detail" → resolved at runtime.
export const td03 = { slug: 'recycled', tag: 'recycled', name: { ja: 'リサイクル', en: 'Recycled' } as Record<Language, string> };
// TD-590-06: detail slug whose tag has 0 products ("find existing"). Not identified yet → DSR590_TD06=<slug>.
export const td06 = () => process.env.DSR590_TD06 || null;

// A6 / Q14 default: product query-index candidates; first 200 wins. Tag column taken from the index header.
// DEV 2026-10-19: all three 404 (only the site /query-index.json exists; it lists pages, not products).
export const productIndexPaths = (lang: Language) => [`/${lang}/products/query-index.json`, `/${lang}/query-index.json?sheet=products`, `/products_${lang}.json`];
export const tagColumnPattern = [/eco/i, /sustainab/i, /^tags?$/i];

// BL-OVL-1 product URL.
export const productHref = (lang: Language) => new RegExp(`/${lang}/products/(\\d+)$`);
export const legacyDomain = 'ykkdigitalshowroom.com';
// 12.0: code-bundled paths (Fail) vs DAM delivery (Q19 pattern).
export const codePaths = /\/(blocks|styles|icons|scripts)\//;
export const damPattern = /\/media_[0-9a-f]+|\/content\/dam\/|dynamicmedia|\/adobe\/assets\/|scene7/i;
export const emptyFrameMaxPx = 40; // 9.0
export const htmlLang: Record<Language, string> = { ja: 'ja', en: 'en' };

export const pageMissing = 'DSR-590 page not on DEV';
export const topMissing = (lang: string) => `${lang} demo page not on DEV`;
export const detailMissing = 'detail page not on DEV';
export const finderNotBuilt = 'finder page (S10) not built';
// A3 / Q37: count mismatch is a note, not a fail (JOB-20261019-08).
export const countNote = 'Q37 count';
export const dotsNote = 'Q37 8 dots/9 cards';
export const finderMissing = 'Blocked: finder page (S10) not built – owner Ngoc';
export const indexMissing = 'blocked-data: product query-index (Q14) not found';
export const tagMissing = 'blocked-data: no eco tag column in product query-index (DSR-585 fix版)';
export const td06Missing = 'blocked-data: TD-590-06 detail with 0 products not identified; set DSR590_TD06=<slug>';
export const cnMissing = 'cn: no /master/cn on DEV (Issue #18)';
