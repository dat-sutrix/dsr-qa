export const languages = ['ja', 'en', 'cn'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 }, SP: { width: 375, height: 812 } };
export const screenshotOptions = { maxDiffPixelRatio: 0.01 };
export const homePath = (lang: Language) => `/master/${lang}`;
export const testSpacePath = (lang: Language, suffix = '') => `${homePath(lang)}/test-space${suffix ? '/' + suffix : ''}`;
export function normalizeUrl(value: string, baseURL: string): string {
 const url = new URL(value, baseURL); url.pathname = url.pathname.replace(/\/+$/, '') || '/'; return url.href;
}
export const t1 = ['dsr552-bc', 'dsr552-bc/child', 'dsr552-bc/child/grandchild'];
export const t1Titles = ['QA Parent', 'QA Child', 'QA Grandchild'];
export const expectedTrail = (lang: Language, level: number) => ['HOME', lang === 'ja' ? 'test space' : 'test-space', ...t1Titles.slice(0, level + 1)];
export const expectedPaths = (lang: Language, level: number) => [homePath(lang), testSpacePath(lang), ...t1.slice(0, level + 1).map(s => testSpacePath(lang, s))];
