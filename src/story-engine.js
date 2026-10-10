import { ACTION_PLOTS, realizeActionPlot, actionDiscovery } from './action-plots.js';
export { ACTION_PLOTS, ACTION_ADJECTIVES } from './action-plots.js';
import { SCENES } from './world-catalog.js';
export { SCENES, ITEMS, OBJECTS, WORLD_ATLASES, getScene, getItem } from './world-catalog.js';
import { CHARACTERS, CHARACTER_NAMES, getCharacter } from './character-catalog.js';
export { CHARACTERS, CHARACTER_ATLASES, CHARACTER_NAMES, getCharacter } from './character-catalog.js';
import { prepareFamilyStory, familyStoryMoment } from './family-story.js';
import { applyStoryLanguage } from './story-language.js';
import { STRATEGY_BLOCKS, OPENING_BLOCKS, DISCOVERY_BLOCKS, ENDING_BLOCKS, ADVENTURE_GOALS, ADVENTURE_OBSTACLES, ACTION_THREATS, RELAX_GOALS, RELAX_OBSTACLES, FRIEND_GOALS, FAMILY_GOALS, SOCIAL_OBSTACLES } from './story-blocks.js';
export { STORY_BLOCK_COUNTS } from './story-blocks.js';

/** Offline picture books: choose a coherent plan once, then unfold short illustrated sentences. */
export const BOOKS = Object.freeze([
  { id: 'adventure', title: 'Aventura', subtitle: 'Un pequeño viaje, un gran descubrimiento', color: '#D9B98F', symbol: '✦' },
  { id: 'action', title: 'Acción', subtitle: 'Valor, cuidado y una nueva oportunidad', color: '#DA9E96', symbol: '♜' },
  { id: 'relax', title: 'Relax', subtitle: 'Fábulas para respirar despacito', color: '#A8BDB1', symbol: '☾' },
  { id: 'friends', title: 'Amigos', subtitle: 'La alegría de hacer cosas juntos', color: '#B7AFCF', symbol: '❀' },
  { id: 'family', title: 'Mi familia', subtitle: 'Tú protagonizas los cuentos de casa', color: '#D7AD8D', symbol: '♡' },
]);

const ALL_CAST = CHARACTERS.map(character => character.id);
const ACTION_CAST = ALL_CAST.filter(id => id !== 'owl');
const CAST = {
  adventure: { heroes: ALL_CAST, companions: ALL_CAST },
  action: { heroes: ACTION_CAST, companions: ACTION_CAST },
  relax: { heroes: ALL_CAST, companions: ALL_CAST },
  friends: { heroes: ALL_CAST, companions: ALL_CAST },
};

const PLACES = SCENES;

function randomFromSeed(seed) {
  let value = 2166136261;
  for (const letter of String(seed)) {
    value ^= letter.codePointAt(0);
    value = Math.imul(value, 16777619);
  }
  return () => {
    value += 0x6D2B79F5;
    let number = Math.imul(value ^ (value >>> 15), value | 1);
    number ^= number + Math.imul(number ^ (number >>> 7), number | 61);
    return ((number ^ (number >>> 14)) >>> 0) / 4294967296;
  };
}

function freshSeed() {
  if (globalThis.crypto?.getRandomValues) {
    return Array.from(globalThis.crypto.getRandomValues(new Uint32Array(2)), value => value.toString(36)).join('-');
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const choose = (random, values) => values[Math.floor(random() * values.length)];
const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
const toPlace = place => `${place.article === 'la' ? 'a la' : 'al'} ${place.name}`;
const ofPlace = place => `${place.article === 'la' ? 'de la' : 'del'} ${place.name}`;
const thePlace = place => `${place.article === 'la' ? 'La' : 'El'} ${place.name}`;
const inPlace = place => `${place.article === 'la' ? 'en la' : 'en el'} ${place.name}`;
const isUnderwater = place => place.tags.includes('underwater');
const openingAt = (name, verb, place) => `${name} ${verb} ${isUnderwater(place) ? 'en un rincón de aire mágico' : inPlace(place)}.`;

function makeCast(bookId, random) {
  const heroId = choose(random, CAST[bookId].heroes);
  // Templates use masculine plural agreement, so each pair contains one masculine noun.
  const companionId = choose(random, CAST[bookId].companions.filter(id => id !== heroId &&
    !(getCharacter(heroId).gender === 'f' && getCharacter(id).gender === 'f')));
  const copy = id => ({ ...getCharacter(id), name: choose(random, CHARACTER_NAMES[id]), atlas: { ...getCharacter(id).atlas } });
  return { hero: copy(heroId), companion: copy(companionId) };
}

function illustrated(sentence, scene, characters = [], objects = []) {
  return { paragraphs: [sentence], scene, characters: [...new Set(characters)], objects: [...new Set(objects)] };
}

// Extra sentences sit inside each beat, before its ending, so longer books keep forward continuity.
function unfold(stages, duration) {
  const order = duration === 3 ? [0, 1, 2] : duration === 6 ? [0, 3, 4, 1, 5, 2] : [0, 6, 3, 7, 4, 1, 8, 5, 2];
  return stages.flatMap(stage => order.map(index => stage[index]));
}

function selectBlocks(random, goals, obstacles) {
  const opening = choose(random, OPENING_BLOCKS);
  const goal = choose(random, goals);
  const obstacle = choose(random, obstacles);
  const strategy = choose(random, STRATEGY_BLOCKS);
  const discovery = choose(random, DISCOVERY_BLOCKS);
  const ending = choose(random, ENDING_BLOCKS);
  return { opening, goal, obstacle, strategy, discovery, ending, strategyIndex: STRATEGY_BLOCKS.indexOf(strategy) };
}

function planFor(blocks, place, objects, lexicon) {
  return {
    version: 1,
    blockIds: Object.fromEntries(['opening', 'goal', 'obstacle', 'strategy', 'discovery', 'ending'].map(key => [key, blocks[key].id])),
    world: { destination: place.id, items: [...new Set(objects)] },
    ...(lexicon ? { lexicon } : {}),
  };
}

const collaborativeSentence = method => `${method.startsWith('uno ') ? 'Para avanzar, ' : 'Entre los dos '}${method}.`;

function adventure({ random, hero: h, companion: c, duration }) {
  const b = selectBlocks(random, ADVENTURE_GOALS, ADVENTURE_OBSTACLES);
  const { goal, lexicon } = applyStoryLanguage(random, 'adventure', b.goal);
  b.goal = goal;
  const place = choose(random, PLACES.filter(location => location.scene !== 'garden'));
  // Indoor and underwater destinations have signs to read, rather than an outdoor arroyo or fallen branch.
  if (!place.tags.includes('outdoors')) b.obstacle = ADVENTURE_OBSTACLES.find(obstacle => obstacle.id === 'faded-sign');
  const { goal: q, obstacle: o, strategy: s, discovery: d, ending: e } = b;
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = [], scene = place.scene) => illustrated(text, scene, characters, objects);
  const discoveryRoutes = {
    'tiny-test': [`${h.name} probó un sendero corto y encontró una señal del regalo.`, 'Una huella brillante confirmó que aquel sendero pequeño iba en la dirección correcta.'],
    'new-angle': [`${h.name} miró desde un banco y descubrió el regalo detrás de unas hojas.`, 'Desde abajo parecía una sombra, pero otra mirada mostró su forma verdadera.'],
    'leftover-surprise': [`${h.name} encontró un hilo olvidado que marcaba el rincón del regalo.`, 'El hilo parecía sobrante, pero seguía hasta un lugar donde alguien había descansado.'],
    'remembered-idea': [`${h.name} recordó un dibujo del jardín y reconoció el escondite del regalo.`, 'El dibujo mostraba una piedra redonda junto a una hoja con tres puntas.'],
    'shared-question': [`${h.name} preguntó a un vecino y encontró el regalo siguiendo sus indicaciones.`, 'El vecino conocía aquel rincón y explicó cómo llegar sin pisar flores nuevas.'],
    'notice-pattern': [`${h.name} siguió unas marcas repetidas hasta descubrir el rincón del regalo.`, 'Cada marca tenía tres rayitas y aparecía cerca de la siguiente curva del sendero.'],
  };
  const route = discoveryRoutes[d.id];
  const endings = {
    'draw-memory': 'Dibujaron el viaje y marcaron la parte donde una idea pequeña les había ayudado.',
    'tell-story': 'Contaron su aventura a los vecinos y dejaron un turno para cada pregunta.',
    'leave-invitation': 'Prepararon una invitación para que otros vecinos descubrieran el sendero sin hacer daño.',
    'care-corner': 'Cuidaron el banco del jardín y dejaron el regalo donde pudiera seguir ayudando.',
    'thank-you-note': 'Escribieron una nota para agradecer a quienes habían acompañado algún paso del viaje.',
    'tomorrow-plan': 'Eligieron otro rincón para visitar mañana y guardaron la cesta hasta entonces.',
  };
  const stages = [
    [
      p(`${h.name} ${b.opening.adventure}.`, [h.id], ['flower'], 'garden'),
      p(q.problem, [], q.objects, 'garden'),
      p(`${h.name} invitó a ${c.name} para buscar ${q.object}.`, both, q.objects, 'garden'),
      p(`${h.name}, ${h.article} ${h.label}, quiso ${q.wish}.`, [h.id], q.objects, 'garden'),
      p(`${c.name}, ${c.article} ${c.label}, aceptó ayudar sin decidir todos los pasos.`, [c.id], [], 'garden'),
      p('Prepararon una cesta con agua y una merienda para descansar durante el viaje.', both, ['basket'], 'garden'),
      p('El mensaje del problema tenía dibujos sencillos que podían reconocer antes de partir.', [], q.objects, 'garden'),
      p('Buscar un regalo mágico también pedía cuidar las flores que quedaban en casa.', both, ['flower'], 'garden'),
      p('Guardaron una manta ligera para hacer una pausa cuando su cuerpo lo necesitara.', both, ['blanket'], 'garden'),
    ],
    [
      p(`${h.name} y ${c.name} llegaron hasta la entrada ${ofPlace(place)}${isUnderwater(place) ? ', donde había aire mágico' : ''}.`),
      p('El lugar desconocido invitaba a avanzar despacio y mirar las señales del sendero.'),
      p(`Decidieron ${s.verb} para continuar hacia el regalo.`),
      p(place.detail, [], place.scene === 'clouds' ? ['cloud'] : []),
      p('Comprobaron dónde podían avanzar sin acercarse a un borde ni tocar flores nuevas.'),
      p(`${c.name} dejó la cesta en un banco mientras revisaban el próximo tramo.`, [c.id], ['basket']),
      p('Una señal al comienzo mostraba que el sendero tenía varias curvas pequeñas.', []),
      p(`${h.name} señaló un rincón cómodo donde podrían esperar si algo les preocupaba.`, [h.id]),
      p('El camino seguía allí aunque necesitaran pensar un rato antes de dar otro paso.'),
    ],
    [
      p(o.problem, []),
      p(collaborativeSentence(o.solutions[b.strategyIndex])),
      p(o.result),
      p(`${h.name} explicó qué parte del camino le hacía sentir un poco de preocupación.`, [h.id]),
      p(o.detail, []),
      p(s.lesson),
      p('Se quedaron en un rincón seguro mientras buscaban una forma cuidadosa de continuar.'),
      p(`${c.name} comprobó que la idea dejara un paso cómodo para ambas personas.`, [c.id]),
      p('Revisaron el resultado antes de seguir para que ninguna sorpresa los hiciera tropezar.'),
    ],
    [
      p(q.clue, [], q.objects),
      p(route[0], [h.id], q.objects),
      p(q.discovery, [], q.objects),
      p(route[1], [], q.objects),
      p(`${c.name} comprobó la forma dibujada del regalo antes de elegir el próximo sendero.`, [c.id], q.objects),
      p('Ahora conocían el escondite y también el gesto que podía despertar su magia.', both, q.objects),
      p('Una tablilla junto al sendero mostraba dibujos de varios objetos mágicos pequeños.', [], q.objects),
      p('Compararon aquellos dibujos con la pista que habían escuchado antes de empezar.', both, q.objects),
      p('La búsqueda había cambiado cuando eligieron probar una manera nueva de mirar.'),
    ],
    [
      p(`${h.name} ${q.activation}.`, [h.id], q.objects),
      p(q.magic, [], q.objects),
      p(`Guardaron ${q.object} en la cesta y volvieron al jardín para ayudar.`, both, q.objects, 'garden'),
      p(`${c.name} dejó espacio para que el gesto de cuidado pudiera terminar sin prisa.`, [c.id], q.objects),
      p('Prepararon un espacio en la cesta para proteger el regalo durante el regreso.', both, [...q.objects, 'basket']),
      p('El sendero de vuelta resultaba conocido, pero seguía necesitando los mismos pasos cuidadosos.'),
      p('Esperaron hasta reconocer la respuesta del regalo antes de guardarlo para el viaje.', both, q.objects),
      p('No necesitaban llevarse todo aquel rincón para conservar un recuerdo bonito de la búsqueda.'),
      p('Recordaron dónde estaba el banco para hacer una última pausa antes de llegar.'),
    ],
    [
      p(endings[e.id], both, q.objects, 'garden'),
      p(q.solution, both, q.objects, 'garden'),
      p(e.line, both, [], 'garden'),
      p('Los dibujos del viaje podían mostrar las decisiones que les habían permitido seguir.', [], q.objects, 'garden'),
      p(`${h.name} contó cómo había cambiado el plan al encontrar una dificultad.`, [h.id], [], 'garden'),
      p(q.detail, both, q.objects, 'garden'),
      p('El regalo necesitaba un sitio cuidado para seguir ayudando después de aquella aventura.', [], q.objects, 'garden'),
      p(`${c.name} escuchó las preguntas del jardín y compartió lo que había aprendido.`, [c.id], [], 'garden'),
      p('El viaje había terminado, pero cuidar aquel jardín seguiría siendo una tarea compartida.', both, ['flower'], 'garden'),
    ],
  ];
  return { title: `${h.name} y ${q.title}`, place, questId: q.id, variantId: o.id, plan: planFor(b, place, q.objects, lexicon), pages: unfold(stages, duration) };
}

function action({ random, hero: h, companion: c, duration }) {
  const b = selectBlocks(random, ACTION_PLOTS, ACTION_THREATS);
  const q = realizeActionPlot(b.goal, random);
  const { strategy: s, discovery: d, ending: e } = b;
  const place = choose(random, PLACES.filter(location => q.scenes.includes(location.id)));
  const guardian = { ...getCharacter('owl'), name: 'Olmo', atlas: { ...getCharacter('owl').atlas } };
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = [], scene = place.scene) => illustrated(text, scene, characters, objects);
  // Side obstacles adapt their route to a town, grove or shoreline without inventing a tower there.
  const localize = text => {
    let line = text.replaceAll('castillo', ['underwater-palace', 'clouds'].includes(place.id) ? 'palacio' : place.id === 'castle' ? 'castillo' : 'lugar')
      .replaceAll('la entrada de la torre', 'el rincón de Olmo').replaceAll('la torre', 'el rincón de Olmo');
    if (!place.tags.includes('fortress')) line = line
      .replaceAll('las cortinas', 'las decoraciones')
      .replaceAll('los pasillos', 'los caminos').replaceAll('el pasillo', 'el camino')
      .replaceAll('del pasillo', 'del camino').replaceAll('por los pasillos', 'por los caminos')
      .replaceAll('del patio', 'del lugar').replaceAll('por el patio', 'por el lugar').replaceAll('el patio', 'el rincón')
      .replaceAll('las ventanas', 'las señales').replaceAll('una ventana', 'un rincón abierto');
    return line;
  };
  const t = { ...b.obstacle };
  for (const key of ['arrival', 'obstacle', 'detail', 'battle']) t[key] = localize(t[key]);
  t.methods = t.methods.map(localize);
  const openingTags = {
    'unexpected-message': 'sin leer una nota',
    'morning-discovery': 'durante una mañana tranquila',
    'rainy-afternoon': 'antes de preguntar cómo hacerlo',
    'small-celebration': 'al preparar una pequeña celebración',
    'forgotten-question': 'sin resolver una pregunta importante',
    'helping-turn': 'al intentar ayudar con prisa',
  };
  const endings = {
    'draw-memory': 'En el jardín dibujaron un recuerdo de Olmo junto a sus flores favoritas.',
    'tell-story': 'En el jardín contaron una enseñanza de Olmo y escucharon otros recuerdos del guardián.',
    'leave-invitation': 'En el jardín dejaron una invitación para hablar de Olmo cuando alguien lo necesitara.',
    'care-corner': 'En el jardín prepararon un rincón de flores para recordar al guardián con cariño.',
    'thank-you-note': 'En el jardín escribieron una nota para agradecer todo lo que Olmo había enseñado.',
    'tomorrow-plan': 'En el jardín eligieron una tarea de cuidado para continuar las enseñanzas de Olmo.',
  };
  const stages = [
    [
      p(`${h.name} ${q.trigger} ${openingTags[b.opening.id]}.`, [h.id], q.objects),
      p(`${inPlace(place)[0].toUpperCase()}${inPlace(place).slice(1)}, ${q.problem}.`, [], q.objects),
      p(`${h.name} pidió ayuda a ${c.name} para ${q.goal}${isUnderwater(place) ? ' dentro del aire mágico' : ''}.`),
      p(q.warning, [], q.objects),
      p(`${c.name}, ${c.article} ${c.label}, escuchó lo ocurrido y propuso buscar al guardián.`, [c.id]),
      p('El viejo búho Olmo descansaba cerca y conocía cómo cuidar aquel rincón.', ['owl']),
      p(q.concern, [], q.objects),
      p(`${h.name} comprendió que preguntar primero habría ayudado a cuidar lo que quería cambiar.`, [h.id]),
      p('Decidieron buscar al guardián en vez de intentar arreglarlo todo con más prisa.'),
    ],
    [
      p(t.arrival, [], t.objects),
      p(collaborativeSentence(t.methods[b.strategyIndex]), both, [t.tool]),
      p(t.battle, both, [t.tool, ...t.objects]),
      p(`Podían usar ${t.toolLabel} para despejar el camino sin hacer daño.`, [], [t.tool]),
      p(t.obstacle, [], t.objects),
      p(s.lesson),
      p(`${h.name} comprobó que ${c.name} estuviera cerca antes de dar el siguiente paso.`),
      p('Prepararon un rincón donde la sorpresa pudiera reunirse sin estorbar a las visitas.'),
      p('Mantener un ritmo tranquilo permitía cuidar el lugar mientras buscaban al viejo guardián.'),
    ],
    [
      p(actionDiscovery(q, d.id), ['owl', ...both], q.objects),
      p(q.delivery, ['owl', h.id], q.objects),
      p('El guardián, muy anciano, aconsejó respirar tres veces y recordó que podían reparar errores.', ['owl']),
      p(`${c.name} acercó una manta al búho, que ya tenía muy poca fuerza.`, [c.id, 'owl'], ['blanket']),
      p(`${h.name} escuchó con atención cada palabra que decía el viejo guardián.`, [h.id, 'owl']),
      p(q.rehearsal, ['owl'], q.objects),
      p('Olmo tenía un rincón cómodo donde descansar mientras compartía sus palabras con las visitas.', ['owl']),
      p('Los tres hicieron una pausa para dejar que el guardián descansara entre sus palabras.', [...both, 'owl']),
      p(`${h.name} recordó que ${q.fact}.`, both, q.objects),
    ],
    [
      p('Poco después, Olmo murió en paz porque su larga vida había llegado al final.', []),
      p(`${h.name} comprendió que Olmo no volvería a despertar y sintió mucha tristeza.`, [h.id]),
      p(`${c.name} abrazó a ${h.name} y lloraron en compañía, recordando al búho con cariño.`),
      p('Aquel rincón tenía espacio para quedarse sin apresurar ninguno de sus sentimientos.', []),
      p(`${c.name} se quedó cerca para acompañar aquella tristeza sin pedir que desapareciera.`, [c.id]),
      p('Echar de menos a Olmo también era una manera de recordar cuánto lo querían.'),
      p(`${h.name} recordó la voz suave del guardián y las cosas que les había enseñado.`, [h.id]),
      p('Lo aprendido seguía en su memoria aunque el guardián ya no pudiera acompañarles.'),
      p('Un abrazo podía ayudarles a seguir cuidándose, aunque todavía sintieran ganas de llorar.'),
    ],
    [
      p(`${h.name} pidió colaboración y explicó cómo quería ${q.goal}.`, [h.id], q.objects),
      p(`Respiraron tres veces, ${q.repairAction}.`, both, q.objects),
      p(q.outcome, both, q.objects),
      p(`${c.name} ${q.assist}.`, [c.id], q.objects),
      p('El consejo de Olmo les recordaba que nadie debía hacerlo todo completamente a solas.'),
      p(q.aftercare, both, q.objects),
      p('Prepararon un sitio cómodo y libre de obstáculos antes de empezar aquella reparación.'),
      p(`${h.name} reconoció las señales del consejo antes de cambiar otra cosa con prisa.`, [h.id]),
      p(q.check, both, q.objects),
    ],
    [
      p(endings[e.id], both, ['flower'], 'garden'),
      p('Olmo no volvería, pero su consejo acompañaría cada nueva aventura de los dos amigos.', both, [], 'garden'),
      p(e.line, both, [], 'garden'),
      p(`${h.name} dejó una flor junto al banco donde podrían hablar de Olmo.`, [h.id], ['flower'], 'garden'),
      p(`${c.name} recordó que podían pedir compañía en los días alegres y en los tristes.`, [c.id], [], 'garden'),
      p(q.memory, both, q.objects, 'garden'),
      p('El jardín tenía espacio para las lágrimas y también para las pequeñas sonrisas.', [], ['flower'], 'garden'),
      p('Ayudar a otra visita sería una forma de continuar la enseñanza del viejo búho.', both, [], 'garden'),
      p('Al marcharse, avanzaron juntos dejando espacio para todos los sentimientos que todavía los acompañaban.', both, [], 'garden'),
    ],
  ];
  const plan = planFor(b, place, [...q.objects, t.tool, ...t.objects]);
  plan.action = {
    plotId: q.id, ...q.lexicon, goalObjects: [...q.objects], repairVerb: q.repairVerb, resolutionStage: 4,
  };
  return { title: `${h.name} y ${q.title}`, place, guardian, questId: q.id, variantId: t.id, plan, pages: unfold(stages, duration) };
}

function relax({ random, hero: h, companion: c, duration }) {
  const b = selectBlocks(random, RELAX_GOALS, RELAX_OBSTACLES);
  const { goal, lexicon } = applyStoryLanguage(random, 'relax', b.goal);
  b.goal = goal;
  const { goal: f, obstacle: o, strategy: s, discovery: d, ending: e } = b;
  const place = choose(random, PLACES.filter(location => f.scenes.includes(location.scene)));
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = []) => illustrated(text, place.scene, characters, objects);
  const pauseLines = [
    `${h.name} observó sus movimientos y reconoció qué parte necesitaba una pausa.`,
    `${h.name} dividió la tarea y dejó los pasos siguientes para después.`,
    `${h.name} probó parar un instante antes de volver a intentarlo.`,
    `${h.name} preguntó cómo podía seguir sin que la prisa eligiera todo.`,
  ];
  const discoveryLines = {
    'tiny-test': 'Probaron el consejo en un paso pequeño antes de intentar toda la actividad.',
    'new-angle': 'Miraron la actividad desde un sitio cómodo y reconocieron un detalle que podían cambiar.',
    'leftover-surprise': 'Dejaron a un lado lo innecesario y dieron más espacio al gesto de cuidado.',
    'remembered-idea': 'Recordaron otra tarde tranquila y recuperaron una manera de disfrutar sin hacer una carrera.',
    'shared-question': 'Preguntaron qué parte se sentía más agradable y cambiaron el plan para cuidarla.',
    'notice-pattern': 'Reconocieron cuándo aparecía la prisa y prepararon una pausa antes del siguiente paso.',
  };
  const calmDiscoveryDetails = {
    'tiny-test': ['Una prueba pequeña permitía cuidar el gesto antes de intentar toda la actividad.', 'Miraron lo ocurrido y eligieron qué parte pequeña podían volver a practicar.'],
    'new-angle': ['Un punto de vista distinto permitió reconocer una parte que antes parecía difícil.', 'Ahora veían el intento con más espacio para aprender y menos prisa por terminar.'],
    'leftover-surprise': ['Dejar una exigencia innecesaria abrió más espacio para disfrutar de lo que hacían.', 'Ya no necesitaban conseguirlo todo de golpe para reconocer un gesto de cuidado.'],
    'remembered-idea': ['Otra tarde tranquila les había enseñado que no todos los pasos necesitaban una carrera.', 'Recuperaron aquel recuerdo y lo adaptaron a la actividad que ahora tenían cerca.'],
    'shared-question': ['La pregunta encontró una respuesta sobre cómo cuidar lo que todavía les costaba.', 'Escuchar esa respuesta dejó una manera más amable de continuar con la actividad.'],
    'notice-pattern': ['Reconocer cuándo aparecía la prisa permitía preparar un gesto de cuidado antes.', 'Notaron una señal pequeña y dejaron un espacio para parar cuando volviera a aparecer.'],
  };
  const endings = {
    'draw-memory': `${h.name} dibujó la enseñanza y dejó un espacio para añadir otra mañana.`,
    'tell-story': `${h.name} contó lo que había aprendido sin pedir que pareciera una gran hazaña.`,
    'leave-invitation': `${h.name} invitó a otra persona a disfrutar aquella actividad a su propio ritmo.`,
    'care-corner': `${h.name} ordenó el rincón y dejó sus cosas listas para volver sin prisa.`,
    'thank-you-note': `${h.name} agradeció la compañía con una nota que decía cómo se había sentido.`,
    'tomorrow-plan': `${h.name} decidió qué pequeña parte le gustaría volver a probar otro día.`,
  };
  const stages = [
    [
      p(openingAt(h.name, b.opening.relax, place), [h.id]),
      p(`${h.name} quería ${f.wish}.`, [h.id], f.objects),
      p(`${c.name} se acercó para compartir aquella actividad${isUnderwater(place) ? ` ${inPlace(place)}` : ' sin decidir todos sus pasos'}.`, [c.id]),
      p(f.setup, [], f.objects),
      p(`${h.name}, ${h.article} ${h.label}, imaginó que el resultado llegaría enseguida.`, [h.id], f.objects),
      p('Eligieron un rincón donde la actividad tuviera espacio y nadie necesitara empujarse.'),
      p(place.detail, []),
      p(`${c.name}, ${c.article} ${c.label}, dejó un momento para mirar el lugar.`, [c.id]),
      p('Una tarde tranquila podía comenzar con ilusión sin convertirse en una carrera.'),
    ],
    [
      p(o.line, [h.id], f.objects),
      p(`${h.name} ${f.first}.`, [h.id], f.objects),
      p(f.mistake, [], f.objects),
      p('La idea inicial seguía siendo importante aunque todavía necesitaran aprender cómo conseguirla.'),
      p(`${c.name} escuchó lo que estaba pasando sin interrumpir ni decidir enseguida.`, [c.id]),
      p('Contar la dificultad dejaba ver qué gesto necesitaba cambiar antes de volver a probar.'),
      p(`${h.name} notó una preocupación pequeña y buscó palabras para explicar cómo se sentía.`, [h.id]),
      p('El resultado podía esperar mientras encontraban una forma más amable de continuar.'),
      p('No hacía falta esconder aquel intento para poder aprender algo de lo ocurrido.'),
    ],
    [
      p(`${h.name} suspiró y dejó de intentar arreglarlo todo durante un pequeño momento.`, [h.id]),
      p(pauseLines[b.strategyIndex], [h.id]),
      p('La pausa dejó un espacio para pensar sin convertir la tarde en una carrera.'),
      p(`${c.name} respiró despacio y mostró que también se podía parar para mirar.`, [c.id]),
      p('El aire entró suave y salió despacio mientras el cuerpo encontraba un poco de descanso.'),
      p(s.lesson),
      p('Las cosas seguían en su sitio y no necesitaban una respuesta perfecta de inmediato.', [], f.objects),
      p(`${h.name} relajó el cuerpo y miró otra vez lo que tenía cerca.`, [h.id], f.objects),
      p('Escuchar el silencio permitió reconocer lo que necesitaba tiempo y lo que necesitaba otra idea.'),
    ],
    [
      p(f.lesson, [c.id], f.objects),
      p(`${h.name} ${f.change}.`, [h.id], f.objects),
      p('La idea nueva podía practicarse aunque nadie la recordara perfectamente a cada segundo.'),
      p('Eligieron un paso pequeño y dejaron que el resultado mostrara cómo continuar.'),
      p(`${c.name} acompañó aquel intento sin hacer toda la actividad por la otra persona.`, [c.id]),
      p('La enseñanza cambió un gesto pequeño sin exigir que toda la tarde saliera perfecta.', both, f.objects),
      p('Comprender la enseñanza no obligaba a olvidar de golpe la preocupación anterior.'),
      p(`${h.name} preparó sus cosas de nuevo, dejando sitio para un ritmo diferente.`, [h.id], f.objects),
      p('La actividad todavía importaba y ahora también importaba disfrutar mientras la hacían.'),
    ],
    [
      p(discoveryLines[d.id], both, f.objects),
      p(f.outcome, [], f.objects),
      p(`${h.name} llamó al descubrimiento «${lexicon.title}» y lo compartió con ${c.name}.`),
      p(calmDiscoveryDetails[d.id][0]),
      p(f.practice, both, f.objects),
      p(calmDiscoveryDetails[d.id][1]),
      p('No todos los momentos salían iguales, pero podían reconocer una pausa que les ayudara.'),
      p(`${c.name} dejó un turno para escuchar cómo se sentía el nuevo intento.`, [c.id]),
      p('El resultado tenía valor porque habían podido aprender sin empujar las cosas.'),
    ],
    [
      p(endings[e.id], [h.id], f.objects),
      p(`${h.name} recordó una enseñanza sencilla: ${f.moral.toLocaleLowerCase('es')}.`, [h.id], f.objects),
      p(e.line),
      p('La calma había encontrado sitio a través de varios gestos pequeños de cuidado.'),
      p(`${c.name} guardó sus cosas sin apresurar los últimos pasos de aquella tarde.`, [c.id]),
      p('Mañana podían volver a aprender sin exigir que todo saliera igual que hoy.'),
      p(`${thePlace(place)} guardaba detalles pequeños que ahora podían mirar con más calma.`, []),
      p('Compartieron lo que habían aprendido dejando espacio para las palabras de cada uno.'),
      p('Una enseñanza sencilla podía acompañarlos aunque todavía quedaran muchas cosas por descubrir.'),
    ],
  ];
  return { title: `${h.name} y ${f.title}`, place, moral: `${f.moral}.`, questId: f.id, variantId: o.id, plan: planFor(b, place, f.objects, lexicon), pages: unfold(stages, duration) };
}

const listNames = members => members.length === 1 ? members[0].name : `${members.slice(0, -1).map(member => member.name).join(', ')} y ${members.at(-1).name}`;

function social({ random, hero: h, companion: c, characters, family, duration, bookId }) {
  const isFamily = bookId === 'family';
  const singleActor = isFamily && characters.filter(person => person.role !== 'baby').length === 1;
  const b = selectBlocks(random, isFamily ? FAMILY_GOALS : FRIEND_GOALS, SOCIAL_OBSTACLES);
  const { goal, lexicon } = applyStoryLanguage(random, bookId, b.goal);
  b.goal = goal;
  const { goal: a, obstacle: o, strategy: s, discovery: d, ending: e } = b;
  const place = choose(random, PLACES.filter(location => a.scenes.includes(location.scene)));
  const cast = isFamily ? characters : [h, c];
  const castForStage = () => cast.map(person => person.id);
  const p = (text, people = [h.id, ...(c.id !== h.id ? [c.id] : [])], objects = []) => illustrated(text, place.scene, people, objects);
  const phrase = (plural, singular) => singleActor ? singular : plural;
  const conjugateForActor = sentence => singleActor
    ? sentence.replace('habían imaginado', 'había imaginado').replace('No podían', 'No podía').replace(' podían probar ', ' podía probar ')
    : sentence;
  const endingKeepsake = singleActor ? a.keepsake
    .replace(/^Recogieron/, 'Recogió').replace(/^Doblaron/, 'Dobló').replace(/^Dibujaron/, 'Dibujó').replace(/^Guardaron/, 'Guardó').replace(/^Dejaron/, 'Dejó')
    .replace(/^Apagaron/, 'Apagó').replace(/^Cerraron/, 'Cerró')
    .replace(' y dejaron ', ' y dejó ').replace(' y guardaron ', ' y guardó ').replace(' y prepararon ', ' y preparó ').replace(' y doblaron ', ' y dobló ')
    .replace(' y enrollaron ', ' y enrolló ').replace(' y limpiaron ', ' y limpió ').replace('las habían encontrado', 'las había encontrado') : a.keepsake;
  const strategyLines = [
    `${h.name} miró lo disponible y propuso ${o.solution(a)}.`,
    `${h.name} ordenó los pasos y propuso ${o.solution(a)}.`,
    `${h.name} eligió probar ${o.solution(a)} antes de continuar.`,
    `${h.name} pidió ideas para ${o.solution(a)} y eligió un paso.`,
  ];
  const discoveryLines = {
    'tiny-test': `${h.name} comprobó el resultado de ${a.test}.`,
    'new-angle': `${h.name} cambió de sitio para mirar ${a.focus}.`,
    'leftover-surprise': `${h.name} aprovechó lo que quedaba para ${a.adapt}.`,
    'remembered-idea': `${h.name} recordó otro juego y decidió ${a.create}.`,
    'shared-question': `${h.name} preguntó qué ayudaría a ${a.share}.`,
    'notice-pattern': `${h.name} comparó ${a.focus} y reconoció cómo continuar.`,
  };
  const endings = {
    'draw-memory': `${h.name} dibujó el momento favorito y guardó el dibujo junto a sus cuentos.`,
    'tell-story': `${h.name} contó cómo una idea pequeña había cambiado el plan de la tarde.`,
    'leave-invitation': `${h.name} preparó una invitación para repetir el juego cuando llegara otro día.`,
    'care-corner': `${h.name} ordenó el rincón para que la próxima actividad encontrara un sitio cómodo.`,
    'thank-you-note': `${h.name} escribió un agradecimiento por los pequeños gestos de cuidado de aquella tarde.`,
    'tomorrow-plan': `${h.name} eligió una parte del juego que le gustaría probar otra mañana.`,
  };
  const introduction = isFamily
    ? `Compartirían el plan ${listNames(cast)}.`
    : `${h.name} y ${c.name} acordaron preparar la actividad${isUnderwater(place) ? ` ${inPlace(place)}` : ' en compañía'}.`;
  const stages = [
    [
      p(openingAt(h.name, b.opening[bookId], place), [h.id]),
      p(`${h.name} quería ${a.wish}.`, [h.id], a.objects),
      p(introduction, castForStage(0)),
      p(isFamily ? `${h.name} eligió el plan y dejó sitio para cambiar alguna idea.` : `${c.name} había recibido una invitación y llegó con una idea para aportar.`, [isFamily ? h.id : c.id]),
      p(phrase('Escucharon la propuesta antes de preparar las cosas que iban a necesitar.', 'Miró su propuesta antes de preparar las cosas que iba a necesitar.')),
      p(phrase('La tarde tenía espacio para distintas ideas y muchas maneras de disfrutar.', 'La tarde tenía espacio para inventar ideas y encontrar maneras de disfrutar.')),
      p(place.detail, []),
      p(phrase('Eligieron un rincón cómodo donde nadie tuviera que quedarse mirando desde lejos.', 'Eligió un rincón cómodo donde pudiera moverse sin tropezar con sus cosas.')),
      p(phrase('Un plan pequeño podía ser especial sin necesitar una celebración enorme.', 'Un plan pequeño podía ser especial sin necesitar una celebración enorme.')),
    ],
    [
      p(a.materials, [], a.objects),
      p(`${h.name} ${a.task}.`, [h.id], a.objects),
      p(isFamily ? familyStoryMoment(h, c, a, 'prepare') : a.stationary ? 'Buscaron un lugar cómodo desde donde mirar los tesoros sin tener que empujarse.' : 'Prepararon un lugar para dejar los materiales al alcance sin tener que empujarse.', castForStage(1), a.objects),
      p(phrase('Miraron lo disponible antes de decidir si hacía falta traer alguna cosa más.', 'Miró lo disponible antes de decidir si hacía falta traer alguna cosa más.')),
      p(`${h.name} escogió una tarea que podía hacer y pidió cuidado cuando lo necesitó.`, [h.id]),
      p(phrase('Había sitio para trabajar y también para cambiar una idea si aparecía otra mejor.', 'Había sitio para trabajar y también para cambiar una idea si aparecía otra mejor.')),
      p(phrase('Dejaron libre la entrada para que el rincón siguiera siendo cómodo y seguro.', 'Dejó libre la entrada para que el rincón siguiera siendo cómodo y seguro.')),
      p(phrase('Cada paso tenía valor aunque no terminara siendo la parte más vistosa del plan.', 'Cada paso tenía valor aunque no terminara siendo la parte más vistosa del plan.')),
      p(phrase('Antes del siguiente paso, comprobaron que podían alcanzar lo necesario sin hacer una carrera.', 'Antes del siguiente paso, comprobó que podía alcanzar lo necesario sin hacer una carrera.')),
    ],
    [
      p(conjugateForActor(o.line), castForStage(2), a.objects),
      p(strategyLines[b.strategyIndex], [h.id], a.objects),
      p('La propuesta resolvía la dificultad y dejaba sitio para disfrutar.'),
      p(`${h.name} explicó qué parte le preocupaba sin esconder las ganas de seguir.`, [h.id]),
      p(conjugateForActor(a.stationary && o.id === 'small-space' ? 'Cambiar el lugar de observación dejaba espacio sin mover los tesoros del mar.' : o.clue), [], a.objects),
      p(s.lesson),
      p(phrase('Una pausa dejó espacio para mirar el problema sin echarle la culpa a nadie.', 'Una pausa dejó espacio para mirar el problema sin regañarse por el intento.')),
      p(phrase('Podían probar una solución pequeña antes de cambiar todo lo que habían preparado.', 'Podía probar una solución pequeña antes de cambiar todo lo que había preparado.')),
      p(phrase('Un intento diferente seguía siendo una forma de cuidar el plan que les importaba.', 'Un intento diferente seguía siendo una forma de cuidar el plan que le importaba.')),
    ],
    [
      p(`${h.name} empezó a ${o.solution(a)}.`, [h.id], a.objects),
      p('El primer paso dejó un cambio que todavía necesitaba cuidado.', castForStage(3)),
      p(isFamily ? familyStoryMoment(h, c, a, 'progress') : 'Continuaron sin pedir que todo saliera perfecto al primer intento de aquella idea.', castForStage(3), a.objects),
      p(a.stationary ? phrase('Ajustaron su lugar de observación y dejaron los tesoros del mar en su sitio.', 'Ajustó su lugar de observación y dejó los tesoros del mar en su sitio.') : phrase('Ajustaron la posición de sus cosas para que el rincón siguiera resultando cómodo.', 'Ajustó la posición de sus cosas para que el rincón siguiera resultando cómodo.'), castForStage(3), a.objects),
      p(`${h.name} reconoció una parte que funcionaba y decidió conservarla en el plan.`, [h.id]),
      p(phrase('Lo que salió distinto podía enseñar algo útil para el siguiente paso.', 'Lo que salió distinto podía enseñar algo útil para el siguiente paso.')),
      p(a.stationary ? phrase('Dejaron los tesoros donde estaban y prepararon un rincón para guardar sus dibujos.', 'Dejó los tesoros donde estaban y preparó un rincón para guardar sus dibujos.') : phrase('Dejaron los materiales que todavía servían en un sitio donde pudieran verlos.', 'Dejó los materiales que todavía servían en un sitio donde pudiera verlos.'), [], a.objects),
      p(phrase('Ninguna idea tenía que ganar para que la tarde pudiera seguir siendo agradable.', 'Ninguna idea tenía que ser perfecta para que la tarde siguiera siendo agradable.')),
      p(phrase('Trabajaron a un ritmo cómodo y reservaron un espacio para descansar si hacía falta.', 'Trabajó a un ritmo cómodo y reservó un espacio para descansar si hacía falta.')),
    ],
    [
      p(discoveryLines[d.id], [h.id], a.objects),
      p(a.result, castForStage(4), a.objects),
      p(`${h.name} llamó «${lexicon.title}» al proyecto.`),
      p(d.setup, castForStage(4)),
      p(`${h.name} señaló un detalle que había aparecido al probar de otra manera.`, [h.id], a.objects),
      p(singleActor ? 'Miró el resultado despacio y decidió qué parte quería conservar para otro intento.' : d.follow),
      p(phrase('Una sorpresa pequeña podía formar parte del resultado sin arruinar lo que habían hecho.', 'Una sorpresa pequeña podía formar parte del resultado sin arruinar lo que había hecho.')),
      p(phrase('Se detuvieron a disfrutar antes de pensar en recoger o empezar otra actividad.', 'Se detuvo a disfrutar antes de pensar en recoger o empezar otra actividad.')),
      p(phrase('La tarde no necesitaba una tarea nueva para que aquel momento tuviera valor.', 'La tarde no necesitaba una tarea nueva para que aquel momento tuviera valor.')),
    ],
    [
      p(endings[e.id], castForStage(5), a.objects),
      p(endingKeepsake, castForStage(5), a.objects),
      p(isFamily ? familyStoryMoment(h, c, a, 'finish') : e.line, castForStage(5), isFamily ? a.objects : []),
      p(phrase('Recogieron el rincón para dejar el camino libre y un sitio para otra idea.', 'Recogió el rincón para dejar el camino libre y un sitio para otra idea.')),
      p(`${h.name} eligió qué recuerdo le gustaría guardar de aquella tarde.`, [h.id]),
      p(phrase('Habían encontrado una forma de disfrutar dejando sitio para ideas y sentimientos diferentes.', 'Había encontrado una forma de disfrutar dejando sitio para sus ideas y sentimientos.')),
      p(phrase('Miraron debajo del banco por si alguna cosa pequeña había quedado olvidada.', 'Miró debajo del banco por si alguna cosa pequeña había quedado olvidada.')),
      p(phrase('Otro día podrían repetir el juego o encontrar una idea completamente nueva.', 'Otro día podría repetir el juego o encontrar una idea completamente nueva.')),
      p(phrase('No hacía falta decidir enseguida la próxima actividad para guardar un recuerdo bonito.', 'No hacía falta decidir enseguida la próxima actividad para guardar un recuerdo bonito.')),
    ],
  ];
  const plan = planFor(b, place, a.objects, lexicon);
  if (isFamily) plan.family = { companionRole: c.role };
  return { title: `${h.name} y ${c.name}: ${a.title}`, place, questId: a.id, variantId: o.id, plan, ...(isFamily ? { family } : {}), pages: unfold(stages, duration) };
}

const GENERATORS = { adventure, action, relax, friends: social, family: social };

/** Duration changes the unfolding, never the plan, cast or family appearance snapshot. */
export function generateStory(bookId, duration = 3, seed, options = {}) {
  if (!Object.hasOwn(GENERATORS, bookId)) throw new RangeError(`Unknown book: ${bookId}`);
  const minutes = Number(duration);
  if (![3, 6, 9].includes(minutes)) throw new RangeError('Choose a reading duration of 3, 6 or 9 minutes.');
  const storySeed = seed === undefined ? freshSeed() : String(seed);
  const random = randomFromSeed(`${bookId}:${storySeed}`);
  const familyCast = bookId === 'family' ? prepareFamilyStory(options?.family, { companionRole: options?.companionRole, random }) : undefined;
  const family = familyCast?.family;
  const cast = familyCast || makeCast(bookId, random);
  const story = GENERATORS[bookId]({ random, ...cast, family, duration: minutes, bookId });
  const id = `${bookId}-${minutes}-${encodeURIComponent(storySeed)}`;
  const pages = story.pages.map((page, index) => ({ id: `${id}-page-${index + 1}`, ...page }));
  return {
    format: 'picturebook-v2', id, bookId, duration: minutes, seed: storySeed,
    title: story.title, hero: cast.hero, companion: cast.companion, place: story.place,
    characters: [...(cast.characters || [cast.hero, cast.companion]), ...(story.guardian ? [story.guardian] : [])],
    ...(story.guardian ? { guardian: story.guardian } : {}),
    ...(story.family ? { family: story.family } : {}),
    questId: story.questId, variantId: story.variantId, plan: story.plan,
    ...(story.moral ? { moral: story.moral } : {}),
    createdAt: new Date().toISOString(), pages,
    wordCount: pages.reduce((sum, page) => sum + countWords(page.paragraphs[0]), 0),
  };
}
