# DSR-566 baseline BL-v1 (News detail, template news-article)

Copied verbatim from `ykk-dsr/hub/tc-out/DSR-566.spec.json` on 2026-10-15 (JOB-20261015-09). Source: https://sutrix.atlassian.net/browse/DSR-357 (BAC 1–5 / TCC 1–6). Do not edit expected results here; re-copy when the TC file changes.

Automation ID: `DSR-NEWS-0NN`, NN = TC number.

## Assumptions

| ID | Assumption | Source | Impact |
|---|---|---|---|
| A1 | Baseline BL-v1 = DSR-357 description (BAC 1-5, TCC 1-6) + comments Ngoc 2026-09-29, Toan 2026-09-30 and 2026-10-06; DSR-566 has no own AC. | Jira DSR-357 | Re-baseline if AC changes |
| A2 | Page is composed of shared blocks: article-meta (date/My List/share) + news-detail (category/title) + text/image/spacer + button(Button8); Back to list is a fixed template area (not authored). | Ngoc 2026-09-29, Toan 2026-09-30 | TC 1, 2, 17 change |
| A3 | News list and /{lang}/news/ pages are out of scope (DSR-170/525); TC 6 (target 200) and 8 are Blocked until the list is on DEV; href checks still run. | DSR-357 overview | — |
| A4 | Date display format follows Figma C27 (ja YYYY.MM.DD). Confirm via tc-questions. | Figma 6010-59004 | TC 3 expected |
| A5 | Test pages are created under /master/{lang}/test-space/qa566-*; query-index check uses the index that contains these paths. Breadcrumb TC 11 needs a page under the news path (TD-566-04). | [Giả định] | TC 7, 11 |
| A6 | DEV phase only (03 §0): cn and visual baselines may be Blocked; Lighthouse not in this ticket. | 03 §0 | — |
| A7 | Template changed 2026-10-22: `news-detail` (ニュース詳細) = Article Meta → Title → Text (news type, free text "お知らせ") → Spacer → Text (body) → Image → Spacer → Button (button8). The `news-detail` block with `category@select` is gone. A2 is superseded for selectors only; TC intent unchanged. | JOB-20261022-15 + Dat 22/10 | Selectors TC 1, 2, 4, 13 (JOB-ZZ-IDLE-37) |
| A8 | TC 2.0 order is checked as meta (date) → title → news type → spacer → body → image → spacer → CTA → Back to list. Image, second spacer and CTA are optional (TD-566-02). Back to list is still required (TC intent), but the new template does not place it, so a fail is possible and goes to Claude. | JOB-20261022-15 + Dat 22/10 | TC 2 |
| A9 | TC 4.0 category = the news type, read from the Text block directly under Title (`.title-wrapper + .text-wrapper > .text.block`). Body = every other Text block. The title is read from the heading in the Title block (template level h2, so the "single h1" check stays recorded only). | JOB-20261022-15 + Dat 22/10 | TC 1, 4, 13 |
| A10 | TC 3.0: shown date must match YYYY.MM.DD in every language (DSR-660 rule), and must equal page meta `publicationdate`, falling back to `published-time`. Supersedes A4. | JOB-20261022-15 + Dat 22/10 | TC 3 |
| A11 | TC 7.0 / 8.0 also read page-level `<meta name="category">` when present: the index row `category`, and the list item for TC 8, must contain it. TC 8 runs only when the page under test is under `/{lang}/news/` (TD-566-03); otherwise it is skipped as Blocked. | JOB-20261022-15 + Dat 22/10 | TC 7, 8 |

## Test cases

| TC | Automation ID | Feature | Expected | Exec | Lang | TD | Blocked note |
|---|---|---|---|---|---|---|---|
| 1.0 | DSR-NEWS-001 | Page creation with template ニュース詳細ページ作成 (BAC#1 / TCC#1) | EN: Exactly one of each is visible: date (article-meta), category + title (news-detail), body text, image, Back to list button. No empty block, no console error. JP: 日付・カテゴリ・タイトル・本文・画像・一覧へ戻るボタンが各1つ表示、空ブロック・コンソールエラーなし。 | Automation | ja, en | TD-566-01 | — |
| 2.0 | DSR-NEWS-002 | Fixed layout order 固定配置 (TCC#1) | EN: Order = article-meta (date/My List/share) → news-detail (category, title) → body (text/image…) → CTA button (if authored) → Back to list. Back to list is rendered by the template even though the author did not place it. JP: 順序が article-meta → news-detail → 本文 → CTA → 一覧へ戻る。一覧へ戻るはオーサー配置なしで表示。 | Automation | ja | TD-566-01 | — |
| 3.0 | DSR-NEWS-003 | Date display 日付表示 | EN: ja shows 2026.10.01 (format per Figma C27); en shows the same date in the Figma en format. Date matches query-index publishDate. JP: Figma C27 の形式で 2026-10-01 を表示、query-index と一致。 | Automation | ja, en | TD-566-01 | [Giả định] date format per Figma; see tc-questions |
| 4.0 | DSR-NEWS-004 | Category and title カテゴリ・タイトル | EN: Category text and title text equal the authored values; title is the single h1 of the page. JP: 値が一致、タイトルはページ内唯一のh1。 | Automation | ja, en | TD-566-01 | — |
| 5.0 | DSR-NEWS-005 | Long title / no image 長いタイトル・画像なし (boundary) | EN: Title wraps inside the content width, no horizontal scroll (scrollWidth <= clientWidth), no empty image placeholder. JP: 横スクロールなし、空の画像枠なし。 | Automation | ja | TD-566-02 | — |
| 6.0 | DSR-NEWS-006 | Back to list link 一覧へ戻る遷移 (BAC#3 / TCC#3) | EN: href ends with /ja/news/ (ja) and /en/news/ (en); same tab; target page HTTP 200. If target returns 404 on DEV → Blocked (news list DSR-170/525 not on DEV), href check still Pass. JP: hrefが /{lang}/news/、同一タブ、遷移先200。 | Automation | ja, en, cn | TD-566-01 | News list page /{lang}/news/ on DEV (DSR-525) – href part not blocked |
| 7.0 | DSR-NEWS-007 | Metadata in query-index メタデータ出力 (TCC#2) | EN: Row exists with publishDate, category, tags (both values), template = news-article, matching page properties. JP: 該当行に4項目があり、値が一致。 | Automation | ja, en | TD-566-01 | [Giả định] index path for test-space pages; see tc-questions |
| 8.0 | DSR-NEWS-008 | Appears on news list 一覧への自動反映 (BAC#2) | EN: TD-566-03 appears in the list (title, date) without manual list editing. JP: 一覧に表示される。 | Automation | ja | TD-566-03 | News list DSR-170/525 (out of scope of this ticket) – run when list is on DEV |
| 9.0 | DSR-NEWS-009 | No related content 関連コンテンツ非表示 (TCC#4) | EN: No related-content / related-article block or heading in the page. JP: 関連コンテンツの要素なし。 | Automation | ja | TD-566-01 | — |
| 10.0 | DSR-NEWS-010 | CTA button 詳しく見る | EN: Navigates to the authored URL (HTTP 200); button style matches Button8. A page without CTA (TD-566-02) shows no button. JP: 設定URLへ遷移、未設定ページではボタンなし。 | Automation | ja | TD-566-01, TD-566-02 | — |
| 11.0 | DSR-NEWS-011 | Breadcrumb パンくず | EN: 3 items: HOME > News List label > page title; last item not a link. JP: 3項目、最後はリンクなし。 | Automation | ja, en | TD-566-01 | Test page is under test-space, not /{lang}/news/ – needs TD-566-04 under news path; HOME 404 on DEV (DSR-552 B3) |
| 12.0 | DSR-NEWS-012 | My List / share in article-meta | EN: My List toggles state and the item is added only under the same root (/master/{lang}/mylist); each share opens the correct service URL with the page URL encoded. JP: 同一ルートにのみ追加、シェアURLが正しい。 | Automation | ja | TD-566-01 | — |
| 13.0 | DSR-NEWS-013 | Body rich text 本文書式 | EN: h2, strong, ul/li and a[href] present as authored; link opens target. JP: 書式要素が存在。 | Automation | ja | TD-566-01 | — |
| 14.0 | DSR-NEWS-014 | Design PC デザイン確認 PC (BAC#4 / TCC#5) | EN: No visual diff beyond threshold on title, meta, body, button areas (content text excluded). JP: 差分なし。 | Visual (Playwright VPS) | ja | TD-566-01 | — |
| 15.0 | DSR-NEWS-015 | Design SP デザイン確認 SP (BAC#4 / TCC#5) | EN: Matches baseline; scrollWidth <= clientWidth. JP: 一致、横スクロールなし。 | Visual (Playwright VPS) | ja | TD-566-01 | — |
| 16.0 | DSR-NEWS-016 | Multilingual 多言語 (BAC#5 / TCC#6) | EN: Each language shows its own title/category and UI labels (Back to list / 一覧へ戻る); lang attribute matches. JP: 各言語の文言、lang属性一致。 | Automation | ja, en, cn | TD-566-01 | cn: no /master/cn on DEV (Quentin) |
| 17.0 | DSR-NEWS-017 | Authoring – required structure オーサリング | EN: Template is selectable; page publishes; Back to list appears without being added; page properties have publish date, category, tags. JP: テンプレート選択可、一覧へ戻る自動表示、プロパティ項目あり。 | Manual | ja | TD-566-05 | — |
| 18.0 | DSR-NEWS-018 | SEO meta / OGP | EN: <title> and og:title contain the news title; og:image is an absolute URL returning 200; meta description equals the authored description. JP: 値が一致、og:image 200。 | Automation | ja, en | TD-566-01 | — |

## Test data (planned)

| ID | TCs | Type | Path | Fields | ja | en | cn | Publish |
|---|---|---|---|---|---|---|---|---|
| TD-566-01 | 1-4, 6, 7, 9-16, 18 | Page news-article | /master/ja/test-space/qa566-news-01 (+ en copy) | title / category / publish date / tags / description / body / image / CTA | QA566 ニュース詳細テスト / お知らせ / 2026-10-01 / tagA, tagB / QA566 description ja / h2+bold+list+link / any test png / 詳しく見る → /master/ja/test-space | QA566 News detail test / News / 2026-10-01 / tagA, tagB / QA566 description en / same / same / Learn more → /master/en/test-space | (when cn site exists) | Yes |
| TD-566-02 | 5, 10 | Page news-article | /master/ja/test-space/qa566-news-02 | title (100 full-width chars) / no image / no CTA | 長いタイトル長いタイトル… (100 chars, copy from TC note) / — / — | — | — | Yes |
| TD-566-03 | 8 | Page news-article | /master/ja/news/qa566-news-03 (only when /ja/news exists) | title / publish date | QA566 一覧反映テスト / today | — | — | Yes |
| TD-566-04 | 11 | Page news-article | /master/ja/news/qa566-news-04 (only when news path exists) | title | QA566 パンくず | — | — | Yes |
| TD-566-05 | 17 | Page (created during TC) | /master/ja/test-space/qa566-author | title | QA566 Author | — | — | Yes |
