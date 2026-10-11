/** Real, locally served effects and instrumental music. No oscillator fallback. */
import { SOUND_LIBRARY } from './sound-library.js';
import { MUSIC_TRACKS } from './music-library.js';

const STORAGE_KEY = 'cuentacuentos:sound';
const MAX_VOICES = 4;
const voices = new Set();
const lastPlayed = new Map();
let context;
let master;
let limiter;
let soundEpoch = 0;
let ambient = null;
let soundEnabled = readPreference(STORAGE_KEY, 'off');
let musicEnabled = readPreference('cc-music-enabled', 'false');
const recordingData = new Map();
const recordingBuffers = new Map();
const recordingFailures = new Map();
const recordingQueue = [];
const musicBuffers = new Map();
let activeLoads = 0;

/** Legacy ids remain valid, including ids saved in earlier stories. */
export const SOUND_ALIASES = Object.freeze({
  human: 'bell',
  hedgehog: 'rustle', raccoon: 'rustle', beaver: 'rustle', badger: 'rustle',
  deer: 'hoof', giraffe: 'hoof', zebra: 'hoof',
  otter: 'splash', seal: 'splash', octopus: 'splash',
  wolf: 'howl', lynx: 'purr', lion: 'purr', tiger: 'purr',
  elephant: 'trumpet', monkey: 'chatter', panda: 'bear', koala: 'bear',
  penguin: 'bird', flamingo: 'bird', parrot: 'bird', peacock: 'bird',
  dolphin: 'whistle', whale: 'whale',
  unicorn: 'magicsteps', merlin: 'wizard', elf: 'fairy', 'good-witch': 'wizard',
  'wise-elder': 'bell', princess: 'castle', king: 'castle', 'royal-knight': 'knight',
  'wise-grandmother': 'bell', goblin: 'pluck', gnome: 'pluck', mermaid: 'watersong',
  phoenix: 'fairy', yeti: 'dragon', pegasus: 'magicsteps', 'tree-spirit': 'forest',
  waterfall: 'river', 'bamboo-grove': 'forest', 'desert-oasis': 'lake', 'snowy-valley': 'mountain',
  'flower-field': 'meadow', mangrove: 'river', 'coral-reef': 'watersong', 'mushroom-grove': 'forest',
  library: 'page', bakery: 'basket', workshop: 'basket', greenhouse: 'garden',
  playground: 'hoof', orchard: 'garden', windmill: 'cloud', harbor: 'boat',
  'crystal-cave': 'cave', 'floating-island': 'clouds', 'enchanted-tower': 'wizard',
  'star-observatory': 'fairy', 'moon-garden': 'fairy', 'rainbow-bridge': 'magicsteps',
  'underwater-palace': 'watersong', 'giant-tree': 'forest',
  lantern: 'castle', compass: 'knight', map: 'page', telescope: 'pluck',
  'magnifying-glass': 'key', backpack: 'blanket', rope: 'yarn', boots: 'hoof',
  kite: 'cloud', drum: 'drum', flute: 'flute', paintbrush: 'feather',
  crayons: 'rustle', puzzle: 'pluck', pinwheel: 'umbrella', 'paper-star': 'fairy',
  shell: 'watersong', pearl: 'bell', crystal: 'key', acorn: 'seed',
  apple: 'basket', 'honey-jar': 'pluck', teacup: 'castle', 'watering-can': 'splash',
  troll: 'bear', ghost: 'cloud', crow: 'bird', 'pirate-cat': 'purr', ogre: 'dragon', imp: 'pluck', spider: 'yarn', giant: 'mountain',
  'winter-witch': 'wizard', shark: 'whale', crab: 'splash', 'storm-cloud': 'clouds', 'thief-rat': 'mouse', scarecrow: 'rustle', 'envious-wizard': 'wizard', 'vain-snake': 'rustle',
  cow: 'trumpet', sheep: 'rustle', pig: 'chatter', hen: 'bird', pony: 'hoof', donkey: 'hoof', goat: 'hoof', sheepdog: 'howl',
  bat: 'whistle', moth: 'fairy', mole: 'rustle', dormouse: 'mouse', sloth: 'bear', opossum: 'chatter', armadillo: 'rustle', 'arctic-fox': 'fox',
  bee: 'pluck', butterfly: 'fairy', ladybug: 'fairy', ant: 'rustle', snail: 'drop', cricket: 'pluck', firefly: 'fairy', dragonfly: 'feather',
  chick: 'bird', duckling: 'splash', fawn: 'hoof', 'bear-cub': 'bear', foal: 'hoof', 'penguin-chick': 'bird', 'sea-turtle-hatchling': 'turtle', 'seal-pup': 'splash',
  'mail-carrier': 'page', baker: 'basket', teacher: 'bell', dentist: 'bell', gardener: 'garden', 'train-driver': 'whistle', 'market-seller': 'basket', 'lighthouse-keeper': 'castle',
  puppy: 'howl', kitten: 'purr', goldfish: 'drop', hamster: 'mouse', canary: 'bird', 'guinea-pig': 'chatter', tortoise: 'turtle', 'lop-rabbit': 'rabbit',
  bedroom: 'blanket', kitchen: 'basket', bathroom: 'drop', 'living-room': 'blanket', 'dining-room': 'basket', attic: 'page', playroom: 'pluck', porch: 'village',
  school: 'bell', clinic: 'bell', 'train-station': 'whistle', market: 'village', 'festival-square': 'drum', 'little-theater': 'flute', farm: 'hoof', 'post-office': 'page',
  'rope-bridge': 'river', crossroads: 'forest', 'lighthouse-cliff': 'beach', swamp: 'frog', volcano: 'mountain', canyon: 'mountain', 'race-track': 'hoof', 'lookout-hill': 'meadow',
  'troll-bridge': 'river', 'pirate-ship': 'boat', 'crow-nest': 'bird', 'ogre-cave': 'cave', 'ice-castle': 'castle', 'web-corner': 'yarn', 'giant-house': 'clouds', 'imp-mushroom': 'forest',
  'cloud-sea': 'clouds', 'firefly-field': 'fairy', 'lily-pond': 'lake', 'shooting-star-hill': 'magicsteps', 'snowy-night-forest': 'mountain', 'moon-boat': 'whale', 'sunset-beach': 'beach', 'dandelion-garden': 'garden',
  pillow: 'blanket', 'teddy-bear': 'bear', 'night-lamp': 'fairy', toothbrush: 'splash', storybook: 'page', 'glass-of-milk': 'drop', 'alarm-clock': 'bell', slippers: 'rustle',
  'gift-box': 'magicsteps', balloon: 'cloud', garland: 'rustle', letter: 'page', 'flower-crown': 'flower', 'party-hat': 'pluck', confetti: 'fairy', pinata: 'drum',
  'treasure-chest': 'key', 'clue-scroll': 'page', potion: 'wizard', 'ice-flower': 'bell', 'fallen-star': 'fairy', moonstone: 'bell', hourglass: 'rustle', signpost: 'knight',
  'birthday-cake': 'basket', cookies: 'basket', 'dough-bowl': 'basket', 'wooden-spoon': 'pluck', 'milk-jug': 'drop', bread: 'basket', soup: 'splash', apron: 'blanket',
  medal: 'bell', trophy: 'castle', 'finish-flag': 'cloud', whistle: 'whistle', ball: 'pluck', 'jump-rope': 'yarn', scooter: 'hoof', stopwatch: 'key',
  'old-trunk': 'key', 'old-photo': 'page', 'spinning-top': 'pluck', 'rag-doll': 'blanket', marbles: 'pluck', 'music-box': 'flute', 'old-glasses': 'key', 'paper-plane': 'feather',
  bicycle: 'bell', helmet: 'knight', lunchbox: 'basket', notebook: 'page', 'float-ring': 'splash', 'new-shoes': 'hoof', chalkboard: 'page', 'pencil-case': 'rustle',
  'worry-box': 'key', 'smooth-stone': 'drop', 'calm-jar': 'watersong', 'hot-water-bottle': 'splash', handkerchief: 'blanket', bandage: 'rustle', thermometer: 'bell', 'flowers-in-glass': 'flower',
  curtain: 'cloud', 'dripping-tap': 'drop', 'cuckoo-clock': 'cuckoo', 'wind-chime': 'bell', 'window-branch': 'forest', 'creaky-door': 'key', 'dry-leaves': 'rustle', kettle: 'whistle',
  net: 'yarn', bucket: 'splash', shovel: 'rustle', wheelbarrow: 'hoof', broom: 'rustle', ladder: 'knight', sack: 'basket', 'cardboard-box': 'page',
});

/** Keep the existing public recording lookup format (filename without extension). */
export const SOUND_RECORDINGS = Object.freeze(Object.fromEntries(
  Object.entries(SOUND_LIBRARY).map(([id, clip]) => [id, clip.file.replace(/\.mp3$/, '')]),
));

function readPreference(key, disabledValue) {
  try { return globalThis.localStorage?.getItem(key) !== disabledValue; } catch { return true; }
}

function recordingFor(id) {
  if (typeof id !== 'string') return undefined;
  if (Object.hasOwn(SOUND_LIBRARY, id)) return SOUND_LIBRARY[id];
  const alias = Object.hasOwn(SOUND_ALIASES, id) ? SOUND_ALIASES[id] : undefined;
  return alias && Object.hasOwn(SOUND_LIBRARY, alias) ? SOUND_LIBRARY[alias] : undefined;
}

function bounded(promise, milliseconds) {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(null), milliseconds);
    promise.then(value => { clearTimeout(timer); resolve(value); }, () => { clearTimeout(timer); resolve(null); });
  });
}

async function fetchAudio(file, maxBytes = 750000, timeout = 4000) {
  if (typeof fetch !== 'function' || typeof AbortController !== 'function') return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(new URL(`../audio/${file}`, import.meta.url), { signal: controller.signal });
    if (!response.ok) return null;
    const data = await response.arrayBuffer();
    return data.byteLength && data.byteLength <= maxBytes ? data : null;
  } catch { return null; }
  finally { clearTimeout(timer); }
}

function pumpRecordings() {
  while (activeLoads < 3 && recordingQueue.length) {
    const { file, resolve } = recordingQueue.shift();
    activeLoads++;
    fetchAudio(file).then(data => {
      if (!data) {
        recordingData.delete(file);
        recordingFailures.set(file, Date.now());
      } else recordingFailures.delete(file);
      resolve(data);
    }).finally(() => { activeLoads--; pumpRecordings(); });
  }
}

function loadRecordingData(file) {
  if (Date.now() - (recordingFailures.get(file) || 0) < 15000) return Promise.resolve(null);
  if (!recordingData.has(file)) {
    recordingData.set(file, new Promise(resolve => recordingQueue.push({ file, resolve })));
    pumpRecordings();
  }
  return recordingData.get(file);
}

async function loadRecording(file) {
  if (!context || typeof context.decodeAudioData !== 'function') return null;
  if (!recordingBuffers.has(file)) {
    recordingBuffers.set(file, loadRecordingData(file).then(async data => {
      if (!data) return null;
      try {
        const buffer = await context.decodeAudioData(data.slice(0));
        return buffer.duration > 0 && buffer.duration < 12 ? buffer : null;
      } catch { return null; }
    }).then(buffer => {
      if (!buffer) recordingBuffers.delete(file);
      return buffer;
    }));
  }
  return recordingBuffers.get(file);
}

/** Fetch only effects used by a story; never create/resume AudioContext or play. */
export async function preloadSounds(ids = []) {
  if (!Array.isArray(ids) || !soundEnabled) return false;
  const files = [...new Set(['page', ...ids].map(recordingFor).filter(Boolean).map(clip => clip.file))];
  const loaded = await bounded(Promise.all(files.map(file => context ? loadRecording(file) : loadRecordingData(file))), 4500);
  return Boolean(loaded?.some(Boolean));
}

function createContext() {
  if (context) return context;
  const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!Context) return null;
  try {
    context = new Context();
    master = context.createGain();
    master.gain.value = soundEnabled ? 0.85 : 0;
    limiter = context.createDynamicsCompressor();
    limiter.threshold.value = -8;
    limiter.knee.value = 6;
    limiter.ratio.value = 3;
    limiter.attack.value = 0.008;
    limiter.release.value = 0.18;
    master.connect(limiter);
    limiter.connect(context.destination);
    return context;
  } catch { context = undefined; master = undefined; limiter = undefined; return null; }
}

/** Call inside a user gesture so Safari can resume its context. */
export async function unlockAudio() {
  if (!soundEnabled && !musicEnabled) return false;
  const audio = createContext();
  if (!audio || audio.state === 'closed') return false;
  try {
    if (audio.state !== 'running') await audio.resume();
    return audio.state === 'running';
  } catch { return false; }
}

export function getSoundEnabled() { return soundEnabled; }
export function setSoundEnabled(enabled) {
  soundEnabled = Boolean(enabled);
  try { globalThis.localStorage?.setItem(STORAGE_KEY, soundEnabled ? 'on' : 'off'); } catch {}
  if (master && context) {
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setTargetAtTime(soundEnabled ? 0.85 : 0, context.currentTime, 0.025);
  }
  if (!soundEnabled) stopSounds();
  return soundEnabled;
}

function disposeVoice(voice, immediate = false) {
  if (!voices.has(voice)) return;
  voices.delete(voice);
  clearTimeout(voice.timer);
  const now = context.currentTime;
  voice.output.gain.cancelScheduledValues(now);
  voice.output.gain.setTargetAtTime(0, now, immediate ? 0.008 : 0.025);
  try { voice.source.stop(now + (immediate ? 0.04 : 0.12)); } catch {}
  setTimeout(() => { try { voice.source.disconnect(); voice.output.disconnect(); } catch {} }, 150);
}

export function stopSounds() {
  soundEpoch++;
  for (const voice of [...voices]) disposeVoice(voice, true);
  lastPlayed.clear();
}

/** All effects use recordings. Missing or slow clips stay quiet instead of beeping. */
export async function playSound(id) {
  const clip = recordingFor(id);
  if (!clip || !soundEnabled) return false;
  const epoch = soundEpoch;
  if (!(await unlockAudio()) || epoch !== soundEpoch || !soundEnabled || globalThis.document?.hidden) return false;
  const key = clip.file;
  const previous = lastPlayed.get(key);
  if (previous !== undefined && context.currentTime - previous < 0.25) return false;
  lastPlayed.set(key, context.currentTime);
  const buffer = await bounded(loadRecording(key), 1200);
  if (!buffer || epoch !== soundEpoch || !soundEnabled || context.state !== 'running' || globalThis.document?.hidden) return false;
  // A second tap replaces the same effect instead of piling identical clips up.
  for (const voice of [...voices]) if (voice.file === key) disposeVoice(voice);
  while (voices.size >= MAX_VOICES) disposeVoice(voices.values().next().value);
  const source = context.createBufferSource();
  const output = context.createGain();
  const voice = { source, output, file: key, timer: null };
  try {
    source.buffer = buffer;
    source.connect(output);
    output.connect(master);
    const now = context.currentTime + 0.008;
    const gain = Math.max(0, Math.min(2, clip.gain ?? 1));
    output.gain.setValueAtTime(0, now);
    output.gain.linearRampToValueAtTime(gain, now + Math.min(0.012, buffer.duration / 4));
    output.gain.setValueAtTime(gain, now + Math.max(0.015, buffer.duration - 0.08));
    output.gain.linearRampToValueAtTime(0, now + buffer.duration);
    voices.add(voice);
    voice.timer = setTimeout(() => disposeVoice(voice), (buffer.duration + 0.1) * 1000);
    source.onended = () => disposeVoice(voice);
    source.start(now);
    return true;
  } catch {
    if (voices.has(voice)) disposeVoice(voice, true);
    else { try { source.disconnect(); output.disconnect(); } catch {} }
    return false;
  }
}

async function loadMusic(file) {
  if (!musicBuffers.has(file)) {
    // Retain at most two decoded excerpts (~44 MB at 32 kHz stereo).
    if (musicBuffers.size >= 2) musicBuffers.delete(musicBuffers.keys().next().value);
    musicBuffers.set(file, fetchAudio(file, 6000000, 10000).then(async data => {
      if (!data || !context) return null;
      try {
        const buffer = await context.decodeAudioData(data);
        return buffer.duration > 0 && buffer.duration <= 180 ? buffer : null;
      } catch { return null; }
    }).then(buffer => { if (!buffer) musicBuffers.delete(file); return buffer; }));
  }
  return musicBuffers.get(file);
}

function releaseAmbient(session) {
  clearTimeout(session.retireTimer);
  try { session.source?.disconnect(); session.output.disconnect(); } catch {}
}

/** Fade the music out; also invalidate a track still waiting for download/decode. */
export function stopAmbient() {
  if (!ambient) return;
  const session = ambient;
  ambient = null;
  const now = context.currentTime;
  session.output.gain.cancelScheduledValues(now);
  session.output.gain.setTargetAtTime(0, now, 0.12);
  if (session.source) {
    try { session.source.stop(now + 0.55); } catch {}
    session.retireTimer = setTimeout(() => releaseAmbient(session), 600);
  } else releaseAmbient(session);
}

/** Start a locally served instrumental excerpt after unlockAudio(), never autoplay. */
export function startAmbient(bookId) {
  const file = Object.hasOwn(MUSIC_TRACKS, bookId) ? MUSIC_TRACKS[bookId] : undefined;
  if (!file || !musicEnabled || !context || context.state !== 'running' || globalThis.document?.hidden) return false;
  if (ambient?.file === file) return true;
  stopAmbient();
  const output = context.createGain();
  output.gain.setValueAtTime(0, context.currentTime);
  // Background music has its own quiet output; muting effects cannot mute it.
  output.connect(context.destination);
  const session = { file, output, source: null, retireTimer: null };
  ambient = session;
  void bounded(loadMusic(file), 12000).then(buffer => {
    if (!buffer || ambient !== session || !musicEnabled || context.state !== 'running' || globalThis.document?.hidden) {
      if (ambient === session) { ambient = null; releaseAmbient(session); }
      return;
    }
    try {
      const source = context.createBufferSource();
      session.source = source;
      source.buffer = buffer;
      source.loop = true;
      source.loopStart = 0;
      source.loopEnd = buffer.duration;
      source.connect(output);
      output.gain.setTargetAtTime(0.22, context.currentTime, 0.55);
      source.start(context.currentTime + 0.015);
    } catch { if (ambient === session) stopAmbient(); }
  });
  return true;
}

export function getMusicEnabled() { return musicEnabled; }
export function setMusicEnabled(enabled) {
  musicEnabled = Boolean(enabled);
  try { globalThis.localStorage?.setItem('cc-music-enabled', String(musicEnabled)); } catch {}
  if (!musicEnabled) stopAmbient();
  return musicEnabled;
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stopSounds(); stopAmbient(); }
  });
}
