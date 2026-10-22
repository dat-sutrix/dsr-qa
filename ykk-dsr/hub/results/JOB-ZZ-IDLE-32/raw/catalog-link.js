import { rawAssetUrl } from './dynamic-media.js';
import { isUrlLike } from './cells.js';
import { detailUrl } from './detail-page.js';

/*
 * Where a catalog button goes, and how (DSR-190). Every place that shows a
 * dm_catalog — the listing card (DSR-170), product detail and the catalog
 * block — asks this module, so the rule lives once:
 *
 *   pdf,   requiresForm false → the PDF, in a new tab (an inline preview; the
 *                               visitor saves it from the browser's viewer)
 *   ebook, requiresForm false → the viewer page, in a new tab
 *   any,   requiresForm true  → the catalog's own detail page, which carries
 *                               the Document Download form (DSR-192):
 *                               /{lang}/library/catalog/{catalogId}; neither the
 *                               PDF nor the e-book URL is written into that page
 *                               … unless this visitor has already sent the form
 *                               once: then the file directly, like an open one
 *                               (spec: 一度フォーム入力されたらフォーム遷移しない)
 *
 * An e-book used to open without the form whatever requiresForm said (EX-10);
 * it is now gated like a PDF (DSR-655 Y3, decided 2026-10-20).
 *
 * `catalogType` is the discriminator, trusted over whichever field happens to
 * be filled (test data has an ebook carrying a pdfAsset too).
 */

const NEW_TAB = { target: '_blank', rel: 'noopener' };
const SAME_TAB = { target: '', rel: '' };

/* "Form already sent" is remembered per browser — the spec allows PC and
   smartphone to be tracked separately (スマホとPCは別管理でOK), so no account or
   server state. Written by the Document Download form (DSR-192) after a
   successful submit through markDownloadFormSent(). Bump the version to make
   every visitor fill the form again. */
export const FORM_SENT_KEY = 'dsr:document-download:v1';

/**
 * Whether this browser has already sent the Document Download form.
 * Storage can be unavailable (private mode, blocked cookies): then the form
 * is simply shown again.
 * @returns {boolean}
 */
export function hasSentDownloadForm() {
  try {
    return Boolean(window.localStorage.getItem(FORM_SENT_KEY));
  } catch {
    return false;
  }
}

/**
 * Remember that this browser has sent the Document Download form. For the
 * DSR-192 form to call after a successful submit.
 */
export function markDownloadFormSent() {
  try {
    const value = JSON.stringify({ sentAt: new Date().toISOString() });
    window.localStorage.setItem(FORM_SENT_KEY, value);
  } catch {
    /* Storage unavailable: the visitor will see the form again next time. */
  }
}

/** True when the catalog's PDF sits behind the Document Download form. */
export function requiresForm(cf) {
  return cf?.requiresForm === true || cf?.requiresForm === 'true';
}

/**
 * @param {Object} cf dm_catalog fields (catalogType, requiresForm, catalogId, pdfAsset, ebookUrl)
 * @param {Object} [ctx]
 * @param {boolean} [ctx.formSent] the visitor already sent the form; defaults to
 *   hasSentDownloadForm(), injectable for tests
 * @returns {{kind: 'pdf'|'form'|'ebook', href: string, target: string, rel: string}|null}
 *   null when there is nowhere safe to go — the caller renders no button
 */
export function catalogAction(cf, { formSent = hasSentDownloadForm() } = {}) {
  const type = String(cf?.catalogType || '').trim().toLowerCase();
  if (type !== 'pdf' && type !== 'ebook') return null;

  if (requiresForm(cf) && !formSent) {
    const href = detailUrl('catalog', cf.catalogId);
    if (!href) {
      // eslint-disable-next-line no-console
      console.warn('catalog-link: form-gated catalog without a usable id', cf.catalogId);
      return null;
    }
    return { kind: 'form', href, ...SAME_TAB };
  }

  if (type === 'ebook') {
    const href = String(cf.ebookUrl || '').trim();
    return isUrlLike(href) ? { kind: 'ebook', href, ...NEW_TAB } : null;
  }

  if (type === 'pdf') {
    const href = rawAssetUrl(cf.pdfAsset) || '';
    return isUrlLike(href) ? { kind: 'pdf', href, ...NEW_TAB } : null;
  }

  return null;
}
