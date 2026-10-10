import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import path from 'node:path';
import { CHARACTER_ATLASES } from '../src/character-catalog.js';
import { WORLD_ATLASES } from '../src/world-catalog.js';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const atlases = [
  ...Object.values(CHARACTER_ATLASES).map(atlas => [atlas.file, atlas.columns, atlas.rows]),
  ...Object.values(WORLD_ATLASES).map(atlas => [atlas.file, atlas.columns, atlas.rows]),
];
const newAtlasFiles = new Set([
  ...Object.entries(CHARACTER_ATLASES).filter(([id]) => !['main', 'extra'].includes(id)),
  ...Object.entries(WORLD_ATLASES).filter(([id]) => !['main-places', 'extra-places', 'main-objects'].includes(id)),
].map(([, atlas]) => atlas.file));
const paeth = (left, up, corner) => {
  const estimate = left + up - corner;
  const distances = [Math.abs(estimate - left), Math.abs(estimate - up), Math.abs(estimate - corner)];
  return distances[0] <= distances[1] && distances[0] <= distances[2] ? left : distances[1] <= distances[2] ? up : corner;
};
function validateTransparency(png, filename, width, height, columns, rows) {
  const compressed = [];
  for (let offset = 8; offset + 12 <= png.length;) {
    const length = png.readUInt32BE(offset);
    if (offset + length + 12 > png.length) throw new Error(`${filename}: incomplete PNG chunk`);
    if (png.toString('ascii', offset + 4, offset + 8) === 'IDAT') compressed.push(png.subarray(offset + 8, offset + 8 + length));
    offset += length + 12;
  }
  const raw = inflateSync(Buffer.concat(compressed));
  const stride = width * 4;
  if (raw.length !== height * (stride + 1)) throw new Error(`${filename}: incorrect PNG pixel data`);
  const pixels = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    if (filter > 4) throw new Error(`${filename}: invalid PNG filter`);
    for (let x = 0; x < stride; x += 1) {
      const index = y * stride + x;
      const left = x >= 4 ? pixels[index - 4] : 0;
      const up = y > 0 ? pixels[index - stride] : 0;
      const corner = y > 0 && x >= 4 ? pixels[index - stride - 4] : 0;
      const predictor = filter === 1 ? left : filter === 2 ? up : filter === 3 ? Math.floor((left + up) / 2) : filter === 4 ? paeth(left, up, corner) : 0;
      pixels[index] = (raw[y * (stride + 1) + x + 1] + predictor) & 255;
    }
  }
  const transparent = Array(columns * rows).fill(0);
  const visible = Array(columns * rows).fill(0);
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    const cell = Math.floor(y / (height / rows)) * columns + Math.floor(x / (width / columns));
    const alpha = pixels[(y * width + x) * 4 + 3];
    if (alpha === 0) transparent[cell] += 1;
    if (alpha >= 128) visible[cell] += 1;
  }
  for (let cell = 0; cell < visible.length; cell += 1) {
    if (!visible[cell]) throw new Error(`${filename}: empty illustration in cell ${cell + 1}`);
    if (!transparent[cell]) throw new Error(`${filename}: cell ${cell + 1} needs a transparent background`);
  }
  // Broad, visible strokes on a crop boundary cut a figure or leak into its neighbor.
  // Ignore isolated watercolor specks and preserve the older atlas geometry.
  if (newAtlasFiles.has(filename)) {
    const longestRun = values => {
      let run = 0, longest = 0;
      for (const alpha of values) {
        run = alpha >= 128 ? run + 1 : 0;
        longest = Math.max(longest, run);
      }
      return longest;
    };
    const alphaAt = (x, y) => pixels[(y * width + x) * 4 + 3];
    for (let row = 0; row < rows; row += 1) for (let column = 0; column < columns; column += 1) {
      const left = Math.floor(column * width / columns), right = Math.ceil((column + 1) * width / columns) - 1;
      const top = Math.floor(row * height / rows), bottom = Math.ceil((row + 1) * height / rows) - 1;
      const xs = Array.from({ length: right - left + 1 }, (_, index) => index + left);
      const ys = Array.from({ length: bottom - top + 1 }, (_, index) => index + top);
      for (const [edge, values] of [
        ['top', xs.map(x => alphaAt(x, top))], ['bottom', xs.map(x => alphaAt(x, bottom))],
        ['left', ys.map(y => alphaAt(left, y))], ['right', ys.map(y => alphaAt(right, y))],
      ]) {
        const contact = longestRun(values);
        if (contact >= 8) throw new Error(`${filename}: cell ${row * columns + column + 1} touches its ${edge} crop boundary (${contact} visible pixels in a row)`);
      }
    }
  }
}
for (const [filename, columns, rows] of atlases) {
  const png = await readFile(path.join(root, 'public/art', filename));
  if (png.length < 33 || png.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error(`${filename}: invalid PNG`);
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  if (!width || !height || width * rows !== height * columns || png[24] !== 8 || png[25] !== 6 || png[28] !== 0) throw new Error(`${filename}: atlas needs square, non-interlaced 8-bit RGBA cells`);
  validateTransparency(png, filename, width, height, columns, rows);
}
for (const filename of ['character-catalog.js', 'world-catalog.js', 'story-engine.js', 'story-blocks.js', 'story-language.js', 'story-selection.js', 'action-plots.js', 'family-characters.js', 'family-story.js', 'app.js', 'audio.js', 'style.css']) await readFile(path.join(root, 'src', filename));
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });
await cp(path.join(root, 'src'), path.join(dist, 'src'), { recursive: true });
await cp(path.join(root, 'index.html'), path.join(dist, 'index.html'));
await writeFile(path.join(dist, '.nojekyll'), '');
async function filesAt(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? filesAt(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = (await filesAt(dist)).sort();
const hash = createHash('sha256');
for (const file of files) hash.update(await readFile(file));
const version = hash.digest('hex').slice(0, 12);
const assets = files.filter(f => !f.endsWith('.nojekyll')).map(f => './' + path.relative(dist, f).replaceAll('\\', '/'));
await writeFile(path.join(dist, 'sw.js'), `
const CACHE = 'cuentacuentos-${version}';
const ASSETS = ${JSON.stringify(['./', ...assets])};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('cuentacuentos-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (!event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(event.request, {ignoreSearch: true});
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok) await cache.put(event.request, response.clone());
      return response;
    } catch (error) {
      if (event.request.mode === 'navigate') return cache.match(new URL('./index.html', self.registration.scope));
      throw error;
    }
  }));
});
`);
console.log(`Validated ${atlases.length} RGBA atlases with visible illustrations and transparent backgrounds; new cells have no broad strokes across crop boundaries.`);
console.log(`Built ${files.length + 1} files; offline cache ${version}`);
