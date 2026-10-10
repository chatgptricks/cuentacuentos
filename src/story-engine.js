/** Offline picture books: choose a coherent plan once, then unfold short illustrated sentences. */
export const BOOKS = Object.freeze([
  { id: 'adventure', title: 'Aventura', subtitle: 'Un pequeño viaje, un gran descubrimiento', color: '#D9B98F', symbol: '✦' },
  { id: 'action', title: 'Acción', subtitle: 'Valor, cuidado y una nueva oportunidad', color: '#DA9E96', symbol: '♜' },
  { id: 'relax', title: 'Relax', subtitle: 'Fábulas para respirar despacito', color: '#A8BDB1', symbol: '☾' },
  { id: 'friends', title: 'Amigos', subtitle: 'La alegría de hacer cosas juntos', color: '#B7AFCF', symbol: '❀' },
]);

export const CHARACTERS = Object.freeze([
  { id: 'fox', name: 'Lila', label: 'zorrita', article: 'la', gender: 'f', atlas: { x: 0, y: 0 }, sound: 'fox' },
  { id: 'mouse', name: 'Tino', label: 'ratón', article: 'el', gender: 'm', atlas: { x: 1, y: 0 }, sound: 'mouse' },
  { id: 'rabbit', name: 'Nube', label: 'coneja', article: 'la', gender: 'f', atlas: { x: 2, y: 0 }, sound: 'rabbit' },
  { id: 'bear', name: 'Bruno', label: 'oso', article: 'el', gender: 'm', atlas: { x: 3, y: 0 }, sound: 'bear' },
  { id: 'knight', name: 'Vera', label: 'caballera', article: 'la', gender: 'f', atlas: { x: 0, y: 1 }, sound: 'knight' },
  { id: 'wizard', name: 'Luma', label: 'maga', article: 'la', gender: 'f', atlas: { x: 1, y: 1 }, sound: 'wizard' },
  { id: 'dragon', name: 'Chispa', label: 'dragón', article: 'el', gender: 'm', atlas: { x: 2, y: 1 }, sound: 'dragon' },
  { id: 'owl', name: 'Olmo', label: 'búho', article: 'el', gender: 'm', atlas: { x: 3, y: 1 }, sound: 'owl' },
  { id: 'squirrel', name: 'Tila', label: 'ardilla', article: 'la', gender: 'f', atlas: { sheet: 'extra', x: 0, y: 0 }, sound: 'squirrel' },
  { id: 'frog', name: 'Rita', label: 'rana', article: 'la', gender: 'f', atlas: { sheet: 'extra', x: 1, y: 0 }, sound: 'frog' },
  { id: 'turtle', name: 'Tula', label: 'tortuga', article: 'la', gender: 'f', atlas: { sheet: 'extra', x: 0, y: 1 }, sound: 'turtle' },
  { id: 'fairy', name: 'Aura', label: 'hada', article: 'el', gender: 'f', atlas: { sheet: 'extra', x: 1, y: 1 }, sound: 'fairy' },
].map(character => Object.freeze({ ...character, atlas: Object.freeze(character.atlas) })));

export const OBJECTS = Object.freeze([
  { id: 'seed', label: 'semilla de luz' }, { id: 'bell', label: 'campanita de luna' },
  { id: 'drop', label: 'gota cantora' }, { id: 'feather', label: 'pluma de lluvia' },
  { id: 'key', label: 'llave' }, { id: 'umbrella', label: 'paraguas' },
  { id: 'cloud', label: 'nube' }, { id: 'yarn', label: 'ovillo de lana' },
  { id: 'blanket', label: 'manta' }, { id: 'basket', label: 'cesta' },
  { id: 'flower', label: 'flor' }, { id: 'boat', label: 'barquito' },
]);

const NAMES = {
  fox: ['Lila', 'Alba', 'Mora', 'Mila', 'Duna'],
  mouse: ['Tino', 'Teo', 'Nico', 'Milo', 'Pipo'],
  rabbit: ['Nube', 'Luna', 'Ada', 'Lola', 'Nina'],
  bear: ['Bruno', 'Beto', 'Taro', 'Rulo', 'Leo'],
  knight: ['Vera', 'Inés', 'Cora', 'Eva', 'Sara'],
  wizard: ['Luma', 'Celia', 'Iris', 'Elia', 'Violeta'],
  dragon: ['Chispa', 'Tizón', 'Toto', 'Sol', 'Fuego'],
  owl: ['Olmo', 'Abel', 'Oto', 'Sabio', 'Bú'],
  squirrel: ['Tila', 'Avellana', 'Canela', 'Nela', 'Pina'],
  frog: ['Rita', 'Brisa', 'Gota', 'Lina', 'Tina'],
  turtle: ['Tula', 'Menta', 'Uma', 'Oliva', 'Lenta'],
  fairy: ['Aura', 'Estela', 'Flora', 'Alina', 'Vela'],
};

const ALL_CAST = Object.keys(NAMES);
const CAST = {
  adventure: { heroes: ALL_CAST, companions: ALL_CAST },
  action: { heroes: ['knight', 'dragon', 'fox', 'rabbit', 'fairy'], companions: ['bear', 'mouse', 'wizard', 'squirrel', 'frog', 'turtle'] },
  relax: { heroes: ['fox', 'mouse', 'rabbit', 'bear', 'squirrel', 'frog', 'turtle'], companions: ['owl', 'rabbit', 'mouse', 'bear', 'squirrel', 'frog', 'turtle', 'fairy'] },
  friends: { heroes: ALL_CAST, companions: ALL_CAST },
};

const PLACES = [
  { id: 'forest', name: 'Bosque de las Campanillas', scene: 'forest', detail: 'Las hojas redondas del bosque susurraban al pasar una brisa pequeña.' },
  { id: 'lake', name: 'Lago de la Luna', scene: 'lake', detail: 'La luna se miraba en el lago y pintaba un camino plateado.' },
  { id: 'castle', name: 'Castillo de las Nubes', scene: 'castle', detail: 'Las torres del castillo parecían tazas enormes con sombreros de colores.' },
  { id: 'garden', name: 'Jardín de los Abrazos', scene: 'garden', detail: 'Las flores del jardín crecían junto a caminos suaves y bancos pequeños.' },
  { id: 'beach', name: 'Playa de las Conchitas', article: 'la', scene: 'beach', detail: 'Las olas dejaban conchitas lisas sobre una playa de arena muy suave.' },
  { id: 'mountain', name: 'Montaña del Eco', article: 'la', scene: 'mountain', detail: 'La montaña respondía al saludo con un eco pequeño y muy amable.' },
  { id: 'treehouse', name: 'Refugio del Árbol', scene: 'treehouse', detail: 'La casita del árbol tenía ventanas redondas y una escalera de madera.' },
  { id: 'village', name: 'Pueblito de los Faroles', scene: 'village', detail: 'Las casas pequeñas dejaban un camino ancho entre sus puertas de colores.' },
  { id: 'meadow', name: 'Prado de las Mariposas', scene: 'meadow', detail: 'Las mariposas visitaban flores pequeñas en un prado lleno de hierba suave.' },
  { id: 'cave', name: 'Refugio de las Lucecitas', scene: 'cave', detail: 'La cueva brillaba con lucecitas cálidas y tenía una entrada amplia y amable.' },
  { id: 'river', name: 'Río de los Susurros', scene: 'river', detail: 'El río contaba una canción pequeña mientras pasaba junto a piedras redondas.' },
  { id: 'clouds', name: 'Reino de las Nubes', scene: 'clouds', detail: 'Las nubes parecían cojines enormes en un reino de caminos suaves y mágicos.' },
];

const QUESTS = [
  {
    id: 'seed', object: 'la semilla de luz', title: 'la semilla de luz',
    problem: 'El árbol del jardín había perdido los colores de sus hojas.',
    wish: 'devolver los colores al árbol',
    clue: 'La semilla de luz brillaba cuando alguien pedía ayuda con cariño.',
    discovery: 'Una semilla dorada descansaba entre dos piedras, pequeña como una lenteja.',
    magic: 'La semilla de luz brilló cuando escuchó aquella petición tan amable.',
    solution: 'Plantaron la semilla de luz y el árbol recuperó sus colores.',
  },
  {
    id: 'bell', object: 'la campanita de luna', title: 'la campanita de luna',
    problem: 'Las luciérnagas del jardín habían olvidado el camino hasta su casa.',
    wish: 'guiar a las luciérnagas hasta casa',
    clue: 'La campanita de luna sonaba cuando alguien escuchaba con mucha atención.',
    discovery: 'Una campanita plateada descansaba sobre una hoja, pequeña como una nuez.',
    magic: 'La campanita de luna respondió con un tilín suave como una estrella.',
    solution: 'Colgaron la campanita y las luciérnagas siguieron su canción hasta casa.',
  },
  {
    id: 'drop', object: 'la gota cantora', title: 'la gota cantora',
    problem: 'La fuente del jardín tenía agua, pero había olvidado su canción.',
    wish: 'devolver la canción a la fuente',
    clue: 'La gota cantora despertaba cuando alguien compartía una canción sencilla.',
    discovery: 'Una gota azul temblaba dentro de una hoja, redonda como una canica.',
    magic: 'La gota cantora respondió con una nota pequeña, clara y alegre.',
    solution: 'Dejaron la gota en la fuente y el agua volvió a cantar.',
  },
  {
    id: 'feather', object: 'la pluma de lluvia', title: 'la pluma de lluvia',
    problem: 'Las flores del jardín tenían sed después de tantos días sin lluvia.',
    wish: 'traer lluvia suave para las flores',
    clue: 'La pluma de lluvia llamaba nubes cuando alguien cuidaba una flor.',
    discovery: 'Una pluma azul descansaba sobre una piedra, liviana como un suspiro.',
    magic: 'La pluma de lluvia se levantó y señaló una pequeña nube blanca.',
    solution: 'La pluma llamó una nube y una lluvia suave refrescó las flores.',
  },
];

const OBSTACLES = [
  {
    id: 'bridge', name: 'El puente de las hojas',
    problem: 'Una tabla suelta detenía el camino sobre un arroyo muy pequeño.',
    idea: 'buscar una rama firme para sujetar la tabla',
    detail: 'La rama era larga, pero entre dos manos resultaba fácil moverla.',
    attempt: 'sujetaron la tabla con una rama desde la orilla',
    result: 'El puente quedó firme y pudieron cruzar juntos, dando pasos pequeños.',
    lesson: 'Arreglar un camino también era una manera de avanzar con valentía.',
  },
  {
    id: 'gate', name: 'La puerta enredada',
    problem: 'Unas ramas enredadas no dejaban abrir una puerta baja del camino.',
    idea: 'apartar las ramas sin romper sus hojas nuevas',
    detail: 'Entre las ramas había hojas pequeñas que todavía necesitaban seguir creciendo.',
    attempt: 'apartaron las ramas una por una, con manos cuidadosas',
    result: 'La puerta se abrió y las hojas nuevas quedaron a salvo.',
    lesson: 'Las manos cuidadosas encontraban salidas que la fuerza no podía abrir.',
  },
  {
    id: 'mist', name: 'La niebla de algodón',
    problem: 'Una niebla suave escondía las señales del camino bajo su manta blanca.',
    idea: 'esperar en una piedra hasta poder ver las señales',
    detail: 'El aire empezaba a mover la niebla hacia la parte baja del camino.',
    attempt: 'esperaron sobre una piedra hasta que apareció la señal',
    result: 'La niebla dejó libre el camino y pudieron continuar sin perderse.',
    lesson: 'Esperar un poquito también podía ayudar a llegar bien al destino.',
  },
];

const THREATS = [
  {
    id: 'whirls', objects: ['cloud'], tool: 'umbrella',
    arrival: 'Entraron remolinos traviesos que hicieron bailar las sillas y las banderas.',
    obstacle: 'Los remolinos rodearon el patio, levantando una montaña de hojas secas.',
    toolLine: 'Un paraguas grande podía apartar aquellos remolinos sin hacerles ningún daño.',
    battle: 'El paraguas detuvo los remolinos y dejó un camino libre hacia la torre.',
    detail: 'Los remolinos parecían enormes, pero por dentro solo tenían aire juguetón.',
    extra: 'Un remolino pequeño quiso esconderse detrás del paraguas para hacer cosquillas.',
    end: 'Los remolinos se volvieron brisas pequeñas y salieron por las ventanas.',
  },
  {
    id: 'paper', objects: [], tool: 'yarn',
    arrival: 'Las armaduras de papel empezaron a desfilar por los pasillos del castillo.',
    obstacle: 'Las armaduras de papel bloquearon el patio haciendo ruido con sus botas.',
    toolLine: 'Un ovillo de lana podía llamar su atención sin hacerles daño.',
    battle: 'Las armaduras siguieron el ovillo de lana y dejaron libre el camino.',
    detail: 'Aquellas armaduras eran ligeras y no podían doblar bien sus rodillas.',
    extra: 'Una armadura se detuvo a mirar cómo rodaba el ovillo amarillo.',
    end: 'Las armaduras volvieron a ser adornos de papel, ligeros y quietecitos.',
  },
  {
    id: 'clouds', objects: ['cloud'], tool: 'umbrella',
    arrival: 'Unas nubes de polvo hicieron estornudar a las cortinas del castillo.',
    obstacle: 'Las nubes de polvo taparon el patio y jugaron a crecer y encoger.',
    toolLine: 'El paraguas abierto serviría para empujar el aire con mucho cuidado.',
    battle: 'El paraguas movió el aire y apartó las nubes del camino.',
    detail: 'Las nubes hacían cosquillas en las narices, como plumas muy suaves.',
    extra: 'Una nube diminuta se escondió dentro de una taza junto al patio.',
    end: 'Las nubes se hicieron pequeñas y quedaron guardadas en una caja.',
  },
];

const FABLES = [
  {
    id: 'patience', title: 'la semilla sin prisa', scenes: ['garden', 'meadow', 'village', 'treehouse'], objects: ['seed', 'flower'],
    start: 'quería plantar una semilla y ver una flor esa tarde',
    setup: 'La semilla esperaba en una maceta con tierra suave y húmeda.',
    first: 'miró la tierra muchas veces, pero no apareció ninguna hoja',
    mistake: 'Más agua no haría crecer la semilla antes de tiempo.',
    lesson: 'Una semilla necesita cariño, luz y tiempo para poder crecer.',
    change: 'decidió esperar y regar solo cuando la tierra lo necesitara',
    practice: 'La tierra seguía húmeda, así que la jarrita podía esperar otro día.',
    care: 'Un cartelito junto a la maceta decía que allí crecía algo pequeño.',
    later: 'Pasaron varios días tranquilos, con un poquito de cuidado cada mañana.',
    outcome: 'Una mañana apareció una hojita verde, pequeña como una promesa de flor.',
    moral: 'Las cosas que crecen necesitan tiempo y cariño',
    observation: 'Cada planta tenía su propia forma y su propio ritmo para crecer.',
  },
  {
    id: 'listening', title: 'la canción más bajita', scenes: ['lake'], objects: ['drop', 'blanket'],
    start: 'quería escuchar los sonidos pequeños del lago bajo la luna',
    setup: 'Una manta esperaba junto al lago, lejos de la orilla del agua.',
    first: 'cantó tan fuerte que no pudo escuchar los sonidos pequeños',
    mistake: 'Cantar todavía más fuerte tampoco dejaba escuchar la canción del lago.',
    lesson: 'Para escuchar algo bajito, podemos dejar un espacio de silencio.',
    change: 'guardó silencio un momento y prestó atención a su alrededor',
    practice: 'El agua hizo tres burbujas y una rana respondió desde lejos.',
    care: 'La manta dejó un rincón cómodo para escuchar sin acercarse al agua.',
    later: 'Escucharon por turnos, sin gritar cuando descubrían algún sonido nuevo.',
    outcome: 'Una gota cantó sobre una hoja y los juncos respondieron suavemente.',
    moral: 'Escuchar con calma nos ayuda a descubrir cosas pequeñas',
    observation: 'Los juncos rozaban sus hojas y hacían un sonido como papel suave.',
  },
  {
    id: 'rest', title: 'aprende a descansar', scenes: ['garden', 'meadow', 'mountain', 'clouds'], objects: ['cloud', 'blanket'],
    start: 'quería dibujar todas las nubes antes de que cambiaran de forma',
    setup: 'Una manta y varios lápices esperaban en un rincón muy tranquilo.',
    first: 'dibujó deprisa y sintió que la mano empezaba a cansarse',
    mistake: 'El cielo cambiaba más rápido que el lápiz sobre el papel.',
    lesson: 'Descansar también forma parte de hacer algo que nos gusta.',
    change: 'dejó el lápiz y descansó un ratito sobre la manta',
    practice: 'Los dedos descansaron mientras una mariposa pasó despacio sobre la manta.',
    care: 'Los lápices quedaron guardados para que ninguno rodara sobre la manta.',
    later: 'Miraron las nubes sin intentar atraparlas todas dentro de un dibujo.',
    outcome: 'Una nube parecía un barco y bastó dibujar aquella con alegría.',
    moral: 'Una pausa puede ayudarnos a disfrutar de nuevo',
    observation: 'Una nube parecía una cuchara y después se convirtió en montaña.',
  },
  {
    id: 'sharing', title: 'la cesta compartida', scenes: ['forest', 'village', 'meadow'], objects: ['basket'],
    start: 'quería guardar todas las moras para su propia merienda',
    setup: 'Una cesta y dos cuencos esperaban junto a las moras maduras.',
    first: 'llenó la cesta y quiso cargarla sin pedir ninguna ayuda',
    mistake: 'La cesta pesaba demasiado y el otro cuenco seguía completamente vacío.',
    lesson: 'Compartir hace más ligera una cesta y más alegre una merienda.',
    change: 'repartió las moras y pidió ayuda para llevar la cesta',
    practice: 'Una mora para cada cuenco iba repartiendo la merienda poco a poco.',
    care: 'Algunas moras maduras quedaron en las ramas para los pájaros del bosque.',
    later: 'La cesta viajaba entre dos manos y ya no parecía tan pesada.',
    outcome: 'Los dos cuencos se llenaron y la merienda supo todavía más rica.',
    moral: 'Cuando compartimos, también crece la alegría',
    observation: 'Las moras verdes se quedaron en las ramas para poder seguir madurando.',
  },
];

const ACTIVITIES = [
  {
    id: 'picnic', title: 'la merienda entre flores', scenes: ['garden', 'meadow', 'beach', 'village'], objects: ['blanket', 'basket'],
    plan: 'preparar una merienda entre unas flores pequeñas',
    materials: 'La manta, los cuencos y una cesta de fruta estaban listos.',
    taskHero: 'lavó las frutas antes de empezar a preparar la merienda',
    taskCompanion: 'extendió la manta para dejar un sitio cómodo donde sentarse',
    problem: 'Solo había una servilleta y los dos querían usarla para su cuenco.',
    idea: 'Pusieron los dos cuencos juntos en el centro de la misma servilleta.',
    detail: 'Los trocitos de fruta parecían un jardín de colores dentro del cuenco.',
    challenge: 'Una brisa levantó la manta y la cesta ayudó a sujetarla.',
    result: 'Compartieron frutas y nombres divertidos para las nubes de aquella tarde.',
    keepsake: 'Guardaron la servilleta doblada como una flor después de su merienda.',
    variation: 'elegir una fruta para cada color de aquella pequeña merienda',
  },
  {
    id: 'boats', title: 'los barquitos de hojas', scenes: ['garden', 'meadow', 'river'], objects: ['boat', 'flower'],
    plan: 'hacer barquitos de hojas junto a un charquito pequeño',
    materials: 'Las hojas caídas y unas flores pequeñas estaban listas para los barquitos.',
    taskHero: 'eligió hojas grandes para que los barquitos pudieran flotar bien',
    taskCompanion: 'buscó flores pequeñas para adornar los barquitos de hojas',
    problem: 'Solo quedaba una flor amarilla y los dos querían ponerla en su barquito.',
    idea: 'Pusieron sus barquitos juntos para compartir la flor entre los dos.',
    detail: 'Las hojas parecían barquitos dormidos esperando sobre la superficie del charquito.',
    challenge: 'Una hoja se dobló y otra hoja más firme ayudó a sostenerla.',
    result: 'Los barquitos flotaron juntos y compartieron una flor como un pequeño sol.',
    keepsake: 'Recogieron los barquitos del charquito y guardaron la flor entre dos hojas.',
    variation: 'elegir un nombre divertido para cada uno de sus barquitos',
  },
  {
    id: 'flowers', title: 'las flores de papel', scenes: ['garden', 'treehouse', 'village', 'meadow'], objects: ['flower', 'basket'],
    plan: 'hacer flores de papel para decorar una cesta',
    materials: 'Una cesta y papeles de colores estaban listos sobre el banco.',
    taskHero: 'dibujó pétalos redondos en un papel de color suave',
    taskCompanion: 'dobló hojas de papel para ponerlas junto a las flores',
    problem: 'Solo quedaba un papel amarillo y los dos querían hacer su flor con él.',
    idea: 'Doblaron el papel por la mitad y compartieron sus dos partes.',
    detail: 'Cada flor tenía pétalos distintos, pero todas cabían dentro de la cesta.',
    challenge: 'Un pétalo se dobló y quedó como una flor que saludaba.',
    result: 'La cesta se llenó de flores diferentes, hechas con sus dos ideas.',
    keepsake: 'Dejaron la cesta de flores junto al banco para alegrar aquel rincón.',
    variation: 'inventar un pétalo distinto para cada una de sus flores',
  },
  {
    id: 'blanket', title: 'la casita de manta', scenes: ['garden', 'treehouse', 'village'], objects: ['blanket'],
    plan: 'hacer una casita de manta en un rincón tranquilo',
    materials: 'Una manta ligera y dos cojines estaban listos junto al banco.',
    taskHero: 'extendió una esquina de la manta sobre el banco bajito',
    taskCompanion: 'colocó los cojines para dejar un rincón cómodo dentro de la casita',
    problem: 'Los dos querían sentarse en el mismo lado de la casita.',
    idea: 'Movieron los cojines para dejar dos lugares cómodos, uno junto al otro.',
    detail: 'La manta dejaba pasar una luz suave, como una nube de tela.',
    challenge: 'Una esquina se soltó y la acomodaron juntos otra vez sobre el banco.',
    result: 'La casita tuvo sitio para los dos y para una pequeña merienda.',
    keepsake: 'Doblaron la manta y guardaron los cojines después de disfrutar su casita.',
    variation: 'inventar un nombre para su pequeña casita de manta',
  },
];

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
export const getCharacter = id => CHARACTERS.find(character => character.id === id);

function makeCast(bookId, random) {
  const heroId = choose(random, CAST[bookId].heroes);
  // Templates use masculine plural agreement, so each pair contains one masculine noun.
  const companionId = choose(random, CAST[bookId].companions.filter(id => id !== heroId &&
    !(getCharacter(heroId).gender === 'f' && getCharacter(id).gender === 'f')));
  const copy = id => ({ ...getCharacter(id), name: choose(random, NAMES[id]), atlas: { ...getCharacter(id).atlas } });
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

function adventure({ random, hero: h, companion: c, duration }) {
  const quest = choose(random, QUESTS);
  const obstacle = choose(random, OBSTACLES);
  const place = choose(random, PLACES.filter(location => location.scene !== 'garden'));
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = [], scene = place.scene) => illustrated(text, scene, characters, objects);
  const stages = [
    [
      p(`${h.name}, ${h.article} ${h.label}, vivía junto a un jardín lleno de flores y caminos pequeños.`, [h.id], ['flower'], 'garden'),
      p(quest.problem, [], quest.id === 'feather' ? ['flower'] : [], 'garden'),
      p(`${h.name} invitó a ${c.name} para buscar ${quest.object} y ${quest.wish}.`, both, [quest.id], 'garden'),
      p(`${h.name} paseaba cada mañana para saludar a quienes vivían cerca del jardín.`, [h.id], [], 'garden'),
      p(`${c.name}, ${c.article} ${c.label}, conocía las historias antiguas que contaban los vecinos.`, [c.id], [], 'garden'),
      p(`Los dos prepararon una cesta con agua y una merienda para compartir durante el viaje.`, both, ['basket'], 'garden'),
      p(`Una flor inclinó la cabeza cuando ${h.name} pasó despacio junto al banco.`, [h.id], ['flower'], 'garden'),
      p(`${c.name} recordó que aquel regalo mágico podía ayudar al jardín a recuperar su alegría.`, [c.id], [quest.id], 'garden'),
      p(`También guardaron una manta ligera para descansar cuando sus pasos necesitaran una pausa.`, both, ['blanket'], 'garden'),
    ],
    [
      p(`${h.name} y ${c.name} llegaron hasta la entrada ${ofPlace(place)}.`),
      p(`${h.name} sintió mariposas en la barriga y tomó la mano de ${c.name}.`),
      p(`Cruzaron juntos la entrada y el jardín quedó atrás mientras empezaba su pequeña aventura.`),
      p(place.detail, [], place.scene === 'clouds' ? ['cloud'] : []),
      p(`${c.name} miró el camino con atención para elegir dónde dar el próximo paso.`, [c.id]),
      p(`Estar en compañía hacía que aquel lugar desconocido pareciera un poquito más amable.`),
      p(`${h.name} descubrió una flor diminuta creciendo al lado de la entrada.`, [h.id], ['flower']),
      p(`Se detuvieron para mirar el lugar sin dejar que la prisa eligiera por ellos.`),
      p(`${c.name} apretó aquella mano suavemente para recordar que ninguno caminaría a solas.`),
    ],
    [
      p(obstacle.problem, []),
      p(`${c.name} propuso ${obstacle.idea} y ${h.name} aceptó intentarlo en compañía.`),
      p(`Entre los dos ${obstacle.attempt} y el camino volvió a quedar libre.`),
      p(`${h.name} miró alrededor para comprender qué parte del camino necesitaba más cuidado.`, [h.id]),
      p(obstacle.detail, []),
      p(`Trabajaron despacio y se avisaron antes de mover algo para que ambos estuvieran seguros.`),
      p(`Una pausa les permitió escuchar el aire antes de elegir cómo continuar juntos.`),
      p(`${c.name} señaló el lugar más cómodo para esperar mientras preparaban su pequeña solución.`, [c.id]),
      p(`Sus manos hicieron una tarea pequeña que ninguno necesitaba resolver completamente a solas.`),
    ],
    [
      p(obstacle.result),
      p(quest.clue, [], [quest.id]),
      p(`${h.name} y ${c.name} siguieron buscando con los ojos atentos y el corazón abierto.`),
      p(`${h.name} encontró una tablilla con dibujos que contaban cómo despertar el regalo.`, [h.id], [quest.id]),
      p(`${c.name} escuchó la pista completa antes de decidir qué debían hacer después.`, [c.id]),
      p(`Comprendieron que la magia también podía empezar con un gesto pequeño de cariño.`),
      p(obstacle.lesson),
      p(`Una merienda de la cesta les dio tiempo para recordar todo lo que habían aprendido.`, both, ['basket']),
      p(`${h.name} guardó la cesta y ${c.name} buscó la próxima señal del sendero.`, both, ['basket']),
    ],
    [
      p(quest.discovery, [], [quest.id]),
      p(`${h.name} pidió ayuda, escuchó, cuidó una flor y compartió una canción muy sencilla.`, [h.id], ['flower']),
      p(`Guardaron ${quest.object} en la cesta y emprendieron el camino de regreso al jardín.`, both, [quest.id, 'basket']),
      p(`${c.name} se acercó despacio para mirar aquel regalo sin tocarlo todavía.`, [c.id], [quest.id]),
      p(`${h.name} recordó la pista y buscó una manera amable de despertar aquella magia.`, [h.id], [quest.id]),
      p(quest.magic, [], [quest.id]),
      p(`El rincón estaba tranquilo y dejaba escuchar hasta los sonidos más pequeños.`),
      p(`No hacía falta llevarse todo el lugar para guardar un recuerdo bonito del viaje.`),
      p(`${c.name} preparó un espacio seguro entre las cosas que llevaba dentro de la cesta.`, [c.id], ['basket']),
    ],
    [
      p(`${h.name} y ${c.name} volvieron al jardín llevando el regalo y una historia para compartir.`, both, [quest.id], 'garden'),
      p(quest.solution, both, [quest.id, ...(quest.id === 'feather' ? ['cloud', 'flower'] : [])], 'garden'),
      p(`Desde aquel día, pedir compañía fue el primer paso de cada nueva aventura del jardín.`, both, [], 'garden'),
      p(`Sus vecinos se acercaron para escuchar cómo habían cruzado aquel camino tan desconocido.`, both, [], 'garden'),
      p(`${h.name} contó la prueba y ${c.name} explicó la idea que habían encontrado entre los dos.`, both, [], 'garden'),
      p(`El jardín recuperó la alegría mientras los dos amigos se abrazaban junto a las flores.`, both, ['flower'], 'garden'),
      p(`La cesta quedó sobre el banco para dejar el regalo donde pudiera ayudar.`, [], [quest.id, 'basket'], 'garden'),
      p(`Los dos recordaron que una tarea difícil se volvía más pequeña cuando la compartían.`, both, [], 'garden'),
      p(`Repartieron la merienda de la cesta y disfrutaron un rato de estar nuevamente en casa.`, both, ['basket'], 'garden'),
    ],
  ];
  return { title: `${h.name} y ${quest.title}`, place, questId: quest.id, variantId: obstacle.id, pages: unfold(stages, duration) };
}

function action({ random, hero: h, companion: c, duration }) {
  const threat = choose(random, THREATS);
  const place = choose(random, PLACES.filter(location => ['castle', 'clouds'].includes(location.scene)));
  const guardian = { ...getCharacter('owl'), name: 'Olmo', atlas: { ...getCharacter('owl').atlas } };
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = [], scene = place.scene) => illustrated(text, scene, characters, objects);
  const key = choose(random, ['una llave de cobre', 'una llave de cristal', 'una llave de madera']);
  const stages = [
    [
      p(`${h.name}, ${h.article} ${h.label}, abrió la puerta del viento con demasiada prisa.`, [h.id]),
      p(threat.arrival, [], threat.objects),
      p(`${h.name} pidió ayuda a ${c.name} para cerrar la puerta y reparar su error.`),
      p(`Un letrero junto a la puerta avisaba que solo debía abrirse con ayuda del guardián.`, []),
      p(`${c.name}, ${c.article} ${c.label}, había oído el alboroto desde el otro lado del castillo.`, [c.id]),
      p(`El viejo búho Olmo vivía en una torre y conocía los secretos de aquella puerta.`, ['owl']),
      p(`Antes de la prisa, el castillo tenía pasillos tranquilos y un patio lleno de flores.`, [], ['flower']),
      p(`${h.name} comprendió que mirar primero habría evitado aquel problema tan ruidoso.`, [h.id]),
      p(`Decidieron pedir consejo en vez de intentar arreglarlo todo con más prisa.`),
    ],
    [
      p(threat.obstacle, [], threat.objects),
      p(`${h.name} y ${c.name} encontraron una forma de avanzar usando ${threat.tool === 'yarn' ? 'un ovillo de lana' : 'un paraguas'}.`, both, [threat.tool]),
      p(threat.battle, [], [threat.tool, ...threat.objects]),
      p(threat.detail, [], threat.objects),
      p(threat.toolLine, [], [threat.tool]),
      p(`Aquella pequeña batalla necesitaba ideas amables para abrir un camino hasta la torre.`),
      p(`${h.name} comprobó que ${c.name} estaba cerca antes de dar el siguiente paso.`),
      p(threat.extra, [], [threat.tool, ...threat.objects]),
      p(`Avanzaron al mismo ritmo, sin empujarse ni dejar que nadie se quedara atrás.`),
    ],
    [
      p(`Olmo, un búho muy anciano, los recibió junto a la ventana de su torre.`, ['owl']),
      p(`Olmo entregó ${key} a ${h.name} para cerrar la puerta del viento.`, ['owl', h.id], ['key']),
      p(`El guardián aconsejó respirar tres veces y recordar que ser valiente también era reparar errores.`, ['owl']),
      p(`${c.name} acercó una manta al búho, que ya tenía muy poca fuerza.`, [c.id, 'owl'], ['blanket']),
      p(`${h.name} escuchó con atención cada palabra que decía el viejo guardián.`, [h.id, 'owl']),
      p(`Olmo explicó que debían girar la llave despacio hasta escuchar un clic.`, ['owl'], ['key']),
      p(`El aire de la ventana rozaba suavemente las grandes alas del viejo búho.`, ['owl']),
      p(`Los tres dejaron un momento de silencio para escuchar aquella brisa pequeña y tranquila.`, [...both, 'owl']),
      p(`${h.name} guardó la llave mientras ${c.name} recordaba los pasos del consejo.`, both, ['key']),
    ],
    [
      p(`Poco después, Olmo murió en paz porque su larga vida había llegado al final.`, []),
      p(`${h.name} comprendió que Olmo no volvería a despertar y sintió mucha tristeza.`, [h.id]),
      p(`${c.name} abrazó a ${h.name} y lloraron en compañía, recordando al búho con cariño.`),
      p(`La ventana dejó un rincón tranquilo donde podían quedarse sin apresurar sus sentimientos.`, []),
      p(`${c.name} se sentó cerca para acompañar aquella tristeza sin pedir que desapareciera.`, [c.id]),
      p(`Echar de menos a Olmo también era una manera de recordar cuánto lo querían.`),
      p(`${h.name} recordó la voz suave del guardián y las cosas que les había enseñado.`, [h.id]),
      p(`La llave seguía en la mochila y el consejo seguía guardado en su memoria.`, [], ['key']),
      p(`Después del abrazo podían seguir cuidándose, aunque todavía sintieran ganas de llorar.`),
    ],
    [
      p(`En el patio, ${h.name} contó su error y pidió ayuda sin esconder lo ocurrido.`, [h.id]),
      p(`Respiraron tres veces y giraron la llave mientras mantenían cerrada la puerta del viento.`, both, ['key']),
      p(threat.end, [], threat.objects),
      p(`${c.name} sostuvo la puerta para que ${h.name} pudiera usar la llave con cuidado.`, both, ['key']),
      p(`El consejo de Olmo les recordaba que nadie debía hacerlo todo completamente a solas.`),
      p(`Un clic pequeño anunció que la puerta estaba cerrada y el castillo recuperaba la calma.`, []),
      p(`Apartaron una silla del camino para poder trabajar sin que nadie tropezara.`),
      p(`${h.name} miró el letrero antes de tocar el picaporte por segunda vez.`, [h.id]),
      p(`Mantuvieron la puerta cerrada un momento para dejar que la llave hiciera su trabajo.`, both, ['key']),
    ],
    [
      p(`En el jardín prepararon un rincón de flores para recordar al guardián con cariño.`, both, ['flower'], 'garden'),
      p(`Olmo no volvería, pero su consejo acompañaría cada nueva aventura de los dos amigos.`, both, [], 'garden'),
      p(`La esperanza crecía cuando alguien reparaba un error y cuidaba de otra persona.`, both, [], 'garden'),
      p(`${h.name} dejó una flor junto al banco donde podrían hablar de Olmo.`, [h.id], ['flower'], 'garden'),
      p(`${c.name} recordó que podían pedir compañía tanto en los días alegres como en los tristes.`, [c.id], [], 'garden'),
      p(`Compartieron una cesta de merienda y recuerdos sin pedir que nadie sonriera todavía.`, both, ['basket'], 'garden'),
      p(`El jardín tenía espacio para las lágrimas y también para las pequeñas sonrisas.`, [], ['flower'], 'garden'),
      p(`Ayudar a otro vecino sería una forma de continuar la enseñanza del viejo búho.`, both, [], 'garden'),
      p(`Al marcharse, ${h.name} y ${c.name} caminaron juntos llevando todos sus sentimientos.` , both, [], 'garden'),
    ],
  ];
  return { title: `${h.name} y la puerta del viento`, place, guardian, questId: 'wind-door', variantId: threat.id, pages: unfold(stages, duration) };
}

function relax({ random, hero: h, companion: c, duration }) {
  const fable = choose(random, FABLES);
  const place = choose(random, PLACES.filter(location => fable.scenes.includes(location.scene)));
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = []) => illustrated(text, place.scene, characters, objects);
  const stages = [
    [
      p(`${h.name}, ${h.article} ${h.label}, llegó ${toPlace(place)} buscando un rincón tranquilo.`, [h.id]),
      p(`${h.name} ${fable.start}.`, [h.id], fable.objects),
      p(`${c.name}, ${c.article} ${c.label}, se acercó para compartir aquella pequeña actividad.`, [c.id]),
      p(fable.setup, [], fable.objects),
      p(`${h.name} preparó sus cosas, imaginando que todo saldría exactamente como quería.`, [h.id], fable.objects),
      p(`Los dos eligieron un sitio cómodo donde cada uno tuviera espacio para estar.`),
      p(place.detail, [], ['garden', 'meadow'].includes(place.scene) ? ['flower'] : place.scene === 'clouds' ? ['cloud'] : []),
      p(`Una hoja se movía despacio y una hormiga continuaba con su pequeña tarea.`, []),
      p(`${c.name} no llevaba prisa y dejó un momento para mirar el lugar.`, [c.id]),
    ],
    [
      p(`${h.name} ${fable.first}.`, [h.id], fable.objects),
      p(fable.mistake, [], fable.objects),
      p(`${c.name} preguntó qué estaba pasando y escuchó la respuesta hasta el final.`, [c.id]),
      p(`${h.name} comenzó a moverse más deprisa porque el resultado no llegaba como esperaba.`, [h.id], fable.objects),
      p(`La prisa escondía algunos detalles pequeños que podían ayudar a comprender la dificultad.`),
      p(`Contarlo en palabras hizo que la preocupación pareciera un poquito menos grande.`),
      p(`${c.name} se quedó cerca, sin decir que aquello tenía que resultar fácil.`, [c.id]),
      p(fable.observation, [], fable.objects),
      p(`${h.name} notó que quería disfrutar, pero empezaba a sentirse ${h.gender === 'f' ? 'incómoda' : 'incómodo'}.`, [h.id]),
    ],
    [
      p(`${h.name} suspiró y dejó de intentar arreglarlo todo durante un pequeño momento.`, [h.id]),
      p(`${c.name} respiró despacio y mostró que también se podía parar para pensar.`, [c.id]),
      p(`Los dos hicieron una pausa sin convertir aquella tarde en una carrera.`),
      p(`El aire entró suave y salió despacio, mientras los hombros encontraban un poco de descanso.`),
      p(`${h.name} aflojó las manos y miró otra vez las cosas que tenía cerca.`, [h.id], fable.objects),
      p(`No necesitaban encontrar una respuesta perfecta antes de escuchar lo que estaba ocurriendo.`),
      p(`La pausa dejaba un espacio pequeño para pensar sin que la prisa eligiera todo.`),
      p(`${c.name} acompañó el silencio sin llenar cada momento con una idea nueva.`, [c.id]),
      p(`Detenerse no borraba la dificultad, pero permitía mirarla desde un lugar más tranquilo.`),
    ],
    [
      p(fable.lesson, [c.id], fable.objects),
      p(`${h.name} ${fable.change}.`, [h.id], fable.objects),
      p(`Aprender no pedía hacerlo perfecto al primer intento, sino probar de otra manera.`),
      p(`${h.name} escuchó la idea y descubrió que tenía sentido para lo que estaba viviendo.`, [h.id]),
      p(`${c.name} dejó que la otra persona eligiera cómo practicar aquel consejo sencillo.`, [c.id]),
      p(fable.practice, both, fable.objects),
      p(`Una idea pequeña podía cambiar la forma de cuidar algo que tenían cerca.`),
      p(`Los dos podían ayudarse sin decidir cada movimiento por la otra persona.`),
      p(fable.care, [], fable.objects),
    ],
    [
      p(fable.later, both, fable.objects),
      p(fable.outcome, [], fable.objects),
      p(`${h.name} miró a ${c.name} con una sonrisa tranquila y compartió su pequeño descubrimiento.`),
      p(`A veces aparecía la prisa y otras veces conseguían encontrar una pausa antes.`),
      p(`${c.name} recordaba que aprender algo nuevo también podía llevar un poquito de tiempo.`, [c.id]),
      p(`El resultado guardaba algo especial porque habían podido disfrutar sin empujar las cosas.`),
      p(`${h.name} empezó a reconocer cuándo necesitaba ayuda, tiempo o simplemente un poco de calma.`, [h.id]),
      p(`Ninguno esperaba que el otro recordara aquella lección perfectamente a cada segundo.`),
      p(`Quisieron guardar el momento en un dibujo para recordar cómo se habían sentido.`),
    ],
    [
      p(`${h.name} recordó una enseñanza sencilla: ${fable.moral.toLocaleLowerCase('es')}.`, [h.id], fable.objects),
      p(`${c.name} le dio un abrazo y los dos empezaron a volver a casa despacito.`),
      p(`Mañana podrían volver a intentarlo, llevando aquella pequeña lección y muchas ganas de cuidarse.`),
      p(`${thePlace(place)} seguía guardando detalles pequeños que ahora podían ver mejor.`),
      p(`Compartieron lo que habían aprendido dejando espacio para las palabras de cada uno.`),
      p(`No necesitaban resolver todavía todas las dificultades que podrían aparecer al día siguiente.`),
      p(`${h.name} guardó sus cosas con cuidado mientras ${c.name} esperaba sin apurar.`),
      p(`La calma no había llegado de golpe, sino a través de varios gestos pequeños.`),
      p(`Aquel momento estaba completo con dos amigos, un recuerdo y un poquito de tranquilidad.`),
    ],
  ];
  const title = fable.id === 'rest' ? `${h.name} ${fable.title}` : `${h.name} y ${fable.title}`;
  return { title, place, moral: `${fable.moral}.`, questId: fable.id, variantId: fable.id, pages: unfold(stages, duration) };
}

function friends({ random, hero: h, companion: c, duration }) {
  const activity = choose(random, ACTIVITIES);
  const place = choose(random, PLACES.filter(location => activity.scenes.includes(location.scene)));
  const both = [h.id, c.id];
  const p = (text, characters = both, objects = []) => illustrated(text, place.scene, characters, objects);
  const stages = [
    [
      p(`${h.name}, ${h.article} ${h.label}, invitó a ${c.name} ${toPlace(place)}.`),
      p(`Querían ${activity.plan}.`, both, activity.objects),
      p(`Una tarde pequeña tenía espacio para sus dos ideas y muchas ganas de jugar.`),
      p(`${c.name}, ${c.article} ${c.label}, llegó con una sonrisa para compartir aquella actividad.`, [c.id]),
      p(`${h.name} explicó su idea y después escuchó la propuesta de su acompañante.`, [h.id]),
      p(`Eligieron un rincón cómodo donde ninguno tuviera que quedarse mirando desde lejos.`),
      p(`Las flores seguían creciendo alrededor sin necesitar que nadie organizara una fiesta enorme.`, [], ['flower']),
      p(`Apartaron unas hojas del camino y dejaron las flores nuevas donde estaban.`),
      p(`${c.name} agradeció la invitación antes de comenzar a preparar las cosas.`, [c.id]),
    ],
    [
      p(activity.materials, [], activity.objects),
      p(`${h.name} ${activity.taskHero}.`, [h.id], activity.objects),
      p(`${c.name} ${activity.taskCompanion}.`, [c.id], activity.objects),
      p(`Pusieron en el centro lo que iban a usar para poder alcanzarlo sin empujarse.`),
      p(`${h.name} preguntó antes de tomar algo que estaba junto a ${c.name}.`),
      p(`Las dos tareas eran distintas, pero ambas ayudaban a preparar algo en compañía.`),
      p(`Había sitio para trabajar y también para cambiar una idea si aparecía otra mejor.`),
      p(`Probaron a ${activity.variation}.`, both, activity.objects),
      p(`Ayudar no era hacer la tarea del otro, sino acercar una mano cuando hiciera falta.`),
    ],
    [
      p(activity.problem, both, activity.objects),
      p(`${h.name} explicó lo que quería y ${c.name} escuchó sin interrumpir.`),
      p(`Después cambiaron los turnos y buscaron una solución que dejara sitio para los dos.`),
      p(`Los dos guardaron silencio un momento porque aquella idea les hacía mucha ilusión.`),
      p(`Nadie quería estropear la tarde, aunque al principio sus planes parecieran diferentes.`),
      p(`Podían preguntar lo que sentía el otro en vez de intentar adivinarlo todo.`),
      p(`${h.name} apretó un poquito los labios y después recordó que podía usar palabras.`, [h.id]),
      p(`Una pausa dejó que cada uno encontrara una manera amable de contar su idea.`),
      p(`Escuchar hizo que el desacuerdo pareciera una tarea pequeña y posible de compartir.`),
    ],
    [
      p(activity.idea, both, activity.objects),
      p(`${h.name} preguntó a ${c.name} si aquella solución le dejaba un lugar cómodo.`),
      p(`Los dos dijeron que sí y volvieron a jugar con el corazón más ligero.`),
      p(`La idea nueva tenía un poquito de cada uno, aunque no fuera la primera propuesta.`),
      p(activity.detail, [], activity.objects),
      p(`Cada uno reconocía algo suyo y algo de su acompañante en lo que estaban preparando.`),
      p(`No hacía falta ganar el desacuerdo para poder disfrutar de aquella tarde juntos.`),
      p(activity.challenge, both, activity.objects),
      p(`Pidieron ayuda cuando la necesitaron y nadie se burló de un pequeño error.`),
    ],
    [
      p(activity.result, both, activity.objects),
      p(`${h.name} y ${c.name} sonrieron al ver lo que habían hecho entre los dos.`),
      p(`La actividad era sencilla, pero guardaba muchas maneras pequeñas de cuidar su amistad.`),
      p(`Probaron otra vez cambiando los turnos para descubrir cómo se sentía desde otro lugar.`),
      p(`${c.name} encontró un detalle nuevo y se lo enseñó a ${h.name}.`),
      p(`El resultado no tenía que ser perfecto para que ambos pudieran disfrutarlo.`),
      p(`Una mariposa se posó cerca y los dos dejaron su juego para observarla.`),
      p(`Miraron sus alas sin intentar atraparla y esperaron a que continuara su camino.`),
      p(`También podían compartir un momento tranquilo sin hacer nada más que estar cerca.`),
    ],
    [
      p(activity.keepsake, both, activity.objects),
      p(`${h.name} y ${c.name} se dieron un abrazo y agradecieron aquella tarde compartida.`),
      p(`La amistad continuó con ellos por el camino, lista para otra actividad pequeña.`),
      p(`Recogieron el rincón para dejar un camino libre y cómodo junto a las flores.`, both, ['flower']),
      p(`${h.name} preparó una parte de las cosas y ${c.name} preparó la otra.`),
      p(`Otro día podrían repetir aquel juego o encontrar una nueva idea para compartir.`),
      p(`Miraron debajo del banco por si alguna cosa pequeña había quedado olvidada.`),
      p(`Jugar en compañía había sido escuchar, compartir y dejar espacio para las ideas del otro.`),
      p(`No hacía falta elegir enseguida la próxima aventura para seguir siendo buenos amigos.`),
    ],
  ];
  return { title: `${h.name} y ${c.name}: ${activity.title}`, place, questId: activity.id, variantId: activity.id, pages: unfold(stages, duration) };
}

const GENERATORS = { adventure, action, relax, friends };

/** A duration includes reading and generous time to look at and touch each illustration. */
export function generateStory(bookId, duration = 3, seed) {
  if (!Object.hasOwn(GENERATORS, bookId)) throw new RangeError(`Unknown book: ${bookId}`);
  const minutes = Number(duration);
  if (![3, 6, 9].includes(minutes)) throw new RangeError('Choose a reading duration of 3, 6 or 9 minutes.');
  const storySeed = seed === undefined ? freshSeed() : String(seed);
  const random = randomFromSeed(`${bookId}:${storySeed}`);
  const { hero, companion } = makeCast(bookId, random);
  const story = GENERATORS[bookId]({ random, hero, companion, duration: minutes });
  const id = `${bookId}-${minutes}-${encodeURIComponent(storySeed)}`;
  const pages = story.pages.map((page, index) => ({ id: `${id}-page-${index + 1}`, ...page }));
  return {
    format: 'picturebook-v2', id, bookId, duration: minutes, seed: storySeed,
    title: story.title, hero, companion, place: story.place,
    ...(story.guardian ? { guardian: story.guardian } : {}),
    questId: story.questId, variantId: story.variantId,
    ...(story.moral ? { moral: story.moral } : {}),
    createdAt: new Date().toISOString(), pages,
    wordCount: pages.reduce((sum, page) => sum + countWords(page.paragraphs[0]), 0),
  };
}
