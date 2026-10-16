# DSR-609 test data (DEV)

All checks are read-only on dev-authored content. The only form submitted is the quick search (GET, keyword `zipper`). TC 8 uses a Playwright route mock; nothing is written to AEM.

| Item | DEV 2026-10-16 |
|---|---|
| `/ja/top-page` | .aem.live 404 → .aem.page 200 (fallback used) |
| `/en/top-page` | .aem.live 200 (used) |
| `/{lang}/news/query-index.json` (TC path) | 404 on both hosts |
| Index actually requested by NEWS | `/query-index.json` (site root, `?_=<timestamp>`), rows filtered by `/{lang}/news/`; publish date field `publicationdate` (ISO string or epoch seconds, some empty) |
| `/{lang}/search-result?q=zipper` (search form action) | 404 on both hosts |
| RECOMMEND CONTENTS | 4 identical cards "ファスナー3Dシミュレータ" (ja and en), no link authored/rendered |
| NEWS (ja and en) | news-7 (2027-01-06), news-9, news-8 (no publicationdate; shown as 2026.06.25) |

TD-609-01…04 (TC file column T) are not separately created on DEV; the dev-authored page was used.
