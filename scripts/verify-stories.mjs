import assert from 'node:assert/strict';
import { BOOKS, CHARACTERS, CHARACTER_ATLASES, CHARACTER_NAMES, SCENES, ITEMS, OBJECTS, WORLD_ATLASES, STORY_BLOCK_COUNTS, generateStory, getCharacter, getScene, getItem } from '../src/story-engine.js';
import { createDefaultFamily } from '../src/family-characters.js';
import { SOUND_ALIASES } from '../src/audio.js';

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
  'paper-star': /estrella de papel/iu, shell: /concha/iu, pearl: /perla/iu,
  crystal: /cristal/iu, acorn: /bellota/iu, apple: /manzana/iu, 'honey-jar': /miel/iu,
  teacup: /taza/iu, 'watering-can': /regadera/iu,
};

// Ignore cosmetic choices when measuring narrative variety: a new name alone is not a new plot.
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const placeDescriptions = SCENES.flatMap(scene => [scene.name, scene.detail, scene.label, scene.label.replace(/^(?:el|la) /u, '')]);
function narrativeOf(story, text = textOf(story)) {
  const cast = story.characters || [story.hero, story.companion, story.guardian].filter(Boolean);
  const descriptions = cast.flatMap(character => [
    `${character.name}, ${character.article} ${character.label},`,
    `${character.article} ${character.label}`,
  ]).filter(description => !description.includes('undefined'));
  let normalized = text;
  for (const value of [...descriptions, ...cast.map(character => character.name), ...placeDescriptions].sort((a, b) => b.length - a.length)) {
    if (normalized.includes(value)) normalized = normalized.replace(new RegExp(escapeRegExp(value), 'gu'), '[personaje/lugar]');
  }
  return normalized;
}

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
assert.equal(Object.keys(WORLD_ATLASES).length, 9);
assert.equal(Object.keys(CHARACTER_ATLASES).length + Object.keys(WORLD_ATLASES).length, 16);
assert.equal(new Set([...Object.values(CHARACTER_ATLASES), ...Object.values(WORLD_ATLASES)].map(atlas => atlas.file)).size, 16, 'Every registered atlas is a distinct offline resource.');
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
}
for (const item of ITEMS) {
  assert.equal(getItem(item.id), item);
  assert.ok(['el', 'la', 'los', 'las'].includes(item.article));
}
for (const [sheet, atlas] of Object.entries(WORLD_ATLASES)) {
  assert.ok(Object.isFrozen(atlas));
  assert.equal([...SCENES, ...ITEMS].filter(asset => asset.atlas.sheet === sheet).length, atlas.columns * atlas.rows, `${sheet}: every cell maps to one world identity.`);
}
assert.equal(getScene('missing'), undefined);
assert.equal(getItem('missing'), undefined);
for (const [bookId, count] of Object.entries({ adventure: 24, relax: 16, friends: 20, family: 20 })) {
  assert.equal(STORY_BLOCK_COUNTS[bookId].goal, count, `${bookId}: the expanded world needs new authored goals, not only additional pictures.`);
}
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

for (const { id: bookId } of BOOKS) {
  const variants = new Set();
  const quests = new Set();
  const heroes = new Set();
  const companions = new Set();
  const destinations = new Set();
  const uniqueStories = new Set();
  const uniqueNarratives = new Set();
  const openingPassages = new Set();
  const endingPassages = new Set();
  const strategyPassages = new Set();
  const discoveryPassages = new Set();
  const proseContexts = { strategy: new Map(), discovery: new Map() };
  const selectedBlocks = Object.fromEntries(['opening', 'goal', 'obstacle', 'strategy', 'discovery', 'ending'].map(key => [key, new Set()]));
  const range = Object.fromEntries([3, 6, 9].map(duration => [duration, { min: Infinity, max: -Infinity }]));
  stats[bookId] = range;

  for (let seed = 0; seed < 1_000; seed += 1) {
    let previousStory;
    for (const duration of [3, 6, 9]) {
      const story = generateStory(bookId, duration, seed);
      const repeated = generateStory(bookId, duration, seed);
      const text = textOf(story);
      const paragraphs = story.pages.flatMap(page => page.paragraphs);
      const cast = story.characters || [story.hero, story.companion, story.guardian].filter(Boolean);
      const allowedCast = new Set(cast.map(character => character.id));

      assert.deepEqual(contentOf(story), contentOf(repeated), 'A seed must recreate every story detail.');
      assert.equal(story.bookId, bookId);
      assert.equal(story.format, 'picturebook-v2');
      assert.equal(story.duration, duration);
      assert.equal(story.seed, String(seed));
      assert.equal(story.pages.length, duration * 6, 'Each duration needs six beats with 3, 6 or 9 sentence pages.');
      assert.equal(story.pages.length % 2, 0, 'Tablet spreads need an even page count.');
      assert.equal(new Set(story.pages.map(page => page.id)).size, story.pages.length);
      assert.equal(new Set(paragraphs).size, paragraphs.length, 'Longer stories must add distinct passages.');
      assert.ok(story.title.includes(story.hero.name));
      assert.ok(text.includes(story.hero.name) && text.includes(story.companion.name));
      assert.ok(!/undefined|null|NaN|\$\{|\{\{|\}\}|<[^>]+>/.test(text), 'No template remnants or HTML in story text.');
      assert.ok(!/\s[,.!?]| {2}|\.\.\./.test(text), 'Story punctuation must stay clean.');
      assert.ok(!/\b(?:al|del) (?:Playa|Montaña)\b|\bla hada\b/.test(text), 'Articles and place contractions must agree in Spanish.');
      assert.ok(!/\b(?:herid[oa]|sangre|asesin|cadáver|espada afilada)\b/i.test(text), 'Action remains gentle for young children.');
      assert.equal(story.wordCount, paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0));
      assert.ok(story.wordCount >= duration * 55 && story.wordCount <= duration * 90, 'Duration includes pauses to enjoy and touch illustrations.');
      assert.ok(Number.isFinite(Date.parse(story.createdAt)));
      assert.ok(sceneIds.has(story.place.id) && story.place.scene === story.place.id);
      selectedScenes.add(story.place.id);
      if (story.place.article === 'la') assert.ok(!new RegExp(`\\b(?:al|del) ${escapeRegExp(story.place.name)}`, 'u').test(text), 'Feminine destination names need a la/de la.');
      if (bookId !== 'family') {
        assert.notEqual(story.hero.id, story.companion.id);
        assert.ok(story.hero.gender === 'm' || story.companion.gender === 'm', 'Plural noun agreements stay valid.');
      } else {
        assert.equal(story.hero.role, 'child', 'The customized child is always the protagonist.');
        assert.deepEqual(cast.map(character => character.id), createDefaultFamily().members.map(character => character.id));
      }
      assert.ok(story.plan?.blockIds, 'Every story exposes the reusable blocks chosen for its plan.');
      assert.equal(story.plan.world?.destination, story.place.id, 'The plan selects the destination used by the actual story.');
      assert.ok(Array.isArray(story.plan.world.items) && story.plan.world.items.length && story.plan.world.items.every(id => objectIds.has(id)));
      assert.equal(new Set(story.plan.world.items).size, story.plan.world.items.length);
      for (const id of story.plan.world.items) {
        selectedObjects.add(id);
        assert.ok(story.pages.some(page => page.objects.includes(id)), `${bookId}/${seed}: selected ${id} must appear in an illustration.`);
        if (!legacyObjects.some(([legacyId]) => legacyId === id)) {
          assert.ok(story.pages.some(page => page.objects.includes(id) && objectMentions[id].test(page.paragraphs[0])), `${bookId}/${duration}/${seed}: selected ${id} must participate in authored text beside its drawing.`);
        }
      }
      destinations.add(story.plan.world.destination);
      if (bookId === 'family') assert.ok(getScene(story.place.id).tags.includes('family'), 'Family stories select everyday places intended for the child.');
      if (bookId === 'action') assert.ok(getScene(story.place.id).tags.includes('fortress'), 'The guardian and wind-door arc need a compatible fortress setting.');
      for (const key of Object.keys(selectedBlocks)) {
        assert.equal(typeof story.plan.blockIds[key], 'string');
        assert.ok(story.plan.blockIds[key].length > 0);
        selectedBlocks[key].add(story.plan.blockIds[key]);
      }

      for (const page of story.pages) {
        assert.ok(sceneIds.has(page.scene));
        assert.equal(page.paragraphs.length, 1, 'A picture-book page contains one short sentence.');
        assert.ok(page.characters.length <= 3);
        assert.equal(new Set(page.characters).size, page.characters.length);
        assert.ok(page.characters.every(id => allowedCast.has(id)), 'Pages can only show the selected cast.');
        if (bookId !== 'family') assert.ok(page.characters.every(id => characterIds.has(id)));
        assert.ok(Array.isArray(page.objects) && page.objects.every(id => objectIds.has(id)), 'Every element must have a matching reusable illustration.');
        assert.equal(new Set(page.objects).size, page.objects.length);
        const words = countWords(page.paragraphs.join(' '));
        assert.ok(words >= 6 && words <= 24, `${bookId}/${duration}/${seed}: page contains ${words} words.`);
        assert.equal((page.paragraphs[0].match(/[.!?]/g) || []).length, 1, 'Each page has exactly one sentence.');
        assert.ok(page.paragraphs[0].endsWith('.'));
        page.characters.filter(id => characterIds.has(id)).forEach(id => usedCharacters.add(id));
        page.objects.forEach(id => usedObjects.add(id));
        for (const id of page.objects) {
          if (duration === 3 && objectMentions[id].test(page.paragraphs[0])) narratedObjects.get(id).add(narrativeOf(story, page.paragraphs[0]));
        }
        usedScenes.add(page.scene);
        const scene = getScene(page.scene);
        if (page.paragraphs[0].includes(scene.name) || page.paragraphs[0] === scene.detail) describedScenes.add(scene.id);
      }

      // Length adds scenes; it never redraws the cast, goal or place midway through the same story.
      if (previousStory) {
        assert.deepEqual(story.hero, previousStory.hero);
        assert.deepEqual(story.companion, previousStory.companion);
        assert.deepEqual(story.place, previousStory.place);
        assert.equal(story.title, previousStory.title);
        assert.equal(story.questId, previousStory.questId);
        assert.equal(story.variantId, previousStory.variantId);
        assert.deepEqual(story.plan, previousStory.plan, 'Reading time cannot change the chosen narrative blocks.');
        assert.deepEqual(story.characters, previousStory.characters);
        assert.ok(story.wordCount > previousStory.wordCount + 150);
      }
      previousStory = story;

      if (bookId === 'action') {
        const deathIndex = story.pages.findIndex(page => page.paragraphs.some(paragraph => paragraph.includes('Olmo murió en paz')));
        assert.ok(deathIndex >= 0);
        assert.equal((text.match(/murió/g) || []).length, 1);
        assert.ok(text.includes('no volvería a despertar'));
        assert.ok(text.includes('lloraron en compañía'));
        assert.ok(text.includes('Olmo no volvería'));
        assert.ok(story.pages.slice(0, deathIndex).some(page => page.characters.includes('owl')));
        assert.ok(story.pages.slice(deathIndex).every(page => !page.characters.includes('owl')), 'The guardian cannot reappear alive after his death.');
        assert.ok(text.indexOf('respirar tres veces') < text.indexOf('Olmo murió'));
        assert.ok(text.indexOf('Olmo murió') < text.indexOf('giraron la llave'));
        assert.ok(story.pages.slice(duration * 3, duration * 4).every(page => !page.characters.includes('owl')));
      } else {
        assert.ok(!text.includes('murió'), 'The other books do not add a death plot.');
      }
      if (bookId === 'adventure') {
        assert.equal(story.pages[0].scene, 'garden');
        assert.equal(story.pages.at(-1).scene, 'garden');
        const collectionIndex = story.pages.findIndex(page => /^Guardaron .+ en la cesta y volvieron al jardín/u.test(page.paragraphs[0]));
        assert.ok(collectionIndex > 0, 'The gift is collected before it is brought back to the garden.');
        assert.equal(story.pages[collectionIndex].scene, 'garden');
        assert.ok(story.pages.slice(1, collectionIndex).some(page => page.scene !== 'garden' && page.objects.some(id => story.pages[collectionIndex].objects.includes(id))), 'The returning gift must already have appeared during the journey.');
      }
      if (bookId === 'relax') {
        assert.ok(story.moral && text.toLocaleLowerCase('es').includes(story.moral.replace(/\.$/, '').toLocaleLowerCase('es')));
      }
      variants.add(story.variantId);
      quests.add(story.questId);
      heroes.add(story.hero.id);
      companions.add(story.companion.id);
      if (duration === 3) {
        uniqueStories.add(text);
        uniqueNarratives.add(narrativeOf(story));
        openingPassages.add(narrativeOf(story, paragraphs[0]));
        endingPassages.add(narrativeOf(story, paragraphs.at(-1)));
        const strategyText = narrativeOf(story, paragraphs[bookId === 'action' ? 4 : 7]);
        const discoveryText = narrativeOf(story, paragraphs[bookId === 'action' ? 6 : bookId === 'adventure' ? 10 : 12]);
        strategyPassages.add(strategyText);
        discoveryPassages.add(discoveryText);
        for (const [key, passage] of [['strategy', strategyText], ['discovery', discoveryText]]) {
          const context = `${story.questId}/${story.variantId}`;
          if (!proseContexts[key].has(context)) proseContexts[key].set(context, new Map());
          const choices = proseContexts[key].get(context);
          const blockId = story.plan.blockIds[key];
          if (!choices.has(blockId)) choices.set(blockId, new Set());
          choices.get(blockId).add(passage);
        }
      }
      range[duration].min = Math.min(range[duration].min, story.wordCount);
      range[duration].max = Math.max(range[duration].max, story.wordCount);
      checkedStories += 1;
    }
  }

  for (const [key, ids] of Object.entries(selectedBlocks)) {
    assert.equal(ids.size, STORY_BLOCK_COUNTS[bookId][key], `${bookId}: every ${key} block must be reachable.`);
  }
  assert.ok(quests.size >= (bookId === 'action' ? 1 : 8), `${bookId}: substantive goals/activities must be reachable.`);
  assert.ok(variants.size >= 5, `${bookId}: obstacles must vary independently of the goal.`);
  if (bookId !== 'family') assert.ok(heroes.size >= 4 && companions.size >= 3, 'Cast selection must vary.');
  if (['adventure', 'relax', 'friends'].includes(bookId)) {
    assert.deepEqual([...new Set([...heroes, ...companions])].sort(), [...characterIds].sort(), `${bookId}: all 52 characters must be reachable through ordinary seeded generation.`);
    const expectedDestinations = [...sceneIds].filter(id => bookId !== 'adventure' || id !== 'garden');
    assert.deepEqual([...destinations].sort(), expectedDestinations.sort(), `${bookId}: every destination needs a compatible, reachable authored plan.`);
  }
  if (bookId === 'action') {
    assert.ok(!heroes.has('owl') && !companions.has('owl'), 'Olmo is reserved for his permanent guardian arc.');
    assert.deepEqual([...new Set([...heroes, ...companions])].sort(), [...characterIds].filter(id => id !== 'owl').sort(), 'All other characters must be reachable in Action.');
    assert.deepEqual([...destinations].sort(), SCENES.filter(scene => scene.tags.includes('fortress')).map(scene => scene.id).sort(), 'Every compatible Action setting must be reachable.');
  }
  if (bookId === 'family') assert.deepEqual([...destinations].sort(), SCENES.filter(scene => scene.tags.includes('family')).map(scene => scene.id).sort(), 'Family activities must reach all everyday settings available to them.');
  assert.ok(uniqueStories.size >= 750, 'Procedural choices should produce different combinations.');
  assert.ok(uniqueNarratives.size >= 900, `${bookId}: cosmetic changes alone cannot count as new narratives (${uniqueNarratives.size}/1,000).`);
  assert.ok(openingPassages.size >= 6, `${bookId}: different openings must change the actual prose.`);
  assert.ok(endingPassages.size >= 6, `${bookId}: different endings must change the actual prose.`);
  assert.ok(strategyPassages.size >= 4, `${bookId}: strategies must change what the characters actually do.`);
  assert.ok(discoveryPassages.size >= 6, `${bookId}: discoveries must change the illustrated story.`);
  for (const [key, contexts] of Object.entries(proseContexts)) {
    const expected = STORY_BLOCK_COUNTS[bookId][key];
    const demonstrated = [...contexts.values()].filter(choices => choices.size === expected &&
      new Set([...choices.values()].map(passages => [...passages].sort()[0])).size === expected);
    assert.ok(demonstrated.length >= 3, `${bookId}: each ${key} needs distinct prose with the same goal and obstacle, across multiple plans.`);
  }
}

const changed = generateStory('friends', 3, 'immutable');
changed.hero.name = 'Changed';
changed.hero.atlas.x = 9;
assert.notEqual(generateStory('friends', 3, 'immutable').hero.name, 'Changed');
assert.equal(JSON.stringify(CHARACTERS), metadataBefore, 'Generating or editing a story must not mutate the catalogue.');
assert.equal(JSON.stringify({ SCENES, ITEMS, WORLD_ATLASES }), worldBefore, 'Stories cannot mutate shared world identities or compatibility tags.');
assert.deepEqual([...usedCharacters].sort(), [...characterIds].sort(), 'All 52 characters must appear in generated stories.');
assert.deepEqual([...usedObjects].sort(), [...objectIds].sort(), 'All 36 reusable elements must appear in generated stories.');
assert.deepEqual([...usedScenes].sort(), [...sceneIds].sort(), 'All 36 locations must appear in generated stories.');
assert.deepEqual([...selectedScenes].sort(), [...sceneIds].sort(), 'All 36 locations must be selected as a real story destination.');
assert.deepEqual([...selectedObjects].sort(), [...objectIds].sort(), 'All 36 elements must be selected by authored goals or activities.');
assert.deepEqual([...describedScenes].sort(), [...sceneIds].sort(), 'Each illustrated location must also be named or described on its page.');
for (const [id, passages] of narratedObjects) {
  assert.ok(passages.size >= (legacyObjects.some(([legacyId]) => legacyId === id) ? 1 : 3), `${id}: new elements need several distinct authored uses in prose and matching illustrations, not a decorative prop list.`);
}

console.log(`Verified ${checkedStories.toLocaleString('en-US')} procedural stories across all ${BOOKS.length * 3} book/duration combinations.`);
console.log('All 52 characters and 124 reusable assets, narrated and illustrated world coverage, original saved-story identities, grammar, determinism, length, cast continuity, actual narrative variation, and permanent guardian death: passed.');
console.table(Object.entries(stats).map(([book, durations]) => ({
  book,
  '3 min': `${durations[3].min}–${durations[3].max} words`,
  '6 min': `${durations[6].min}–${durations[6].max} words`,
  '9 min': `${durations[9].min}–${durations[9].max} words`,
})));
