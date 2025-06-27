const CACHE_NAME = 'birthday-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style/main.css',
  '/script/main.js',
  '/img/adek.jpg',
  '/img/ballon1.svg',
  '/img/ballon2.svg',
  '/img/ballon3.svg',
  '/img/hat.svg',
  '/img/favicon.png',
  '/manifest.json',
  '/music/glue.mpeg',
  '/music/hbd.mpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 