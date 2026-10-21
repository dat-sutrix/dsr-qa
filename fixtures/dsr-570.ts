import { pagePath } from './paths';
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };

// TD-570-01: demo page, layout only, not bound to catalog CF (Ngoc 10/15, DSR-570 comment 61054).
// Fallback only: the form TCs first try the overlay detail of TD-570-03 (/{lang}/library/catalog/qa190-cat-pdf-form, JOB-20261020-04).
export const formPath = (lang: Language) => `/master/${lang}/test-space/dsr-570-catalog-detail`;
// TD-570-02..04: list page shared with DSR-557.
export const listPath = (lang: Language) => pagePath('listCatalog', lang); // DSR-638: fixtures/paths.ts

// QA-seeded catalog CFs, re-seeded after the overlay merge (JOB-20261020-04): content CF /content/dam/common/{lang}/catalogs/{id}
// (fixtures/dsr-557.ts core). The card title is the CF's own title, resolved at run time by _path.
export const td = {
  pdf: { key: 'pdf', catalogId: 'qa190-cat-pdf', requiresForm: false }, // TD-570-02
  pdfForm: { key: 'pdfForm', catalogId: 'qa190-cat-pdf-form', requiresForm: true }, // TD-570-03
  ebookForm: { key: 'ebookForm', catalogId: 'qa190-cat-ebook-form', requiresForm: true }, // TD-570-04 ebook
} as const;

export const consentText = '個人情報';
export const submitText = 'ダウンロードする';
export const dateFormat = /^\d{4}\.\d{2}\.\d{2}$/;
export const japanese = /[぀-ヿ一-龯]/;
export const unknownId = '999999';

export const blockedData = (what: string) => `blocked-data: ${what}`;
