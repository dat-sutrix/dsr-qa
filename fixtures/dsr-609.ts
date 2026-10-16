export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 }, SP: { width: 390, height: 844 } } as const;
// Top page per DSR-609 description (Assumption A5). No /master prefix on this site.
export const topPath = (lang: Language) => `/${lang}/top-page`;
// JOB-20261015-13: try BASE_URL (.aem.live) first; on 404 fall back to .aem.page and record which host served the page.
export const hosts = (baseURL: string) => [baseURL, baseURL.replace('.aem.live', '.aem.page')].filter((h, i, a) => a.indexOf(h) === i);
// DSR-TOP-004: keyword from the job ("e.g. zipper"); the only form submitted by this suite.
export const searchKeyword = 'zipper';
// DSR-TOP-005: RECOMMEND CONTENTS card limit (BAC, max 4) and aspect-ratio tolerance.
export const recommendMax = 4;
export const ratioTolerance = 0.01;
// DSR-TOP-006: index path named by the TC (step 3), and number of news shown.
export const newsIndexPath = (lang: Language) => `/${lang}/news/query-index.json`;
export const newsPrefix = (lang: Language) => `/${lang}/news/`;
export const newsCount = 3;
// DSR-TOP-007: title line limits (PC 2 lines, SP 1 line).
export const titleLineLimit = { PC: 2, SP: 1 } as const;
// DSR-TOP-008: empty index used by the route mock (job text, verbatim).
export const emptyIndex = { data: [], total: 0, offset: 0, limit: 0 };
// DSR-TOP-008: console errors present on every page load and unrelated to NEWS (recorded, not asserted).
export const knownConsoleNoise = [/\/placeholders\.json/];

// Publish date of an index row in ms (ISO string or epoch seconds); null when empty.
export function publishTime(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  const s = String(value);
  if (/^\d+$/.test(s)) return Number(s) * 1000;
  const t = Date.parse(s);
  return Number.isNaN(t) ? null : t;
}
