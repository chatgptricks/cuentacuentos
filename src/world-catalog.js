/** Shared, immutable world identities for stories, illustrations, sound and offline assets. */
// Each column keeps one place; the three rows move from an establishing view to a detail.
const sceneViewGroups = [
  ['forest', 'lake', 'castle', 'garden'],
  ['beach', 'mountain', 'treehouse', 'village'],
  ['meadow', 'cave', 'river', 'clouds'],
  ['waterfall', 'bamboo-grove', 'desert-oasis', 'snowy-valley'],
  ['flower-field', 'mangrove', 'coral-reef', 'mushroom-grove'],
  ['library', 'bakery', 'workshop', 'greenhouse'],
  ['playground', 'orchard', 'windmill', 'harbor'],
  ['crystal-cave', 'floating-island', 'enchanted-tower', 'star-observatory'],
  ['moon-garden', 'rainbow-bridge', 'underwater-palace', 'giant-tree'],
];
const sceneViewSheets = sceneViewGroups.map((_, index) => `places-views-${String(index + 1).padStart(2, '0')}`);
export const SCENE_VIEW_LABELS = Object.freeze(['Panorámica', 'Media', 'Cercana']);
const sceneViews = Object.fromEntries(sceneViewGroups.flatMap((ids, index) => ids.map((id, x) => [id,
  Object.freeze(SCENE_VIEW_LABELS.map((_, y) => Object.freeze({ sheet: sceneViewSheets[index], x, y }))),
])));

export const WORLD_ATLASES = Object.freeze(Object.fromEntries([
  ['main-places', 'places.png', 2, 2], ['extra-places', 'places-extra.png', 4, 2],
  ['main-objects', 'objects.png', 4, 3],
  ['places-nature', 'places-nature.png', 4, 2], ['places-village', 'places-village.png', 4, 2], ['places-wonder', 'places-wonder.png', 4, 2],
  ['objects-explore', 'objects-explore.png', 4, 2], ['objects-create', 'objects-create.png', 4, 2], ['objects-treasure', 'objects-treasure.png', 4, 2],
  ...sceneViewSheets.map(sheet => [sheet, `${sheet}.png`, 4, 3]),
].map(([id, file, columns, rows]) => [id, Object.freeze({ file, columns, rows })])));

const originalScenes = [
  ['forest', 'el bosque', 'Bosque de las Campanillas', undefined, 'main-places', 0, 0, 'Las hojas redondas del bosque susurraban al pasar una brisa pequeña.', ['nature', 'plants', 'outdoors', 'family']],
  ['lake', 'el lago', 'Lago de la Luna', undefined, 'main-places', 0, 1, 'La luna se miraba en el lago y pintaba un camino plateado.', ['nature', 'water', 'outdoors', 'family']],
  ['castle', 'el castillo', 'Castillo de las Nubes', undefined, 'main-places', 1, 0, 'Las torres del castillo parecían tazas enormes con sombreros de colores.', ['wonder', 'shelter', 'fortress']],
  ['garden', 'el jardín', 'Jardín de los Abrazos', undefined, 'main-places', 1, 1, 'Las flores del jardín crecían junto a caminos suaves y bancos pequeños.', ['nature', 'plants', 'outdoors', 'family', 'shelter']],
  ['beach', 'la playa', 'Playa de las Conchitas', 'la', 'extra-places', 0, 0, 'Las olas dejaban conchitas lisas sobre una playa de arena muy suave.', ['nature', 'water', 'outdoors', 'family']],
  ['mountain', 'la montaña', 'Montaña del Eco', 'la', 'extra-places', 1, 0, 'La montaña respondía al saludo con un eco pequeño y muy amable.', ['nature', 'outdoors', 'sky']],
  ['treehouse', 'la casa del árbol', 'Refugio del Árbol', undefined, 'extra-places', 2, 0, 'La casita del árbol tenía ventanas redondas y una escalera de madera.', ['nature', 'plants', 'shelter', 'family']],
  ['village', 'el pueblo', 'Pueblito de los Faroles', undefined, 'extra-places', 3, 0, 'Las casas pequeñas dejaban un camino ancho entre sus puertas de colores.', ['village', 'outdoors', 'shelter', 'family']],
  ['meadow', 'el prado', 'Prado de las Mariposas', undefined, 'extra-places', 0, 1, 'Las mariposas visitaban flores pequeñas en un prado lleno de hierba suave.', ['nature', 'plants', 'outdoors', 'family']],
  ['cave', 'la cueva', 'Refugio de las Lucecitas', undefined, 'extra-places', 1, 1, 'La cueva brillaba con lucecitas cálidas y tenía una entrada amplia y amable.', ['nature', 'shelter', 'stone']],
  ['river', 'el río', 'Río de los Susurros', undefined, 'extra-places', 2, 1, 'El río contaba una canción pequeña mientras pasaba junto a piedras redondas.', ['nature', 'water', 'outdoors', 'family']],
  ['clouds', 'el palacio de las nubes', 'Reino de las Nubes', undefined, 'extra-places', 3, 1, 'Las nubes parecían cojines enormes en un reino de caminos suaves y mágicos.', ['wonder', 'sky', 'fortress', 'shelter']],
];
const sceneSheets = [
  ['places-nature', [
    ['waterfall', 'la cascada', 'Cascada de las Risitas', 'la', 'La cascada dejaba gotas brillantes junto a un camino ancho y tranquilo.', ['nature', 'water', 'outdoors', 'family']],
    ['bamboo-grove', 'el bosque de bambú', 'Bosque de Bambú Cantor', undefined, 'El bambú hacía música cuando la brisa pasaba entre sus tallos altos.', ['nature', 'plants', 'outdoors', 'family']],
    ['desert-oasis', 'el oasis', 'Oasis de los Dátiles', undefined, 'El oasis guardaba agua y una sombra fresca bajo sus palmeras tranquilas.', ['nature', 'plants', 'water', 'outdoors']],
    ['snowy-valley', 'el valle nevado', 'Valle de los Copitos', undefined, 'La nieve cubría el valle y dejaba un sendero ancho entre árboles pequeños.', ['nature', 'outdoors', 'family']],
    ['flower-field', 'el campo de flores', 'Campo de las Mil Flores', undefined, 'El campo tenía flores de colores y senderos para pasar sin arrancarlas.', ['nature', 'plants', 'outdoors', 'family']],
    ['mangrove', 'el manglar', 'Manglar de las Raíces', undefined, 'El manglar tenía raíces que salían del agua y guardaban pequeños rincones de sombra.', ['nature', 'plants', 'water', 'outdoors', 'family']],
    ['coral-reef', 'el arrecife', 'Arrecife de los Colores', undefined, 'El arrecife brillaba bajo el agua y un aire mágico permitía respirar a cualquier visitante.', ['nature', 'water', 'underwater']],
    ['mushroom-grove', 'el bosque de hongos', 'Bosque de los Honguitos', undefined, 'Los hongos parecían sombrillas pequeñas junto a un sendero de hojas suaves.', ['nature', 'plants', 'outdoors', 'family']],
  ]],
  ['places-village', [
    ['library', 'la biblioteca', 'Biblioteca de los Cuentos', 'la', 'La biblioteca tenía libros bajos y cojines para escuchar historias sin ninguna prisa.', ['village', 'shelter', 'family']],
    ['bakery', 'la panadería', 'Panadería de la Luna', 'la', 'La panadería guardaba una mesa grande y panes con formas muy divertidas.', ['village', 'shelter', 'food', 'family']],
    ['workshop', 'el taller', 'Taller de las Ideas', undefined, 'El taller tenía una mesa baja y materiales seguros guardados en cajas de colores.', ['village', 'shelter', 'craft', 'family']],
    ['greenhouse', 'el invernadero', 'Invernadero de las Semillas', undefined, 'El invernadero dejaba entrar la luz hasta sus macetas pequeñas y caminos amplios.', ['village', 'plants', 'shelter', 'family']],
    ['playground', 'el parque de juegos', 'Parque de los Juegos', undefined, 'El parque tenía bancos, juegos bajitos y un camino libre para descubrir nuevas ideas.', ['village', 'outdoors', 'family']],
    ['orchard', 'el huerto', 'Huerto de las Manzanas', undefined, 'El huerto guardaba árboles bajos y una cesta para recoger la fruta madura.', ['village', 'plants', 'food', 'outdoors', 'family']],
    ['windmill', 'el molino', 'Molino de las Brisas', undefined, 'El molino giraba despacio junto a una plaza amplia donde se podía observar el viento.', ['village', 'outdoors', 'shelter', 'family']],
    ['harbor', 'el puerto', 'Puerto de las Velitas', undefined, 'El puerto tenía una plaza segura desde donde mirar barcos de velas pequeñas.', ['village', 'water', 'outdoors', 'family']],
  ]],
  ['places-wonder', [
    ['crystal-cave', 'la cueva de cristal', 'Cueva de los Cristales', 'la', 'Los cristales reflejaban luces suaves sobre el camino ancho de aquella cueva mágica.', ['wonder', 'stone', 'shelter']],
    ['floating-island', 'la isla flotante', 'Isla de los Globos', 'la', 'La isla flotante tenía jardines y caminos protegidos por barandas de nubes mágicas.', ['wonder', 'plants', 'sky', 'outdoors']],
    ['enchanted-tower', 'la torre encantada', 'Torre de las Ventanas', 'la', 'La torre encantada tenía puertas pequeñas y ventanas que guardaban canciones de viento.', ['wonder', 'fortress', 'shelter']],
    ['star-observatory', 'el observatorio', 'Observatorio de las Estrellas', undefined, 'El observatorio tenía una ventana enorme para mirar estrellas desde cojines cómodos.', ['wonder', 'sky', 'shelter']],
    ['moon-garden', 'el jardín lunar', 'Jardín de la Luna', undefined, 'Las flores del jardín lunar abrían sus pétalos bajo una luz suave y plateada.', ['wonder', 'plants', 'sky', 'outdoors']],
    ['rainbow-bridge', 'el puente arcoíris', 'Puente de los Colores', undefined, 'El puente arcoíris tenía barandas altas y un camino ancho sobre nubes suaves.', ['wonder', 'sky', 'outdoors']],
    ['underwater-palace', 'el palacio submarino', 'Palacio de las Burbujas', undefined, 'El palacio submarino tenía salas de aire mágico donde cualquier visitante podía respirar.', ['wonder', 'water', 'underwater', 'fortress', 'shelter']],
    ['giant-tree', 'el árbol gigante', 'Árbol de los Mil Recuerdos', undefined, 'El árbol gigante extendía ramas verdes sobre un tronco ancho y raíces llenas de recuerdos.', ['wonder', 'plants', 'outdoors']],
  ]],
];
const sceneEntries = [...originalScenes, ...sceneSheets.flatMap(([sheet, rows]) => rows.map(([id, label, name, article, detail, tags], index) => [id, label, name, article, sheet, index % 4, Math.floor(index / 4), detail, tags]))];
export const SCENES = Object.freeze(sceneEntries.map(([id, label, name, article, sheet, x, y, detail, tags]) => Object.freeze({
  id, label, name, scene: id, ...(article ? { article } : {}), detail, tags: Object.freeze(tags),
  atlas: Object.freeze({ sheet, x, y }), views: sceneViews[id], sound: id,
})));

const itemSheets = [
  ['main-objects', 4, [
    ['seed', 'semilla de luz', 'la'], ['bell', 'campanita de luna', 'la'], ['drop', 'gota cantora', 'la'], ['feather', 'pluma de lluvia', 'la'],
    ['key', 'llave', 'la'], ['umbrella', 'paraguas', 'el'], ['cloud', 'nube', 'la'], ['yarn', 'ovillo de lana', 'el'],
    ['blanket', 'manta', 'la'], ['basket', 'cesta', 'la'], ['flower', 'flor', 'la'], ['boat', 'barquito', 'el'],
  ]],
  ['objects-explore', 4, [
    ['lantern', 'farol', 'el'], ['compass', 'brújula', 'la'], ['map', 'mapa', 'el'], ['telescope', 'telescopio', 'el'],
    ['magnifying-glass', 'lupa', 'la'], ['backpack', 'mochila', 'la'], ['rope', 'cuerda', 'la'], ['boots', 'botas', 'las'],
  ]],
  ['objects-create', 4, [
    ['kite', 'cometa', 'la'], ['drum', 'tambor', 'el'], ['flute', 'flauta', 'la'], ['paintbrush', 'pincel', 'el'],
    ['crayons', 'crayones', 'los'], ['puzzle', 'rompecabezas', 'el'], ['pinwheel', 'molinillo', 'el'], ['paper-star', 'estrella de papel', 'la'],
  ]],
  ['objects-treasure', 4, [
    ['shell', 'concha', 'la'], ['pearl', 'perla', 'la'], ['crystal', 'cristal', 'el'], ['acorn', 'bellota', 'la'],
    ['apple', 'manzana', 'la'], ['honey-jar', 'tarrito de miel', 'el'], ['teacup', 'taza', 'la'], ['watering-can', 'regadera', 'la'],
  ]],
];
export const ITEMS = Object.freeze(itemSheets.flatMap(([sheet, columns, rows]) => rows.map(([id, label, article], index) => Object.freeze({
  id, label, article, atlas: Object.freeze({ sheet, x: index % columns, y: Math.floor(index / columns) }), sound: id,
}))));
// Retain the existing engine API while the renderer can use the same records directly.
export const OBJECTS = ITEMS;
export const getScene = id => SCENES.find(scene => scene.id === id);
/** Presentation only: saved scenes and their original atlas coordinates stay valid. */
export const getSceneView = (id, index = 0) => {
  const scene = getScene(id);
  if (!scene) return undefined;
  const view = Number.isInteger(index) ? ((index % 3) + 3) % 3 : 0;
  return scene.views?.[view] || scene.atlas;
};
/** A place advances independently of other places, including when resuming a saved book. */
export const getSceneViewIndex = (pages, sourceIndex) => {
  const scene = pages?.[sourceIndex]?.scene;
  if (!scene) return 0;
  let appearances = 0;
  for (let index = 0; index < sourceIndex; index += 1) if (pages[index]?.scene === scene) appearances += 1;
  return appearances % SCENE_VIEW_LABELS.length;
};
export const getItem = id => ITEMS.find(item => item.id === id);
