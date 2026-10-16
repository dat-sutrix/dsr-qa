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
export const testSpaceLabel = (lang: Language) => lang === 'ja' ? 'test space' : 'test-space';
// T2 label tree (JOB-20261016-01; QA-PT seed 2026-10-15). Grandchild has no display name, so it falls back to its title.
export const t2 = ['dsr552-label', 'dsr552-label/child', 'dsr552-label/child/grandchild'];
export const t2Titles: Record<'ja' | 'en', string[]> = { ja: ['QAラベル親', 'QAラベル子', 'QAラベル孫'], en: ['QA Label Parent', 'QA Label Child', 'QA Label Grandchild'] };
export const t2Labels: Record<'ja' | 'en', string[]> = { ja: ['親ラベル', '子ラベル', ''], en: ['EN Parent Label', 'EN Child Label', ''] };
export const t2Trail = (lang: 'ja' | 'en') => ['HOME', testSpaceLabel(lang), t2Labels[lang][0], t2Labels[lang][1], t2Titles[lang][2]];
// T3 edge tree (ja only). Values copied from the TC Excel "Test Data" sheet; enter exactly as written.
export const t3Long = { parent: 'dsr552-edge/long', leaf: 'dsr552-edge/long/leaf', label: '長い表示名テスト'.repeat(12) + '長い表示', leafTitle: 'QA Long Leaf' };
export const t3Special = { parent: 'dsr552-edge/special', leaf: 'dsr552-edge/special/leaf', label: '<b>QA</b> & "Test" ® <script>alert(1)</script>', leafTitle: 'QA Special Leaf' };
export const t3Trail = (edge: typeof t3Long) => ['HOME', 'test space', 'QA Edge', edge.label, edge.leafTitle];
