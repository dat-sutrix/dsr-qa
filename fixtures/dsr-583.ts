import { pagePath } from './paths';
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
// Pages under test (JOB-ZZ-IDLE-03): primary = existing DEV page under test-space; fallback = A1 path /master/{lang}/product-list.
// Override the primary root without code change: DSR583_ROOT=<root> (e.g. DSR583_ROOT=product-list).
// DSR-638: default root from fixtures/paths.ts (DSR_PATHS=v2 → new ja path).
export const primaryPath = (lang: Language) => process.env.DSR583_ROOT ? `/master/${lang}/${process.env.DSR583_ROOT}` : pagePath('productList', lang);
export const fallbackPath = (lang: Language) => `/master/${lang}/product-list`;
export const blockedData = 'blocked-data: TD-583-01 page missing';

// Viewports per TC (spec.json steps). SP = < 768px (A2 / Q22, default kept by Dat 2026-10-16).
export const sp = { width: 375, height: 812 };
export const spBreakpointMax = 767;
export const spWidths = [320, 360, 390, 414, 430, spBreakpointMax] as const;
// DSR-PRODLIST-004: Figma 1333-6510 frames.
export const pcColumns = [
  { width: 1440, columns: 4 },
  { width: 1200, columns: 4 },
  { width: 980, columns: 3 },
  { width: 768, columns: 3 },
] as const;
export const spColumns = 2;
export const minCards = 6; // TD-583-01
export const reloads = 3; // DSR-PRODLIST-003 step 4
export const widthTolerance = 2; // DSR-PRODLIST-005 (±2px)
// DSR-PRODLIST-005 (TD-583-02): result counts to find via filters.
export const filterTargets = [3, 1] as const;
export const filterBlocked = 'blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available)';

// JOB-ZZ-IDLE-17 (DSR-PLSP-001…005, spec tests/product-list/DSR-583.product-list-sp.spec.ts).
// Page: /master/{lang}/product-list, fallback /{lang}/product-list (Q22 default). Renders the product-list block.
export const plspPath = (lang: Language) => `/master/${lang}/product-list`;
export const plspFallbackPath = (lang: Language) => pagePath('productSearch', lang); // DSR-638: fixtures/paths.ts
export const plspMinCards = 2; // preflight: < 2 cards → skip
export const plspDataMissing = 'DSR-583 product list data missing';
// SP widths incl. 767 (Q22 breakpoint unknown; A2 default SP < 768). Columns = distinct card left values in the first row.
export const plspSpWidths = [320, 360, 375, 390, 414, 430, spBreakpointMax] as const;
// PC/TB widths per job. Figma 1333-6510 has frames only for 768 (3) and 1440 (4); 1024 is recorded only.
export const plspPcWidths = [
  { width: 768, columns: 3 },
  { width: 1024, columns: null },
  { width: 1440, columns: 4 },
] as const;
export const plspToDo = 'ticket To Do (DSR-583, owner Martin)';
