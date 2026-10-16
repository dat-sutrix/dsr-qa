# DSR-501 point 1 – manual check (Dat, DEV Author, 2026-10-16 11:49)

Model DM_movie (Tools → General → Content Fragment Models), read-only, Cancel without Save.

| Field label | Property Name | Type / Render as | Allowed model | Max items | Verdict (proposal) |
|---|---|---|---|---|---|
| 関連動画 | `relatedMovies` | Fragment Reference / Multiple Field | DM_movie | (empty) | Pass – name = relatedMovies (Toan 2026-09-04) |
| 関連製品 | `relatedProducts` | Fragment Reference / Multiple Field | DM_product | (empty) | Pass |
| 配信終了フラグ | `isUnavailable` | Boolean, default off | — | — | Pass – field exists |

Note: no Max Number of Items on relatedMovies → limit 5 must be enforced on FE (Chiba 2026-09-25 "要FE対応") → verified by JOB-20261015-11 (P3).
Evidence: DSR-501-P1_DEV_01..03.png in this folder.
