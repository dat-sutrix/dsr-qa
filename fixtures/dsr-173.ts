import { test } from '@playwright/test';

export const languages = ['ja', 'en', 'zh'] as const;
export type Language = (typeof languages)[number];

type Localized<T> = Record<Language, T | null>;

export interface RelatedContentExpectation {
  title: string;
  type: 'movie' | 'article' | 'landing-page';
  tag: 'MOVIE' | 'STORY' | null;
  path: string;
}

export interface MovieFixture {
  movieId: string | null;
  paths: Localized<string>;
  movieTitle: Localized<string>;
  description: Localized<string>;
  movieSourceId: string | null;
  movieAsset: string | null;
  thumbnail: string | null;
  relatedProducts: readonly string[] | null;
  relatedArticles: readonly string[] | null;
  relatedLandingPages: readonly string[] | null;
  expectedOrder: readonly string[] | null;
  excludedTitles: readonly string[] | null;
  relatedContent: readonly RelatedContentExpectation[] | null;
}

// TODO(dev): confirm the generated detail-page URL pattern.
export const detailUrlPattern: string | null = null;

// TODO(dev): confirm whether metadata line breaks are removed or replaced by a space.
export const descriptionLineBreakSeparator: '' | ' ' | null = null;

export const movieListPaths: Localized<string> = {
  // TODO(dev): provide the Japanese movie-list URL.
  ja: null,
  // TODO(dev): provide the English movie-list URL.
  en: null,
  // TODO(dev): provide the Chinese movie-list URL.
  zh: null,
};

const pendingMovie = (): MovieFixture => ({
  // TODO(dev): provide the seeded Movie CF ID.
  movieId: null,
  paths: {
    // TODO(dev): provide the generated Japanese detail path.
    ja: null,
    // TODO(dev): provide the generated English detail path.
    en: null,
    // TODO(dev): provide the generated Chinese detail path.
    zh: null,
  },
  movieTitle: {
    // TODO(dev): provide the exact Japanese movie title.
    ja: null,
    // TODO(dev): provide the exact English movie title.
    en: null,
    // TODO(dev): provide the exact Chinese movie title.
    zh: null,
  },
  description: {
    // TODO(dev): provide the Japanese description, including source line breaks.
    ja: null,
    // TODO(dev): provide the English description, including source line breaks.
    en: null,
    // TODO(dev): provide the Chinese description, including source line breaks.
    zh: null,
  },
  // TODO(dev): provide the provider movieSourceId where applicable.
  movieSourceId: null,
  // TODO(dev): provide the DAM movie asset URL where applicable.
  movieAsset: null,
  // TODO(dev): provide the thumbnail URL.
  thumbnail: null,
  // TODO(dev): provide related product codes in display order.
  relatedProducts: null,
  // TODO(dev): provide exact related-content titles in expected display order.
  relatedArticles: null,
  relatedLandingPages: null,
  expectedOrder: null,
  // TODO(dev): provide titles that must be excluded by display-condition filtering.
  excludedTitles: null,
  // TODO(dev): provide expected type, tag, and same-language path for mixed content.
  relatedContent: null,
});

export const movieData = {
  // Author CFs: DM_movie_1 / DM_movie_related_1.
  VALID_YOUTUBE: {
    ...pendingMovie(),
    movieId: 'movieid-01',
    // DSR-587 17.0: DSR173_MOVIE_PATH switches Group A to an overlay page (e.g. /en/library/video/qa587-main).
    paths: { ja: null, en: process.env.DSR173_MOVIE_PATH || '/master/en/test-space/dsr-173-video-detail', zh: null },
    movieTitle: { ja: null, en: 'movieTitle', zh: null },
    description: { ja: null, en: 'movie description\nmovie description', zh: null },
    movieSourceId: 'irFRtAVphCY&t=38s',
    thumbnail: '/content/dam/ykk/digital-showroom/test/png/image 7.png',
    relatedProducts: ['productId-01'],
    relatedArticles: ['Article Page 1', 'Article Page 2', 'Article Page 3'],
    relatedLandingPages: ['Landing page 1', 'Landing page 2'],
  },
  VALID_DAM: pendingMovie(),
  UNAVAILABLE: pendingMovie(),
  INACTIVE: pendingMovie(),
  BOOTH_LIMITED: pendingMovie(),
  YOUTUBE_EMPTY_ID: pendingMovie(),
  RELATED_SORT: pendingMovie(),
  RELATED_NO_UPDATEDATE: pendingMovie(),
  RELATED_FILTERED: pendingMovie(),
  NO_RELATED: pendingMovie(),
  // DSR-587 17.0: DSR173_RELATED_PATH (e.g. /en/library/video/qa587-rel-a) for the related checks.
  RELATED_6: { ...pendingMovie(), paths: { ja: null, en: process.env.DSR173_RELATED_PATH || null, zh: null } },
  RELATED_MIXED: pendingMovie(),
  I18N: pendingMovie(),
} satisfies Record<string, MovieFixture>;

export type MovieDataKey = keyof typeof movieData;

export function detailPath(key: MovieDataKey, lang: Language): string | null {
  const fixture = movieData[key];
  if (fixture.paths[lang] !== null) return fixture.paths[lang];
  if (detailUrlPattern === null || fixture.movieId === null) return null;

  return detailUrlPattern.replace('{lang}', lang).replace('{movieId}', fixture.movieId);
}

export function listPath(lang: Language): string | null {
  return movieListPaths[lang];
}

export function requireData(
  ...values: ReadonlyArray<readonly [name: string, value: unknown]>
): void {
  const missing = values.filter(([, value]) => value === null).map(([name]) => name);
  test.skip(missing.length > 0, `Test data pending: ${missing.join(', ')}`);
}
