# DSR-557 DEV automation run — 20261023-job03

JOB-20261023-03: Youku TCs 3.0 / 7.0 / 11.0 after Agent Author seeded TD-557-YOUKU (apply 2026-10-23 02:30:51Z).

## 1. Header

- Run start (UTC): 2026-10-23T02:36:47Z
- Run end (UTC): 2026-10-23T02:37:47Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (spec checks `.aem.page` + `.aem.live`)
- Target page(s): `/{ja,en}/library/video/qa557-youku`
- Build under test: not independently verified
- Baseline ID: BL-v1 (Drive DSR-190 TC file, QA edition 2026-10-15: TC 3.0, 7.0, 11.0 + Assumption A4)
- Automation HEAD commit SHA: 3cf5d65f7e689c583acf17e982b6c68cc60b0803 + uncommitted changes of this job (fixtures/dsr-557.ts, tests/catalog-video/DSR-557.catalog-video.spec.ts), committed with this report
- Exact command used:

```sh
npx playwright test tests/catalog-video/DSR-557.catalog-video.spec.ts --grep "DSR-CATV-003|DSR-CATV-007|DSR-CATV-011" --reporter=list
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 9 | 8 | 0 | 1 | 0 | 1 (config 2) | configured 1; 0 used | 58.0 s |

Counts are unique tests. Proposed outcomes only; human QA confirms. Scope: new Youku tests only; chromium, PC 1440×900. Flaky: 0.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | pass | 6.1 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 8.0 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | pass | 5.9 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 7.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | pass | 7.3 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 7.3 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | pass | 6.0 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 7.5 s | — |

Observed: no iframe before click; after click iframe `src` = `https://player.youku.com/embed/XNTgyNzE1ODE5Ng==` (no autoplay); CSP `frame-src` contains `https://player.youku.com`; 0 `securitypolicyviolation` events, 0 console CSP errors.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATV-011 | Blocked-by: DSR-611 #2 cn switching rule not decided; no /master/cn on DEV (Issue #18) |

## 6. Failed tests

None

## 7. Open points for QA

- TC 3.0 is `cn` in the TC file; DEV has no cn site → run on ja/en overlay pages of the Youku CF. Real Youku playback not asserted (TC Assumption A4) – embed src only.
- TC 7.0 "Only the required domains are added" not asserted: no approved domain list. Current `frame-src` also allows player.vimeo.com, platform/syndication.twitter.com, www.google.com, google.com, js.hsforms.net, s7ap1.scene7.com – QA to judge.
- The violation listener (`securitypolicyviolation` init script) was not tested against a page with a known violation.
- Build identity not verified.
