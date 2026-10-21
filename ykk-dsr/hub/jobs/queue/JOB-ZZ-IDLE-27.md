---
id: JOB-ZZ-IDLE-27
agent: codex
us: DSR-529
type: visual (record only)
env: dev
lang: [ja, en]
priority: P3 (idle)
created_by: claude-web ([schedule] evening 2026-10-21)
---
Post-merge visual capture of the article page before QA-PT republish (morning JOB-20261021-05 compares after republish).
Capture full-page PNG, Chromium PC 1440×900 + SP 375×900, on .aem.live: `/{ja,en}/library/article/stories/qa529-01`, `/ja/library/article/stories/qa529-02`, `/{ja,en}/library/article` (list, may 404 → record). Use existing `tests/article-detail/DSR-529.visual-capture.spec.ts` if it fits.
Record per page: HTTP status, info-bar date text, number of tag chips, number of image blocks + each img src/status, related-card count + img status, last-modified header.
Keep PNGs in results/JOB-ZZ-IDLE-27/baselines/ (record only, no verdict). npx tsc --noEmit result. No content writes.
