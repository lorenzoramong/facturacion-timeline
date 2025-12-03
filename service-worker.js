self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("camino-gdc-v1").then((cache) => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "logo-gases.png"
      ]);
    })
  );
});
 
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
