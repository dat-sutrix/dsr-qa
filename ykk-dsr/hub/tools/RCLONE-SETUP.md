# rclone → Google Drive (VPS, user qa) – one-time setup

Purpose: agents upload TC files from `hub/tc-out/upload-queue.tsv` to Drive (no size limit), via `tools/drive_upload.sh`. The claude-code runner runs the queue automatically on every poll.

1. SSH with a tunnel (port 53682) so the Google login page opens on your laptop:
   - PowerShell / Windows Terminal: `ssh -L 53682:127.0.0.1:53682 qa@<VPS-IP>`
   - PuTTY: Connection → SSH → Tunnels: Source port `53682`, Destination `127.0.0.1:53682`, Add, then Open.
2. Install rclone without sudo:
   ```bash
   cd /tmp && curl -sSLO https://downloads.rclone.org/rclone-current-linux-amd64.zip
   python3 -m zipfile -e rclone-current-linux-amd64.zip /tmp/rc && mkdir -p ~/.local/bin
   cp /tmp/rc/rclone-*-linux-amd64/rclone ~/.local/bin/ && chmod +x ~/.local/bin/rclone
   ~/.local/bin/rclone version | head -1
   ```
3. Create the remote `gdrive` (full Drive scope, needed to write into existing folders):
   ```bash
   ~/.local/bin/rclone config create gdrive drive scope=drive
   ```
   It prints a link `http://127.0.0.1:53682/auth?state=...` → open it in the laptop browser → log in with the Google account that owns the QA folder → Allow. Terminal shows `Success`.
4. Check: `~/.local/bin/rclone lsf gdrive: --drive-root-folder-id=1ExvkoLfUnLhfahS5jWIDY9Eco3jHvYsk --dirs-only | head` lists the `[Sutrix] DSR -…` folders.
5. Upload the queue once by hand and push the result:
   ```bash
   cd ~/dsr-qa && git pull --rebase origin main && bash ykk-dsr/hub/tools/drive_upload.sh
   git add ykk-dsr/hub/tc-out/upload-queue.tsv && git commit -m "[upload] first rclone upload" && git push origin HEAD:main
   ```
6. Restart the claude-code runner (loads the upload step).

If Google shows "This app is blocked / unverified" in step 3: stop and report – an own OAuth client or service account is needed.
