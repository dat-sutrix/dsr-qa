# JOB-20261023-02 – Agent Author dry-run TD-587-NEG + TD-557-YOUKU (DEV, GET only)
Merge/incident-related fails: none (no tests run; cause = none).
- **Model drift: none.** Live `models` (models-live.md, 02:17Z) = `author/models.md` (fields, types, required, model paths). DSR-669 `DM_*_dsr` not live yet → lint used DM_movie / DM_movie_related.
- **TD-587-NEG.yaml** (new): lint PASS 212 / FAIL 0 / WARN 22 (only "would create" + en-only lang_pair opt-outs). Dry-run plan = **17 writes**: 13 creates + 4 replicate requests.
  - Commune DM_movie (en, published preview+live): qa587-preview, -sub, -commune-only, -unavail, -removed, -tt; qa587-inactive en+ja. Values = live qa587-main (youtube irFRtAVphCY, image 7.png); titles per TestData.
  - DSR DM_movie_related: qa587-preview isActive ON **preview only** (02) · qa587-inactive en+ja isActive **OFF** published (07) · qa587-unavail, qa587-removed ON published (phase 1 of 08/10). 06 = no DSR CF by design.
- **TD-557-YOUKU.resolved.yaml**: no field change needed; lint PASS 62 / FAIL 0 / WARN 4; Youku `XNTgyNzE1ODE5Ng==` (DSR-611). Plan = **8 writes** (4 creates en+ja + 4 replicate).
- **Excluded → QA-PT:** TD-587-04 QA587_Upper (outside name guard; "refused" = 4.0 input) · TD-587-05 DSR CF in sub-folder qa587/ (folder missing) · TD-587-08 phase 2 (unpublish commune, republish DSR) · TD-587-10 phase 2 (unpublish DSR after ≥ 10 min) · TD-587-12 DSR CF (dsr/en/movies/tech = 404; DSR-669 will add DM_techmovie_dsr – Q32).
- [Giả định] 07: create isActive OFF + publish = end state of "OFF, republish"; if 7.0 sees no page → phase 2 (ON publish → OFF republish).
- [Giả định] titles for 07/08/10 (not in TestData): "QA587 inactive/unavail/removed".
- Not verified: write endpoints, `agentId: preview` (D11, P1b). All targets absent today (findByNodeName). No requests other than GET were sent.
- Files: `<manifest>/lint.md|json`, `dry-run.md`, `plan.json`, `before.json`; `models-live.md`.
