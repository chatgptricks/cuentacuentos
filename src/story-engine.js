import { SCENES } from './world-catalog.js';
export { SCENES, ITEMS, OBJECTS, WORLD_ATLASES, SCENE_VIEW_LABELS, getScene, getSceneView, getSceneViewIndex, getItem } from './world-catalog.js';
import { CHARACTERS, getCharacter } from './character-catalog.js';
export { CHARACTERS, CHARACTER_ATLASES, CHARACTER_NAMES, getCharacter } from './character-catalog.js';
export { VILLAINS, VILLAIN_ATLASES, VILLAIN_NAMES, PENDING_ART, getVillain } from './villain-catalog.js';
export { SUPPORTING, SUPPORTING_ATLASES, SUPPORTING_NAMES, getSupporting } from './supporting-catalog.js';
import { prepareFamilyStory } from './family-story.js';
import { ADVENTURE_MENTORS, RELAX_MENTORS } from './quest-catalog.js';
import { ADVENTURE_STRUCTURES, ADVENTURE_GOALS } from './structures-adventure.js';
import { ACTION_STRUCTURES, ACTION_GOALS } from './structures-action.js';
import { RELAX_STRUCTURES, RELAX_GOAL_IDS } from './structures-relax.js';
import { FRIEND_STRUCTURES, FRIEND_GOAL_IDS } from './structures-social.js';
import { FAMILY_STRUCTURES, FAMILY_GOAL_IDS } from './structures-family.js';
import { choose, countWords, drawnIn, makeCast, planFor, unfold, unique } from './story-kit.js';

/**
 * Offline picture books built from fixed narrative structures. Each book offers several
 * six-part structures with roles (hero, friend, mentor, villain), places (home, destination)
 * and elements (trial, tool, elixir, target). A structure fills every role with catalogue
 * values whose abilities, habitat and terrain agree, so the cast and places change while
 * cause and effect stay intact.
 */
export const BOOKS = Object.freeze([
  { id: 'adventure', title: 'Aventura', subtitle: 'Un pequeño viaje, un gran descubrimiento', color: '#D9B98F', symbol: '✦' },
  { id: 'action', title: 'Acción', subtitle: 'Valor, cuidado y una nueva oportunidad', color: '#DA9E96', symbol: '♜' },
  { id: 'relax', title: 'Relax', subtitle: 'Fábulas para respirar despacito', color: '#A8BDB1', symbol: '☾' },
  { id: 'friends', title: 'Amigos', subtitle: 'La alegría de hacer cosas juntos', color: '#B7AFCF', symbol: '❀' },
  { id: 'family', title: 'Mi familia', subtitle: 'Tú protagonizas los cuentos de casa', color: '#D7AD8D', symbol: '♡' },
]);

export const STORY_STRUCTURES = Object.freeze({
  adventure: ADVENTURE_STRUCTURES, action: ACTION_STRUCTURES, relax: RELAX_STRUCTURES, friends: FRIEND_STRUCTURES, family: FAMILY_STRUCTURES,
});
// A fixed pair leads every new story. A guide, antagonist or someone being rescued
// only joins when the structure needs that role; catalogue breadth lives across stories.
export const STORY_FOCUS_LIMITS = Object.freeze({ characters: 4, pageObjects: 2, objects: 4, treasureMapObjects: 5 });
const GOALS = { adventure: ADVENTURE_GOALS, action: ACTION_GOALS, relax: RELAX_GOAL_IDS, friends: FRIEND_GOAL_IDS, family: FAMILY_GOAL_IDS };
export const STORY_BLOCK_COUNTS = Object.freeze(Object.fromEntries(Object.entries(GOALS).map(([bookId, goals]) => [bookId,
  Object.freeze({ structure: STORY_STRUCTURES[bookId].length, goal: unique(goals).length })])));

const ALL_CAST = CHARACTERS.map(character => character.id);
// Olmo the owl is the guardian of Acción, so he never forms the pair there.
const CASTS = { adventure: ALL_CAST, action: ALL_CAST.filter(id => id !== 'owl'), relax: ALL_CAST, friends: ALL_CAST };

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

/** Duration changes the unfolding, never the structure, plan, cast or family appearance snapshot. */
export function generateStory(bookId, duration = 3, seed, options = {}) {
  if (!Object.hasOwn(STORY_STRUCTURES, bookId)) throw new RangeError(`Unknown book: ${bookId}`);
  const minutes = Number(duration);
  if (![3, 6, 9].includes(minutes)) throw new RangeError('Choose a reading duration of 3, 6 or 9 minutes.');
  const storySeed = seed === undefined ? freshSeed() : String(seed);
  const random = randomFromSeed(`${bookId}:${storySeed}`);
  // The family draw happens first, so choosing another relative never shifts the plot.
  const familyCast = bookId === 'family' ? prepareFamilyStory(options?.family, { companionRole: options?.companionRole, random }) : undefined;
  const structure = choose(random, STORY_STRUCTURES[bookId]);
  const cast = familyCast || (structure.cast ? structure.cast(random) : makeCast(random, CASTS[bookId], structure.accept));
  const story = structure.generate({ random, ...cast, family: familyCast?.family, duration: minutes, bookId });
  const id = `${bookId}-${minutes}-${encodeURIComponent(storySeed)}`;
  const pages = unfold(story.beats, minutes).map((page, index) => ({ id: `${id}-page-${index + 1}`, ...page }));
  const supporting = [story.mentor, story.guardian, story.villain, ...(story.extras || [])].filter(Boolean);
  const pair = familyCast?.characters || [cast.hero, cast.companion];
  const characters = [...pair, ...supporting].filter((character, index, list) => list.findIndex(other => other.id === character.id) === index);
  const plan = planFor(structure.id, story.blockIds, story.place.id, drawnIn(story.beats, story.items), {
    ...(story.lexicon ? { lexicon: story.lexicon } : {}), roles: story.roles,
    focus: { protagonists: pair.map(character => character.id), goal: story.blockIds.goal },
    ...(familyCast ? { family: { companionRole: cast.companion.role } } : {}),
  });
  return {
    format: 'picturebook-v2', id, bookId, duration: minutes, seed: storySeed, structure: structure.id,
    title: story.title, hero: cast.hero, companion: cast.companion, place: story.place, characters,
    ...(story.mentor ? { mentor: story.mentor } : {}),
    ...(story.guardian ? { guardian: story.guardian } : {}),
    ...(story.villain ? { villain: story.villain } : {}),
    ...(familyCast ? { family: familyCast.family } : {}),
    questId: story.questId, variantId: story.variantId, plan,
    ...(story.moral ? { moral: story.moral } : {}),
    createdAt: new Date().toISOString(), pages,
    wordCount: pages.reduce((sum, page) => sum + countWords(page.paragraphs[0]), 0),
  };
}

for (const id of [...ADVENTURE_MENTORS, ...RELAX_MENTORS]) if (!getCharacter(id)) throw new Error(`Unknown mentor ${id}`);
if (!SCENES.length) throw new Error('The world catalogue is empty.');
