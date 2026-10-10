import assert from 'node:assert/strict';
import {
  HAIRSTYLES, OUTFITS, SKIN_TONES, FAVORITE_COLORS, FAMILY_ROLES,
  createDefaultFamily, createFamilyMember, normalizeFamily, renderHuman,
} from '../src/family-characters.js';
import { generateStory, STORY_BLOCK_COUNTS } from '../src/story-engine.js';

const idsOf = options => options.map(option => option.id);
const roleIds = idsOf(FAMILY_ROLES);
const hairIds = idsOf(HAIRSTYLES);
const outfitIds = idsOf(OUTFITS);
const skinIds = idsOf(SKIN_TONES);
const colorIds = idsOf(FAVORITE_COLORS);
const contentOf = ({ createdAt, ...story }) => story;
const textOf = story => story.pages.flatMap(page => page.paragraphs).join('\n');
const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
function checkSentences(story) {
  for (const page of story.pages) {
    assert.equal(page.paragraphs.length, 1);
    const sentence = page.paragraphs[0];
    const words = countWords(sentence);
    assert.ok(words >= 6 && words <= 24, `${story.seed}/${story.duration}: ${words} words in “${sentence}”.`);
    assert.equal((sentence.match(/[.!?]/g) || []).length, 1);
    assert.ok(sentence.endsWith('.'));
  }
  assert.equal(story.wordCount, story.pages.reduce((total, page) => total + countWords(page.paragraphs[0]), 0));
  assert.ok(story.wordCount >= story.duration * 55 && story.wordCount <= story.duration * 90, 'Customized stories still fit their reading duration.');
}

assert.deepEqual(roleIds, ['child', 'dad', 'mom', 'baby', 'sibling', 'teen']);
assert.equal(hairIds.length, 6, 'Six hairstyles are available without gender restrictions.');
assert.equal(outfitIds.length, 6, 'Six outfits are available to every family member.');
assert.equal(skinIds.length, 5);
assert.ok(colorIds.length >= 6);
for (const options of [FAMILY_ROLES, HAIRSTYLES, OUTFITS, SKIN_TONES, FAVORITE_COLORS]) {
  assert.equal(new Set(idsOf(options)).size, options.length, 'Customization choices need distinct IDs.');
  assert.ok(options.every(option => typeof option.id === 'string' && option.id && typeof option.label === 'string' && option.label));
}

function checkFamily(family) {
  assert.ok(Array.isArray(family.members));
  assert.equal(family.members.filter(member => member.role === 'child').length, 1, 'There is exactly one protagonist.');
  assert.equal(family.members[0].role, 'child');
  assert.equal(new Set(family.members.map(member => member.id)).size, family.members.length);
  assert.equal(new Set(family.members.map(member => member.role)).size, family.members.length);
  for (const member of family.members) {
    assert.ok(roleIds.includes(member.role));
    assert.ok(hairIds.includes(member.hair));
    assert.ok(outfitIds.includes(member.outfit));
    assert.ok(skinIds.includes(member.skin));
    assert.ok(colorIds.includes(member.color));
    assert.ok(member.name.trim());
    assert.ok([...member.name].length <= 24);
    assert.ok(member.name.split(/\s+/u).length <= 3, 'Names remain short enough for illustrated sentence pages.');
    assert.ok(/^[\p{L}\p{M}\p{N} ’'\-]+$/u.test(member.name), 'Names cannot insert HTML or sentence punctuation into story text.');
  }
  return family;
}

const defaults = checkFamily(createDefaultFamily());
assert.deepEqual(defaults.members.map(member => member.role), ['child', 'dad', 'mom', 'sibling']);
const independentDefaults = createDefaultFamily();
defaults.members[0].name = 'Editado';
defaults.members[0].hair = hairIds.at(-1);
assert.deepEqual(createDefaultFamily(), independentDefaults, 'Editing one family cannot mutate future defaults.');
assert.deepEqual(normalizeFamily(independentDefaults), independentDefaults);

for (const corrupt of [undefined, null, true, 17, 'not-json', [], {}, { members: null }, { members: {} }, { members: 'broken' }]) {
  checkFamily(normalizeFamily(corrupt));
}
for (const members of [[], [null, undefined, 'broken', 12, []], [{ role: 'unknown' }]]) {
  assert.deepEqual(checkFamily(normalizeFamily({ members })).members.map(member => member.role), ['child']);
}
const contaminated = checkFamily(normalizeFamily({ members: [
  { role: 'child', id: 'bad-id', enabled: false, hair: '__proto__', outfit: '<script>', skin: null, color: 'javascript:alert(1)', name: '  <Ada> & "Sol"  ' },
  { role: 'child', name: 'Duplicado' },
  { role: 'dad', name: '', hair: {}, outfit: [], skin: Infinity, color: true },
  { role: 'mom', enabled: false, name: 'Excluida' },
  { id: 'family-teen', name: 'Noa' },
  { role: 'baby', name: 'Ñandú e\u0301 ' + 'a'.repeat(80) },
  { role: '__proto__', name: 'Infiltrado' },
] }));
assert.ok(!contaminated.members.some(member => member.role === 'mom'));
assert.equal(contaminated.members.find(member => member.role === 'child').name, 'Ada Sol');
assert.equal(contaminated.members.find(member => member.role === 'teen').name, 'Noa');
assert.ok(!contaminated.members.some(member => member.name === 'Duplicado'));
assert.deepEqual(normalizeFamily(contaminated), contaminated, 'Normalization must be safe to repeat on stored data.');
assert.equal(normalizeFamily({ members: [{ role: 'child', name: 'María del Mar' }] }).members[0].name, 'María del Mar');
assert.equal(normalizeFamily({ members: [{ role: 'child', name: 'J.R. Hola ¿qué?' }] }).members[0].name, 'JR Hola qué');
assert.equal(normalizeFamily({ members: [{ role: 'child', name: 'Ana María del Mar Gómez' }] }).members[0].name, 'Ana María del');
const normalizedCopy = normalizeFamily(independentDefaults);
normalizedCopy.members[0].name = 'Otro nombre';
assert.notEqual(normalizedCopy.members[0].name, independentDefaults.members[0].name, 'Normalization creates an editable copy.');

let checkedAppearances = 0;
for (const role of roleIds) {
  const base = createFamilyMember(role);
  assert.equal(base.role, role);
  assert.ok(base.name);
  // Cross the whole appearance space for every role, including hair/outfits commonly associated with another gender.
  for (const hair of hairIds) for (const outfit of outfitIds) for (const skin of skinIds) for (const color of colorIds) {
    const input = { ...base, hair, outfit, skin, color };
    const family = normalizeFamily({ members: [input] });
    const member = family.members.find(character => character.role === role);
    assert.ok(member);
    assert.deepEqual([member.hair, member.outfit, member.skin, member.color], [hair, outfit, skin, color]);
    const svg = renderHuman(member);
    assert.equal(svg, renderHuman(member), 'The same profile always has the same illustration.');
    assert.ok(/^<svg\b/.test(svg) && svg.includes('</svg>'));
    assert.ok(!/<script|<foreignObject|\bon\w+\s*=|javascript:|https?:\/\//i.test(svg.replace('http://www.w3.org/2000/svg', '')));
    checkedAppearances += 1;
  }
  for (const [key, choices] of [['hair', hairIds], ['outfit', outfitIds], ['skin', skinIds], ['color', colorIds]]) {
    const drawings = choices.map(choice => renderHuman({ ...base, [key]: choice }));
    assert.equal(new Set(drawings).size, choices.length, `${role}: each ${key} choice must change the actual drawing.`);
  }
  const safeSvg = renderHuman({ ...base, name: '<script>alert(1)</script>' }, { className: 'person" onload="alert(1)' });
  assert.ok(!safeSvg.includes('alert(1)') && !/\bonload\s*=/.test(safeSvg));
  assert.equal(renderHuman({ ...base, name: 'Otro nombre' }), renderHuman(base), 'Names appear in the UI and story; they do not become SVG markup.');
}
const sharedAppearance = { hair: hairIds[0], outfit: outfitIds[0], skin: skinIds[0], color: colorIds[0] };
const ageDrawing = role => renderHuman({ ...createFamilyMember(role), ...sharedAppearance });
assert.equal(new Set(['baby', 'child', 'teen', 'dad'].map(ageDrawing)).size, 4, 'Baby, child, teen, and adult proportions need different drawings.');
assert.equal(ageDrawing('dad'), ageDrawing('mom'), 'A parental role cannot impose a different body or restrict the same appearance choices.');
assert.equal(ageDrawing('child'), ageDrawing('sibling'), 'A sibling of similar age uses the same age proportions as the protagonist.');

const roleNames = { child: 'Ari', dad: 'Paco', mom: 'Meli', baby: 'Bibi', sibling: 'Sami', teen: 'Noa' };
const optionalRoles = roleIds.filter(role => role !== 'child');
let checkedStories = 0;
for (let composition = 0; composition < 2 ** optionalRoles.length; composition += 1) {
  const includedRoles = ['child', ...optionalRoles.filter((_, bit) => composition & (1 << bit))];
  const family = normalizeFamily({ members: includedRoles.map((role, index) => ({
    ...createFamilyMember(role), name: roleNames[role],
    hair: hairIds[(index + composition) % hairIds.length],
    outfit: outfitIds[(index + composition + 2) % outfitIds.length],
    skin: skinIds[(index + composition) % skinIds.length],
    color: colorIds[(index + composition) % colorIds.length],
  })) });
  const familyBefore = JSON.stringify(family);
  for (let seed = 0; seed < 12; seed += 1) {
    let previousStory;
    for (const duration of [3, 6, 9]) {
      const story = generateStory('family', duration, `composition-${composition}-${seed}`, { family });
      const text = textOf(story);
      checkSentences(story);
      assert.deepEqual(contentOf(story), contentOf(generateStory('family', duration, story.seed, { family })));
      assert.deepEqual(story.characters.map(character => character.role), includedRoles);
      assert.deepEqual(story.hero, story.characters[0]);
      assert.equal(story.hero.name, 'Ari');
      assert.ok(story.title.includes('Ari'));
      assert.equal(new Set(story.characters.map(character => character.id)).size, includedRoles.length);
      for (const profile of family.members) {
        const selected = story.characters.find(character => character.id === profile.id);
        for (const key of ['name', 'role', 'hair', 'outfit', 'skin', 'color']) assert.equal(selected[key], profile[key]);
        assert.ok(text.includes(profile.name), `${profile.role}: every included member needs a part in the family story.`);
        assert.ok(story.pages.some(page => page.characters.includes(profile.id)), `${profile.role}: every included member needs an illustration in the family story.`);
      }
      for (const role of roleIds.filter(role => !includedRoles.includes(role))) {
        assert.ok(!text.includes(roleNames[role]), 'Excluded family members cannot appear in a story.');
      }
      const cast = new Set(story.characters.map(character => character.id));
      assert.ok(story.pages.every(page => page.characters.every(id => cast.has(id))));
      assert.ok(story.pages.some(page => page.characters.includes(story.hero.id)));
      if (includedRoles.length === 1) {
        assert.ok(!/(?:^|[^\p{L}])(?:mamá|papá|madre|padre|herman[oa]|bebé|adolescente|los dos|ambos)(?:$|[^\p{L}])/iu.test(text), 'A child-only story cannot invent parents, siblings, or a second participant.');
        assert.ok(story.pages.every(page => page.characters.length <= 1));
      }
      if (previousStory) {
        assert.deepEqual(story.characters, previousStory.characters);
        assert.deepEqual(story.plan, previousStory.plan);
        assert.equal(story.title, previousStory.title);
      }
      previousStory = story;
      checkedStories += 1;
    }
  }
  assert.equal(JSON.stringify(family), familyBefore, 'Generating any duration must preserve the saved family.');
}

// Three-part names are valid choices, and must still fit a short picture-book sentence.
const multiwordFamily = normalizeFamily({ members: roleIds.map((role, index) => ({
  ...createFamilyMember(role), name: ['María del Mar', 'Juan de Dios', 'Ana Luz Sol', 'Leo Río Mar', 'Sol Luna Luz', 'Eva del Río'][index],
})) });
const soloFamily = normalizeFamily({ members: [{ ...createFamilyMember('child'), name: 'María del Mar' }] });
const coveredGoals = [new Set(), new Set()];
for (let seed = 0; seed < 500 && (seed < 40 || coveredGoals.some(goals => goals.size < STORY_BLOCK_COUNTS.family.goal)); seed += 1) {
  for (const [index, selectedFamily] of [multiwordFamily, soloFamily].entries()) for (const duration of [3, 6, 9]) {
    const story = generateStory('family', duration, `three-part-names-${seed}`, { family: selectedFamily });
    checkSentences(story);
    coveredGoals[index].add(story.plan.blockIds.goal);
    for (const member of selectedFamily.members) assert.ok(textOf(story).includes(member.name));
    if (index === 1) {
      assert.ok(!/(?:^|[^\p{L}])(?:mamá|papá|madre|padre|herman[oa]|bebé|adolescente|los dos|ambos)(?:$|[^\p{L}])/iu.test(textOf(story)), 'Every activity must also work without assuming relatives or a second participant.');
      assert.ok(story.pages.every(page => page.characters.every(id => id === 'family-child')));
    }
    checkedStories += 1;
  }
}
for (const goals of coveredGoals) assert.equal(goals.size, STORY_BLOCK_COUNTS.family.goal, 'All family activities must fit three-part names, with all relatives or with only the child.');

const family = createDefaultFamily();
const originalStory = generateStory('family', 3, 'names-and-clothes', { family });
family.members[0].name = 'Álex';
family.members[0].color = colorIds.find(id => id !== family.members[0].color);
const customizedStory = generateStory('family', 3, 'names-and-clothes', { family });
assert.equal(customizedStory.hero.name, 'Álex');
assert.ok(textOf(customizedStory).includes('Álex') && customizedStory.title.includes('Álex'));
assert.notEqual(renderHuman(originalStory.hero), renderHuman(customizedStory.hero));
assert.deepEqual(customizedStory.plan, originalStory.plan, 'Changing clothes or a name keeps the selected plot.');
customizedStory.hero.name = 'Mutado';
assert.equal(generateStory('family', 3, 'names-and-clothes', { family }).hero.name, 'Álex');

console.log(`Verified ${checkedAppearances.toLocaleString('en-US')} appearance combinations across all roles and ${checkedStories.toLocaleString('en-US')} stories across all 32 family compositions, including three-part names.`);
console.log('Inclusive customization, safe restored profiles/SVG, chosen identities, child-only families, determinism, and stable longer stories: passed.');
