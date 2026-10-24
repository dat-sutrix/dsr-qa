import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { persisted } from './dsr-585';

// DSR-670 tech-talk CF model DM_techmovie_dsr (movies/tech) + query dsr-techmovie-page + /{lang}/library/video/tech-talk/{movieId}.
// Spec ids from ykk-dsr/hub/tc-out/DSR-670.spec.json (baseline BL-670-1 = spec.json A1). Read-only: publish GraphQL + EDS only.
export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

export const base = () => (process.env.BASE_URL || '').replace(/\/$/, '');

// Test data (spec.json testdata). TD-670-01..04 = ja only (A6); en of TD-670-01 is optional.
export const td = {
  '01': { id: 'qa670-tech', title: 'QA670 tech talk', description: 'QA670 tech talk test' },
  '02': { id: 'qa670-inactive', title: 'QA670 inactive' },
  '03': { id: 'qa670-booth', title: 'QA670 booth' },
  '04': { id: 'qa670-unavail', title: 'QA670 unavailable' },
} as const;
export type TdId = keyof typeof td;
export const standardMovie = 'qa587-main'; // TD-587-01, oracle page for 8.0 (A3) and 13.0
export const missingId = 'does-not-exist';

export const techPath = (lang: Language, id: string) => `/content/dam/dsr/${lang}/movies/tech/${id}`;
export const contentPath = (lang: Language, id: string) => `/content/dam/common/${lang}/movies/${id}`;
export const standardDsrPath = (lang: Language, id: string) => `/content/dam/dsr/${lang}/movies/standard/${id}`;
export const techQuery = (lang: Language, id: string) => persisted(`dsr-techmovie-page;path=${techPath(lang, id)}`);
export const videoPageQuery = (lang: Language, id: string) => persisted(`dsr-video-page;path=${standardDsrPath(lang, id)}`);
export const videoListQuery = (lang: Language) => persisted(`dsr-video-list;folder=/content/dam/dsr/${lang}/`);

// Page URLs (BL-OVL-1 + KNOWN-FACTS 21/10 DSR-536: no /item/).
export const techTalkPage = (lang: Language, id: string) => `/${lang}/library/video/tech-talk/${id}`;
export const videoPage = (lang: Language, id: string) => `/${lang}/library/video/${id}`;
export const videoList = (lang: Language) => `/${lang}/library/video/search`;
// 9.0 naming variants (A5): uppercase, underscore, standard URL → 404.
export const namingVariants = ['/ja/library/video/tech-talk/QA670-TECH', '/ja/library/video/tech-talk/qa670_tech', `/ja/library/video/${td['01'].id}`];

// Preflight skip reasons (job rules). TD-670-01 en is optional → own reason.
export const blockedBy = (tdId: TdId, lang: Language = 'ja') =>
  `Blocked-by TD-670-${tdId} (no tech-talk data on DEV${lang === 'ja' ? '' : `, ${lang} copy optional`})`;

export const robotsMeta = /<meta name="robots" content="([^"]*)"/;
export const titleTag = /<title>([^<]*)<\/title>/;
export const rawRow = (key: string) => new RegExp(`<div>\\s*${key}\\s*</div>\\s*<div>\\s*([^<]*?)\\s*</div>`);
/** Block class names inside <main> in document order (8.0 layout comparison with the standard page). */
export const blockClasses = (html: string) => {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  return [...main.matchAll(/<div class="([a-z][a-z0-9-]*)(?: [^"]*)?">/g)].map(m => m[1]);
};
export const cardSelector = 'main .listing .cards > ul > li';
export const qa670 = /qa670/i;

// 14.0 "count unchanged vs before TD-670-01": snapshot captured by JOB-20261024-05 while DEV had no tech-talk CF.
const beforeFile = path.resolve(__dirname, '..', 'ykk-dsr/hub/results/JOB-20261024-05/list-before-td670.json');
export type ListSnapshot = { capturedAt: string; cards: string[]; queryPaths: string[] };
export const listBefore = (): ListSnapshot | null => existsSync(beforeFile) ? JSON.parse(readFileSync(beforeFile, 'utf8')) : null;
