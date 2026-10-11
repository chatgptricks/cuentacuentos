/**
 * Physical recordings for every current catalogue identity and legacy effect.
 * Quiet animals and silent props use relevant movement/material foley, never
 * another animal's call. Sources, edits and licenses: audio/LICENSES.md.
 */
const library = {};
function register(file, ids, gain = 1) {
  const sound = Object.freeze({ file: `${file}.mp3`, gain });
  for (const id of ids.split(' ')) {
    if (library[id]) throw new Error(`Duplicate sound identity: ${id}`);
    library[id] = sound;
  }
}

// Species calls. Separate identities preserve their original saved sound ids.
register('sfx-fox', 'fox arctic-fox');
register('sfx-bear', 'bear bear-cub', 0.9);
register('sfx-wolf', 'wolf howl');
register('sfx-elephant', 'elephant trumpet');
register('sfx-lion', 'lion');
register('sfx-pig', 'pig');
register('sfx-monkey', 'monkey chatter');
register('sfx-squirrel', 'squirrel');
register('sfx-penguin', 'penguin penguin-chick');
register('sfx-peacock', 'peacock');
register('sfx-parrot', 'parrot');
register('sfx-donkey', 'donkey');
register('sfx-goat', 'goat');
register('owl', 'owl', 1.58);
register('frog', 'frog swamp lily-pond', 1.58);
register('cow', 'cow farm', 1.58);
register('sheep', 'sheep', 1.58);
register('hen', 'hen', 1.58);
register('duck', 'duckling', 1.58);
register('horse', 'pony foal', 1.58);
register('dog', 'puppy sheepdog', 1.58);
register('cat', 'kitten pirate-cat', 1.58);
register('purr', 'purr', 1.58);
register('crow', 'crow crow-nest', 1.58);
register('bird', 'bird', 1.58);
register('bee', 'bee flower flower-crown flowers-in-glass', 1.4);
register('cricket', 'cricket firefly-field', 1.58);

// Movement and clothing: foley is intentional where a recognizable call is absent.
register('sfx-rabbit', 'rabbit lop-rabbit');
register('sfx-pencil', 'mouse dormouse hamster thief-rat guinea-pig opossum crayons chalkboard teacher');
register('sfx-footsteps', 'human family-child family-mother family-father wise-elder wise-grandmother giant troll ogre yeti sloth panda koala tiger lynx playground race-track village porch market market-seller');
register('sfx-hoof', 'hoof deer fawn giraffe zebra boots scooter new-shoes wheelbarrow');
register('sfx-wings', 'flamingo phoenix moth butterfly ladybug firefly dragonfly chick canary bat feather paper-plane paintbrush', 0.75);
register('sfx-cloth', 'princess king bedroom living-room pillow blanket apron rag-doll handkerchief bandage teddy-bear baker bakery basket apple birthday-cake cookies dough-bowl bread lunchbox sack garland slippers', 0.9);
register('sfx-rope', 'rope yarn jump-rope net spider web-corner snail', 0.9);
register('sfx-metal-chain', 'knight royal-knight helmet ladder signpost', 0.8);

// Water movements, weather and natural settings.
register('splash', 'splash otter beaver seal octopus seal-pup crab float-ring hot-water-bottle bucket', 1.58);
register('sfx-water-bubbles', 'turtle tortoise sea-turtle-hatchling dolphin whale shark goldfish coral-reef underwater-palace watersong', 0.9);
register('sfx-water-pour', 'watering-can toothbrush glass-of-milk milk-jug soup kitchen dining-room bathroom clinic dentist gardener greenhouse orchard', 0.9);
register('forest', 'forest garden meadow treehouse bamboo-grove flower-field mushroom-grove giant-tree crossroads lookout-hill imp-mushroom dandelion-garden tree-spirit', 1.4);
register('river', 'river waterfall mangrove rope-bridge troll-bridge', 1.4);
register('waves', 'beach lake desert-oasis harbor lighthouse-cliff sunset-beach', 1.4);
register('wind', 'wind mountain clouds cloud snowy-valley windmill floating-island canyon giant-house cloud-sea snowy-night-forest kite balloon finish-flag pinwheel curtain ghost', 1.4);
register('rain', 'storm-cloud umbrella', 1.4);
register('leaves', 'rustle dry-leaves hedgehog raccoon badger mole armadillo ant scarecrow vain-snake shovel broom hourglass', 1.4);
register('sfx-fire', 'dragon volcano lantern', 0.85);
register('rowing', 'boat pirate-ship moon-boat', 1.4);

// Recorded instruments provide a distinct acoustic palette for fantasy.
register('sfx-fantasy-sparkle', 'fairy elf paper-star confetti fallen-star night-lamp star-observatory moon-garden', 0.85);
register('sfx-fantasy-chime', 'wizard merlin good-witch winter-witch envious-wizard potion enchanted-tower', 0.85);
register('sfx-fantasy-sweep', 'unicorn pegasus magicsteps rainbow-bridge shooting-star-hill gift-box mermaid calm-jar shell', 0.85);
register('sfx-music-box', 'music-box goblin gnome imp pluck', 0.9);
register('sfx-flute', 'flute little-theater', 0.9);
register('sfx-drum', 'drum pinata festival-square');

// Physical object sounds and mechanical details.
register('sfx-keys', 'key keys compass magnifying-glass crystal pearl moonstone ice-flower medal trophy old-glasses thermometer telescope', 0.9);
register('sfx-zipper', 'zipper backpack pencil-case');
register('sfx-wood-tap', 'wood-tap seed acorn wooden-spoon ball smooth-stone teacup workshop puzzle spinning-top playroom', 0.9);
register('sfx-glass', 'glass honey-jar marbles', 0.85);
register('sfx-train', 'train train-driver train-station', 0.8);
register('page', 'page map storybook letter clue-scroll old-photo notebook cardboard-box party-hat mail-carrier library post-office', 1.58);
register('door', 'creaky-door old-trunk treasure-chest worry-box attic cave crystal-cave ogre-cave castle ice-castle lighthouse-keeper', 1.4);
register('drop', 'drop dripping-tap', 1.58);
register('bell', 'bell bicycle school', 1.4);
register('clock', 'alarm-clock stopwatch', 1.58);
register('sfx-cuckoo', 'cuckoo cuckoo-clock');
register('chimes', 'wind-chime', 1.4);
register('window-tap', 'window-branch', 1.58);
register('kettle', 'kettle', 1.4);
register('whistle', 'whistle', 1.4);

export const SOUND_LIBRARY = Object.freeze(library);
export const SOUND_LIBRARY_FILES = Object.freeze([...new Set(Object.values(library).map(sound => sound.file))]);
