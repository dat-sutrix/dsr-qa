export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// DSR-503 product detail URL rule /{lang}/products/{id} (delivered through DSR-586 overlay, spec.json A1).
// BL-OVL-1 Update 2026-10-21: id = DSR CF node name (lowercase letters, digits, "-"), not a numeric product-id (A2 superseded).
export const base = () => (process.env.DSR503_BASE || process.env.BASE_URL || '').replace(/\/$/, '');
export const productPath = (lang: string, id: string) => `/${lang}/products/${id}`;

// Publish persisted query = CF oracle for product code/name (read-only, same query as DSR-585).
export const publishBase = () => (process.env.DSR_PUBLISH || 'https://publish-p192812-e2014374.adobeaemcloud.com').replace(/\/$/, '');
export const productPageQuery = (lang: Language, id: string) =>
  `${publishBase()}/graphql/execute.json/ykk/dsr-product-page;path=/content/dam/dsr/${lang}/products/${id}`;

// TD-503-01/02: howto #1 allows existing published products. Defaults observed on DEV 2026-10-24 (200 on .live, ja+en):
// 46 = Z15-1 / QUICKFIT®, 135 = ABC-123. Override with DSR503_ID1 / DSR503_ID2.
export const td = {
  '01': { id: process.env.DSR503_ID1 || '46' },
  '02': { id: process.env.DSR503_ID2 || '135' },
  '03': { id: '999999' }, // must not exist (howto #2)
} as const;

// 6.0 malformed variants of TD-503-01 (A3: 404; A4: trailing slash 404 or 301 to canonical, recorded).
export const malformed = (id: string) => ({
  alpha: '/ja/products/abc',
  leadingZero: `/ja/products/0${id}`,
  trailingSlash: `/ja/products/${id}/`,
  upperLang: `/JA/products/${id}`,
});

export const reloads = 2; // 3.0: reload each URL twice
export const blockedCn = 'Blocked: cn path not on DEV (Issue #18, A5)';
export const blockedList = 'Blocked: product list page on DEV linking to product detail not confirmed (Q20, Quentin)';
export const blockedAuthor = 'Manual: Author UI (agents read-only, no Author access)';
