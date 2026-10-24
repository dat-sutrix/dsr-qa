# JOB-20261024-05 – DSR-670 tech-talk spec (DEV, ja/en) – done
**Merge/incident-related (cause ≠ none): none. NEW FAIL (13.0 vs ledger): none after rerun** (2 transient en list fails, see 13.0). New spec `tests/movie-detail/DSR-670.tech-talk.spec.ts` (+ `fixtures/dsr-670.ts`): 13 tests, 3 pass · 0 fail · 10 skip. DEV has no tech-talk CF: `dsr-techmovie-page` returns empty for all four qa670-* ids, so every data TC was skipped as Blocked-by. Author cookie 401.
| TC | Proposed | Raw value | suspect / cause / conf. |
|---|---|---|---|
| 1.0 / 2.0 | Skipped (cookie) | `node tools/author/author.mjs models` → HTTP 401 (02:35:54Z) | env / none / – |
| 7.0 ja | Pending (positive Skipped) | qa670-tech → 200 `related []`, `inactive []` = Blocked-by TD-670-01. Negative `does-not-exist` → 200, `related []`, no `errors` = **Pass** | data / none / – |
| 8.0 ja / en | Skipped | Blocked-by TD-670-01; `/ja/library/video/tech-talk/qa670-tech` 404 | data / none / – |
| 9.0 ja | Skipped | Blocked-by TD-670-01 (404 is meaningless while qa670-tech is missing) | data / none / – |
| 10.0 / 11.0 / 12.0 ja | Skipped | Blocked-by TD-670-02 / -03 / -04 | data / none / – |
| 13.0 ja | Pass | `dsr-video-page` qa587-main 200, aliases related+inactive, item present; DSR-587 specs ja 0 NEW FAIL | – |
| 13.0 en | Pass (flaky) | query ok. DSR-VOV-011 [en] search + VOV-013 [en] failed 2/2 attempts ≈02:39Z: `/en/library/video/search` showed "Unable to load video information." Both passed on rerun 02:40Z; raw page + `dsr-video-list` en (30 items) ok | env / none / 20% |
| 14.0 ja | Skipped | Blocked-by TD-670-01; pre-TD snapshot: list 6 cards, `dsr-video-list` ja 7 items, 0 qa670 / movies/tech → `list-before-td670.json` | data / none / – |
Why 13.0 en flaked: the list block's client-side fetch (`dsr-video-list;folder=…/en/movies/standard/;cb=…`) failed for about 1 minute and then recovered. The failing response was not captured, so this is not proven to be a 670 regression. Watch for a repeat, since it has the same symptom as DSR-673.
DSR-501-P2/P3 [en]: ledger fail (01:23Z) → pass now.
Rerun (run-only, after lane author/chrome creates TD-670-01..04) needs no code change; 14.0 compares counts with `list-before-td670.json`.
Reports: `results/DSR-670/DEV/automation-run-20261024{,-r587,-rerun1}.md`. Evidence: 2 PNG (the VOV-011/013 en fails).
