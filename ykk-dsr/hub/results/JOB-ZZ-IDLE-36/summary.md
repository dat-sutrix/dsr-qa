# JOB-ZZ-IDLE-36 — DEV viewport baseline and Lighthouse
Run: 2026-10-22T09:17:02.586Z → 2026-10-22T09:34:56.372Z; base: https://main--dsr-eds-dev--sutrix-projects.aem.live.
Captured 40 unmodified viewport PNGs across seven URLs × PC 1440×900 / SP 390×844, in 700 px scroll steps (last position clamped to page end).
All 14 navigations returned HTTP 200; no capture errors. Evidence: `evidence/baseline-20261022/`; exact URLs, body text, scroll positions, and individual audit metrics: `results/JOB-ZZ-IDLE-36/measurements.json`.
Lighthouse 13.5.0: 42/42 sequential performance audit attempts; median of three (individual scores in parentheses).
| Path | Mobile median (runs) | Desktop median (runs) |
|---|---|---|
| /ja/library/video/qa587-main | 95 (95, 95, 80) | 96 (96, 96, 96) |
| /en/library/video/qa587-main | 93 (91, 94, 93) | 96 (96, 96, 100) |
| /ja/library/catalog/qa190-cat-pdf-form | 57 (56, 66, 57) | 91 (91, 91, 90) |
| /en/library/catalog/qa190-cat-pdf-form | 67 (69, 67, 65) | 91 (93, 91, 84) |
| /en/library/catalog/qa654-update | Unavailable — NOT_HTML | Unavailable — NOT_HTML |
| /ja/library/catalog | 77 (78, 74, 77) | 93 (94, 92, 93) |
| /en/library/catalog | 93 (93, 91, 93) | 96 (96, 96, 99) |
Runner session exit 143 after all 42 attempts and finished timestamp were saved; cause unverified. Capture/audit command: `node results/JOB-ZZ-IDLE-36/run.cjs`; report: `node results/JOB-ZZ-IDLE-36/report.cjs`.
TypeScript: initial `npx tsc --noEmit` exit 2 (missing installed yaml); restored declared dependency with `npm install --no-save --package-lock=false --ignore-scripts yaml`; recheck exit 0, no errors. No npm test suite ran.
Proposed outcome: captures complete; all requested audits attempted; 0 capture failures, 6 audit failures. qa654-update redirects to a PDF: NOT_HTML, cause=none, suspect=test, product-bug confidence=0%; both medians unavailable. No performance threshold or approved visual comparator; no product verdict.
Open points: deployed build and republish state not independently verified; screenshot spot-check only. Lighthouse warnings retained in measurements; full raw audit JSON remains uncommitted in /tmp/idle36-lh/.
Deadline 07:30 VN on 2026-10-22 was already past when this execution began; completion deadline missed. Automation HEAD: b58220c8fbd5f28fc4033bfa62ef6eafa5d62897.
