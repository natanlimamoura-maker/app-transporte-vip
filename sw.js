// Este arquivo precisa existir na mesma pasta do index.html
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    return self.clients.claim();
});

// O segredo está aqui: o navegador exige um evento de busca (fetch)
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
