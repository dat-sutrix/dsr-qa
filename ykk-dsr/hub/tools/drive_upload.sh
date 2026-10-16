#!/usr/bin/env bash
# Upload pending files listed in ykk-dsr/hub/tc-out/upload-queue.tsv to Google Drive via rclone,
# verify the size on Drive, and mark each row done/fail. Run from the repo root (any clone).
#
# Queue format (TAB separated, one file per line, '#' = comment):
#   status <TAB> repo-relative file path <TAB> Drive folder ID <TAB> note
#   status: pending | done <UTC time> <bytes> | fail <UTC time> <reason>
#
# Requires: rclone remote "gdrive" (type drive, scope drive) – see hub/tools/RCLONE-SETUP.md.
# Usage:  bash ykk-dsr/hub/tools/drive_upload.sh            # upload + verify, rewrite queue
#         bash ykk-dsr/hub/tools/drive_upload.sh --dry-run  # only list what would be uploaded
set -u
export PATH="$HOME/.local/bin:$PATH"
Q="ykk-dsr/hub/tc-out/upload-queue.tsv"
REMOTE="${DSR_DRIVE_REMOTE:-gdrive}"
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
[ -f "$Q" ] || { echo "no queue $Q"; exit 0; }
command -v rclone >/dev/null || { echo "FATAL: rclone not found (see RCLONE-SETUP.md)"; exit 2; }
rclone listremotes | grep -qx "$REMOTE:" || { echo "FATAL: rclone remote '$REMOTE' missing"; exit 2; }

TMP="$(mktemp)"; OK=0; BAD=0
while IFS= read -r line || [ -n "$line" ]; do
  case "$line" in ''|'#'*) echo "$line" >>"$TMP"; continue;; esac
  IFS=$'\t' read -r st file folder note <<<"$line"
  if [ "$st" != "pending" ]; then echo "$line" >>"$TMP"; continue; fi
  now="$(date -u +%FT%TZ)"
  if [ ! -f "$file" ]; then
    printf 'fail %s missing-local-file\t%s\t%s\t%s\n' "$now" "$file" "$folder" "${note:-}" >>"$TMP"; BAD=$((BAD+1)); continue
  fi
  name="$(basename "$file")"; size="$(stat -c %s "$file")"
  if [ $DRY -eq 1 ]; then echo "WOULD UPLOAD $size  $name -> $folder"; echo "$line" >>"$TMP"; continue; fi
  echo "upload $name ($size B) -> $folder"
  if rclone copy "$file" "$REMOTE:" --drive-root-folder-id="$folder" --retries 3 --low-level-retries 10 2>>"$HOME/drive-upload.log"; then
    # verify: exact name + size present in the target folder
    got="$(rclone lsf "$REMOTE:" --drive-root-folder-id="$folder" --files-only --format sp --separator $'\t' 2>>"$HOME/drive-upload.log" \
           | awk -F'\t' -v n="$name" '$2==n {print $1}' | head -1)"
    if [ "$got" = "$size" ]; then
      printf 'done %s %s\t%s\t%s\t%s\n' "$now" "$size" "$file" "$folder" "${note:-}" >>"$TMP"; OK=$((OK+1)); echo "  OK verified $got B"
    else
      printf 'fail %s size-mismatch(local=%s,drive=%s)\t%s\t%s\t%s\n' "$now" "$size" "${got:-none}" "$file" "$folder" "${note:-}" >>"$TMP"; BAD=$((BAD+1)); echo "  FAIL size local=$size drive=${got:-none}"
    fi
  else
    printf 'fail %s rclone-error(see ~/drive-upload.log)\t%s\t%s\t%s\n' "$now" "$file" "$folder" "${note:-}" >>"$TMP"; BAD=$((BAD+1)); echo "  FAIL rclone error"
  fi
done <"$Q"
[ $DRY -eq 1 ] && { rm -f "$TMP"; exit 0; }
mv "$TMP" "$Q"
echo "uploaded ok=$OK fail=$BAD"
[ $BAD -eq 0 ]
