import assert from 'node:assert/strict';
import { BOOKS, CHARACTERS, CHARACTER_ATLASES, CHARACTER_NAMES, SCENES, ITEMS, OBJECTS, WORLD_ATLASES, STORY_BLOCK_COUNTS, VILLAINS, VILLAIN_ATLASES, VILLAIN_NAMES, PENDING_ART, generateStory, getCharacter, getScene, getItem, getVillain } from '../src/story-engine.js';
import { ABILITIES, AQUATIC, WATER_PLACES, PLACE_INFO, TRIALS, TOOLS } from '../src/narrative-world.js';
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
const objectMentions = {
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
};
assert.deepEqual(BOOKS.map(book => book.id), ['adventure', 'action', 'relax', 'friends', 'family']);
assert.equal(characterIds.size, 52, 'The original twelve characters plus forty new characters remain available.');
assert.equal(CHARACTERS.filter(character => character.category === 'animal').length, 32);
assert.equal(CHARACTERS.filter(character => character.category === 'fantasy').length, 20);
assert.equal(CHARACTERS.filter(character => !legacyIds.has(character.id) && character.category === 'animal').length, 24);
assert.equal(CHARACTERS.filter(character => !legacyIds.has(character.id) && character.category === 'fantasy').length, 16);
assert.deepEqual(CHARACTERS.slice(0, 12).map(character => character.id), [...legacyIds]);
for (const previous of legacyCharacters) {
  const current = getCharacter(previous.id);
  for (const [key, value] of Object.entries(previous)) assert.deepEqual(current[key], value, `${previous.id}: saved stories keep their original identity and atlas position.`);
}
assert.deepEqual(CHARACTER_ATLASES.main, { file: 'characters.png', columns: 4, rows: 2 });
assert.deepEqual(CHARACTER_ATLASES.extra, { file: 'characters-extra.png', columns: 2, rows: 2 });
const addedSheets = ['animals-meadow', 'animals-world', 'animals-wings-sea', 'fantasy-forest', 'fantasy-wonders'];
assert.equal(Object.keys(CHARACTER_ATLASES).length, 7);
assert.ok(Object.isFrozen(CHARACTER_ATLASES));
for (const sheet of addedSheets) assert.deepEqual(CHARACTER_ATLASES[sheet], { file: `${sheet}.png`, columns: 4, rows: 2 });
const allNames = CHARACTERS.flatMap(character => CHARACTER_NAMES[character.id]);
assert.equal(allNames.length, 260);
assert.equal(new Set(allNames).size, allNames.length, 'Distinct catalogue characters must not acquire the same name in a story.');
assert.equal(sceneIds.size, 36, 'Keep the twelve original places and add twenty-four places.');
assert.equal(objectIds.size, 36, 'Keep the twelve original items and add twenty-four items.');
assert.equal(SCENES.length, 36);
assert.equal(ITEMS.length, 36);
assert.equal(CHARACTERS.length + SCENES.length + ITEMS.length, 124);
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
const addedWorldSheets = ['places-nature', 'places-village', 'places-wonder', 'objects-explore', 'objects-create', 'objects-treasure'];
for (const sheet of addedWorldSheets) assert.deepEqual(WORLD_ATLASES[sheet], { file: `${sheet}.png`, columns: 4, rows: 2 });
assert.equal(Object.keys(WORLD_ATLASES).length, 18);
assert.equal(Object.keys(CHARACTER_ATLASES).length + Object.keys(WORLD_ATLASES).length, 25);
assert.equal(new Set([...Object.values(CHARACTER_ATLASES), ...Object.values(WORLD_ATLASES)].map(atlas => atlas.file)).size, 25, 'Every registered atlas is a distinct offline resource.');
assert.ok(Object.isFrozen(WORLD_ATLASES) && Object.isFrozen(SCENES) && Object.isFrozen(ITEMS) && Object.isFrozen(OBJECTS));
assert.deepEqual(OBJECTS.map(object => object.id), ITEMS.map(item => item.id));
assert.equal(new Set([...SCENES, ...ITEMS].map(asset => `${asset.atlas.sheet}:${asset.atlas.x}:${asset.atlas.y}`)).size, 72);
assert.deepEqual(Object.keys(objectMentions).sort(), [...objectIds].sort());
for (const asset of [...SCENES, ...ITEMS]) {
  const atlas = WORLD_ATLASES[asset.atlas.sheet];
  assert.ok(atlas, `${asset.id}: the renderer and build share its atlas.`);
  assert.ok(Object.isFrozen(asset) && Object.isFrozen(asset.atlas));
  assert.ok(Number.isInteger(asset.atlas.x) && asset.atlas.x >= 0 && asset.atlas.x < atlas.columns);
  assert.ok(Number.isInteger(asset.atlas.y) && asset.atlas.y >= 0 && asset.atlas.y < atlas.rows);
  assert.ok(typeof asset.label === 'string' && asset.label && asset.sound === asset.id);
  if (addedWorldSheets.includes(asset.atlas.sheet)) assert.ok(Object.hasOwn(SOUND_ALIASES, asset.sound), `${asset.id}: new world art has a playable sound binding.`);
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
assert.equal(new Set(SCENES.flatMap(scene => scene.views.map(view => `${view.sheet}:${view.x}:${view.y}`))).size, 108, 'Every place has three distinct painted cells.');
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
  const cells = [...SCENES, ...ITEMS].map(asset => asset.atlas).concat(SCENES.flatMap(scene => scene.views));
  assert.equal(cells.filter(cell => cell.sheet === sheet).length, atlas.columns * atlas.rows, `${sheet}: every cell maps to one world identity or one of its views.`);
}
assert.equal(getScene('missing'), undefined);
assert.equal(getItem('missing'), undefined);
assert.equal(new Set(CHARACTERS.map(character => `${character.atlas.sheet ?? 'main'}:${character.atlas.x}:${character.atlas.y}`)).size, 52);
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

// Gentle antagonists live in their own atlas, which can be painted after the stories ship.
assert.deepEqual(VILLAIN_ATLASES, { villains: { file: 'villains.png', columns: 4, rows: 2 } });
assert.equal(VILLAINS.length, 8);
assert.deepEqual(Object.keys(VILLAIN_PLOTS).sort(), VILLAINS.map(villain => villain.id).sort(), 'Every painted villain has a motive and a redemption.');
assert.equal(new Set(VILLAINS.map(villain => `${villain.atlas.x}:${villain.atlas.y}`)).size, 8);
for (const villain of VILLAINS) {
  assert.equal(getVillain(villain.id), villain);
  assert.ok(!characterIds.has(villain.id) && Object.hasOwn(SOUND_ALIASES, villain.sound));
  assert.equal(villain.article, villain.gender === 'f' ? 'la' : 'el');
  assert.ok(VILLAIN_NAMES[villain.id].includes(villain.name));
}
assert.ok(PENDING_ART.every(file => Object.values(VILLAIN_ATLASES).some(atlas => atlas.file === file)), 'Only registered art can be pending.');
const allVillainNames = Object.values(VILLAIN_NAMES).flat();
assert.ok(allVillainNames.every(name => !allNames.includes(name)), 'Villains never share a name with a friendly character.');

// Every role list names a real catalogue entry, and every ability names a trial it can solve.
assert.deepEqual(Object.keys(ABILITIES).sort(), [...characterIds].sort(), 'Every character declares what it can do.');
for (const id of [...ADVENTURE_MENTORS, ...RELAX_MENTORS]) assert.ok(characterIds.has(id));
assert.deepEqual(Object.keys(PLACE_INFO).sort(), [...sceneIds].sort(), 'Every place declares its terrain.');
for (const info of Object.values(PLACE_INFO)) assert.ok(info.trials.every(id => TRIALS[id]));
for (const trial of Object.values(TRIALS)) {
  assert.ok(Object.keys(trial.tools).length && Object.keys(trial.tools).every(id => TOOLS[id]), 'A mentor can always give a tool for each trial.');
  for (const sentence of Object.values(trial.tools)) assert.ok(Object.keys(TOOLS).some(id => objectMentions[TOOLS[id].item].test(sentence)), 'The tool appears in the sentence that uses it.');
}
for (const elixir of ELIXIRS) {
  assert.ok(objectIds.has(elixir.item) && elixir.homes.length && elixir.places.length);
  assert.ok(elixir.places.every(id => PLACE_INFO[id].trials.length >= 2), `${elixir.id}: a destination needs two different trials.`);
}

const NIGHT_TRIALS = new Set(['night']);
const ORDER = {
  adventure: [[/fueron a pedir consejo/u, /escuchó con atención y les explicó/u], [/les regaló/u, /^(?:Ataron|Subieron al barquito|Se ataron|Engancharon|Lanzaron|Se pusieron|Siguieron|Metieron|Encendieron|Miraron por|Abrieron el paraguas)/u], [/volvieron (?:al|a la)/u, /^(?:Plantaron|Acercaron|Dejaron caer|Agitaron|Esa noche, tocaron|Metieron la perla|Al amanecer|Pusieron la miel|Subieron el molinillo|Esa noche, soltaron)/u]],
  action: [[/apareció y se llevó/u, /pedir ayuda al viejo búho Olmo/u], [/Olmo les dio/u, /Olmo murió en paz/u], [/Olmo murió en paz/u, /^Por fin encontraron/u], [/confesó que/u, /devolvió .+ y pidió perdón/u], [/devolvió .+ y pidió perdón/u, /pudo empezar/u]],
  relax: [[/ quería /u, /le propuso hacer una pausa/u], [/le propuso hacer una pausa/u, /^Primero, tomaron aire/u], [/le dijo con cariño/u, /decidió intentarlo de otra manera/u], [/recordó lo que había aprendido/u, /se durmió tranquilamente/u]],
  friends: [[/tuvo una idea:/u, /le contó su plan/u], [/pensó un momento y propuso/u, /probó la idea, y esta vez funcionó/u], [/decidió llamarlo/u, /aprendió que/u]],
  family: [[/tuvo una idea:/u, /le contó su plan/u], [/pensó un momento y propuso/u, /probó la idea, y esta vez funcionó/u], [/decidió llamarlo/u, /aprendió que/u]],
};
const reached = { elixirs: new Set(), targets: new Set(), villains: new Set(), trials: new Set(), tools: new Set(), mentors: new Set(), lairs: new Set(), homes: new Set(), abilities: new Set() };

for (const { id: bookId } of BOOKS) {
  const quests = new Set();
  const heroes = new Set();
  const companions = new Set();
  const destinations = new Set();
  const plans = new Set();
  const uniqueStories = new Set();
  const range = Object.fromEntries([3, 6, 9].map(duration => [duration, { min: Infinity, max: -Infinity }]));
  stats[bookId] = range;
  const sampleSize = bookId === 'action' || bookId === 'adventure' ? 2_000 : 1_000;
  for (let seed = 0; seed < sampleSize; seed += 1) {
    let previousStory;
    for (const duration of [3, 6, 9]) {
      const story = generateStory(bookId, duration, seed);
      const repeated = generateStory(bookId, duration, seed);
      const text = textOf(story);
      const paragraphs = story.pages.flatMap(page => page.paragraphs);
      const cast = story.characters;
      const allowedCast = new Set(cast.map(character => character.id));
      const at = pattern => paragraphs.findIndex(paragraph => pattern.test(paragraph));

      assert.deepEqual(contentOf(story), contentOf(repeated), 'A seed must recreate every story detail.');
      assert.equal(story.bookId, bookId);
      assert.equal(story.format, 'picturebook-v2');
      assert.equal(story.duration, duration);
      assert.equal(story.seed, String(seed));
      assert.equal(story.pages.length, duration * 6, 'Each duration needs six beats with 3, 6 or 9 sentence pages.');
      assert.equal(new Set(story.pages.map(page => page.id)).size, story.pages.length);
      assert.equal(new Set(paragraphs).size, paragraphs.length, 'Longer stories must add distinct passages.');
      assert.ok(story.title.includes(story.hero.name));
      assert.ok(text.includes(story.hero.name) && text.includes(story.companion.name));
      assert.ok(!/undefined|null|NaN|\$\{|\{\{|\}\}|<[^>]+>/.test(text), 'No template remnants or HTML in story text.');
      assert.ok(!/\s[,.!?:]| {2}|\.\.\.|,,/.test(text), 'Story punctuation must stay clean.');
      assert.ok(!/(?<![\p{L}\p{N}])(?:de el|a el)(?![\p{L}\p{N}])/u.test(text), 'Masculine nouns use del/al after a preposition.');
      assert.ok(!/\b(?:al|del) (?:Playa|Montaña|Cascada|Biblioteca|Panadería|Cueva|Isla|Torre)\b|\bla hada\b/.test(text), 'Articles and place contractions must agree in Spanish.');
      assert.ok(!/\b(?:herid[oa]|sangre|asesin|cadáver|espada|matar|monstruo)\b/i.test(text), 'Action remains gentle for young children.');
      assert.equal(story.wordCount, paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0));
      assert.ok(story.wordCount >= duration * 55 && story.wordCount <= duration * 90, `${bookId}/${duration}/${seed}: ${story.wordCount} words.`);
      assert.ok(Number.isFinite(Date.parse(story.createdAt)));
      assert.ok(sceneIds.has(story.place.id) && story.place.scene === story.place.id);
      assert.equal(story.plan.world.destination, story.place.id, 'The plan selects the destination used by the actual story.');
      if (bookId !== 'family') {
        assert.notEqual(story.hero.id, story.companion.id);
        assert.ok(story.hero.gender === 'm' || story.companion.gender === 'm', 'Plural noun agreements stay valid.');
        // Sea creatures never walk onto land: every page of their story is by or under the water.
        if ([story.hero, story.companion].some(character => AQUATIC.includes(character.id))) {
          assert.ok(story.pages.every(page => WATER_PLACES.includes(page.scene)), `${bookId}/${seed}: a sea creature left the water.`);
        }
      }
      for (const [cause, effect] of ORDER[bookId]) {
        const causeIndex = at(cause), effectIndex = at(effect);
        assert.ok(causeIndex >= 0 && effectIndex >= 0 && causeIndex < effectIndex, `${bookId}/${duration}/${seed}: ${cause} must be narrated before ${effect}.`);
      }
      for (const id of story.plan.world.items) {
        assert.ok(objectIds.has(id));
        // Quests show their key objects in every length; everyday activities show all their materials in the full reading.
        if (duration === 9 || ['adventure', 'action'].includes(bookId)) assert.ok(story.pages.some(page => page.objects.includes(id)), `${bookId}/${duration}/${seed}: ${id} must be drawn.`);
      }
      for (const page of story.pages) {
        assert.ok(sceneIds.has(page.scene));
        assert.equal(page.paragraphs.length, 1, 'A picture-book page contains one short sentence.');
        assert.ok(page.characters.length <= 3);
        assert.equal(new Set(page.characters).size, page.characters.length);
        assert.ok(page.characters.every(id => allowedCast.has(id)), 'Pages can only show the selected cast.');
        assert.ok(Array.isArray(page.objects) && page.objects.every(id => objectIds.has(id)), 'Every element must have a matching reusable illustration.');
        assert.ok(page.objects.every(id => objectMentions[id].test(page.paragraphs[0])), `${bookId}/${seed}: a page only draws what its sentence names.`);
        const words = countWords(page.paragraphs[0]);
        assert.ok(words >= 6 && words <= 24, `${bookId}/${duration}/${seed}: page contains ${words} words.`);
        assert.equal((page.paragraphs[0].match(/[.!?]/g) || []).length, 1, 'Each page has exactly one sentence.');
        assert.ok(page.paragraphs[0].endsWith('.'));
        page.characters.filter(id => characterIds.has(id)).forEach(id => usedCharacters.add(id));
        page.objects.forEach(id => usedObjects.add(id));
        usedScenes.add(page.scene);
        const scene = getScene(page.scene);
        if (page.paragraphs[0].includes(scene.name) || page.paragraphs[0] === scene.detail) describedScenes.add(scene.id);
      }

      const roles = story.plan.roles;
      if (bookId === 'adventure') {
        const elixir = ELIXIRS.find(candidate => candidate.id === story.questId);
        const mentor = story.mentor;
        assert.ok(elixir && elixir.homes.includes(roles.home) && elixir.places.includes(roles.destination) && roles.home !== roles.destination, 'The elixir lives where the story travels and is needed at home.');
        assert.ok(ADVENTURE_MENTORS.includes(mentor.id) && ![story.hero.id, story.companion.id].includes(mentor.id));
        assert.equal(story.pages[0].scene, roles.home);
        assert.equal(story.pages.at(-1).scene, roles.home, 'The hero returns home with the elixir.');
        const { obstacle, strategy, discovery } = story.plan.blockIds;
        assert.ok(PLACE_INFO[roles.destination].trials.includes(obstacle) && PLACE_INFO[roles.destination].trials.includes(discovery) && obstacle !== discovery, 'Both trials are possible on that terrain.');
        assert.ok(Object.hasOwn(TRIALS[obstacle].tools, strategy), 'The mentor gives the tool that solves the first trial.');
        assert.ok(text.includes(TRIALS[obstacle].tools[strategy]));
        if (roles.helper) {
          const helper = [story.hero, story.companion].find(character => character.id === roles.helper);
          assert.ok(ABILITIES[helper.id].includes(roles.ability) && Object.hasOwn(TRIALS[discovery].abilities, roles.ability), 'Only a character who can do it solves the second trial.');
          assert.ok(text.includes(TRIALS[discovery].abilities[roles.ability](helper.name)));
          reached.abilities.add(roles.ability);
        }
        assert.ok(text.includes(elixir.result), 'The elixir solves the problem that opened the story.');
        assert.ok(at(/^Por fin encontraron/u) < paragraphs.findIndex(paragraph => paragraph.includes(elixir.accept)), 'The elixir is found before it is earned.');
        reached.elixirs.add(elixir.id); reached.trials.add(obstacle); reached.trials.add(discovery); reached.tools.add(strategy); reached.mentors.add(mentor.id); reached.homes.add(roles.home);
      }
      if (bookId === 'action') {
        const villain = story.villain;
        const plot = VILLAIN_PLOTS[villain.id];
        const target = TARGETS.find(candidate => candidate.id === story.questId);
        assert.ok(plot.targets.includes(target.id) && target.homes.includes(roles.home) && plot.lairs.includes(roles.destination) && roles.home !== roles.destination);
        assert.equal(story.pages[0].scene, roles.home);
        assert.equal(story.pages.at(-1).scene, roles.home);
        assert.ok(!allowedCast.has('owl') || story.guardian.id === 'owl');
        assert.ok(![story.hero.id, story.companion.id].includes('owl'), 'Olmo is reserved for his guardian arc.');
        const deathIndex = story.pages.findIndex(page => page.paragraphs[0].includes('Olmo murió en paz'));
        assert.ok(deathIndex >= 0);
        assert.equal((text.match(/murió/g) || []).length, 1);
        assert.ok(text.includes('no volvería a despertar') && text.includes('lloraron en compañía'));
        assert.ok(story.pages.slice(0, deathIndex).some(page => page.characters.includes('owl')));
        assert.ok(story.pages.slice(deathIndex).every(page => !page.characters.includes('owl')), 'The guardian cannot reappear alive after his death.');
        assert.ok(story.pages.slice(0, duration).some(page => page.characters.includes(villain.id)), 'The villain appears in the first beat.');
        for (const piece of [plot.motive, plot.offer.split(' {')[0], plot.change]) assert.ok(text.includes(piece), 'The motive and the redemption that answers it are always told.');
        for (const id of target.objects) {
          assert.ok(story.pages.slice(0, duration).some(page => page.objects.includes(id)), `${target.id}: the stolen thing is shown when it is taken.`);
          assert.ok(story.pages.slice(duration * 5).some(page => page.objects.includes(id)), `${target.id}: the stolen thing is back for the ending.`);
        }
        const { obstacle, strategy } = story.plan.blockIds;
        assert.ok(PLACE_INFO[roles.destination].trials.includes(obstacle) && Object.hasOwn(TRIALS[obstacle].tools, strategy));
        reached.targets.add(target.id); reached.villains.add(villain.id); reached.lairs.add(roles.destination); reached.trials.add(obstacle); reached.tools.add(strategy); reached.homes.add(roles.home);
      } else {
        assert.ok(!text.includes('murió'), 'The other books do not add a death plot.');
      }
      if (bookId === 'relax') {
        assert.ok(story.moral && text.toLocaleLowerCase('es').includes(story.moral.replace(/\.$/, '').toLocaleLowerCase('es')));
        assert.ok(RELAX_MENTORS.includes(story.mentor.id) && ![story.hero.id, story.companion.id].includes(story.mentor.id));
        assert.ok(RELAX_GOALS.find(goal => goal.id === story.questId).scenes.includes(story.place.id));
        assert.ok(paragraphs.at(-1).includes('se durmió'), 'A bedtime fable ends asleep.');
        reached.mentors.add(story.mentor.id);
      }
      if (bookId === 'friends') assert.ok(FRIEND_GOALS.find(goal => goal.id === story.questId).scenes.includes(story.place.id));
      if (bookId === 'family') assert.ok(FAMILY_GOALS.find(goal => goal.id === story.questId).scenes.includes(story.place.id));

      // Length adds scenes; it never redraws the cast, goal or place midway through the same story.
      if (previousStory) {
        assert.deepEqual(story.characters, previousStory.characters);
        assert.deepEqual(story.place, previousStory.place);
        assert.equal(story.title, previousStory.title);
        assert.deepEqual(story.plan, previousStory.plan, 'Reading time cannot change the chosen plan.');
        assert.ok(story.wordCount > previousStory.wordCount + 150);
        const shorter = previousStory.pages.map(page => page.paragraphs[0]);
        let cursor = 0;
        for (const paragraph of paragraphs) if (paragraph === shorter[cursor]) cursor += 1;
        assert.equal(cursor, shorter.length, `${bookId}/${seed}: a longer reading must keep every shorter sentence in the same order.`);
      }
      previousStory = story;

      quests.add(story.questId);
      heroes.add(story.hero.id);
      companions.add(story.companion.id);
      destinations.add(story.place.id);
      selectedScenes.add(story.place.id);
      story.plan.world.items.forEach(id => selectedObjects.add(id));
      if (duration === 3) {
        uniqueStories.add(text);
        plans.add(JSON.stringify(story.plan.blockIds));
      }
      range[duration].min = Math.min(range[duration].min, story.wordCount);
      range[duration].max = Math.max(range[duration].max, story.wordCount);
      checkedStories += 1;
    }
  }
  assert.equal(quests.size, STORY_BLOCK_COUNTS[bookId].goal, `${bookId}: every goal must be reachable.`);
  assert.ok(uniqueStories.size >= sampleSize * 0.95, `${bookId}: seeds must produce different stories.`);
  assert.ok(plans.size >= sampleSize * (bookId === 'family' ? 0.3 : 0.5), `${bookId}: plans must vary beyond names (${plans.size}/${sampleSize}).`);
  if (bookId !== 'family') assert.ok(heroes.size >= 40 && companions.size >= 40, 'Cast selection must vary.');
}

assert.deepEqual([...reached.elixirs].sort(), ELIXIRS.map(elixir => elixir.id).sort(), 'Every elixir is reachable.');
assert.deepEqual([...reached.targets].sort(), TARGETS.map(target => target.id).sort(), 'Every stolen thing is reachable.');
assert.deepEqual([...reached.villains].sort(), VILLAINS.map(villain => villain.id).sort(), 'Every villain is reachable.');
assert.deepEqual([...reached.trials].sort(), Object.keys(TRIALS).sort(), 'Every trial is reachable.');
assert.deepEqual([...reached.tools].sort(), Object.keys(TOOLS).sort(), 'Every tool is reachable.');
assert.deepEqual([...reached.mentors].sort(), [...new Set([...ADVENTURE_MENTORS, ...RELAX_MENTORS])].sort(), 'Every mentor is reachable.');
assert.ok(reached.abilities.size >= 10, 'Companions use many different abilities.');

const changed = generateStory('friends', 3, 'immutable');
changed.hero.name = 'Changed';
changed.hero.atlas.x = 9;
assert.notEqual(generateStory('friends', 3, 'immutable').hero.name, 'Changed');
assert.equal(JSON.stringify(CHARACTERS), metadataBefore, 'Generating or editing a story must not mutate the catalogue.');
assert.equal(JSON.stringify({ SCENES, ITEMS, WORLD_ATLASES }), worldBefore, 'Stories cannot mutate shared world identities or compatibility tags.');
assert.deepEqual([...usedCharacters].sort(), [...characterIds].sort(), 'All 52 characters must appear in generated stories.');
assert.deepEqual([...usedObjects].sort(), [...objectIds].sort(), 'All 36 reusable elements must appear in generated stories.');
assert.deepEqual([...usedScenes].sort(), [...sceneIds].sort(), 'All 36 locations must appear in generated stories.');
assert.deepEqual([...selectedScenes].sort(), [...sceneIds].sort(), 'All 36 locations must be a real story destination.');
assert.deepEqual([...describedScenes].sort(), [...sceneIds].sort(), 'Each illustrated location must also be named or described on its page.');

console.log(`Verified ${checkedStories.toLocaleString('en-US')} procedural stories across all ${BOOKS.length * 3} book/duration combinations.`);
console.log('Roles, habitats, terrain-compatible trials, gifts used after they are given, villains redeemed for their own motive, elixirs that solve the opening problem, catalogue identities, grammar, determinism and length: passed.');
console.table(Object.entries(stats).map(([book, durations]) => ({
  book,
  '3 min': `${durations[3].min}–${durations[3].max} words`,
  '6 min': `${durations[6].min}–${durations[6].max} words`,
  '9 min': `${durations[9].min}–${durations[9].max} words`,
})));
