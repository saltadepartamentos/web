/* Service worker de /mi-estadia/: deja la página y sus fotos disponibles sin conexión.
   La guía (con la clave del Wi-Fi) NO se guarda acá: la página la guarda en el
   almacenamiento del propio dispositivo y se borra si el enlace deja de ser válido. */
const CACHE = "mi-estadia-v5";
const PAGINA = new URL("./", self.location).pathname; // /mi-estadia/
const BASE = [PAGINA, "../images/logo-icon.png", "../favicon-32.png", "../apple-touch-icon.png",
  "../images/mi-estadia/cajas.jpg", "../images/mi-estadia/puerta.jpg", "../images/mi-estadia/termostato.jpg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // La API de la guía no pasa por el caché del service worker.
  if (url.hostname.endsWith(".workers.dev")) return;

  // La página: primero red, y si no hay conexión, la copia guardada (sin el ?d=&k=).
  if (req.mode === "navigate" && url.origin === self.location.origin && url.pathname.startsWith(PAGINA)) {
    e.respondWith(
      fetch(req)
        .then((r) => {
          // Solo la página principal se guarda; las rutas cortas (/mi-estadia/5toA/) solo redirigen.
          if (r.ok && url.pathname === PAGINA) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(PAGINA, copia)); }
          return r;
        })
        .catch(() => caches.match(PAGINA, { ignoreSearch: true }))
    );
    return;
  }

  // Imágenes, fuentes y Leaflet: caché primero, y se completa a medida que se usan.
  const guardable =
    (url.origin === self.location.origin && /\.(png|jpe?g|ico|webp)$/i.test(url.pathname)) ||
    url.hostname === "cdnjs.cloudflare.com" ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";
  if (guardable) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((r) => {
            if (r.ok || r.type === "opaque") { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
            return r;
          })
      )
    );
  }
});
