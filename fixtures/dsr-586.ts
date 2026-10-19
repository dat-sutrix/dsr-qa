export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// Host under test: BASE_URL (envs/<env>.env). Optional override DSR586_BASE (branch test page, Martin 16/10):
// DSR586_BASE=https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
export const base = () => (process.env.DSR586_BASE || process.env.BASE_URL || '').replace(/\/$/, '');
// BL-OVL-1: preview publish → .aem.page, live publish → .aem.page + .aem.live. Same branch/site, other tier.
export const hosts = () => {
  const b = base();
  return { page: b.replace('.aem.live', '.aem.page'), live: b.replace('.aem.page', '.aem.live') };
};
// BL-OVL-1 product URL: /{lang}/products/{id} (no /master prefix; regex (?<=/products/)([0-9]+)$).
export const productPath = (lang: Language, id: string) => `/${lang}/products/${id}`;
export const productsRoot = (lang: Language) => `/${lang}/products/`;

// DSR-586 TestData sheet (spec.json testdata). QA ids 990586xxx (A3). en copy of TD-586-01 = same id and values (sheet: "en, cn copies").
export const td = {
  '01': { id: '990586001', name: 'QA586 product A', code: 'QA586-A', description: 'QA586 description for SEO check' },
  '02': { id: '990586002', name: 'QA586 product B', code: 'QA586-B' },
  '05': { id: 'qa586-alpha', name: 'QA586 alpha' },
  '06': { id: '990586006', subfolder: 'qa586' },
  '07': { id: '990586007' },
  '08': { id: '990586008' },
  '09': { id: '990586009' },
  '11': { id: '990586011' },
} as const;
export const notSeeded = (tdId: string) => `TD-586-${tdId} not seeded`;

// Negative TCs (6.0, 7.0, 11.0, 5.0 alpha step) expect 404, so a 404 cannot prove the data exists.
// QA-PT confirms seeding via DSR586_SEEDED=06,07,11,05 (comma list of TD numbers); otherwise the TC/step is skipped.
export const seeded = (tdId: string) => (process.env.DSR586_SEEDED || '').split(',').map(s => s.trim().replace(/^TD-586-/, '')).includes(tdId);

export const descriptionPrefix = 30; // 3.0: first 30 chars of the description
export const settleMs = 2_000; // 4.0: network idle + 2 s
export const redirectWaitMs = 3_000; // 8.0 / 9.0: wait 3 s, record final URL
export const graphqlPattern = /graphql|execute\.json/i;
export const indexPath = '/query-index.json'; // DEV 2026-10-19: only root index exists (/ja/query-index.json 404)
export const sitemapPath = '/sitemap.xml';
export const htmlLang: Record<Language, string> = { ja: 'ja', en: 'en' };

// 17.0: DSR-585 項目fix版 display / removed field labels. Empty until the fix list review closes (Q27) – TC skips while empty.
export const fixedDisplayFields: string[] = [];
export const removedFieldLabels: string[] = [];
export const fixListPending = 'DSR-585 項目fix版 field list not in repo (Q27 review open)';
