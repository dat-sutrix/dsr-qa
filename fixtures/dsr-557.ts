import { pagePath } from './paths';
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };
// Discovery 2026-10-15 (docs/DSR-557/discovery-DEV.md): only ja has a catalog test page.
export const catalogPath = (lang: Language) => pagePath('listCatalog', lang); // DSR-638: fixtures/paths.ts
// JOB-20261020-02 (Martin 19/10): video TCs run only on overlay pages /{lang}/library/video/{id} (BL-OVL-1);
// test-space dsr-173-video-detail?id= is obsolete. Both tiers: .aem.page (preview) and .aem.live (publish).
export const videoPath = (lang: Language, id: string) => `/${lang}/library/video/${id}`;
export const videoHosts = () => {
  const b = (process.env.BASE_URL || '').replace(/\/$/, '');
  return [b.replace('.aem.live', '.aem.page'), b.replace('.aem.page', '.aem.live')];
};
// QA-seeded overlay Movie CFs. youtubeId = TD-587-01 movieSourceId (raw video-detail row, DEV 2026-10-21).
export const youtubeVideos = [
  { id: 'qa587-main', movieSourceId: 'irFRtAVphCY', youtubeId: 'irFRtAVphCY' },
];
// DAM mp4 movie (movieSource = dam, movieAsset sample-4.mp4).
export const damVideos = [
  { id: 'qa557-dam', assetPath: '/content/dam/ykk/digital-showroom/test/video/sample-4.mp4' },
];
// JOB-20261022-14: the list calls dsr-catalog-list;folder=/content/dam/dsr/{lang}/ (deploy 22/10 06:19Z, Martin 22/10 13:45 VN), not dm-catalog-list.
// Excludes isActive false / booth-limited / unpublished CF; DEV ja 6 / en 5 cards once the AEM query is live.
export const catalogQuery = /\/graphql\/execute\.json\/ykk\/dsr-catalog-list/;
export const listBlocked = 'Blocked-by: catalog list AEM query deploy (Martin 22/10)';
export const embedDomains = /^https?:\/\/([^/]+\.)?(youtube\.com|youtube-nocookie\.com|youtu\.be|ytimg\.com|youku\.com|ykimg\.com)(\/|$)/;
// DSR-109 facade: thumbnail allowed (QA decision 2026-10-15). Only embed/player requests are forbidden before interaction.
export const playerRequests = /^https?:\/\/(([^/]+\.)?youtube\.com\/embed(\/|\?|$)|([^/]+\.)?youtube-nocookie\.com(\/|$)|www\.youtube\.com\/(s\/|iframe_api|player)|player\.youku\.com(\/|$)|[^/]+\.ytimg\.com\/yts\/)/;
export const facadeThumbnails = /^https?:\/\/(img\.youtube\.com|i\.ytimg\.com)\//;
export const embedSrc = /^https:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\//;
export const labelDays = 10;

// One dsr-catalog-list item flattened: the content CF fields, plus the wrapping DSR CF path and flags.
export interface CatalogItem {
  _path?: string;
  dsrPath?: string;
  isActive?: boolean | null;
  isBoothLimited?: boolean | null;
  catalogId?: string;
  catalogTitle: string;
  catalogType: string;
  requiresForm: boolean | null;
  ebookUrl: string | null;
  publishDate: string | null;
  updateDate: string | null;
  pdfAsset: { _publishUrl: string } | null;
}

// "Today" is the calendar date in Asia/Tokyo (site audience); assumption recorded in docs/DSR-557/test-data.md.
export function today(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(now);
}
const daysBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
const recent = (date: string | null, on: string) => !!date && daysBetween(date, on) >= 0 && daysBetween(date, on) <= labelDays;
export function expectedLabel(item: Pick<CatalogItem, 'publishDate' | 'updateDate'>, on = today()): 'NEW' | 'UPDATE' | '' {
  if (recent(item.publishDate, on)) return 'NEW';
  if (recent(item.updateDate, on)) return 'UPDATE';
  return '';
}

// Catalog overlay merge (Martin 20/10 12:45, BL-OVL-1): core catalogs re-seeded (Night 21/10 việc 5) as content CF
// /content/dam/common/{lang}/catalogs/{id} + DSR CF /content/dam/dsr/{lang}/catalogs/{id}; detail /{lang}/library/catalog/{id}.
// Titles differ per CF ("catalog pdf", "qa190-cat-pdf" …) → resolved at run time from dsr-catalog-list by content CF _path (JOB-20261020-04).
export const core = { pdf: 'qa190-cat-pdf', pdfForm: 'qa190-cat-pdf-form', ebook: 'qa190-cat-ebook', ebookForm: 'qa190-cat-ebook-form' } as const;
export type CoreKey = keyof typeof core;
export const contentCfPath = (lang: string, id: string) => `/content/dam/common/${lang}/catalogs/${id}`;
export const detailPath = (lang: string, id: string) => `/${lang}/library/catalog/${id}`;
export const coreItem = <T extends CatalogItem>(data: T[], lang: string, key: CoreKey): T | undefined =>
  data.find(i => i._path === contentCfPath(lang, core[key]));
// Pre-merge QA CF folder (JOB-20261020-04); NEW/UPDATE CFs were not re-seeded and stay here. dsr-catalog-list reads only DSR CFs, so they are no longer listed.
export const oldFolder = '/content/dam/ykk/common/product-cf/test/';
export const qa190 = {
  new: ['QA190 NEW 0', 'QA190 NEW 10', 'QA190 NEW 11'],
  upd: ['QA190 UPD 0', 'QA190 UPD 10', 'QA190 UPD 11'],
  both: ['QA190 BOTH', 'qa190-cat-noupd'], // noupd has no title; the page shows the CF name
} as const;
