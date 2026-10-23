# DSR-590 DEV job capture report

## 1. Header
- Start/end UTC: 2026-10-23T05:12:52.767Z / 2026-10-23T05:13:45.901Z
- DEV: https://main--dsr-eds-dev--sutrix-projects.aem.live and .aem.page
- Target: /master/{ja,en}/test-space/dsr-590-eco-top-page
- Build: not independently verified; CSS Last-Modified captured in job measurements.json.
- Baseline: JOB-20261023-12 explicit threshold, IDLE-41 first round, JOB-20261022-04.
- Automation HEAD: ab9def173b52ebbbcb69a7c59b9f45ee67c01b58
- Command: `node ykk-dsr/hub/results/JOB-20261023-12/capture.cjs > /tmp/job12-capture.log`

## 2. TypeScript check
`npx tsc --noEmit`: exit 0, no errors.

## 3. Suite summary
Direct Chromium read-only capture, not an npm suite. 20 page visits: 10 Japanese HTTP 200 captures, 10 English HTTP 404 conditional exclusions. Serial browser, no retries; exit 0. Wall time: 53.1 seconds.
Logical outcomes: 10 proposed Pass (666), 10 Pending (REG), 40 skipped/observation-only (English conditional cases and 667). No proposed Fail.

## 4. Executed tests
| TC ID | Title | Result | Duration | Failure reason |
|---|---|---|---|---|
| DSR-666-RT ×10 | Gap, all five viewports on both hosts | Proposed Pass | Individual timing not recorded | None; 0 px throughout |
| DSR-590-REG ×10 | TOP layout regression | Pending | Individual timing not recorded | List scope unresolved; TOP renders product-list link, no inline listing block |
| DSR-667-OBS ×10 | Dot/arrow geometry | Observation only | Individual timing not recorded | No verdict requested |

## 5. Skipped tests
- All English cases: “English URL returned HTTP 404; job requires English only if HTTP 200.”
- DSR-667: “Observation only; In Progress; no verdict.”

## 6. Failed tests
None. Pending regression point: product list could mean the rendered 製品一覧 navigation link; no inline list is present. No expected result has been inferred.

## 7. Open points for QA
- Proposed outcomes only. Dat confirms DSR-666 closure.
- Figma and build identity not independently verified. No authenticated systems accessed.
- Job summary, raw observations, screenshots and before/after card: `ykk-dsr/hub/results/JOB-20261023-12/`.
- Screenshots explicitly requested by job are committed (under 5 MB). No traces, videos or HTML reports committed. `test-results/` and `playwright-report/` remain ignored.
- Supplemental read-only DOM inspection is recorded in regression-details.json; the TOP contains breadcrumb and eco-carousel blocks and a product-list link on both hosts.
