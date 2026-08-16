/* ============================================================
   DATOS DE LOS DEPARTAMENTOS
   Archivo compartido entre index.html (grilla) y depto.html
   (página de detalle con galería).

   Cada depto tiene:
   - photo: foto de portada (se usa en la tarjeta del listado)
   - photos: array de fotos para la galería de la página de detalle.
     Formato: { src, alt }
   Curaduría: 6-9 fotos por depto. Los 4 deptos de Pueyrredón 1485
   incluyen siempre pileta + quincho (amenities del edificio) y una
   foto de vista/paisaje. Depto Boedo es una casa aparte, sin esos
   amenities, así que no las incluye.
   ============================================================ */
const DEPTOS = [
  {
    id: "depto-8vo-2",
    nombre: "Depto 8vo 2",
    photo: "images/depto8vo2/12.jpg",
    photos: [
      { src: "images/depto8vo2/12.jpg", alt: "Living comedor" },
      { src: "images/depto8vo2/01.jpg", alt: "Dormitorio principal" },
      { src: "images/depto8vo2/03.jpg", alt: "Cocina" },
      { src: "images/depto8vo2/04.jpg", alt: "Cocina" },
      { src: "images/depto8vo2/06.jpg", alt: "Baño" },
      { src: "images/depto8vo2/02.jpg", alt: "Placard / vestidor" },
      { src: "images/edificio/pileta.jpg", alt: "Pileta en azotea (amenity del edificio)" },
      { src: "images/edificio/quincho.jpg", alt: "SUM con quincho y parrilla (amenity del edificio)" },
      { src: "images/edificio/vista.jpg", alt: "Vista a los cerros de Salta desde el edificio" }
    ],
    huespedes: 6,
    dormitorios: 2,
    tamano: 83,
    camas: "2 individuales + 2 dobles",
    amenities: ["Aire acondicionado","WiFi","TV","Cocina equipada","Cochera opcional","Pileta en azotea","Quincho con asador"],
    descripcion: "Amplio departamento de 2 dormitorios con cochera opcional, a pocas cuadras del centro de Salta. Totalmente amoblado y equipado. El edificio cuenta con pileta en azotea y quincho con asador.",
    descripcionLarga: "Departamento moderno y luminoso ubicado en un edificio con portería, a 15 cuadras de la plaza principal de Salta. Cuenta con dos dormitorios (uno con cama matrimonial y otro con camas individuales), dos baños, living-comedor amplio y cocina totalmente equipada con vajilla, ollas y electrodomésticos. Incluye ropa de cama y de baño. El edificio ofrece pileta al aire libre en la azotea (habilitada de septiembre a abril) y quincho con asador, ambos a disposición consultando disponibilidad en conserjería, con vista a los cerros de Salta. Cochera en el mismo edificio, sujeta a disponibilidad.",
    precioDesde: 75000,
    hasSync: true,
    reservaLinks: { airbnb: "https://www.airbnb.com.ar/rooms/38852148" }
  },
  {
    id: "depto-8vo-3",
    nombre: "Depto 8vo 3",
    photo: "images/depto8vo3/04.jpg",
    photos: [
      { src: "images/depto8vo3/04.jpg", alt: "Living comedor" },
      { src: "images/depto8vo3/02.jpg", alt: "Comedor" },
      { src: "images/depto8vo3/01.jpg", alt: "Cocina" },
      { src: "images/depto8vo3/09.jpg", alt: "Dormitorio matrimonial" },
      { src: "images/depto8vo3/07.jpg", alt: "Dormitorio con 2 camas" },
      { src: "images/depto8vo3/08.jpg", alt: "Placard / vestidor" },
      { src: "images/edificio/pileta.jpg", alt: "Pileta en azotea (amenity del edificio)" },
      { src: "images/edificio/quincho.jpg", alt: "SUM con quincho y parrilla (amenity del edificio)" },
      { src: "images/edificio/vista.jpg", alt: "Vista a los cerros de Salta desde el edificio" }
    ],
    huespedes: 4,
    dormitorios: 2,
    tamano: 80,
    camas: "2 individuales + 1 doble + 1 queen",
    amenities: ["Aire acondicionado","WiFi","TV","Cocina equipada","Lavarropas","Kit de higiene","Pileta en azotea","Quincho con asador"],
    descripcion: "Amplio departamento de 2 dormitorios a pocas cuadras del centro de Salta. Totalmente amoblado y equipado, edificio con pileta en azotea y quincho con asador.",
    descripcionLarga: "Departamento de 2 dormitorios en el mismo edificio que Depto 8vo 2, con portería y a 15 cuadras de la plaza principal. Living-comedor amplio, cocina completa equipada y lavarropas propio. Incluye ropa de cama, de baño y kit de higiene. El edificio cuenta con pileta en azotea (temporada) y quincho con asador a disposición, con vista a los cerros de Salta, consultando disponibilidad.",
    precioDesde: null,
    hasSync: false,
    reservaLinks: {}
  },
  {
    id: "depto-2do-1",
    nombre: "Depto 2do 1",
    photo: "images/depto2do1/01-living-comedor.jpg",
    photos: [
      { src: "images/depto2do1/01-living-comedor.jpg", alt: "Living comedor" },
      { src: "images/depto2do1/02-comedor.jpg", alt: "Comedor" },
      { src: "images/depto2do1/04-cocina.jpg", alt: "Cocina" },
      { src: "images/depto2do1/06-placard.jpg", alt: "Placard / vestidor" },
      { src: "images/depto2do1/07-dormitorio-matrimonial.jpg", alt: "Dormitorio matrimonial" },
      { src: "images/depto2do1/08-dormitorio-2camas.jpg", alt: "Dormitorio con 2 camas" },
      { src: "images/edificio/pileta.jpg", alt: "Pileta en azotea (amenity del edificio)" },
      { src: "images/edificio/quincho.jpg", alt: "SUM con quincho y parrilla (amenity del edificio)" },
      { src: "images/edificio/vista.jpg", alt: "Vista a los cerros de Salta desde el edificio" }
    ],
    huespedes: 6,
    dormitorios: 2,
    tamano: 80,
    camas: "2 individuales + 2 dobles",
    amenities: ["Aire acondicionado","WiFi","TV","Cocina equipada","Ropa blanca","Kit de higiene","Pileta en azotea","Quincho con asador"],
    descripcion: "Amplio departamento de 2 dormitorios, cerca del centro y de los polos gastronómicos y culturales de la ciudad. Pileta en azotea según temporada y quincho con asador (previa reserva en conserjería).",
    descripcionLarga: "Departamento de 2 dormitorios en piso 2°, cerca del centro y de los polos gastronómicos y culturales de Salta. Living-comedor con TV, cocina totalmente equipada y placard amplio en el dormitorio principal. Incluye ropa de cama y de baño, y kit de higiene. El edificio cuenta con pileta en azotea (según temporada) y quincho con asador, con vista a los cerros de Salta, previa reserva en conserjería.",
    precioDesde: null,
    hasSync: false,
    reservaLinks: {}
  },
  {
    id: "depto-boedo",
    nombre: "Depto 1 en Boedo",
    photo: "images/deptoboedo/07.jpg",
    photos: [
      { src: "images/deptoboedo/07.jpg", alt: "Living" },
      { src: "images/deptoboedo/04.jpg", alt: "Cocina comedor" },
      { src: "images/deptoboedo/02.jpg", alt: "Cocina" },
      { src: "images/deptoboedo/05.jpg", alt: "Dormitorio" },
      { src: "images/deptoboedo/06.jpg", alt: "Dormitorio" },
      { src: "images/deptoboedo/01.jpg", alt: "Dormitorio" },
      { src: "images/deptoboedo/08.jpg", alt: "Jardín" }
    ],
    huespedes: 3,
    dormitorios: 1,
    tamano: null,
    camas: "2 individuales + 1 doble",
    amenities: ["WiFi","TV","Baño con ducha"],
    descripcion: "Hermoso departamento de 1 dormitorio, baño principal, cocina comedor y jardín con vista a la calle. A pocas cuadras de la Plaza central de Salta. Cochera con costo adicional.",
    descripcionLarga: "Departamento de 1 dormitorio en zona de Boedo, a pocas cuadras de la Plaza central de Salta. Es una casa independiente (no comparte edificio ni amenities con los deptos de Pueyrredón 1485). Cuenta con baño principal, cocina-comedor integrada y un jardín con vista a la calle, ideal para desayunar al aire libre. Cochera disponible con costo adicional, consultando previamente.",
    precioDesde: null,
    hasSync: false,
    reservaLinks: {}
  },
  {
    id: "depto-5",
    nombre: "Depto 5",
    photo: "images/depto5/01-living-comedor.jpg",
    photos: [
      { src: "images/depto5/01-living-comedor.jpg", alt: "Living comedor" },
      { src: "images/depto5/04-cocina.jpg", alt: "Cocina" },
      { src: "images/depto5/06-dormitorio-principal.jpg", alt: "Dormitorio principal" },
      { src: "images/depto5/08-dormitorio-2camas.jpg", alt: "Dormitorio con 2 camas" },
      { src: "images/depto5/09-placard.jpg", alt: "Placard / vestidor" },
      { src: "images/depto5/10-bano-ducha.jpg", alt: "Baño con ducha" },
      { src: "images/depto5/12-balcon.jpg", alt: "Balcón con vista" },
      { src: "images/edificio/pileta.jpg", alt: "Pileta en azotea (amenity del edificio)" },
      { src: "images/edificio/quincho.jpg", alt: "SUM con quincho y parrilla (amenity del edificio)" }
    ],
    huespedes: 6,
    dormitorios: 2,
    tamano: 83,
    camas: "2 individuales + 1 doble",
    amenities: ["Aire acondicionado","WiFi","TV","Cocina equipada","Pileta en azotea","Quincho con asador"],
    descripcion: "Amplio departamento de 2 dormitorios, a pocas cuadras del centro de Salta. Totalmente amoblado y equipado, con balcón propio.",
    descripcionLarga: "Departamento de 2 dormitorios (uno matrimonial y otro con 2 camas individuales), a pocas cuadras del centro de Salta, en el mismo edificio que Depto 8vo 2, Depto 8vo 3 y Depto 2do 1 (Pueyrredón 1485). Living-comedor luminoso, cocina totalmente equipada, placard amplio y balcón propio con vista. Totalmente amoblado, con ropa de cama y de baño incluida. El edificio ofrece pileta en azotea (temporada) y SUM con quincho y parrilla, consultando disponibilidad en conserjería.",
    precioDesde: null,
    hasSync: true,
    reservaLinks: { airbnb: "https://www.airbnb.com.ar/rooms/27422722", booking: "https://www.booking.com/Share-3B17Ius" }
  }
];

const WA_NUMBER = "5493875802928";

function waLink(depto, checkin, checkout){
  let msg = `Hola! Quiero consultar disponibilidad para ${depto.nombre}.`;
  if(checkin && checkout){
    msg += ` Entrada: ${checkin}, Salida: ${checkout}.`;
  }
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
