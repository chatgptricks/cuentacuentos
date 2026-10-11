import { SCENES, getScene } from './world-catalog.js';
export { SCENES, ITEMS, OBJECTS, WORLD_ATLASES, SCENE_VIEW_LABELS, getScene, getSceneView, getSceneViewIndex, getItem } from './world-catalog.js';
import { CHARACTERS, CHARACTER_NAMES, getCharacter } from './character-catalog.js';
export { CHARACTERS, CHARACTER_ATLASES, CHARACTER_NAMES, getCharacter } from './character-catalog.js';
import { VILLAINS, VILLAIN_NAMES, getVillain } from './villain-catalog.js';
export { VILLAINS, VILLAIN_ATLASES, VILLAIN_NAMES, PENDING_ART, getVillain } from './villain-catalog.js';
import { prepareFamilyStory, familyStoryMoment } from './family-story.js';
import { applyStoryLanguage } from './story-language.js';
import { RELAX_GOALS, RELAX_OBSTACLES, FRIEND_GOALS, FAMILY_GOALS, SOCIAL_OBSTACLES } from './story-blocks.js';
import {
  ABILITY_REASONS, PLACE_INFO, TOOLS, TRIALS, abilityFor, cap, fitsCast, friendWord, inPlace, kind, low, named, namedItems,
  goesTo, ofPhrase, spotOf, toPhrase, toPlace, travelTo,
} from './narrative-world.js';
import { ADVENTURE_MENTORS, ELIXIRS, FAMILY_HOMES, FRIEND_HOMES, RELAX_HOMES, RELAX_MENTORS, TARGETS, VILLAIN_PLOTS } from './quest-catalog.js';

/**
 * Offline picture books built from fixed narrative structures. Each book declares roles
 * (hero, friend, mentor, villain), places (home, destination) and elements (trial, tool,
 * elixir, target). The generator fills every role with a catalogue value whose abilities,
 * habitat and terrain agree, so names and places change while cause and effect stay intact.
 */
export const BOOKS = Object.freeze([
  { id: 'adventure', title: 'Aventura', subtitle: 'Un pequeño viaje, un gran descubrimiento', color: '#D9B98F', symbol: '✦' },
  { id: 'action', title: 'Acción', subtitle: 'Valor, cuidado y una nueva oportunidad', color: '#DA9E96', symbol: '♜' },
  { id: 'relax', title: 'Relax', subtitle: 'Fábulas para respirar despacito', color: '#A8BDB1', symbol: '☾' },
  { id: 'friends', title: 'Amigos', subtitle: 'La alegría de hacer cosas juntos', color: '#B7AFCF', symbol: '❀' },
  { id: 'family', title: 'Mi familia', subtitle: 'Tú protagonizas los cuentos de casa', color: '#D7AD8D', symbol: '♡' },
]);

const ALL_CAST = CHARACTERS.map(character => character.id);
// Olmo the owl is the guardian of every Acción story, so he never forms the pair there.
const ACTION_CAST = ALL_CAST.filter(id => id !== 'owl');
const ADVENTURE_HOMES = [...new Set(ELIXIRS.flatMap(elixir => elixir.homes))];
const ACTION_HOMES = [...new Set(TARGETS.flatMap(target => target.homes))];

export const STORY_BLOCK_COUNTS = Object.freeze({
  adventure: Object.freeze({ opening: ADVENTURE_HOMES.length, goal: ELIXIRS.length, obstacle: Object.keys(TRIALS).length, strategy: Object.keys(TOOLS).length, discovery: Object.keys(TRIALS).length, ending: ADVENTURE_MENTORS.length }),
  action: Object.freeze({ opening: ACTION_HOMES.length, goal: TARGETS.length, obstacle: Object.keys(TRIALS).length, strategy: Object.keys(TOOLS).length, discovery: VILLAINS.length, ending: ACTION_HOMES.length }),
  relax: Object.freeze({ opening: RELAX_HOMES.length, goal: RELAX_GOALS.length, obstacle: RELAX_OBSTACLES.length, strategy: RELAX_MENTORS.length, discovery: RELAX_GOALS.length, ending: RELAX_HOMES.length }),
  friends: Object.freeze({ opening: FRIEND_HOMES.length, goal: FRIEND_GOALS.length, obstacle: SOCIAL_OBSTACLES.length, strategy: SOCIAL_OBSTACLES.length, discovery: FRIEND_GOALS.length, ending: FRIEND_HOMES.length }),
  family: Object.freeze({ opening: FAMILY_HOMES.length, goal: FAMILY_GOALS.length, obstacle: SOCIAL_OBSTACLES.length, strategy: SOCIAL_OBSTACLES.length, discovery: FAMILY_GOALS.length, ending: FAMILY_HOMES.length }),
});

function randomFromSeed(seed) {
  let value = 2166136261;
  for (const letter of String(seed)) {
    value ^= letter.codePointAt(0);
    value = Math.imul(value, 16777619);
  }
  return () => {
    value += 0x6D2B79F5;
    let number = Math.imul(value ^ (value >>> 15), value | 1);
    number ^= number + Math.imul(number ^ (number >>> 7), number | 61);
    return ((number ^ (number >>> 14)) >>> 0) / 4294967296;
  };
}

function freshSeed() {
  if (globalThis.crypto?.getRandomValues) {
    return Array.from(globalThis.crypto.getRandomValues(new Uint32Array(2)), value => value.toString(36)).join('-');
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function choose(random, values) {
  if (!values.length) throw new Error('No compatible story element.');
  return values[Math.floor(random() * values.length)];
}
const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
const unique = values => [...new Set(values)];
// «Olmo» names the guardian of Acción, so no other owl borrows his name.
const copyCharacter = (random, id) => ({ ...getCharacter(id), name: choose(random, CHARACTER_NAMES[id].filter(name => name !== 'Olmo')), atlas: { ...getCharacter(id).atlas } });

function makeCast(random, pool) {
  const heroId = choose(random, pool);
  // Pair sentences use masculine plural agreement («los dos», «contentos»), so one noun is masculine.
  const companionId = choose(random, pool.filter(id => id !== heroId &&
    !(getCharacter(heroId).gender === 'f' && getCharacter(id).gender === 'f')));
  return { hero: copyCharacter(random, heroId), companion: copyCharacter(random, companionId) };
}

/**
 * A beat lists nine sentences in reading order. Tier 1 is the three-minute story, tier 2
 * adds three sentences for six minutes and tier 3 three more for nine. Shorter books only
 * drop sentences, so whatever remains still reads in cause-and-effect order.
 */
const at = scene => (tier, text, characters = [], objects = []) =>
  ({ tier, page: { paragraphs: [text], scene, characters: unique(characters).slice(0, 3), objects: namedItems(text, unique(objects)) } });

function unfold(beats, duration) {
  const level = duration / 3;
  return beats.flatMap((beat, index) => {
    for (const tier of [1, 2, 3]) {
      if (beat.filter(entry => entry.tier === tier).length !== 3) throw new Error(`Beat ${index + 1} needs three sentences in tier ${tier}.`);
    }
    return beat.filter(entry => entry.tier <= level).map(entry => entry.page);
  });
}

// Everyday activities record only the materials the full reading actually names and draws.
const drawnIn = (beats, items) => items.filter(id => beats.flat().some(entry => entry.page.objects.includes(id)));

function planFor(blockIds, destination, items, extra = {}) {
  return { version: 2, blockIds, world: { destination, items: unique(items) }, ...extra };
}

/** Aventura: ordinary home, a problem, a mentor's gift, two trials, the elixir and the return. */
function adventure({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const placesFor = (elixir, home) => elixir.places.filter(id => id !== home && fitsCast(cast, id));
  const homesFor = elixir => elixir.homes.filter(id => fitsCast(cast, id) && placesFor(elixir, id).length);
  const elixir = choose(random, ELIXIRS.filter(candidate => homesFor(candidate).length));
  const home = getScene(choose(random, homesFor(elixir)));
  const place = getScene(choose(random, placesFor(elixir, home.id)));
  const mentor = copyCharacter(random, choose(random, ADVENTURE_MENTORS.filter(id => id !== h.id && id !== f.id)));
  // The second trial is chosen first, so the friend's own ability can solve it when possible.
  const trials = PLACE_INFO[place.id].trials;
  const forFriend = trials.filter(id => abilityFor(f, id));
  const forHero = trials.filter(id => abilityFor(h, id));
  const helper = forFriend.length ? f : forHero.length ? h : null;
  const secondId = choose(random, forFriend.length ? forFriend : forHero.length ? forHero : trials);
  const firstId = choose(random, trials.filter(id => id !== secondId));
  const first = TRIALS[firstId], second = TRIALS[secondId];
  const toolId = choose(random, Object.keys(first.tools));
  const tool = TOOLS[toolId];
  const ability = helper ? abilityFor(helper, secondId) : undefined;
  const item = elixir.item;
  const both = [h.id, f.id];
  const atHome = at(home.id), there = at(place.id);
  const pair = `${h.name} y ${f.name}`;
  const solved = helper
    ? second.abilities[ability](helper.name)
    : `${pair} pensaron juntos y encontraron otro camino, más largo pero seguro.`;
  const thanks = helper === f ? `${h.name} abrazó a ${f.name} para darle las gracias.`
    : helper === h ? `${f.name} aplaudió la buena idea de ${h.name}.` : 'Se abrazaron, contentos de haberlo conseguido juntos.';
  const gratitude = helper === f ? `${h.name} le dio las gracias a ${f.name}, porque sin su ayuda no lo habría logrado.`
    : helper === h ? `${f.name} le dijo a ${h.name} que su idea los había salvado.` : `${pair} se dieron las gracias por no rendirse.`;
  const use = typeof elixir.use === 'function' ? elixir.use(home) : elixir.use;
  const beats = [
    [
      atHome(1, `${named(h)} vivía ${inPlace(home)}.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, `Cada mañana, ${h.name} saludaba a sus vecinos y les preguntaba cómo estaban.`, [h.id]),
      atHome(1, elixir.problem(home)),
      atHome(2, elixir.stakes),
      atHome(3, 'Los vecinos se reunieron preocupados, pero nadie sabía qué hacer.'),
      atHome(2, `Su ${friendWord(f)} ${named(f)} también quería ayudar.`, [f.id]),
      atHome(3, `${h.name} pensó y pensó, pero no sabía por dónde empezar.`, [h.id]),
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} fueron a pedir consejo a ${mentor.name}, ${kind(mentor)} que vivía cerca.`, [h.id, f.id, mentor.id]),
    ],
    [
      atHome(1, `${mentor.name} escuchó con atención y les explicó que ${elixir.hint}.`, [mentor.id, ...both], [item]),
      there(1, `${cap(elixir.name)} se escondía ${spotOf(place)}.`, [], [item]),
      atHome(2, `Pero ${mentor.name} les advirtió algo importante: ${elixir.condition}.`, [mentor.id], [item]),
      atHome(2, 'El viaje sería largo y seguramente tendría alguna sorpresa.', both),
      atHome(1, `${mentor.name} les regaló ${tool.indefinite} para ${first.purpose}.`, [mentor.id, ...both], [tool.item]),
      atHome(3, `${h.name} guardó ${tool.definite} con mucho cuidado.`, [h.id], [tool.item]),
      atHome(3, `${f.name} preparó una mochila con agua y una merienda para el viaje.`, [f.id], ['backpack']),
      atHome(3, `${mentor.name} les dio un abrazo antes de que se fueran.`, [mentor.id, ...both]),
      atHome(2, 'Se despidieron de los vecinos y salieron muy temprano.', both),
    ],
    [
      there(1, travelTo(place, cast, pair), both),
      there(2, place.detail),
      there(3, `${f.name} miró a su alrededor con los ojos muy abiertos.`, [f.id]),
      there(1, first.intro),
      there(2, `Daba un poco de miedo, pero entonces recordaron el regalo de ${mentor.name}.`, both),
      there(3, `${h.name} sacó ${tool.definite} y respiró hondo.`, [h.id], [tool.item]),
      there(1, first.tools[toolId], both, [tool.item]),
      there(2, first.after),
      there(3, `${f.name} sonrió, porque el regalo de ${mentor.name} había funcionado.`, [f.id]),
    ],
    [
      there(1, `Más adelante, ${low(second.intro)}`),
      there(3, 'Esta vez no tenían ningún regalo que les sirviera.', both),
      there(2, helper ? `Entonces ${helper.name} tuvo una idea, porque ${ABILITY_REASONS[ability]}.` : 'Esta vez tendrían que pensar con calma.', helper ? [helper.id] : both),
      there(1, solved, helper ? [helper.id] : both),
      there(2, thanks, both),
      there(3, second.after),
      there(1, `Por fin encontraron ${elixir.name}, justo donde había dicho ${mentor.name}.`, both, [item]),
      there(3, elixir.look, [], [item]),
      there(2, `Recordaron lo que había dicho ${mentor.name}: ${elixir.condition}.`, both, [item]),
    ],
    [
      there(1, `${h.name} ${elixir.earn(f)}, y ${elixir.accept}.`, [h.id], [item]),
      there(3, `${f.name} aplaudió de alegría al verlo.`, [f.id]),
      there(2, `Guardaron ${elixir.name} con cuidado y emprendieron el regreso.`, both, [item]),
      there(2, elixir.magic, both, [item]),
      atHome(1, `Después de un largo camino, ${pair} volvieron ${toPlace(home)}.`, both, [item]),
      atHome(3, 'Los vecinos salieron a recibirlos con mucha curiosidad.'),
      atHome(2, `${mentor.name} los esperaba con una gran sonrisa.`, [mentor.id]),
      atHome(3, `${h.name} contó todo lo que había pasado en el viaje.`, [h.id, mentor.id]),
      atHome(1, use, both, [item]),
    ],
    [
      atHome(1, elixir.result, both, [item]),
      atHome(2, elixir.result2),
      atHome(3, elixir.epilogue || 'Esa tarde, los vecinos prepararon una fiesta para celebrarlo.', both),
      atHome(2, `${mentor.name} les dijo que habían sido muy valientes.`, [mentor.id, ...both]),
      atHome(3, gratitude, both),
      atHome(1, `${h.name} aprendió que ${elixir.lesson}.`, [h.id]),
      atHome(3, `Esa noche, ${h.name} se durmió pensando en su gran aventura.`, [h.id]),
      atHome(2, `Desde entonces, ${pair} fueron todavía más amigos.`, both),
      atHome(1, elixir.ending),
    ],
  ];
  const plan = planFor({ opening: home.id, goal: elixir.id, obstacle: firstId, strategy: toolId, discovery: secondId, ending: mentor.id },
    place.id, [item, tool.item], { roles: { home: home.id, destination: place.id, mentor: mentor.id, helper: helper?.id ?? null, ability: ability ?? null } });
  return { title: `${h.name} y ${elixir.name}`, place, mentor, questId: elixir.id, variantId: firstId, plan, pages: unfold(beats, duration) };
}

/** Acción: a villain spoils a celebration, Olmo advises and dies, the pair crosses a trial and redeems the villain. */
function action({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const lairsFor = (plot, home) => plot.lairs.filter(id => id !== home && fitsCast(cast, id));
  const homesFor = (plot, target) => target.homes.filter(id => fitsCast(cast, id) && lairsFor(plot, id).length);
  const targetsFor = plot => TARGETS.filter(target => plot.targets.includes(target.id) && homesFor(plot, target).length);
  const villainId = choose(random, Object.keys(VILLAIN_PLOTS).filter(id => targetsFor(VILLAIN_PLOTS[id]).length));
  const plot = VILLAIN_PLOTS[villainId];
  const target = choose(random, targetsFor(plot));
  const home = getScene(choose(random, homesFor(plot, target)));
  const lair = getScene(choose(random, lairsFor(plot, home.id)));
  const trialId = choose(random, PLACE_INFO[lair.id].trials);
  const trial = TRIALS[trialId];
  const toolId = choose(random, Object.keys(trial.tools));
  const tool = TOOLS[toolId];
  const villain = { ...getVillain(villainId), name: choose(random, VILLAIN_NAMES[villainId]), atlas: { ...getVillain(villainId).atlas } };
  const guardian = { ...getCharacter('owl'), name: 'Olmo', atlas: { ...getCharacter('owl').atlas } };
  const the = `${villain.article} ${villain.label}`;
  const a = `${villain.gender === 'f' ? 'una' : 'un'} ${villain.label}`;
  const them = villain.gender === 'f' ? 'la' : 'lo';
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(lair.id);
  const things = target.objects;
  const offer = plot.offer.replace('{toEvent}', toPhrase(target.event)).replace('{ofEvent}', ofPhrase(target.event));
  const beats = [
    [
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} preparaban ${target.event} ${inPlace(home)}.`, both),
      atHome(2, home.detail),
      atHome(3, 'Todos los vecinos colgaban adornos y preparaban comida rica.'),
      atHome(2, target.role, [], things),
      atHome(1, `De pronto, ${a} apareció y se llevó ${target.name}.`, [villain.id], things),
      atHome(3, `${cap(the)} escapó tan rápido que nadie pudo detener${them}.`, [villain.id]),
      atHome(2, 'Los vecinos se quedaron muy tristes y en silencio.'),
      atHome(3, `${h.name} sintió un poco de miedo, pero también muchas ganas de ayudar.`, [h.id]),
      atHome(1, `${pair} decidieron pedir ayuda al viejo búho Olmo.`, both),
    ],
    [
      atHome(1, 'Olmo era un búho muy anciano y sabía muchas cosas.', ['owl']),
      atHome(3, 'Vivía en el hueco de un árbol, muy cerca de allí.', ['owl']),
      atHome(2, 'Escuchó la historia con los ojos medio cerrados, porque estaba muy cansado.', ['owl', ...both]),
      atHome(1, `Olmo les contó que ${the} vivía ${inPlace(lair)}.`, ['owl', ...both]),
      atHome(2, `También les dijo que ${plot.hint}.`, ['owl']),
      atHome(3, `${pair} escucharon con mucha atención.`, both),
      atHome(1, `Olmo les dio ${tool.indefinite} para ${trial.purpose}.`, ['owl', ...both], [tool.item]),
      atHome(2, `Y les aconsejó respirar tres veces antes de hablar con ${the}.`, ['owl']),
      atHome(3, 'Al terminar, su voz sonaba cada vez más bajita.', ['owl']),
    ],
    [
      atHome(1, 'Poco después, Olmo murió en paz porque era muy anciano, y ya no volvería a despertar.'),
      atHome(2, `${h.name} sintió una tristeza muy grande.`, [h.id]),
      atHome(1, `${f.name} abrazó a ${h.name}, y lloraron en compañía, recordando al búho con cariño.`, both),
      atHome(3, `${h.name} recordó la voz suave de Olmo y todo lo que les había enseñado.`, [h.id]),
      atHome(2, 'Los vecinos vinieron a acompañarlos en silencio.'),
      atHome(3, 'Estar tristes juntos era un poco menos difícil que estar tristes a solas.', both),
      atHome(2, 'Echar de menos a Olmo también era una forma de quererlo.', both),
      atHome(3, `Guardaron ${tool.definite} de Olmo con mucho cariño.`, both, [tool.item]),
      atHome(1, 'Al día siguiente, decidieron seguir adelante, como Olmo habría querido.', both),
    ],
    [
      there(1, travelTo(lair, cast, pair), both),
      there(2, lair.detail),
      there(3, `${f.name} caminaba muy cerca de ${h.name}.`, both),
      there(1, trial.intro),
      there(2, 'Entonces recordaron el regalo de Olmo.', both),
      there(3, `${h.name} sacó ${tool.definite} con cuidado.`, [h.id], [tool.item]),
      there(1, trial.tools[toolId], both, [tool.item]),
      there(2, trial.after),
      there(3, `${f.name} pensó que Olmo habría estado orgulloso de ellos.`, [f.id]),
    ],
    [
      there(1, `Por fin encontraron ${toPhrase(the)} ${spotOf(lair)}.`, [villain.id, ...both], things),
      there(2, plot.threat, [villain.id]),
      there(3, `${f.name} quiso salir corriendo, pero se quedó al lado de ${h.name}.`, both),
      there(2, `${h.name} respiró tres veces, como le había enseñado Olmo.`, [h.id]),
      there(2, `Luego le preguntó con calma por qué se había llevado ${target.short}.`, [h.id, villain.id], things),
      there(1, `${cap(the)} confesó que ${plot.motive}.`, [villain.id]),
      there(3, `Olmo tenía razón: ${plot.hint}.`, both),
      there(3, `${h.name} pensó en cómo podían ayudar${them} de verdad.`, [h.id]),
      there(1, `${h.name} ${offer}, y ${the} ${plot.change}.`, [h.id, villain.id]),
    ],
    [
      there(1, `${cap(the)} devolvió ${target.name} y pidió perdón.`, [villain.id, ...both], things),
      atHome(2, `Volvieron juntos ${toPlace(home)}, y ${the} ${plot.carry}.`, [villain.id, ...both], things),
      atHome(1, `Por fin, ${target.event} pudo empezar ${inPlace(home)}.`, both, things),
      atHome(3, target.festive, [], things),
      atHome(2, plot.party, [villain.id]),
      atHome(3, `Los vecinos les dieron las gracias a ${h.name} y a ${f.name}.`, both),
      atHome(1, `${h.name} miró al cielo y recordó a Olmo con cariño.`, [h.id]),
      atHome(2, 'Olmo no volvería, pero su consejo los acompañaría siempre.', both),
      atHome(3, 'Y cada vez que algo era difícil, respiraban tres veces, como él les había enseñado.', both),
    ],
  ];
  const plan = planFor({ opening: home.id, goal: target.id, obstacle: trialId, strategy: toolId, discovery: villainId, ending: lair.id },
    lair.id, [...things, tool.item], { roles: { home: home.id, destination: lair.id, mentor: 'owl', villain: villainId } });
  return { title: `${h.name} y ${the}`, place: lair, guardian, villain, questId: target.id, variantId: trialId, plan, pages: unfold(beats, duration) };
}

// The feeling a fable names must match its trouble: a shadow brings fear, a still boat anger.
const RELAX_FEELINGS = {
  'shadow-courage': ['un poco de miedo', 'el miedo', 'pequeñito'], feelings: ['mucho enfado', 'el enfado', 'pequeñito'],
  comparison: ['un poco de tristeza', 'la tristeza', 'pequeñita'], 'uncertain-route': ['mucha confusión', 'la confusión', 'pequeñita'],
  rest: ['mucho cansancio', 'el cansancio', 'pequeñito'],
};

/** Relax: a wish, an impatient attempt, a breathing pause, a wise word, a calmer try and bedtime. */
function relax({ random, hero: h, companion: f, duration }) {
  const cast = [h, f];
  const base = choose(random, RELAX_GOALS.filter(goal => goal.scenes.some(id => fitsCast(cast, id))));
  const { goal: g, lexicon } = applyStoryLanguage(random, 'relax', base);
  const place = getScene(choose(random, g.scenes.filter(id => fitsCast(cast, id))));
  const home = getScene(choose(random, RELAX_HOMES.filter(id => id !== place.id && fitsCast(cast, id))));
  const o = choose(random, RELAX_OBSTACLES);
  const mentor = copyCharacter(random, choose(random, RELAX_MENTORS.filter(id => id !== h.id && id !== f.id)));
  const night = PLACE_INFO[place.id].night;
  const [feel, feeling, smaller] = RELAX_FEELINGS[g.id] || ['mucha frustración', 'la frustración', 'pequeñita'];
  const both = [h.id, f.id];
  const there = at(place.id), atHome = at(home.id);
  const things = g.objects;
  const beats = [
    [
      there(1, `${night ? 'Una noche tranquila' : 'Una tarde tranquila'}, ${h.name} ${goesTo(place, cast)} con su ${friendWord(f)} ${f.name}.`, both),
      there(2, place.detail),
      there(3, 'Todo estaba en calma, y solo se oían sonidos pequeños, como pasos de hormiga.'),
      there(1, `${h.name} quería ${g.wish}.`, [h.id], things),
      there(2, g.setup, [], things),
      there(3, `${f.name} se sentó cerca para mirar lo que hacía.`, [f.id]),
      there(2, `${named(h)} pensó que lo conseguiría enseguida.`, [h.id]),
      there(3, 'Tenía tantas ganas que no quería esperar ni un momento.', [h.id]),
      there(1, `${h.name} ${g.first}.`, [h.id], things),
    ],
    [
      there(1, g.mistake, [], things),
      there(2, o.line(h.name), [h.id]),
      there(3, `${h.name} miró a su alrededor, sin saber qué hacer.`, [h.id]),
      there(1, `${h.name} sintió ${feel} y se sentó en el suelo.`, [h.id]),
      there(3, `${f.name} se acercó despacio, sin decir nada.`, [f.id]),
      there(2, `${f.name} le preguntó qué le pasaba.`, both),
      there(3, `${h.name} le explicó que nada le estaba saliendo como quería.`, both),
      there(2, `${f.name} le dijo que eso nos pasa a todos alguna vez.`, both),
      there(1, `${f.name} le propuso hacer una pausa y respirar despacio.`, both),
    ],
    [
      there(1, 'Primero, tomaron aire por la nariz, como si olieran una flor.', both),
      there(3, 'Contaron muy despacito: uno, dos y tres.', both),
      there(1, 'Después, soltaron el aire por la boca, como si apagaran una vela.', both),
      there(2, 'Lo repitieron tres veces, muy despacio y sin ninguna prisa.', both),
      there(3, 'A su alrededor, todo seguía en calma, y el aire olía muy bien.'),
      there(2, `Los hombros de ${h.name} se aflojaron, y su barriga subió y bajó despacio.`, [h.id]),
      there(3, 'Hasta el corazón le latía más tranquilo.', [h.id]),
      there(2, `${f.name} sonrió y siguió respirando a su lado.`, [f.id]),
      there(1, `Poco a poco, ${feeling} de ${h.name} se hizo ${smaller}.`, [h.id]),
    ],
    [
      there(1, `Entonces llegó ${named(mentor)} que paseaba por allí.`, [mentor.id]),
      there(2, `${mentor.name} se sentó con ellos sin ninguna prisa.`, [mentor.id, ...both]),
      there(3, 'Había vivido muchos años y sabía muchas cosas.', [mentor.id]),
      there(2, `${h.name} le contó lo que había pasado.`, [h.id, mentor.id]),
      there(3, `${mentor.name} escuchó hasta el final, sin interrumpir.`, [mentor.id]),
      there(1, `${mentor.name} le dijo con cariño: ${low(g.lesson)}`, [mentor.id, h.id], things),
      there(3, `${h.name} se quedó pensando un ratito.`, [h.id]),
      there(2, 'Le pareció una idea muy sabia, y quiso probarla.', [h.id]),
      there(1, `${h.name} decidió intentarlo de otra manera.`, [h.id]),
    ],
    [
      there(1, `${h.name} ${g.change}.`, [h.id], things),
      there(3, 'Esta vez lo hizo despacio, respirando con calma.', [h.id]),
      there(2, `${f.name} se quedó cerca, sin hacerlo por ${h.name}.`, both),
      there(1, g.practice, [], things),
      there(3, `${h.name} sonrió por primera vez en todo el rato.`, [h.id]),
      there(2, 'No hacía falta que todo saliera perfecto, y eso le dio mucha calma.', both),
      there(1, g.outcome, both, things),
      there(2, `${h.name} llamó a aquel momento «${lexicon.title}».`, [h.id]),
      there(3, `${mentor.name} les guiñó un ojo y siguió su paseo.`, [mentor.id]),
    ],
    [
      atHome(1, `${night ? 'Cuando la luna estuvo alta' : 'Cuando empezó a oscurecer'}, ${h.name} volvió ${toPlace(home)}.`, [h.id]),
      atHome(3, `${f.name} se despidió con un abrazo y se fue a su casa.`, both),
      atHome(2, 'En casa, cenó algo calentito y se lavó los dientes.', [h.id]),
      atHome(2, 'Ya en la cama, se tapó con su manta favorita.', [h.id], ['blanket']),
      atHome(1, `Antes de dormir, recordó lo que había aprendido: ${low(g.moral)}.`, [h.id]),
      atHome(3, 'Afuera, todo estaba en silencio y las estrellas brillaban.'),
      atHome(2, 'Respiró despacio una vez más, como si oliera una flor.', [h.id]),
      atHome(3, 'Los ojos se le fueron cerrando poquito a poco.', [h.id]),
      atHome(1, `Y así, con una sonrisa, ${h.name} se durmió tranquilamente.`, [h.id]),
    ],
  ];
  const plan = planFor({ opening: home.id, goal: g.id, obstacle: o.id, strategy: mentor.id, discovery: g.id, ending: home.id },
    place.id, drawnIn(beats, things), { lexicon, roles: { home: home.id, destination: place.id, mentor: mentor.id } });
  return { title: `${h.name} y ${g.title}`, place, mentor, moral: `${g.moral}.`, questId: g.id, variantId: o.id, plan, pages: unfold(beats, duration) };
}

/** Amigos and Mi familia: a plan at home, preparation, a complication, a shared solution and the way back. */
function social({ random, hero: h, companion: c, family, duration, bookId }) {
  const isFamily = bookId === 'family';
  const baby = isFamily && c.role === 'baby';
  const cast = [h, c];
  const base = choose(random, (isFamily ? FAMILY_GOALS : FRIEND_GOALS).filter(goal => goal.scenes.some(id => fitsCast(cast, id))));
  const { goal: g, lexicon } = applyStoryLanguage(random, bookId, base);
  const place = getScene(choose(random, g.scenes.filter(id => fitsCast(cast, id))));
  const home = getScene(choose(random, (isFamily ? FAMILY_HOMES : FRIEND_HOMES).filter(id => fitsCast(cast, id))));
  const o = choose(random, SOCIAL_OBSTACLES);
  const same = place.id === home.id;
  const both = [h.id, c.id];
  const atHome = at(home.id), there = at(place.id);
  const things = g.objects;
  const plural = (many, one) => baby ? one : many;
  const solution = o.solution(g);
  const keepsake = baby ? g.keepsake
    .replace(/^Recogieron/, 'Recogió').replace(/^Doblaron/, 'Dobló').replace(/^Dibujaron/, 'Dibujó').replace(/^Guardaron/, 'Guardó').replace(/^Dejaron/, 'Dejó')
    .replace(/^Apagaron/, 'Apagó').replace(/^Cerraron/, 'Cerró')
    .replace(' y dejaron ', ' y dejó ').replace(' y guardaron ', ' y guardó ').replace(' y prepararon ', ' y preparó ').replace(' y doblaron ', ' y dobló ')
    .replace(' y enrollaron ', ' y enrolló ').replace(' y limpiaron ', ' y limpió ').replace('las habían encontrado', 'las había encontrado') : g.keepsake;
  const invite = isFamily ? `Fue a buscar a ${c.name} y le contó su plan${baby ? ' en voz bajita' : ''}.` : `Fue a buscar a su ${friendWord(c)} ${c.name} y le contó su plan.`;
  const beats = [
    [
      atHome(2, `${named(h)} vivía ${inPlace(home)}.`, [h.id]),
      atHome(1, `Una mañana, ${h.name} tuvo una idea: ${g.wish}.`, [h.id], things),
      atHome(3, home.detail),
      atHome(2, 'Era un plan perfecto para pasar un día tranquilo y bonito.', [h.id]),
      atHome(1, invite, both),
      atHome(2, baby ? `${c.name} sonrió y movió las manitas.` : `A ${c.name} le encantó la idea, y quiso empezar enseguida.`, [c.id]),
      atHome(3, plural('Juntos prepararon una bolsa con todo lo necesario.', `${h.name} preparó una bolsa con todo lo necesario.`), both),
      atHome(3, `${h.name} tenía muchísimas ganas de empezar y no paraba de sonreír.`, [h.id]),
      same ? atHome(1, plural(`Decidieron prepararlo allí mismo, ${inPlace(home)}.`, `Decidió prepararlo allí mismo, ${inPlace(home)}.`), both)
        : there(1, `Juntos fueron ${toPlace(place)}, el lugar perfecto para su plan.`, both),
    ],
    [
      there(2, same ? 'Buscaron el rincón más bonito para empezar.' : place.detail, same ? both : []),
      there(1, g.materials, [], things),
      there(3, same ? 'Todo estaba listo para empezar a trabajar juntos.' : 'Eligieron un rincón cómodo para empezar, con sitio para los dos.', both),
      there(1, `${h.name} ${g.task}.`, [h.id], things),
      there(2, baby ? `${c.name} miraba todo con mucha curiosidad.` : `Mientras tanto, ${c.name} ordenaba las cosas para que nada se cayera.`, [c.id]),
      there(3, plural('Trabajaban tan a gusto que el tiempo pasaba volando.', `${h.name} trabajaba tan a gusto que el tiempo pasaba volando.`), both),
      there(1, isFamily ? familyStoryMoment(h, c, g, 'prepare') : `${c.name} le pasaba a ${h.name} todo lo que necesitaba.`, both, things),
      there(2, 'Poco a poco, el plan empezó a tomar forma, tal como lo habían imaginado.', [], things),
      there(3, plural('De vez en cuando, paraban para reírse un poco.', `De vez en cuando, ${c.name} se reía bajito.`), both),
    ],
    [
      there(1, o.line(h.name, c.name, baby), both, things),
      there(2, `${h.name} respiró hondo para no enfadarse y pensar con calma.`, [h.id]),
      there(3, baby ? `${c.name} hizo un ruidito, como si también estuviera pensando.` : `${c.name} se quedó mirando, esperando una idea.`, [c.id]),
      there(2, plural('Pensaron que siempre hay más de una forma de hacer las cosas.', 'Pensó que siempre hay más de una forma de hacer las cosas.'), both),
      there(1, `${h.name} pensó un momento y propuso ${solution}.`, [h.id], things),
      there(3, 'Era una idea sencilla, pero podía funcionar.'),
      there(1, baby ? `${c.name} aplaudió feliz con sus manitas.` : `A ${c.name} le pareció una idea estupenda.`, both),
      there(2, plural('Decidieron probarla con mucho cuidado, paso a paso.', 'Decidió probarla con mucho cuidado, paso a paso.'), both),
      there(3, `${h.name} cruzó los dedos para tener suerte.`, [h.id]),
    ],
    [
      there(1, `${h.name} probó la idea, y esta vez funcionó.`, [h.id], things),
      there(2, `Mientras trabajaban, se fijaron en ${g.focus}.`, both, things),
      there(3, 'No todo salió perfecto, pero no importaba, porque lo estaban pasando muy bien.'),
      there(1, isFamily ? familyStoryMoment(h, c, g, 'progress') : `${c.name} añadió su propia idea: ${g.create}.`, both, things),
      there(2, baby ? `${c.name} también participó a su manera.` : 'Cada uno aportó lo que sabía hacer mejor.', both),
      there(3, `${c.name} observaba cada detalle con atención.`, [c.id]),
      there(1, g.result, both, things),
      there(2, `${h.name} se rio de alegría al ver que todo funcionaba.`, [h.id]),
      there(3, plural('Hasta les sobró tiempo para jugar un poco.', 'Hasta le sobró tiempo para jugar un poco.'), both),
    ],
    [
      there(1, `${h.name} decidió llamarlo «${lexicon.title}».`, [h.id], things),
      there(2, baby ? `${c.name} se rio, como si le gustara el nombre.` : 'A los dos les pareció un nombre perfecto.', both),
      there(3, `${h.name} lo repitió varias veces, riéndose.`, [h.id]),
      there(1, 'Se quedaron un buen rato disfrutando de lo que habían hecho.', both, things),
      there(2, `${h.name} pensó que había sido un día precioso, de esos que no se olvidan.`, [h.id]),
      there(3, 'La tarde empezaba a caer poco a poco.'),
      there(1, keepsake, both, things),
      there(2, plural('Dejaron el lugar tan limpio como lo habían encontrado.', 'Dejó el lugar tan limpio como lo había encontrado.'), both),
      there(3, `${c.name} bostezó un poquito, porque había sido un día largo.`, [c.id]),
    ],
    [
      atHome(1, same ? 'Al atardecer, se sentaron juntos a descansar.' : `Al atardecer, volvieron ${toPlace(home)} muy contentos.`, both),
      atHome(3, same ? 'Mientras descansaban, recordaron los mejores momentos del día.' : 'Por el camino, recordaron los mejores momentos del día.', both),
      atHome(1, isFamily ? familyStoryMoment(h, c, g, 'finish') : `${c.name} le dijo a ${h.name} que había sido un día maravilloso.`, both),
      atHome(2, baby ? `${c.name} cerró los ojitos, muy a gusto.` : isFamily ? `${c.name} le dio a ${h.name} un abrazo muy fuerte.` : `${c.name} se despidió con un abrazo y prometió volver pronto.`, both),
      atHome(2, `Esa noche, ${h.name} dibujó su momento favorito con muchos colores.`, [h.id]),
      atHome(3, 'Después, colgó el dibujo junto a su cama.', [h.id]),
      atHome(1, `${h.name} aprendió que ${o.lesson}.`, [h.id]),
      atHome(3, 'Afuera, las primeras estrellas empezaban a brillar.'),
      atHome(2, 'Y se durmió pensando en su próximo plan, que sería todavía más divertido.', [h.id]),
    ],
  ];
  const plan = planFor({ opening: home.id, goal: g.id, obstacle: o.id, strategy: o.id, discovery: g.id, ending: home.id },
    place.id, drawnIn(beats, things), { lexicon, roles: { home: home.id, destination: place.id } });
  if (isFamily) plan.family = { companionRole: c.role };
  return { title: `${h.name} y ${c.name}: ${g.title}`, place, questId: g.id, variantId: o.id, plan, ...(isFamily ? { family } : {}), pages: unfold(beats, duration) };
}

const GENERATORS = { adventure, action, relax, friends: social, family: social };
const CASTS = { adventure: ALL_CAST, action: ACTION_CAST, relax: ALL_CAST, friends: ALL_CAST };

/** Duration changes the unfolding, never the plan, cast or family appearance snapshot. */
export function generateStory(bookId, duration = 3, seed, options = {}) {
  if (!Object.hasOwn(GENERATORS, bookId)) throw new RangeError(`Unknown book: ${bookId}`);
  const minutes = Number(duration);
  if (![3, 6, 9].includes(minutes)) throw new RangeError('Choose a reading duration of 3, 6 or 9 minutes.');
  const storySeed = seed === undefined ? freshSeed() : String(seed);
  const random = randomFromSeed(`${bookId}:${storySeed}`);
  const familyCast = bookId === 'family' ? prepareFamilyStory(options?.family, { companionRole: options?.companionRole, random }) : undefined;
  const family = familyCast?.family;
  const cast = familyCast || makeCast(random, CASTS[bookId]);
  const story = GENERATORS[bookId]({ random, ...cast, family, duration: minutes, bookId });
  const id = `${bookId}-${minutes}-${encodeURIComponent(storySeed)}`;
  const pages = story.pages.map((page, index) => ({ id: `${id}-page-${index + 1}`, ...page }));
  const supporting = [story.mentor, story.guardian, story.villain].filter(Boolean);
  return {
    format: 'picturebook-v2', id, bookId, duration: minutes, seed: storySeed,
    title: story.title, hero: cast.hero, companion: cast.companion, place: story.place,
    characters: [...(cast.characters || [cast.hero, cast.companion]), ...supporting],
    ...(story.mentor ? { mentor: story.mentor } : {}),
    ...(story.guardian ? { guardian: story.guardian } : {}),
    ...(story.villain ? { villain: story.villain } : {}),
    ...(story.family ? { family: story.family } : {}),
    questId: story.questId, variantId: story.variantId, plan: story.plan,
    ...(story.moral ? { moral: story.moral } : {}),
    createdAt: new Date().toISOString(), pages,
    wordCount: pages.reduce((sum, page) => sum + countWords(page.paragraphs[0]), 0),
  };
}

for (const id of [...ADVENTURE_MENTORS, ...RELAX_MENTORS]) if (!getCharacter(id)) throw new Error(`Unknown mentor ${id}`);
for (const id of [...RELAX_HOMES, ...FRIEND_HOMES, ...FAMILY_HOMES]) if (!SCENES.some(scene => scene.id === id)) throw new Error(`Unknown home ${id}`);
