export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// DSR-585 product CF (DM_product), oracle DM_product_ver0.4 (spec.json A1). CF layer is read through publish
// persisted queries only (never Author). Paths stay unencoded: %2F-encoded params return empty lists (DSR-501 note).
export const publishBase = () => (process.env.DSR_PUBLISH || 'https://publish-p192812-e2014374.adobeaemcloud.com').replace(/\/$/, '');
export const persisted = (query: string) => `${publishBase()}/graphql/execute.json/ykk/${query}`;
export const queries = {
  productPage: (lang: Language, id: string) => persisted(`dsr-product-page;path=/content/dam/dsr/${lang}/products/${id}`),
  productDetail: (productId: string) => persisted(`product-detail;productId=${productId}`),
  productList: (lang: Language) => persisted(`dsr-product-list;folder=/content/dam/dsr/${lang}/products/`),
  dmProductList: () => persisted('dm-product-list'),
};
// 19.0 step 1: existing DEV data (read-only).
export const existingProductId = '46';
export const legacyProductId = 'productId-01x';

// EDS host (BASE_URL) for page-layer TCs 14.0 / 15.0. BL-OVL-1 product URL /{lang}/products/{id}.
export const base = () => (process.env.BASE_URL || '').replace(/\/$/, '');
export const productPath = (lang: Language, id: string) => `/${lang}/products/${id}`;
// 14.0: Q14 default /{lang}/products/query-index.json, then fallbacks.
export const searchIndexPaths = (lang: Language) => [`/${lang}/products/query-index.json`, `/${lang}/query-index.json`, '/query-index.json'];

// TestData sheet (spec.json testdata). QA ids 990585xxx (A3).
export const td = {
  '01': { id: '990585001', code: 'QA585-FULL', name: 'QA585 full product', publishDate: '2026-10-01' },
  '02': { id: '990585002', code: 'QA585-REQ', name: 'QA585 required only' },
} as const;
// QA-PT confirms seeding via DSR585_SEEDED=01,02 (comma list of TD numbers); otherwise TD-dependent TCs are fixme.
export const seeded = (tdId: string) => (process.env.DSR585_SEEDED || '').split(',').map(s => s.trim().replace(/^TD-585-/, '')).includes(tdId);
// Q46: old names fail only after Martin confirms ver0.4 done (DSR585_VER04_DONE=1); before that → Pending.
export const ver04Done = () => process.env.DSR585_VER04_DONE === '1';

export const blockedVer04 = 'DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT)';
export const blockedAuthor = 'Author UI (A5, agents read-only, no Author access)';

// ver0.3→0.4 removed fields (2.0 step 1) and old spellings (2.0 step 2, 19.0).
export const removedFields = [
  'itemManager', 'materials', 'appearances', 'sewingSuitabilities', 'plasticHardwareFunctionCategories', 'salesOffices',
  'isStandardItem', 'certifications', 'internalCertifications', 'reverseUse', 'reversible', 'topBottomStopVariation', 'moq',
  'orderLot', 'qualityStandards', 'qualityStandardDescription', 'careDry', 'careWash', 'careIron', 'sustainabilityText',
  'productionCountries', 'productionCompany', 'dailyProductionCapacity', 'leadTime', 'developmentCompany',
  'applicableSliderStandard', 'applicableSliderSpecial',
];
export const oldSpellings = ['Howtouse', 'HowtouseImage', 'Notice', 'NoticeImage', 'applicableSliderStandard', 'applicableSliderSpecial'];

// 13.0: ver0.4 detail fields expected in dsr-product-page.
export const ver04DetailFields = [
  'itemVariationsImage', 'colorVariationsImage', 'howToUse', 'howToUseImage', 'recycledMaterial', 'recycledMaterialNote',
  'applicableSliderSameAsParent', 'parentProduct', 'notice', 'noticeImage',
];
export const coreFields = ['productId', 'productCode', 'productName', 'publishDate'];

// 7.0: openingType Enumeration (multiple), labels 止/開/逆開/チェーン or stored values (Q45 default).
export const openingTypeValues = ['stop', 'open', 'reverseOpen', 'chain', '止', '開', '逆開', 'チェーン'];

// 16.0: media slots. media01 = image only (no Type/Url); media02–15 = Type/Asset/Url, Type ∈ 5 options.
export const mediaSlots = Array.from({ length: 14 }, (_, i) => `media${String(i + 2).padStart(2, '0')}`);
export const mediaTypes = ['image', 'video', '360', '3d', 'external'];
export const imageExtension = /\.(png|jpe?g|gif|webp|svg|tiff?|avif)$/i;

// 17.0: the 7 fields added in ver0.3→0.4 and the GraphQL shape of their type.
export type Shape = 'asset' | 'plain-multiline' | 'boolean' | 'string';
export const newFields: Record<string, Shape> = {
  itemVariationsImage: 'asset', colorVariationsImage: 'asset', howToUse: 'plain-multiline', howToUseImage: 'asset',
  recycledMaterial: 'boolean', recycledMaterialNote: 'string', applicableSliderSameAsParent: 'string',
};
export const sliderSameAsParentValues = ['any'];

// 18.0: content CF folder; name = productId, digits only (A3).
export const commonProductsRoot = (lang: Language) => `/content/dam/common/${lang}/products/`;
export const digitsOnly = /^[0-9]+$/;

// 15.0: page text must not contain template leftovers.
export const leftoverText = [/\bundefined\b/, /\bnull\b/, /\{\{/];
