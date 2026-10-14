# DSR-173 – Movie Detail (movie-detail) – Automation Spec

Source: TC Excel `[Sutrix] DSR -173- [レイアウト] 動画詳細（movie-detail）.xlsx` · Jira DSR-173 · Figma node 283:848

## Scope

Confirmed with the team on 2026-09-29: DEV `/master/en/test-space/dsr-173-video-detail` is a **manually authored placeholder page** embedding the movie component. Page auto-generation is not implemented. The test target is the **component**, not the page. Detail URL structure and the movie list URL are not implemented (DSR-536). Group A checks component behavior and its metadata output in this host page; it does not validate page generation or routing. Breadcrumb is a separate component and out of scope (DSR-539).

## 1. Environment

| Key | Value | Status |
|---|---|---|
| DEV base URL | `https://main--dsr-eds-dev--sutrix-projects.aem.live` | Confirmed |
| STG / PRO base URL | see `envs/stg.env`, `envs/pro.env` | Verify with Environments sheet |
| Site path | `/master/{lang}/` with lang = ja, en, zh | Assumed for ja/zh |
| Detail page URL pattern | `/master/{lang}/<TBD>/{movieId}` | Not implemented (DSR-536) |
| Movie list URL (redirect target) | `/master/{lang}/<TBD>` | Not implemented (DSR-536) |
| Dev test page | `/master/en/test-space/dsr-173-video-detail` | Manually authored placeholder embedding the component; page auto-generation not implemented |
| Auth | None (public) | Confirmed |

Rules: read-only tests on pre-seeded data (see `test-data.md`). Selectors per `data-testid.md`. Unknown URL/data → keep in `fixtures/dsr-173.ts` as constants marked `TODO`, never guess in specs.

## 2. Automation scope

| Group | Meaning | TCs |
|---|---|---|
| A | Component checks now (read-only; unresolved requirements/data remain blocked) | DSR-MOVIE-012, DSR-MOVIE-014, DSR-MOVIE-020, DSR-MOVIE-021, DSR-MOVIE-023, DSR-MOVIE-025, DSR-MOVIE-026, DSR-MOVIE-027, DSR-MOVIE-028, DSR-MOVIE-029, DSR-MOVIE-033, DSR-MOVIE-034 |
| B | Implementation or test data pending – later | DSR-MOVIE-001 [page auto-generation not implemented], DSR-MOVIE-002 [page auto-generation not implemented], DSR-MOVIE-003 [page auto-generation not implemented], DSR-MOVIE-005 [page auto-generation not implemented], DSR-MOVIE-006 [URL structure not implemented, DSR-536], DSR-MOVIE-007 [URL structure not implemented, DSR-536], DSR-MOVIE-008 [URL structure not implemented, DSR-536], DSR-MOVIE-009 [URL structure not implemented, DSR-536], DSR-MOVIE-010 [URL structure not implemented, DSR-536], DSR-MOVIE-011 [page auto-generation not implemented], DSR-MOVIE-016 [movie-detail-player-video not implemented, DAM test data pending], DSR-MOVIE-017 [movie-detail-player-video not implemented, DAM test data pending], DSR-MOVIE-018 [test data pending (see docs/DSR-173/test-data.md)], DSR-MOVIE-022 [test data pending (see docs/DSR-173/test-data.md)], DSR-MOVIE-024 [test data pending (see docs/DSR-173/test-data.md)], DSR-MOVIE-031 [page auto-generation not implemented], DSR-MOVIE-032 [ja/zh pages not available], DSR-MOVIE-035 [SP design pending] |
| C | Partial automation – later | DSR-MOVIE-013, DSR-MOVIE-015, DSR-MOVIE-019 |
| M | Manual only – do not automate | DSR-MOVIE-004, DSR-MOVIE-030 |

## 3. Group A test cases

Spec file: `tests/movie-detail/DSR-173.movie-detail.spec.ts`. Test title = `<TC ID> <title>`. `data:` refers to keys in `test-data.md`.

### DSR-MOVIE-012 – Verify movieTitle is displayed as the movie title (area ①).
- Ref: DSR-173 AC-4 / Figma ① · Priority: High · Lang: en (current DEV component host)
- Assert: getByTestId('movie-detail-title') text === fixture.movieTitle (exact, incl. ® and |); no '&amp;' / '&reg;' in text.

### DSR-MOVIE-014 – Verify a YouTube movie is played using movieSourceId.
- Ref: DSR-173 AC-5 / 業務AC-3 / DM_movie 4-2 · Priority: High · Lang: en (current DEV component host)
- Assert: (data: VALID_YOUTUBE) iframe[data-testid=movie-detail-player-embed] src contains fixture.movieSourceId and host youtube; no uncaught console error.
- Note: [Assumption #6] Embed URL pattern youtube.com/embed/{id}.

### DSR-MOVIE-020 – Verify products set in relatedProducts are displayed in the Related Products section (area ③).
- Ref: Figma ③ / DM_movie 5-2 · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: VALID_YOUTUBE) related-product-card count === fixture.relatedProducts.length; order and visible product code text (`related-product-code`, scoped to each card) match fixture.relatedProducts exactly. Blocked #1 → test.fixme.
- Note: `data-product-code` is pending dev confirmation; do not assert on it until confirmed. Observed attribute `productCode2223323` differs from visible product code `productId-01x`.
- Note: [Issue #1] Not in Jira AC / Figma spec text. Order, max count, bookmark icon behavior TBD.

### DSR-MOVIE-021 – Verify related videos, articles and LPs are all displayed, sorted by update date descending.
- Ref: DSR-173 AC-6 / 業務AC-4 / Figma 4 · Priority: High · Lang: en (current DEV component host)
- Assert: (data: RELATED_SORT) related-content-card titles in order === fixture.expectedOrder (update date desc). Assumption #13.
- Note: [Assumption #13] Video=updateDate (fallback publishDate); article/LP=page last modified.

### DSR-MOVIE-023 – Verify related videos that do not meet display conditions are excluded.
- Ref: DSR-173 AC-6 / 業務AC-5 · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: RELATED_FILTERED) cards do not include items whose movie is unavailable/inactive. Assumption #14.
- Note: [Assumption #14]

### DSR-MOVIE-025 – Verify carousel navigation of Related Content.
- Ref: Figma ④ · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: RELATED_6) viewport 1440: carousel-prev disabled at start; click carousel-next until last card visible; carousel-next disabled at end. Assumption #5 (4 cards/view).
- Note: Locate both `carousel-prev` and `carousel-next` inside `movie-detail-related-content`, never page-wide; related products has its own arrow pair.
- Note: [Assumption #5] Cards per view / loop TBD.

### DSR-MOVIE-026 – Verify card content, type tag and link of each related content type.
- Ref: Figma ④ · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: RELATED_MIXED) each related-content-card has a visible thumbnail (`related-content-card-image`, loaded with naturalWidth > 0), title, and data-content-type; movie→tag 'MOVIE', article→'STORY'; link href points to same lang path and returns 200.
- Known bug: **@known-bug DSR-538** — links point to the AEM publish domain under `/ja/` and return HTTP 500; thumbnails are absent (no `<img>`). Keep link and thumbnail assertions active so the test fails while this bug is open.
- Note: [Assumption #5] Tag for LP not defined.

### DSR-MOVIE-027 – Verify title and og:title output '{movieTitle} | YKK DIGITAL SHOWROOM'.
- Ref: DSR-173 AC-7 / Figma meta情報 · Priority: High · Lang: en (current DEV component host)
- Assert: <title> and meta[property=og:title] content === `${fixture.movieTitle} | YKK DIGITAL SHOWROOM`; exactly one of each tag.

### DSR-MOVIE-028 – Verify description and og:description output the description with line breaks removed.
- Ref: DSR-173 AC-7 / Figma meta情報 · Priority: High · Lang: en (current DEV component host)
- Assert: meta[name=description] and meta[property=og:description] contain no \n, \r or <br>; text equals fixture.description with line breaks removed (separator TBD: '' or ' ').
- Note: Confirm whether line break is replaced by nothing or a space.

### DSR-MOVIE-029 – Verify og:image outputs the Movie CF thumbnail as an absolute URL.
- Ref: DSR-173 AC-7 / Figma meta情報 · Priority: High · Lang: en (current DEV component host)
- Assert: meta[property=og:image] is absolute https URL; request returns 200 and content-type image/*.

### DSR-MOVIE-033 – Verify component sections and their order on PC.
- Ref: Figma 283:848 · Priority: Med · Lang: en · Viewport: 1440x900
- Assert: `movie-detail-title`, `movie-detail-player`, `movie-detail-related-products`, and `movie-detail-related-content` are visible and appear in that order.
- Scope: component sections only; exclude breadcrumb (separate component, DSR-539) and page chrome.

### DSR-MOVIE-034 – Verify the component back control exists.
- Ref: Figma 283:849 · Priority: Med · Lang: en
- Assert: `movie-detail-back` exists (count 1). Do not assert its destination URL.
- Note: DSR-540 — current href="/videos" returns 404. FE will strip the video id once URL structure is delivered (DSR-536). Navigation validation is deferred.

## 4. Groups B / C / M (not in scope now)

| TC | Group | Reason |
|---|---|---|
| DSR-MOVIE-001 | B | [page auto-generation not implemented] |
| DSR-MOVIE-002 | B | [page auto-generation not implemented] |
| DSR-MOVIE-003 | B | [page auto-generation not implemented] |
| DSR-MOVIE-005 | B | [page auto-generation not implemented] |
| DSR-MOVIE-006 | B | [URL structure not implemented, DSR-536] |
| DSR-MOVIE-007 | B | [URL structure not implemented, DSR-536] |
| DSR-MOVIE-008 | B | [URL structure not implemented, DSR-536] |
| DSR-MOVIE-009 | B | [URL structure not implemented, DSR-536] |
| DSR-MOVIE-010 | B | [URL structure not implemented, DSR-536] |
| DSR-MOVIE-011 | B | [page auto-generation not implemented] |
| DSR-MOVIE-016 | B | [movie-detail-player-video not implemented, DAM test data pending] |
| DSR-MOVIE-017 | B | [movie-detail-player-video not implemented, DAM test data pending] |
| DSR-MOVIE-018 | B | [test data pending (see docs/DSR-173/test-data.md)] |
| DSR-MOVIE-022 | B | [test data pending (see docs/DSR-173/test-data.md)] |
| DSR-MOVIE-024 | B | [test data pending (see docs/DSR-173/test-data.md)] |
| DSR-MOVIE-031 | B | [page auto-generation not implemented] |
| DSR-MOVIE-032 | B | [ja/zh pages not available] |
| DSR-MOVIE-035 | B | [SP design pending] |
| DSR-MOVIE-013 | C | Overflow check auto; CJK font manual |
| DSR-MOVIE-015 | C | iframe src auto; playback manual |
| DSR-MOVIE-019 | C | Layout auto; in-iframe error manual |
| DSR-MOVIE-004 | M | Universal Editor (IMS login, iframe) |
| DSR-MOVIE-030 | M | SNS debuggers need login + public URL |

### DSR-MOVIE-016 – Verify a DAM movie is played from movieAsset.
- Blocked: movie-detail-player-video not implemented; DAM test data pending.
- Ref: DSR-173 AC-5 / 業務AC-3 · Priority: High · Lang: en (current DEV component host)
- Assert: (data: VALID_DAM) video[data-testid=movie-detail-player-video] exists, no embed iframe; asset request status 200/206; after play currentTime > 0.

### DSR-MOVIE-017 – Verify the thumbnail is shown before playback.
- Blocked: movie-detail-player-video not implemented; DAM test data pending.
- Ref: DM_movie 3-1 / 業務AC-2 · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: VALID_DAM) video poster attribute resolves to fixture.thumbnail; request status 200.
- Note: Confirm if YouTube/Youku should also use CF thumbnail instead of provider poster.

### DSR-MOVIE-006 – Verify the page is displayed when all display conditions are met.
- Deferred: [URL structure not implemented, DSR-536].
- Ref: DSR-173 AC-3 / Figma 表示条件 · Priority: High · Lang: Any (run on ja)
- Assert: GET page → status 200, no redirect (final URL == requested URL); title, player, related sections visible.

### DSR-MOVIE-007 – Verify the page redirects to the movie list page when isUnavailable=TRUE.
- Deferred: [URL structure not implemented, DSR-536].
- Ref: DSR-173 AC-3 / 業務AC-5 · Priority: High · Lang: Any (run on ja)
- Assert: GET page (data: UNAVAILABLE) → final URL == movie list URL of same lang; detail title not present.
- Note: [Assumption #8] Record redirect code (301/302/client-side).

### DSR-MOVIE-008 – Verify the page redirects to the movie list page when isActive=FALSE.
- Deferred: [URL structure not implemented, DSR-536].
- Ref: DSR-173 AC-3 / 業務AC-5 · Priority: High · Lang: Any (run on ja)
- Assert: GET page (data: INACTIVE) → final URL == movie list URL of same lang.

### DSR-MOVIE-009 – Verify the page redirects to the movie list page when isBoothLimited=TRUE.
- Deferred: [URL structure not implemented, DSR-536].
- Ref: DSR-173 AC-3 · Priority: High · Lang: Any (run on ja)
- Assert: GET page (data: BOOTH_LIMITED) → final URL == movie list URL of same lang.

### DSR-MOVIE-010 – Verify redirect goes to the list page of the same language for each site.
- Deferred: [URL structure not implemented, DSR-536].
- Ref: DSR-173 AC-3 / 業務AC-7 · Priority: Med · Lang: ja / en / zh
- Assert: For lang in [ja,en,zh]: GET page (data: UNAVAILABLE) → final URL starts with /master/{lang}/ and == list URL of that lang.
- Note: [Assumption #8]

### DSR-MOVIE-032 – Verify each language page displays the Movie CF of the same language.
- Deferred: [ja/zh pages not available].
- Ref: DSR-173 業務AC-7 / DM_movie_related · Priority: High · Lang: ja / en / zh
- Assert: For lang in [ja,en,zh]: html[lang] === lang; movie-detail-title === fixture[lang].movieTitle.
- Note: [Issue #16] Language copy of common CF to be confirmed.

### DSR-MOVIE-018 – Verify the component does not break when movieSource=YouTube and movieSourceId is empty.
- Deferred: [test data pending (see docs/DSR-173/test-data.md)]. The required CF state is unavailable on the current DEV page.
- Ref: DM_movie 4-1/4-2 · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: YOUTUBE_EMPTY_ID) no iframe with src ending '/embed/' or '/embed'; other sections visible; no uncaught JS error. Blocked #12 (expected behavior not confirmed) → test.fixme until confirmed.
- Note: [Assumption #12] No conditional validation in CF; expected behavior pending BA.

### DSR-MOVIE-022 – Verify a related video without updateDate is sorted correctly.
- Deferred: [test data pending (see docs/DSR-173/test-data.md)]. The required CF state is unavailable on the current DEV page.
- Ref: DSR-173 AC-6 / DM_movie 6-3 · Priority: Med · Lang: en (current DEV component host)
- Assert: (data: RELATED_NO_UPDATEDATE) video without updateDate placed by publishDate: expected order from fixture. Assumption #13.
- Note: [Assumption #13]

### DSR-MOVIE-024 – Verify the Related Content section is hidden when no related content is set.
- Deferred: [test data pending (see docs/DSR-173/test-data.md)]. The required CF state is unavailable on the current DEV page.
- Ref: Figma ④ · Priority: Low · Lang: en (current DEV component host)
- Assert: (data: NO_RELATED) movie-detail-related-content not in DOM (count 0, not just hidden). Assumption #5.
- Note: [Assumption #5]

## 5. Open issues affecting automation

#1 related products spec · #5 carousel behavior · #8 redirect code/target · #9 query-index fields · #11 page generation trigger · #12 empty movieSourceId behavior · #13 related sort field · #14 related filtering. Unconfirmed requirements or missing fixture data remain blocked with `test.fixme()` and an issue comment; do not treat assumptions as confirmed expected results. DSR-MOVIE-026 retains active assertions for the confirmed DSR-538 defect.

Deployment/scope issues: DSR-536 URL structure; DSR-538 related content links, HTTP 500 and missing thumbnails; DSR-539 breadcrumb (separate component, out of scope); DSR-540 back link destination (existence-only check in Group A).
