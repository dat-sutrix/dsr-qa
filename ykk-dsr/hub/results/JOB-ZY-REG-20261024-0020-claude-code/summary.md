# JOB-ZY-REG-20261024-0020-claude-code – R3 P1 + P3, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| DSR-CATV-018 | ja, en | REG-2020 / 2026-10-23T13:33Z | `QA190 NEW 10` (publishDate 10-13) shows NEW, test expects none (today 10-24 JST) | none – data and file headers unchanged; time-window artefact | none | 15% |
| DSR-CATV-019 | ja, en | REG-2020 / 2026-10-23T13:33Z | `QA190 UPD 10` (updateDate 10-13) shows UPDATE, test expects none | none – same | none | 15% |

**NEW FAIL analysis:** retried 2× (`--repeat-each 2 --retries 0`): fail 2/2. Page and `dsr-catalog-list` return HTTP 200, and the QA190 data is unchanged (raw `q_dsr-catalog-list_{ja,en}.json`, `catv-raw.json`). Test `today()` = JST (2026-10-24), while the browser runs in host TZ Europe/Berlin (2026-10-23), so the product's browser-local date still counts 10 days. With browser TZ Asia/Tokyo, CATV-018/019/020 pass 6/6. Suspect `test`. Question for Claude: which TZ does the 10-day rule use? Fix options: `timezoneId: 'Asia/Tokyo'` for 557, or compute today in the browser.

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 17:24–17:39Z): overlay 257 → 204 pass / 12 fail / 41 skip (1 flaky). P1 non-overlay `@auto` + 227: 82 → 36 / 18 / 28. Smoke + 433 + 591 retest: 11 → 11 / 0 / 0. Total 350: 251 / 30 / 69. `tsc --noEmit` exit 0. No code changes, no AEM writes, no mail sent.
**Known fails unchanged** (cause none, as in REG-2020): 654 CATOV-001 -form ×4 + CATOV-012 ×2 · 570 CATDL-007 ja, CATDL-016 en · 583 PLSP-002/003/005, PRODLIST-001..004 · 609 TOP-004..007. CATOV-001 [ja] qa190-cat-pdf passed on retry (flaky).
**P3 baselines** (first ledger entry, not NEW FAIL): 227 ASSET-016 ja/en pass, 15 skip (TD-227-02 not delivered) · 433 MAIL-016/017 pass · 591 retest 8/8 pass · 647 retest 501-P2/P3 en pass · 538 retest 2 pass / 4 skip. Retest keys = `<TC> (retest-<ticket>) [lang]`.

**4a REG-VIDLIST:** on en page 1, "QA587 main movie" appears 2× with different hrefs and different DSR CFs (`/content/dam/dsr/en/movies/standard/QA587_Upper` + `.../qa587-main`). Both point to content CF `/content/dam/common/en/movies/qa587-main` → **data**, not code. A 3rd CF `.../qa587/qa587-sub` is off page 1. ja: shown once. Raw `q_video-search_{ja,en}_0.json`.
**4b 566:** **not found** under a new path. `fixtures/paths.ts` has no news-detail entry, and `test-news-detail-template` is 404 (.live/.page, /master and non-master). Pages that exist: `/master/{en,ja}/test-space/qa566-news-01` (200; en in query-index), usable via `DSR566_SLUG`.
**4c headers** (.live = .page, unchanged vs REG-2020): scripts.js 19 Oct 03:10:29Z · styles.css 09 Oct 01:34:56Z · header.js 30 Sep 05:35:24Z · footer.js 15 Sep 06:07:33Z · eco-carousel.js 19 Oct 04:43:32Z, .css 23 Oct 07:21:26Z. DSR-639/661/675: **not verified** (README §7).

**Outputs:** ledger updated (33 keys changed: 4 NEW FAIL + 29 new baselines; 376 keys) · run report `results/REGRESSION/DEV/automation-run-20261023-reg0020.md` · `result.json` · `observations.json` · 28 fail PNGs (3.6 MB) + 2 observation PNGs.
