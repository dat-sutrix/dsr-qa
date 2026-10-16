export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
// Pages under test (JOB-ZZ-IDLE-03): primary = existing DEV page under test-space; fallback = A1 path /master/{lang}/product-list.
// Override the primary root without code change: DSR583_ROOT=<root> (e.g. DSR583_ROOT=product-list).
export const primaryPath = (lang: Language) => `/master/${lang}/${process.env.DSR583_ROOT || 'test-space/product-list'}`;
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
