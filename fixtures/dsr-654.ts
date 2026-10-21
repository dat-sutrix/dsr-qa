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

// TD-190 catalog ids (PLAN-sprint12 TD-190-CAT-NEW), same id and values for ja and en (assumed).
// Titles from fixtures/dsr-557.ts / dsr-570.ts; catalogType / requiresForm from TD-570-02..04 and DSR-557.
export const td = {
  pdf: { id: 'qa190-cat-pdf', title: 'QA190 PDF catalog', catalogType: 'pdf', requiresForm: false },
  pdfForm: { id: 'qa190-cat-pdf-form', title: 'QA190 PDF form required', catalogType: 'pdf', requiresForm: true },
  ebook: { id: 'qa190-cat-ebook', title: 'QA190 e-book', catalogType: 'ebook', requiresForm: false },
  ebookForm: { id: 'qa190-cat-ebook-form', title: 'QA190 e-book form', catalogType: 'ebook', requiresForm: true },
} as const;
export type TdKey = keyof typeof td;
export const tdKeys = Object.keys(td) as TdKey[];
export const notSeeded = (id: string) => `TD-190 ${id} not seeded / not published to this tier`;

// Negative data not in TD-190 yet. TODO(TC job): TD ids for isActive = false and unpublished DSR CF.
export const inactiveId = process.env.DSR654_INACTIVE_ID || null;
export const removedId = process.env.DSR654_REMOVED_ID || null;
export const negativePending = (what: string) => `${what}: no TD id yet (set ${what === 'isActive=false' ? 'DSR654_INACTIVE_ID' : 'DSR654_REMOVED_ID'} once seeded)`;

export const siteTitleSuffix = ' | YKK DIGITAL SHOWROOM';
export const listPath = (lang: string) => `/${lang}/library/catalog`;
export const redirectWaitMs = 3_000;
export const graphqlPattern = /graphql|execute\.json/i;
export const indexPath = '/query-index.json';
export const htmlLang: Record<Language, string> = { ja: 'ja', en: 'en' };
export const cnPending = 'Issue #18: no /cn path on DEV';
