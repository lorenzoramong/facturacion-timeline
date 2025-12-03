/* 🔵 NUEVO — SERVICE WORKER COMPLETO PARA PWA REAL */
 
const CACHE_NAME = "camino-gdc-v1";
const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "icons/logo-192.png",
  "icons/logo-512.png"
];
 
// Instalación del SW → guarda archivos en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});
 
// Activación → Limpia caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});
 
// Fetch → Responder con cache o red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((res) => res || fetch(event.request))
  );
});
