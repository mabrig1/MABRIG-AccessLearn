/* Offline shell and immutable build assets, never cache API or private data. */
const CACHE='accesslearn-shell-v2';
const SHELL=['/','/index.html','/manifest.webmanifest','/icon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>Promise.allSettled(SHELL.map(url=>cache.add(url)))));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
 self.clients.claim();
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('/index.html',copy));}return response;}).catch(async()=>await caches.match('/index.html')||Response.error()));
  return;
 }
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{
  if(response.ok&&response.type==='basic'){
   const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));
  }
  return response;
 })));
});
