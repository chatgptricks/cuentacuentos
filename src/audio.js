/**
 * Gentle, intentionally synthesized story effects. No recordings, downloads,
 * autoplay or speech: every sound follows a reader's tap.
 */

const STORAGE_KEY = 'cuentacuentos:sound';
const MAX_VOICES = 4;
const voices = new Set();
const lastPlayed = new Map();

/** Shared, gentle effects give characters, places and objects sound without loading files. */
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
});

let context;
let master;
let limiter;
let noiseBuffer;
let soundEnabled = readPreference();
let musicEnabled = readMusicPreference();
let ambient = null;
const retiringAmbient = new Set();

function readPreference() {
  try {
    return globalThis.localStorage?.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

function readMusicPreference() {
  try {
    return globalThis.localStorage?.getItem('cc-music-enabled') !== 'false';
  } catch {
    return true;
  }
}

function createContext() {
  if (context) return context;
  const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!Context) return null;
  try {
    context = new Context();
    master = context.createGain();
    master.gain.value = soundEnabled ? 0.45 : 0;
    limiter = context.createDynamicsCompressor();
    limiter.threshold.value = -18;
    limiter.knee.value = 12;
    limiter.ratio.value = 8;
    limiter.attack.value = 0.005;
    limiter.release.value = 0.12;
    master.connect(limiter);
    limiter.connect(context.destination);
    return context;
  } catch {
    context = undefined;
    master = undefined;
    limiter = undefined;
    return null;
  }
}

/** Call inside a click/pointer handler so iOS Safari can resume AudioContext. */
export async function unlockAudio() {
  if (!soundEnabled && !musicEnabled) return false;
  const audio = createContext();
  if (!audio || audio.state === 'closed') return false;
  try {
    if (audio.state !== 'running') await audio.resume();
    return audio.state === 'running';
  } catch {
    return false;
  }
}

export function getSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = Boolean(enabled);
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, soundEnabled ? 'on' : 'off');
  } catch {
    // Private browsing/storage restrictions should not prevent reading a book.
  }
  if (master && context) {
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setTargetAtTime(soundEnabled ? 0.45 : 0, context.currentTime, 0.012);
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
  voice.output.gain.setTargetAtTime(0, now, immediate ? 0.002 : 0.008);
  for (const source of voice.sources) {
    try { source.stop(now + (immediate ? 0.01 : 0.04)); } catch { /* Already ended. */ }
  }
  setTimeout(() => {
    for (const node of voice.nodes) {
      try { node.disconnect(); } catch { /* Already disconnected. */ }
    }
  }, 60);
}

export function stopSounds() {
  for (const voice of [...voices]) disposeVoice(voice, true);
  lastPlayed.clear();
}

function makeVoice(duration) {
  while (voices.size >= MAX_VOICES) disposeVoice(voices.values().next().value);
  const output = context.createGain();
  output.gain.value = 1;
  output.connect(master);
  const voice = {
    output,
    start: context.currentTime + 0.012,
    nodes: [output],
    sources: [],
    timer: null,
  };
  voices.add(voice);
  voice.timer = setTimeout(() => disposeVoice(voice), (duration + 0.12) * 1000);
  return voice;
}

function envelope(parameter, start, duration, volume, attack = 0.018, release = 0.12) {
  const rise = Math.min(attack, duration * 0.25);
  const fall = Math.min(release, duration * 0.45);
  parameter.setValueAtTime(0.0001, start);
  parameter.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + rise);
  parameter.setValueAtTime(Math.max(0.0002, volume), start + duration - fall);
  parameter.exponentialRampToValueAtTime(0.0001, start + duration);
}

function tone(voice, {
  at = 0, duration = 0.3, frequency = 440, endFrequency,
  type = 'sine', volume = 0.06, attack = 0.02, release = 0.12,
  vibrato = 0, vibratoRate = 7, bend,
}) {
  const start = voice.start + at;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  if (bend) {
    for (const [fraction, pitch] of bend) {
      oscillator.frequency.exponentialRampToValueAtTime(pitch, start + duration * fraction);
    }
  } else if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  }
  envelope(gain.gain, start, duration, volume, attack, release);
  oscillator.connect(gain);
  gain.connect(voice.output);
  voice.nodes.push(oscillator, gain);
  voice.sources.push(oscillator);
  if (vibrato) {
    const lfo = context.createOscillator();
    const depth = context.createGain();
    lfo.frequency.value = vibratoRate;
    depth.gain.value = vibrato;
    lfo.connect(depth);
    depth.connect(oscillator.frequency);
    lfo.start(start);
    lfo.stop(start + duration + 0.025);
    voice.nodes.push(lfo, depth);
    voice.sources.push(lfo);
  }
  oscillator.start(start);
  oscillator.stop(start + duration + 0.025);
}

function noise(voice, {
  at = 0, duration = 0.3, frequency = 1200, endFrequency,
  volume = 0.04, type = 'lowpass', attack = 0.04, release = 0.1,
}) {
  if (!noiseBuffer) {
    noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.5), context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < data.length; index++) data[index] = Math.random() * 2 - 1;
  }
  const start = voice.start + at;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = noiseBuffer;
  source.loop = true;
  filter.type = type;
  filter.frequency.setValueAtTime(frequency, start);
  filter.Q.value = 0.5;
  if (endFrequency) filter.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  envelope(gain.gain, start, duration, volume, attack, release);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(voice.output);
  voice.nodes.push(source, filter, gain);
  voice.sources.push(source);
  source.start(start);
  source.stop(start + duration + 0.025);
}

function bell(voice, frequency, at = 0, duration = 0.6, volume = 0.045) {
  tone(voice, { at, duration, frequency, volume, attack: 0.009, release: duration * 0.44 });
  tone(voice, { at, duration: duration * 0.8, frequency: frequency * 2.01, volume: volume * 0.25, attack: 0.007, release: duration * 0.4 });
  tone(voice, { at, duration: duration * 0.5, frequency: frequency * 3.02, volume: volume * 0.1, attack: 0.005, release: duration * 0.24 });
}

const effects = {
  mouse: {
    duration: 0.52,
    draw(voice) {
      for (const at of [0, 0.27]) {
        tone(voice, { at, duration: 0.19, frequency: 1450, bend: [[0.35, 2200], [1, 1350]], type: 'triangle', volume: 0.038, attack: 0.018, release: 0.07 });
      }
    },
  },
  fox: {
    duration: 0.68,
    draw(voice) {
      tone(voice, { duration: 0.25, frequency: 560, bend: [[0.4, 1020], [1, 440]], type: 'triangle', volume: 0.052, vibrato: 18, vibratoRate: 16 });
      tone(voice, { at: 0.31, duration: 0.25, frequency: 600, endFrequency: 380, volume: 0.048 });
    },
  },
  rabbit: {
    duration: 0.57,
    draw(voice) {
      for (const at of [0, 0.24]) {
        tone(voice, { at, duration: 0.17, frequency: 260, endFrequency: 95, volume: 0.065, attack: 0.006, release: 0.065 });
        noise(voice, { at, duration: 0.1, frequency: 450, volume: 0.024, attack: 0.008, release: 0.04 });
      }
    },
  },
  bear: {
    duration: 0.94,
    draw(voice) {
      tone(voice, { duration: 0.76, frequency: 115, endFrequency: 78, type: 'triangle', volume: 0.065, vibrato: 5, vibratoRate: 9, attack: 0.09, release: 0.25 });
      tone(voice, { duration: 0.72, frequency: 165, endFrequency: 117, volume: 0.025, vibrato: 3, attack: 0.08, release: 0.26 });
    },
  },
  knight: {
    duration: 1.0,
    draw(voice) {
      bell(voice, 660, 0, 0.65, 0.045);
      bell(voice, 880, 0.2, 0.65, 0.04);
    },
  },
  wizard: {
    duration: 1.25,
    draw(voice) {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((pitch, index) => {
        bell(voice, pitch, index * 0.12, 0.55, 0.034);
      });
    },
  },
  dragon: {
    duration: 1.25,
    draw(voice) {
      tone(voice, { duration: 1.07, frequency: 68, endFrequency: 88, type: 'triangle', volume: 0.065, vibrato: 6, vibratoRate: 5, attack: 0.14, release: 0.33 });
      tone(voice, { duration: 1.0, frequency: 102, endFrequency: 132, volume: 0.04, vibrato: 4, vibratoRate: 5, attack: 0.14, release: 0.34 });
      noise(voice, { duration: 0.86, frequency: 300, volume: 0.026, attack: 0.2, release: 0.3 });
    },
  },
  owl: {
    duration: 1.32,
    draw(voice) {
      for (const [at, duration] of [[0, 0.34], [0.49, 0.62]]) {
        tone(voice, { at, duration, frequency: 340, bend: [[0.25, 305], [0.65, 310], [1, 265]], volume: 0.075, attack: 0.06, release: 0.15, vibrato: 2, vibratoRate: 5 });
        tone(voice, { at, duration, frequency: 680, endFrequency: 530, volume: 0.014, attack: 0.06, release: 0.15 });
      }
    },
  },
  squirrel: {
    duration: 0.82,
    draw(voice) {
      [0, 0.16, 0.32, 0.53].forEach((at, index) => {
        tone(voice, { at, duration: 0.12, frequency: 720 + index * 35, bend: [[0.4, 1050], [1, 600]], type: 'triangle', volume: 0.039, attack: 0.01, release: 0.04 });
      });
    },
  },
  frog: {
    duration: 0.95,
    draw(voice) {
      [0, 0.41].forEach(at => {
        tone(voice, { at, duration: 0.29, frequency: 250, endFrequency: 115, type: 'triangle', volume: 0.055, vibrato: 10, vibratoRate: 20, attack: 0.045, release: 0.1 });
        tone(voice, { at, duration: 0.26, frequency: 375, endFrequency: 173, volume: 0.02, attack: 0.04, release: 0.1 });
      });
    },
  },
  turtle: {
    duration: 1.1,
    draw(voice) {
      [0, 0.5].forEach(at => {
        tone(voice, { at, duration: 0.27, frequency: 220, endFrequency: 145, volume: 0.045, attack: 0.04, release: 0.1 });
        noise(voice, { at: at + 0.07, duration: 0.22, frequency: 380, endFrequency: 170, volume: 0.038, attack: 0.06, release: 0.08 });
      });
    },
  },
  fairy: {
    duration: 1.35,
    draw(voice) {
      [1046.5, 1318.5, 1567.98].forEach((pitch, index) => bell(voice, pitch, index * 0.18, 0.72, 0.028));
      noise(voice, { at: 0.08, duration: 0.92, frequency: 2100, endFrequency: 900, volume: 0.022, attack: 0.18, release: 0.33 });
    },
  },
  rustle: {
    duration: 0.92,
    draw(voice) {
      [0, 0.28, 0.57].forEach(at => {
        noise(voice, { at, duration: 0.22, frequency: 780, endFrequency: 320, volume: 0.032, attack: 0.06, release: 0.08 });
        tone(voice, { at: at + 0.04, duration: 0.16, frequency: 340, endFrequency: 260, type: 'triangle', volume: 0.021, attack: 0.025, release: 0.065 });
      });
    },
  },
  hoof: {
    duration: 0.92,
    draw(voice) {
      [0, 0.22, 0.49, 0.7].forEach((at, index) => {
        tone(voice, { at, duration: 0.14, frequency: index % 2 ? 235 : 280, endFrequency: 100, type: 'triangle', volume: 0.041, attack: 0.008, release: 0.06 });
        noise(voice, { at, duration: 0.09, frequency: 470, endFrequency: 240, volume: 0.019, attack: 0.008, release: 0.035 });
      });
    },
  },
  purr: {
    duration: 1.15,
    draw(voice) {
      tone(voice, { duration: 0.94, frequency: 135, endFrequency: 112, type: 'triangle', volume: 0.044, vibrato: 5, vibratoRate: 17, attack: 0.14, release: 0.3 });
      tone(voice, { at: 0.1, duration: 0.83, frequency: 203, endFrequency: 168, volume: 0.021, vibrato: 3, vibratoRate: 17, attack: 0.14, release: 0.29 });
    },
  },
  howl: {
    duration: 1.48,
    draw(voice) {
      tone(voice, { duration: 1.27, frequency: 245, bend: [[0.25, 365], [0.65, 350], [1, 230]], volume: 0.049, attack: 0.2, release: 0.36, vibrato: 3, vibratoRate: 5 });
      tone(voice, { at: 0.03, duration: 1.19, frequency: 490, bend: [[0.25, 730], [0.65, 700], [1, 460]], volume: 0.01, attack: 0.22, release: 0.35 });
    },
  },
  trumpet: {
    duration: 1.14,
    draw(voice) {
      tone(voice, { duration: 0.9, frequency: 230, bend: [[0.35, 410], [0.72, 320], [1, 200]], type: 'triangle', volume: 0.043, attack: 0.12, release: 0.25 });
      tone(voice, { at: 0.04, duration: 0.82, frequency: 460, endFrequency: 400, volume: 0.014, attack: 0.13, release: 0.24 });
    },
  },
  chatter: {
    duration: 0.93,
    draw(voice) {
      [0, 0.19, 0.41, 0.66].forEach((at, index) => {
        tone(voice, { at, duration: 0.17, frequency: index % 2 ? 540 : 690, bend: [[0.45, 900], [1, 480]], type: 'triangle', volume: 0.033, attack: 0.025, release: 0.07 });
      });
    },
  },
  bird: {
    duration: 1.07,
    draw(voice) {
      [0, 0.24, 0.61].forEach((at, index) => {
        tone(voice, { at, duration: 0.23, frequency: 890 + index * 140, bend: [[0.45, 1450 + index * 110], [1, 860 + index * 80]], volume: 0.031, attack: 0.035, release: 0.09 });
      });
    },
  },
  splash: {
    duration: 1.1,
    draw(voice) {
      noise(voice, { duration: 0.68, frequency: 920, endFrequency: 330, volume: 0.045, attack: 0.12, release: 0.24 });
      [0.17, 0.43, 0.72].forEach((at, index) => {
        tone(voice, { at, duration: 0.2, frequency: 570 + index * 110, endFrequency: 240, volume: 0.032, attack: 0.015, release: 0.09 });
      });
    },
  },
  whistle: {
    duration: 1.05,
    draw(voice) {
      tone(voice, { duration: 0.35, frequency: 720, bend: [[0.6, 1320], [1, 940]], volume: 0.033, attack: 0.055, release: 0.11 });
      tone(voice, { at: 0.49, duration: 0.37, frequency: 920, bend: [[0.4, 1450], [1, 760]], volume: 0.03, attack: 0.055, release: 0.13 });
    },
  },
  whale: {
    duration: 1.6,
    draw(voice) {
      tone(voice, { duration: 1.37, frequency: 115, bend: [[0.35, 170], [0.7, 145], [1, 92]], volume: 0.043, attack: 0.24, release: 0.4, vibrato: 2, vibratoRate: 4 });
      tone(voice, { at: 0.1, duration: 1.24, frequency: 230, endFrequency: 185, volume: 0.015, attack: 0.25, release: 0.39 });
      noise(voice, { at: 0.25, duration: 0.9, frequency: 360, endFrequency: 200, volume: 0.017, attack: 0.2, release: 0.32 });
    },
  },
  magicsteps: {
    duration: 1.3,
    draw(voice) {
      [523.25, 659.25, 783.99].forEach((pitch, index) => {
        const at = index * 0.25;
        tone(voice, { at, duration: 0.15, frequency: 235, endFrequency: 110, type: 'triangle', volume: 0.028, attack: 0.008, release: 0.065 });
        bell(voice, pitch, at + 0.04, 0.59, 0.023);
      });
    },
  },
  pluck: {
    duration: 1.01,
    draw(voice) {
      [392, 523.25, 440].forEach((pitch, index) => {
        tone(voice, { at: index * 0.21, duration: 0.42, frequency: pitch, endFrequency: pitch * 0.97, type: 'triangle', volume: 0.032, attack: 0.013, release: 0.2 });
      });
    },
  },
  watersong: {
    duration: 1.42,
    draw(voice) {
      noise(voice, { duration: 1.1, frequency: 550, endFrequency: 310, volume: 0.029, attack: 0.23, release: 0.34 });
      [523.25, 659.25, 783.99].forEach((pitch, index) => bell(voice, pitch, 0.11 + index * 0.23, 0.68, 0.025));
    },
  },
  drum: {
    duration: 0.9,
    draw(voice) {
      [0, 0.3, 0.58].forEach((at, index) => {
        tone(voice, { at, duration: 0.22, frequency: index === 1 ? 205 : 160, endFrequency: 74, type: 'triangle', volume: 0.046, attack: 0.009, release: 0.1 });
        noise(voice, { at, duration: 0.11, frequency: 520, endFrequency: 180, volume: 0.018, attack: 0.012, release: 0.05 });
      });
    },
  },
  flute: {
    duration: 1.46,
    draw(voice) {
      [523.25, 587.33, 659.25].forEach((pitch, index) => {
        const at = index * 0.36;
        tone(voice, { at, duration: 0.48, frequency: pitch, volume: 0.036, attack: 0.09, release: 0.16, vibrato: 1.5, vibratoRate: 5 });
        tone(voice, { at, duration: 0.44, frequency: pitch * 2, volume: 0.007, attack: 0.1, release: 0.15 });
      });
    },
  },
  forest: {
    duration: 1.4,
    draw(voice) {
      noise(voice, { duration: 1.1, frequency: 1400, endFrequency: 800, volume: 0.065, attack: 0.22, release: 0.3 });
      tone(voice, { at: 0.16, duration: 0.14, frequency: 1250, endFrequency: 1800, volume: 0.025 });
      tone(voice, { at: 0.35, duration: 0.2, frequency: 1700, endFrequency: 1200, volume: 0.027 });
      tone(voice, { at: 0.8, duration: 0.16, frequency: 1400, endFrequency: 2000, volume: 0.022 });
    },
  },
  castle: {
    duration: 1.3,
    draw(voice) {
      [261.63, 329.63, 392].forEach((pitch, index) => bell(voice, pitch, index * 0.08, 0.94, 0.036));
    },
  },
  lake: {
    duration: 1.25,
    draw(voice) {
      noise(voice, { duration: 1.03, frequency: 620, endFrequency: 360, volume: 0.056, attack: 0.2, release: 0.3 });
      [0.12, 0.38, 0.74].forEach((at, index) => {
        tone(voice, { at, duration: 0.17, frequency: 480 + index * 100, endFrequency: 210, volume: 0.047, attack: 0.005, release: 0.075 });
      });
    },
  },
  garden: {
    duration: 1.1,
    draw(voice) {
      [0, 0.17, 0.5, 0.69].forEach((at, index) => {
        tone(voice, { at, duration: 0.16, frequency: index % 2 ? 1600 : 1150, endFrequency: index % 2 ? 1050 : 1700, volume: 0.033, attack: 0.018, release: 0.06 });
      });
      bell(voice, 784, 0.3, 0.5, 0.025);
    },
  },
  beach: {
    duration: 1.6,
    draw(voice) {
      noise(voice, { duration: 1.3, frequency: 1500, endFrequency: 350, volume: 0.075, attack: 0.26, release: 0.4 });
      noise(voice, { at: 0.48, duration: 0.75, frequency: 900, endFrequency: 300, volume: 0.045, attack: 0.2, release: 0.28 });
    },
  },
  mountain: {
    duration: 1.47,
    draw(voice) {
      noise(voice, { duration: 1.2, frequency: 650, endFrequency: 1100, type: 'bandpass', volume: 0.055, attack: 0.27, release: 0.39 });
      tone(voice, { at: 0.2, duration: 0.8, frequency: 174.61, endFrequency: 196, volume: 0.023, attack: 0.22, release: 0.3 });
    },
  },
  treehouse: {
    duration: 1.15,
    draw(voice) {
      noise(voice, { duration: 0.91, frequency: 1250, endFrequency: 550, volume: 0.04, attack: 0.19, release: 0.28 });
      [0.14, 0.55].forEach(at => {
        tone(voice, { at, duration: 0.19, frequency: 440, endFrequency: 260, type: 'triangle', volume: 0.035, attack: 0.009, release: 0.075 });
        noise(voice, { at, duration: 0.12, frequency: 700, endFrequency: 350, volume: 0.025, attack: 0.01, release: 0.05 });
      });
    },
  },
  village: {
    duration: 1.5,
    draw(voice) {
      bell(voice, 349.23, 0, 0.86, 0.037);
      bell(voice, 261.63, 0.32, 0.86, 0.033);
      tone(voice, { at: 0.87, duration: 0.17, frequency: 1380, endFrequency: 1800, volume: 0.024, release: 0.065 });
      tone(voice, { at: 1.05, duration: 0.16, frequency: 1700, endFrequency: 1250, volume: 0.022, release: 0.06 });
    },
  },
  meadow: {
    duration: 1.36,
    draw(voice) {
      noise(voice, { duration: 1.04, frequency: 800, endFrequency: 1400, volume: 0.042, attack: 0.2, release: 0.33 });
      [0.18, 0.4, 0.78].forEach((at, index) => {
        tone(voice, { at, duration: 0.16, frequency: 1150 + index * 150, endFrequency: 1900 - index * 150, volume: 0.026, release: 0.06 });
      });
    },
  },
  cave: {
    duration: 1.57,
    draw(voice) {
      bell(voice, 392, 0, 0.83, 0.032);
      bell(voice, 392, 0.28, 0.8, 0.018);
      bell(voice, 392, 0.56, 0.75, 0.009);
      tone(voice, { at: 0.04, duration: 0.9, frequency: 196, volume: 0.018, attack: 0.17, release: 0.33 });
    },
  },
  river: {
    duration: 1.47,
    draw(voice) {
      noise(voice, { duration: 1.2, frequency: 900, endFrequency: 600, volume: 0.05, attack: 0.2, release: 0.35 });
      [350, 620, 430, 700, 510].forEach((pitch, index) => {
        tone(voice, { at: 0.12 + index * 0.19, duration: 0.14, frequency: pitch, endFrequency: pitch * 0.52, volume: 0.031, attack: 0.005, release: 0.06 });
      });
    },
  },
  clouds: {
    duration: 1.56,
    draw(voice) {
      noise(voice, { duration: 1.25, frequency: 700, endFrequency: 1500, volume: 0.045, attack: 0.28, release: 0.38 });
      bell(voice, 523.25, 0.17, 0.9, 0.026);
      bell(voice, 1046.5, 0.48, 0.79, 0.02);
    },
  },
  seed: {
    duration: 0.53,
    draw(voice) {
      [0, 0.14, 0.3].forEach(at => {
        noise(voice, { at, duration: 0.09, frequency: 700, volume: 0.028, attack: 0.009, release: 0.035 });
        tone(voice, { at, duration: 0.08, frequency: 420, endFrequency: 220, volume: 0.027, attack: 0.006, release: 0.03 });
      });
    },
  },
  bell: {
    duration: 1.0,
    draw(voice) {
      bell(voice, 587.33, 0, 0.86, 0.055);
    },
  },
  drop: {
    duration: 0.38,
    draw(voice) {
      tone(voice, { duration: 0.2, frequency: 850, endFrequency: 240, volume: 0.06, attack: 0.007, release: 0.09 });
      noise(voice, { at: 0.07, duration: 0.15, frequency: 1200, endFrequency: 400, volume: 0.023, attack: 0.018, release: 0.06 });
    },
  },
  feather: {
    duration: 0.87,
    draw(voice) {
      [0, 0.2, 0.43].forEach((at, index) => {
        noise(voice, { at, duration: 0.22, frequency: 1500 - index * 250, volume: 0.035, attack: 0.055, release: 0.09 });
      });
    },
  },
  key: {
    duration: 0.7,
    draw(voice) {
      bell(voice, 1046.5, 0, 0.28, 0.031);
      bell(voice, 1318.5, 0.12, 0.32, 0.034);
      bell(voice, 783.99, 0.25, 0.29, 0.025);
    },
  },
  umbrella: {
    duration: 1.23,
    draw(voice) {
      noise(voice, { duration: 1.02, frequency: 1900, endFrequency: 900, volume: 0.053, attack: 0.18, release: 0.3 });
      [0.13, 0.35, 0.69].forEach(at => {
        tone(voice, { at, duration: 0.09, frequency: 650, endFrequency: 300, volume: 0.026, attack: 0.005, release: 0.035 });
      });
    },
  },
  cloud: {
    duration: 1.4,
    draw(voice) {
      noise(voice, { duration: 1.2, frequency: 470, endFrequency: 950, volume: 0.068, attack: 0.28, release: 0.4 });
      tone(voice, { at: 0.16, duration: 0.9, frequency: 196, endFrequency: 220, volume: 0.017, attack: 0.18, release: 0.32 });
    },
  },
  yarn: {
    duration: 0.74,
    draw(voice) {
      noise(voice, { duration: 0.25, frequency: 630, endFrequency: 330, volume: 0.042, attack: 0.05, release: 0.09 });
      noise(voice, { at: 0.3, duration: 0.29, frequency: 450, endFrequency: 800, volume: 0.037, attack: 0.06, release: 0.1 });
    },
  },
  blanket: {
    duration: 0.99,
    draw(voice) {
      noise(voice, { duration: 0.74, frequency: 440, endFrequency: 180, volume: 0.073, attack: 0.14, release: 0.27 });
      noise(voice, { at: 0.32, duration: 0.47, frequency: 300, endFrequency: 130, volume: 0.044, attack: 0.09, release: 0.2 });
    },
  },
  basket: {
    duration: 0.67,
    draw(voice) {
      [0, 0.24].forEach(at => {
        tone(voice, { at, duration: 0.14, frequency: 320, endFrequency: 175, type: 'triangle', volume: 0.042, attack: 0.005, release: 0.06 });
        noise(voice, { at, duration: 0.19, frequency: 650, endFrequency: 220, volume: 0.036, attack: 0.01, release: 0.075 });
      });
    },
  },
  flower: {
    duration: 1.01,
    draw(voice) {
      [659.25, 783.99, 987.77].forEach((pitch, index) => bell(voice, pitch, index * 0.13, 0.58, 0.031));
    },
  },
  boat: {
    duration: 1.33,
    draw(voice) {
      noise(voice, { duration: 1.07, frequency: 700, endFrequency: 300, volume: 0.061, attack: 0.2, release: 0.35 });
      tone(voice, { at: 0.12, duration: 0.34, frequency: 160, endFrequency: 195, type: 'triangle', volume: 0.031, attack: 0.06, release: 0.12 });
      tone(voice, { at: 0.7, duration: 0.2, frequency: 450, endFrequency: 210, volume: 0.043, attack: 0.009, release: 0.08 });
    },
  },
  page: {
    duration: 0.4,
    draw(voice) {
      noise(voice, { duration: 0.27, frequency: 1100, endFrequency: 350, type: 'bandpass', volume: 0.055, attack: 0.055, release: 0.1 });
    },
  },
};

/** Returns false if muted, unsupported, too rapid, or the id is unknown. */
export async function playSound(id) {
  if (typeof id !== 'string') return false;
  if (Object.prototype.hasOwnProperty.call(SOUND_ALIASES, id)) id = SOUND_ALIASES[id];
  if (!Object.prototype.hasOwnProperty.call(effects, id)) return false;
  const effect = effects[id];
  if (!soundEnabled || !effect || !(await unlockAudio()) || !soundEnabled) return false;
  if (typeof document !== 'undefined' && document.hidden) return false;
  const now = context.currentTime;
  const previous = lastPlayed.get(id);
  if (previous !== undefined && now - previous < 0.16) return false;
  lastPlayed.set(id, now);
  const voice = makeVoice(effect.duration);
  try {
    effect.draw(voice);
    return true;
  } catch {
    disposeVoice(voice, true);
    return false;
  }
}

/**
 * Original sixteen-bar pieces. Pitches are MIDI notes; melody entries are
 * [beat, pitch, length in beats]. Each loop lasts 40–57 seconds and returns
 * harmonically to its opening. No external music, samples or network requests.
 */
const compositions = {
  adventure: {
    tempo: 80,
    chords: [[48,52,55],[43,47,50],[45,48,52],[41,45,48],[48,52,55],[40,43,47],[41,45,48],[43,47,50],[45,48,52],[41,45,48],[48,52,55],[43,47,50],[41,45,48],[43,47,50],[48,52,55],[43,47,50]],
    melody: [
      [[0,72,1],[1.5,74,.5],[2,76,1],[3.5,79,.5]],
      [[0,79,1.5],[2,74,1],[3,72,.75]],
      [[0,76,1],[1,79,.5],[2,81,1.5]],
      [[.5,79,1],[2,76,1],[3,72,.75]],
      [[0,72,.75],[1,76,.75],[2,79,1],[3.5,76,.5]],
      [[0,76,1.5],[2,74,.75],[3,67,.75]],
      [[0,69,1],[1.5,72,.5],[2,76,1.5]],
      [[0,74,1],[1,79,1],[2.5,74,1]],
      [[0,81,1.5],[2,79,.5],[3,76,.75]],
      [[.5,79,.75],[1.5,76,.75],[2.5,72,1]],
      [[0,76,.75],[1,79,.75],[2,84,1.5]],
      [[0,81,1],[1.5,79,.5],[2,74,1.5]],
      [[0,76,1.5],[2,72,1],[3.5,69,.5]],
      [[0,74,1],[1.5,76,.5],[2,79,1]],
      [[0,76,1],[1.5,74,.5],[2,72,1.75]],
      [[0,67,1.5],[2,69,.75],[3,74,.75]],
    ],
  },
  action: {
    tempo: 76,
    chords: [[50,53,57],[46,50,53],[48,53,57],[48,52,55],[50,53,57],[43,46,50],[46,50,53],[45,49,52],[50,53,57],[46,50,53],[48,53,57],[48,52,55],[43,46,50],[46,50,53],[50,53,57],[45,49,52]],
    melody: [
      [[0,69,1.5],[2,65,.75],[3,62,.75]],
      [[.5,65,1],[2,70,1.5]],
      [[0,69,1],[1.5,72,.5],[2,69,1.5]],
      [[0,67,1.5],[2,64,1.5]],
      [[0,62,.75],[1,65,.75],[2,69,1.5]],
      [[0,67,1],[1.5,70,.5],[2,74,1]],
      [[0,70,1.5],[2,69,.75],[3,65,.75]],
      [[0,64,1.5],[2,61,1.5]],
      [[0,74,1.5],[2,72,.75],[3,69,.75]],
      [[0,70,1],[1.5,74,.5],[2,77,1.5]],
      [[0,76,1],[1.5,72,.5],[2,69,1.5]],
      [[0,72,1.5],[2,67,1.5]],
      [[.5,70,1],[2,67,1.5]],
      [[0,65,1],[1.5,70,.5],[2,74,1.5]],
      [[0,69,1],[1.5,65,.5],[2,62,1.75]],
      [[0,64,1],[1.5,61,.5],[2,69,1.5]],
    ],
  },
  relax: {
    tempo: 68,
    chords: [[48,52,55,59],[41,45,48,52],[45,48,52,55],[43,47,50,55],[48,52,55,59],[40,43,47,52],[41,45,48,52],[43,47,50,55],[45,48,52,55],[41,45,48,52],[48,52,55,59],[43,47,50,55],[41,45,48,52],[43,47,50,55],[48,52,55,59],[43,47,50,55]],
    melody: [
      [[.5,76,1.5],[2.5,72,1]],
      [[1,69,2]],
      [[.5,72,1],[2,76,1.5]],
      [[1,74,2]],
      [[.5,79,1.5],[2.5,76,1]],
      [[1,71,2]],
      [[.5,72,1.5],[2.5,69,1]],
      [[1,67,2]],
      [[.5,76,1.5],[2.5,79,1]],
      [[1,77,2]],
      [[.5,76,1],[2,72,1.5]],
      [[1,74,2]],
      [[.5,69,1.5],[2.5,72,1]],
      [[1,71,2]],
      [[.5,72,2.5]],
      [[1,67,1.5],[3,71,.5]],
    ],
  },
  friends: {
    tempo: 96,
    chords: [[48,52,55],[41,45,48],[43,47,50],[48,52,55],[45,48,52],[41,45,48],[43,47,50],[48,52,55],[48,52,55],[41,45,48],[45,48,52],[43,47,50],[41,45,48],[43,47,50],[48,52,55],[43,47,50]],
    melody: [
      [[0,72,.5],[.75,76,.5],[1.5,79,.5],[2.5,76,.75],[3.5,72,.5]],
      [[0,69,.75],[1,72,.5],[2,77,.75],[3,76,.5]],
      [[0,74,.5],[.75,71,.5],[1.5,67,.5],[2.5,74,1]],
      [[0,76,.5],[1,74,.5],[2,72,1.5]],
      [[0,76,.5],[.75,79,.5],[1.5,81,.75],[3,79,.5]],
      [[0,77,.75],[1,76,.5],[2,72,.75],[3,69,.5]],
      [[0,71,.5],[.75,74,.5],[1.5,79,.5],[2.5,74,1]],
      [[0,76,.5],[1,72,1],[2.5,67,.75]],
      [[0,79,.5],[.75,76,.5],[1.5,72,.5],[2.5,76,.75],[3.5,79,.5]],
      [[0,81,.75],[1,77,.5],[2,72,.75],[3,69,.5]],
      [[0,76,.5],[.75,72,.5],[1.5,69,.75],[3,72,.5]],
      [[0,74,.5],[1,79,.5],[2,83,.75],[3,79,.5]],
      [[0,77,.5],[.75,76,.5],[1.5,72,.5],[2.5,69,1]],
      [[0,71,.5],[1,74,.5],[2,79,1]],
      [[0,76,.75],[1,74,.5],[2,72,1.5]],
      [[0,67,.75],[1,71,.5],[2,74,.75],[3,71,.5]],
    ],
  },
};

const pitch = midi => 440 * 2 ** ((midi - 69) / 12);

function musicNote(group, instrument, midi, at, duration, volume) {
  const frequency = pitch(midi);
  if (instrument === 'bell' || instrument === 'kalimba') {
    bell(group, frequency, at, duration, volume);
  } else if (instrument === 'flute') {
    tone(group, { at, duration, frequency, volume, attack: 0.065, release: 0.13, vibrato: frequency * 0.002, vibratoRate: 4.4 });
    tone(group, { at, duration, frequency: frequency * 2, volume: volume * 0.12, attack: 0.07, release: 0.13 });
  } else if (instrument === 'strings') {
    tone(group, { at, duration, frequency, type: 'triangle', volume, attack: 0.17, release: 0.38, vibrato: frequency * 0.0015, vibratoRate: 3.8 });
    tone(group, { at, duration, frequency: frequency * 2, volume: volume * 0.18, attack: 0.2, release: 0.38 });
  } else if (instrument === 'pluck') {
    tone(group, { at, duration, frequency, type: 'triangle', volume, attack: 0.009, release: duration * 0.44 });
    tone(group, { at, duration: duration * 0.65, frequency: frequency * 2, volume: volume * 0.16, attack: 0.007, release: duration * 0.3 });
  } else {
    tone(group, { at, duration, frequency, volume, attack: instrument === 'pad' ? 0.28 : 0.025, release: instrument === 'pad' ? 0.48 : 0.15 });
  }
}

function cleanAmbientGroup(session, group) {
  if (!session.groups.has(group)) return;
  session.groups.delete(group);
  clearTimeout(group.timer);
  for (const node of group.nodes) {
    try { node.disconnect(); } catch { /* Already disconnected. */ }
  }
}

function scheduleAmbientBar(session, absoluteBar) {
  const piece = session.piece;
  const bar = absoluteBar % piece.chords.length;
  const beat = session.beat;
  const group = {
    start: session.start + absoluteBar * beat * 4,
    output: session.output,
    nodes: [],
    sources: [],
    timer: null,
  };
  const chord = piece.chords[bar];
  session.groups.add(group);
  if (session.id === 'adventure') {
    [0, 1, 2, 3].forEach((at, index) => {
      musicNote(group, 'kalimba', chord[index % 3] + 12, at * beat, beat * 1.3, 0.011);
    });
  } else if (session.id === 'action') {
    chord.forEach(midi => musicNote(group, 'strings', midi, 0, beat * 3.95, 0.012));
    [0, 2].forEach(at => musicNote(group, 'pulse', chord[0] - 12, at * beat, beat * 0.5, 0.021));
  } else if (session.id === 'relax') {
    chord.forEach(midi => musicNote(group, 'pad', midi, 0, beat * 3.98, 0.013));
  } else {
    [0, .75, 1.5, 2.5, 3.25].forEach((at, index) => {
      musicNote(group, 'pluck', chord[index % 3] + 12, at * beat, beat * 0.7, 0.012);
    });
  }
  const instrument = { adventure: 'flute', action: 'strings', relax: 'bell', friends: 'pluck' }[session.id];
  const volume = { adventure: 0.022, action: 0.018, relax: 0.014, friends: 0.022 }[session.id];
  for (const [at, midi, length] of piece.melody[bar]) {
    musicNote(group, instrument, midi, at * beat, length * beat, volume);
  }
  group.timer = setTimeout(() => cleanAmbientGroup(session, group), Math.max(0, (group.start + beat * 6 - context.currentTime) * 1000));
}

function scheduleAmbient(session) {
  if (ambient !== session || context.state !== 'running') return;
  const now = context.currentTime;
  const barLength = session.beat * 4;
  // Main-thread delays should skip missed bars, never produce a burst of notes.
  if (session.start + session.nextBar * barLength < now - 0.06) {
    session.nextBar = Math.ceil((now - session.start) / barLength);
  }
  while (session.start + session.nextBar * barLength <= now + 0.3) {
    scheduleAmbientBar(session, session.nextBar++);
  }
}

function cleanAmbientSession(session) {
  clearInterval(session.interval);
  clearTimeout(session.retireTimer);
  for (const group of [...session.groups]) {
    for (const source of group.sources) {
      try { source.stop(context.currentTime + 0.005); } catch { /* Already ended. */ }
    }
    cleanAmbientGroup(session, group);
  }
  try { session.output.disconnect(); } catch { /* Already disconnected. */ }
  retiringAmbient.delete(session);
}

/** Fade the music out; sound effects keep their independent state. */
export function stopAmbient() {
  if (!ambient) return;
  const session = ambient;
  ambient = null;
  clearInterval(session.interval);
  const now = context.currentTime;
  session.output.gain.cancelScheduledValues(now);
  session.output.gain.setTargetAtTime(0, now, 0.085);
  for (const group of session.groups) {
    clearTimeout(group.timer);
    for (const source of group.sources) {
      try { source.stop(now + 0.36); } catch { /* Already ended. */ }
    }
  }
  retiringAmbient.add(session);
  session.retireTimer = setTimeout(() => cleanAmbientSession(session), 400);
  // Rapidly switching categories still has a bounded number of fading sessions.
  while (retiringAmbient.size > 2) cleanAmbientSession(retiringAmbient.values().next().value);
}

/**
 * Call after await unlockAudio() inside a user gesture. This never creates or
 * resumes AudioContext by itself, so a saved preference cannot cause autoplay.
 */
export function startAmbient(bookId) {
  if (bookId === 'family') bookId = 'relax';
  if (!Object.prototype.hasOwnProperty.call(compositions, bookId) || !musicEnabled || !context || context.state !== 'running') return false;
  if (typeof document !== 'undefined' && document.hidden) return false;
  if (ambient?.id === bookId) return true;
  stopAmbient();
  const output = context.createGain();
  output.gain.setValueAtTime(0, context.currentTime);
  // The combined instruments stay below approximately 0.025 peak amplitude.
  output.gain.setTargetAtTime(0.18, context.currentTime, 0.45);
  output.connect(limiter);
  const piece = compositions[bookId];
  const session = {
    id: bookId, piece, output, beat: 60 / piece.tempo,
    start: context.currentTime + 0.04, nextBar: 0,
    groups: new Set(), interval: null, retireTimer: null,
  };
  ambient = session;
  scheduleAmbient(session);
  session.interval = setInterval(() => scheduleAmbient(session), 60);
  return true;
}

export function getMusicEnabled() {
  return musicEnabled;
}

export function setMusicEnabled(enabled) {
  musicEnabled = Boolean(enabled);
  try {
    globalThis.localStorage?.setItem('cc-music-enabled', String(musicEnabled));
  } catch {
    // The local control continues to work when storage is unavailable.
  }
  if (!musicEnabled) stopAmbient();
  return musicEnabled;
}

// Avoid lingering audio after the app is put in the background on a phone.
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stopSounds(); stopAmbient(); }
  });
}
