// DSR-501 (DM_movie question) seeded data, JOB-20261015-11; titles corrected per JOB-20261016-03
// (data fix 2026-10-16 12:05: related CFs keep 動画ID rel1..rel6 / movieoff, titles "video title <id>").
export const pageA = {
  path: '/master/en/test-space/qa501-a',
  movieId: 'qa501-main-a',
  // P3: relatedMovies = rel1..rel6 authored; FE limits display to 5.
  expectedRelated: ['video title rel1', 'video title rel2', 'video title rel3', 'video title rel4', 'video title rel5'],
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
