export const languages = ['en', 'ja'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };
// Page under test is a fixture value. First pass: dev-authored page; QA pages qa566-* (TD-566-01) arrive 2026-10-16.
// Override per run without code change: DSR566_SLUG=qa566-news-01 npm run test:dev -- tests/news-detail
export const newsSlug = process.env.DSR566_SLUG || 'dsr-357-news-detail';
export const newsPath = (lang: Language) => `/master/${lang}/test-space/${newsSlug}`;
// DSR-NEWS-007: the two index locations named in JOB-20261015-09 (tc-questions Q2 open).
export const queryIndexPaths = (lang: Language) => [`/master/${lang}/query-index.json`, `/master/${lang}/news/query-index.json`];
// Recorded only (not asserted): the site-wide index observed on DEV 2026-10-15.
export const rootQueryIndex = '/query-index.json';
export const indexFields = ['publishDate', 'category', 'tags', 'template'] as const;
// Expected href suffix of Back to list (TCC#3); target page status is not asserted (A3).
export const backToListSuffix = (lang: Language) => `/${lang}/news/`;
export const backToListName = /back to list|一覧へ戻る/i;
export const myListName = /my ?list|マイリスト/i;
export const relatedPattern = /related|関連/i;
export const seoMeta = ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]', 'meta[property="og:image"]'] as const;
// Normalizes a displayed or ISO date to YYYY-MM-DD; null when no date is found.
export function isoDate(text: string | null | undefined): string | null {
  const m = text?.match(/(\d{4})[.\-/年](\d{1,2})[.\-/月](\d{1,2})/);
  return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : null;
}
