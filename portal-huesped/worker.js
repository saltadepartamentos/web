/**
 * Salta Departamentos — Worker "portal-huesped" (etapa 1)
 * --------------------------------------------------------
 * Entrega la guía del huésped de un departamento SOLO si el pedido trae la
 * clave de ese departamento (la que va en el QR / link). Los datos viven en
 * un KV propio (binding GUIA), separado del KV del panel y del de tarifas.
 *
 * KV (namespace "portal_huesped"):
 *   guia:comun   -> contenido común a todos los departamentos (JSON)
 *   guia:<id>    -> datos del departamento: clave, nombre, wifi, cochera... (JSON)
 *
 * Endpoints:
 *   GET /salud                      -> { ok: true }
 *   GET /api/guia?d=<id>&k=<clave>  -> guía armada (404 si depto o clave no coinciden)
 *
 * En el texto de las tarjetas, {{ruta.al.dato}} se reemplaza con los datos del
 * departamento (ej. {{wifi.red}}). La clave del depto nunca sale en la respuesta.
 */

const ORIGENES_PERMITIDOS = [
  "https://saltadepartamentos.com",
  "https://www.saltadepartamentos.com",
];

function cabecerasCors(request, env) {
  const origen = request.headers.get("Origin") || "";
  const extra = (env.ORIGENES_EXTRA || "").split(",").map((s) => s.trim()).filter(Boolean);
  const h = {
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (ORIGENES_PERMITIDOS.includes(origen) || extra.includes(origen)) {
    h["Access-Control-Allow-Origin"] = origen;
  }
  return h;
}

function json(datos, status, request, env, extra = {}) {
  return new Response(JSON.stringify(datos), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
      ...cabecerasCors(request, env),
      ...extra,
    },
  });
}

/* Comparación en tiempo constante (evita adivinar la clave por tiempos). */
function iguales(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const largo = Math.max(a.length, b.length);
  let dif = a.length ^ b.length;
  for (let i = 0; i < largo; i++) {
    dif |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return dif === 0;
}

function obtener(obj, ruta) {
  return ruta.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/* Reemplaza {{a.b}} en todas las cadenas del contenido. */
function rellenar(valor, datos) {
  if (typeof valor === "string") {
    return valor.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, ruta) => {
      const v = obtener(datos, ruta);
      return v == null ? "" : String(v);
    });
  }
  if (Array.isArray(valor)) return valor.map((x) => rellenar(x, datos));
  if (valor && typeof valor === "object") {
    const salida = {};
    for (const [k, v] of Object.entries(valor)) salida[k] = rellenar(v, datos);
    return salida;
  }
  return valor;
}

/* Las tarjetas pueden limitarse a ciertos deptos con "solo": ["5toa"]. */
function filtrarPorDepto(valor, id) {
  if (Array.isArray(valor)) {
    return valor
      .filter((x) => !(x && typeof x === "object" && Array.isArray(x.solo) && !x.solo.includes(id)))
      .map((x) => filtrarPorDepto(x, id));
  }
  if (valor && typeof valor === "object") {
    const salida = {};
    for (const [k, v] of Object.entries(valor)) if (k !== "solo") salida[k] = filtrarPorDepto(v, id);
    return salida;
  }
  return valor;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cabecerasCors(request, env) });
    }
    if (request.method !== "GET") {
      return json({ error: "método no permitido" }, 405, request, env);
    }

    if (url.pathname === "/salud") {
      return json({ ok: true, servicio: "portal-huesped" }, 200, request, env);
    }

    if (url.pathname === "/api/guia") {
      const id = (url.searchParams.get("d") || "").toLowerCase();
      const clave = url.searchParams.get("k") || "";
      // Mismo 404 para depto inexistente y clave incorrecta: no se revela cuál falló.
      const noEncontrado = () => json({ error: "no encontrado" }, 404, request, env);

      if (!/^[a-z0-9-]{2,20}$/.test(id) || !clave) return noEncontrado();

      const depto = await env.GUIA.get("guia:" + id, "json");
      if (!depto || !iguales(clave, depto.clave)) return noEncontrado();

      const comun = (await env.GUIA.get("guia:comun", "json")) || {};
      const datos = { ...depto };
      delete datos.clave;

      const guia = rellenar(filtrarPorDepto({ ...comun, depto: datos }, id), datos);
      return json(guia, 200, request, env);
    }

    return json({ error: "no encontrado" }, 404, request, env);
  },
};
