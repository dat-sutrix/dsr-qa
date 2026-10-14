ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json PLAYWRIGHT_JSON_OUTPUT_NAME=evidence/DSR-552/DEV/runs/auto.json npx playwright test --grep DSR-BREAD --project=chromium --grep-invert @visual
