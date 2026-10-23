# DSR-566 TC 14.0 / 15.0 viewport review
Reviewed four existing PNGs under `evidence/DSR-566/visual-20261023/`: DSR-NEWS-014_ja_1440_01/02.png (1440×900) and DSR-NEWS-015_ja_390_01/02.png (390×844). These are historical captures, not current DEV screenshots.
Figma 6010-59004 export is absent; no Figma connector is available. A node ID alone cannot retrieve the file. No pixel threshold is supplied. Comparison to Figma remains blocked; no design differences or visual pass are claimed. US notes identify SP reference 6018-60532, while this job names 6010-59004.

| L&F point | Evidence | Confidence / limitation |
|---|---|---|
| Date is rendered as `2026-10-01T00:00:00.000Z`, rather than YYYY.MM.DD. | PC/SP `_01.png` | 85% historical product bug; cause=none. Explicit BL-v1 A10; IDLE-42 later recorded a fix on this page, so this is not a new current failure. |
| No Back to list button is visible between CTA and footer. | PC/SP `_02.png` | 70% product bug; cause=none. BL-v1 TC 2 requires it, but capture-only inspection cannot establish current DOM or data. |
| Date row contains no visible My List/share controls. | PC/SP `_01.png` | 50% product bug; cause=none. BL-v1 TC 12 mentions these controls, but current template/configuration and Figma not verified. |
| PC title occupies one line; SP title wraps to two; title/body/CTA fit the viewport visually. | PC/SP `_01.png` and `_02.png` | 95% observation confidence, not design-match confidence. No Figma spacing/typography comparison possible. |

TC 14.0/15.0 proposed result: Pending. Required input: accessible Figma export/reference for node 6010-59004 (and SP frame if distinct), with applicable comparison threshold. Authored text/image content is excluded from design mismatch claims.
