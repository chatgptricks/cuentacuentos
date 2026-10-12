import { getScene, getSceneViewIndex } from './world-catalog.js';

const storyPlans = new WeakMap();
const normalize = value => String(value || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

function hash(value) {
  let result = 2166136261;
  for (const character of value) result = Math.imul(result ^ character.charCodeAt(0), 16777619);
  return result >>> 0;
}

function analyzePage(page = {}, previousScene) {
  const characters = [...new Set(Array.isArray(page.characters) ? page.characters : [])].slice(0, 3);
  const objects = [...new Set(Array.isArray(page.objects) ? page.objects : [])].slice(0, 3);
  const text = normalize((Array.isArray(page.paragraphs) ? page.paragraphs : []).join(' '));
  const scene = getScene(page.scene);
  const refersToPlace = scene && [scene.label, scene.name].some(value => text.includes(normalize(value).replace(/^(el|la) /, '')));
  const journey = /\b(caminaron|camino hasta|viajaron|cruzaron|llegaron|se adentraron|se internaron|recorrieron|subieron|bajaron|sendero|zarzas|acantilado|puente colgante)\b/.test(text);
  const atmosphere = /\b(lluvia|llovia|nevaba|niebla|luciernagas|estrellas|olas|amanecia|anochecia|atardecer|viento|arboles|pinos|paisaje|nubes|bosque nevado)\b/.test(text);
  const establishing = refersToPlace && /\b(tenia|tenian|olia|se extendia|se veian|se veia|habia una fuente|vivian|vivia|quedaba|se encontraba|estaba junto|estaba sobre|estaba rodead|era un lugar)\b/.test(text);
  // A shopping list is the action to illustrate, even when the story retains its market scene.
  const focusedShopping = scene?.id === 'market' && objects.length > 0 && /\b(buscar|comprar|compraron|consiguieron|elegir|eligieron)\b/.test(text);
  const changeOfPlace = previousScene != null && page.scene !== previousScene;
  const score = Number(establishing) * 12 + Number(journey) * 8 + Number(atmosphere) * 7
    + Number(refersToPlace) * 4 + Number(changeOfPlace) * 5 - objects.length * 2
    + Number(!characters.length && !objects.length) * 8;
  return {
    page, characters, objects, scene, text, score, focusedShopping,
    semanticSetting: Boolean(scene) && !focusedShopping && (journey || atmosphere || establishing || (!characters.length && !objects.length)),
  };
}

function composition(analysis, showScene) {
  const { characters, objects } = analysis;
  const kind = showScene ? 'setting' : objects.length ? (characters.length ? 'shared' : 'detail') : characters.length ? 'portrait' : 'detail';
  return { kind, showScene, characters: [...characters], objects: [...objects] };
}

function planStory(pages) {
  const analyses = pages.map((page, index) => analyzePage(page, pages[index - 1]?.scene));
  const candidates = analyses.map((analysis, index) => ({ ...analysis, index, view: getSceneViewIndex(pages, index) })).filter(analysis => analysis.scene && !analysis.focusedShopping);
  const candidatesByIndex = new Map(candidates.map(candidate => [candidate.index, candidate]));
  const selected = new Set();
  if (!candidates.length) return analyses.map(analysis => composition(analysis, false));

  // Show the opening place and introduce every place that has a suitable illustration beat.
  selected.add(candidates[0].index);
  const places = new Map();
  for (const candidate of candidates) {
    const current = places.get(candidate.scene.id);
    if (!current || candidate.score > current.score) places.set(candidate.scene.id, candidate);
  }
  for (const candidate of places.values()) selected.add(candidate.index);

  const fingerprint = analyses.map(analysis => `${analysis.page.scene}:${analysis.text.slice(0, 64)}`).join('|');
  const seed = hash(fingerprint);
  const minimum = Math.ceil(pages.length * 0.4);
  const maximum = Math.floor(pages.length * 0.6);
  const desired = Math.max(minimum, Math.min(maximum, Math.round(pages.length * (0.45 + seed % 3 * 0.05))));
  // A story with many distinct places or few eligible scenes keeps those semantic anchors.
  const target = Math.min(candidates.length, Math.max(desired, selected.size));
  while (selected.size < target) {
    let best, bestScore = -Infinity;
    for (const candidate of candidates) {
      if (selected.has(candidate.index)) continue;
      const distance = Math.min(...[...selected].map(index => Math.abs(index - candidate.index)));
      const adjacent = selected.has(candidate.index - 1) || selected.has(candidate.index + 1);
      const nearestSamePlace = [...selected].map(index => candidatesByIndex.get(index))
        .filter(previous => previous.scene.id === candidate.scene.id)
        .sort((left, right) => Math.abs(left.index - candidate.index) - Math.abs(right.index - candidate.index))[0];
      const repeatsView = nearestSamePlace?.view === candidate.view;
      // Spread context across the story, with semantic priorities and a stable irregular rhythm.
      const variation = hash(`${seed}:${candidate.index}`) % 100 / 25;
      const score = candidate.score + distance * 5 - Number(adjacent) * 8 - Number(repeatsView) * 10 + variation;
      if (score > bestScore) { best = candidate; bestScore = score; }
    }
    if (!best) break;
    selected.add(best.index);
  }
  return analyses.map((analysis, index) => {
    if (selected.has(index) || analysis.characters.length || analysis.objects.length) return composition(analysis, selected.has(index));
    // A page without a scene still needs a picture: borrow the nearest cast already on stage.
    const nearest = analyses.map((other, at) => ({ other, distance: Math.abs(at - index) + Number(at > index) * 0.5 }))
      .filter(({ other }) => other.characters.length).sort((left, right) => left.distance - right.distance)[0];
    return composition(nearest ? { ...analysis, characters: [...nearest.other.characters] } : analysis, !nearest && Boolean(analysis.scene));
  });
}

/** Derived presentation only; original pages, saved scenes and atlas-view continuity stay intact. */
export function composePage(page = {}, { pages, index, previousScene } = {}) {
  if (Array.isArray(pages) && Number.isInteger(index) && index >= 0 && index < pages.length) {
    if (!storyPlans.has(pages)) storyPlans.set(pages, planStory(pages));
    const planned = storyPlans.get(pages)[index];
    return { ...planned, characters: [...planned.characters], objects: [...planned.objects] };
  }
  const analysis = analyzePage(page, previousScene);
  return composition(analysis, analysis.semanticSetting);
}
