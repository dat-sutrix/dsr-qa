---
id: JOB-ZZ-IDLE-43
agent: codex
us: Watch for dev fixes DSR-666/667 + DSR-566 visual baseline compare
type: visual watch (read-only)
env: dev
priority: P2
created_by: claude-web 23/10 11:35 VN
---
Continue JOB-ZZ-IDLE-42 (it stopped after 1 round). Every 90 min until 18:00 VN (11:00 UTC), same geometry checks and thresholds as IDLE-42 (`results/JOB-ZZ-IDLE-42/history.json` = previous pass): DSR-590 TOP gap breadcrumb→hero (666) at 1440/390/393; 9th dot vs ">" clipping at 390/393 (667). Also record `.article-meta-date` text on `/master/ja/test-space/qa566-news-02` each round (DSR-672 residual watch). A changed value → "FIX DETECTED <bug> <time>" / "CHANGED <bug>" at the top of summary.md, commit immediately.
Once: compare DSR-566 TC 14.0/15.0 captures (`evidence/DSR-566/visual-20261023/`) with Figma 6010-59004 (viewport-based, not fullPage); list differences as L&F points with confidence. Output results/JOB-ZZ-IDLE-43/summary.md.
