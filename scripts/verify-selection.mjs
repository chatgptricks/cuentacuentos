import assert from 'node:assert/strict';
import { BOOKS, STORY_BLOCK_COUNTS, generateStory } from '../src/story-engine.js';
import { FAMILY_ROLES, createFamilyMember } from '../src/family-characters.js';
import { generateFreshStory, normalizeStoryHistory, rememberStory } from '../src/story-selection.js';

const fields = ['bookId', 'goalId', 'obstacleId', 'strategyId', 'discoveryId', 'destinationId'];
const summary = (goalId, changes = {}) => ({
  bookId: 'friends', goalId, obstacleId: 'small-space', strategyId: 'observe', discoveryId: 'new-angle', destinationId: 'garden', ...changes,
});
const storyFor = (record, changes = {}) => ({
  bookId: record.bookId, questId: record.goalId, variantId: record.obstacleId,
  place: { id: record.destinationId },
  plan: { blockIds: { goal: record.goalId, obstacle: record.obstacleId, strategy: record.strategyId, discovery: record.discoveryId }, world: { destination: record.destinationId } },
  ...changes,
});
const sameBlocks = (left, right) => ['goalId', 'obstacleId', 'strategyId', 'discoveryId'].every(field => left[field] === right[field]);
const stableStory = ({ createdAt, ...story }) => story;

for (const damaged of [undefined, null, 0, {}, '{', 'null', '{}', [null, 4, {}, []]]) {
  assert.deepEqual(normalizeStoryHistory(damaged), []);
}
const malicious = [
  summary('bad id'), summary('__proto__'), summary('valid', { bookId: '__proto__' }),
  summary('valid', { strategyId: 2 }), summary('valid', { obstacleId: '<script>' }),
  summary('valid', { destinationId: 'x'.repeat(81) }), summary('valid', { discoveryId: undefined }),
];
assert.deepEqual(normalizeStoryHistory(malicious), []);
let getterRead = false;
const getterRecord = summary('valid');
Object.defineProperty(getterRecord, 'goalId', { get() { getterRead = true; return 'valid'; } });
assert.deepEqual(normalizeStoryHistory([getterRecord, Object.create(summary('valid'))]), []);
assert.equal(getterRead, false, 'Reading damaged storage must not execute getters.');

const privateRecord = { ...summary(' kite '), name: 'María', prose: 'A story sentence.', color: 'blue', duration: 9 };
const safeRecord = normalizeStoryHistory(JSON.stringify([privateRecord]));
assert.deepEqual(safeRecord, [summary('kite')]);
assert.deepEqual(Object.keys(safeRecord[0]), fields, 'Only plot metadata may enter history.');
assert.equal(privateRecord.goalId, ' kite ', 'Normalization must not mutate the input.');

const oversized = [];
for (let index = 0; index < 20; index++) for (const book of BOOKS) oversized.push(summary(`goal-${index}`, { bookId: book.id }));
const originalHistory = JSON.stringify(oversized);
const trimmed = normalizeStoryHistory(oversized);
assert.equal(trimmed.length, 40);
for (const book of BOOKS) {
  assert.deepEqual(trimmed.filter(record => record.bookId === book.id).map(record => record.goalId), Array.from({ length: 8 }, (_, index) => `goal-${index + 12}`));
}
assert.equal(JSON.stringify(oversized), originalHistory);
trimmed[0].goalId = 'changed';
assert.equal(JSON.stringify(oversized), originalHistory, 'Returned summaries must be independent copies.');

const remembered = rememberStory(oversized, storyFor(summary('new-goal')));
assert.equal(remembered.length, 40);
assert.deepEqual(remembered.filter(record => record.bookId === 'friends').map(record => record.goalId), ['goal-13', 'goal-14', 'goal-15', 'goal-16', 'goal-17', 'goal-18', 'goal-19', 'new-goal']);
assert.equal(JSON.stringify(oversized), originalHistory);
assert.deepEqual(rememberStory([summary('kite')], null), [summary('kite')]);
assert.deepEqual(rememberStory('broken', storyFor(summary('kite'))), [summary('kite')]);
const previousFormat = storyFor(summary('kite'));
delete previousFormat.plan.world;
assert.equal(rememberStory([], previousFormat)[0].destinationId, 'garden', 'Existing saved plans can use place.id.');

const options = { family: { members: [{ role: 'child', name: 'Ada' }] } };
const ready = storyFor(summary('new-goal'));
let attempts = 0;
assert.strictEqual(generateFreshStory('friends', '6', options, [], (...args) => {
  attempts++;
  assert.equal(args[0], 'friends'); assert.equal(args[1], 6);
  assert.equal(args[2], undefined, 'Selection requests fresh seeds rather than modifying explicit seed generation.');
  assert.strictEqual(args[3], options);
  return ready;
}), ready);
assert.equal(attempts, 1);

const recent = [summary('goal-a'), summary('goal-b'), summary('goal-c')];
const cosmeticRepeat = storyFor(summary('goal-c', { obstacleId: 'different-obstacle', strategyId: 'ask', discoveryId: 'tiny-test', destinationId: 'library' }), {
  seed: 'changed-seed', title: 'Changed title', hero: { name: 'Someone else' }, duration: 9,
  adjectives: ['bright', 'quiet'],
});
const differentGoal = storyFor(summary('goal-d'));
attempts = 0;
assert.strictEqual(generateFreshStory('friends', 3, {}, recent, () => (++attempts === 1 ? cosmeticRepeat : differentGoal)), differentGoal);
assert.equal(attempts, 2, 'A changed name, adjective, scene or duration cannot disguise a recent objective.');

const eightRecent = Array.from({ length: 8 }, (_, index) => summary(`goal-${index}`));
const oldTupleInNewScene = storyFor(summary('goal-0', { destinationId: 'library' }));
const oldGoalNewStrategy = storyFor(summary('goal-0', { strategyId: 'ask' }));
attempts = 0;
assert.strictEqual(generateFreshStory('friends', 3, {}, eightRecent, () => (++attempts === 1 ? oldTupleInNewScene : oldGoalNewStrategy)), oldGoalNewStrategy);
assert.equal(attempts, 2, 'The combination of four plot blocks must not repeat; a scene change is secondary.');

attempts = 0;
const actionReady = storyFor(summary('goal-a', { bookId: 'action' }));
assert.strictEqual(generateFreshStory('action', 3, {}, recent, () => { attempts++; return actionReady; }), actionReady);
assert.equal(attempts, 1, 'Each book has an independent recent history.');

attempts = 0;
const repeated = storyFor(summary('goal-c'));
assert.strictEqual(generateFreshStory('friends', 3, {}, recent, () => { attempts++; return repeated; }), repeated);
assert.equal(attempts, 20, 'Even a single repeating candidate must stop after twenty attempts.');

attempts = 0;
const frequentGoal = storyFor(summary('goal-7'));
const olderTuple = storyFor(summary('goal-0'));
assert.strictEqual(generateFreshStory('friends', 3, {}, eightRecent, () => (++attempts === 2 ? olderTuple : frequentGoal)), olderTuple);
assert.equal(attempts, 20, 'Fallback must favor a less recent objective over repeated recent ones.');

attempts = 0;
const differentSecondaryBlocks = storyFor(summary('goal-c', { obstacleId: 'short-material', strategyId: 'ask', discoveryId: 'tiny-test', destinationId: 'library' }));
assert.strictEqual(generateFreshStory('friends', 3, {}, recent, () => (++attempts === 14 ? differentSecondaryBlocks : repeated)), differentSecondaryBlocks);
assert.equal(attempts, 20, 'Fallback must choose the lowest similarity among all attempted candidates.');

attempts = 0;
assert.strictEqual(generateFreshStory('friends', 3, {}, malicious, () => { attempts++; return ready; }), ready);
assert.equal(attempts, 1);
assert.throws(() => generateFreshStory('missing'), RangeError);
assert.throws(() => generateFreshStory('__proto__'), RangeError);
assert.throws(() => generateFreshStory('friends', 4), RangeError);
assert.throws(() => generateFreshStory('friends', 3, {}, [], null), TypeError);
assert.throws(() => generateFreshStory('friends', 3, {}, [], () => null), TypeError);
assert.throws(() => generateFreshStory('friends', 3, {}, [], () => actionReady), TypeError);

const namedFamily = { members: FAMILY_ROLES.map((role, index) => ({ ...createFamilyMember(role.id), name: ['María del Mar', 'Juan del Sol', 'Ana del Río', 'Luz del Alba', 'Dani del Lago', 'Sam de Luna'][index] })) };
const familyConfigurations = [
  { members: namedFamily.members.filter(member => member.role === 'child') },
  { members: namedFamily.members.filter(member => ['child', 'baby'].includes(member.role)) },
  { members: namedFamily.members.filter(member => ['child', 'teen'].includes(member.role)) },
  namedFamily,
  { members: [null, { role: 'baby', name: {} }, { role: 'invalid', hair: '__proto__' }] },
];
const historyInput = Object.freeze(recent.map(record => Object.freeze({ ...record })));
generateFreshStory('family', 3, { family: familyConfigurations.at(-1) }, historyInput, (bookId, duration, seed, options) => generateStory(bookId, duration, 'damaged-family', options));
assert.deepEqual(historyInput, recent);

let history = [];
let sequenceStories = 0;
let candidateCount = 0;
const counters = new Map();
const pureBefore = stableStory(generateStory('family', 9, 'selection-pure', { family: namedFamily }));
for (let index = 0; index < 60; index++) for (const book of BOOKS) {
  const before = normalizeStoryHistory(history).filter(record => record.bookId === book.id);
  const options = book.id === 'family' ? { family: familyConfigurations[index % familyConfigurations.length] } : {};
  let calls = 0;
  const next = generateFreshStory(book.id, [3, 6, 9][index % 3], options, history, (bookId, duration, seed, options) => {
    calls++; candidateCount++;
    assert.equal(seed, undefined);
    const counter = counters.get(bookId) || 0;
    counters.set(bookId, counter + 1);
    return generateStory(bookId, duration, `fresh-selection-${bookId}-${counter}`, options);
  });
  assert.ok(calls >= 1 && calls <= 20);
  const nextSummary = rememberStory([], next)[0];
  assert.equal(nextSummary.bookId, book.id);
  if (STORY_BLOCK_COUNTS[book.id].goal > 3) {
    assert.ok(!before.slice(-3).some(previous => previous.goalId === nextSummary.goalId), `${book.id}/${index}: recent goals must differ with an adequate catalogue.`);
    assert.ok(!before.some(previous => sameBlocks(previous, nextSummary)), `${book.id}/${index}: complete plot tuples must not repeat recently.`);
  }
  assert.ok(nextSummary.structureId, 'New stories remember their structure.');
  if (before.length) assert.notEqual(nextSummary.structureId, before.at(-1).structureId, `${book.id}/${index}: consecutive stories use different structures.`);
  const unselectedBefore = history.filter(record => record.bookId !== book.id);
  history = rememberStory(history, next);
  assert.deepEqual(history.filter(record => record.bookId !== book.id), unselectedBefore, 'Choosing one book must not clear another book history.');
  assert.ok(history.length <= 40);
  assert.ok(history.filter(record => record.bookId === book.id).length <= 8);
  for (const record of history) assert.deepEqual(Object.keys(record).filter(key => key !== 'structureId'), fields);
  sequenceStories++;
}
assert.equal(history.length, 40);
assert.deepEqual(stableStory(generateStory('family', 9, 'selection-pure', { family: namedFamily })), pureBefore, 'History-aware selection must preserve deterministic replay by explicit seed.');

console.log(`Fresh story selection passed: ${sequenceStories} real stories, ${candidateCount} candidates; bounded fallback, damaged storage, independent book histories and varied structures.`);
