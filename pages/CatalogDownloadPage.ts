import type { Locator, Page, Response } from '@playwright/test';
import { consentText, submitText } from '../fixtures/dsr-570';

export interface FieldInfo { tag: string; type: string; name: string; id: string; required: boolean; label: string }

export class CatalogDownloadPage {
  readonly block: Locator;
  readonly heading: Locator;
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly date: Locator;
  readonly typeLabel: Locator;
  readonly form: Locator;
  readonly consent: Locator;
  readonly submit: Locator;

  constructor(readonly page: Page) {
    // TODO: data-testid catalog-detail; no data-testid on the block in DEV (2026-10-16).
    this.block = page.locator('.catalog-detail.block');
    this.heading = page.getByRole('heading', { level: 1 });
    // TODO: data-testid catalog-detail-image / catalog-detail-name / catalog-detail-description / catalog-detail-date / catalog-detail-type
    this.image = this.block.locator('.catalog-detail-cover img').first();
    this.name = this.block.locator('.catalog-detail-title');
    this.description = this.block.locator('.catalog-detail-description');
    this.date = this.block.locator('.catalog-detail-date');
    this.typeLabel = this.block.locator('.catalog-detail-categories li');
    // TODO: data-testid catalog-download-form
    this.form = this.block.locator('form');
    // TODO: data-testid catalog-download-consent
    this.consent = this.form.getByRole('checkbox', { name: consentText });
    // TODO: data-testid catalog-download-submit
    this.submit = this.form.getByRole('button', { name: submitText });
  }

  async goto(path: string): Promise<Response | null> {
    const response = await this.page.goto(path);
    if (response?.ok()) await this.page.locator('.catalog-detail.block[data-block-status="loaded"]').waitFor({ timeout: 15_000 }).catch(() => {});
    return response;
  }

  // Every input/select/textarea with its associated label (label[for], wrapping label) or aria-label.
  fields(): Promise<FieldInfo[]> {
    return this.form.evaluate(form => [...form.querySelectorAll('input, select, textarea')]
      .filter(el => (el as HTMLInputElement).type !== 'hidden')
      .map(el => {
        const input = el as HTMLInputElement;
        const label = [...(input.labels ?? [])].map(l => l.textContent ?? '').join(' ').replace(/\s+/g, ' ').trim() || (input.getAttribute('aria-label') ?? '').trim();
        return { tag: el.tagName.toLowerCase(), type: input.type, name: input.name, id: input.id, required: input.required, label };
      }));
  }

  hiddenInputs(): Promise<{ name: string; value: string }[]> {
    return this.page.locator('form input[type="hidden"]').evaluateAll(els => els.map(el => ({ name: (el as HTMLInputElement).name, value: (el as HTMLInputElement).value })));
  }

  // Fixed texts for the translation check (016).
  async fixedTexts(): Promise<string[]> {
    const texts = [await this.heading.allInnerTexts(), await this.form.locator('label, legend').allInnerTexts(), await this.form.locator('.catalog-detail-consent').allInnerTexts(), await this.submit.allInnerTexts()];
    return texts.flat().map(t => t.trim()).filter(Boolean);
  }
}
