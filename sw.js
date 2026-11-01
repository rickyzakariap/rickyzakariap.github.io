/* Retire the previous birthday-card service worker without touching other caches. */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await caches.delete('birthday-cache-v1');
  await self.clients.claim();
  await self.registration.unregister();
})()));
