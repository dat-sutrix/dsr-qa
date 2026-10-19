export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// Host under test: BASE_URL (envs/<env>.env). Optional override DSR587_BASE (branch test page, Martin comment 61119):
// DSR587_BASE=https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
export const base = () => (process.env.DSR587_BASE || process.env.BASE_URL || '').replace(/\/$/, '');
// BL-OVL-1: preview publish → .aem.page, live publish → .aem.page + .aem.live. Same branch/site, other tier.
export const hosts = () => {
  const b = base();
  return { page: b.replace('.aem.live', '.aem.page'), live: b.replace('.aem.page', '.aem.live') };
};
// BL-OVL-1 video URL: /{lang}/library/video/{id} (no /master prefix; regex (?!search$|tech-talk$)([a-z0-9-]+)$).
export const videoPath = (lang: string, id: string) => `/${lang}/library/video/${id}`;
// A3: movie list for isActive = false / unavailable = /{lang}/library/video/search (Martin test URL).
export const listPath = (lang: string) => `/${lang}/library/video/search`;
export const techTalkListPath = (lang: string) => `/${lang}/library/video/tech-talk`;

// DSR-587 TestData sheet (spec.json testdata). QA ids qa587-* (A2). ja copy of TD-587-01 / 07 = same id and values (assumed; sheet: "ja, cn copies").
export const td = {
  '01': { id: 'qa587-main', title: 'QA587 main movie', descriptionLines: ['QA587 line1', 'line2'],
    // TestData: "any public YouTube id" – not fixed in the sheet. TODO(QA-PT): record the seeded movieSourceId.
    movieSourceId: null as string | null },
  '02': { id: 'qa587-preview', title: 'QA587 preview' },
  '04': { ids: ['QA587_Upper', 'qa587_upper'] },
  '05': { id: 'qa587-sub', subfolder: 'qa587', legacyId: 'qa501-main-a' },
  '06': { id: 'qa587-commune-only' },
  '07': { id: 'qa587-inactive' },
  '08': { id: 'qa587-unavail' },
  '10': { id: 'qa587-removed' },
  '14': { id: 'qa587-rel-a', relatedMovieIds: ['qa587-r1', 'qa587-r2', 'qa587-r3', 'qa587-r4', 'qa587-r5', 'qa587-r6'],
    // 16.0: card hrefs newest update date first. TODO(QA-PT): record after seeding (sheet: "record their update dates").
    expectedOrderByUpdateDesc: null as readonly string[] | null },
  '15': { id: 'qa587-rel-b', shownId: 'qa587-r1', hiddenId: 'qa587-off' },
} as const;
export const notSeeded = (tdId: string) => `TD-587-${tdId} not seeded`;

// Negative TCs (4.0, 5.0, 6.0, 10.0) expect 404, so a 404 cannot prove the data exists.
// QA-PT confirms seeding via DSR587_SEEDED=04,05,06,10 (comma list of TD numbers); otherwise the TC is skipped.
export const seeded = (tdId: string) => (process.env.DSR587_SEEDED || '').split(',').map(s => s.trim().replace(/^TD-587-/, '')).includes(tdId);

export const siteTitleSuffix = ' | YKK DIGITAL SHOWROOM';
export const maxRelatedMovies = 5; // DSR-501 P3 / DSR-647
export const playWaitMs = 5_000; // 1.0: click play, wait 5 s
export const redirectWaitMs = 3_000; // 7.0 / 8.0: wait 3 s, record final URL
export const graphqlPattern = /graphql|execute\.json/i;
export const indexPath = '/query-index.json'; // DEV 2026-10-19: only root index exists
export const htmlLang: Record<Language, string> = { ja: 'ja', en: 'en' };
export const cnPending = 'Issue #18: no /cn path on DEV';
export const techTalkPending = 'tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06)';

// 17.0: DSR-173 Group A page switched via DSR173_MOVIE_PATH (fixtures/dsr-173.ts). Related checks use TD-587-14.
export const dsr173GroupA = ['012', '014', '020', '025', '026', '027', '028', '029', '033', '034'] as const;
