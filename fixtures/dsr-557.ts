import { pagePath } from './paths';
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };
// Discovery 2026-10-15 (docs/DSR-557/discovery-DEV.md): only ja has a catalog test page; only en has a video page.
export const catalogPath = (lang: Language) => pagePath('listCatalog', lang); // DSR-638: fixtures/paths.ts
export const videoPath = (lang: Language, id: string) => `/master/${lang}/test-space/dsr-173-video-detail?id=${id}`;
export const catalogQuery = /\/graphql\/execute\.json\/ykk\/dm-catalog-list/;
// Dev-published Movie CFs (movieSource = youtube) and the id expected from movieSourceId.
export const youtubeVideos = [
  { id: 'sort-main', movieSourceId: 'irFRtAVphCY&t=38s', youtubeId: 'irFRtAVphCY' },
  { id: 'long', movieSourceId: 'https://youtu.be/LQe4d3ulijQ?si=MNlaiWwf__LURE6w', youtubeId: 'LQe4d3ulijQ' },
];
export const embedDomains = /^https?:\/\/([^/]+\.)?(youtube\.com|youtube-nocookie\.com|youtu\.be|ytimg\.com|youku\.com|ykimg\.com)(\/|$)/;
// DSR-109 facade: thumbnail allowed (QA decision 2026-10-15). Only embed/player requests are forbidden before interaction.
export const playerRequests = /^https?:\/\/(([^/]+\.)?youtube\.com\/embed(\/|\?|$)|([^/]+\.)?youtube-nocookie\.com(\/|$)|www\.youtube\.com\/(s\/|iframe_api|player)|player\.youku\.com(\/|$)|[^/]+\.ytimg\.com\/yts\/)/;
export const facadeThumbnails = /^https?:\/\/(img\.youtube\.com|i\.ytimg\.com)\//;
export const embedSrc = /^https:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\//;
export const labelDays = 10;

export interface CatalogItem {
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

// QA-seeded catalog CFs on DEV (JOB-20261016-02). Title on page; CF name in comments where it differs from the title.
export const qa190 = {
  pdf: 'QA190 PDF catalog', // CF qa-190-cat-pdf
  pdfForm: 'QA190 PDF form required',
  ebook: 'QA190 e-book',
  ebookForm: 'QA190 e-book form',
  new: ['QA190 NEW 0', 'QA190 NEW 10', 'QA190 NEW 11'],
  upd: ['QA190 UPD 0', 'QA190 UPD 10', 'QA190 UPD 11'],
  both: ['QA190 BOTH', 'qa190-cat-noupd'], // noupd has no title; the page shows the CF name
} as const;
// qa190 items in the GraphQL response that DEV does not render (JOB-20261016-02). Reported, not failed.
export const blockedEbookData = 'blocked-data: QA-PT fixes ebookUrl 16/10 night';
export const notRendered: Record<string, string> = {
  [qa190.ebook]: blockedEbookData,
  [qa190.ebookForm]: blockedEbookData,
  [qa190.pdfForm]: 'suspect product or DSR-570 gate',
};
