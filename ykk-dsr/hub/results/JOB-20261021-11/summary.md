# JOB-20261021-11 – DSR-654 CATOV 001–021 from TC sheet (claude-code, DEV)

**Merge/incident-related:** none (all fails cause = `none`).

What was done: spec `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts` now covers DSR-CATOV-001…021 (placeholder note removed, 001–008 titles aligned to the TC sheet, 009–021 added; 013 fixme "Manual – QA-PT", 020 fixme "Visual – codex job"; 018 form shown → Pending, not fail; 005/014 keep BL-OVL-1 redirect-to-list). Fixture `fixtures/dsr-654.ts` has TD-654-01..08 defaults (DSR654_INACTIVE_ID / DSR654_REMOVED_ID env still override); preflight 404 → skip `TD-654-0N not seeded (id)`. Page object gained image/description/date/type/action locators (TODO data-testid).

Run (read-only, `.aem.page` via DSR654_BASE, ja+en, chromium): 62 tests – 11 pass, 2 fail, 49 skipped; `npx tsc --noEmit` exit 0. Report: `results/DSR-654/DEV/automation-run-20261021-job11.md`.

| TC | lang | result | cause | confidence bug | suspect | why |
|---|---|---|---|---|---|---|
| DSR-CATOV-003 qa190-cat-pdf-form | en | fail | none | 30% | data | .aem.page 200, .aem.live 404 – looks Preview-only, TC 3.0 needs Publish (live) |
| DSR-CATOV-003 qa190-cat-ebook-form | en | fail | none | 30% | data | same |

- Seed: only en qa190-cat-pdf-form / qa190-cat-ebook-form exist (.aem.page). All ja ids, en qa190-cat-pdf / qa190-cat-ebook and TD-654-02/04/08 are 404 → skipped.
- 018 [en] Pending (A5): form is shown for the e-book with requiresForm ON. Live `catalog-link.js` says DSR-655 Y3 was decided 2026-10-20 (e-book gated) – please confirm and re-baseline TC 18.0.
- Heads-up (suspect test/spec): live `catalog-detail.js` sends non-form catalogs straight to the file and unavailable pages to the list. TC 1.0/12.0/15.0/17.0/19.0 expect a detail page with a button for qa190-cat-pdf/ebook → likely fail once seeded.
- 006/010/011 [en] pass, but an expected 404 cannot prove TD-654-03/05/06 were seeded.
- No evidence screenshots: both fails are request-only tests (no page screenshot).
