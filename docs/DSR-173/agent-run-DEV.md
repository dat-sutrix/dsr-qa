# DSR-173 – Agent test run on DEV

Baseline: **BL-v1_20260916** · Build: `dev/2026.09.15.2` (commit f13b984) · Canonical US: DSR-173 (aliases: DSR-508, DSR-474)

## Target
- Page: `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-173-video-detail`
- Language: en only (ja/zh test pages not provided yet)
- Viewport: 1440x900 (PC)
- Mode: read-only. Do not log in, submit forms, or click external share buttons.

## Known limitations
- CF source values (movieTitle, description, thumbnail, movieSourceId) are **not available** to the agent. Record observed values; the QA compares them with the CF on Author.
- Movie list URL (redirect target) is **pending dev**. Record the URL reached; do not judge correctness.
- data-testid not implemented yet. Locate elements by role/text/visual position and describe how they were found.

## Test cases

| TC ID | Title | Steps | Expected (BL-v1) | Verdict rule for agent |
|---|---|---|---|---|
| DSR-MOVIE-012 | Movie title (area ①) | Open page. Read the movie title shown under the "MOVIE" heading. | Title text equals CF `movieTitle` exactly, including ® and \| characters; no escaped entities (e.g. `&amp;`, `&reg;`). | Record exact text. **Pass** only on entity check; CF match → **Pending** (QA confirms). |
| DSR-MOVIE-014 | YouTube playback | Inspect the player area. If it is an iframe, record `src`. Click play; wait 5s; screenshot. | Player is a YouTube embed whose `src` contains `movieSourceId`; video starts; no console error. | Record src, console errors, screenshot. If the source is DAM (`<video>`), mark **N/A** and note "use DSR-MOVIE-016". |
| DSR-MOVIE-026 | Related content card, tag, link | In "関連コンテンツ" / related section, for each card record image presence, title, tag text, link href. Open each href and record HTTP status. | Each card shows thumbnail and title; movie card tag = MOVIE, article card tag = STORY; each link opens a page in the same language (`/master/en/`) with HTTP 200. | **Fail** if a link is not 200 or leaves `/master/en/`; otherwise **Pass** with evidence. |
| DSR-MOVIE-027 | title and og:title | Read `<title>` and `meta[property="og:title"]`. Count each tag. | Both equal `{movieTitle} \| YKK DIGITAL SHOWROOM`; exactly one of each tag. | **Pass** if both are identical, end with ` \| YKK DIGITAL SHOWROOM`, the prefix equals the on-page title (TC-012), and each tag appears once. |
| DSR-MOVIE-028 | description and og:description | Read raw values of `meta[name="description"]` and `meta[property="og:description"]`. | Both contain the CF description with line breaks removed; no `\n`, `\r` or `<br>`. | **Pass** if both are non-empty, identical, and contain no line-break characters or `<br>`; CF text match → note for QA. |
| DSR-MOVIE-029 | og:image | Read `meta[property="og:image"]`. Open the URL and record HTTP status and content-type. | Absolute https URL of the Movie CF thumbnail; HTTP 200; image content-type. | **Pass** if absolute https + 200 + `image/*`; thumbnail identity → note for QA. |
| DSR-MOVIE-033 | PC layout vs Figma | Full-page screenshot at 1440px. List visible elements top to bottom. | Order: back button "＜動画一覧へ戻る", breadcrumb `HOME > 動画一覧`, "MOVIE" heading, ① title, ② player, ③ 関連商品, ④ 関連コンテンツ, page-top button, footer. | **Pending** always. Screenshot is compared with `FIGMA_283-848_movie-detail_20260916.png` by QA + Claude. |
| DSR-MOVIE-034 | Back to movie list button | Open page directly (fresh tab). Click the back-to-list button. Record final URL and HTTP status. | Opens the movie list page of the same language. | Record URL + status. **Fail** if error page or non-`/master/en/` URL; otherwise **Pending** (list URL not confirmed). |

## Evidence
- Folder: `evidence/DSR-173/DEV/`
- Names: `<TC-ID>_DEV_<NN>.png` (e.g. `DSR-MOVIE-033_DEV_01.png`)
- Minimum: 1 screenshot per TC; DSR-MOVIE-033 must be full-page.

## Output
Write `results/DSR-173/DEV/<YYYYMMDD>.md`:

| TC ID | Proposed verdict | Expected | Observed (raw values) | Evidence | Notes |
|---|---|---|---|---|---|

Then commit: `[DSR-173] agent run DEV <YYYYMMDD>`. Proposed verdicts are not final; QA confirms before updating the TC Excel.

## Not in this run
- DSR-MOVIE-030 (SNS share preview) – executed manually by QA.
