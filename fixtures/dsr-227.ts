export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// TD-227-08 / BL-OVL-1: product pages = DEV query-index rows matching /{lang}/products/<digits>.
// DEV 2026-10-19 (JOB-ZZ-IDLE-12): /query-index.json has 134 rows, none under /{lang}/products/<digits>.
export const indexPath = '/query-index.json';
export const productPath = (lang: Language) => new RegExp(`^/${lang}/products/(\\d+)$`);
// A7 / TD-227-02 fallback: overlay test page on Martin's branch (aem.page preview). /ja/ variant tried as well (howto #4).
export const fallbackBase = 'https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page';
export const fallbackUrl = (lang: Language) => `${fallbackBase}/${lang}/products/46`;
// TD-227-02: 3 sample migrated products (#1 any, #2 .webp source, #3 with PDF). Override: DSR227_SAMPLE_IDS=12,34,56
// TODO: sample ids from dev
export const sampleIds = (): string[] => (process.env.DSR227_SAMPLE_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
export const maxPages = 50; // 16.0

// TCC#1 naming rule, tested per path segment after the DAM root (decoded, so %20 / %C2%AE count as violations).
export const namingRule = /^[a-z0-9-]+(\.[a-z0-9]+)?$/;
// DAM roots: AEM DAM path, and Dynamic Media delivery /is/{image,content}/<company>/ (observed s7ap1.scene7.com/is/image/YKKCORPORATIONDEV).
export const damRoots = [/\/content\/dam\//, /\/is\/(?:image|content)\/[^/]+\//];
// 9.0: images must not come from the legacy site or the pre-migration sample folder.
export const legacyDomain = 'ykkdigitalshowroom.com';
export const sampleFolder = '/content/dam/ykk/common/products/product-sample';

// 12.0 viewports.
export const pc = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
export const sp = { viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
export const upscaleTolerance = 0.9;

export const noProductPage = 'DSR-227 no product page on DEV';
export const baselineOnly = 'blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict';
export const indexEmpty = 'blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict';
export const noWebpSample = 'blocked-data: no .webp-source image identified (TD-227-02 #2, DSR-457)';
export const noPdf = 'blocked-data: no PDF link on the page (TD-227-02 #3)';
export const noSameProduct = 'blocked-data: no product id published in both ja and en';
