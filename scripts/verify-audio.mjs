import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

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
  gain = new Parameter();
  frequency = new Parameter();
  Q = new Parameter();
  threshold = new Parameter();
  knee = new Parameter();
  ratio = new Parameter();
  attack = new Parameter();
  release = new Parameter();
  connect(target) { this.target = target; }
  disconnect() { this.disconnected = true; }
  start() { this.started = true; sources.push(this); }
  stop() { this.stopped = true; }
}
let audio;
let decodes = 0;
class AudioContext {
  state = 'suspended';
  currentTime = 0;
  sampleRate = 44100;
  destination = {};
  constructor() { audio = this; }
  async resume() { this.state = 'running'; }
  createGain() { return new Node(); }
  createDynamicsCompressor() { return new Node(); }
  createBufferSource() { return new Node(); }
  createOscillator() { return new Node(); }
  createBiquadFilter() { return new Node(); }
  createBuffer(channels, length) { return { getChannelData: () => new Float32Array(length) }; }
  async decodeAudioData() { decodes++; return { duration: 0.25 }; }
}
globalThis.AudioContext = AudioContext;
const listeners = new Map();
globalThis.document = { hidden: false, addEventListener: (id, listener) => listeners.set(id, listener) };
const settings = new Map();
globalThis.localStorage = { getItem: key => settings.get(key), setItem: (key, value) => settings.set(key, value) };
const gates = new Map();
const fetched = [];
globalThis.fetch = async url => {
  const name = String(url).split('/').pop();
  fetched.push(name);
  if (gates.has(name)) await gates.get(name).promise;
  return { ok: name !== 'crow.mp3', arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer };
};
const { SOUND_RECORDINGS, SOUND_ALIASES, preloadSounds, unlockAudio, playSound, stopSounds, setSoundEnabled, getSoundEnabled, setMusicEnabled, getMusicEnabled, startAmbient, stopAmbient } = await import('../src/audio.js');

assert.equal(fetched.length, 0, 'Module import must not load or play audio');
assert.equal(await preloadSounds(['frog', 'frog', 'owl', 'not-a-sound']), true);
assert.deepEqual(fetched.sort(), ['frog.mp3', 'owl.mp3', 'page.mp3']);
assert.equal(audio, undefined, 'Preloading must not create/resume an AudioContext');
assert.equal(sources.length, 0);
assert.equal(await unlockAudio(), true);
assert.equal(await playSound('frog'), true);
assert.equal(sources.at(-1).buffer.duration, 0.25, 'Recognizable sounds should use recordings');
assert.equal(await playSound('frog'), false, 'Rapid repeat taps are throttled');
audio.currentTime += 0.2;
assert.equal(await playSound('frog'), true);
assert.equal(decodes, 1, 'Repeated taps should reuse decoded audio');

const beforeFantasy = sources.length;
assert.equal(await playSound('wizard'), true);
assert(sources.slice(beforeFantasy).every(source => !source.buffer), 'Fantasy keeps synthesized sounds');
const beforeFailure = sources.length;
assert.equal(await playSound('crow'), true);
assert(sources.slice(beforeFailure).every(source => !source.buffer), 'Unavailable files fall back to synthesis');
assert.equal(await playSound('unknown-id'), false);
assert.equal(await playSound(null), false);
stopSounds();

let release;
gates.set('wind.mp3', { promise: new Promise(resolve => { release = resolve; }) });
const pending = playSound('curtain');
await new Promise(resolve => setTimeout(resolve, 0));
setSoundEnabled(false);
const beforeCancel = sources.length;
release();
assert.equal(await pending, false, 'Muting must cancel a recording that is still loading');
assert.equal(sources.length, beforeCancel, 'No delayed sound after muting');
assert.equal(getSoundEnabled(), false);
assert.equal(getMusicEnabled(), true, 'Effects and music keep independent preferences');
assert.equal(await preloadSounds(['cow']), false);
assert.equal(settings.get('cuentacuentos:sound'), 'off');

setSoundEnabled(true);
await preloadSounds(['bird', 'owl', 'cow', 'kitten', 'bee']);
const voiceSources = [];
for (const id of ['bird', 'owl', 'cow', 'kitten', 'bee']) {
  audio.currentTime += 0.2;
  assert.equal(await playSound(id), true);
  voiceSources.push(sources.at(-1));
}
assert.equal(voiceSources[0].stopped, true, 'Five taps replace the oldest of four voices');
document.hidden = true;
listeners.get('visibilitychange')();
assert(voiceSources.every(source => source.stopped), 'Hiding the app stops all effects');
assert.equal(await playSound('bird'), false);
document.hidden = false;
assert.equal(startAmbient('relax'), true);
setSoundEnabled(false);
assert.equal(getMusicEnabled(), true);
setMusicEnabled(false);
assert.equal(getMusicEnabled(), false);
assert.equal(settings.get('cc-music-enabled'), 'false');
stopSounds();
stopAmbient();

for (const name of new Set(Object.values(SOUND_RECORDINGS))) {
  const bytes = await readFile(new URL(`../public/audio/${name}.mp3`, import.meta.url));
  assert(bytes.length > 1000 && bytes.length < 500000, `${name}: brief local recording required`);
  assert(bytes.subarray(0, 3).toString() === 'ID3' || bytes[0] === 0xff, `${name}: MP3 header required`);
}
assert(Object.hasOwn(SOUND_ALIASES, 'cow') && Object.hasOwn(SOUND_ALIASES, 'creaky-door'));
console.log('Audio verified: local recordings, caching, fallback, four voices, cancellation and independent preferences');
