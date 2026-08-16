/**
 * Salta Departamentos — Worker de disponibilidad
 * ------------------------------------------------
 * Lee el calendario .ics de Airbnb de cada departamento (el navegador
 * no puede leerlo directo por CORS) y responde si hay superposición
 * con el rango de fechas pedido.
 *
 * Solo se vincula el calendario de AIRBNB. Booking.com se sincroniza
 * directo desde Airbnb (Eduardo lo tiene vinculado del lado de
 * Booking), así que el calendario de Airbnb ya refleja también las
 * reservas de Booking — no hace falta cargar un .ics de Booking acá.
 *
 * Endpoint:
 *   GET /availability?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD
 *   -> { "results": [ { "id": "depto-8vo-2", "available": true }, ... ] }
 *
 * available:
 *   true  -> libre en ese rango
 *   false -> ocupado (hay una reserva que se superpone)
 *   null  -> todavía no tiene calendario cargado (consultar manualmente)
 *
 * CÓMO CONSEGUIR EL LINK .ICS DE AIRBNB
 * -----------------------------------------------
 * Panel de anfitrión > Calendario > Disponibilidad > Sincronización de
 * calendarios > Exportar calendario (o ya están cargados en Wix
 * Hotels > Reservas > iCal, que es de donde se sacaron los links de
 * abajo).
 *
 * Para agregar/cambiar un depto, editar el array DEPTOS más abajo.
 */

const DEPTOS = [
  {
    id: "depto-8vo-2",
    icalUrls: [
      "https://www.airbnb.com.ar/calendar/ical/28866519.ics?t=c324b4cff63e41db956df8950e71ad0d",
    ],
  },
  {
    id: "depto-8vo-3",
    icalUrls: [
      // TODO: agregar link .ics de Airbnb de Depto 8vo 3
    ],
  },
  {
    id: "depto-2do-1",
    icalUrls: [
      // Sin calendario por ahora (a pedido de Eduardo, 16/8/2026)
    ],
  },
  {
    id: "depto-boedo",
    icalUrls: [
      // TODO: agregar link .ics de Airbnb de Depto 1 en Boedo
    ],
  },
  {
    id: "depto-5",
    icalUrls: [
      "https://www.airbnb.com.ar/calendar/ical/27422722.ics?t=097c7a94cb7840da839a701011a021cf",
    ],
  },
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // en producción, restringir al dominio del sitio
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (url.pathname === "/availability") {
      return handleAvailability(url);
    }

    return jsonResponse({ error: "not found" }, 404);
  },
};

async function handleAvailability(url) {
  const checkin = url.searchParams.get("checkin");
  const checkout = url.searchParams.get("checkout");

  if (!checkin || !checkout || !isValidDate(checkin) || !isValidDate(checkout)) {
    return jsonResponse({ error: "Parámetros checkin/checkout inválidos (YYYY-MM-DD)" }, 400);
  }

  const reqStart = new Date(`${checkin}T00:00:00Z`);
  const reqEnd = new Date(`${checkout}T00:00:00Z`);

  if (reqEnd <= reqStart) {
    return jsonResponse({ error: "checkout debe ser posterior a checkin" }, 400);
  }

  const results = await Promise.all(
    DEPTOS.map(async (depto) => {
      if (!depto.icalUrls || depto.icalUrls.length === 0) {
        return { id: depto.id, available: null };
      }
      try {
        const busyRanges = await getBusyRanges(depto.icalUrls);
        const overlap = busyRanges.some((r) => rangesOverlap(reqStart, reqEnd, r.start, r.end));
        return { id: depto.id, available: !overlap };
      } catch (err) {
        return { id: depto.id, available: null, error: true };
      }
    })
  );

  return jsonResponse({ checkin, checkout, results });
}

async function getBusyRanges(urls) {
  const allRanges = [];
  for (const icalUrl of urls) {
    const res = await fetch(icalUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SaltaDeptosBot/1.0)" },
      cf: { cacheTtl: 300, cacheEverything: true }, // cachea 5 min para no golpear Airbnb en cada búsqueda
    });
    if (!res.ok) continue;
    const text = await res.text();
    allRanges.push(...parseIcsEvents(text));
  }
  return allRanges;
}

function parseIcsEvents(icsText) {
  const events = [];
  const lines = icsText.split(/\r?\n/);
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "BEGIN:VEVENT") {
      current = {};
    } else if (line === "END:VEVENT") {
      if (current && current.start && current.end) events.push(current);
      current = null;
    } else if (current) {
      if (line.startsWith("DTSTART")) {
        current.start = parseIcsDate(line);
      } else if (line.startsWith("DTEND")) {
        current.end = parseIcsDate(line);
      }
    }
  }
  return events.filter((e) => e.start && e.end);
}

function parseIcsDate(line) {
  // Soporta DTSTART:20260810 y DTSTART;VALUE=DATE:20260810
  const value = line.split(":").pop().trim();
  const y = value.slice(0, 4);
  const m = value.slice(4, 6);
  const d = value.slice(6, 8);
  const date = new Date(`${y}-${m}-${d}T00:00:00Z`);
  return isNaN(date.getTime()) ? null : date;
}

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function isValidDate(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(`${str}T00:00:00Z`).getTime());
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
