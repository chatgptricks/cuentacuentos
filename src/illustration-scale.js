/** Storybook sizes: preserve species order while keeping tiny protagonists readable. */
export const CHARACTER_SCALES = Object.freeze({
  fox: .92, mouse: .60, rabbit: .76, bear: 1.28, knight: 1.08, wizard: 1.08,
  dragon: 1.32, owl: .72, squirrel: .58, frog: .40, turtle: .52, fairy: .54,
  hedgehog: .50, raccoon: .80, deer: 1.13, otter: .68, beaver: .73, badger: .73,
  wolf: 1.02, lynx: .96, lion: 1.28, tiger: 1.25, elephant: 1.62, giraffe: 1.70,
  zebra: 1.25, monkey: .88, panda: 1.24, koala: .77, penguin: .85, flamingo: 1.08,
  parrot: .60, peacock: .88, dolphin: 1.22, seal: 1.04, octopus: .87, whale: 1.72,
  unicorn: 1.26, merlin: 1.10, elf: .92, 'good-witch': 1.08, 'wise-elder': 1.10,
  princess: 1.06, king: 1.13, 'royal-knight': 1.12, 'wise-grandmother': 1.04,
  goblin: .63, gnome: .59, mermaid: 1.08, phoenix: .96, yeti: 1.44, pegasus: 1.30,
  'tree-spirit': 1.40, cow: 1.28, sheep: .94, pig: .84, hen: .62, pony: 1.05,
  donkey: 1.12, goat: .98, sheepdog: .94, bat: .38, moth: .18, mole: .49,
  dormouse: .48, sloth: .85, opossum: .73, armadillo: .68, 'arctic-fox': .90,
  bee: .20, butterfly: .23, ladybug: .16, ant: .15, snail: .25, cricket: .20,
  firefly: .18, dragonfly: .24,
  chick: .34, duckling: .40, fawn: .80, 'bear-cub': .81, foal: .82,
  'penguin-chick': .47, 'sea-turtle-hatchling': .29, 'seal-pup': .64,
  'mail-carrier': 1.08, baker: 1.10, teacher: 1.06, dentist: 1.10,
  gardener: 1.06, 'train-driver': 1.10, 'market-seller': 1.07, 'lighthouse-keeper': 1.12,
  puppy: .54, kitten: .48, goldfish: .28, hamster: .40, canary: .32,
  'guinea-pig': .47, tortoise: .48, 'lop-rabbit': .57,
  troll: 1.40, ghost: .97, crow: .62, 'pirate-cat': .78, ogre: 1.48, imp: .57,
  spider: .18, giant: 1.75, 'winter-witch': 1.10, shark: 1.35, crab: .32,
  'storm-cloud': 1.30, 'thief-rat': .65, scarecrow: 1.12, 'envious-wizard': 1.10, 'vain-snake': .56,
});

export function characterScale(character) {
  const id = typeof character === 'string' ? character : character?.id;
  if (character?.kind === 'human' || id?.startsWith('family-')) {
    const role = character?.role || id?.slice(7);
    return { child: .96, baby: .58, sibling: .91, teen: 1.16, dad: 1.30, mom: 1.24 }[role] || 1.12;
  }
  return CHARACTER_SCALES[id] ?? 1;
}

/** Tight story-only frames include every hairstyle, feet and the original grounding shadow. */
export function humanArtFrame(character) {
  const id = typeof character === 'string' ? character : character?.id;
  const role = character?.role || id?.replace(/^family-/, '') || 'child';
  // The full SVG uses a different natural height per age; crop that whitespace before layout sizing.
  const top = { dad: 10, mom: 10, teen: 14, child: 23, sibling: 23, baby: 37 }[role] ?? 23;
  const width = 103, height = 206 - top;
  return { viewBox: `34 ${top} ${width} ${height}`, ratio: width / height };
}
