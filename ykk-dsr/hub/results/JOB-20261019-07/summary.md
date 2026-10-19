# JOB-20261019-07 – DSR-BREAD-014 retest (DSR-651 fix), DEV

- Ran the existing spec unchanged (`--grep DSR-BREAD-014 --project=chromium`) twice in a row: run 1 10:23:08–10:23:25Z, run 2 10:23:25–10:23:36Z. Both passed with no retry. tsc: no errors.
- ja page: `/master/ja/test-space/dsr552-edge/long/leaf` (HTTP 200, 5-item trail as expected).
- Observed values were the same in both runs:

| Viewport | innerWidth | scrollWidth | nav width / right | label width | lines | white-space / overflow / text-overflow | clipped |
|---|---:|---:|---|---:|---:|---|---|
| 1440×900 | 1440 | 1440 | 1360 / 1400 | 1344 | 1 | nowrap / hidden / ellipsis | yes |
| 1024×768 | 1024 | 1024 | 944 / 984 | 928 | 1 | nowrap / hidden / ellipsis | yes |
| 375 (extra, already in spec) | 375 | 375 | 343 / 359 | 96 | 1 | nowrap / hidden / ellipsis | yes |

- No horizontal scroll at either PC viewport. The long label stays on one line and is cut off with an ellipsis inside the nav. This matches JOB-ZZ-IDLE-07, so the DSR-651 fix looks good for ja.
- en: **blocked (data)**. The spec only has a ja case for 014, and the en fixture `/master/en/test-space/dsr552-edge/long` (and `/leaf`) returns 404 on DEV (curl, 10:2xZ). test-data.md also lists T3 long as ja-only. I did not add an en test because no en display name or expected trail is defined. An en T3 long seed is needed, plus its expected label.
- Build identity was not checked independently. I assumed DEV `main` holds Martin's DSR-651 fix, based on the Jira status in the job context.
- Run report: `results/DSR-552/DEV/automation-run-20261019-tc014-job07.md`. No failures, so no evidence was committed.
