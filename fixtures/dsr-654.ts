export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// DSR-654 catalog overlay (json2html), baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, catalog row).
// Host under test: BASE_URL (envs/<env>.env). Optional override DSR654_BASE (e.g. the .aem.page tier).
export const base = () => (process.env.DSR654_BASE || process.env.BASE_URL || '').replace(/\/$/, '');
// BL-OVL-1: preview publish → .aem.page, live publish → .aem.page + .aem.live.
export const hosts = () => {
  const b = base();
  return { page: b.replace('.aem.live', '.aem.page'), live: b.replace('.aem.page', '.aem.live') };
};
// BL-OVL-1 catalog URL: /{lang}/library/catalog/{id}, regex (?<=\/library\/catalog\/)(?!search$)([a-z0-9-]+)$.
export const catalogPath = (lang: string, id: string) => `/${lang}/library/catalog/${id}`;
export const searchPath = (lang: string) => `/${lang}/library/catalog/search`;
// CF related (DSR CF) folder; 1 content CF ⇒ 1 DSR CF with the same id (Martin 2026-10-20 09:29).
export const dsrCfPath = (lang: string, id: string) => `/content/dam/dsr/${lang}/catalogs/${id}`;

// TD ids from the DSR-654 TC sheet (ykk-dsr/hub/tc-out/DSR-654.spec.json, TestData).
// TD-654-01 = the 4 core catalogs of TD-190-CAT-CORE, same id and values for ja and en.
// Titles from fixtures/dsr-557.ts / dsr-570.ts; catalogType / requiresForm / ebookUrl from TD-654-01.
export const coreTdId = 'TD-654-01';
export const ebookUrl = 'https://www.ykkfastening.com/';
export const td = {
  pdf: { id: 'qa190-cat-pdf', title: 'QA190 PDF catalog', catalogType: 'pdf', requiresForm: false },
  pdfForm: { id: 'qa190-cat-pdf-form', title: 'QA190 PDF form required', catalogType: 'pdf', requiresForm: true },
  ebook: { id: 'qa190-cat-ebook', title: 'QA190 e-book', catalogType: 'ebook', requiresForm: false },
  ebookForm: { id: 'qa190-cat-ebook-form', title: 'QA190 e-book form', catalogType: 'ebook', requiresForm: true },
} as const;
export type TdKey = keyof typeof td;
export const tdKeys = Object.keys(td) as TdKey[];

// TD-654-02..08 (negative / lifecycle data). 02 exists in ja and en, the others in en only (A7).
export const td654 = {
  inactive: { tdId: 'TD-654-02', id: process.env.DSR654_INACTIVE_ID || 'qa654-inactive', title: 'QA654 inactive', langs: ['ja', 'en'] },
  removed: { tdId: 'TD-654-03', id: process.env.DSR654_REMOVED_ID || 'qa654-removed', title: 'QA654 removed', langs: ['en'] },
  preview: { tdId: 'TD-654-04', id: 'qa654-preview', title: 'QA654 preview', langs: ['en'] },
  // DSR CF stored in /content/dam/dsr/en/catalogs/qa654-folder/ (directory-strict negative).
  sub: { tdId: 'TD-654-05', id: 'qa654-sub', folder: 'qa654-folder', title: 'QA654 subfolder', langs: ['en'] },
  contentOnly: { tdId: 'TD-654-06', id: 'qa654-content-only', title: 'QA654 content only', langs: ['en'] },
  update: { tdId: 'TD-654-07', id: 'qa654-update', title: 'QA654 update', langs: ['en'] },
  contentUnpub: { tdId: 'TD-654-08', id: 'qa654-content-unpub', title: 'QA654 content unpublished', langs: ['en'] },
} as const;

// Preflight skip reason: TD page 404 where 200 is expected (job rule: skip, never fail).
export const notSeeded = (tdId: string, id: string) => `${tdId} not seeded (${id})`;
// Negative TDs expect 404, so a missing seed cannot be told apart from the publish tier.
export const seedUnverifiable = (tdId: string) => `${tdId}: expected 404 cannot prove the TD is seeded; QA-PT Night Report confirms the seed`;

export const siteTitleSuffix = ' | YKK DIGITAL SHOWROOM';
export const listPath = (lang: string) => `/${lang}/library/catalog`;
export const redirectWaitMs = 3_000;
export const graphqlPattern = /graphql|execute\.json/i;
export const indexPath = '/query-index.json';
export const dateFormat = /^\d{4}\.\d{2}\.\d{2}$/;
export const formPending = 'Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form';
export const manualPending = 'Manual – QA-PT';
export const visualPending = 'Visual – codex job';
export const sitemapPath = '/sitemap.xml';
export const htmlLang: Record<Language, string> = { ja: 'ja', en: 'en' };
export const cnPending = 'Issue #18: no /cn path on DEV';
