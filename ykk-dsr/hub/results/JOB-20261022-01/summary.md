# JOB-20261022-01 – DSR-587 17.0 rerun (DSR-173 Group A on overlay) + DSR-538 retest (DEV, ja/en, .aem.page + .aem.live, 00:59–01:01Z) – status: done
## Merge/incident-related
None – 0 fails in this job.

- **Fixtures (data only):** with `DSR173_MOVIE_PATH` set, VALID_YOUTUBE uses TD-587-01 from fixtures/dsr-587.ts (title "QA587 main movie", movieSourceId `irFRtAVphCY`, no relatedProducts; ja path = en copy). No Expected value changed.
- **DSR-MOVIE-012 / 027 (ja + en, both tiers): 8/8 pass** – one h1 "QA587 main movie"; one title/og:title "QA587 main movie | YKK DIGITAL SHOWROOM".
- **DSR-MOVIE-014 (ja + en, both tiers): 4/4 pass** – the spec now clicks the facade (TC step); embed absent before click, `/embed/irFRtAVphCY` (youtube host) after.
- **DSR-MOVIE-026 (en, both tiers): 2/2 pass** – runs on qa587-rel-a: 5 movie cards (r6…r2), tag MOVIE, thumbnails loaded, links same-language and HTTP 200. Language check now uses the page's prefix (`/en/` on overlay) instead of hard-coded `/master/en/` – Expected unchanged, please confirm.
- **DSR-538-retest: pass on qa587-rel-a (.page + .live)** – 5 card hrefs, all on `main--dsr-eds-dev--sutrix-projects.aem.{page,live}`, 0 on publish-p192812, each 200 (no 500). qa587-main (ja/en, both tiers) has no related section → skip (nothing to check), not pass. Proposal: DSR-538 can be closed as fixed on DEV for movie related cards.
- **DSR-MOVIE-033: skip** – Blocked-by data: TD-587-01 has no relatedProducts row (cause none, data).
- **Recorded only:** og:image still `about:error` on all 3 pages, both tiers (open point). VOV-013 not re-run (DSR-665). Raw HTML still has publish-p192812 DAM thumbnail URLs (json2html rows + og:image:secure_url, 200 image/png) – image sources, not links.
- **Reports:** results/DSR-587/DEV/automation-run-20261022-job20261022-01-{live,page}.md. tsc: no errors. No evidence PNGs (no fails).
