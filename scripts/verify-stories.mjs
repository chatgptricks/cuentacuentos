import assert from 'node:assert/strict';
import { BOOKS, CHARACTERS, OBJECTS, generateStory, getCharacter } from '../src/story-engine.js';

const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
const textOf = story => story.pages.flatMap(page => page.paragraphs).join('\n');
const contentOf = ({ createdAt, ...story }) => story;
const sceneIds = new Set(['forest', 'castle', 'lake', 'garden', 'beach', 'mountain', 'treehouse', 'village', 'meadow', 'cave', 'river', 'clouds']);
const characterIds = new Set(CHARACTERS.map(character => character.id));
const objectIds = new Set(OBJECTS.map(object => object.id));
const usedCharacters = new Set();
const usedObjects = new Set();
const usedScenes = new Set();
const expectedVariants = { adventure: 3, action: 3, relax: 4, friends: 4 };
const expectedQuests = { adventure: 4, action: 1, relax: 4, friends: 4 };
const metadataBefore = JSON.stringify(CHARACTERS);
const stats = {};
let checkedStories = 0;

assert.deepEqual(BOOKS.map(book => book.id), ['adventure', 'action', 'relax', 'friends']);
assert.equal(characterIds.size, 12);
assert.equal(objectIds.size, 12);
assert.deepEqual(OBJECTS.map(object => object.id), ['seed', 'bell', 'drop', 'feather', 'key', 'umbrella', 'cloud', 'yarn', 'blanket', 'basket', 'flower', 'boat']);
assert.equal(new Set(CHARACTERS.map(character => `${character.atlas.sheet ?? 'main'}:${character.atlas.x}:${character.atlas.y}`)).size, 12);
for (const character of CHARACTERS) {
  assert.ok(character.atlas.x >= 0 && character.atlas.x < (character.atlas.sheet === 'extra' ? 2 : 4));
  assert.ok(character.atlas.y >= 0 && character.atlas.y < 2);
  assert.equal(character.article, character.label === 'hada' ? 'el' : character.gender === 'f' ? 'la' : 'el');
  assert.equal(getCharacter(character.id), character);
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
  const uniqueStories = new Set();
  const range = Object.fromEntries([3, 6, 9].map(duration => [duration, { min: Infinity, max: -Infinity }]));
  stats[bookId] = range;

  for (let seed = 0; seed < 1_000; seed += 1) {
    let previousStory;
    for (const duration of [3, 6, 9]) {
      const story = generateStory(bookId, duration, seed);
      const repeated = generateStory(bookId, duration, seed);
      const text = textOf(story);
      const paragraphs = story.pages.flatMap(page => page.paragraphs);
      const allowedCast = new Set([story.hero.id, story.companion.id, ...(story.guardian ? [story.guardian.id] : [])]);

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
      assert.notEqual(story.hero.id, story.companion.id);
      assert.ok(story.hero.gender === 'm' || story.companion.gender === 'm', 'Plural noun agreements stay valid.');

      for (const page of story.pages) {
        assert.ok(sceneIds.has(page.scene));
        assert.equal(page.paragraphs.length, 1, 'A picture-book page contains one short sentence.');
        assert.ok(page.characters.length <= 3);
        assert.equal(new Set(page.characters).size, page.characters.length);
        assert.ok(page.characters.every(id => characterIds.has(id) && allowedCast.has(id)), 'Pages can only show the selected cast.');
        assert.ok(Array.isArray(page.objects) && page.objects.every(id => objectIds.has(id)), 'Every element must have a matching reusable illustration.');
        assert.equal(new Set(page.objects).size, page.objects.length);
        const words = countWords(page.paragraphs.join(' '));
        assert.ok(words >= 6 && words <= 24, `${bookId}/${duration}/${seed}: page contains ${words} words.`);
        assert.equal((page.paragraphs[0].match(/[.!?]/g) || []).length, 1, 'Each page has exactly one sentence.');
        assert.ok(page.paragraphs[0].endsWith('.'));
        page.characters.forEach(id => usedCharacters.add(id));
        page.objects.forEach(id => usedObjects.add(id));
        usedScenes.add(page.scene);
      }

      // Length adds scenes; it never redraws the cast, goal or place midway through the same story.
      if (previousStory) {
        assert.deepEqual(story.hero, previousStory.hero);
        assert.deepEqual(story.companion, previousStory.companion);
        assert.deepEqual(story.place, previousStory.place);
        assert.equal(story.title, previousStory.title);
        assert.equal(story.questId, previousStory.questId);
        assert.equal(story.variantId, previousStory.variantId);
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
        assert.ok(text.indexOf('Guardaron') < text.indexOf('volvieron al jardín'), 'Collect the gift before returning with it.');
      }
      if (bookId === 'relax') {
        assert.ok(story.moral && text.toLocaleLowerCase('es').includes(story.moral.replace(/\.$/, '').toLocaleLowerCase('es')));
      }
      variants.add(story.variantId);
      quests.add(story.questId);
      heroes.add(story.hero.id);
      companions.add(story.companion.id);
      if (duration === 3) uniqueStories.add(text);
      range[duration].min = Math.min(range[duration].min, story.wordCount);
      range[duration].max = Math.max(range[duration].max, story.wordCount);
      checkedStories += 1;
    }
  }

  assert.equal(variants.size, expectedVariants[bookId], 'Every obstacle/activity must be reachable.');
  assert.equal(quests.size, expectedQuests[bookId], 'Every coherent story plan must be reachable.');
  assert.ok(heroes.size >= 4 && companions.size >= 3, 'Cast selection must vary.');
  assert.ok(uniqueStories.size >= 750, 'Procedural choices should produce different combinations.');
}

const changed = generateStory('friends', 3, 'immutable');
changed.hero.name = 'Changed';
changed.hero.atlas.x = 9;
assert.notEqual(generateStory('friends', 3, 'immutable').hero.name, 'Changed');
assert.equal(JSON.stringify(CHARACTERS), metadataBefore, 'Generating or editing a story must not mutate the catalogue.');
assert.deepEqual([...usedCharacters].sort(), [...characterIds].sort(), 'All 12 characters must appear in generated stories.');
assert.deepEqual([...usedObjects].sort(), [...objectIds].sort(), 'All 12 reusable elements must appear in generated stories.');
assert.deepEqual([...usedScenes].sort(), [...sceneIds].sort(), 'All 12 locations must appear in generated stories.');

console.log(`Verified ${checkedStories.toLocaleString('en-US')} procedural stories across all 12 book/duration combinations.`);
console.log('Single-sentence pages, determinism, length, all 36 reusable assets, fixed cast, variation, and permanent guardian death: passed.');
console.table(Object.entries(stats).map(([book, durations]) => ({
  book,
  '3 min': `${durations[3].min}–${durations[3].max} words`,
  '6 min': `${durations[6].min}–${durations[6].max} words`,
  '9 min': `${durations[9].min}–${durations[9].max} words`,
})));
