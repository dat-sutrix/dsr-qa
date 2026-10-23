export const languages = ['en', 'ja'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };
// Page under test is a fixture value. Default = dev page created from the new news-detail template (JOB-ZZ-IDLE-37);
// the old dsr-357-news-detail page uses the removed news-detail block. QA pages: DSR566_SLUG=qa566-news-01 npm run test:dev -- tests/news-detail
export const newsSlug = process.env.DSR566_SLUG || 'test-news-detail-template';
export const newsPath = (lang: Language) => `/master/${lang}/test-space/${newsSlug}`;
// DSR-NEWS-010: pages authored without CTA (TD-566-02) must show no button (TC 10.0, JOB-20261023-22).
export const noCtaSlugs: readonly string[] = ['qa566-news-02'];
export const expectsCta = !noCtaSlugs.includes(newsSlug);
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
// DSR-NEWS-003: shown date format for every language (DSR-660 rule, Dat 22/10).
export const dateFormat = /^\d{4}\.\d{2}\.\d{2}$/;
// DSR-NEWS-008: news list page per language (TD-566-03 must live under it).
export const newsListPath = (lang: Language) => `/${lang}/news`;
// Normalizes a displayed or ISO date to YYYY-MM-DD; null when no date is found.
export function isoDate(text: string | null | undefined): string | null {
  const m = text?.match(/(\d{4})[.\-/年](\d{1,2})[.\-/月](\d{1,2})/);
  return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : null;
}
