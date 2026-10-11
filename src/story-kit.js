import { CHARACTERS, CHARACTER_NAMES, getCharacter } from './character-catalog.js';
import { SUPPORTING_NAMES, getSupporting } from './supporting-catalog.js';
import { VILLAIN_NAMES, getVillain } from './villain-catalog.js';
import { ABILITY_REASONS, TRIALS, abilityFor, namedItems } from './narrative-world.js';

/** Shared tools for every story structure: seeded choice, sentence tiers and plans. */
export function choose(random, values) {
  if (!values.length) throw new Error('No compatible story element.');
  return values[Math.floor(random() * values.length)];
}
export const unique = values => [...new Set(values)];
export const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
/** Pick by gender for catalogue characters: «cansado» / «cansada». */
export const gendered = (character, masculine, feminine) => character.gender === 'f' ? feminine : masculine;

// «Olmo» names the guardian of Acción, so no other owl borrows his name.
export const copyCharacter = (random, id) => ({ ...getCharacter(id), name: choose(random, CHARACTER_NAMES[id].filter(name => name !== 'Olmo')), atlas: { ...getCharacter(id).atlas } });
export const copySupporting = (random, id) => ({ ...getSupporting(id), name: choose(random, SUPPORTING_NAMES[id]), atlas: { ...getSupporting(id).atlas } });
export const copyVillain = (random, id) => ({ ...getVillain(id), name: choose(random, VILLAIN_NAMES[id]), atlas: { ...getVillain(id).atlas } });

const CATALOGUE = new Map(CHARACTERS.map(character => [character.id, character]));

/** A pair from `pool`; `accept(hero, companion)` lets a structure ask for pairs it can tell. */
export function makeCast(random, pool, accept) {
  const people = pool.map(id => CATALOGUE.get(id));
  // Pair sentences use masculine plural agreement («los dos», «contentos»), so one noun is masculine.
  const fits = (hero, companion) => companion !== hero && !(hero.gender === 'f' && companion.gender === 'f') && (!accept || accept(hero, companion));
  const hero = choose(random, accept ? people.filter(candidate => people.some(companion => fits(candidate, companion))) : people);
  const companion = choose(random, people.filter(candidate => fits(hero, candidate)));
  return { hero: copyCharacter(random, hero.id), companion: copyCharacter(random, companion.id) };
}

/**
 * A beat lists nine sentences in reading order. Tier 1 is the three-minute story, tier 2
 * adds three sentences for six minutes and tier 3 three more for nine. Shorter books only
 * drop sentences, so whatever remains still reads in cause-and-effect order. A page only
 * draws the items its sentence names.
 */
export const at = scene => (tier, text, characters = [], objects = []) =>
  ({ tier, page: { paragraphs: [text], scene, characters: unique(characters).slice(0, 3), objects: namedItems(text, unique(objects)) } });

export function unfold(beats, duration) {
  if (beats.length !== 6) throw new Error('A story has six beats.');
  const level = duration / 3;
  return beats.flatMap((beat, index) => {
    for (const tier of [1, 2, 3]) {
      if (beat.filter(entry => entry.tier === tier).length !== 3) throw new Error(`Beat ${index + 1} needs three sentences in tier ${tier}.`);
    }
    return beat.filter(entry => entry.tier <= level).map(entry => entry.page);
  });
}

/** Items the full reading actually names and draws. */
export const drawnIn = (beats, items) => {
  const drawn = unique(beats.flatMap(beat => beat.flatMap(entry => entry.page.objects)));
  return unique([...items, ...drawn]).filter(id => drawn.includes(id));
};

export function planFor(structure, blockIds, destination, items, extra = {}) {
  return { version: 3, structure, blockIds, world: { destination, items: unique(items) }, ...extra };
}

/**
 * A trial someone can really solve: the first person in `people` whose ability fits one of
 * the place's trials solves it; otherwise the pair finds a longer, safer way together.
 */
export function abilityTrial(random, trials, people) {
  for (const person of people) {
    const options = trials.filter(id => abilityFor(person, id));
    if (options.length) {
      const id = choose(random, options);
      return { id, helper: person, ability: abilityFor(person, id) };
    }
  }
  return { id: choose(random, trials), helper: null, ability: null };
}
export const solveTrial = ({ id, helper, ability }, pair) => helper
  ? TRIALS[id].abilities[ability](helper.name)
  : `${pair} pensaron juntos y encontraron otro camino, más largo pero seguro.`;
export const trialReason = ({ helper, ability }) => helper
  ? `Entonces ${helper.name} tuvo una idea, porque ${ABILITY_REASONS[ability]}.`
  : 'Esta vez tendrían que pensar con calma.';
