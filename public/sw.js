// Clean Pass-Through Service Worker for Next.js PWA Compliance
const CACHE_NAME = "study-with-arup-v3";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => caches.delete(cache))
      );
    })
  );
  self.clients.claim();
});

// Pass-through fetch handler so Next.js App Router handles all navigation smoothly
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
