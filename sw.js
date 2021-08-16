var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Memulai service worker dan memasukan filesToCache ke dalam cache */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Mengupdate cache */
self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames
                  .filter(cacheName => (cacheName.startsWith("pwa-")))
                  .filter(cacheName => (cacheName !== staticCacheName))
                  .map(cacheName => caches.delete(cacheName))
          );
      })
  );
});

/* Akan menjalankan file cache ketika dalam keadaan offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
