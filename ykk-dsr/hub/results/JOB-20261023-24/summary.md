# JOB-20261023-24 · claude-code · DSR-529 · DEV · needs-input (cookie)

Read-only verify of chrome JOB-20261023-23 (qa529-02 thumbnail restore). No writes, no publish.

| Merge/incident-related | – none |
|---|---|

| Check | Result | Notes |
|---|---|---|
| 1. Author `jcr:content.json` of `/content/sites/digital-showroom/master/ja/library/article/stories/qa529-02` | **blocked** | HTTP 401 at 2026-10-23T17:17:58Z: the login-token cookie has expired. Author read-back NOT verified. cause none |
| 2. Live `.aem.live` / `.aem.page` meta | pass | 200; title `QA529 最小記事`; thumbnail `/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png`; publicationdate `2026-09-01T00:00:00.000Z`; article:tag `do-not-translate`; no category meta; published-time `2026-10-23T03:33:51Z` (before chrome write 17:13Z, so no publish since) |

- Before (JOB-06 TD-529-META `before.json`) vs chrome `after` (JOB-23): the values match on title, publicationdate 2026-09-01, tags [do-not-translate], no category, and thumbnail path. Live also matches. **No mismatches found**, but the Author state is not independently verified.
- Question: Dat, please paste a fresh cookie, then re-queue to finish step 1.
