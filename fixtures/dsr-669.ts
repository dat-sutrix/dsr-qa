import { pagePath } from './paths';
import { persisted } from './dsr-585';

// DSR-669 CF related model rename DM_*_related → DM_*_dsr (GraphQL dm*DsrList, 8 persisted queries).
// Spec ids from ykk-dsr/hub/tc-out/DSR-669.spec.json (baseline BL-669-1 = spec.json A1). Read-only: publish GraphQL + EDS only.
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

export const base = () => (process.env.BASE_URL || '').replace(/\/$/, '');

// TD-669-01: existing QA CFs (DSR CF node name = URL id, BL-OVL-1).
export const td = { movie: 'qa587-main', product: '990586001', catalog: 'qa190-cat-pdf', inactiveProduct: '990586008' } as const;
export const dsrPath = (lang: Language, type: 'movies/standard' | 'products' | 'catalogs', id: string) => `/content/dam/dsr/${lang}/${type}/${id}`;

// 9.0: the 8 persisted queries. video-detail / product-detail take no language (video-detail ignores params) → same request ja/en.
// kind: page = aliases `related` + `inactive`; list = alias `related` ≥ 1 item; detail = content list + dm*DsrList.
export type QueryKind = 'page' | 'list' | 'detail';
export const queries = (lang: Language): { name: string; kind: QueryKind; url: string; qaItem: string }[] => [
  { name: 'dsr-video-page', kind: 'page', url: persisted(`dsr-video-page;path=${dsrPath(lang, 'movies/standard', td.movie)}`), qaItem: dsrPath(lang, 'movies/standard', td.movie) },
  { name: 'dsr-video-list', kind: 'list', url: persisted(`dsr-video-list;folder=/content/dam/dsr/${lang}/`), qaItem: dsrPath(lang, 'movies/standard', td.movie) },
  { name: 'video-detail', kind: 'detail', url: persisted('video-detail'), qaItem: td.movie }, // items have no _path: movieId (not per language)
  { name: 'dsr-product-page', kind: 'page', url: persisted(`dsr-product-page;path=${dsrPath(lang, 'products', td.product)}`), qaItem: dsrPath(lang, 'products', td.product) },
  { name: 'dsr-product-list', kind: 'list', url: persisted(`dsr-product-list;folder=/content/dam/dsr/${lang}/products/`), qaItem: dsrPath(lang, 'products', td.product) },
  { name: 'product-detail', kind: 'detail', url: persisted(`product-detail;productId=${td.product}`), qaItem: `/content/dam/common/${lang}/products/${td.product}` },
  { name: 'dsr-catalog-page', kind: 'page', url: persisted(`dsr-catalog-page;path=${dsrPath(lang, 'catalogs', td.catalog)}`), qaItem: dsrPath(lang, 'catalogs', td.catalog) },
  { name: 'dsr-catalog-list', kind: 'list', url: persisted(`dsr-catalog-list;folder=/content/dam/dsr/${lang}/`), qaItem: dsrPath(lang, 'catalogs', td.catalog) },
];
export const inactiveProductQuery = (lang: Language) => persisted(`dsr-product-page;path=${dsrPath(lang, 'products', td.inactiveProduct)}`);

// 10.0 / 11.0: names that must be gone after the rename.
export const oldNames = /dm(Movie|Product|Catalog)RelatedList|dm_(movie|product|catalog)_related|DM_(movie|product|catalog)_related/;
export const oldQueryRequest = /\/graphql\/execute\.json\/ykk\/[^;?]*-related/;
export const blockScripts = ['product-detail', 'video-detail', 'catalog-detail', 'related-product'].map(b => `/blocks/${b}/${b}.js`);

// Overlay URLs (BL-OVL-1).
export const overlayPages = (lang: Language) => [
  { type: 'movies/standard' as const, id: td.movie, path: `/${lang}/library/video/${td.movie}`, block: 'video-detail' },
  { type: 'products' as const, id: td.product, path: `/${lang}/products/${td.product}`, block: 'product-detail' },
  { type: 'catalogs' as const, id: td.catalog, path: `/${lang}/library/catalog/${td.catalog}`, block: 'catalog-detail' },
];
export const robotsMeta = /<meta name="robots" content="([^"]*)"/;
export const rawRow = (key: string) => new RegExp(`<div>\\s*${key}\\s*</div>\\s*<div>\\s*([^<]*?)\\s*</div>`);

// 13.0 lists. Product list: ja = paths.ts productList (DSR-638 v1/v2), en = /en/product-list (paths.ts productSearch;
// /master/en/test-space/product-list is 404 on DEV 24/10) – [Giả định] JOB-20261024-04.
export const lists = (lang: Language) => [
  { name: 'video', path: `/${lang}/library/video/search` },
  { name: 'catalog', path: `/${lang}/library/catalog` },
  { name: 'product', path: lang === 'ja' ? pagePath('productList', lang) : pagePath('productSearch', lang) },
];
// Card = listing card (`data-card-id`) or product-list card (`.pl-card`, id on the favourite button).
export const cardSelector = 'main .listing .cards > ul > li, main .product-list li.pl-card';
export const unableToLoad = /Unable to load/i;
// Pre-669 card ids per list (oracle spec.json A2). None recorded before the deploy (ledger.json keeps pass/fail only;
// overlay-before-669.json has no card ids) → 13.0 id/count comparison is Pending until a pre-669 list is provided.
export const preListIds: Record<string, string[] | undefined> = {};

// 15.0 / 16.0 preflight.
// TD-669-02: republish time (ISO) written by lane author/chrome into the job input, passed as DSR669_REPUBLISHED_AT.
export const republishedAt = () => process.env.DSR669_REPUBLISHED_AT || '';
export const blockedTd02 = 'Blocked-by TD-669-02 (republish by lane author/chrome, no republish time in job input)';
export const td03 = { id: 'qa669-new', title: 'QA669 new catalog' } as const;
export const blockedTd03 = 'Blocked-by TD-669-03 (qa669-new not published)';
