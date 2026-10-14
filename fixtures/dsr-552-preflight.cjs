const { chromium, request } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config({ path: `envs/${process.env.ENV || 'dev'}.env` });
(async () => {
 const api = await request.newContext({ baseURL: process.env.BASE_URL });
 const browser = await chromium.launch(); const page = await browser.newPage({ baseURL: process.env.BASE_URL });
 const entries = [];
 for (const lang of ['ja', 'en']) for (const [suffix,title] of [['dsr552-bc','QA Parent'],['dsr552-bc/child','QA Child'],['dsr552-bc/child/grandchild','QA Grandchild']]) entries.push({path:`/master/${lang}/test-space/${suffix}`,title});
 for (const [suffix,title] of [['dsr552-edge','QA Edge'],...['A','B','C'].map(x=>[`dsr552-edge/sp-${x.toLowerCase()}`,`階層${x}のとても長いタイトルを持つテスト用ページ名称です確認用`]),['dsr552-gap','QA Gap'],['dsr552-gap/x',null],['dsr552-gap/x/leaf','QA Leaf'],['','test space']]) entries.push({path:`/master/ja/test-space${suffix?'/'+suffix:''}`,title});
 entries.push({path:'/master/en/test-space',title:'test-space'});
 for (const e of entries) {
  const r = await api.get(e.path); e.status = r.status(); e.finalURL = r.url();
  const html=await r.text(); e.observedTitle=(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'').replace(/\s*\|\s*YKK DIGITAL SHOWROOM\s*$/,'').trim();
  e.blocked=e.title===null?e.status!==404:e.status!==200||e.observedTitle!==e.title;
  console.log(JSON.stringify(e));
 }
 fs.writeFileSync('evidence/DSR-552/DEV/preflight.json',JSON.stringify({time:new Date().toISOString(),baseURL:process.env.BASE_URL,entries},null,2));
 await page.goto('/master/ja/test-space/dsr552-bc/child'); await page.getByTestId('breadcrumb').waitFor();
 const dom=await page.evaluate(()=>({scripts:Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s=>({location:s.closest('head')?'head':'body',text:s.textContent})),breadcrumb:document.querySelector('[data-testid="breadcrumb"]')?.outerHTML,header:document.querySelector('header')?.outerHTML.slice(0,500),fonts:Array.from(document.fonts).filter(f=>f.status==='loaded').map(f=>({family:f.family,status:f.status}))}));
 fs.writeFileSync('evidence/DSR-552/DEV/preflight.json',JSON.stringify({time:new Date().toISOString(),baseURL:process.env.BASE_URL,entries,dom},null,2));
 await page.screenshot({path:'evidence/DSR-552/DEV/preflight.png'}); await browser.close(); await api.dispose();
})();
