import { persisted } from './dsr-585';
import { languages, base, dsrPath, type Language } from './dsr-669';

// DSR-671 align CF related models (DM_*_dsr) and their consumers with the DM*dsr spec, baseline BL-671-1
// (tc-out/DSR-671.spec.json A1 = DSR-671 description). Read-only: publish GraphQL + EDS pages; Author model via tools/author (GET).
export { languages, base, dsrPath, type Language };

// TD-671-01/02/03 are created by lane chrome/author (Mon 26/10); TD-671-04 = existing data.
export const td = {
  product: '990671001', productLabel: '990671001｜QA671 product', // separator U+FF5C (A3)
  productOnlyInactive: '990671002', oracleProduct: '990586001',
  catalog: 'qa671-cat', existingCatalog: 'qa190-cat-pdf',
  inactiveCatalog: { id: 'qa654-inactive', title: 'QA654 inactive' },
  movie: 'qa587-main', inactiveMovie: { id: 'qa587-inactive', title: 'QA587 inactive' },
} as const;
export const blockedTd = (n: '01' | '02' | '03') => `Blocked-by TD-671-${n} (no data on DEV)`;
export const blockedCookie = 'Blocked-by Author cookie (HTTP 401) – Author model TC skipped (cookie)';

export const productPage = (lang: Language, id: string) => persisted(`dsr-product-page;path=${dsrPath(lang, 'products', id)}`);
export const catalogPage = (lang: Language, id: string) => persisted(`dsr-catalog-page;path=${dsrPath(lang, 'catalogs', id)}`);

// 11.0: DSR list → reference field + expected content-CF folder (DSR type folder → common type folder).
export const lists = (lang: Language) => [
  { name: 'dsr-product-list', url: persisted(`dsr-product-list;folder=/content/dam/dsr/${lang}/products/`), ref: 'product', dsr: `/content/dam/dsr/${lang}/products/`, common: `/content/dam/common/${lang}/products/` },
  { name: 'dsr-catalog-list', url: persisted(`dsr-catalog-list;folder=/content/dam/dsr/${lang}/`), ref: 'catalog', dsr: `/content/dam/dsr/${lang}/catalogs/`, common: `/content/dam/common/${lang}/catalogs/` },
  { name: 'dsr-video-list', url: persisted(`dsr-video-list;folder=/content/dam/dsr/${lang}/`), ref: 'movie', dsr: `/content/dam/dsr/${lang}/movies/`, common: `/content/dam/common/${lang}/movies/` },
] as const;

// Author models (TD-671-00), names as on /conf/ykk/settings/dam/cfm/models/.
export const dsrModels = ['DM_catalog_dsr', 'DM_product_dsr', 'DM_movie_dsr', 'DM_techmovie_dsr'] as const;
export const tagRoot = '/content/cq:tags';
export const articleRoot = /\/library\/article\/?$/; // [Giả định] A5
export const siteRoot = /^\/content\/sites\/digital-showroom\/?$/;

// Product detail page (overlay, product-detail block). Selectors observed on /en/products/productid-01x 2026-10-24.
// TODO: data-testid product-detail-related-card / product-detail-catalog-link
export const relatedCardSelector = 'main .product-detail a.pd-related-card';
export const catalogLinkSelector = 'main .product-detail a[href*="/library/catalog/"], main .product-detail a.pd-link-row:not(.pd-pdf-link)';
export const headingSelector = 'main .product-detail h2, main .product-detail h3';
