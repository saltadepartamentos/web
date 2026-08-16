# Cómo poner en marcha el buscador de disponibilidad

El sitio (`index.html`) es estático y sigue viviendo en GitHub Pages, tal cual como ahora. Lo único nuevo es un pequeño backend gratuito (Cloudflare Worker) que lee los calendarios .ics de Airbnb/Booking, porque el navegador no puede leerlos directamente.

## 1. Crear la cuenta y el Worker (una sola vez, 5 minutos)

1. Entrá a https://dash.cloudflare.com/sign-up y creá una cuenta gratis (con tu email).
2. Una vez adentro, en el menú lateral andá a **Workers & Pages**.
3. Click en **Create** > **Create Worker**.
4. Ponele un nombre, por ejemplo `salta-disponibilidad`, y click en **Deploy** (te crea un worker de ejemplo).
5. Click en **Edit code** (o "Quick edit").
6. Borrá todo el código de ejemplo y pegá el contenido completo del archivo `worker.js` que te dejé.
7. Click en **Save and deploy**.
8. Cloudflare te va a dar una URL del tipo:
   `https://salta-disponibilidad.TU-USUARIO.workers.dev`
   Esa es la URL que necesitás.

## 2. Conectar el sitio con el Worker

1. Abrí `index.html`.
2. Buscá esta línea (cerca del final, dentro del `<script>`):
   ```js
   const WORKER_URL = "";
   ```
3. Poné ahí la URL que te dio Cloudflare:
   ```js
   const WORKER_URL = "https://salta-disponibilidad.TU-USUARIO.workers.dev";
   ```
4. Guardá y subí el archivo al repo de GitHub (`saltadepartamentos/web`).

Listo — el buscador de la home ya va a consultar disponibilidad real.

## 3. Completar los calendarios que faltan

Hoy `worker.js` tiene cargados los links de Airbnb de 3 departamentos (Depto 8vo 2, Depto 2do 1, Depto 5), sacados del panel de Wix Hotels. **Depto 8vo 3** y **Depto 1 en Boedo** todavía no tienen link cargado.

Para cada uno que falte:

1. Conseguí el link .ics:
   - **Airbnb**: Panel de anfitrión → Calendario → Disponibilidad → Sincronización de calendarios → "Exportar calendario". Copiá esa URL (termina en `.ics`).
   - **Booking.com**: Extranet → Calendario → Sincronizar calendarios → "Exportar calendario de Booking.com".
2. Abrí `worker.js`, buscá el depto correspondiente en el array `DEPTOS` y agregá el link dentro de `icalUrls`, por ejemplo:
   ```js
   {
     id: "depto-8vo-3",
     icalUrls: [
       "https://www.airbnb.com.ar/calendar/ical/XXXXXXX.ics?s=XXXXXXXXXXXXXXXX",
     ],
   },
   ```
   Un mismo depto puede tener más de un link (uno de Airbnb y otro de Booking) — el Worker los combina.
3. Volvé a pegar el código actualizado en Cloudflare (Edit code → pegar → Save and deploy).

## 4. Fotos reales

Las fotos que usé en `index.html` son **placeholders genéricos** (fotos de stock de Unsplash), no las tuyas. Para cambiarlas:

1. Subí tus fotos reales a una carpeta `images/` en el repo (por ejemplo `images/depto-8vo-2-1.jpg`).
2. En `index.html`, buscá el array `DEPTOS` dentro del `<script>` y cambiá la propiedad `photo` de cada uno por la ruta de tu imagen, por ejemplo:
   ```js
   photo: "images/depto-8vo-2-1.jpg",
   ```

## Costos

Todo esto es gratis: GitHub Pages (hosting del sitio) y el plan gratuito de Cloudflare Workers (100.000 requests/día, de sobra para este uso) no tienen costo.
