import fs from 'fs';
import path from 'path';
import { pagePath } from './paths';

export const languages = ['ja', 'en'] as const;
export type Language = typeof languages[number];

// A3: product list /master/{lang}/product-list, fallback /{lang}/product-list (DEV 2026-10-19: /master/* 404, fallback 200).
// Condition search = filter panel of the product list (A3, Q34 open).
export const listPaths = (lang: Language) => [`/master/${lang}/product-list`, pagePath('productSearch', lang)];
export const productPath = (lang: Language, id: string) => `/${lang}/products/${id}`;

// TD-589-01/02/03 product ids: not identified yet (all card ids → /{lang}/products/{id} HTTP 404 on DEV, JOB-ZZ-IDLE-10).
// Set without code change: DSR589_TD01=<id> DSR589_TD02=<id> DSR589_TD03=<id>.
export const tdProduct = (td: '01' | '02' | '03') => process.env[`DSR589_TD${td}`] || null;

// TD-589-06: temporary icon inventory captured by fixtures/dsr-589-inventory.cjs (JOB-ZZ-IDLE-10).
export type InventoryIcon = { sha1: string | null; fileName: string | null; urls: string[]; pages: string[] };
export const inventoryFile = (env = (process.env.ENV || 'dev').toUpperCase()) =>
  path.resolve(__dirname, '..', 'results', 'DSR-589', env, 'temp-icon-inventory.json');
export const tempInventory = (): InventoryIcon[] => {
  const file = inventoryFile('DEV'); // baseline captured on DEV before replacement; reused on every env
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).icons : [];
};

// 4.0 asserts the state AFTER replacement; before delivery every temp icon is still present by definition.
// QA sets DSR589_REPLACED=1 once DSR-589 is deployed to the env under test.
export const replaced = process.env.DSR589_REPLACED === '1';
export const notReplaced = 'Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run';
export const blockedOfficial = 'Blocked: TD-589-04 official icon list';
export const blockedData = (td: '01' | '02' | '03', what: string) => `blocked-data: TD-589-${td} ${what} not identified (product detail /{lang}/products/{id} HTTP 404 on DEV)`;
export const listMissing = 'blocked-data: TD-589-07 product list page missing';
