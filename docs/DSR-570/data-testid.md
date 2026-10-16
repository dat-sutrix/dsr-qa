# DSR-570 data-testid

No data-testid list from dev yet. Status on DEV 2026-10-16: none of the elements below have a data-testid. The spec uses role/text/class with `// TODO: data-testid <name>`.

| Element | Proposed data-testid | Current selector | Used in |
|---|---|---|---|
| Catalog detail block | `catalog-detail` | `.catalog-detail.block` | `CatalogDownloadPage.block` |
| Catalog image | `catalog-detail-image` | `.catalog-detail-cover img` | `.image` |
| Catalog name | `catalog-detail-name` | `.catalog-detail-title` | `.name` |
| Description | `catalog-detail-description` | `.catalog-detail-description` | `.description` |
| Date | `catalog-detail-date` | `.catalog-detail-date` | `.date` |
| Type label | `catalog-detail-type` | `.catalog-detail-categories li` | `.typeLabel` |
| Download form | `catalog-download-form` | `.catalog-detail.block form` | `.form` |
| Consent checkbox (個人情報) | `catalog-download-consent` | `getByRole('checkbox', { name: '個人情報' })` | `.consent` |
| Submit button | `catalog-download-submit` | `getByRole('button', { name: 'ダウンロードする' })` | `.submit` |
| List-page catalog cards | see docs/DSR-557/data-testid.md | `CatalogDisplayPage` (reused) | 005, 006, 007, 010, 017, 018 |
