export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];
export const viewports = { PC: { width: 1440, height: 900 } };
// Pages under test are fixture values (JOB-20261015-12 Input). QA-PT seeds them 2026-10-16 night (ja first; en later).
// Primary root per A3; fallback root if the QA-PT Note says "stories folder missing". Override: DSR529_ROOT=test-space
export const primaryRoot = process.env.DSR529_ROOT || 'library/article/stories';
export const fallbackRoot = 'test-space';
export const slugs = { full: 'qa529-01', minimal: 'qa529-02', related: ['qa529-r1', 'qa529-r2', 'qa529-r3'] } as const;
export const articlePath = (lang: Language, slug: string, root: string = primaryRoot) => `/master/${lang}/${root}/${slug}`;
// TD-529-02 is ja only (TestData en column "—").
export const minimalLanguages: readonly Language[] = ['ja'];
export const blockedData = 'blocked-data: TD-529 page missing';

// TD-529-01 values (spec.json testdata). en = "same" where the TD sheet says so.
export const td01 = {
  ja: { title: 'QA529 ストーリー詳細テスト', navTitle: 'QA529 ナビ', description: 'QA529 説明 ja', ogTitle: 'QA529 OGPタイトル', ogDescription: 'QA529 OGP説明' },
  en: { title: 'QA529 Story detail test', navTitle: 'QA529 Nav', description: 'QA529 description en', ogTitle: 'QA529 OGP title', ogDescription: 'QA529 OGP description' },
} as const;
export const td01Common = { publishDate: '2026-10-01', updateDate: '2026-10-10', keywords: ['qa529kw1', 'qa529kw2'], tagCount: 2 };
export const td02 = { ja: { title: 'QA529 最小記事', description: 'QA529 最小説明' } } as const;

// DSR-ARTICLE-002: design order (Figma 162-450). 13 (related items) may be absent – recorded, not failed.
export const blockOrder = ['title', 'subtitle', 'articleImage', 'description', 'infoBar', 'body', 'profile', 'relatedStories', 'relatedItems', 'footerAction'] as const;
export const optionalBlocks: readonly string[] = ['relatedItems'];
// DSR-ARTICLE-014: each must appear exactly once and be non-empty.
export const uniqueMeta = ['title', 'description', 'og:title', 'og:description', 'og:image', 'published-date', 'thumbnail', 'category'] as const;
// DSR-ARTICLE-011: image-transform params that must not be on the thumbnail URL.
export const transformParams = ['width', 'height', 'format', 'optimize'];
// DSR-ARTICLE-026: candidate stories index paths (A7 / Q7); record which returns 200.
export const storiesIndexPaths = (lang: Language) => [`/${lang}/stories/query-index.json`, `/master/${lang}/stories/query-index.json`, `/master/${lang}/library/article/stories/query-index.json`];
export const indexProperties = ['navtitle', 'thumbnail', 'published-date', 'updated-date', 'search-keywords', 'related-stories'] as const;

export const myListName = /my ?list|マイリスト/i;
export const relatedStoriesName = /related stories|関連ストーリー|関連記事/i;
export const relatedItemsName = /related items|関連アイテム|関連製品/i;
export const viewAllStoriesName = /view all stories/i;
export const contactName = /contact|お問い合わせ/i;
export const shareHost = /facebook\.com|twitter\.com|x\.com|linkedin\.com|line\.me/i;

// Normalizes a displayed or ISO date to YYYY-MM-DD; null when no date is found.
export function isoDate(text: string | null | undefined): string | null {
  const m = text?.match(/(\d{4})[.\-/年](\d{1,2})[.\-/月](\d{1,2})/);
  return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : null;
}
