# JOB-20261020-03: DSR-586 positives (TD-586-01/02), DEV ja, .aem.live + .aem.page, 2026-10-21 16:43–16:45Z
## Merge/incident-related
None. 0 fails; both blockers have cause = none.
## Result
- **Code:** I updated fixtures/dsr-586.ts from the re-baselined spec.json (ver0.4 TD-586-01 values, 17.0 display fields, 20.0 new fields, 21.0 media slots). 17.0 is rewritten to use the raw overlay row as the CF oracle, with the TD cross-check and the not-rendered fields listed as Pending. 20.0 is new: it records the current state and its verdict is Blocked (no design). 21.0 is new: media01 comes first, there is one gallery thumb per filled slot, and it checks for broken images and failed media requests. There is also a new preflight: when a positive TD shows `unavailable` it skips instead of failing. tsc had no errors.
- **Run:** 11 ja TCs (001–004, 012–014, 017, 019–021) ran twice, on .aem.live and on .aem.page. Both runs: 0 pass, 0 fail, 11 skip, exit 0. Reports: results/DSR-586/DEV/automation-run-20261021-job20261020-03-{live,page}.md.
- **Why everything is blocked (suspect data, cause none, ~15% product):**
  - /ja/products/990586001 returns 200 on both tiers, but the raw overlay rows contain only `cfPath` and `unavailable | no-product`, with noindex and the default title. So the DSR CF is published but the product does not resolve. Most likely the CF commune 990586001 is not published, or the DSR CF `product` reference is empty or wrong.
  - Product 46 renders fully on the same build. A sanity run of 017/021 on 46 passed and 020 recorded its state, so the code path works.
  - /ja/products/990586002 (TD-586-02) is 404 on .aem.page, so the preview publish is missing.
- **Not run:** 15.0/16.0 (visual, codex lane), 18.0 (manual, Q31), en/cn (job lang = ja).
- **Next:** QA-PT should check in Author that the CF commune 990586001 is published (live) and that the DSR CF `product` field points to it. They should also Preview the DSR CF 990586002 and fill the optional TD-586-01 fields. Then re-run the same commands (see reports §1).
- No failures, so no evidence screenshots. No content edits, logins or form submits.
