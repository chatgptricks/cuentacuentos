import { getScene } from './world-catalog.js';
import {
  ABILITIES, PLACE_INFO, TOOLS, TRIALS, cap, fitsCast, friendWord, inPlace, kind, low, named,
  needsWater, ofPhrase, placeName, spotOf, toPlace, travelTo,
} from './narrative-world.js';
import { ADVENTURE_MENTORS, ELIXIRS } from './quest-catalog.js';
import { abilityTrial, at, choose, copyCharacter, copySupporting, gendered, planFor, sayer, solveTrial, trialReason, unfold } from './story-kit.js';

/** Hero homes where neighbors live and a problem can affect everyone. */
const HOMES = ['garden', 'meadow', 'orchard', 'treehouse', 'village', 'playground', 'harbor', 'windmill', 'beach', 'farm'];
const homesFor = cast => HOMES.filter(id => fitsCast(cast, id));
const pronoun = character => gendered(character, 'lo', 'la');

/** A1 · El elixir: problem at home, a mentor's gift, two trials, the elixir and the return. */
function elixir({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const placesFor = (candidate, home) => candidate.places.filter(id => id !== home && fitsCast(cast, id));
  const homesOf = candidate => candidate.homes.filter(id => fitsCast(cast, id) && placesFor(candidate, id).length);
  const potion = choose(random, ELIXIRS.filter(candidate => homesOf(candidate).length));
  const home = getScene(choose(random, homesOf(potion)));
  const place = getScene(choose(random, placesFor(potion, home.id)));
  const mentor = copyCharacter(random, choose(random, ADVENTURE_MENTORS.filter(id => id !== h.id && id !== f.id)));
  // The second trial is chosen first, so the friend's own ability can solve it when possible.
  const trials = PLACE_INFO[place.id].trials;
  const second = abilityTrial(random, trials, [f, h]);
  const firstId = choose(random, trials.filter(id => id !== second.id));
  const first = TRIALS[firstId];
  const toolId = choose(random, Object.keys(first.tools));
  const tool = TOOLS[toolId];
  const item = potion.item;
  const both = [h.id, f.id];
  const atHome = at(home.id), there = at(place.id);
  const pair = `${h.name} y ${f.name}`;
  const { helper } = second;
  const thanks = helper === f ? `${h.name} abrazó a ${f.name} para darle las gracias.`
    : helper === h ? `${f.name} aplaudió la buena idea de ${h.name}.` : 'Se abrazaron, contentos de haberlo conseguido juntos.';
  const gratitude = helper === f ? `${h.name} le dio las gracias a ${f.name}, porque sin su ayuda no lo habría logrado.`
    : helper === h ? `${f.name} le dijo a ${h.name} que su idea los había salvado.` : `${pair} se dieron las gracias por no rendirse.`;
  const use = typeof potion.use === 'function' ? potion.use(home) : potion.use;
  const beats = [
    [
      atHome(1, `${named(h)} vivía ${inPlace(home)}.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, `Cada mañana, ${h.name} saludaba a sus vecinos y les preguntaba cómo estaban.`, [h.id]),
      atHome(1, potion.problem(home)),
      atHome(2, potion.stakes),
      atHome(3, 'Los vecinos se reunieron preocupados, pero nadie sabía qué hacer.'),
      atHome(2, `Su ${friendWord(f)} ${named(f)} también quería ayudar.`, [f.id]),
      atHome(3, `${h.name} pensó y pensó, pero no sabía por dónde empezar.`, [h.id]),
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} fueron a pedir consejo a ${mentor.name}, ${kind(mentor)} que vivía cerca.`, [h.id, f.id, mentor.id]),
    ],
    [
      atHome(1, `${mentor.name} escuchó con atención y les explicó que ${potion.hint}.`, [mentor.id, ...both], [item]),
      there(1, `${cap(potion.name)} se escondía ${spotOf(place)}.`, [], [item]),
      atHome(2, `Pero ${mentor.name} les advirtió algo importante: ${potion.condition}.`, [mentor.id], [item]),
      atHome(2, 'El viaje sería largo y seguramente tendría alguna sorpresa.', both),
      atHome(1, `${mentor.name} les regaló ${tool.indefinite} para ${first.purpose}.`, [mentor.id, ...both], [tool.item]),
      atHome(3, `${h.name} guardó ${tool.definite} con mucho cuidado.`, [h.id], [tool.item]),
      atHome(3, `${f.name} preparó una mochila con agua y una merienda para el viaje.`, [f.id], ['backpack']),
      atHome(3, `${mentor.name} les dio un abrazo antes de que se fueran.`, [mentor.id, ...both]),
      atHome(2, 'Se despidieron de los vecinos y salieron muy temprano.', both),
    ],
    [
      there(1, travelTo(place, cast, pair), both),
      there(2, place.detail),
      there(3, `${f.name} miró a su alrededor con los ojos muy abiertos.`, [f.id]),
      there(1, first.intro),
      there(2, `Daba un poco de miedo, pero entonces recordaron el regalo de ${mentor.name}.`, both),
      there(3, `${h.name} sacó ${tool.definite} y respiró hondo.`, [h.id], [tool.item]),
      there(1, first.tools[toolId], both, [tool.item]),
      there(2, first.after),
      there(3, `${f.name} sonrió, porque el regalo de ${mentor.name} había funcionado.`, [f.id]),
    ],
    [
      there(1, `Más adelante, ${low(TRIALS[second.id].intro)}`),
      there(3, 'Esta vez no tenían ningún regalo que les sirviera.', both),
      there(2, trialReason(second), helper ? [helper.id] : both),
      there(1, solveTrial(second, pair), helper ? [helper.id] : both),
      there(2, thanks, both),
      there(3, TRIALS[second.id].after),
      there(1, `Por fin encontraron ${potion.name}, justo donde había dicho ${mentor.name}.`, both, [item]),
      there(3, potion.look, [], [item]),
      there(2, `Recordaron lo que había dicho ${mentor.name}: ${potion.condition}.`, both, [item]),
    ],
    [
      there(1, `${h.name} ${potion.earn(f)}, y ${potion.accept}.`, [h.id], [item]),
      there(3, `${f.name} aplaudió de alegría al verlo.`, [f.id]),
      there(2, `Guardaron ${potion.name} con cuidado y emprendieron el regreso.`, both, [item]),
      there(2, potion.magic, both, [item]),
      atHome(1, `Después de un largo camino, ${pair} volvieron ${toPlace(home)}.`, both, [item]),
      atHome(3, 'Los vecinos salieron a recibirlos con mucha curiosidad.'),
      atHome(2, `${mentor.name} los esperaba con una gran sonrisa.`, [mentor.id]),
      atHome(3, `${h.name} contó todo lo que había pasado en el viaje.`, [h.id, mentor.id]),
      atHome(1, use, both, [item]),
    ],
    [
      atHome(1, potion.result, both, [item]),
      atHome(2, potion.result2),
      atHome(3, potion.epilogue || 'Esa tarde, los vecinos prepararon una fiesta para celebrarlo.', both),
      atHome(2, `${mentor.name} les dijo que habían sido muy valientes.`, [mentor.id, ...both]),
      atHome(3, gratitude, both),
      atHome(1, `${h.name} aprendió que ${potion.lesson}.`, [h.id]),
      atHome(3, `Esa noche, ${h.name} se durmió pensando en su gran aventura.`, [h.id]),
      atHome(2, `Desde entonces, ${pair} fueron todavía más amigos.`, both),
      atHome(1, potion.ending),
    ],
  ];
  return {
    title: `${h.name} y ${potion.name}`, place, mentor, questId: potion.id, variantId: firstId, beats, items: [item, tool.item],
    blockIds: { opening: home.id, goal: potion.id, obstacle: firstId, strategy: toolId, discovery: second.id, ending: mentor.id },
    roles: { home: home.id, destination: place.id, mentor: mentor.id, helper: helper?.id ?? null, ability: second.ability ?? null },
  };
}

/** Lost babies: who misses them, where they wander, the trail they leave and, for sea babies, the shore they live by. */
const LOST = [
  { id: 'chick', parent: 'hen', trail: 'unas plumitas amarillas', cry: 'que piaba muy bajito', places: ['forest', 'meadow', 'flower-field', 'orchard', 'mushroom-grove', 'crossroads'] },
  { id: 'duckling', parentName: 'mamá pata', trail: 'unas huellas de patitas en el barro', cry: 'que hacía cuac muy bajito', places: ['swamp', 'lake', 'river', 'mangrove'] },
  { id: 'fawn', parent: 'deer', trail: 'unas huellas pequeñas de pezuña', cry: 'que llamaba a su mamá', places: ['forest', 'meadow', 'bamboo-grove', 'crossroads', 'canyon'] },
  { id: 'bear-cub', parent: 'bear', trail: 'un rastro de gotitas de miel', cry: 'que gruñía bajito', places: ['forest', 'mountain', 'giant-tree', 'waterfall', 'cave'] },
  { id: 'foal', parent: 'pony', trail: 'unas huellas de herradura pequeñitas', cry: 'que relinchaba bajito', places: ['meadow', 'crossroads', 'canyon', 'lookout-hill', 'flower-field'] },
  { id: 'penguin-chick', parent: 'penguin', trail: 'unas huellas en forma de flecha', cry: 'que temblaba de frío', places: ['snowy-valley', 'mountain'], homes: ['beach', 'harbor'] },
  { id: 'sea-turtle-hatchling', parent: 'turtle', trail: 'un surco pequeñito en la arena', cry: 'que movía sus aletas muy despacio', places: ['beach', 'lighthouse-cliff', 'mangrove'], homes: ['beach', 'harbor'] },
  { id: 'seal-pup', parent: 'seal', trail: 'un rastro mojado sobre las rocas', cry: 'que llamaba a su mamá', places: ['beach', 'lighthouse-cliff', 'harbor'], homes: ['beach', 'harbor'] },
];

/** A2 · El rescate: a parent asks for help, the pair follows a trail and brings the baby home. */
function rescue({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const homesOf = lost => homesFor(cast).filter(id => !lost.homes || lost.homes.includes(id));
  const options = LOST.filter(lost => lost.parent !== h.id && lost.parent !== f.id &&
    lost.places.some(id => fitsCast(cast, id) && PLACE_INFO[id].trials.length >= 2) && homesOf(lost).some(home => !lost.places.includes(home)));
  const lost = choose(random, options);
  const baby = copySupporting(random, lost.id);
  const parent = lost.parent ? copyCharacter(random, lost.parent) : null;
  const parentName = parent ? parent.name : lost.parentName;
  const parentIds = parent ? [parent.id] : [];
  const home = getScene(choose(random, homesOf(lost).filter(id => !lost.places.includes(id))));
  const place = getScene(choose(random, lost.places.filter(id => id !== home.id && fitsCast(cast, id) && PLACE_INFO[id].trials.length >= 2)));
  const trials = PLACE_INFO[place.id].trials;
  const second = abilityTrial(random, trials, [f, h]);
  const firstId = choose(random, trials.filter(id => id !== second.id));
  const toolId = choose(random, Object.keys(TRIALS[firstId].tools));
  const tool = TOOLS[toolId];
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const it = pronoun(baby);
  const scared = gendered(baby, 'asustado', 'asustada');
  const atHome = at(home.id), there = at(place.id);
  const { helper } = second;
  const beats = [
    [
      atHome(1, `${named(h)} jugaba con su ${friendWord(f)} ${f.name} ${inPlace(home)}.`, both),
      atHome(2, home.detail),
      atHome(3, 'Era una mañana tranquila, de esas en las que nunca pasa nada.'),
      atHome(1, `De pronto llegó ${parentName}: su ${baby.label} ${baby.name} se había perdido.`, parentIds),
      atHome(3, `${cap(parentName)} ${it} había buscado por todas partes, sin encontrar${it}.`, parentIds),
      atHome(2, `${baby.name} todavía era muy pequeño y no conocía bien el camino.`.replace('pequeño', gendered(baby, 'pequeño', 'pequeña'))),
      atHome(3, `${f.name} vio que ${parentName} temblaba de preocupación.`, [f.id, ...parentIds]),
      atHome(2, `${h.name} le prometió que harían todo lo posible por encontrar${it}.`, [h.id, ...parentIds]),
      atHome(1, `${pair} decidieron salir a buscar${it} enseguida.`, both),
    ],
    [
      atHome(1, `${cap(parentName)} les dio ${tool.indefinite} para ${TRIALS[firstId].purpose}.`, [...parentIds, ...both], [tool.item]),
      atHome(2, `Les contó que ${baby.name} se había alejado hacia ${placeName(place)}.`, parentIds),
      atHome(3, `${f.name} preparó una mochila con agua y algo de comer.`, [f.id], ['backpack']),
      there(1, travelTo(place, cast, pair), both),
      there(2, place.detail),
      there(3, `Llamaron a ${baby.name} muchas veces, pero nadie respondió.`, both),
      there(1, `Entonces ${h.name} encontró ${lost.trail}.`, [h.id]),
      there(2, `Era el rastro de ${baby.name}, y se alejaba por el sendero.`, both),
      there(3, 'Lo siguieron con mucho cuidado para no borrarlo.', both),
    ],
    [
      there(1, TRIALS[firstId].intro),
      there(2, 'El rastro seguía al otro lado, así que no podían rendirse.', both),
      there(3, `${h.name} sacó ${tool.definite} con cuidado.`, [h.id], [tool.item]),
      there(1, TRIALS[firstId].tools[toolId], both, [tool.item]),
      there(2, TRIALS[firstId].after),
      there(3, `${f.name} encontró otra marca del rastro y sonrió.`, [f.id]),
      there(2, `Por suerte, ${parentName} les había dado justo lo que necesitaban.`, both),
      there(3, 'Se dieron la mano y siguieron adelante.', both),
      there(1, `Al otro lado, el rastro de ${baby.name} continuaba.`, both),
    ],
    [
      there(1, `De pronto oyeron a ${baby.name}, ${lost.cry}.`, [baby.id]),
      there(2, `Estaba ${scared} y no se atrevía a moverse.`, [baby.id]),
      there(3, `${h.name} le habló con voz suave para tranquilizar${it}.`, [h.id, baby.id]),
      there(1, `Pero ${low(TRIALS[second.id].intro)}`),
      there(2, trialReason(second), helper ? [helper.id] : both),
      there(1, solveTrial(second, pair), helper ? [helper.id] : both),
      there(3, `${baby.name} dejó de llorar al verlos llegar.`, [baby.id, ...both]),
      there(2, helper === f ? `${h.name} abrazó a ${f.name} para darle las gracias.` : 'Se abrazaron, contentos de haberlo conseguido.', both),
      there(3, TRIALS[second.id].after),
    ],
    [
      there(1, `${f.name} abrazó a ${baby.name} hasta que dejó de temblar.`, [f.id, baby.id]),
      there(2, `${baby.name} tenía hambre, así que compartieron la merienda.`, [baby.id, ...both]),
      there(3, 'Ya no tenía miedo, porque no estaba solo.'.replace('solo', gendered(baby, 'solo', 'sola')), [baby.id]),
      there(1, `${pair} guiaron a ${baby.name} de vuelta, paso a paso.`, [...both, baby.id]),
      there(2, `Por el camino, ${baby.name} no se separó de ellos ni un momento.`, [baby.id]),
      there(3, `${f.name} cantó una canción para que el camino se hiciera más corto.`, [f.id]),
      atHome(3, 'El sol empezaba a bajar cuando vieron las casas a lo lejos.'),
      atHome(2, 'Esta vez sabían exactamente por dónde volver.', both),
      atHome(1, `Por fin, llegaron ${toPlace(home)} con ${baby.name}.`, [...both, baby.id]),
    ],
    [
      atHome(1, `${cap(parentName)} corrió a abrazar a ${baby.name}, llorando de alegría.`, [...parentIds, baby.id]),
      atHome(2, `${cap(parentName)} les dio las gracias muchas veces.`, [...parentIds, ...both]),
      atHome(3, `${baby.name} no paraba de dar saltitos de alegría.`, [baby.id]),
      atHome(1, 'Esa tarde, todos merendaron juntos para celebrarlo.', [...both, baby.id]),
      atHome(2, helper === f ? `${h.name} contó que ${f.name} había sido muy valiente en el camino.` : `${f.name} contó que ${h.name} había sido muy valiente en el camino.`, both),
      atHome(3, `${baby.name} se quedó dormido en el regazo de ${parentName}.`.replace('dormido', gendered(baby, 'dormido', 'dormida')), [baby.id, ...parentIds]),
      atHome(1, `${h.name} aprendió que ayudar a quien lo necesita nos hace más fuertes a todos.`, [h.id]),
      atHome(2, `Desde entonces, ${baby.name} visitaba a ${pair} cada semana.`, [baby.id, ...both]),
      atHome(3, `Y cada vez que veían ${lost.trail}, se acordaban de aquel día.`, both),
    ],
  ];
  return {
    title: `${h.name} y ${gendered(baby, 'el', 'la')} ${baby.label} perdid${gendered(baby, 'o', 'a')}`,
    place, extras: [...(parent ? [parent] : []), baby], questId: lost.id, variantId: firstId, beats, items: [tool.item, 'backpack'],
    blockIds: { opening: home.id, goal: lost.id, obstacle: firstId, strategy: toolId, discovery: second.id, ending: home.id },
    roles: { home: home.id, destination: place.id, lost: baby.id, parent: parent?.id ?? null, helper: helper?.id ?? null, ability: second.ability ?? null },
  };
}

/** Places a clue can describe without naming them. */
const RIDDLES = {
  forest: 'donde los árboles más viejos susurran', lake: 'donde la luna se mira en el agua', meadow: 'donde las mariposas visitan la hierba',
  river: 'donde el agua canta entre piedras redondas', waterfall: 'donde el agua cae riendo', mountain: 'donde el eco responde a los saludos',
  'bamboo-grove': 'donde los tallos hacen música con la brisa', 'flower-field': 'donde crecen mil flores', 'mushroom-grove': 'donde los hongos parecen sombrillas',
  orchard: 'donde maduran las manzanas', windmill: 'donde unas aspas giran con el viento', crossroads: 'donde cuatro caminos se encuentran',
  'rope-bridge': 'donde un puente se mece sobre el río', 'lighthouse-cliff': 'donde un faro vigila el mar', canyon: 'donde las rocas son rojas como el atardecer',
  'lookout-hill': 'desde donde se ve todo el valle', 'giant-tree': 'donde un árbol guarda mil recuerdos', beach: 'donde las olas dejan conchitas',
};
const TREASURES = [
  { item: 'seed', inside: 'cientos de semillas de flores', share: 'Repartieron las semillas, y pronto todo el pueblo se llenó de flores.' },
  { item: 'storybook', inside: 'libros de cuentos antiguos con dibujos preciosos', share: 'Llevaron los libros a la biblioteca para que todos pudieran leerlos.' },
  { item: 'marbles', inside: 'canicas de todos los colores', share: 'Repartieron las canicas y jugaron con todos los vecinos.' },
  { item: 'music-box', inside: 'una caja de música con una canción preciosa', share: 'Pusieron la caja de música en la plaza para que todos la escucharan.' },
  { item: 'spinning-top', inside: 'peonzas de madera pintadas a mano', share: 'Regalaron una peonza a cada pequeño del pueblo.' },
];

/** A3 · El mapa de tres pistas: an old map, two riddles, a lock that only the last clue opens. */
function treasureMap({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const chain = Object.keys(RIDDLES).filter(id => PLACE_INFO[id].trials.length);
  const first = getScene(choose(random, chain));
  const second = getScene(choose(random, chain.filter(id => id !== first.id)));
  const third = getScene(choose(random, chain.filter(id => id !== first.id && id !== second.id)));
  const home = getScene(choose(random, homesFor(cast).filter(id => ![first.id, second.id, third.id].includes(id))));
  const trial = abilityTrial(random, PLACE_INFO[second.id].trials, [f, h]);
  const treasure = choose(random, TREASURES);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const attic = at('attic'), atHome = at(home.id), one = at(first.id), two = at(second.id), three = at(third.id);
  const { helper } = trial;
  const beats = [
    [
      attic(1, `Un día de lluvia, ${named(h)} jugaba en el desván con su ${friendWord(f)} ${f.name}.`, both),
      attic(2, getScene('attic').detail),
      attic(3, 'Había cajas llenas de cosas viejas y olía a madera.'),
      attic(1, 'En el desván encontraron un mapa viejo con tres cruces.', both, ['map']),
      attic(2, 'Las cruces marcaban tres lugares unidos por una línea de puntos.', [], ['map']),
      attic(3, `${f.name} sopló el polvo, y apareció el dibujo de un cofre.`, [f.id], ['treasure-chest']),
      attic(2, `Junto a la primera cruz estaba escrito el nombre ${ofPhrase(placeName(first))}.`, [], ['map']),
      attic(3, `${h.name} casi no podía creer lo que veía.`, [h.id]),
      attic(1, 'Al día siguiente, decidieron seguir el mapa.', both, ['map']),
    ],
    [
      one(1, travelTo(first, cast, pair), both),
      one(2, first.detail),
      one(3, `${h.name} miraba el mapa a cada rato para no equivocarse.`, [h.id], ['map']),
      one(1, `${cap(spotOf(first))}, encontraron un pergamino enrollado.`, both, ['clue-scroll']),
      one(2, 'Estaba atado con una cinta y tenía letras muy antiguas.', both, ['clue-scroll']),
      one(3, `${f.name} lo desenrolló con mucho cuidado para no romperlo.`, [f.id]),
      one(1, `El pergamino decía que la siguiente pista estaba ${RIDDLES[second.id]}.`, both, ['clue-scroll']),
      one(2, `Por fin, ${f.name} adivinó que hablaba ${ofPhrase(placeName(second))}.`, [f.id]),
      one(3, 'A lo lejos se oía cantar a un pájaro.'),
    ],
    [
      two(1, travelTo(second, cast, pair), both),
      two(2, second.detail),
      two(3, `${h.name} comprobó que el lugar coincidía con la segunda cruz del mapa.`, [h.id], ['map']),
      two(1, `Pero ${low(TRIALS[trial.id].intro)}`),
      two(2, trialReason(trial), helper ? [helper.id] : both),
      two(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      two(3, TRIALS[trial.id].after),
      two(2, helper === f ? `${h.name} chocó la mano de ${f.name}, muy contento.`.replace('contento', gendered(h, 'contento', 'contenta')) : 'Se rieron de alegría y siguieron buscando.', both),
      two(3, 'Ya faltaba poco para la segunda pista.', both),
    ],
    [
      two(1, `${cap(spotOf(second))}, brillaba una piedra de luna.`, [], ['moonstone']),
      two(2, 'Era redonda y blanca, como una luna llena pequeñita.', [], ['moonstone']),
      two(3, `${f.name} la sostuvo a la luz para leer mejor.`, [f.id]),
      two(1, `La piedra tenía letras: el tesoro esperaba ${RIDDLES[third.id]}.`, both),
      two(2, `Esta vez, ${h.name} adivinó enseguida de qué lugar se trataba.`, [h.id]),
      two(3, 'Guardaron la piedra de luna con mucho cuidado.', both, ['moonstone']),
      three(1, travelTo(third, cast, pair), both),
      three(2, third.detail),
      three(3, 'El corazón les latía muy deprisa.', both),
    ],
    [
      three(1, `${cap(spotOf(third))}, encontraron un cofre del tesoro.`, both, ['treasure-chest']),
      three(2, 'El hueco redondo de la tapa tenía el tamaño de la piedra.', [], ['treasure-chest']),
      three(3, `${h.name} intentó abrirlo, pero no se movía ni un poco.`, [h.id]),
      three(1, `${f.name} colocó la piedra de luna en un hueco del cofre, y lo abrió.`, [f.id], ['moonstone', 'treasure-chest']),
      three(2, 'Una nota decía que una exploradora lo había escondido para quien supiera compartir.', both),
      three(3, `${f.name} leyó la nota en voz alta dos veces.`, [f.id]),
      three(1, `Dentro había ${treasure.inside}.`, both, [treasure.item]),
      three(2, `${pair} se miraron y supieron enseguida qué hacer.`, both),
      three(3, 'Cerraron el cofre con cuidado para el viaje de vuelta.', both, ['treasure-chest']),
    ],
    [
      atHome(1, `Volvieron a casa, ${inPlace(home)}, con el cofre.`, both, ['treasure-chest']),
      atHome(2, 'Los vecinos no podían creer lo que habían encontrado.'),
      atHome(3, `Esa noche, ${h.name} soñó con nuevos mapas y nuevas cruces.`, [h.id], ['map']),
      atHome(1, treasure.share, both, [treasure.item]),
      atHome(2, `${h.name} guardó el mapa viejo como recuerdo de la aventura.`, [h.id], ['map']),
      atHome(3, `${f.name} dibujó el camino de las tres pistas en un papel.`, [f.id]),
      atHome(1, `${h.name} aprendió que un tesoro compartido vale el doble.`, [h.id]),
      atHome(2, `Desde entonces, ${pair} fueron todavía más amigos.`, both),
      atHome(3, 'Y el cofre vacío volvió al desván, esperando otra aventura.', [], ['treasure-chest']),
    ],
  ];
  return {
    title: `${h.name} y el mapa de las tres pistas`, place: third, questId: treasure.item, variantId: trial.id, beats,
    items: ['map', 'clue-scroll', 'moonstone', 'treasure-chest', treasure.item],
    blockIds: { opening: home.id, goal: `map-${treasure.item}`, obstacle: trial.id, strategy: `${first.id}-${third.id}`, discovery: second.id, ending: home.id },
    roles: { home: home.id, destination: third.id, chain: [first.id, second.id, third.id], helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}

/** Neighbors and where they work. */
const WORKPLACES = {
  'lighthouse-keeper': 'lighthouse-cliff', 'train-driver': 'train-station', gardener: 'greenhouse', baker: 'bakery',
  teacher: 'school', 'market-seller': 'market', 'mail-carrier': 'post-office', dentist: 'clinic',
};
/** What a neighbor sends, why it matters, what goes wrong on the way and how it is saved. */
const PARCELS = [
  { id: 'cake', item: 'birthday-cake', what: 'una tarta de cumpleaños', short: 'la tarta', why: who => `porque era el cumpleaños de ${who.name}`, danger: 'En una curva, la tarta casi se cae al suelo.', fix: 'Desde entonces, la llevaron entre los dos, muy despacito.', use: who => `${who.name} sopló las velas y compartió la tarta con ellos.` },
  { id: 'letter', item: 'letter', what: 'una carta muy importante', short: 'la carta', why: () => 'porque era de su hermana, que vivía muy lejos', danger: 'Empezó a lloviznar, y la carta podía mojarse.', fix: 'La guardaron dentro de la mochila, bien protegida.', fixItems: ['backpack', 'letter'], use: who => `${who.name} leyó la carta, y se le escapó una sonrisa enorme.` },
  { id: 'flowers', item: 'flowers-in-glass', what: 'unas flores en un vaso', short: 'el ramito', why: () => 'para alegrar su mesa de trabajo', danger: 'Hacía calor, y las flores empezaron a ponerse mustias.', fix: 'Les dieron agua fresca de una fuente del camino.', use: who => `${who.name} puso el ramito junto a la ventana, y todo pareció más alegre.` },
  { id: 'soup', item: 'soup', what: 'una sopa caliente', short: 'la sopa', why: () => 'porque trabajaba mucho y no había comido', danger: 'Con el viento, la sopa empezaba a enfriarse.', fix: 'La envolvieron en una manta para que siguiera calentita.', fixItems: ['blanket'], use: who => `${who.name} se tomó la sopa despacio y dijo que estaba riquísima.` },
  { id: 'bread', item: 'bread', what: 'una barra de pan recién hecho', short: 'el pan', why: () => 'para que tuviera un buen desayuno', danger: 'Unos pájaros hambrientos se acercaron a picotear el pan.', fix: 'Les dieron unas migas, y los pájaros se fueron contentos.', use: who => `${who.name} desayunó pan calentito y les ofreció un trozo.` },
  { id: 'glasses', item: 'old-glasses', what: 'unas gafas que había olvidado', short: 'las gafas', why: () => 'porque sin ellas no veía bien', danger: 'Las gafas se llenaron de polvo del camino.', fix: 'Las limpiaron con un pañuelo hasta dejarlas brillantes.', fixItems: ['handkerchief'], use: who => `${who.name} se puso las gafas y por fin pudo leer su libro.` },
  { id: 'music', item: 'music-box', what: 'una caja de música', short: 'la caja de música', why: () => 'para escuchar una canción por las noches', danger: 'La caja de música se golpeó y dejó de sonar.', fix: 'Giraron la manivela con paciencia, y volvió a sonar.', use: who => `${who.name} abrió la caja de música, y una canción suave llenó el lugar.` },
  { id: 'honey', item: 'honey-jar', what: 'un tarrito de miel', short: 'el tarrito', why: () => 'para endulzar su té de la tarde', danger: 'Unas abejas curiosas empezaron a seguir el tarrito.', fix: 'Caminaron despacio y en calma, y las abejas siguieron su camino.', use: who => `${who.name} puso miel en su té y suspiró de gusto.` },
];

/** A4 · El encargo: deliver something fragile across town, save it from a mishap and hand it over. */
function errand({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const receiverId = choose(random, Object.keys(WORKPLACES).filter(id => fitsCast(cast, WORKPLACES[id])));
  const senderId = choose(random, Object.keys(WORKPLACES).filter(id => id !== receiverId));
  const receiver = copySupporting(random, receiverId);
  const sender = copySupporting(random, senderId);
  const parcel = choose(random, PARCELS.filter(entry => !(entry.id === 'bread' && receiverId === 'baker')));
  const dest = getScene(WORKPLACES[receiverId]);
  const home = getScene(choose(random, homesFor(cast).filter(id => id !== dest.id)));
  const route = getScene(fitsCast(cast, 'crossroads') ? 'crossroads' : dest.id);
  const trial = abilityTrial(random, ['wind', 'fog', 'maze', ...(parcel.id === 'letter' ? [] : ['rain'])], [f, h]);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), road = at(route.id), there = at(dest.id);
  const { helper } = trial;
  const beats = [
    [
      atHome(1, `Una mañana, ${sender.name}, ${kind(sender)}, llamó a la puerta de ${h.name} y su ${friendWord(f)} ${f.name}.`, [sender.id, h.id, f.id]),
      atHome(2, 'Buscaba a alguien de confianza para un encargo importante.', [sender.id]),
      atHome(3, home.detail),
      atHome(1, `Les pidió llevar ${parcel.what} a ${receiver.name}, ${kind(receiver)}.`, [sender.id, ...both], [parcel.item]),
      atHome(2, `Era importante ${parcel.why(receiver)}.`, [sender.id]),
      atHome(3, `${h.name} y ${f.name} se miraron, muy emocionados.`, both),
      atHome(2, `${receiver.name} trabajaba ${inPlace(dest)}.`),
      atHome(3, `${sender.name} les explicó el camino dos veces.`, [sender.id]),
      atHome(1, `${pair} prometieron cuidar el encargo todo el camino.`, both),
    ],
    [
      atHome(1, `${h.name} tomó ${parcel.short} con mucho cuidado, y salieron.`, [h.id], [parcel.item]),
      atHome(2, `${f.name} iba delante para avisar de los charcos y las piedras.`, [f.id]),
      atHome(3, 'Por el camino saludaron a varios vecinos.', both),
      road(1, `El camino hasta ${placeName(dest)} era largo.`, both),
      road(2, route.detail),
      road(3, `${h.name} recordó las indicaciones de ${sender.name}.`, [h.id]),
      road(1, route.id === 'crossroads' ? 'En el cruce, siguieron la señal correcta del poste.' : `Siguieron el camino que les había explicado ${gendered(sender, 'su vecino', 'su vecina')}.`, both, ['signpost']),
      road(2, `${f.name} contó los pasos para que el tiempo pasara más rápido.`, [f.id]),
      road(3, 'Un pájaro los acompañó un rato desde las ramas.'),
    ],
    [
      road(1, `Más adelante, ${low(TRIALS[trial.id].intro)}`),
      road(2, 'Tenían que proteger el encargo pasara lo que pasara.', both),
      road(3, `${h.name} apretó ${parcel.short} contra su pecho.`, [h.id], [parcel.item]),
      road(2, trialReason(trial), helper ? [helper.id] : both),
      road(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      road(3, helper === f ? `${h.name} le dio las gracias a ${f.name} con una sonrisa.` : 'Se sonrieron, orgullosos del trabajo en equipo.', both),
      road(2, TRIALS[trial.id].after),
      road(3, `${cap(parcel.short)} seguía a salvo entre sus manos.`, [], [parcel.item]),
      road(1, 'Por fin, el camino quedó despejado.', both),
    ],
    [
      road(1, parcel.danger, both, [parcel.item]),
      road(2, `${h.name} sintió un poco de nervios.`, [h.id]),
      road(3, `${f.name} pensó rápido en una solución.`, [f.id]),
      road(1, parcel.fix, both, parcel.fixItems || [parcel.item]),
      road(2, `${cap(parcel.short)} estaba a salvo otra vez.`, [], [parcel.item]),
      road(3, 'Se rieron del susto y siguieron caminando.', both),
      there(1, `Poco después, llegaron ${toPlace(dest)}.`, both),
      there(2, dest.detail),
      there(3, `${receiver.name} estaba trabajando, como hacía cada día.`, [receiver.id]),
    ],
    [
      there(1, `Le entregaron ${parcel.short} a ${receiver.name}.`, [receiver.id, ...both], [parcel.item]),
      there(2, `Le contaron que lo enviaba ${sender.name}.`, both),
      there(3, `${receiver.name} se quedó sin palabras un momento.`, [receiver.id]),
      there(1, parcel.use(receiver), [receiver.id], [parcel.item]),
      there(2, `${receiver.name} les dio las gracias de todo corazón.`, [receiver.id, ...both]),
      there(3, `Les enseñó cómo era su trabajo ${inPlace(dest)}.`, [receiver.id]),
      there(2, 'Le contaron el susto del camino, y se rieron juntos.', [receiver.id, ...both]),
      there(3, 'Se despidieron con la mano desde la puerta.', both),
      there(1, `Antes de irse, ${receiver.name} les dio un abrazo para ${sender.name}.`, [receiver.id, ...both]),
    ],
    [
      atHome(1, `Volvieron ${toPlace(home)} y le dieron el abrazo a ${sender.name}.`, [...both, sender.id]),
      atHome(2, `${sender.name} quiso saber todos los detalles.`, [sender.id]),
      atHome(3, `${f.name} se los contó con muchos gestos.`, [f.id]),
      atHome(1, `${sender.name} sonrió al saber que todo había salido bien.`, [sender.id]),
      atHome(2, `Les dijo que podía contar con ${pair} para cualquier cosa.`, [sender.id, ...both]),
      atHome(3, 'Esa noche, durmieron cansados pero felices.', both),
      atHome(1, `${h.name} aprendió que cumplir un encargo es una manera de cuidar a los demás.`, [h.id]),
      atHome(2, `Desde entonces, a ${pair} los llamaban los mejores mensajeros.`, both),
      atHome(3, 'Y cada vez que pasaban por el cruce, saludaban al poste de señales.', both),
    ],
  ];
  return {
    title: `${h.name} y el encargo de ${sender.name}`, place: dest, extras: [sender, receiver], questId: parcel.id, variantId: trial.id, beats,
    items: [parcel.item, ...(parcel.fixItems || [])],
    blockIds: { opening: home.id, goal: parcel.id, obstacle: trial.id, strategy: receiverId, discovery: senderId, ending: dest.id },
    roles: { home: home.id, destination: dest.id, sender: senderId, receiver: receiverId, helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}

/** Creatures that wander far from home, how to carry them and what they give back. */
const STRAYS = [
  { id: 'penguin-chick', kind: 'supporting', homes: ['snowy-valley', 'mountain'], how: 'un viento muy fuerte lo había arrastrado lejos', trouble: 'tenía muchísimo calor', carry: 'Lo refrescaron con un cubo de agua fría.', carryItems: ['bucket'], gift: 'una flor de hielo que nunca se derretía', giftItem: 'ice-flower' },
  { id: 'sea-turtle-hatchling', kind: 'supporting', homes: ['beach', 'coral-reef'], how: 'se había despistado al salir de su huevo', trouble: 'tenía la piel seca y echaba de menos el mar', carry: 'La llevaron en un cubo con agua de mar.', carryItems: ['bucket'], gift: 'una concha rosada', giftItem: 'shell' },
  { id: 'seal-pup', kind: 'supporting', homes: ['beach', 'lighthouse-cliff'], how: 'se había subido a un barco y se había quedado dormida', trouble: 'echaba de menos el agua fría y a su mamá', carry: 'La llevaron en una carretilla con un cubo de agua.', carryItems: ['wheelbarrow', 'bucket'], gift: 'una perla pequeñita', giftItem: 'pearl' },
  { id: 'duckling', kind: 'supporting', homes: ['swamp', 'lily-pond', 'lake'], how: 'una corriente se había llevado su hoja-barca', trouble: 'no encontraba agua para nadar', carry: 'Lo llevaron en un cubo con un poco de agua.', carryItems: ['bucket'], gift: 'una pluma suave', giftItem: 'feather' },
  { id: 'arctic-fox', kind: 'character', homes: ['snowy-valley', 'snowy-night-forest'], how: 'había seguido un copo de nieve gigante', trouble: 'tenía tanto calor que no paraba de jadear', carry: 'Le dieron sombra con un paraguas grande.', carryItems: ['umbrella'], gift: 'una flor de hielo que nunca se derretía', giftItem: 'ice-flower' },
  { id: 'bat', kind: 'character', homes: ['cave', 'crystal-cave'], how: 'se había despistado con la luz del amanecer', trouble: 'la luz del sol le molestaba en los ojos', carry: 'Lo protegieron del sol con un paraguas.', carryItems: ['umbrella'], gift: 'un cristal brillante de su cueva', giftItem: 'crystal' },
];

/** A5 · Lejos de casa: a creature far from its habitat, the way back and a gift from its world. */
function farFromHome({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const fits = stray => !cast.some(person => person.id === stray.id) && stray.homes.some(id => fitsCast(cast, id) && (PLACE_INFO[id].trials.length || PLACE_INFO[id].travel === 'dream')) &&
    homesFor(cast).some(id => !stray.homes.includes(id));
  const stray = choose(random, STRAYS.filter(fits));
  const guest = stray.kind === 'character' ? copyCharacter(random, stray.id) : copySupporting(random, stray.id);
  const home = getScene(choose(random, homesFor(cast).filter(id => !stray.homes.includes(id) && !WARM_ONLY_CONFLICT(stray, id))));
  const land = getScene(choose(random, stray.homes.filter(id => fitsCast(cast, id))));
  const trials = PLACE_INFO[land.id].trials.length ? PLACE_INFO[land.id].trials : ['fog', 'night'];
  const trial = abilityTrial(random, trials, [f, h]);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const it = pronoun(guest);
  const a = gendered(guest, 'un', 'una');
  const atHome = at(home.id), there = at(land.id);
  const { helper } = trial;
  const beats = [
    [
      atHome(1, `Una mañana, ${named(h)} encontró a ${a} ${guest.label} llamad${gendered(guest, 'o', 'a')} ${guest.name} ${inPlace(home)}.`, [h.id, guest.id]),
      atHome(2, `${guest.name} ${stray.trouble}, y no sabía qué hacer.`, [guest.id]),
      atHome(3, home.detail),
      atHome(1, `${guest.name} le contó que ${stray.how}.`, [guest.id, h.id]),
      atHome(2, `Su hogar estaba ${inPlace(land)}, muy lejos de allí.`, [guest.id]),
      atHome(3, `${h.name} vio que ${guest.name} estaba a punto de llorar.`, [h.id, guest.id]),
      atHome(2, `${h.name} llamó a su ${friendWord(f)} ${f.name} para pedirle ayuda.`, both),
      atHome(3, `${f.name} llegó corriendo en cuanto se enteró.`, [f.id]),
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} decidieron llevar${it} de vuelta a su hogar.`, [...both, guest.id]),
    ],
    [
      atHome(1, stray.carry, [...both, guest.id], stray.carryItems),
      atHome(2, `${guest.name} se sintió un poco mejor enseguida.`, [guest.id]),
      atHome(3, `${f.name} comprobó el camino antes de ponerse en marcha.`, [f.id]),
      there(1, travelTo(land, cast, pair), [...both, guest.id]),
      there(2, land.detail),
      there(3, `Por el camino, ${guest.name} les contó cómo era su familia.`, [guest.id]),
      there(1, `${guest.name} reconoció el lugar y sonrió por primera vez.`, [guest.id]),
      there(2, `Ya faltaba muy poco para llegar a su casa.`, [guest.id, ...both]),
      there(3, 'El aire allí olía distinto, y a su nuevo amigo le gustaba.'.replace('nuevo amigo', gendered(guest, 'nuevo amigo', 'nueva amiga')), both),
    ],
    [
      there(1, `Pero ${low(TRIALS[trial.id].intro)}`),
      there(2, `${guest.name} se asustó y se escondió detrás de ${h.name}.`, [guest.id, h.id]),
      there(3, `${h.name} le dijo que no tuviera miedo.`, [h.id, guest.id]),
      there(2, trialReason(trial), helper ? [helper.id] : both),
      there(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      there(3, TRIALS[trial.id].after),
      there(2, `${guest.name} aplaudió con mucha alegría, ${gendered(guest, 'maravillado', 'maravillada')} con la idea.`, [guest.id]),
      there(3, 'Ninguno de los dos se había rendido.', both),
      there(1, `Al fin vieron el hogar de ${guest.name}.`, [...both, guest.id]),
    ],
    [
      there(1, `Su familia salió a recibir${it} con mucha alegría.`, [guest.id]),
      there(2, `Todos le dieron abrazos y besos a ${guest.name}.`, [guest.id]),
      there(3, `${guest.name} contó su aventura muy deprisa, sin respirar.`, [guest.id]),
      there(1, `La familia de ${guest.name} dio las gracias a ${pair}.`, both),
      there(2, `Les dijeron que podían visitarlos cuando quisieran.`, both),
      there(3, `${f.name} se puso un poco ${gendered(f, 'colorado', 'colorada')} de la emoción.`, [f.id]),
      there(1, `Después, ${guest.name} les enseñó sus rincones favoritos.`, [guest.id, ...both]),
      there(2, `Allí ${guest.name} se movía feliz, porque ese era su lugar.`, [guest.id]),
      there(3, 'Jugaron hasta que el sol empezó a bajar.', [...both, guest.id]),
    ],
    [
      there(1, `Antes de despedirse, ${guest.name} les regaló ${stray.gift}.`, [guest.id, ...both], [stray.giftItem]),
      there(2, 'Era el tesoro más preciado que tenía.', [], [stray.giftItem]),
      there(3, `${h.name} prometió guardarlo con cariño para siempre.`, [h.id]),
      there(2, `${guest.name} les dijo adiós hasta que se perdieron de vista.`, [guest.id]),
      there(3, `${f.name} se secó una lagrimita de la emoción.`, [f.id]),
      atHome(1, `${pair} volvieron ${toPlace(home)} con el corazón contento.`, both),
      atHome(2, `En casa, colocaron el regalo junto a la ventana.`, both, [stray.giftItem]),
      atHome(3, 'Cada vez que lo miraban, se acordaban de su amigo lejano.', both),
      atHome(1, `Esa noche, ${h.name} pensó en lo bonito que es tener un hogar.`, [h.id]),
    ],
    [
      atHome(1, `${h.name} aprendió que cada uno tiene un lugar donde se siente bien.`, [h.id]),
      atHome(2, `Y que ayudar a alguien a volver a su hogar es un gran regalo.`, [h.id]),
      atHome(3, `${f.name} dijo que había sido la mejor aventura del año.`, [f.id]),
      atHome(1, `Desde entonces, ${pair} escribían cartas a ${guest.name}.`, both, ['letter']),
      atHome(2, `${guest.name} siempre contestaba con dibujos de su hogar.`, [guest.id]),
      atHome(3, `Y en las cartas, siempre mandaba recuerdos a ${f.name}.`, [f.id], ['letter']),
      atHome(1, `Y algún día, ${pair} irían a visitar${it} otra vez.`, both),
      atHome(2, 'Ya tenían pensado qué llevarle de regalo.', both),
      atHome(3, `Mientras tanto, ${h.name} cuidaba el regalo de su amigo con mucho cariño.`.replace('su amigo', gendered(guest, 'su amigo', 'su amiga')), [h.id], [stray.giftItem]),
    ],
  ];
  return {
    title: `${h.name} y ${a === 'un' ? 'el' : 'la'} ${guest.label} lejos de casa`, place: land, extras: [guest], questId: stray.id, variantId: trial.id, beats,
    items: [...stray.carryItems, stray.giftItem],
    blockIds: { opening: home.id, goal: stray.id, obstacle: trial.id, strategy: stray.giftItem, discovery: land.id, ending: home.id },
    roles: { home: home.id, destination: land.id, guest: guest.id, helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}
// Snow creatures overheat anywhere but snow; sea creatures dry out away from the sea.
const WARM_ONLY_CONFLICT = (stray, homeId) => stray.homes.includes(homeId);

/** Questions a child might ask, where to look and the simple truth they find. */
const QUESTIONS = [
  { id: 'river', ask: 'adónde iba el agua del río', trigger: 'vio pasar una hoja flotando por el río', place: 'beach', tool: 'compass', observe: 'Allí vieron cómo el río llegaba a la playa y se mezclaba con las olas.', detail: 'El agua del río era dulce, y la del mar, salada.', answer: 'Los ríos viajan sin parar hasta llegar al mar.', next: 'de dónde venía el agua de la lluvia' },
  { id: 'moon', ask: 'por qué la luna cambiaba de forma', trigger: 'vio una luna fina como una uña', place: 'star-observatory', tool: 'telescope', observe: 'Por el telescopio vieron la luna, con una parte iluminada y otra en sombra.', detail: 'El sol estaba al otro lado y solo alumbraba un trocito.', answer: 'La luna no cambia: el sol ilumina solo una parte, y esa parte va cambiando.', next: 'por qué las estrellas parpadeaban' },
  { id: 'wind', ask: 'de dónde venía el viento', trigger: 'vio cómo su sombrero salía volando', place: 'lookout-hill', tool: 'pinwheel', observe: 'El molinillo giraba más rápido cuando el sol calentaba la colina.', detail: 'Por la tarde, cuando refrescó, el molinillo giró más despacio.', answer: 'El viento es aire que se mueve cuando el sol calienta unos lugares más que otros.', next: 'adónde iban las nubes' },
  { id: 'butterfly', ask: 'cómo nacían las mariposas', trigger: 'notó que una mariposa se posaba en su nariz', place: 'flower-field', tool: 'magnifying-glass', observe: 'Con la lupa vieron una oruga comiendo hojas y, cerca, una crisálida colgada.', detail: 'La crisálida se movía un poquito, como si alguien despertara dentro.', answer: 'La oruga se envuelve en una crisálida y, al despertar, ya es una mariposa.', next: 'cómo nacían los pájaros' },
  { id: 'firefly', ask: 'por qué brillaban las luciérnagas', trigger: 'vio una lucecita volar en la oscuridad', place: 'firefly-field', tool: 'magnifying-glass', observe: 'Vieron que cada luciérnaga encendía su barriguita, y otra le respondía.', detail: 'Las luces se encendían y se apagaban como si conversaran.', answer: 'Las luciérnagas se hablan con su luz, como si se mandaran mensajes.', next: 'por qué los grillos cantaban de noche' },
  { id: 'echo', ask: 'por qué la montaña repetía sus palabras', trigger: 'gritó su nombre y oyó que alguien lo repetía', place: 'canyon', tool: 'drum', observe: 'Tocaron el tambor, y el sonido volvió desde las rocas un momento después.', detail: 'Cuanto más lejos estaban las rocas, más tardaba en volver.', answer: 'La voz choca con las rocas y rebota de vuelta, como una pelota.', next: 'por qué el mar sonaba dentro de las conchas' },
  { id: 'rainbow', ask: 'de dónde salía el arcoíris', trigger: 'vio un arcoíris después de la lluvia', place: 'waterfall', tool: 'crystal', observe: 'Cuando el sol atravesó las gotitas de la cascada, apareció un arcoíris.', detail: 'Con el cristal también hicieron un arcoíris pequeñito.', answer: 'El arcoíris nace cuando la luz del sol cruza muchas gotitas de agua.', next: 'por qué el cielo era azul' },
  { id: 'volcano', ask: 'por qué el volcán echaba vapor', trigger: 'vio una nubecita blanca sobre el volcán', place: 'volcano', tool: 'boots', observe: 'Sintieron el suelo tibio y vieron salir una nubecita de vapor.', detail: 'Las piedras de alrededor estaban calentitas, como pan recién hecho.', answer: 'Muy dentro de la tierra hace mucho calor, y el volcán deja escapar un poco.', next: 'qué había en el centro de la Tierra' },
];
const TOOL_PHRASES = {
  compass: ['una brújula', 'la brújula', 'para seguir el río sin perderse'], telescope: ['un telescopio', 'el telescopio', 'para mirar la luna de cerca'],
  pinwheel: ['un molinillo', 'el molinillo', 'para ver por dónde soplaba el viento'], 'magnifying-glass': ['una lupa', 'la lupa', 'para mirar las cosas pequeñas'],
  drum: ['un tambor', 'el tambor', 'para escuchar cómo viajaba el sonido'], crystal: ['un cristal', 'el cristal', 'para jugar con la luz del sol'],
  boots: ['unas botas altas', 'las botas', 'para caminar sobre piedras calientes'],
};

/** A6 · La gran pregunta: a question at home, a mentor's clue, a journey and an answer to share. */
function bigQuestion({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const question = choose(random, QUESTIONS.filter(entry => fitsCast(cast, entry.place)));
  const place = getScene(question.place);
  const home = getScene(choose(random, homesFor(cast).filter(id => id !== place.id)));
  const mentor = copyCharacter(random, choose(random, ADVENTURE_MENTORS.filter(id => id !== h.id && id !== f.id)));
  const trials = PLACE_INFO[place.id].trials.length ? PLACE_INFO[place.id].trials : ['night', 'fog'];
  const trial = abilityTrial(random, trials, [f, h]);
  const [toolName, toolDefinite, toolUse] = TOOL_PHRASES[question.tool];
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(place.id);
  const { helper } = trial;
  const beats = [
    [
      atHome(1, `Un día, ${named(h)} ${question.trigger} y se quedó ${gendered(h, 'pensativo', 'pensativa')}.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, `${h.name} se rascó la cabeza, muy ${gendered(h, 'concentrado', 'concentrada')}.`, [h.id]),
      atHome(1, `Quería saber ${question.ask}.`, [h.id]),
      atHome(2, `Su ${friendWord(f)} ${f.name} tampoco lo sabía, pero también quería averiguarlo.`, [f.id]),
      atHome(3, 'Preguntaron a varios vecinos, pero nadie supo responder.', both),
      atHome(2, `Entonces pensaron en ${mentor.name}, ${kind(mentor)}, que sabía muchas cosas.`, [mentor.id]),
      atHome(3, 'Fueron a buscar a su casa dando saltitos de curiosidad.', both),
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} fueron a preguntarle a ${mentor.name}, ${kind(mentor)}.`, [...both, mentor.id]),
    ],
    [
      atHome(1, `${mentor.name} sonrió y les dijo que la respuesta estaba ${inPlace(place)}.`, [mentor.id, ...both]),
      atHome(2, 'Les explicó que algunas respuestas se descubren mirando con atención.', [mentor.id]),
      atHome(3, `${h.name} sacó un cuaderno para apuntarlo todo.`, [h.id], ['notebook']),
      atHome(1, `Les prestó ${toolName} ${toolUse}.`, [mentor.id, ...both], [question.tool]),
      atHome(2, `${f.name} lo guardó en su mochila con mucho cuidado.`, [f.id], ['backpack']),
      atHome(3, `${mentor.name} les deseó buena suerte desde la puerta.`, [mentor.id]),
      there(1, travelTo(place, cast, pair), both),
      there(2, place.detail),
      there(3, `${h.name} miraba todo con los ojos muy abiertos.`, [h.id]),
    ],
    [
      there(1, `Pero ${low(TRIALS[trial.id].intro)}`),
      there(2, `${f.name} se quedó quieto un momento, sin saber qué hacer.`.replace('quieto', gendered(f, 'quieto', 'quieta')), [f.id]),
      there(3, 'No querían volver sin su respuesta.', both),
      there(2, trialReason(trial), helper ? [helper.id] : both),
      there(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      there(3, TRIALS[trial.id].after),
      there(2, helper === f ? `${h.name} le dio las gracias a ${f.name}.` : 'Se dieron un abrazo para celebrarlo.', both),
      there(3, 'Por fin estaban en el lugar exacto.', both),
      there(1, 'Allí se sentaron a mirar con mucha atención.', both),
    ],
    [
      there(1, question.observe, both, [question.tool]),
      there(2, question.detail, both),
      there(3, `${h.name} lo dibujó todo en su cuaderno.`, [h.id], ['notebook']),
      there(2, `${f.name} hizo una pregunta tras otra, y ${h.name} intentó responder.`, both),
      there(3, 'Pasaron un buen rato mirando, sin decir nada.', both),
      there(1, `${h.name} empezó a entender lo que estaba viendo.`, [h.id]),
      there(2, 'Todo encajaba como las piezas de un rompecabezas.', both, ['puzzle']),
      there(3, `${f.name} dio un saltito de emoción.`, [f.id]),
      there(1, `Por fin, ${h.name} encontró la respuesta.`, [h.id]),
    ],
    [
      there(1, question.answer, both),
      there(2, `${f.name} dijo que nunca se le habría ocurrido.`, [f.id]),
      there(3, `${h.name} subrayó la respuesta dos veces en el cuaderno.`, [h.id], ['notebook']),
      there(2, 'Se quedaron mirando un rato más, porque era precioso.', both),
      there(3, 'Luego guardaron sus cosas y emprendieron el regreso.', both),
      atHome(1, `Volvieron ${toPlace(home)} y le contaron todo a ${mentor.name}.`, [...both, mentor.id]),
      atHome(2, `${mentor.name} les dijo que habían sido unos investigadores estupendos.`, [mentor.id]),
      atHome(3, `${f.name} le devolvió ${toolDefinite} con mucho cuidado.`, [f.id], [question.tool]),
      atHome(1, `Después, ${h.name} se lo explicó a todos los vecinos.`, [h.id]),
    ],
    [
      atHome(1, 'Los vecinos escucharon con la boca abierta.'),
      atHome(2, `Algunos dijeron que habían aprendido algo nuevo gracias a ${pair}.`, both),
      atHome(3, `${h.name} se puso muy ${gendered(h, 'contento', 'contenta')} al oírlo.`, [h.id]),
      atHome(1, `${h.name} aprendió que mirar con calma ayuda a entender el mundo.`, [h.id]),
      atHome(2, 'Y que cada respuesta trae una pregunta nueva.', [h.id]),
      atHome(3, `${f.name} propuso apuntar todas las preguntas en una lista.`, [f.id]),
      atHome(1, `Esa noche, a ${h.name} se le ocurrió otra pregunta: ${question.next}.`, [h.id]),
      atHome(2, 'Ya sabía a quién iría a preguntar por la mañana.', [h.id]),
      atHome(3, `Y se durmió soñando con su próxima aventura con ${f.name}.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y la gran pregunta`, place, mentor, questId: question.id, variantId: trial.id, beats,
    items: [question.tool, 'notebook'],
    blockIds: { opening: home.id, goal: question.id, obstacle: trial.id, strategy: question.tool, discovery: place.id, ending: mentor.id },
    roles: { home: home.id, destination: place.id, mentor: mentor.id, helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}

/** Ways a tired fallen star can be sent back to the sky; flight needs a flyer in the pair. */
const LIFTS = [
  { id: 'kite', items: ['kite'], idea: 'usar la cometa para que el viento la subiera', prep: 'Desenrollaron la cuerda despacio, esperando una brisa.', how: 'Ataron la estrella a la cometa con un lazo flojo, y el viento la llevó hacia arriba.' },
  { id: 'song', items: [], idea: 'cantarle una nana para darle fuerzas', prep: 'Se sentaron juntos y buscaron la canción más suave que conocían.', how: 'Cantaron muy bajito, y la estrella empezó a flotar hacia arriba como una burbuja.' },
  { id: 'lantern', items: ['lantern'], idea: 'calentarla junto al farol para que recuperara su luz', prep: 'Encendieron el farol y lo dejaron a su lado, con cuidado.', how: 'Junto al farol, la estrella se llenó de luz y salió volando hacia el cielo.' },
  { id: 'wish', items: [], idea: 'pedir un deseo los dos a la vez', prep: 'Cerraron los ojos y se dieron la mano con fuerza.', how: 'Desearon con todas sus fuerzas, y la estrella subió dando vueltas hacia el cielo.' },
  { id: 'flight', items: [], flyer: true, idea: 'llevarla volando hasta donde las nubes se hacen finas', prep: 'Comprobaron que el viento soplaba hacia arriba, suave y tranquilo.', how: name => `${name} voló con la estrella hasta lo más alto, y allí la soltó con cuidado.` },
];
const STAR_PEAKS = ['lookout-hill', 'mountain', 'star-observatory'];

/** A7 · La estrella caída: a star falls near home, the pair carries it to a peak and sends it home. */
function fallenStar({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const say = sayer(random);
  const place = getScene(choose(random, STAR_PEAKS.filter(id => fitsCast(cast, id))));
  const home = getScene(choose(random, homesFor(cast).filter(id => id !== place.id)));
  // The story already happens at night, so darkness is never its obstacle.
  const trial = abilityTrial(random, PLACE_INFO[place.id].trials.filter(id => id !== 'night'), [f, h]);
  const flyer = [f, h].find(person => (ABILITIES[person.id] || []).includes('fly'));
  const lift = choose(random, LIFTS.filter(entry => !entry.flyer || flyer));
  const how = typeof lift.how === 'function' ? lift.how(flyer.name) : lift.how;
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(place.id);
  const { helper } = trial;
  const star = ['fallen-star'];
  const beats = [
    [
      atHome(1, say([`Una noche, ${named(h)} vio caer una lucecita del cielo, muy cerca de su casa.`, `Una noche de verano, ${named(h)} vio una lucecita que caía del cielo dando vueltas.`]), [h.id]),
      atHome(2, 'Todo estaba oscuro y tranquilo, y solo cantaban los grillos.'),
      atHome(3, `${h.name} se frotó los ojos, por si lo había soñado.`, [h.id]),
      atHome(1, `Corrió a buscar a su ${friendWord(f)} ${f.name}, y juntos fueron a mirar.`, both),
      atHome(2, 'Caminaban de puntillas, con el corazón dando saltitos.', both),
      atHome(3, `${f.name} iba delante, mirando cada rincón.`, [f.id]),
      atHome(1, `${cap(spotOf(home))}, encontraron una estrella pequeñita que brillaba muy poco.`, both, star),
      atHome(2, 'La estrella temblaba, como si tuviera frío.', [], star),
      atHome(3, `${f.name} se agachó para mirarla de cerca.`, [f.id]),
    ],
    [
      atHome(1, 'La estrella les contó que se había caído mientras jugaba con las demás.', both, star),
      atHome(2, 'Si no volvía al cielo antes del amanecer, perdería su brillo.', [], star),
      atHome(3, `${h.name} sintió un nudo en la barriga.`, [h.id]),
      atHome(1, `${pair} prometieron llevarla al sitio más alto que conocían: ${placeName(place)}.`, both),
      atHome(2, `${f.name} la llevó con mucho cuidado, para que no se enfriara.`, [f.id]),
      atHome(3, 'La estrella les iluminaba el camino con su poquita luz.', both),
      there(1, travelTo(place, cast, pair), both),
      there(2, place.detail),
      there(3, 'El cielo estaba lleno de estrellas que parecían esperarla.'),
    ],
    [
      there(1, `Pero ${low(TRIALS[trial.id].intro)}`),
      there(2, 'La estrella brillaba cada vez un poco menos.', [], star),
      there(3, `${f.name} miró a ${h.name}, sin saber qué hacer.`, both),
      there(2, trialReason(trial), helper ? [helper.id] : both),
      there(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      there(3, TRIALS[trial.id].after),
      there(1, 'Por fin llegaron a lo más alto, muy cerca del cielo.', both),
      there(2, 'Desde allí, las casas parecían pequeñitas y dormidas.'),
      there(3, 'El viento soplaba suave y fresco.'),
    ],
    [
      there(1, `${h.name} levantó la estrella hacia el cielo, pero no subía.`, [h.id], star),
      there(2, 'Estaba demasiado cansada para volar sola.'),
      there(3, `${f.name} se rascó la cabeza, pensando.`, [f.id]),
      there(1, `Entonces ${f.name} propuso ${lift.idea}.`, [f.id], lift.items),
      there(2, lift.prep, both, lift.items),
      there(3, 'La estrella parpadeó, como si sonriera.', [], star),
      there(1, how, lift.flyer ? [flyer.id] : both, [...star, ...lift.items].slice(0, 2)),
      there(2, 'Subió despacito, cada vez más alto y cada vez más brillante.'),
      there(3, `${pair} contuvieron la respiración.`, both),
    ],
    [
      there(1, 'Al llegar arriba, la estrella brilló más fuerte que todas las demás.', both, star),
      there(2, 'Parecía que les guiñaba un ojo desde el cielo.'),
      there(3, 'Las otras estrellas parpadearon a su alrededor, contentas.'),
      there(1, say([`${pair} se quedaron mirándola un buen rato, sin decir nada.`, `${pair} se sentaron a mirarla un buen rato, muy juntitos.`]), both),
      there(2, `${f.name} dijo que nunca había visto nada tan bonito.`, [f.id]),
      there(3, 'Por el horizonte empezaba a clarear.'),
      atHome(1, `Volvieron ${toPlace(home)} justo cuando salía el sol.`, both),
      atHome(2, 'Estaban muy cansados, pero también muy felices.', both),
      atHome(3, `${h.name} bostezó tres veces seguidas, sin poder evitarlo.`, [h.id]),
    ],
    [
      atHome(1, `Desde entonces, cada noche ${h.name} buscaba su estrella en el cielo.`, [h.id]),
      atHome(2, 'Siempre la encontraba, porque era la que más brillaba.', [h.id]),
      atHome(3, `${f.name} decía que los saludaba solo a ellos.`, [f.id]),
      atHome(1, say([`${h.name} aprendió que ayudar a alguien a volver a casa es un regalo muy grande.`, `${h.name} aprendió que hasta lo más pequeño merece que lo ayudemos a volver a casa.`]), [h.id]),
      atHome(2, 'Aunque ese alguien sea tan pequeño como una estrella.', [h.id]),
      atHome(3, 'Y aunque haya que caminar toda la noche.', [h.id]),
      atHome(1, `Aquella noche, ${h.name} se durmió mirando por la ventana.`, [h.id]),
      atHome(2, 'La estrella brillaba justo encima de su tejado.'),
      atHome(3, `Y soñó que volaba entre las estrellas junto a ${f.name}.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y la estrella caída`, place, questId: `star-${lift.id}`, variantId: trial.id, beats,
    items: [...star, ...lift.items],
    blockIds: { opening: home.id, goal: `star-${lift.id}`, obstacle: trial.id, strategy: lift.id, discovery: place.id, ending: home.id },
    roles: { home: home.id, destination: place.id, helper: helper?.id ?? null, ability: trial.ability ?? null, flyer: lift.flyer ? flyer.id : null },
  };
}

/** Why the lighthouse went dark, what the keeper hands over and how the light returns. */
const BEACONS = [
  { id: 'lamp', cause: 'la gran luz del faro se había apagado de repente', gift: 'un farol que nunca se apagaba', items: ['lantern'], fix: 'Pusieron el farol encendido delante del gran espejo del faro.', glow: 'El espejo multiplicó su luz, y el faro volvió a brillar sobre el mar.' },
  { id: 'crystal', cause: 'el cristal de la lámpara se había rajado con el frío', gift: 'un cristal nuevo, redondo y brillante', items: ['crystal'], fix: 'Colocaron el cristal nuevo en la lámpara, con mucho cuidado.', glow: 'La luz atravesó el cristal y se extendió sobre las olas.' },
  { id: 'bell', cause: 'la niebla era tan espesa que nadie veía la luz del faro', gift: 'una campana de mano', items: ['bell'], fix: 'Tocaron la campana una y otra vez, desde lo alto del faro.', glow: 'Los barcos siguieron el sonido de la campana entre la niebla.' },
  { id: 'key', cause: 'el viento había cerrado de golpe la puerta del faro', gift: 'la llave de repuesto', items: ['key'], fix: 'Abrieron la puerta con la llave y subieron hasta la lámpara.', glow: 'Giraron la manivela, y la luz volvió a dar vueltas sobre el mar.' },
];

/** A8 · El faro apagado: the keeper asks for help, the pair climbs the cliff and guides the boats home. */
function darkLighthouse({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const say = sayer(random);
  const home = getScene(choose(random, ['harbor', 'beach'].filter(id => fitsCast(cast, id))));
  const place = getScene('lighthouse-cliff');
  const beacon = choose(random, BEACONS);
  const keeper = copySupporting(random, 'lighthouse-keeper');
  const trial = abilityTrial(random, PLACE_INFO[place.id].trials, [f, h]);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(place.id);
  const { helper } = trial;
  const beats = [
    [
      atHome(1, say([`Al caer la tarde, ${named(h)} y su ${friendWord(f)} ${f.name} miraban el mar.`, `Una tarde de viento, ${named(h)} y su ${friendWord(f)} ${f.name} jugaban junto al agua.`]), both),
      atHome(2, home.detail),
      atHome(3, 'A lo lejos, los barcos de pesca volvían despacio hacia la orilla.'),
      atHome(1, `De repente, ${keeper.name}, el guardián del faro, llegó sin aliento: ${beacon.cause}.`, [keeper.id]),
      atHome(2, 'Sin la luz del faro, los barcos no encontrarían el camino de vuelta.'),
      atHome(3, 'A lo lejos, el viento silbaba entre las rocas.'),
      atHome(1, `${keeper.name} ya no podía subir deprisa la cuesta del acantilado, porque le dolían las rodillas.`, [keeper.id]),
      atHome(2, 'Miraba el mar muy preocupado, frotándose las manos.', [keeper.id]),
      atHome(3, `${f.name} le tomó la mano para tranquilizarlo.`, [f.id, keeper.id]),
    ],
    [
      atHome(1, `${pair} se ofrecieron a subir en su lugar.`, both),
      atHome(2, `${keeper.name} sonrió, aliviado, y les dio las gracias.`, [keeper.id]),
      atHome(3, 'Les explicó el camino con mucho detalle.', [keeper.id]),
      atHome(1, `${keeper.name} les dio ${beacon.gift}.`, [keeper.id, ...both], beacon.items),
      atHome(2, `${h.name} lo guardó con mucho cuidado.`, [h.id]),
      atHome(3, 'El cielo se oscurecía cada vez más.'),
      there(1, travelTo(place, cast, pair), both),
      there(2, place.detail),
      there(3, 'Las olas golpeaban las rocas allá abajo.'),
    ],
    [
      there(1, `Pero ${low(TRIALS[trial.id].intro)}`),
      there(2, 'Tenían que darse prisa, pero sin correr peligro.', both),
      there(3, `${h.name} respiró hondo para pensar con calma.`, [h.id]),
      there(2, trialReason(trial), helper ? [helper.id] : both),
      there(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      there(3, TRIALS[trial.id].after),
      there(1, 'Por fin llegaron a la puerta del faro.', both),
      there(2, 'La torre era alta, blanca y estaba completamente a oscuras.'),
      there(3, 'Subieron la escalera de caracol, escalón a escalón.', both),
    ],
    [
      there(1, beacon.fix, both, beacon.items),
      there(2, `${f.name} sujetaba la barandilla con fuerza.`, [f.id]),
      there(3, 'El corazón les latía muy deprisa.', both),
      there(1, beacon.glow, [], beacon.items),
      there(2, 'Desde lo alto, la luz llegaba muy lejos.'),
      there(3, `${h.name} soltó un suspiro enorme de alivio.`, [h.id]),
      there(1, 'Uno a uno, los barcos dieron la vuelta hacia el puerto.'),
      there(2, `${pair} los contaron en voz alta, para no perder ninguno.`, both),
      there(3, 'Los marineros saludaban con sus gorros desde las barcas.'),
    ],
    [
      atHome(1, `Cuando bajaron, ${keeper.name} los esperaba ${inPlace(home)}.`, [keeper.id, ...both]),
      atHome(2, 'Todos los barcos estaban ya a salvo en la orilla.'),
      atHome(3, 'Los marineros les dieron las gracias con abrazos y aplausos.', both),
      atHome(1, `${keeper.name} les dijo que aquella noche habían sido los guardianes del faro.`, [keeper.id]),
      atHome(2, `${h.name} y ${f.name} se miraron, muy orgullosos.`, both),
      atHome(3, `${f.name} le devolvió lo que les había prestado.`, [f.id, keeper.id]),
      atHome(1, say([`${h.name} aprendió que una luz pequeña puede guiar a muchos.`, `${h.name} aprendió que ayudar a tiempo puede traer a todos a casa.`]), [h.id]),
      atHome(2, 'Y que ser valiente también es pedir calma cuando hay prisa.', [h.id]),
      atHome(3, 'La luz del faro seguía girando sobre el mar.'),
    ],
    [
      atHome(1, `Desde entonces, ${pair} visitaban a ${keeper.name} cada domingo.`, [...both, keeper.id]),
      atHome(2, 'Él les enseñaba a cuidar la lámpara y a leer el mar.', [keeper.id]),
      atHome(3, 'Y les contaba historias de barcos y de tormentas.', [keeper.id]),
      atHome(1, `Aquella noche, ${h.name} miró el faro desde su ventana.`, [h.id]),
      atHome(2, 'La luz pasaba una y otra vez, como un saludo.'),
      atHome(3, 'Allá lejos, el mar estaba tranquilo.'),
      atHome(2, `${h.name} pensó en los barcos que habían vuelto a casa.`, [h.id]),
      atHome(3, `Y en lo bien que lo había hecho con ${f.name}.`, [h.id]),
      atHome(1, `Y así, con la luz del faro en la ventana, ${h.name} se durmió.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y el faro apagado`, place, extras: [keeper], questId: `beacon-${beacon.id}`, variantId: trial.id, beats,
    items: beacon.items,
    blockIds: { opening: home.id, goal: `beacon-${beacon.id}`, obstacle: trial.id, strategy: beacon.id, discovery: place.id, ending: home.id },
    roles: { home: home.id, destination: place.id, keeper: keeper.id, helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}

export const ADVENTURE_STRUCTURES = Object.freeze([
  { id: 'elixir', name: 'El elixir', generate: elixir },
  { id: 'rescue', name: 'El rescate', generate: rescue },
  // Attics and dusty maps belong to land creatures.
  { id: 'treasure-map', name: 'El mapa de tres pistas', accept: (h, f) => !needsWater([h, f]), generate: treasureMap },
  { id: 'errand', name: 'El encargo', accept: (h, f) => !needsWater([h, f]), generate: errand },
  { id: 'far-from-home', name: 'Lejos de casa', generate: farFromHome },
  { id: 'big-question', name: 'La gran pregunta', accept: (h, f) => !needsWater([h, f]), generate: bigQuestion },
  { id: 'fallen-star', name: 'La estrella caída', accept: (h, f) => !needsWater([h, f]), generate: fallenStar },
  { id: 'dark-lighthouse', name: 'El faro apagado', accept: (h, f) => !needsWater([h, f]), generate: darkLighthouse },
]);
export const ADVENTURE_GOALS = [...ELIXIRS.map(entry => entry.id), ...LOST.map(entry => entry.id), ...TREASURES.map(entry => `map-${entry.item}`), ...PARCELS.map(entry => entry.id), ...STRAYS.map(entry => entry.id), ...QUESTIONS.map(entry => entry.id),
  ...LIFTS.map(entry => `star-${entry.id}`), ...BEACONS.map(entry => `beacon-${entry.id}`)];
