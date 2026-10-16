// DSR-501 (DM_movie question) seeded data, JOB-20261015-11. Night Report 15/10: 9 CFs qa501-* published.
// Related titles are assumed to equal the CF names (not independently verified on Author).
export const pageA = {
  path: '/master/en/test-space/qa501-a',
  movieId: 'qa501-main-a',
  // P3: relatedMovies = rel-1..rel-6 authored; FE limits display to 5.
  expectedRelated: ['qa501-rel-1', 'qa501-rel-2', 'qa501-rel-3', 'qa501-rel-4', 'qa501-rel-5'],
} as const;
export const pageB = {
  path: '/master/en/test-space/qa501-b',
  movieId: 'qa501-main-b',
  // P2: relatedMovies = rel-1 + qa501-off (isUnavailable = TRUE).
  expectedRelated: ['qa501-rel-1'],
  excludedTitle: 'qa501-off',
} as const;
// Title rendered by the original DSR-173 movie (movieid-01); seeing it means the page is not wired to a qa501 CF.
export const dsr173MovieTitle = 'movieTitle';
export const blockedNotWired = 'blocked-data: page not wired to qa501 CF';
