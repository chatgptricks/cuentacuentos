/** Required paintings, in their exact atlas order, ready for future story catalog entries. */
const places = [
  ['places-views-10.png', ['Dormitorio infantil', 'Cocina', 'Baño', 'Sala de estar']],
  ['places-views-11.png', ['Comedor', 'Desván', 'Cuarto de juegos', 'Porche de casa']],
  ['places-views-12.png', ['Escuela', 'Consulta amable', 'Estación de tren', 'Mercado']],
  ['places-views-13.png', ['Plaza de fiestas', 'Teatrito', 'Granja', 'Oficina de correos']],
  ['places-views-14.png', ['Puente colgante', 'Cruce de caminos', 'Acantilado con faro', 'Pantano']],
  ['places-views-15.png', ['Volcán dormido', 'Cañón', 'Pista de carreras con meta', 'Colina con vista']],
  ['places-views-16.png', ['Puente del trol', 'Barco pirata', 'Nido gigante del cuervo', 'Cueva del ogro']],
  ['places-views-17.png', ['Castillo de hielo', 'Rincón de telarañas', 'Casa del gigante en las nubes', 'Seta del duende']],
  ['places-views-18.png', ['Mar de nubes al atardecer', 'Campo de luciérnagas', 'Estanque de nenúfares', 'Colina de estrellas fugaces']],
  ['places-views-19.png', ['Bosque nevado de noche', 'Luna como barca', 'Playa al atardecer', 'Jardín de dientes de león']],
];
const characters = [
  ['animals-babies.png', ['Pollito', 'Patito', 'Cervatillo', 'Osezno', 'Potrillo', 'Cría de pingüino', 'Tortuguita marina', 'Cría de foca']],
  ['villains-2.png', ['Bruja del invierno', 'Tiburón refunfuñón', 'Cangrejo cascarrabias', 'Nube de tormenta', 'Rata ladrona', 'Espantapájaros enfadado', 'Mago envidioso', 'Serpiente presumida']],
  ['town-folk.png', ['Cartera', 'Panadero', 'Maestra', 'Dentista amable', 'Jardinera', 'Conductor de tren', 'Vendedora del mercado', 'Guardián del faro']],
  ['tiny-creatures.png', ['Abeja', 'Mariposa', 'Mariquita', 'Hormiga', 'Caracol', 'Grillo', 'Luciérnaga', 'Libélula']],
  ['pets.png', ['Perrito', 'Gatito', 'Pez en pecera', 'Hámster', 'Canario', 'Cobaya', 'Tortuga de tierra', 'Conejito de orejas caídas']],
  ['animals-farm.png', ['Vaca', 'Oveja', 'Cerdito', 'Gallina', 'Poni', 'Burro', 'Cabra', 'Perro pastor']],
  ['night-creatures.png', ['Murciélago', 'Polilla', 'Topo', 'Lirón', 'Oso perezoso', 'Zarigüeya', 'Armadillo', 'Zorro ártico']],
];
const objects = [
  ['objects-bedtime.png', ['Almohada', 'Osito de peluche', 'Lamparita de noche', 'Cepillo de dientes', 'Libro de cuentos', 'Vaso de leche', 'Reloj despertador', 'Zapatillas de casa']],
  ['objects-party.png', ['Caja de regalo', 'Globo', 'Guirnalda de banderines', 'Carta en sobre', 'Corona de flores', 'Sombrero de fiesta', 'Confeti', 'Piñata']],
  ['objects-quest.png', ['Cofre del tesoro', 'Pergamino de pistas', 'Frasco de poción', 'Flor de hielo', 'Estrella caída', 'Piedra de luna', 'Reloj de arena', 'Señal de camino']],
  ['objects-kitchen.png', ['Tarta de cumpleaños', 'Galletas', 'Cuenco con masa', 'Cuchara de madera', 'Jarra de leche', 'Barra de pan', 'Sopa caliente', 'Delantal']],
  ['objects-sport.png', ['Medalla', 'Trofeo', 'Bandera de meta', 'Silbato', 'Pelota', 'Cuerda de saltar', 'Patinete', 'Cronómetro']],
  ['objects-memories.png', ['Baúl antiguo', 'Foto antigua', 'Peonza', 'Muñeca de trapo', 'Canicas', 'Caja de música', 'Gafas del abuelo', 'Avión de papel']],
  ['objects-firsts.png', ['Bicicleta', 'Casco', 'Lonchera', 'Cuaderno con lápiz', 'Flotador', 'Zapatos nuevos', 'Pizarra pequeña', 'Estuche']],
  ['objects-calm.png', ['Caja de preocupaciones', 'Piedra lisa', 'Tarro de la calma', 'Bolsa de agua caliente', 'Pañuelo', 'Tirita', 'Termómetro', 'Flores en un vaso']],
  ['objects-night-sounds.png', ['Cortina al viento', 'Grifo que gotea', 'Reloj de cuco', 'Campanilla de viento', 'Rama junto a la ventana', 'Puerta que cruje', 'Hojas secas', 'Tetera que silba']],
  ['objects-home-tools.png', ['Red', 'Cubo', 'Pala', 'Carretilla', 'Escoba', 'Escalera de mano', 'Saco', 'Caja de cartón']],
];
export const PLACE_ANGLE_LABELS = Object.freeze(['Frontal', 'Desde la izquierda', 'Desde la derecha']);
export const EXPANSION_ART = Object.freeze([
  ...places.map(([file, subjects]) => ({ file, kind: 'places', columns: 4, rows: 3, subjects: Object.freeze(subjects), views: PLACE_ANGLE_LABELS })),
  ...characters.map(([file, subjects]) => ({ file, kind: 'characters', columns: 4, rows: 2, subjects: Object.freeze(subjects) })),
  ...objects.map(([file, subjects]) => ({ file, kind: 'objects', columns: 4, rows: 2, subjects: Object.freeze(subjects) })),
].map(Object.freeze));
