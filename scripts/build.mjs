import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const atlases = [
  ['characters.png', 4, 2], ['characters-extra.png', 2, 2],
  ['places.png', 2, 2], ['places-extra.png', 4, 2], ['objects.png', 4, 3],
];
for (const [filename, columns, rows] of atlases) {
  const png = await readFile(path.join(root, 'public/art', filename));
  if (png.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error(`${filename}: invalid PNG`);
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  if (width * rows !== height * columns || png[25] !== 6) throw new Error(`${filename}: atlas needs square RGBA cells`);
}
for (const filename of ['story-engine.js', 'app.js', 'audio.js', 'style.css']) await readFile(path.join(root, 'src', filename));
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
console.log(`Built ${files.length + 1} files; offline cache ${version}`);
