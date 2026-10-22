const {chromium}=require('@playwright/test');
const fs=require('fs');
const path=require('path');
const {execSync}=require('child_process');
const out=__dirname;
(async()=>{
 const started=new Date().toISOString(), captures=[], tests=[];
 const browser=await chromium.launch({headless:true});
 try {
 for(const lang of ['ja','en']) for(const [device,width,height] of [['PC',1440,900],['SP',390,844]]){
 if(captures.some(c=>c.lang===lang&&c.note==='list empty'))continue;
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const images=[];
 page.on('response',r=>{if(r.request().resourceType()==='image')images.push({url:r.url(),status:r.status()});});
 const queryPromise=page.waitForResponse(r=>r.url().includes('dsr-catalog-list'),{timeout:45000}).catch(()=>null);
 const response=await page.goto(`https://main--dsr-eds-dev--sutrix-projects.aem.live/${lang}/library/catalog`,{waitUntil:'domcontentloaded'});
 const query=await queryPromise; if(query) await query.finished();
 const data=query?await query.json():null;
 const cards=page.locator('.listing.listing-catalog .cards.catalog li');
 const items=data?.data?.related?.items??[];
 if(!items.length){
 const evidence=[];
 for(const [label,w,h] of [['PC',1440,900],['SP',390,844]]){
 await page.setViewportSize({width:w,height:h});await page.evaluate(()=>document.fonts.ready);
 for(const kind of ['viewport','full']){const file=`evidence/capture-20261022/${lang}-${label}-${w}x${h}-${kind}.png`;await page.screenshot({path:path.join(out,file),fullPage:kind==='full',animations:'disabled'});evidence.push(file);}
 }
 captures.push({lang,device:'PC and SP',url:page.url(),status:response.status(),query:query?{url:query.url(),status:query.status()}:null,note:'list empty',cardCount:await cards.count(),mainHtml:await page.locator('main').innerHTML(),bodyText:await page.locator('body').innerText(),evidence});await page.close();console.log(lang,'list empty');continue;
 }
 await cards.first().waitFor({state:'visible',timeout:30000});
 for(const card of await cards.all()) {await card.scrollIntoViewIfNeeded();await card.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.complete?null:new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});setTimeout(resolve,10000)}))));}
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>window.scrollTo(0,0));
 const measured=await cards.evaluateAll(nodes=>{
 const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y+scrollY,width:r.width,height:r.height,right:r.right,bottom:r.bottom+scrollY}};
 return nodes.map((e,index)=>({index,title:e.querySelector('.cards-card-title')?.textContent.trim(),text:e.innerText,meta:e.querySelector('.cards-card-meta')?.innerText,metaHtml:e.querySelector('.cards-card-meta')?.outerHTML,box:box(e),images:[...e.querySelectorAll('img')].map(i=>({src:i.currentSrc,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,complete:i.complete,box:box(i)})),textBounds:[...e.querySelectorAll('*')].filter(n=>[...n.childNodes].some(c=>c.nodeType===3&&c.textContent.trim())).map(n=>{const ranges=[...n.childNodes].filter(c=>c.nodeType===3&&c.textContent.trim()).flatMap(c=>{const r=document.createRange();r.selectNodeContents(c);return [...r.getClientRects()].map(r=>({x:r.x,y:r.y+scrollY,width:r.width,height:r.height,right:r.right}))});return {tag:n.tagName,class:n.className,text:n.textContent.trim(),box:box(n),clientWidth:n.clientWidth,scrollWidth:n.scrollWidth,ranges,exceedsCard:ranges.some(r=>r.x<e.getBoundingClientRect().x-1||r.right>e.getBoundingClientRect().right+1),exceedsElement:ranges.some(r=>r.x<n.getBoundingClientRect().x-1||r.right>n.getBoundingClientRect().right+1)}})}));});
 for(const card of measured)for(const img of card.images)img.httpResponses=images.filter(r=>r.url===img.src);
 const layout=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,height:document.documentElement.scrollHeight}));
 const stem=`evidence/capture-20261022/${lang}-${device}-${width}x${height}`;
 await page.screenshot({path:path.join(out,stem+'-viewport.png'),animations:'disabled'});
 await page.screenshot({path:path.join(out,stem+'-full.png'),fullPage:true,animations:'disabled'});
 captures.push({lang,device,viewport:{width,height},url:page.url(),status:response.status(),query:{url:query.url(),status:query.status(),items:items.length},cardCount:measured.length,cards:measured,layout,cardsPerRow:Object.values(measured.reduce((a,c)=>{const y=Math.round(c.box.y);a[y]=(a[y]||0)+1;return a},{})),evidence:[stem+'-viewport.png',stem+'-full.png']});
 console.log(lang,device,measured.length,layout);
 await page.close();
 }
 }finally{await browser.close();fs.writeFileSync(path.join(out,'observations.json'),JSON.stringify({started,finished:new Date().toISOString(),head:execSync('git rev-parse HEAD').toString().trim(),captures},null,2));}
})().catch(e=>{console.error(e);process.exitCode=1});
