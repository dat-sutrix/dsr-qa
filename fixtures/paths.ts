// DSR-638 (JOB-ZZ-IDLE-22): ja test-space / root list pages move to public paths; old paths go 404.
// Single map of the affected page paths. Default = old path (no behaviour change);
// DSR_PATHS=v2 switches to the new path. DSR-638 covers ja only: en keeps the old path in both modes.
export type PathLang = 'ja' | 'en';
type Move = { old: (lang: PathLang) => string; v2: string };

export const pathsVersion = process.env.DSR_PATHS === 'v2' ? 'v2' : 'v1';

export const pathMoves = {
  listCatalog: { old: lang => `/master/${lang}/test-space/list-catalog`, v2: '/ja/library/catalog' },
  videoList: { old: lang => `/master/${lang}/test-space/video-list`, v2: '/ja/library/video/search' },
  productList: { old: lang => `/master/${lang}/test-space/product-list`, v2: '/ja/product/performance/sustainable/product-index' },
  articleList: { old: lang => `/master/${lang}/test-space/article-list`, v2: '/ja/library/article' },
  actualCases: { old: lang => `/master/${lang}/test-space/actual-cases`, v2: '/ja/product/application/industrial/actual-cases' },
  productSearch: { old: lang => `/${lang}/product-list`, v2: '/ja/product/search' },
  searchCondition: { old: lang => `/${lang}/search-condition`, v2: '/ja/product/select' },
} satisfies Record<string, Move>;

export type PathKey = keyof typeof pathMoves;

export const pagePath = (key: PathKey, lang: PathLang): string =>
  pathsVersion === 'v2' && lang === 'ja' ? pathMoves[key].v2 : pathMoves[key].old(lang);
