import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CHARACTERS, SUPPORTING, VILLAINS, SCENES, ITEMS } from '../src/story-engine.js';
import { SOUND_LIBRARY } from '../src/sound-library.js';
import { MUSIC_TRACKS } from '../src/music-library.js';

class Parameter {
  value = 0;
  setValueAtTime(value) { this.value = value; }
  setTargetAtTime(value) { this.value = value; }
  exponentialRampToValueAtTime(value) { this.value = value; }
  linearRampToValueAtTime(value) { this.value = value; }
  cancelScheduledValues() {}
}
const sources = [];
class Node {
  gain = new Parameter(); threshold = new Parameter(); knee = new Parameter();
  ratio = new Parameter(); attack = new Parameter(); release = new Parameter();
  connect(target) { this.target = target; }
  disconnect() { this.disconnected = true; }
  start() { this.started = true; sources.push(this); }
  stop() { this.stopped = true; }
}
let audio, decodes = 0;
class AudioContext {
  state = 'suspended'; currentTime = 0; destination = {};
  constructor() { audio = this; }
  async resume() { this.state = 'running'; }
  createGain() { return new Node(); }
  createDynamicsCompressor() { return new Node(); }
  createBufferSource() { return new Node(); }
  createOscillator() { throw new Error('Audio must use recordings, never oscillator fallbacks'); }
  async decodeAudioData(bytes) { decodes++; return { duration: new Uint8Array(bytes)[0] === 2 ? 82.5 : .6 }; }
}
globalThis.AudioContext = AudioContext;
const listeners = new Map();
globalThis.document = { hidden: false, addEventListener: (id, listener) => listeners.set(id, listener) };
const settings = new Map();
globalThis.localStorage = { getItem: key => settings.get(key), setItem: (key, value) => settings.set(key, value) };
const gates = new Map(), fetched = [];
const failureFile = SOUND_LIBRARY.crow.file;
globalThis.fetch = async url => {
  const name = String(url).split('/').pop(); fetched.push(name);
  if (gates.has(name)) await gates.get(name).promise;
  return { ok: name !== failureFile, arrayBuffer: async () => new Uint8Array([name.startsWith('music-') ? 2 : 1, 2, 3]).buffer };
};
const { SOUND_RECORDINGS, SOUND_ALIASES, preloadSounds, unlockAudio, playSound, stopSounds, setSoundEnabled, getSoundEnabled, setMusicEnabled, getMusicEnabled, startAmbient, stopAmbient } = await import('../src/audio.js');
const settle = () => new Promise(resolve => setImmediate(resolve));

assert.equal(fetched.length, 0, 'Import must not fetch or play');
assert.equal(await preloadSounds(['frog', 'frog', 'owl', 'not-a-sound']), true);
assert.deepEqual(fetched.sort(), [...new Set(['frog','owl','page'].map(id => SOUND_LIBRARY[id].file))].sort());
assert.equal(audio, undefined, 'Preloading must not create/resume a context');
assert.equal(sources.length, 0);
assert.equal(await unlockAudio(), true);
assert.equal(await playSound('frog'), true);
assert.equal(sources.at(-1).buffer.duration, .6);
assert.equal(await playSound('frog'), false, 'Rapid repeated taps are throttled');
audio.currentTime += .3;
assert.equal(await playSound('frog'), true);
assert.equal(decodes, 1, 'Repeated taps reuse decoded audio');
assert.equal(sources[0].stopped, true, 'Repeated taps replace the same clip instead of overlapping it');
assert.equal(await playSound('wizard'), true, 'Fantasy also uses recorded instruments');
const beforeFailure = sources.length;
assert.equal(await playSound('crow'), false, 'Unavailable clips stay quiet');
assert.equal(sources.length, beforeFailure, 'No synthetic beep on load failure');
assert.equal(await playSound('unknown-id'), false);
assert.equal(await playSound(null), false);
const beforeReserved = fetched.length;
for (const id of ['constructor', 'toString', '__proto__']) assert.equal(await playSound(id), false);
assert.equal(fetched.length, beforeReserved, 'Reserved IDs cannot trigger a fetch');
assert.equal(startAmbient('constructor'), false);
stopSounds();

let release;
const pendingFile = SOUND_LIBRARY.curtain.file;
gates.set(pendingFile, { promise: new Promise(resolve => { release = resolve; }) });
const pending = playSound('curtain'); await settle();
setSoundEnabled(false); const beforeCancel = sources.length; release();
assert.equal(await pending, false, 'Muting cancels a clip that is still loading');
assert.equal(sources.length, beforeCancel);
assert.equal(getSoundEnabled(), false);
assert.equal(getMusicEnabled(), true);
assert.equal(settings.get('cuentacuentos:sound'), 'off');
assert.equal(await preloadSounds(['cow']), false);

setSoundEnabled(true);
const voiceSources = [];
for (const id of ['bird', 'owl', 'cow', 'kitten', 'bee']) {
  audio.currentTime += .3; assert.equal(await playSound(id), true); voiceSources.push(sources.at(-1));
}
assert.equal(voiceSources[0].stopped, true, 'Five taps retire the oldest of four voices');
document.hidden = true; listeners.get('visibilitychange')();
assert(voiceSources.every(source => source.stopped));
assert.equal(await playSound('bird'), false);
document.hidden = false;
assert.equal(startAmbient('relax'), true); await settle(); await settle();
const music = sources.at(-1);
assert.equal(music.buffer.duration, 82.5, 'Music uses an instrumental recording');
assert.equal(music.loop, true);
assert.equal(startAmbient('family'), true, 'Family shares the calm track without restarting');
assert.equal(sources.at(-1), music);
setSoundEnabled(false);
assert.equal(music.stopped, undefined, 'Muting effects leaves music running');
setMusicEnabled(false);
assert.equal(music.stopped, true);
assert.equal(settings.get('cc-music-enabled'), 'false');

let releaseMusic;
gates.set(MUSIC_TRACKS.adventure, { promise: new Promise(resolve => { releaseMusic = resolve; }) });
setMusicEnabled(true); startAmbient('adventure'); await settle(); stopAmbient();
const beforeLateMusic = sources.length; releaseMusic(); await settle(); await settle();
assert.equal(sources.length, beforeLateMusic, 'Leaving cancels a track still awaiting download');
setMusicEnabled(false); stopSounds(); stopAmbient();

for (const entry of [...CHARACTERS,...SUPPORTING,...VILLAINS,...SCENES,...ITEMS]) {
  assert(SOUND_LIBRARY[entry.sound], `${entry.id}: every illustration needs a recorded binding`);
}
for (const file of new Set(Object.values(SOUND_LIBRARY).map(clip => clip.file))) {
  const bytes = await readFile(new URL(`../public/audio/${file}`, import.meta.url));
  assert(bytes.length > 1000 && bytes.length < 750000, `${file}: brief local recording`);
  assert(bytes.subarray(0,3).toString() === 'ID3' || bytes[0] === 0xff, `${file}: MP3 header`);
}
for (const file of new Set(Object.values(MUSIC_TRACKS))) {
  const bytes = await readFile(new URL(`../public/audio/${file}`, import.meta.url));
  assert(bytes.length > 500000 && bytes.length < 6000000, `${file}: local instrumental excerpt`);
}
assert(Object.hasOwn(SOUND_ALIASES,'cow') && Object.hasOwn(SOUND_ALIASES,'creaky-door'));
assert.equal(typeof SOUND_RECORDINGS.cow, 'string');
console.log('Audio verified: complete recorded catalogue, instrumental loops, caching, voice limits, independent preferences and cancellation');
