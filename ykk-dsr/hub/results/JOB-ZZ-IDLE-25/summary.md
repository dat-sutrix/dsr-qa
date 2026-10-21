# JOB-ZZ-IDLE-25: DSR-654 catalog overlay on .aem.page (DEV, en, read-only), run 2026-10-21 08:46:12–08:46:31Z
## Merge/incident-related
| TC | lang | symptom | cause | confidence (product bug) | evidence |
|---|---|---|---|---|---|
| DSR-CATOV-003 qa190-cat-pdf-form | en | .aem.page 200, .aem.live 404 | overlay-merge | 20%: DSR CF last modified 2026-10-20, before the 21/10 08:25Z page-generation fix, so it needs one re-publish (BL-OVL-1 update) | evidence/DSR-CATOV-003_en_qa190-cat-pdf-form_live.png |
| DSR-CATOV-003 qa190-cat-ebook-form | en | .aem.page 200, .aem.live 404 | overlay-merge | 20% (same reason) | evidence/DSR-CATOV-003_en_qa190-cat-ebook-form_live.png |
## Run
- `DSR654_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page`, chromium, `--grep '\[en\]'`: 17 tests, 6 passed, 2 failed (above, the same as JOB-20261021-02), 9 skipped. Assertions unchanged; `npx tsc --noEmit` exit 0.
## Content checks (en, .aem.page): all passed (proposed)
| Check | qa190-cat-pdf-form | qa190-cat-ebook-form |
|---|---|---|
| HTTP / redirect | 200, final URL = requested | 200, final URL = requested |
| Rendered title / `<title>` | "QA190 PDF form required" / "… \| YKK DIGITAL SHOWROOM" | "QA190 e-book form" / "… \| YKK DIGITAL SHOWROOM" |
| Form slot (requiresForm true) | 1 `form.catalog-detail-form` | 1 |
| meta cf-path = row cfPath | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form |
| catalogId vs node name (BL-OVL-1 21/10) | qa190-cat-pdf-form = node name, [a-z0-9-] | qa190-cat-ebook-form = node name, [a-z0-9-] |
| catalogType / requiresForm / source | pdf / true / overlay | ebook / true / overlay |
- DSR-CATOV-004: uppercase and underscore variants both return 404. DSR-CATOV-008: 0 GraphQL / execute.json requests, html lang="en".
- Skips (cause none, data): en qa190-cat-pdf and qa190-cat-ebook return 404 on .page and .live. There are no TD ids for isActive=false or unpublished. catalog/search returns 404 on .page.
- Not verified: ja (out of job scope, no ja DSR CF), the content CF name (the cf-path row shows only the DSR CF), and that the content and DSR CF ids match beyond the catalogId row. Raw data: observations.json. Run report: results/DSR-654/DEV/automation-run-20261021-idle25.md.
