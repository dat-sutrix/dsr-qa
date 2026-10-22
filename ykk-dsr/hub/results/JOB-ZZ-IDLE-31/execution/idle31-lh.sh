#!/bin/bash
out="$PWD/ykk-dsr/hub/results/JOB-ZZ-IDLE-31"
date -u +%FT%TZ > "$out/lh-start.txt"
for path in ja/library/video/qa587-main en/library/video/qa587-main ja/library/article/stories/qa529-01 en/library/article/stories/qa529-01 en/library/catalog/qa190-cat-pdf; do
 for device in mobile desktop; do
  name="${path//\//_}-$device"
  args=()
  if [ "$device" = desktop ]; then args+=(--preset=desktop); fi
  CHROME_PATH=/home/qa/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome npm exec --yes --package=lighthouse -- lighthouse "https://main--dsr-eds-dev--sutrix-projects.aem.live/$path" --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,seo,best-practices --output=json --output-path="/tmp/$name-lh.json" "${args[@]}" --quiet > "/tmp/$name-lh.log" 2>&1
  echo "$name exit=$?"
 done
done
date -u +%FT%TZ > "$out/lh-end.txt"
