export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// DSR-608 Booth TOP / ITEM for (DSR-172 sheet "ブース"). Base defaults to BASE_URL (.aem.live); DSR608_BASE overrides
// (e.g. .aem.page – on 2026-10-24 the booth sample pages exist only on preview, .live returns 404).
export const base = () => (process.env.DSR608_BASE || process.env.BASE_URL || '').replace(/\/$/, '');

// [Giả định] TD-608-01/04 paths. spec.json A3 path /{lang}/product/application/fashion/fashion(/item01) is 404 on
// .page and .live (2026-10-24); default = Martin's sample page from DSR-661 c.64907. Override with DSR608_TOP / DSR608_ITEM ({lang} placeholder).
const fill = (pattern: string, lang: string) => pattern.replace('{lang}', lang);
export const boothTopPath = (lang: string) => fill(process.env.DSR608_TOP || '/{lang}/digital-showroom/both', lang);
export const itemPath = (lang: string) => fill(process.env.DSR608_ITEM || '/{lang}/digital-showroom/both/item', lang);

// TD-608-02/03 QA copy pages (howto #4/#5, QA-PT/chrome lane, ja only). Not created as of 2026-10-24.
export const qaBooth1img = '/ja/test-space/qa608-booth-1img';
export const qaItem1prod = '/ja/test-space/qa608-item-1prod';

export const sp = { width: 390, height: 844 };
export const pc = { width: 1440, height: 900 };

// Console noise already tracked in regression as cause none (EDS 404 resource on every page).
export const knownConsole = [/Failed to load resource: the server responded with a status of 404/];

export const blockedCn = 'Blocked: cn path not on DEV (Issue #18, A11)';
export const blockedAuthor = 'Manual: Author UI edit + publish on QA copy pages (608-10.0, TD-608-02/03; agents read-only)';
export const blockedVisual = 'Visual: lane codex (Playwright screenshots vs Figma C02 3324-64205/64850, 4545-87679/87815/88315)';
export const blocked1img = `Blocked-data: TD-608-02 ${qaBooth1img} not created (QA copy page, howto #4)`;
export const blocked1prod = `Blocked-data: TD-608-03 ${qaItem1prod} not created (QA copy page, howto #5)`;
