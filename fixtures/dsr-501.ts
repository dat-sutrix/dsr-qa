// DSR-501 (DM_movie question) seeded data, JOB-20261015-11; titles corrected per JOB-20261016-03
// (data fix 2026-10-16 12:05: related CFs keep 動画ID rel1..rel6 / movieoff, titles "video title <id>").
export const pageA = {
  path: '/master/en/test-space/qa501-a',
  movieId: 'qa501-main-a',
  // P3: relatedMovies = rel1..rel6 authored; FE limits display to 5.
  expectedRelated: ['video title rel1', 'video title rel2', 'video title rel3', 'video title rel4', 'video title rel5'],
  // JOB-20261017-01: 更新日 rel1 = 2026-10-01 … rel6 = 2026-10-06; order rule updateDate desc (DSR-647 comment 61177).
  expectedRelatedByUpdateDesc: ['video title rel6', 'video title rel5', 'video title rel4', 'video title rel3', 'video title rel2'],
} as const;
export const pageB = {
  path: '/master/en/test-space/qa501-b',
  movieId: 'qa501-main-b',
  // P2: relatedMovies = rel1 + movieoff (isUnavailable = TRUE).
  expectedRelated: ['video title rel1'],
  excludedTitle: 'video title off',
} as const;
// Title rendered by the original DSR-173 movie (movieid-01); seeing it means the page is not wired to a qa501 CF.
export const dsr173MovieTitle = 'movieTitle';
export const blockedNotWired = 'blocked-data: page not wired to qa501 CF';

// JOB-20261016-04 (DSR-647 retest via DSR-587, BL-OVL-1): overlay pages on Martin's branch, aem.page (preview).
export const overlayBase = 'https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page';
export const overlayPath = (movieId: string) => `/en/library/video/${movieId}`;
export const cfRelatedPath = (movieId: string) => `/content/dam/dsr/en/movies/standard/${movieId}`;
// Path must stay unencoded: the %2F-encoded form given in the job returns empty related/inactive lists (observed 2026-10-16).
export const dsrVideoPageQuery = (movieId: string) =>
  `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-video-page;path=${cfRelatedPath(movieId)}`;
export const maxRelatedMovies = 5;
export const blockedNo6th = 'blocked-data: 6th related movie not on publish';
export const blockedStalePreview = 'blocked-data: stale preview, static HTML has fewer relatedMovies rows than query';
export const blockedNoDistinctUpdateDate = 'blocked-data: relatedMovies updateDate missing or not distinct';

// JOB-20261019-03 retarget (2026-10-20 09:00): qa501-* not re-seeded after the overlay merge; retest on main with TD-587-14/15
// (fixtures/dsr-587.ts, Night Pack 21/10 việc 2–3). Content CF titles "QA587 related N" (r1 has a trailing space on publish 21/10).
export const mainBase = 'https://main--dsr-eds-dev--sutrix-projects.aem.page';
export const mainPageA = {
  movieId: 'qa587-rel-a',
  // 更新日 r1 = 2026-10-01 … r6 = 2026-10-06; DSR-647 comment 61177: newest updateDate first, max 5 → r1 absent.
  expectedRelatedIdsByUpdateDesc: ['qa587-r6', 'qa587-r5', 'qa587-r4', 'qa587-r3', 'qa587-r2'],
  absentId: 'qa587-r1',
} as const;
export const mainPageB = {
  movieId: 'qa587-rel-b',
  expectedRelatedIds: ['qa587-r1'],
  excludedId: 'qa587-off',
  excludedTitle: 'QA587 off',
} as const;
// Freshness: page last-modified must be after the Night 21/10 data fix started.
// [Giả định] job says "after the Night Report time"; the report (23:15 VN) is written after publishing, so the Night 21/10 start (18:00 VN) is used.
export const nightReportSince = '2026-10-21T11:00:00Z';
export const blockedStaleNightReport = 'blocked-data: page last-modified before Night 21/10 data fix';
