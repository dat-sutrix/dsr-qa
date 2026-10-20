# JOB-20261020-06 – DSR-529 draft bugs #1–#6 vs Martin DSR-356 #58594 §A/§B (DEV, read-only)
I checked qa529-01 ja/en on .aem.live and .aem.page, which are identical, with curl and Playwright. Raw values are in raw.md. There is no dev-made page under /library/article/stories/, so I used /ja/article-1001 for comparison.

| Bug | Evidence (raw.md) | Matches §A? | Suggested class |
|---|---|---|---|
| #1 title | The EDS source `.md` has `title` = "QA529 ナビ"/"QA529 Nav". No navTitle key, and the TD title string is absent everywhere. The h1 comes from `document.title` (block 3 = §A). | Code: yes. Value: no | **blocked → data or product.** The source already holds the navTitle value. Only the Author page properties (D3) can tell an authoring error from an AEM→EDS mapping fault. |
| #2 meta names | Served: publicationdate, updatedate, searchkeywords. Absent: published-date, updated-date, search-keywords, category. The index columns match the served names, and `category` is empty. | no | **product** |
| #3 tag chips | article-meta.js reads `meta[name="tags"]`, which is never emitted. Tags only appear as `article:tag`. /ja/article-1001 has 3 article:tag and 0 chips. **en qa529-01 has no tags authored.** | no (§A: category = tag IDs) | **product** (ja). en is also **data** (add tags to the en page). |
| #4 thumbnail | The value is a relative `/content/dam/…` path, 404 on .live/.page and 200 image/png on publish-p192812. No transform params. | no (not a delivery URL) | **product** |
| #5 related | The meta holds bare names. Block 12 = `related-articles` (related-stories.js 404) reads **/query-index.json**, which already contains r1–r3. Names don't match the paths, so the block is removed from the DOM. Every stories query-index URL returns 404. /ja/article-1001 emits **paths**. | no | **data first.** The field probably holds typed names; dev pages emit paths. If Author shows the picker stored paths, it's **product**. The stories index is not needed for block 12 today (it deviates from §A). |
| #6 date | The info bar shows "2026/10/01", taken from meta `publicationdate`. A code comment says Figma block 7 uses YYYY/MM/DD (the cards use dots). | no vs BL-v1/Q4 (format not in §A) | **by-design?** Check the Figma block 7 frame. If it shows dots → product, low. |

New facts not in the triage: en qa529-01 has no `article:tag`. The index `title` = og:title. The fix for #5 is independent of the stories-index prerequisite. #3 is not caused by #2 (it reads `tags`, not `category`).
Not verified: Author page properties (title, tags, relatedStories), helix-query.yaml (not public), and the Figma date format.
