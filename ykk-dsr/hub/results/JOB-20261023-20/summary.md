# JOB-20261023-20 · chrome · DSR-529 · DEV · done (partial 32.0)
Page qa529-01 (ja). Writes 3/6, all values back to `before` (checked via jcr:content.json 16:55 VN). Not published.
- **TC 4.0 – proposed Pass:** UE has no component for title/info bar/related stories/related items/footer action (Content tree: Text, Image, Text | Text | Profile); title click selects Section only. Title change via page properties shows in UE title block; reverted.
- **TC 21.0 – proposed Fail (check spec):** related-stories picker roots at /content/sites/digital-showroom, test-space pages selectable; with 3 items "+ Add" still enabled (no Max 3). Help text says only first 3 displayed → may be by design. Picker cancelled.
- **TC 32.0 – partial:** Title (*) cleared → "Please fill out this field", not saved ✅. Publish Date / Thumbnail / Category have no required marker in UE (Thumbnail help: 記事詳細では必須) → likely not enforced; clear-and-save not executed (UE auto-save, write cap).
- Note: Sites page properties dialog only has Basic/Advanced/Image/Permissions; article fields live in **UE > Page > 記事情報** (UE auto-saves – no Save/Cancel). Job steps 5–10 assumed a Sites dialog with Save/Cancel.
- Env: Chrome tab hung twice (screenshots timeout) until Dat reloaded tab after extension site-access change.
