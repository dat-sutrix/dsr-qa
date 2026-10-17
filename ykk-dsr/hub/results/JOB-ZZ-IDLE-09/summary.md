# JOB-ZZ-IDLE-09 — DEV render timing (record only)
All four navigations returned HTTP 200; 12 full-page PNG captures completed.

| Language / viewport | +3 s visible | +10 s visible | +20 s visible |
|---|---|---|---|
| en / 390×844 | no | yes | yes |
| en / 1440×900 | yes | yes | yes |
| ja / 390×844 | yes | yes | yes |
| ja / 1440×900 | yes | yes | yes |

English SP was blank at +3 s and showed product content by +10 s, still visible at +20 s: late rendering observed.
English PC and Japanese SP/PC already showed product content at +3 s. Exact onset and root cause are not established.
Only the blank English SP +3 s PNG is committed; other captures remain in /tmp/job-zz-idle-09 (ephemeral).
Per-point counts, heights, final URLs, HTTP status, console errors and failed requests are in result.json.
Resource errors include placeholders.json 404 and Japanese hero image 403; causation is unverified.
No product verdict; pass means recording completed. TypeScript check: exit 0, no errors.
