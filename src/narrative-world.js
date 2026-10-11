import { getScene, getItem } from './world-catalog.js';

/**
 * Narrative roles for the shared catalogue. Stories fill fixed slots (hero, friend,
 * mentor, villain; home, destination; trial, tool, elixir) only with values whose
 * declared abilities, habitats and terrain make the sentence true.
 */

export const cap = text => text[0].toLocaleUpperCase('es') + text.slice(1);
export const low = text => text[0].toLocaleLowerCase('es') + text.slice(1);
// Spanish contracts a + el and de + el; names that start with «El» keep their capital.
const contract = (preposition, phrase) => /^el /u.test(phrase) ? `${preposition === 'a' ? 'al' : 'del'} ${phrase.slice(3)}` : `${preposition} ${phrase}`;
export const toPhrase = phrase => contract('a', phrase);
export const ofPhrase = phrase => contract('de', phrase);
export const placeName = place => `${place.article === 'la' ? 'la' : 'el'} ${place.name}`;
export const toPlace = place => toPhrase(placeName(place));
export const ofPlace = place => ofPhrase(placeName(place));
export const inPlace = place => `en ${placeName(place)}`;
export const thePlace = place => cap(placeName(place));
/** «la zorrita», «el hada». */
export const kind = character => `${character.article} ${character.label}`;
/** «Lila, la zorrita,». Humans have no catalogue label. */
export const named = character => character.kind !== 'human' && character.article ? `${character.name}, ${kind(character)},` : character.name;
export const friendWord = character => character.gender === 'f' ? 'amiga' : 'amigo';

/** The words that name each drawable item; a page only draws an item its sentence names. */
export const ITEM_WORDS = Object.freeze({
  seed: /semilla/iu, bell: /campan/iu, drop: /gota/iu, feather: /pluma/iu, key: /llave/iu,
  umbrella: /paraguas/iu, cloud: /nube/iu, yarn: /ovillo|lana|hilo/iu, blanket: /manta/iu,
  basket: /cesta/iu, flower: /flor|flores|pétalo/iu, boat: /barco|barquito/iu,
  lantern: /farol/iu, compass: /brújula/iu, map: /mapa/iu, telescope: /telescopio/iu,
  'magnifying-glass': /lupa/iu, backpack: /mochila/iu, rope: /cuerda/iu, boots: /bota/iu,
  kite: /cometa/iu, drum: /tambor/iu, flute: /flauta/iu, paintbrush: /pincel/iu,
  crayons: /cray[óo]n/iu, puzzle: /rompecabezas/iu, pinwheel: /molinillo/iu,
  'paper-star': /estrellas? de papel/iu, shell: /concha|caracola/iu, pearl: /perla/iu,
  crystal: /cristal/iu, acorn: /bellota/iu, apple: /manzana/iu, 'honey-jar': /miel|tarrito/iu,
  teacup: /taza/iu, 'watering-can': /regadera/iu,
});
export const namedItems = (text, items) => items.filter(id => ITEM_WORDS[id].test(text));

/** What each catalogue character can do; trials accept only these verbs. */
export const ABILITIES = Object.freeze({
  fox: ['nose'], mouse: ['small'], rabbit: ['jump', 'listen'], bear: ['strong', 'nose'], knight: ['strong'],
  wizard: ['magic', 'glow'], dragon: ['fly', 'strong'], owl: ['fly', 'listen'], squirrel: ['climb', 'small'],
  frog: ['swim', 'jump'], turtle: ['swim'], fairy: ['fly', 'glow'], hedgehog: ['small', 'nose'],
  raccoon: ['climb', 'nose'], deer: ['jump', 'listen'], otter: ['swim'], beaver: ['swim', 'strong'],
  badger: ['nose', 'strong'], wolf: ['nose', 'listen'], lynx: ['climb', 'jump'], lion: ['strong'],
  tiger: ['strong', 'jump'], elephant: ['strong', 'listen'], giraffe: ['tall'], zebra: ['jump'],
  monkey: ['climb'], panda: ['climb', 'strong'], koala: ['climb'], penguin: ['swim'], flamingo: ['fly'],
  parrot: ['fly'], peacock: ['fly'], dolphin: ['swim', 'listen'], seal: ['swim'], octopus: ['swim', 'small'],
  whale: ['swim', 'strong'], unicorn: ['glow', 'jump'], merlin: ['magic', 'glow'], elf: ['listen', 'climb'],
  'good-witch': ['fly', 'magic'], 'wise-elder': ['listen'], princess: ['listen'], king: ['strong'],
  'royal-knight': ['strong'], 'wise-grandmother': ['listen'], goblin: ['small', 'climb'], gnome: ['small', 'nose'],
  mermaid: ['swim'], phoenix: ['fly', 'glow'], yeti: ['strong'], pegasus: ['fly'], 'tree-spirit': ['tall', 'magic'],
});

export const ABILITY_REASONS = Object.freeze({
  fly: 'sabía volar', swim: 'nadaba muy bien', climb: 'trepaba muy bien', strong: 'tenía mucha fuerza',
  small: 'cabía por cualquier rendija', tall: 'llegaba muy alto', jump: 'saltaba muy lejos',
  nose: 'tenía muy buen olfato', listen: 'tenía muy buen oído', glow: 'sabía encender una luz mágica',
  magic: 'sabía hacer magia',
});

/** Sea creatures cannot walk to a hill: their stories happen by and under the water. */
export const AQUATIC = Object.freeze(['dolphin', 'whale', 'mermaid', 'octopus']);
export const WATER_PLACES = Object.freeze(['beach', 'harbor', 'lake', 'river', 'waterfall', 'mangrove', 'coral-reef', 'underwater-palace']);
export const isAquatic = character => AQUATIC.includes(character?.id);
export const needsWater = cast => cast.some(isAquatic);
export const fitsCast = (cast, placeId) => !needsWater(cast) || WATER_PLACES.includes(placeId);

/**
 * Where a hidden thing rests («junto al roble más viejo» + «del Bosque…»), how one travels
 * there, which trials its terrain allows, and whether its illustration is a night scene.
 */
export const PLACE_INFO = Object.freeze({
  forest: { spot: 'junto al roble más viejo', travel: 'walk', trials: ['fog', 'brambles', 'night', 'crossing', 'rain'] },
  lake: { spot: 'entre los juncos de la orilla', travel: 'walk', trials: ['fog', 'night', 'crossing'], night: true },
  castle: { spot: 'en la sala más alta', travel: 'walk', trials: ['locked-door', 'height', 'dark-tunnel', 'maze'] },
  garden: { spot: 'debajo del rosal más grande', travel: 'walk', trials: ['brambles', 'maze'] },
  beach: { spot: 'detrás de las rocas', travel: 'walk', trials: ['wind', 'crossing'] },
  mountain: { spot: 'en la cima', travel: 'walk', trials: ['chasm', 'wind', 'fog', 'height', 'ice'] },
  treehouse: { spot: 'en la rama más alta', travel: 'walk', trials: ['height', 'brambles'] },
  village: { spot: 'junto a la fuente', travel: 'walk', trials: ['maze', 'night', 'locked-door'] },
  meadow: { spot: 'entre las flores más altas', travel: 'walk', trials: ['fog', 'crossing', 'brambles', 'rain'] },
  cave: { spot: 'en el rincón más profundo', travel: 'walk', trials: ['dark-tunnel', 'maze', 'chasm'] },
  river: { spot: 'junto a la piedra más redonda', travel: 'walk', trials: ['crossing', 'current', 'fog'] },
  clouds: { spot: 'en la nube más blanda', travel: 'sky', trials: ['fog', 'wind', 'maze'] },
  waterfall: { spot: 'detrás de la cortina de agua', travel: 'walk', trials: ['crossing', 'height', 'fog'] },
  'bamboo-grove': { spot: 'junto al tallo más alto', travel: 'walk', trials: ['maze', 'wind', 'fog', 'rain'] },
  'desert-oasis': { spot: 'bajo la palmera más vieja', travel: 'walk', trials: ['desert', 'wind', 'night'] },
  'snowy-valley': { spot: 'bajo un montón de nieve brillante', travel: 'walk', trials: ['ice', 'wind', 'fog', 'chasm'] },
  'flower-field': { spot: 'en el centro', travel: 'walk', trials: ['maze', 'brambles', 'rain'] },
  mangrove: { spot: 'entre las raíces más enredadas', travel: 'walk', trials: ['crossing', 'maze', 'fog'] },
  'coral-reef': { spot: 'dentro del coral más grande', travel: 'underwater', trials: ['current', 'maze', 'dark-tunnel'] },
  'mushroom-grove': { spot: 'bajo el hongo más grande', travel: 'walk', trials: ['maze', 'fog', 'night', 'brambles', 'rain'] },
  library: { spot: 'en el estante más alto', travel: 'town', trials: ['maze', 'height', 'locked-door'] },
  bakery: { spot: 'junto al horno', travel: 'town', trials: ['locked-door'] },
  workshop: { spot: 'en la caja más pequeña', travel: 'town', trials: ['locked-door', 'maze'] },
  greenhouse: { spot: 'entre las macetas del fondo', travel: 'town', trials: ['maze', 'brambles', 'locked-door'] },
  playground: { spot: 'debajo del tobogán', travel: 'town', trials: ['maze'] },
  orchard: { spot: 'en el manzano más viejo', travel: 'walk', trials: ['brambles', 'maze'] },
  windmill: { spot: 'en lo alto', travel: 'walk', trials: ['wind', 'height', 'locked-door'] },
  harbor: { spot: 'en el muelle más pequeño', travel: 'walk', trials: ['crossing', 'fog', 'wind'] },
  'crystal-cave': { spot: 'junto al cristal más grande', travel: 'walk', trials: ['dark-tunnel', 'maze', 'chasm'] },
  'floating-island': { spot: 'en el borde más alto', travel: 'sky', trials: ['chasm', 'wind', 'height'] },
  'enchanted-tower': { spot: 'en la ventana más alta', travel: 'walk', trials: ['locked-door', 'height', 'dark-tunnel', 'maze'] },
  'star-observatory': { spot: 'junto al gran telescopio', travel: 'walk', trials: ['height', 'locked-door', 'night'], night: true },
  'moon-garden': { spot: 'bajo la flor más plateada', travel: 'sky', trials: ['maze', 'night', 'fog'], night: true },
  'rainbow-bridge': { spot: 'en el centro', travel: 'walk', trials: ['wind', 'fog'] },
  'underwater-palace': { spot: 'en la sala de las burbujas', travel: 'underwater', trials: ['current', 'locked-door', 'maze', 'dark-tunnel'] },
  'giant-tree': { spot: 'en un hueco del tronco', travel: 'walk', trials: ['height', 'maze', 'dark-tunnel', 'brambles'] },
});

/** «junto al roble más viejo del Bosque de las Campanillas». */
export const spotOf = place => `${PLACE_INFO[place.id].spot} ${ofPlace(place)}`;

/** A journey sentence that is true for this cast and this kind of place. */
export function travelTo(place, cast, names) {
  const travel = PLACE_INFO[place.id].travel;
  if (travel === 'underwater') return `${names} entraron en una burbuja de aire mágico y bajaron ${toPlace(place)}.`;
  if (travel === 'sky') return `${names} subieron por una escalera de nubes hasta llegar ${toPlace(place)}.`;
  if (needsWater(cast)) return `${names} viajaron por el agua hasta llegar ${toPlace(place)}.`;
  if (travel === 'town') return `${names} cruzaron el pueblo hasta llegar ${toPlace(place)}.`;
  return `${names} caminaron un largo rato hasta llegar ${toPlace(place)}.`;
}

/** A short outing for one character: «fue al prado», «bajó al arrecife en una burbuja de aire mágico». */
export function goesTo(place, cast) {
  const travel = PLACE_INFO[place.id].travel;
  if (travel === 'underwater' && !cast.every(isAquatic)) return `bajó ${toPlace(place)} en una burbuja de aire mágico`;
  if (travel === 'sky') return `subió ${toPlace(place)} por una escalera de nubes`;
  return `fue ${toPlace(place)}`;
}

/** Gifts that solve a trial. The mentor gives one before the journey. */
export const TOOLS = Object.freeze({
  rope: { item: 'rope', indefinite: 'una cuerda larga', definite: 'la cuerda' },
  boat: { item: 'boat', indefinite: 'un barquito', definite: 'el barquito' },
  boots: { item: 'boots', indefinite: 'unas botas altas', definite: 'las botas' },
  compass: { item: 'compass', indefinite: 'una brújula', definite: 'la brújula' },
  map: { item: 'map', indefinite: 'un mapa mágico', definite: 'el mapa' },
  yarn: { item: 'yarn', indefinite: 'un ovillo de lana', definite: 'el ovillo' },
  key: { item: 'key', indefinite: 'una llave antigua', definite: 'la llave' },
  lantern: { item: 'lantern', indefinite: 'un farol', definite: 'el farol' },
  telescope: { item: 'telescope', indefinite: 'un telescopio', definite: 'el telescopio' },
  umbrella: { item: 'umbrella', indefinite: 'un paraguas grande', definite: 'el paraguas' },
});

/**
 * Each trial is an obstacle the terrain can really produce. `tools` are what a mentor
 * can give; `abilities` are what a companion can do instead. Both end the same trial.
 */
export const TRIALS = Object.freeze({
  crossing: {
    intro: 'Un agua ancha y fría cortaba el camino hacia la otra orilla.',
    purpose: 'cruzar el agua ancha del camino',
    after: 'Al otro lado, el sendero seguía entre piedras redondas.',
    tools: { rope: 'Ataron la cuerda de orilla a orilla y cruzaron agarrados a ella.', boat: 'Subieron al barquito y remaron despacio hasta la otra orilla.' },
    abilities: {
      swim: name => `${name} nadó delante y encontró las piedras donde el agua era bajita.`,
      fly: name => `${name} voló sobre el agua y descubrió un puente de piedras un poco más allá.`,
      strong: name => `${name} empujó un tronco caído hasta unir las dos orillas.`,
      jump: name => `${name} saltó de piedra en piedra y les enseñó dónde pisar.`,
      tall: name => `${name} se estiró muchísimo y vio un puente de piedras más adelante.`,
    },
  },
  current: {
    intro: 'Una corriente muy fuerte empujaba hacia atrás y no los dejaba avanzar.',
    purpose: 'avanzar contra la corriente',
    after: 'Más allá, el agua estaba tranquila y transparente.',
    tools: { rope: 'Se ataron con la cuerda y avanzaron juntos sin que la corriente los separara.' },
    abilities: {
      swim: name => `${name} nadó delante y les abrió paso por el agua más tranquila.`,
      strong: name => `${name} se puso delante y frenó la corriente para que los demás pasaran.`,
      small: name => `${name} encontró un pasadizo entre las rocas donde no llegaba la corriente.`,
    },
  },
  chasm: {
    intro: 'Una grieta muy profunda partía el camino en dos.',
    purpose: 'pasar al otro lado de la grieta',
    after: 'Al otro lado, el camino seguía firme y seguro.',
    tools: { rope: 'Engancharon la cuerda en una roca del otro lado y pasaron agarrados a ella.' },
    abilities: {
      fly: name => `${name} voló al otro lado y encontró un puente viejo escondido entre las rocas.`,
      jump: name => `${name} saltó al otro lado y empujó una tabla larga para hacer un puente.`,
      strong: name => `${name} arrastró un tronco largo y lo colocó sobre la grieta como un puente.`,
      tall: name => `${name} se estiró muchísimo y vio que la grieta era más estrecha un poco más allá.`,
      climb: name => `${name} bajó trepando por las rocas y encontró un paso seguro.`,
      magic: name => `${name} hizo aparecer un puente de luz sobre la grieta.`,
    },
  },
  height: {
    intro: 'El camino seguía hacia arriba, demasiado alto para subir.',
    purpose: 'subir el tramo más alto',
    after: 'Desde arriba se veía todo pequeñito y precioso.',
    tools: { rope: 'Lanzaron la cuerda, la engancharon arriba y subieron paso a paso.' },
    abilities: {
      climb: name => `${name} trepó hasta arriba y les tendió una mano para subir.`,
      fly: name => `${name} voló hasta arriba y encontró una escalera escondida.`,
      tall: name => `${name} se estiró muchísimo y ayudó a los demás a llegar arriba.`,
      magic: name => `${name} hizo aparecer una escalera de luz.`,
      jump: name => `${name} saltó de saliente en saliente y les enseñó el camino.`,
    },
  },
  wind: {
    intro: 'Un viento fortísimo soplaba de frente y casi no los dejaba avanzar.',
    purpose: 'avanzar juntos contra el viento',
    after: 'Poco a poco, el viento se fue calmando.',
    tools: { rope: 'Se ataron con la cuerda y avanzaron juntos, paso a paso.', boots: 'Se pusieron las botas, pisaron fuerte y el viento ya no pudo empujarlos.' },
    abilities: {
      strong: name => `${name} caminó delante y los demás avanzaron protegidos detrás.`,
      small: name => `${name} encontró un pasadizo bajito donde el viento no llegaba.`,
      magic: name => `${name} pidió con palabras mágicas que el viento soplara más despacio.`,
    },
  },
  ice: {
    intro: 'El suelo se volvió de hielo y resbalaba a cada paso.',
    purpose: 'caminar sobre el hielo sin resbalar',
    after: 'Pronto, el hielo dio paso a la nieve blandita.',
    tools: { boots: 'Se pusieron las botas y caminaron sobre el hielo sin resbalar.' },
    abilities: {
      climb: name => `${name} clavó con cuidado sus uñas en el hielo y abrió un caminito seguro.`,
      strong: name => `${name} rompió el hielo con fuerza y dejó un camino de nieve blandita.`,
      magic: name => `${name} derritió un caminito con un hechizo tibio.`,
    },
  },
  fog: {
    intro: 'Una niebla espesa lo tapó todo, y ya no se veía el camino.',
    purpose: 'no perderse en la niebla',
    after: 'Al rato, la niebla se deshizo como un algodón.',
    tools: { compass: 'Siguieron la aguja de la brújula y no se perdieron en la niebla.' },
    abilities: {
      fly: name => `${name} voló por encima de la niebla y les fue indicando el camino.`,
      nose: name => `${name} olfateó el aire y siguió el rastro del camino.`,
      listen: name => `${name} escuchó el eco de sus voces y supo hacia dónde ir.`,
      glow: name => `${name} encendió una luz mágica que atravesó la niebla.`,
    },
  },
  maze: {
    intro: 'El camino se dividía en muchos senderos que parecían iguales.',
    purpose: 'encontrar el sendero correcto',
    after: 'Por fin dejaron atrás aquel laberinto de senderos.',
    tools: { map: 'Siguieron el mapa curva a curva hasta encontrar la salida.', yarn: 'Ataron el ovillo a la entrada y lo soltaron poco a poco para no perderse.' },
    abilities: {
      fly: name => `${name} voló por encima y vio la salida desde arriba.`,
      climb: name => `${name} trepó a lo más alto y señaló el camino correcto.`,
      tall: name => `${name} se estiró muchísimo y vio la salida por encima de todo.`,
      nose: name => `${name} siguió el olor del aire fresco hasta la salida.`,
    },
  },
  'locked-door': {
    intro: 'Una puerta grande y cerrada les cortaba el paso.',
    purpose: 'abrir la puerta cerrada del camino',
    after: 'Detrás de la puerta, el camino continuaba.',
    tools: { key: 'Metieron la llave en la cerradura, y la puerta se abrió con un clic.' },
    abilities: {
      small: name => `${name} se metió por una rendija y abrió el cerrojo desde dentro.`,
      magic: name => `${name} dijo unas palabras mágicas, y la puerta se abrió despacio.`,
    },
  },
  'dark-tunnel': {
    intro: 'El camino seguía por un pasadizo tan oscuro que no se veía nada.',
    purpose: 'cruzar el pasadizo oscuro',
    after: 'Al final del pasadizo, volvió a verse la luz.',
    tools: { lantern: 'Encendieron el farol, y su luz les mostró el pasadizo.' },
    abilities: {
      glow: name => `${name} hizo brillar una luz suave, y el pasadizo se iluminó.`,
      listen: name => `${name} escuchó el eco y supo dónde estaba la salida.`,
      nose: name => `${name} olfateó el aire fresco que venía de la salida.`,
    },
  },
  night: {
    intro: 'De pronto se hizo de noche, y ya no se distinguía el sendero.',
    purpose: 'ver el sendero cuando llegara la noche',
    after: 'Así llegaron sin tropezar al final del sendero.',
    tools: { lantern: 'Encendieron el farol, y su luz les mostró el sendero.' },
    abilities: {
      glow: name => `${name} hizo brillar una luz suave, y el sendero se iluminó.`,
      listen: name => `${name} escuchó los ruidos de la noche y supo por dónde seguir.`,
      nose: name => `${name} olfateó el sendero y los guio paso a paso.`,
    },
  },
  brambles: {
    intro: 'Unas zarzas llenas de espinas cerraban el sendero de lado a lado.',
    purpose: 'pasar entre las zarzas sin pincharse',
    after: 'Al otro lado, no quedaba ni una espina.',
    tools: { boots: 'Se pusieron las botas altas y pasaron entre las zarzas sin pincharse.' },
    abilities: {
      small: name => `${name} encontró un túnel por debajo de las zarzas.`,
      climb: name => `${name} trepó a lo alto y vio un camino sin espinas.`,
      fly: name => `${name} voló por encima y encontró un paso sin espinas.`,
      magic: name => `${name} pidió permiso a las zarzas, y ellas se apartaron.`,
    },
  },
  rain: {
    intro: 'Empezó a llover tanto que el camino se llenó de charcos.',
    purpose: 'seguir el camino aunque lloviera mucho',
    after: 'Al rato, la lluvia paró y salió un arcoíris.',
    tools: { umbrella: 'Abrieron el paraguas y siguieron caminando juntos sin mojarse.' },
    abilities: {
      magic: name => `${name} hizo aparecer un techo de luz sobre sus cabezas.`,
      tall: name => `${name} se estiró muchísimo y tapó a todos como un tejado.`,
      jump: name => `${name} saltó de piedra en piedra y les enseñó un camino sin charcos.`,
    },
  },
  desert: {
    intro: 'La arena era igual por todas partes, y no había ningún camino.',
    purpose: 'no perderse en la arena',
    after: 'Por fin vieron las palmeras del oasis.',
    tools: { compass: 'Siguieron la aguja de la brújula sin desviarse ni un poco.', telescope: 'Miraron por el telescopio y descubrieron las palmeras a lo lejos.' },
    abilities: {
      tall: name => `${name} se estiró muchísimo y vio las palmeras a lo lejos.`,
      fly: name => `${name} voló muy alto y vio el oasis a lo lejos.`,
      nose: name => `${name} olfateó el aire húmedo y encontró el camino del agua.`,
    },
  },
});

/** The first ability of a character that can solve this trial, if any. */
export const abilityFor = (character, trialId) => (ABILITIES[character.id] || []).find(ability => Object.hasOwn(TRIALS[trialId].abilities, ability));

// Fail fast if an authored reference points to a missing illustration.
for (const [id, info] of Object.entries(PLACE_INFO)) {
  if (!getScene(id)) throw new Error(`Unknown place ${id}`);
  for (const trial of info.trials) if (!TRIALS[trial]) throw new Error(`Unknown trial ${trial}`);
}
for (const tool of Object.values(TOOLS)) if (!getItem(tool.item)) throw new Error(`Unknown tool ${tool.item}`);
