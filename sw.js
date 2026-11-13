const CACHE_NAME='arithmetic-pro-v12.2-20261113';
const APP_FILES=['./','./index.html','./readme.html','./README.md','./manifest.json','./icon.png','./icon-192.png'];
const urls=APP_FILES.map(path=>new URL(path,self.registration.scope).href);
async function cacheRequiredFiles(){
 const cache=await caches.open(CACHE_NAME);
 // addAll fails atomically on a bad response, so never report readiness prematurely.
 await cache.addAll(APP_FILES);
}
async function verifyOfflineFiles(){
 const cache=await caches.open(CACHE_NAME);
 const missing=[];
 for(const url of urls){const response=await cache.match(url);if(!response||!response.ok)missing.push(url)}
 return {ready:missing.length===0,checked:urls.length,missing:missing.length};
}
self.addEventListener('install',event=>{event.waitUntil(cacheRequiredFiles().then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{
 await caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('arithmetic-pro-')&&key!==CACHE_NAME).map(key=>caches.delete(key))));
 await self.clients.claim();
})())});
self.addEventListener('message',event=>{
 const type=event.data?.type;
 if(type!=='CHECK_OFFLINE_FILES'&&type!=='CACHE_OFFLINE_FILES')return;
 const port=event.ports?.[0];if(!port)return;
 event.waitUntil((async()=>{
  try{
   if(type==='CACHE_OFFLINE_FILES'){
    const initial=await verifyOfflineFiles();
    if(!initial.ready)await cacheRequiredFiles();
   }
   port.postMessage(await verifyOfflineFiles());
  }catch{port.postMessage({ready:false,error:'Could not verify or cache all files'})}
 })());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
  // Check the current version only; stale caches cannot prove readiness.
  const cache=await caches.open(CACHE_NAME);
  const cached=await cache.match(event.request);
  if(cached)return cached;
  const response=await fetch(event.request);
  if(response.ok)event.waitUntil(cache.put(event.request,response.clone()));
  return response;
 })());
});
