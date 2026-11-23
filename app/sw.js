const C='stundenplan-v7', F=['./','index.html','manifest.webmanifest','apple-touch-icon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
/* network first: updates show up right away; if the site is offline or private, the saved copy is used */
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));} return r; })
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||caches.match('index.html'))));
});
