# JOB-20261023-23 · chrome · DSR-529 · DEV · done
Browser DSR-Chrome-Personal (5900c4b8), user Agent QA. Run 24/10 00:10–00:16 VN (off-hours, Dat approved). Writes 1/2. No publish.
- **qa529-02 thumbnail restored** → `/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png` (verified in jcr:content). Title / publishDate 2026-09-01 / description unchanged; no `category` property (tag do-not-translate only).
- **Picker blank:** not reproduced – Content Advisor shows spinner ~10 s, then loads. Search by file name is the fastest way.
- **ARTICLE-005 → proposed FAIL (product):** Profile block renders Company and Text on the same line (same top/left) → overlapping text, on .aem.live and in UE. DOM: name in `profile-company`, company + text both in `profile-text`. Evidence: `ARTICLE-005_profile_live_ja.png`. Candidate bug ≥ 80% (overlap measured, 2 surfaces).
- Panel fields: Image (empty), Name, Company/role, Text, Type (著者紹介 302_Author_Profile).
- Verify: JOB-20261023-24 → queue.
- Post-check 00:32 VN: power loss on DSR-Chrome-Personal (extension reconnected 00:29:52) happened AFTER the job (last action 00:15:31). Re-read qa529-02: thumbnail still set, user Agent QA, no change. Results unaffected.
