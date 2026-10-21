export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// Host under test: BASE_URL (envs/<env>.env). Optional override DSR586_BASE (branch test page, Martin 16/10):
// DSR586_BASE=https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
// Optional PDO_ID override (JOB-20261021-03): run the value-agnostic TCs on an existing product (e.g. PDO_ID=46, preview only)
// until TD-586 is seeded. Host defaults to the .aem.page tier of BASE_URL; value-specific TCs skip with needsTd.
export const pdoId = () => (process.env.PDO_ID || '').trim();
export const needsTd = 'needs TD-586';
export const base = () => {
  const b = (process.env.DSR586_BASE || process.env.BASE_URL || '').replace(/\/$/, '');
  return pdoId() && !process.env.DSR586_BASE ? b.replace('.aem.live', '.aem.page') : b;
};
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
// TD-586-01 ver0.4 values (spec.json testdata, re-baseline 2026-10-20): 17.0 display, 20.0 new fields, 21.0 media slots.
// 'any' values in the sheet (colorVariationsPdf, images) are not listed: the raw overlay row is the oracle.
export const td01 = {
  display: {
    itemVariations: 'QA586 item', colorVariations: 'QA586 colors', notice: 'QA586 notice',
    printableTapeNote: 'QA586 print note', recycledTapeNote: 'QA586 recycled tape note',
  } as Record<string, string>,
  newValues: { howToUse: 'QA586 how to use', recycledMaterialNote: 'QA586 recycled material note' } as Record<string, string>,
  media: ['media01', 'media02', 'media03'], // media01 image · media02 Image · media03 External https://www.ykkfastening.com/
};
export const notSeeded = (tdId: string) => `TD-586-${tdId} not seeded`;
// Positive TD rendered as the unavailable state (raw row 'unavailable | <reason>') = data not resolved (e.g. CF commune
// not published / product reference empty) → skip, never fail on incomplete data (product 46 renders on the same build).
export const incomplete = (tdId: string, reason: string) => `TD-586-${tdId} incomplete: overlay row 'unavailable | ${reason}'`;
export const unavailableRow = /<div>\s*unavailable\s*<\/div>\s*<div>\s*([^<]*?)\s*<\/div>/;

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

// 17.0 step 2 fields (spec.json 17.0, DM_product ver0.4). Value = TD-586-01 value or the raw overlay row (colorVariationsPdf).
export const displayFields = ['productName', 'productCode', 'description', 'itemVariations', 'colorVariations', 'colorVariationsPdf', 'notice', 'printableTapeNote', 'recycledTapeNote'] as const;
// 20.0: ver0.4 new fields (差分管理 0.3→0.4). No design yet (Q29) → current state recorded, verdict Blocked.
export const newFields = ['itemVariationsImage', 'colorVariationsImage', 'howToUse', 'howToUseImage', 'recycledMaterial', 'recycledMaterialNote', 'parentProduct', 'applicableSliderSameAsParent'] as const;
export const noNewFieldDesign = 'Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded';
// 17.0 step 3 (ykk-dsr/hub/tc-out/DSR-586.spec.json): removed labels that must not appear.
export const removedFieldLabels = ['生産国', '上下止', 'スタンダードアイテム', '縫製適正', '外観', '特殊材質', 'MOQ', 'オーダーロット', 'ケアインフォメーション', '納期', '開発会社', '生産会社'];
export const literalEmpty = /\b(undefined|null)\b/; // 17.0: no literal 'undefined' / 'null'
export const publishHost = /adobeaemcloud\.com/; // DSR-538: related cards must not link to the AEM publish domain
