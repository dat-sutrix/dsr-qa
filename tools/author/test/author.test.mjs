// Unit tests for tools/author (no network). Run: node --test tools/author/test/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isWritablePath, isAllowedNodeName, isRenameSourcePath, assertRenamable, componentPath, assertSlingParams,
  QA_NUMERIC_PRODUCTS, REPLICATE_VALUES,
} from '../lib/guard.mjs';
import { expandItems, verifyUrls } from '../lib/manifest.mjs';
import { replicationOps, pageOps, slingForm, normPageValue, gates } from '../lib/apply.mjs';
import { aemWrite } from '../lib/http.mjs';

const P = '/content/sites/digital-showroom/master';

test('D13: exact numeric product allowlist (22 paths), nothing else numeric', () => {
  assert.equal(QA_NUMERIC_PRODUCTS.size, 2 * 2 * 11);
  for (const p of ['/content/dam/dsr/ja/products/990586002', '/content/dam/common/en/products/990586011', '/content/dam/common/ja/products/990586001']) {
    assert.ok(isWritablePath(p, 'cf'), p);
    assert.ok(isAllowedNodeName(p), p);
  }
  for (const p of [
    '/content/dam/dsr/ja/products/990586000', '/content/dam/dsr/ja/products/990586012', '/content/dam/dsr/ja/products/9905860011',
    '/content/dam/dsr/ja/products/990586002x', '/content/dam/dsr/ja/movies/standard/990586002', '/content/dam/dsr/cn/products/990586002',
    '/content/dam/dsr/ja/products/sub/990586002', '/content/dam/dsr/ja/products/123456789',
  ]) {
    assert.ok(!isWritablePath(p, 'cf'), p);
    assert.ok(!isAllowedNodeName(p), p);
  }
  assert.ok(!isWritablePath('/content/dam/dsr/ja/products/990586002', 'page'), 'numeric product is not a page');
});

test('D13: numeric products cannot be renamed', () => {
  assert.ok(!isRenameSourcePath('/content/dam/dsr/ja/products/990586002'));
  assert.throws(() => assertRenamable('/content/dam/dsr/ja/products/qa-586', '/content/dam/dsr/ja/products/990586002'), /outside guard/);
});

test('CF guard unchanged: qa* only, strict, legacy qa- only as rename source', () => {
  assert.ok(isWritablePath('/content/dam/common/en/movies/qa587-main', 'cf'));
  assert.ok(!isWritablePath('/content/dam/common/en/movies/qa-587-main', 'cf'));
  assert.ok(isRenameSourcePath('/content/dam/dsr/ja/movies/standard/qa-587-main'));
  assert.ok(!isWritablePath('/content/dam/common/en/movies/QA587_Upper', 'cf'));
  assert.ok(!isWritablePath('/content/dam/ykk/common/product-cf/test/qa190-cat-new-0', 'cf'));
  assert.ok(!isWritablePath(`${P}/ja/test-space/qa566-news-01`, 'cf'), 'page path is not a CF path');
});

test('D15: page guard = stories/qa* + test-space/qa* (ja/en), nothing deeper', () => {
  for (const p of [`${P}/ja/test-space/qa566-news-01`, `${P}/en/test-space/qa529-01`, `${P}/ja/library/article/stories/qa529-02`]) {
    assert.ok(isWritablePath(p, 'page'), p);
  }
  for (const p of [
    `${P}/ja/test-space/dsr-173-video-detail`, `${P}/ja/test-space/qa-566`, `${P}/ja/test-space/qa566/child`, `${P}/cn/test-space/qa566`,
    `${P}/ja/test-space/qa566-news-01/jcr:content`, `${P}/ja/library/article/stories/r1`, `${P}/ja/test-space`, '/content/sites/other/master/ja/test-space/qa1',
  ]) assert.ok(!isWritablePath(p, 'page'), p);
});

test('D15: component path must be an existing-style node under jcr:content/root', () => {
  const page = `${P}/ja/test-space/qa566-news-01`;
  assert.equal(componentPath(page, 'root/section/title'), `${page}/jcr:content/root/section/title`);
  for (const n of ['../x', 'root/../../etc', 'jcr:content', 'root', 'section/title', 'root/section/title/', 'root/a b']) {
    assert.throws(() => componentPath(page, n), /outside guard/, n);
  }
  assert.throws(() => componentPath(`${P}/ja/products/qa1`, 'root/section/title'), /outside guard/);
});

test('D15: Sling params allowlisted; no :operation / @Delete / other props', () => {
  const jc = `${P}/ja/test-space/qa566-news-01/jcr:content`;
  assertSlingParams(jc, new URLSearchParams([['_charset_', 'utf-8'], ['robots', ''], ['robots@TypeHint', 'String'], ['tags', 'a'], ['tags@TypeHint', 'String[]']]));
  for (const bad of [[':operation', 'delete'], ['robots@Delete', ''], ['sling:resourceType', 'x'], ['cq:template', 'x'], ['title', 'x'], ['robots@MoveFrom', '/x']]) {
    assert.throws(() => assertSlingParams(jc, new URLSearchParams([bad])), /not allowed/, bad[0]);
  }
  const comp = `${P}/ja/test-space/qa566-news-01/jcr:content/root/section/title`;
  assertSlingParams(comp, new URLSearchParams([['title', '<p>x</p>'], ['title@TypeHint', 'String']]));
  assert.throws(() => assertSlingParams(comp, new URLSearchParams([['jcr:title', 'x']])), /not allowed/);
  assert.throws(() => assertSlingParams(comp, new URLSearchParams([['link', '/x']])), /not allowed/);
});

test('no delete: aemWrite rejects DELETE before any request', () => {
  assert.throws(() => aemWrite('DELETE', '/content/dam/dsr/ja/products/990586002'), /Method not allowed/);
  assert.throws(() => aemWrite('GET', '/x'), /Method not allowed/);
});

test('apply lock: gates closed without AUTHOR_WRITE_ENABLED / --apply / clean lint', () => {
  const prev = process.env.AUTHOR_WRITE_ENABLED;
  delete process.env.AUTHOR_WRITE_ENABLED;
  assert.equal(gates({ applyFlag: true, lintFails: 0 }).open, false);
  process.env.AUTHOR_WRITE_ENABLED = '1';
  assert.equal(gates({ applyFlag: false, lintFails: 0 }).open, false);
  assert.equal(gates({ applyFlag: true, lintFails: 1 }).open, false);
  if (prev === undefined) delete process.env.AUTHOR_WRITE_ENABLED; else process.env.AUTHOR_WRITE_ENABLED = prev;
});

test('D14: replicate values; unpublish before activate; DSR before content when unpublishing', () => {
  assert.deepEqual([...REPLICATE_VALUES], ['preview', 'publish', 'unpublish-preview', 'unpublish-publish']);
  const entries = expandItems({ items: [
    { kind: 'content-cf', model: 'DM_movie', lang: ['en'], path: '/content/dam/common/{lang}/movies/qa587-unavail', fields: {}, replicate: ['unpublish-publish'] },
    { kind: 'dsr-cf', model: 'DM_movie_related', lang: ['en'], path: '/content/dam/dsr/{lang}/movies/standard/qa587-unavail', fields: {}, replicate: ['publish'] },
    { kind: 'dsr-cf', model: 'DM_movie_related', lang: ['en'], path: '/content/dam/dsr/{lang}/movies/standard/qa587-removed', fields: {}, replicate: ['unpublish-publish', 'unpublish-preview'] },
  ] });
  const ops = replicationOps(entries);
  assert.deepEqual(ops.map((o) => o.op), ['unpublish:publish dsr-cf', 'unpublish:publish content-cf', 'unpublish:preview dsr-cf', 'replicate:publish dsr-cf']);
  const un = ops[0];
  assert.equal(un.path, '/bin/replicate');
  assert.deepEqual(un.form, [['_charset_', 'utf-8'], ['cmd', 'Deactivate'], ['agentId', 'publish'], ['path', '/content/dam/dsr/en/movies/standard/qa587-removed']]);
  assert.equal(ops[3].path, '/adobe/sites/cf/fragments/publish');
  assert.deepEqual(ops[3].body.paths, ['/content/dam/dsr/en/movies/standard/qa587-unavail']);
});

test('D10 kept: activation per tier content CF → DSR CF → page', () => {
  const entries = expandItems({ items: [
    { kind: 'page', lang: ['ja'], path: `${P}/{lang}/test-space/qa566-news-01`, props: { robots: '' }, replicate: ['preview', 'publish'] },
    { kind: 'dsr-cf', model: 'DM_product_related', lang: ['ja'], path: '/content/dam/dsr/{lang}/products/990586002', fields: {}, replicate: ['preview'] },
    { kind: 'content-cf', model: 'DM_product', lang: ['ja'], path: '/content/dam/common/{lang}/products/990586002', fields: {}, replicate: ['preview'] },
  ] });
  assert.deepEqual(replicationOps(entries).map((o) => o.op),
    ['replicate:preview content-cf', 'replicate:preview dsr-cf', 'replicate:preview page', 'replicate:publish page']);
});

test('D15: page item expands per language; page ops diff only changed props', () => {
  const [ja, en] = expandItems({ items: [{
    kind: 'page', path: `${P}/{lang}/test-space/qa566-news-01`,
    props: { publicationdate: '2026-10-01', robots: 'noindex, nofollow', tags: ['a', 'b'] },
    components: [{ node: 'root/section/title', props: { title: { ja: '<p>QA566 ニュース詳細テスト</p>', en: '<p>QA566 News detail test</p>' } } }],
    replicate: ['publish'],
  }] });
  assert.equal(ja.path, `${P}/ja/test-space/qa566-news-01`);
  assert.equal(en.components[0].props.title, '<p>QA566 News detail test</p>');
  const live = {
    exists: true, kind: 'page',
    props: { publicationdate: 'Thu Oct 01 2026 00:00:00 GMT+0000', tags: ['a', 'b'] },
    components: { 'root/section/title': { exists: true, props: { title: '<p>タイトルが入ります。</p>' } } },
  };
  const ops = pageOps(ja, live);
  assert.deepEqual(ops.map((o) => o.op), ['page-props', 'component-text']);
  assert.deepEqual(ops[0].changes, [{ field: 'robots', before: null, after: 'noindex, nofollow' }]);
  const off = pageOps({ ...ja, props: { robots: '' }, components: [] }, live);
  assert.ok(off[0].skip, 'robots "" (OFF) on a page without robots = no write');
  assert.equal(pageOps({ ...ja, props: { robots: '' }, components: [] }, { ...live, props: { robots: 'noindex, nofollow' } })[0].changes[0].after, '');
  assert.equal(ops[1].target, `${P}/ja/test-space/qa566-news-01/jcr:content/root/section/title`);
  assert.deepEqual(ops[1].form, [['_charset_', 'utf-8'], ['title', '<p>QA566 ニュース詳細テスト</p>'], ['title@TypeHint', 'String']]);
  assert.deepEqual(pageOps(ja, { exists: false }).map((o) => !!o.skip), [true], 'no page create');
  const noComp = { ...live, components: { 'root/section/title': { exists: false } } };
  assert.match(pageOps(ja, noComp).find((o) => o.skip).skip, /missing \(no add/);
});

test('slingForm: dates, arrays, strings typed explicitly', () => {
  assert.deepEqual(slingForm([{ field: 'publicationdate', after: '2026-10-01' }, { field: 'tags', after: ['x', 'y'] }, { field: 'category', after: 'news' }]), [
    ['_charset_', 'utf-8'],
    ['publicationdate', '2026-10-01T00:00:00.000Z'], ['publicationdate@TypeHint', 'Date'],
    ['tags', 'x'], ['tags', 'y'], ['tags@TypeHint', 'String[]'],
    ['category', 'news'], ['category@TypeHint', 'String'],
  ]);
  assert.equal(normPageValue('updatedate', 'Sat Oct 10 2026 00:00:00 GMT+0000'), '2026-10-10');
  assert.equal(normPageValue('robots', undefined), null);
});

test('verify.urls: string or {url, page, live} with {lang}/{id} expansion', () => {
  const urls = verifyUrls({ items: [{ kind: 'dsr-cf', lang: ['en'], each: ['qa1'] }], verify: { urls: ['/{lang}/a/{id}', { url: '/{lang}/b', page: 404, live: 404 }] } });
  assert.deepEqual(urls, [{ url: '/en/a/qa1', lang: 'en' }, { url: '/en/b', page: 404, live: 404, lang: 'en' }]);
});

// DSR-669/670/671: models resolved from the live model path; old names in a manifest fail lint with the model to use.
import { classifyModel, discoverModels, expectedModel, modelCurrency, resolveEntryModels } from '../lib/model-map.mjs';

const M = '/conf/ykk/settings/dam/cfm/models';
const model = (name, node) => ({ name, path: `${M}/${node}`, id: node, fields: [] });
const before = Object.fromEntries([
  model('DM_movie', 'dm_movie'), model('DM_product', 'dm_product'), model('DM_catalog', 'dm_catalog'),
  model('DM_movie_related', 'dm_movie_related'), model('DM_product_related', 'dm_product_related'), model('DM_catalog_related', 'dm_catalog_related'),
  model('Other', 'other'),
].map((m) => [m.name, m]));
const after = Object.fromEntries([
  ...Object.values(before),
  model('DM_movie_dsr', 'dm_movie_dsr'), model('DM_techmovie_dsr', 'dm_techmovie_dsr'), model('DM_product_dsr', 'dm_product_dsr'), model('DM_catalog_dsr', 'dm_catalog_dsr'),
].map((m) => [m.name, m]));

test('DSR-669: classify by model path; unrelated models ignored', () => {
  assert.deepEqual(classifyModel(before.DM_movie), { type: 'movie', role: 'content', gen: null });
  assert.deepEqual(classifyModel(after.DM_techmovie_dsr), { type: 'techmovie', role: 'dsr', gen: 'dsr' });
  assert.deepEqual(classifyModel({ name: 'Renamed Title', path: `${M}/dm_catalog_related` }), { type: 'catalog', role: 'dsr', gen: 'related' });
  assert.equal(classifyModel(before.Other), null);
});

test('DSR-669: folder → live model, before and after the rename', () => {
  const b = discoverModels(before);
  const a = discoverModels(after);
  assert.equal(expectedModel('/content/dam/dsr/ja/movies/standard/qa587-main', b).name, 'DM_movie_related');
  assert.equal(expectedModel('/content/dam/dsr/ja/movies/tech/qa587-tech', b).name, 'DM_movie_related');
  assert.equal(expectedModel('/content/dam/dsr/ja/movies/standard/qa587-main', a).name, 'DM_movie_dsr');
  assert.equal(expectedModel('/content/dam/dsr/en/movies/tech/qa587-tech', a).name, 'DM_techmovie_dsr');
  assert.equal(expectedModel('/content/dam/dsr/en/catalogs/qa190-cat-pdf', a).name, 'DM_catalog_dsr');
  assert.equal(expectedModel('/content/dam/common/ja/products/990586001', a).name, 'DM_product');
  assert.equal(expectedModel('/content/dam/other/ja/x', a), null);
});

test('DSR-669: lint message when a manifest names an old model', () => {
  const p = '/content/dam/dsr/ja/catalogs/qa190-cat-pdf';
  assert.equal(modelCurrency('DM_catalog_related', p, before).ok, true);
  const r = modelCurrency('DM_catalog_related', p, after);
  assert.equal(r.ok, false);
  assert.match(r.message, /old model DM_catalog_related \(old model \(DSR-669 rename\)\); live model .* is DM_catalog_dsr .* model: auto/);
  const gone = { ...after }; delete gone.DM_catalog_related;
  assert.match(modelCurrency('DM_catalog_related', p, gone).message, /not found on DEV/);
  assert.equal(modelCurrency('auto', p, after).actual, 'auto → DM_catalog_dsr');
});

test('DSR-669: model: auto / missing resolved per entry; named models untouched', () => {
  const entries = [
    { kind: 'dsr-cf', model: 'auto', path: '/content/dam/dsr/en/movies/standard/qa587-main' },
    { kind: 'dsr-cf', path: '/content/dam/dsr/en/movies/tech/qa587-tech' },
    { kind: 'content-cf', model: 'DM_movie', path: '/content/dam/common/en/movies/qa587-main' },
    { kind: 'rename', from: '/a', to: '/b', path: '/b' },
  ];
  resolveEntryModels(entries, after);
  assert.deepEqual(entries.map((e) => [e.model, !!e.modelAuto]), [['DM_movie_dsr', true], ['DM_techmovie_dsr', true], ['DM_movie', false], [undefined, false]]);
});
