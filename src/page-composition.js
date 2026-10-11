import { getScene } from './world-catalog.js';

/** Derive illustration staging without changing saved stories or their scene continuity. */
export function composePage(page = {}) {
  const characters = [...new Set(Array.isArray(page.characters) ? page.characters : [])].slice(0, 3);
  const objects = [...new Set(Array.isArray(page.objects) ? page.objects : [])].slice(0, 3);
  const text = (page.paragraphs || []).join(' ').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  // A setting earns its space when it establishes a place, a journey or an obstacle.
  const journey = /\b(caminaron|camino hasta|viajaron|cruzaron|llegaron|se adentraron|se internaron|recorrieron|subieron|bajaron|sendero|zarzas|acantilado|puente colgante)\b/.test(text);
  const atmosphere = /\b(lluvia|llovia|nevaba|niebla|luci[eé]rnagas|estrellas|olas|amanecia|anochecia|atardecer|viento|arboles|pinos|paisaje|nubes|bosque nevado)\b/.test(text);
  const scene = getScene(page.scene);
  const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const refersToPlace = scene && [scene.label, scene.name].some(value => text.includes(normalize(value).replace(/^(el|la) /, '')));
  const establishing = refersToPlace && /\b(tenia|tenian|olia|se extendia|se veian|se veia|habia una fuente|vivian|vivia|quedaba|se encontraba|estaba junto|estaba sobre|estaba rodead|era un lugar)\b/.test(text);
  const showScene = Boolean(page.scene) && (journey || atmosphere || establishing || (!characters.length && !objects.length));
  // Objects belong to the action between the characters, rather than a separate corner.
  const kind = showScene ? 'setting' : objects.length ? (characters.length ? 'shared' : 'detail') : characters.length ? 'portrait' : 'detail';
  return { kind, showScene, characters, objects };
}
