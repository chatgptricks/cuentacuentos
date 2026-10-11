/** Shared, immutable world identities for stories, illustrations, sound and offline assets. */
// Each column keeps one place; the original rows vary framing and the expansion rows vary angle.
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
  // Expansion: these places exist only as views; their first view is also their catalogue icon.
  ['bedroom', 'kitchen', 'bathroom', 'living-room'],
  ['dining-room', 'attic', 'playroom', 'porch'],
  ['school', 'clinic', 'train-station', 'market'],
  ['festival-square', 'little-theater', 'farm', 'post-office'],
  ['rope-bridge', 'crossroads', 'lighthouse-cliff', 'swamp'],
  ['volcano', 'canyon', 'race-track', 'lookout-hill'],
  ['troll-bridge', 'pirate-ship', 'crow-nest', 'ogre-cave'],
  ['ice-castle', 'web-corner', 'giant-house', 'imp-mushroom'],
  ['cloud-sea', 'firefly-field', 'lily-pond', 'shooting-star-hill'],
  ['snowy-night-forest', 'moon-boat', 'sunset-beach', 'dandelion-garden'],
];
const sceneViewSheets = sceneViewGroups.map((_, index) => `places-views-${String(index + 1).padStart(2, '0')}`);
export const SCENE_VIEW_LABELS = Object.freeze(['Panorámica', 'Media', 'Cercana']);
const SCENE_ANGLE_LABELS = Object.freeze(['Frontal', 'Desde la izquierda', 'Desde la derecha']);
const angleViewSceneIds = new Set(sceneViewGroups.slice(9).flat());
const sceneViews = Object.fromEntries(sceneViewGroups.flatMap((ids, index) => ids.map((id, x) => [id,
  Object.freeze(SCENE_VIEW_LABELS.map((_, y) => Object.freeze({ sheet: sceneViewSheets[index], x, y }))),
])));

export const WORLD_ATLASES = Object.freeze(Object.fromEntries([
  ['main-places', 'places.png', 2, 2], ['extra-places', 'places-extra.png', 4, 2],
  ['main-objects', 'objects.png', 4, 3],
  ['places-nature', 'places-nature.png', 4, 2], ['places-village', 'places-village.png', 4, 2], ['places-wonder', 'places-wonder.png', 4, 2],
  ['objects-explore', 'objects-explore.png', 4, 2], ['objects-create', 'objects-create.png', 4, 2], ['objects-treasure', 'objects-treasure.png', 4, 2],
  ...sceneViewSheets.map(sheet => [sheet, `${sheet}.png`, 4, 3]),
  ...['objects-bedtime', 'objects-party', 'objects-quest', 'objects-kitchen', 'objects-sport', 'objects-memories', 'objects-firsts', 'objects-calm', 'objects-night-sounds', 'objects-home-tools']
    .map(sheet => [sheet, `${sheet}.png`, 4, 2]),
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
// Rooms of a home use a common noun as their name: «en el dormitorio», «a la cocina».
const viewOnlyScenes = [
  ['bedroom', 'el dormitorio', 'dormitorio', undefined, 'El dormitorio tenía una cama con colcha de cuadros y estrellas colgadas del techo.', ['home', 'shelter', 'family', 'indoors']],
  ['kitchen', 'la cocina', 'cocina', 'la', 'La cocina olía a pan y tenía una mesa redonda junto a la ventana.', ['home', 'shelter', 'family', 'indoors', 'food']],
  ['bathroom', 'el baño', 'baño', undefined, 'El baño tenía azulejos azules, una bañera con patas y una toalla suave.', ['home', 'shelter', 'family', 'indoors']],
  ['living-room', 'la sala de estar', 'sala de estar', 'la', 'La sala de estar tenía un sofá verde, cojines y una lámpara de luz tibia.', ['home', 'shelter', 'family', 'indoors']],
  ['dining-room', 'el comedor', 'comedor', undefined, 'El comedor tenía una mesa larga donde cabía toda la familia.', ['home', 'shelter', 'family', 'indoors', 'food']],
  ['attic', 'el desván', 'desván', undefined, 'El desván guardaba cajas, un baúl viejo y una ventanita redonda.', ['home', 'shelter', 'family', 'indoors']],
  ['playroom', 'el cuarto de juegos', 'cuarto de juegos', undefined, 'El cuarto de juegos tenía una alfombra blanda y juguetes en cada estante.', ['home', 'shelter', 'family', 'indoors']],
  ['porch', 'el porche', 'porche', undefined, 'El porche tenía un banco de madera desde donde se veía llegar a las visitas.', ['home', 'shelter', 'family', 'outdoors']],
  ['school', 'la escuela', 'Escuela del Arcoíris', 'la', 'La escuela tenía pupitres pequeños, dibujos en las paredes y un patio soleado.', ['village', 'shelter', 'family', 'indoors']],
  ['clinic', 'la consulta', 'Consulta de la Sonrisa', 'la', 'La consulta era luminosa y tenía un sillón cómodo y juguetes para esperar.', ['village', 'shelter', 'family', 'indoors']],
  ['train-station', 'la estación', 'Estación de las Golondrinas', 'la', 'La estación tenía un reloj grande, bancos de madera y vías que se perdían a lo lejos.', ['village', 'outdoors', 'family']],
  ['market', 'el mercado', 'Mercado de los Colores', undefined, 'El mercado tenía puestos con toldos de rayas llenos de frutas y verduras.', ['village', 'outdoors', 'family', 'food']],
  ['festival-square', 'la plaza', 'Plaza de las Guirnaldas', 'la', 'La plaza tenía una fuente en el centro y banderines de colores entre los faroles.', ['village', 'outdoors', 'family']],
  ['little-theater', 'el teatrito', 'Teatrito del Telón Rojo', undefined, 'El teatrito tenía un telón rojo y bancos de madera para el público.', ['village', 'outdoors', 'family']],
  ['farm', 'la granja', 'Granja del Girasol', 'la', 'La granja tenía un establo con heno, un huerto y girasoles junto a la cerca.', ['village', 'outdoors', 'family', 'plants', 'food']],
  ['post-office', 'la oficina de correos', 'Oficina de las Cartas Viajeras', 'la', 'La oficina de correos tenía una puerta azul y un buzón rojo junto a la entrada.', ['village', 'shelter', 'family']],
  ['rope-bridge', 'el puente colgante', 'Puente de las Lianas', undefined, 'El puente colgante se mecía despacio sobre un río que corría muy abajo.', ['nature', 'outdoors', 'water', 'plants']],
  ['crossroads', 'el cruce de caminos', 'Cruce de los Cuatro Caminos', undefined, 'En el cruce, un poste de madera señalaba cuatro caminos distintos.', ['nature', 'outdoors', 'family']],
  ['lighthouse-cliff', 'el acantilado', 'Acantilado del Faro', undefined, 'En lo alto del acantilado, un faro blanco miraba hacia el mar.', ['nature', 'outdoors', 'water']],
  ['swamp', 'el pantano', 'Pantano de las Ranas', undefined, 'El pantano tenía agua quieta, juncos altos y troncos cubiertos de musgo.', ['nature', 'outdoors', 'water', 'plants']],
  ['volcano', 'el volcán', 'Volcán Dormilón', undefined, 'El volcán dormía tranquilo y dejaba escapar una nubecita de vapor.', ['nature', 'outdoors', 'stone']],
  ['canyon', 'el cañón', 'Cañón Colorado', undefined, 'El cañón tenía paredes de roca rojiza y un sendero que serpenteaba entre ellas.', ['nature', 'outdoors', 'stone']],
  ['race-track', 'la pista de carreras', 'Pista de las Banderas', 'la', 'La pista de carreras daba la vuelta a un prado y terminaba en una meta de colores.', ['village', 'outdoors', 'family']],
  ['lookout-hill', 'la colina', 'Colina del Mirador', 'la', 'Desde la colina se veían los campos, los caminos y los tejados del pueblo.', ['nature', 'outdoors', 'family']],
  ['troll-bridge', 'el puente de piedra', 'Puente del Trol', undefined, 'Bajo el puente de piedra había una puertecita redonda junto al agua.', ['lair', 'nature', 'outdoors', 'water']],
  ['pirate-ship', 'el barco pirata', 'Barco de las Velas Remendadas', undefined, 'El barco pirata tenía velas remendadas y una bandera roja que ondeaba.', ['lair', 'water', 'outdoors']],
  ['crow-nest', 'el nido gigante', 'Nido del Roble Alto', undefined, 'En lo alto de un roble había un nido enorme lleno de cosas brillantes.', ['lair', 'nature', 'outdoors', 'plants']],
  ['ogre-cave', 'la cueva del ogro', 'Cueva de las Despensas', 'la', 'La cueva del ogro tenía estantes llenos de tarros, cestas y cacharros.', ['lair', 'nature', 'stone', 'shelter']],
  ['ice-castle', 'el castillo de hielo', 'Castillo de Hielo', undefined, 'El castillo de hielo brillaba azul y tenía torres transparentes como el cristal.', ['lair', 'wonder', 'fortress', 'shelter']],
  ['web-corner', 'el rincón de las telarañas', 'Rincón de las Telarañas', undefined, 'Entre las ramas colgaban telarañas que brillaban con gotas de rocío.', ['lair', 'nature', 'outdoors', 'plants']],
  ['giant-house', 'la casa del gigante', 'Casa de las Nubes Altas', 'la', 'La casa del gigante estaba sobre las nubes y tenía una puerta altísima.', ['lair', 'wonder', 'sky', 'shelter']],
  ['imp-mushroom', 'la seta del duende', 'Seta del Duende', 'la', 'La seta del duende tenía una puertecita, ventanas redondas y una chimenea torcida.', ['lair', 'nature', 'plants', 'outdoors']],
  ['cloud-sea', 'el mar de nubes', 'Mar de Nubes', undefined, 'Un mar de nubes rosadas se extendía bajo un cielo de atardecer.', ['dream', 'sky']],
  ['firefly-field', 'el campo de luciérnagas', 'Campo de las Luciérnagas', undefined, 'Cientos de luciérnagas encendían lucecitas sobre la hierba de la noche.', ['dream', 'nature', 'outdoors']],
  ['lily-pond', 'el estanque', 'Estanque de los Nenúfares', undefined, 'En el estanque flotaban nenúfares con flores rosadas sobre el agua quieta.', ['dream', 'nature', 'water', 'outdoors']],
  ['shooting-star-hill', 'la colina de las estrellas', 'Colina de las Estrellas Fugaces', 'la', 'Sobre la colina, las estrellas fugaces dejaban estelas de luz en el cielo.', ['dream', 'nature', 'outdoors']],
  ['snowy-night-forest', 'el bosque nevado', 'Bosque de la Nieve Callada', undefined, 'Los pinos del bosque nevado dormían bajo una manta blanca y silenciosa.', ['dream', 'nature', 'outdoors']],
  ['moon-boat', 'la barca de la luna', 'Barca de la Luna', 'la', 'La luna creciente flotaba como una barca entre nubes y estrellas.', ['dream', 'sky']],
  ['sunset-beach', 'la playa del atardecer', 'Playa del Atardecer', 'la', 'En la playa, el sol se escondía despacio y pintaba el mar de naranja.', ['dream', 'water', 'outdoors']],
  ['dandelion-garden', 'el jardín de dientes de león', 'Jardín de los Dientes de León', undefined, 'En el jardín, las semillas de los dientes de león flotaban como plumitas.', ['dream', 'nature', 'plants', 'outdoors']],
];
const sceneEntries = [
  ...originalScenes,
  ...sceneSheets.flatMap(([sheet, rows]) => rows.map(([id, label, name, article, detail, tags], index) => [id, label, name, article, sheet, index % 4, Math.floor(index / 4), detail, tags])),
  ...viewOnlyScenes.map(([id, label, name, article, detail, tags]) => [id, label, name, article, sceneViews[id][0].sheet, sceneViews[id][0].x, sceneViews[id][0].y, detail, tags]),
];
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
  ['objects-bedtime', 4, [
    ['pillow', 'almohada', 'la'], ['teddy-bear', 'osito de peluche', 'el'], ['night-lamp', 'lamparita de noche', 'la'], ['toothbrush', 'cepillo de dientes', 'el'],
    ['storybook', 'libro de cuentos', 'el'], ['glass-of-milk', 'vaso de leche', 'el'], ['alarm-clock', 'despertador', 'el'], ['slippers', 'zapatillas', 'las'],
  ]],
  ['objects-party', 4, [
    ['gift-box', 'caja de regalo', 'la'], ['balloon', 'globo', 'el'], ['garland', 'guirnalda de banderines', 'la'], ['letter', 'carta', 'la'],
    ['flower-crown', 'corona de flores', 'la'], ['party-hat', 'sombrero de fiesta', 'el'], ['confetti', 'confeti', 'el'], ['pinata', 'piñata', 'la'],
  ]],
  ['objects-quest', 4, [
    ['treasure-chest', 'cofre del tesoro', 'el'], ['clue-scroll', 'pergamino de pistas', 'el'], ['potion', 'frasco de poción', 'el'], ['ice-flower', 'flor de hielo', 'la'],
    ['fallen-star', 'estrella caída', 'la'], ['moonstone', 'piedra de luna', 'la'], ['hourglass', 'reloj de arena', 'el'], ['signpost', 'señal de camino', 'la'],
  ]],
  ['objects-kitchen', 4, [
    ['birthday-cake', 'tarta de cumpleaños', 'la'], ['cookies', 'galletas', 'las'], ['dough-bowl', 'cuenco con masa', 'el'], ['wooden-spoon', 'cuchara de madera', 'la'],
    ['milk-jug', 'jarra de leche', 'la'], ['bread', 'barra de pan', 'la'], ['soup', 'sopa caliente', 'la'], ['apron', 'delantal', 'el'],
  ]],
  ['objects-sport', 4, [
    ['medal', 'medalla', 'la'], ['trophy', 'trofeo', 'el'], ['finish-flag', 'bandera de meta', 'la'], ['whistle', 'silbato', 'el'],
    ['ball', 'pelota', 'la'], ['jump-rope', 'cuerda de saltar', 'la'], ['scooter', 'patinete', 'el'], ['stopwatch', 'cronómetro', 'el'],
  ]],
  ['objects-memories', 4, [
    ['old-trunk', 'baúl antiguo', 'el'], ['old-photo', 'foto antigua', 'la'], ['spinning-top', 'peonza', 'la'], ['rag-doll', 'muñeca de trapo', 'la'],
    ['marbles', 'canicas', 'las'], ['music-box', 'caja de música', 'la'], ['old-glasses', 'gafas del abuelo', 'las'], ['paper-plane', 'avión de papel', 'el'],
  ]],
  ['objects-firsts', 4, [
    ['bicycle', 'bicicleta', 'la'], ['helmet', 'casco', 'el'], ['lunchbox', 'lonchera', 'la'], ['notebook', 'cuaderno', 'el'],
    ['float-ring', 'flotador', 'el'], ['new-shoes', 'zapatos nuevos', 'los'], ['chalkboard', 'pizarra', 'la'], ['pencil-case', 'estuche', 'el'],
  ]],
  ['objects-calm', 4, [
    ['worry-box', 'caja de las preocupaciones', 'la'], ['smooth-stone', 'piedra lisa', 'la'], ['calm-jar', 'tarro de la calma', 'el'], ['hot-water-bottle', 'bolsa de agua caliente', 'la'],
    ['handkerchief', 'pañuelo', 'el'], ['bandage', 'tirita', 'la'], ['thermometer', 'termómetro', 'el'], ['flowers-in-glass', 'flores en un vaso', 'las'],
  ]],
  ['objects-night-sounds', 4, [
    ['curtain', 'cortina', 'la'], ['dripping-tap', 'grifo que gotea', 'el'], ['cuckoo-clock', 'reloj de cuco', 'el'], ['wind-chime', 'campanilla de viento', 'la'],
    ['window-branch', 'rama de la ventana', 'la'], ['creaky-door', 'puerta que cruje', 'la'], ['dry-leaves', 'hojas secas', 'las'], ['kettle', 'tetera', 'la'],
  ]],
  ['objects-home-tools', 4, [
    ['net', 'red', 'la'], ['bucket', 'cubo', 'el'], ['shovel', 'pala', 'la'], ['wheelbarrow', 'carretilla', 'la'],
    ['broom', 'escoba', 'la'], ['ladder', 'escalera de mano', 'la'], ['sack', 'saco', 'el'], ['cardboard-box', 'caja de cartón', 'la'],
  ]],
];
export const ITEMS = Object.freeze(itemSheets.flatMap(([sheet, columns, rows]) => rows.map(([id, label, article], index) => Object.freeze({
  id, label, article, atlas: Object.freeze({ sheet, x: index % columns, y: Math.floor(index / columns) }), sound: id,
}))));
// Retain the existing engine API while the renderer can use the same records directly.
export const OBJECTS = ITEMS;
export const getScene = id => SCENES.find(scene => scene.id === id);
/** Labels describe the paintings while the three stored view indices remain unchanged. */
export const getSceneViewLabels = id => angleViewSceneIds.has(id) ? SCENE_ANGLE_LABELS : SCENE_VIEW_LABELS;
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
