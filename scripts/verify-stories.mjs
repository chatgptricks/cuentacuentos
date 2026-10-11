import assert from 'node:assert/strict';
import { BOOKS, CHARACTERS, CHARACTER_ATLASES, CHARACTER_NAMES, SCENES, ITEMS, OBJECTS, WORLD_ATLASES, STORY_BLOCK_COUNTS, STORY_STRUCTURES, VILLAINS, VILLAIN_ATLASES, VILLAIN_NAMES, SUPPORTING, SUPPORTING_ATLASES, SUPPORTING_NAMES, PENDING_ART, generateStory, getCharacter, getScene, getItem, getVillain } from '../src/story-engine.js';
import { ABILITIES, AQUATIC, WATER_PLACES, PLACE_INFO, TRIALS, TOOLS, ITEM_WORDS } from '../src/narrative-world.js';
import { ADVENTURE_MENTORS, RELAX_MENTORS, ELIXIRS, TARGETS, VILLAIN_PLOTS } from '../src/quest-catalog.js';
import { RELAX_GOALS, FRIEND_GOALS, FAMILY_GOALS } from '../src/story-blocks.js';
import { createDefaultFamily } from '../src/family-characters.js';
import { SOUND_ALIASES } from '../src/audio.js';
import { SCENE_VIEW_LABELS, getSceneView, getSceneViewIndex } from '../src/world-catalog.js';

const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
const textOf = story => story.pages.flatMap(page => page.paragraphs).join('\n');
const contentOf = ({ createdAt, ...story }) => story;
const sceneIds = new Set(SCENES.map(scene => scene.id));
const characterIds = new Set(CHARACTERS.map(character => character.id));
const objectIds = new Set(OBJECTS.map(object => object.id));
const usedCharacters = new Set();
const usedObjects = new Set();
const usedScenes = new Set();
const describedScenes = new Set();
const selectedScenes = new Set();
const selectedObjects = new Set();
const narratedObjects = new Map(ITEMS.map(item => [item.id, new Set()]));
const metadataBefore = JSON.stringify(CHARACTERS);
const worldBefore = JSON.stringify({ SCENES, ITEMS, WORLD_ATLASES });
const stats = {};
let checkedStories = 0;
const legacyCharacters = [
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
];
const legacyIds = new Set(legacyCharacters.map(character => character.id));
const legacyScenes = [
  ['forest', 'Bosque de las Campanillas', 'el bosque', 'main-places', 0, 0],
  ['lake', 'Lago de la Luna', 'el lago', 'main-places', 0, 1],
  ['castle', 'Castillo de las Nubes', 'el castillo', 'main-places', 1, 0],
  ['garden', 'Jardín de los Abrazos', 'el jardín', 'main-places', 1, 1],
  ['beach', 'Playa de las Conchitas', 'la playa', 'extra-places', 0, 0, 'la'],
  ['mountain', 'Montaña del Eco', 'la montaña', 'extra-places', 1, 0, 'la'],
  ['treehouse', 'Refugio del Árbol', 'la casa del árbol', 'extra-places', 2, 0],
  ['village', 'Pueblito de los Faroles', 'el pueblo', 'extra-places', 3, 0],
  ['meadow', 'Prado de las Mariposas', 'el prado', 'extra-places', 0, 1],
  ['cave', 'Refugio de las Lucecitas', 'la cueva', 'extra-places', 1, 1],
  ['river', 'Río de los Susurros', 'el río', 'extra-places', 2, 1],
  ['clouds', 'Reino de las Nubes', 'el palacio de las nubes', 'extra-places', 3, 1],
];
const legacyObjects = [
  ['seed', 'semilla de luz'], ['bell', 'campanita de luna'], ['drop', 'gota cantora'], ['feather', 'pluma de lluvia'],
  ['key', 'llave'], ['umbrella', 'paraguas'], ['cloud', 'nube'], ['yarn', 'ovillo de lana'],
  ['blanket', 'manta'], ['basket', 'cesta'], ['flower', 'flor'], ['boat', 'barquito'],
];
// These concrete nouns connect illustrations to authored actions, independently of atlas or block IDs.
// The same words decide what a page draws, so a drawing always matches its sentence.
const objectMentions = ITEM_WORDS;
assert.deepEqual(BOOKS.map(book => book.id), ['adventure', 'action', 'relax', 'friends', 'family']);
assert.equal(characterIds.size, 76, 'The original twelve characters plus sixty-four new characters remain available.');
assert.equal(CHARACTERS.filter(character => character.category === 'animal').length, 56);
assert.equal(CHARACTERS.filter(character => character.category === 'fantasy').length, 20);
assert.equal(CHARACTERS.filter(character => !legacyIds.has(character.id) && character.category === 'animal').length, 48);
assert.equal(CHARACTERS.filter(character => !legacyIds.has(character.id) && character.category === 'fantasy').length, 16);
assert.deepEqual(CHARACTERS.slice(0, 12).map(character => character.id), [...legacyIds]);
for (const previous of legacyCharacters) {
  const current = getCharacter(previous.id);
  for (const [key, value] of Object.entries(previous)) assert.deepEqual(current[key], value, `${previous.id}: saved stories keep their original identity and atlas position.`);
}
assert.deepEqual(CHARACTER_ATLASES.main, { file: 'characters.png', columns: 4, rows: 2 });
assert.deepEqual(CHARACTER_ATLASES.extra, { file: 'characters-extra.png', columns: 2, rows: 2 });
const addedSheets = ['animals-meadow', 'animals-world', 'animals-wings-sea', 'fantasy-forest', 'fantasy-wonders', 'animals-farm', 'night-creatures', 'tiny-creatures'];
assert.equal(Object.keys(CHARACTER_ATLASES).length, 10);
assert.ok(Object.isFrozen(CHARACTER_ATLASES));
for (const sheet of addedSheets) assert.deepEqual(CHARACTER_ATLASES[sheet], { file: `${sheet}.png`, columns: 4, rows: 2 });
const allNames = CHARACTERS.flatMap(character => CHARACTER_NAMES[character.id]);
assert.equal(allNames.length, 380);
assert.equal(new Set(allNames).size, allNames.length, 'Distinct catalogue characters must not acquire the same name in a story.');
assert.equal(sceneIds.size, 76, 'Keep the twelve original places and add sixty-four places.');
assert.equal(objectIds.size, 116, 'Keep the twelve original items and add one hundred and four items.');
assert.equal(SCENES.length, 76);
assert.equal(ITEMS.length, 116);
assert.equal(CHARACTERS.length + SCENES.length + ITEMS.length, 268);
assert.deepEqual(SCENES.slice(0, 12).map(scene => scene.id), legacyScenes.map(([id]) => id));
assert.deepEqual(OBJECTS.slice(0, 12).map(({ id, label }) => [id, label]), legacyObjects);
for (const [id, name, label, sheet, x, y, article] of legacyScenes) {
  const scene = getScene(id);
  assert.deepEqual({ name: scene.name, label: scene.label, atlas: scene.atlas, article: scene.article, sound: scene.sound },
    { name, label, atlas: { sheet, x, y }, article, sound: id }, `${id}: saved scene IDs keep their name and illustration.`);
}
for (const [index, [id, label]] of legacyObjects.entries()) {
  const item = getItem(id);
  assert.equal(item.label, label);
  assert.equal(item.sound, id);
  assert.deepEqual(item.atlas, { sheet: 'main-objects', x: index % 4, y: Math.floor(index / 4) }, `${id}: saved item IDs retain their illustration.`);
}
assert.deepEqual(WORLD_ATLASES['main-places'], { file: 'places.png', columns: 2, rows: 2 });
assert.deepEqual(WORLD_ATLASES['extra-places'], { file: 'places-extra.png', columns: 4, rows: 2 });
assert.deepEqual(WORLD_ATLASES['main-objects'], { file: 'objects.png', columns: 4, rows: 3 });
const addedWorldSheets = ['places-nature', 'places-village', 'places-wonder', 'objects-explore', 'objects-create', 'objects-treasure',
  'objects-bedtime', 'objects-party', 'objects-quest', 'objects-kitchen', 'objects-sport', 'objects-memories', 'objects-firsts', 'objects-calm', 'objects-night-sounds', 'objects-home-tools'];
for (const sheet of addedWorldSheets) assert.deepEqual(WORLD_ATLASES[sheet], { file: `${sheet}.png`, columns: 4, rows: 2 });
for (let index = 1; index <= 19; index += 1) assert.deepEqual(WORLD_ATLASES[`places-views-${String(index).padStart(2, '0')}`], { file: `places-views-${String(index).padStart(2, '0')}.png`, columns: 4, rows: 3 });
assert.equal(Object.keys(WORLD_ATLASES).length, 38);
const allAtlases = [...Object.values(CHARACTER_ATLASES), ...Object.values(WORLD_ATLASES), ...Object.values(VILLAIN_ATLASES), ...Object.values(SUPPORTING_ATLASES)];
assert.equal(allAtlases.length, 53);
assert.equal(new Set(allAtlases.map(atlas => atlas.file)).size, 53, 'Every registered atlas is a distinct offline resource.');
assert.ok(Object.isFrozen(WORLD_ATLASES) && Object.isFrozen(SCENES) && Object.isFrozen(ITEMS) && Object.isFrozen(OBJECTS));
assert.deepEqual(OBJECTS.map(object => object.id), ITEMS.map(item => item.id));
assert.equal(new Set([...SCENES, ...ITEMS].map(asset => `${asset.atlas.sheet}:${asset.atlas.x}:${asset.atlas.y}`)).size, 192);
assert.deepEqual(Object.keys(objectMentions).sort(), [...objectIds].sort());
for (const asset of [...SCENES, ...ITEMS]) {
  const atlas = WORLD_ATLASES[asset.atlas.sheet];
  assert.ok(atlas, `${asset.id}: the renderer and build share its atlas.`);
  assert.ok(Object.isFrozen(asset) && Object.isFrozen(asset.atlas));
  assert.ok(Number.isInteger(asset.atlas.x) && asset.atlas.x >= 0 && asset.atlas.x < atlas.columns);
  assert.ok(Number.isInteger(asset.atlas.y) && asset.atlas.y >= 0 && asset.atlas.y < atlas.rows);
  assert.ok(typeof asset.label === 'string' && asset.label && asset.sound === asset.id);
  if (!legacyScenes.some(([id]) => id === asset.id) && !legacyObjects.some(([id]) => id === asset.id)) assert.ok(Object.hasOwn(SOUND_ALIASES, asset.sound), `${asset.id}: new world art has a playable sound binding.`);
}
for (const scene of SCENES) {
  assert.equal(getScene(scene.id), scene);
  assert.equal(scene.scene, scene.id);
  assert.ok(scene.name && scene.detail && Object.isFrozen(scene.tags) && scene.tags.length);
  assert.ok(scene.article === undefined || scene.article === 'la');
  assert.ok(Object.isFrozen(scene.views) && scene.views.length === 3, `${scene.id}: panoramic, medium and close views are available.`);
  for (const [index, view] of scene.views.entries()) {
    assert.ok(Object.isFrozen(view));
    const atlas = WORLD_ATLASES[view.sheet];
    assert.ok(atlas && view.x >= 0 && view.x < atlas.columns && view.y === index && view.y < atlas.rows);
    assert.equal(getSceneView(scene.id, index), view);
  }
  assert.equal(getSceneView(scene.id, 3), scene.views[0]);
  assert.equal(getSceneView(scene.id, -1), scene.views[2]);
  assert.equal(getSceneView(scene.id, NaN), scene.views[0]);
}
assert.deepEqual(SCENE_VIEW_LABELS, ['Panorámica', 'Media', 'Cercana']);
assert.equal(new Set(SCENES.flatMap(scene => scene.views.map(view => `${view.sheet}:${view.x}:${view.y}`))).size, 228, 'Every place has three distinct painted cells.');
const interleavedScenes = ['forest', 'lake', 'forest', 'lake', 'forest', 'forest', 'lake'].map(scene => ({ scene }));
assert.deepEqual(interleavedScenes.map((_, index) => getSceneViewIndex(interleavedScenes, index)), [0, 0, 1, 1, 2, 0, 2], 'Each location cycles independently and keeps its view when resuming a book.');
assert.deepEqual(JSON.parse(JSON.stringify(interleavedScenes)).map((_, index) => getSceneViewIndex(interleavedScenes, index)), [0, 0, 1, 1, 2, 0, 2]);
assert.equal(getSceneViewIndex([{ paragraphs: ['A saved page without a scene.'] }], 0), 0);
assert.equal(getSceneView('missing'), undefined);
for (const item of ITEMS) {
  assert.equal(getItem(item.id), item);
  assert.ok(['el', 'la', 'los', 'las'].includes(item.article));
}
for (const [sheet, atlas] of Object.entries(WORLD_ATLASES)) {
  assert.ok(Object.isFrozen(atlas));
  // Places painted only as views use their first view as catalogue icon, so that cell is counted once.
  const cells = [...SCENES.filter(scene => !scene.atlas.sheet.startsWith('places-views')), ...ITEMS].map(asset => asset.atlas).concat(SCENES.flatMap(scene => scene.views));
  assert.equal(cells.filter(cell => cell.sheet === sheet).length, atlas.columns * atlas.rows, `${sheet}: every cell maps to one world identity or one of its views.`);
}
assert.equal(getScene('missing'), undefined);
assert.equal(getItem('missing'), undefined);
assert.equal(new Set(CHARACTERS.map(character => `${character.atlas.sheet ?? 'main'}:${character.atlas.x}:${character.atlas.y}`)).size, 76);
for (const character of CHARACTERS) {
  const atlas = CHARACTER_ATLASES[character.atlas.sheet ?? 'main'];
  assert.ok(atlas, `${character.id}: every illustration has a registered atlas.`);
  assert.ok(Number.isInteger(character.atlas.x) && character.atlas.x >= 0 && character.atlas.x < atlas.columns);
  assert.ok(Number.isInteger(character.atlas.y) && character.atlas.y >= 0 && character.atlas.y < atlas.rows);
  assert.ok(['animal', 'fantasy'].includes(character.category));
  assert.ok(typeof character.name === 'string' && character.name && typeof character.label === 'string' && character.label);
  assert.ok(typeof character.sound === 'string' && character.sound);
  assert.ok(CHARACTER_NAMES[character.id].includes(character.name));
  assert.ok(Object.isFrozen(CHARACTER_NAMES[character.id]));
  assert.equal(character.article, character.label === 'hada' ? 'el' : character.gender === 'f' ? 'la' : 'el');
  assert.equal(getCharacter(character.id), character);
}
for (const [sheet, atlas] of Object.entries(CHARACTER_ATLASES)) {
  assert.ok(Object.isFrozen(atlas));
  assert.equal(CHARACTERS.filter(character => (character.atlas.sheet ?? 'main') === sheet).length, atlas.columns * atlas.rows, `${sheet}: every illustrated cell is mapped to one character.`);
}
assert.equal(getCharacter('missing'), undefined);
assert.throws(() => generateStory('missing'), RangeError);
assert.throws(() => generateStory('__proto__'), RangeError);
for (const duration of [0, -3, 1, 4, 12, NaN, Infinity, 'invalid']) {
  assert.throws(() => generateStory('adventure', duration), RangeError);
}
assert.equal(generateStory('friends', undefined, 'default').duration, 3);
assert.equal(generateStory('friends', '6', 0).seed, '0');

// Gentle antagonists, secondary characters and their art.
assert.deepEqual(VILLAIN_ATLASES, { villains: { file: 'villains.png', columns: 4, rows: 2 }, 'villains-2': { file: 'villains-2.png', columns: 4, rows: 2 } });
assert.equal(VILLAINS.length, 16);
assert.deepEqual(Object.keys(VILLAIN_PLOTS).sort(), VILLAINS.map(villain => villain.id).sort(), 'Every painted villain has a motive and a redemption.');
assert.deepEqual(PENDING_ART, [], 'All registered art is painted.');
assert.equal(SUPPORTING.length, 24);
assert.deepEqual(Object.keys(SUPPORTING_ATLASES).sort(), ['animals-babies', 'pets', 'town-folk']);
const portraits = [...CHARACTERS, ...VILLAINS, ...SUPPORTING];
assert.equal(new Set(portraits.map(entry => entry.id)).size, portraits.length, 'Every portrait has its own identity.');
for (const entry of [...VILLAINS, ...SUPPORTING]) {
  const atlas = { ...VILLAIN_ATLASES, ...SUPPORTING_ATLASES }[entry.atlas.sheet];
  assert.ok(atlas && entry.atlas.x < atlas.columns && entry.atlas.y < atlas.rows);
  assert.ok(Object.hasOwn(SOUND_ALIASES, entry.sound), `${entry.id}: a playable sound.`);
  assert.equal(entry.article, entry.gender === 'f' ? 'la' : 'el');
}
for (const sheet of [...Object.keys(VILLAIN_ATLASES), ...Object.keys(SUPPORTING_ATLASES)]) {
  assert.equal([...VILLAINS, ...SUPPORTING].filter(entry => entry.atlas.sheet === sheet).length, 8, `${sheet}: every cell maps to one character.`);
}
const everyName = [...CHARACTERS.flatMap(character => CHARACTER_NAMES[character.id]), ...Object.values(VILLAIN_NAMES).flat(), ...Object.values(SUPPORTING_NAMES).flat()];
assert.equal(new Set(everyName).size, everyName.length, 'No two characters share a name.');
for (const character of CHARACTERS) assert.ok(Object.hasOwn(SOUND_ALIASES, character.sound) || legacyIds.has(character.id), `${character.id}: a playable sound.`);

// Every role list names a real catalogue entry, and every ability names a trial it can solve.
assert.deepEqual(Object.keys(ABILITIES).sort(), [...characterIds].sort(), 'Every character declares what it can do.');
for (const id of [...ADVENTURE_MENTORS, ...RELAX_MENTORS]) assert.ok(characterIds.has(id));
assert.deepEqual(Object.keys(PLACE_INFO).sort(), [...sceneIds].sort(), 'Every place declares its terrain.');
for (const info of Object.values(PLACE_INFO)) assert.ok(info.trials.every(id => TRIALS[id]));
for (const trial of Object.values(TRIALS)) {
  assert.ok(Object.keys(trial.tools).length && Object.keys(trial.tools).every(id => TOOLS[id]), 'A mentor can always give a tool for each trial.');
  for (const [toolId, sentence] of Object.entries(trial.tools)) assert.ok(objectMentions[TOOLS[toolId].item].test(sentence), 'The tool appears in the sentence that uses it.');
}
for (const elixir of ELIXIRS) assert.ok(elixir.places.every(id => PLACE_INFO[id].trials.length >= 2), `${elixir.id}: a destination needs two different trials.`);
for (const [bookId, structures] of Object.entries(STORY_STRUCTURES)) {
  assert.ok(structures.length >= 6, `${bookId}: at least six story structures.`);
  assert.equal(new Set(structures.map(structure => structure.id)).size, structures.length);
}

// Cause before effect, per structure: the sentence on the left always comes first.
const ORDER = {
  elixir: [[/fueron a pedir consejo/u, /escuchó con atención y les explicó/u], [/les regaló/u, /^Por fin encontraron/u], [/volvieron (?:al|a la)/u, /aprendió que/u]],
  rescue: [[/se había perdido/u, /decidieron salir a buscar/u], [/encontró (?:unas|un) /u, /De pronto oyeron/u], [/De pronto oyeron/u, /corrió a abrazar/u]],
  'treasure-map': [[/encontraron un mapa viejo/u, /pergamino decía/u], [/pergamino decía/u, /piedra de luna/u], [/colocó la piedra de luna/u, /Dentro había/u]],
  errand: [[/Les pidió llevar/u, /Le entregaron/u], [/Le entregaron/u, /le dieron el abrazo/u]],
  'far-from-home': [[/encontró a (?:un|una) /u, /decidieron llevar/u], [/decidieron llevar/u, /Su familia salió a recibir/u], [/Su familia salió/u, /les regaló/u]],
  'big-question': [[/Quería saber/u, /la respuesta estaba/u], [/la respuesta estaba/u, /encontró la respuesta/u]],
  theft: [[/apareció y se llevó/u, /pedir ayuda al viejo búho Olmo/u], [/Olmo les dio/u, /Olmo murió en paz/u], [/Olmo murió en paz/u, /^Por fin encontraron/u], [/confesó que/u, /devolvió .+ y pidió perdón/u]],
  defense: [[/trajo una noticia/u, /^Entre todos,/u], [/^Entre todos,/u, /apareció entre las sombras/u], [/confesó que/u, /pidió perdón por el susto/u]],
  spell: [[/apareció y /u, /fueron a pedir ayuda/u], [/Les dio un frasco de poción/u, /encontraron una? /u], [/Volvieron (?:al|a la)/u, /volvió, furios/u], [/confesó que/u, /celebraron juntos/u]],
  race: [[/decidieron entrenar/u, /la carrera empezó/u], [/la carrera empezó/u, /le tendió la mano/u], [/le tendió la mano/u, /Cruzaron la meta juntos/u]],
  'lair-rescue': [[/se había llevado a su/u, /prometieron traer/u], [/sacaron a/u, /se despertó y los vio/u], [/confesó que se sentía/u, /Volvieron (?:al|a la)/u]],
  'false-villain': [[/todos culparon/u, /investigar con una lupa/u], [/investigar con una lupa/u, /^No era /u], [/^No era /u, /le pidieron perdón/u]],
  hurry: [[/ quería /u, /le propuso hacer una pausa/u], [/le dijo con cariño/u, /decidió intentarlo de otra manera/u], [/recordó lo que había aprendido/u, /se durmió/u]],
  goodnight: [[/no tenían nada de sueño/u, /propuso darle las buenas noches/u], [/propuso darle las buenas noches/u, /se durmieron/u]],
  'night-noise': [[/De pronto, /u, /recordó un truco/u], [/Decidieron ir a mirar/u, /se durmieron/u]],
  fable: [[/(?:presumía|solo quería jugar|dormía la siesta)/u, /aprendió|entendió/u], [/recordó la enseñanza/u, /se durmió/u]],
  'dream-journey': [[/soñó que llegaba/u, /Primero llegaron/u], [/Por último, llegaron/u, /se durmió/u]],
  'three-things': [[/propuso un juego/u, /recordó cuando/u], [/recordó cuando/u, /se durmieron/u]],
  worry: [[/no conseguía dormirse/u, /le contó su preocupación/u], [/le regaló/u, /se durmió/u]],
  activity: [[/tuvo una idea:/u, /le contó su plan/u], [/pensó un momento y propuso/u, /probó la idea, y esta vez funcionó/u]],
  'new-friend': [[/llegó a la escuela/u, /le propuso a/u], [/vio que/u, /sonrió/u], [/sonrió/u, /invitó a/u]],
  quarrel: [[/empezaron a discutir/u, /decidió ir a pedirle perdón/u], [/le pidió perdón/u, /Volvieron al parque/u]],
  surprise: [[/se dio cuenta de que/u, /Fueron al mercado/u], [/Fueron al mercado/u, /gritaron sorpresa/u]],
  'everyone-plays': [[/invitó a su/u, /no podía/u], [/no podía/u, /tuvo una idea/u], [/tuvo una idea/u, /contaron las canicas/u]],
  contest: [[/anunciaron/u, /el concurso empezó/u], [/el concurso empezó/u, /Al final, /u], [/Al final, /u, /premio especial/u]],
};
const reached = { structures: {}, goals: {}, villains: new Set(), trials: new Set(), tools: new Set(), mentors: new Set(), abilities: new Set(), supporting: new Set() };

for (const { id: bookId } of BOOKS) {
  reached.structures[bookId] = new Set();
  reached.goals[bookId] = new Set();
  const heroes = new Set();
  const uniqueStories = new Set();
  const plans = new Set();
  const range = Object.fromEntries([3, 6, 9].map(duration => [duration, { min: Infinity, max: -Infinity }]));
  stats[bookId] = range;
  const sampleSize = bookId === 'family' ? 1_200 : 2_400;
  for (let seed = 0; seed < sampleSize; seed += 1) {
    let previousStory;
    for (const duration of [3, 6, 9]) {
      const options = bookId === 'family' ? { companionRole: ['dad', 'mom', 'baby', 'sibling', 'teen'][seed % 5] } : {};
      const story = generateStory(bookId, duration, seed, options);
      const repeated = generateStory(bookId, duration, seed, options);
      const text = textOf(story);
      const paragraphs = story.pages.flatMap(page => page.paragraphs);
      const allowedCast = new Set(story.characters.map(character => character.id));
      const at = pattern => paragraphs.findIndex(paragraph => pattern.test(paragraph));

      assert.deepEqual(contentOf(story), contentOf(repeated), 'A seed must recreate every story detail.');
      assert.equal(story.bookId, bookId);
      assert.equal(story.format, 'picturebook-v2');
      assert.equal(story.duration, duration);
      assert.equal(story.seed, String(seed));
      assert.ok(STORY_STRUCTURES[bookId].some(structure => structure.id === story.structure) && story.plan.structure === story.structure);
      assert.equal(story.pages.length, duration * 6, 'Each duration needs six beats with 3, 6 or 9 sentence pages.');
      assert.equal(new Set(story.pages.map(page => page.id)).size, story.pages.length);
      assert.equal(new Set(paragraphs).size, paragraphs.length, `${bookId}/${story.structure}/${duration}/${seed}: longer stories must add distinct passages.`);
      assert.ok(story.title.includes(story.hero.name));
      assert.ok(text.includes(story.hero.name) && text.includes(story.companion.name), `${bookId}/${story.structure}/${seed}: both protagonists take part.`);
      assert.ok(!/undefined|null|NaN|\$\{|\{\{|\}\}|<[^>]+>/.test(text), 'No template remnants or HTML in story text.');
      assert.ok(!/\s[,.!?:]| {2}|\.\.\.|,,/.test(text), 'Story punctuation must stay clean.');
      assert.ok(!/(?<![\p{L}\p{N}])(?:de el|a el)(?![\p{L}\p{N}])/u.test(text), 'Masculine nouns use del/al after a preposition.');
      assert.ok(!/(?<!\p{L})(el|la|los|las) (el|la|los|las)(?!\p{L})/u.test(text), 'No doubled articles.');
      assert.ok(!/[aeiouáéí]rl(?:la|lo|las|los)(?!\p{L})/u.test(text), 'Pronouns attach once to their verb.');
      assert.ok(!/\b(?:al|del) (?:Playa|Montaña|Cascada|Biblioteca|Panadería|Cueva|Isla|Torre|Escuela|Consulta|Estación|Plaza|Granja|Oficina|Pista|Colina|Casa|Seta|Barca)\b|\bla hada\b/.test(text), 'Articles and place contractions must agree in Spanish.');
      assert.ok(!/\b(?:herid[oa]|sangre|asesin|cadáver|espada|matar|monstruos? (?:feroz|malvado))\b/i.test(text), 'Stories remain gentle for young children.');
      assert.equal(story.wordCount, paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0));
      assert.ok(story.wordCount >= duration * 50 && story.wordCount <= duration * 90, `${bookId}/${story.structure}/${duration}/${seed}: ${story.wordCount} words.`);
      assert.ok(sceneIds.has(story.place.id));
      assert.equal(story.plan.world.destination, story.place.id, 'The plan names the place the story is about.');
      if (bookId !== 'family') {
        assert.notEqual(story.hero.id, story.companion.id);
        assert.ok(story.hero.gender === 'm' || story.companion.gender === 'm', 'Plural noun agreements stay valid.');
        // Sea creatures never walk onto land: every page of their story is by or under the water.
        if ([story.hero, story.companion].some(character => AQUATIC.includes(character.id))) {
          assert.ok(story.pages.every(page => WATER_PLACES.includes(page.scene)), `${bookId}/${story.structure}/${seed}: a sea creature left the water.`);
        }
      }
      for (const [cause, effect] of ORDER[story.structure] || []) {
        const causeIndex = at(cause), effectIndex = at(effect);
        assert.ok(causeIndex >= 0 && effectIndex >= 0 && causeIndex < effectIndex, `${bookId}/${story.structure}/${duration}/${seed}: ${cause} must be narrated before ${effect}.`);
      }
      for (const id of story.plan.world.items) assert.ok(story.pages.some(page => page.objects.includes(id)) || duration < 9, `${id} must be drawn in the full reading.`);
      for (const page of story.pages) {
        assert.ok(sceneIds.has(page.scene));
        assert.equal(page.paragraphs.length, 1, 'A picture-book page contains one short sentence.');
        assert.ok(page.characters.length <= 3);
        assert.equal(new Set(page.characters).size, page.characters.length);
        assert.ok(page.characters.every(id => allowedCast.has(id)), 'Pages can only show the selected cast.');
        assert.ok(page.objects.every(id => objectIds.has(id) && objectMentions[id].test(page.paragraphs[0])), `${bookId}/${seed}: a page only draws what its sentence names.`);
        const words = countWords(page.paragraphs[0]);
        assert.ok(words >= 6 && words <= 24, `${bookId}/${story.structure}/${duration}/${seed}: page contains ${words} words.`);
        assert.equal((page.paragraphs[0].match(/[.!?]/g) || []).length, 1, 'Each page has exactly one sentence.');
        assert.ok(page.paragraphs[0].endsWith('.'));
        page.characters.forEach(id => (characterIds.has(id) ? usedCharacters : reached.supporting).add(id));
        page.objects.forEach(id => usedObjects.add(id));
        usedScenes.add(page.scene);
        const scene = getScene(page.scene);
        if (page.paragraphs[0].includes(scene.name) || page.paragraphs[0] === scene.detail) describedScenes.add(scene.id);
      }

      const roles = story.plan.roles;
      const { obstacle, strategy, discovery } = story.plan.blockIds;
      if (story.structure === 'elixir') {
        const elixir = ELIXIRS.find(candidate => candidate.id === story.questId);
        assert.ok(elixir.homes.includes(roles.home) && elixir.places.includes(roles.destination) && roles.home !== roles.destination, 'The elixir lives where the story travels and is needed at home.');
        assert.equal(story.pages[0].scene, roles.home);
        assert.equal(story.pages.at(-1).scene, roles.home, 'The hero returns home with the elixir.');
        assert.ok(Object.hasOwn(TRIALS[obstacle].tools, strategy) && text.includes(TRIALS[obstacle].tools[strategy]), 'The mentor gives the tool that solves the first trial.');
        assert.ok(text.includes(elixir.result), 'The elixir solves the problem that opened the story.');
        reached.trials.add(obstacle); reached.tools.add(strategy); reached.mentors.add(roles.mentor);
      }
      if (roles?.helper && roles.ability) {
        const helper = story.characters.find(character => character.id === roles.helper);
        assert.ok(ABILITIES[helper.id].includes(roles.ability), 'Only a character who can do it solves a trial with an ability.');
        reached.abilities.add(roles.ability);
      }
      if (story.structure === 'theft') {
        assert.ok(![story.hero.id, story.companion.id].includes('owl'), 'Olmo is reserved for his guardian arc.');
        const deathIndex = story.pages.findIndex(page => page.paragraphs[0].includes('Olmo murió en paz'));
        assert.ok(deathIndex >= 0 && (text.match(/murió/g) || []).length === 1);
        assert.ok(text.includes('no volvería a despertar') && text.includes('lloraron en compañía'));
        assert.ok(story.pages.slice(deathIndex).every(page => !page.characters.includes('owl')), 'The guardian cannot reappear alive after his death.');
        assert.ok(PLACE_INFO[roles.destination].trials.includes(obstacle) && Object.hasOwn(TRIALS[obstacle].tools, strategy));
        reached.trials.add(obstacle); reached.tools.add(strategy);
      } else {
        assert.ok(!text.includes('murió'), 'Only the theft structure includes a death.');
      }
      if (story.villain) {
        const plot = VILLAIN_PLOTS[story.villain.id];
        assert.ok(story.pages.some(page => page.characters.includes(story.villain.id)), 'The villain appears on the pages where it acts.');
        if (['theft', 'defense', 'spell'].includes(story.structure)) assert.ok(text.includes(plot.motive), 'The villain explains its motive, and the offer answers it.');
        reached.villains.add(story.villain.id);
      }
      if (bookId === 'relax') assert.ok(/durm/u.test(paragraphs.at(-1)) && story.moral, 'A bedtime fable ends asleep and has a moral.');
      if (story.mentor) reached.mentors.add(story.mentor.id);

      // Length adds scenes; it never redraws the cast, structure or plan.
      if (previousStory) {
        assert.deepEqual(story.characters, previousStory.characters);
        assert.equal(story.title, previousStory.title);
        assert.deepEqual(story.plan, previousStory.plan, 'Reading time cannot change the chosen plan.');
        assert.ok(story.wordCount > previousStory.wordCount + 110);
        const shorter = previousStory.pages.map(page => page.paragraphs[0]);
        let cursor = 0;
        for (const paragraph of paragraphs) if (paragraph === shorter[cursor]) cursor += 1;
        assert.equal(cursor, shorter.length, `${bookId}/${seed}: a longer reading must keep every shorter sentence in the same order.`);
      }
      previousStory = story;
      reached.structures[bookId].add(story.structure);
      reached.goals[bookId].add(story.plan.blockIds.goal);
      heroes.add(story.hero.id);
      selectedScenes.add(story.place.id);
      if (duration === 3) {
        uniqueStories.add(text);
        plans.add(JSON.stringify([story.structure, story.plan.blockIds]));
      }
      range[duration].min = Math.min(range[duration].min, story.wordCount);
      range[duration].max = Math.max(range[duration].max, story.wordCount);
      checkedStories += 1;
    }
  }
  assert.equal(reached.structures[bookId].size, STORY_STRUCTURES[bookId].length, `${bookId}: every structure must be reachable.`);
  assert.equal(reached.goals[bookId].size, STORY_BLOCK_COUNTS[bookId].goal, `${bookId}: every goal must be reachable.`);
  // Mi familia always stars the same child, so its stories differ by structure, activity, relative and home.
  assert.ok(uniqueStories.size >= sampleSize * (bookId === 'family' ? 0.4 : 0.95), `${bookId}: seeds must produce different stories (${uniqueStories.size}).`);
  assert.ok(plans.size >= sampleSize * ({ family: 0.25, friends: 0.4, relax: 0.5 }[bookId] ?? 0.6), `${bookId}: plans must vary beyond names (${plans.size}/${sampleSize}).`);
  if (bookId !== 'family') assert.ok(heroes.size >= 60, 'Cast selection must vary.');
}

assert.deepEqual([...reached.villains].sort(), VILLAINS.map(villain => villain.id).sort(), 'Every villain is reachable.');
assert.deepEqual([...reached.trials].sort(), Object.keys(TRIALS).sort(), 'Every trial is reachable.');
assert.deepEqual([...reached.tools].sort(), Object.keys(TOOLS).sort(), 'Every tool is reachable.');
assert.deepEqual([...reached.mentors].filter(id => [...ADVENTURE_MENTORS, ...RELAX_MENTORS].includes(id)).sort(), [...new Set([...ADVENTURE_MENTORS, ...RELAX_MENTORS])].sort(), 'Every mentor is reachable.');
assert.ok(reached.abilities.size >= 10, 'Companions use many different abilities.');
assert.deepEqual([...reached.supporting].filter(id => SUPPORTING.some(entry => entry.id === id)).sort(), SUPPORTING.map(entry => entry.id).sort(), 'Every baby, neighbor and pet appears.');

const changed = generateStory('friends', 3, 'immutable');
changed.hero.name = 'Changed';
changed.hero.atlas.x = 9;
assert.notEqual(generateStory('friends', 3, 'immutable').hero.name, 'Changed');
assert.equal(JSON.stringify(CHARACTERS), metadataBefore, 'Generating or editing a story must not mutate the catalogue.');
assert.equal(JSON.stringify({ SCENES, ITEMS, WORLD_ATLASES }), worldBefore, 'Stories cannot mutate shared world identities or compatibility tags.');
assert.deepEqual([...usedCharacters].sort(), [...characterIds].sort(), 'All catalogue characters must appear in generated stories.');
assert.deepEqual([...usedObjects].sort(), [...objectIds].sort(), 'All reusable elements must appear in generated stories.');
assert.deepEqual([...usedScenes].sort(), [...sceneIds].sort(), 'All locations must appear in generated stories.');
assert.deepEqual([...describedScenes].sort(), [...sceneIds].sort(), 'Each illustrated location must also be named or described on its page.');

console.log(`Verified ${checkedStories.toLocaleString('en-US')} procedural stories across ${Object.values(STORY_STRUCTURES).flat().length} structures and ${BOOKS.length * 3} book/duration combinations.`);
console.log('Roles, habitats, terrain-compatible trials, gifts used after they are given, villains redeemed for their own motive, cause before effect in every structure, catalogue identities, grammar, determinism and length: passed.');
console.table(Object.entries(stats).map(([book, durations]) => ({
  book,
  '3 min': `${durations[3].min}–${durations[3].max} words`,
  '6 min': `${durations[6].min}–${durations[6].max} words`,
  '9 min': `${durations[9].min}–${durations[9].max} words`,
})));
