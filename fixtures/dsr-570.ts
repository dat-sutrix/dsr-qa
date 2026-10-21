import { pagePath } from './paths';
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };

// TD-570-01: demo page, layout only, not bound to catalog CF (Ngoc 10/15, DSR-570 comment 61054).
export const formPath = (lang: Language) => `/master/${lang}/test-space/dsr-570-catalog-detail`;
// TD-570-02..04: list page shared with DSR-557.
export const listPath = (lang: Language) => pagePath('listCatalog', lang); // DSR-638: fixtures/paths.ts

// QA-seeded catalog CFs (title on page / catalogId in dm-catalog-list).
export const td = {
  pdf: { title: 'QA190 PDF catalog', catalogId: 'qa190-cat-pdf' }, // TD-570-02 requiresForm=false
  pdfForm: { title: 'QA190 PDF form required', catalogId: 'qa190-cat-pdf-form' }, // TD-570-03 requiresForm=true
  ebookForm: { title: 'QA190 e-book form', catalogId: 'qa190-cat-ebook-form' }, // TD-570-04 ebook, requiresForm=true
} as const;

export const consentText = '個人情報';
export const submitText = 'ダウンロードする';
export const dateFormat = /^\d{4}\.\d{2}\.\d{2}$/;
export const japanese = /[぀-ヿ一-龯]/;
export const unknownId = '999999';

export const blockedData = (what: string) => `blocked-data: ${what}`;
