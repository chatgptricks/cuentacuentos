import { getScene } from './world-catalog.js';
import { getCharacter } from './character-catalog.js';
import {
  PLACE_INFO, TOOLS, TRIALS, cap, fitsCast, friendWord, inPlace, kind, named, needsWater, ofPhrase, placeName, spotOf,
  toPhrase, toPlace, travelTo,
} from './narrative-world.js';
import { ADVENTURE_MENTORS, TARGETS, VILLAIN_PLOTS } from './quest-catalog.js';
import { abilityTrial, at, choose, copyCharacter, copySupporting, copyVillain, gendered, solveTrial, trialReason } from './story-kit.js';

const villainWords = villain => ({
  the: `${villain.article} ${villain.label}`,
  a: `${villain.gender === 'f' ? 'una' : 'un'} ${villain.label}`,
  them: villain.gender === 'f' ? 'la' : 'lo',
});
const eventPhrase = (offer, target) => offer.replace('{toEvent}', toPhrase(target.event)).replace('{ofEvent}', ofPhrase(target.event));
const LAND_TRIALS = ['wind', 'fog', 'rain', 'night'];

/** B1 · El robo y la redención: a villain spoils a celebration, Olmo advises and dies, the pair redeems the villain. */
function theft({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const lairsFor = (plot, home) => plot.lairs.filter(id => id !== home && fitsCast(cast, id) && PLACE_INFO[id].trials.length);
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
  const villain = copyVillain(random, villainId);
  const guardian = { ...getCharacter('owl'), name: 'Olmo', atlas: { ...getCharacter('owl').atlas } };
  const { the, a, them } = villainWords(villain);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(lair.id);
  const things = target.objects;
  const offer = eventPhrase(plot.offer, target);
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
  return {
    title: `${h.name} y ${the}`, place: lair, guardian, villain, questId: target.id, variantId: trialId, beats, items: [...things, tool.item],
    blockIds: { opening: home.id, goal: target.id, obstacle: trialId, strategy: toolId, discovery: villainId, ending: lair.id },
    roles: { home: home.id, destination: lair.id, mentor: 'owl', villain: villainId },
  };
}

/** Harmless traps the neighbors can build with what they have at home. */
const TRAPS = [
  { id: 'net', items: ['net'], set: () => 'colgaron una red suave entre dos faroles', works: the => `Cuando ${the} llegó, la red cayó suavemente sobre su cabeza.`, escape: the => `Pero ${the} se escurrió por un agujero de la red.` },
  { id: 'maze', items: ['cardboard-box'], set: () => 'construyeron un laberinto con cajas de cartón', works: the => `${cap(the)} se perdió dando vueltas entre las cajas de cartón.`, escape: () => 'Pero apartó las cajas una a una y siguió buscando.' },
  { id: 'alarm', items: ['bucket'], set: () => 'colgaron cubos que sonaban al tocarlos, para oír cualquier paso', works: the => `Los cubos sonaron muy fuerte cuando ${the} pasó a su lado.`, escape: the => `Pero ${the} se tapó los oídos y siguió adelante.` },
  { id: 'decoy', items: ['sack'], set: target => `llenaron un saco de hojas para que pareciera ${target.short}`, works: the => `${cap(the)} agarró el saco lleno de hojas, muy satisfecho.`, escape: () => 'Pero al abrirlo, descubrió el engaño y volvió enseguida.' },
  { id: 'hideout', items: ['wheelbarrow', 'broom'], set: () => 'escondieron todo en una carretilla y borraron las huellas con una escoba', works: the => `${cap(the)} buscó por todas partes sin encontrar nada.`, escape: () => 'Pero oyó un ruidito y fue directo hacia la carretilla.' },
];
const LAND_VILLAINS = ['troll', 'ghost', 'crow', 'ogre', 'imp', 'spider', 'giant', 'winter-witch', 'thief-rat', 'scarecrow', 'envious-wizard', 'vain-snake', 'storm-cloud'];
const NEIGHBORS = ['baker', 'mail-carrier', 'teacher', 'market-seller', 'gardener'];

/** B2 · La defensa del hogar: a warning, a harmless trap, a brave conversation and a new friend. */
function defense({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const homesFor = target => target.homes.filter(id => fitsCast(cast, id));
  const targetsFor = id => TARGETS.filter(target => VILLAIN_PLOTS[id].targets.includes(target.id) && homesFor(target).length);
  const villainId = choose(random, LAND_VILLAINS.filter(id => targetsFor(id).length));
  const plot = VILLAIN_PLOTS[villainId];
  const target = choose(random, targetsFor(villainId));
  const home = getScene(choose(random, homesFor(target)));
  const trap = choose(random, TRAPS);
  const villain = copyVillain(random, villainId);
  const leader = copySupporting(random, choose(random, NEIGHBORS));
  const { the, a, them } = villainWords(villain);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id);
  const things = target.objects;
  const offer = eventPhrase(plot.offer, target);
  const works = trap.works(the).replace('satisfecho', gendered(villain, 'satisfecho', 'satisfecha'));
  const beats = [
    [
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} preparaban ${target.event} ${inPlace(home)}.`, both),
      atHome(2, home.detail),
      atHome(3, 'Los vecinos colgaban adornos y se reían mientras trabajaban.'),
      atHome(2, target.role, [], things),
      atHome(1, `Entonces ${leader.name}, ${kind(leader)}, trajo una noticia: ${a} quería llevarse ${target.name}.`, [leader.id], things),
      atHome(3, `${leader.name} ${them} había visto rondando, muy cerca de allí.`, [leader.id]),
      atHome(2, 'Todos se asustaron, y algunos querían esconderse en casa.'),
      atHome(3, `${h.name} respiró hondo, aunque también tenía un poco de miedo.`, [h.id]),
      atHome(1, `${h.name} propuso preparar un plan para proteger ${target.short}.`, [h.id], things),
    ],
    [
      atHome(1, `Entre todos, ${trap.set(target)}.`, [...both, leader.id], trap.items),
      atHome(2, `${f.name} ayudó a cargar las cosas más pesadas.`, [f.id]),
      atHome(3, `${leader.name} organizaba a los vecinos con voz firme.`, [leader.id]),
      atHome(1, `${pair} se quedaron vigilando ${target.short}.`, both, things),
      atHome(2, `Prometieron no hacerle daño a nadie, ni siquiera ${toPhrase(the)}.`, both),
      atHome(3, 'Al caer la tarde, todo estaba listo.'),
      atHome(1, 'Entonces se escondieron y esperaron en silencio.', both),
      atHome(2, 'Solo se oía el viento y el latido de sus corazones.', both),
      atHome(3, `${f.name} se tapó la boca para no reírse de los nervios.`, [f.id]),
    ],
    [
      atHome(1, `Por fin, ${the} apareció entre las sombras.`, [villain.id]),
      atHome(2, plot.threat, [villain.id]),
      atHome(3, 'Algunos vecinos se escondieron detrás de las ventanas.'),
      atHome(1, works, [villain.id], trap.items),
      atHome(2, 'Por un momento, pareció que el plan funcionaba.'),
      atHome(3, `${leader.name} levantó el pulgar desde su escondite.`, [leader.id]),
      atHome(1, trap.escape(the), [villain.id], trap.items),
      atHome(2, `${cap(the)} se acercó ${toPhrase(target.short)} cada vez más.`, [villain.id], things),
      atHome(3, 'Nadie se atrevía a moverse ni un poquito.'),
    ],
    [
      atHome(1, `Entonces ${h.name} salió de su escondite y se plantó delante.`, [h.id, villain.id]),
      atHome(2, `${f.name} salió también y se puso a su lado.`, both),
      atHome(3, 'Les temblaban un poco las rodillas, pero no se movieron.', both),
      atHome(2, `${h.name} respiró tres veces para calmarse.`, [h.id]),
      atHome(1, `${h.name} le preguntó con calma por qué quería llevarse ${target.short}.`, [h.id, villain.id], things),
      atHome(3, `${cap(the)} no esperaba una pregunta así.`, [villain.id]),
      atHome(1, `${cap(the)} confesó que ${plot.motive}.`, [villain.id]),
      atHome(2, 'Los vecinos salieron poco a poco de sus escondites para escuchar.'),
      atHome(3, 'Algunos bajaron la cabeza, un poco avergonzados.'),
    ],
    [
      atHome(1, `${h.name} ${offer}, y ${the} ${plot.change}.`, [h.id, villain.id]),
      atHome(2, 'Los vecinos estuvieron de acuerdo enseguida.'),
      atHome(3, `${leader.name} le dio la mano para hacer las paces.`, [leader.id, villain.id]),
      atHome(1, `${cap(the)} pidió perdón por el susto.`, [villain.id]),
      atHome(2, 'Después ayudó a recoger la trampa, que ya no hacía falta.', [villain.id], trap.items),
      atHome(3, `${f.name} se rio al ver que la trampa había servido para hacer un amigo.`, [f.id]),
      atHome(1, `Por fin, ${target.event} pudo empezar.`, both, things),
      atHome(2, target.festive, [], things),
      atHome(3, 'La música sonó hasta muy tarde.'),
    ],
    [
      atHome(1, plot.party, [villain.id]),
      atHome(2, `Los vecinos les dieron las gracias a ${h.name} y a ${f.name}.`, both),
      atHome(3, `${leader.name} dijo que nunca había visto tanto valor junto.`, [leader.id]),
      atHome(1, `${h.name} aprendió que hablar con calma puede más que cualquier trampa.`, [h.id]),
      atHome(2, 'Y que muchas veces, detrás de un enfado, hay alguien que necesita ayuda.', [h.id]),
      atHome(3, `${f.name} guardó un trozo de la trampa como recuerdo.`, [f.id]),
      atHome(1, `Desde entonces, ${the} visitaba ${placeName(home)} cada semana.`, [villain.id]),
      atHome(2, `Y siempre traía algo para compartir con ${pair}.`, both),
      atHome(3, 'Nadie volvió a esconderse detrás de las ventanas.'),
    ],
  ];
  return {
    title: `${h.name} y la defensa ${ofPhrase(placeName(home))}`, place: home, villain, extras: [leader], questId: target.id, variantId: trap.id, beats,
    items: [...things, ...trap.items],
    blockIds: { opening: home.id, goal: target.id, obstacle: trap.id, strategy: leader.id, discovery: villainId, ending: home.id },
    roles: { home: home.id, destination: home.id, villain: villainId, leader: leader.id },
  };
}

/** Spells a villain can cast and the one ingredient that undoes each of them. */
const SPELLS = {
  'winter-witch': { spell: home => `congeló la fuente y todas las flores ${ofPhrase(placeName(home))}`, effect: 'Todo estaba tan frío que nadie podía salir a jugar.', item: 'fallen-star', name: 'una estrella caída', why: 'porque guardaba el calor de las estrellas', where: 'shooting-star-hill', apply: 'la derramó sobre la fuente congelada', cure: 'El calor de la estrella derritió el hielo, y las flores despertaron.' },
  'envious-wizard': { spell: home => `borró todos los colores ${ofPhrase(placeName(home))}`, effect: 'Todo se había vuelto gris, hasta las mariposas.', item: 'moonstone', name: 'una piedra de luna', why: 'porque guardaba los colores de la noche', where: 'crystal-cave', apply: 'la roció sobre las casas grises', cure: 'La piedra de luna brilló, y los colores volvieron uno a uno.' },
  'storm-cloud': { spell: home => `hizo que lloviera sin parar ${inPlace(home)}`, effect: 'Los charcos crecían, y nadie podía secarse.', item: 'feather', name: 'una pluma de lluvia', why: 'porque sabía calmar a las nubes', where: 'clouds', apply: 'la lanzó con fuerza hacia las nubes', cure: 'La pluma acarició el cielo, y la lluvia se volvió suave hasta parar.' },
  imp: { spell: home => `llenó ${placeName(home)} de un hipo que no se iba`, effect: 'Todos hacían hip cada dos palabras, y nadie podía hablar bien.', item: 'honey-jar', name: 'un tarrito de miel de luna', why: 'porque calmaba cualquier hipo', where: 'moon-garden', apply: 'la repartió entre los vecinos en cucharaditas', cure: 'Cada vecino probó una cucharadita de miel, y el hipo desapareció.' },
};
const MAGIC_MENTORS = ['wizard', 'merlin', 'good-witch', 'fairy', 'tree-spirit', 'wise-grandmother'];

/** B3 · El hechizo: a spell over home, a mentor's recipe, the ingredient far away and a cure. */
function spell({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const villainId = choose(random, Object.keys(SPELLS).filter(id => fitsCast(cast, SPELLS[id].where)));
  const charm = SPELLS[villainId];
  const plot = VILLAIN_PLOTS[villainId];
  const villain = copyVillain(random, villainId);
  const mentor = copyCharacter(random, choose(random, MAGIC_MENTORS.filter(id => id !== h.id && id !== f.id)));
  const where = getScene(charm.where);
  const home = getScene(choose(random, ['village', 'garden', 'meadow', 'festival-square', 'farm', 'orchard'].filter(id => fitsCast(cast, id))));
  const trials = PLACE_INFO[where.id].trials.length ? PLACE_INFO[where.id].trials : LAND_TRIALS;
  const trial = abilityTrial(random, trials, [f, h]);
  const { the, a, them } = villainWords(villain);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(where.id);
  const { helper } = trial;
  const happy = gendered(villain, 'satisfecho', 'satisfecha');
  const angry = gendered(villain, 'furioso', 'furiosa');
  const sure = gendered(mentor, 'seguro', 'segura');
  const beats = [
    [
      atHome(1, `${named(h)} jugaba con su ${friendWord(f)} ${f.name} ${inPlace(home)}.`, both),
      atHome(2, home.detail),
      atHome(3, 'Era un día como cualquier otro.'),
      atHome(1, `De pronto, ${a} apareció y ${charm.spell(home)}.`, [villain.id]),
      atHome(2, charm.effect),
      atHome(3, `${cap(the)} se fue riendo, muy ${happy}.`, [villain.id]),
      atHome(2, 'Los vecinos no sabían cómo romper aquel hechizo.'),
      atHome(3, `${f.name} lo intentó todo, pero nada funcionó.`, [f.id]),
      atHome(1, `${pair} fueron a pedir ayuda a ${mentor.name}, ${kind(mentor)}.`, [...both, mentor.id]),
    ],
    [
      atHome(1, `${mentor.name} les explicó que necesitaban ${charm.name}, ${charm.why}.`, [mentor.id, ...both], [charm.item]),
      atHome(2, `Solo se encontraba ${inPlace(where)}.`, [mentor.id]),
      atHome(3, `${mentor.name} buscó en sus libros para estar ${sure}.`, [mentor.id], ['storybook']),
      atHome(1, 'Les dio un frasco de poción vacío para traer el ingrediente.', [mentor.id, ...both], ['potion']),
      atHome(2, 'También les recordó respirar tres veces si sentían miedo.', [mentor.id]),
      atHome(3, `${h.name} guardó el frasco de poción en la mochila.`, [h.id], ['potion', 'backpack']),
      there(1, travelTo(where, cast, pair), both),
      there(2, where.detail),
      there(3, 'Por el camino, no dejaron de pensar en sus vecinos.', both),
    ],
    [
      there(1, `Pero ${TRIALS[trial.id].intro[0].toLocaleLowerCase('es')}${TRIALS[trial.id].intro.slice(1)}`),
      there(2, `${h.name} respiró tres veces, como les había dicho ${mentor.name}.`, [h.id]),
      there(3, 'No pensaban volver con el frasco vacío.', both),
      there(2, trialReason(trial), helper ? [helper.id] : both),
      there(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      there(3, TRIALS[trial.id].after),
      there(2, 'Siguieron buscando con mucha atención por todas partes.', both),
      there(3, `${f.name} fue la primera en verlo brillar.`.replace('la primera', gendered(f, 'el primero', 'la primera')), [f.id]),
      there(1, `${cap(spotOf(where))}, encontraron ${charm.name}.`, both, [charm.item]),
    ],
    [
      there(1, `Con cuidado, metieron el ingrediente en el frasco de poción.`, both, ['potion']),
      there(2, 'El frasco empezó a brillar con una luz suave.', both),
      there(3, `${h.name} lo tapó bien para no perder ni una gota.`, [h.id]),
      there(2, 'No había ni un minuto que perder.', both),
      there(3, 'Corrieron todo lo que pudieron sin tropezar.', both),
      atHome(1, `Volvieron ${toPlace(home)} lo más rápido que pudieron.`, both),
      atHome(2, `${mentor.name} los estaba esperando en la puerta.`, [mentor.id]),
      atHome(3, 'Los vecinos se asomaron llenos de esperanza.'),
      atHome(1, `${mentor.name} removió la poción tres veces y se la dio a ${h.name}.`, [mentor.id, h.id], ['potion']),
    ],
    [
      atHome(2, `${h.name} abrió el frasco de poción y ${charm.apply}.`, [h.id], ['potion']),
      atHome(1, charm.cure, both, [charm.item]),
      atHome(2, 'Los vecinos salieron a la calle dando saltos de alegría.'),
      atHome(3, `${f.name} abrazó a ${mentor.name} muy fuerte.`, [f.id, mentor.id]),
      atHome(1, `Entonces ${the} volvió, ${angry} al ver el hechizo roto.`, [villain.id]),
      atHome(2, `${h.name} respiró tres veces y le preguntó por qué lo había hecho.`, [h.id, villain.id]),
      atHome(3, `${cap(the)} se quedó callad${gendered(villain, 'o', 'a')} un buen rato.`, [villain.id]),
      atHome(1, `Al final, ${the} confesó que ${plot.motive}.`, [villain.id]),
      atHome(3, `${h.name} lo entendió enseguida y no se enfadó.`, [h.id]),
    ],
    [
      atHome(1, `${h.name} ${eventPhrase(plot.offer, { event: 'la fiesta' })}, y ${the} ${plot.change}.`, [h.id, villain.id]),
      atHome(2, `${cap(the)} prometió no volver a hechizar a nadie.`, [villain.id]),
      atHome(3, `${mentor.name} le enseñó a usar su magia para cosas bonitas.`, [mentor.id, villain.id]),
      atHome(1, 'Esa tarde, todos celebraron juntos una gran fiesta.', both),
      atHome(2, plot.party, [villain.id]),
      atHome(3, `${f.name} bailó hasta que le dolieron los pies.`, [f.id]),
      atHome(1, `${h.name} aprendió que la valentía y la amabilidad pueden romper cualquier hechizo.`, [h.id]),
      atHome(2, `Desde entonces, ${the} era una vecina más.`.replace('una vecina', gendered(villain, 'un vecino', 'una vecina')), [villain.id]),
      atHome(3, `Y ${pair} guardaron el frasco vacío como recuerdo.`, both, ['potion']),
    ],
  ];
  return {
    title: `${h.name} y el hechizo ${ofPhrase(the)}`, place: where, mentor, villain, questId: villainId, variantId: trial.id, beats,
    items: ['potion', charm.item],
    blockIds: { opening: home.id, goal: `spell-${villainId}`, obstacle: trial.id, strategy: mentor.id, discovery: charm.item, ending: home.id },
    roles: { home: home.id, destination: where.id, mentor: mentor.id, villain: villainId, helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}

/** Each cheat backfires on the one who plays it. */
const CHEATS = {
  'vain-snake': { cheat: 'escondió las banderas que marcaban el camino', items: ['finish-flag'], beat: 'Siguieron las huellas de los corredores que habían pasado antes.', fall: 'se perdió sin las banderas y se quedó dando vueltas' },
  'envious-wizard': { cheat: 'hizo aparecer charcos mágicos en mitad de la pista', items: [], beat: 'Saltaron de piedra en piedra para no meterse en los charcos.', fall: 'resbaló en su propio charco y se quedó sentado en el barro' },
  'thief-rat': { cheat: 'cambió de sitio la señal del camino', items: ['signpost'], beat: 'Recordaron el camino que habían entrenado y no hicieron caso al poste.', fall: 'siguió su propia señal falsa y se metió entre unos arbustos' },
  imp: { cheat: 'ató con lazos los cordones de los corredores', items: [], beat: 'Se ayudaron a desatar los lazos y siguieron corriendo.', fall: 'tropezó con uno de sus propios lazos' },
  crow: { cheat: 'se llevó la bandera de meta a lo alto de un árbol', items: ['finish-flag'], beat: 'Siguieron corriendo, porque sabían dónde estaba la meta.', fall: 'se enredó con la bandera entre las ramas' },
};
const COACHES = ['turtle', 'wise-elder', 'wise-grandmother', 'royal-knight', 'pony'];

/** B4 · La carrera tramposa: a boastful rival, training, a cheat that backfires and help instead of victory. */
function race({ random, hero: h, companion: f }) {
  const villainId = choose(random, Object.keys(CHEATS));
  const cheat = CHEATS[villainId];
  const villain = copyVillain(random, villainId);
  const coach = copyCharacter(random, choose(random, COACHES.filter(id => id !== h.id && id !== f.id)));
  const home = getScene(choose(random, ['village', 'meadow', 'playground', 'festival-square', 'farm']));
  const track = getScene('race-track');
  const { the } = villainWords(villain);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(track.id);
  const fall = cheat.fall.replace('sentado', gendered(villain, 'sentado', 'sentada'));
  const beats = [
    [
      atHome(1, `En el pueblo iban a celebrar la gran carrera, y ${named(h)} quería participar.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, `${f.name} también se apuntó enseguida, con muchas ganas.`, [f.id]),
      atHome(1, `Entonces apareció ${the}, que presumía de ser ${gendered(villain, 'el', 'la')} más ${gendered(villain, 'rápido', 'rápida')} de todos.`, [villain.id]),
      atHome(2, `${cap(the)} se rio de ${h.name} y le dijo que no tenía nada que hacer.`, [villain.id, h.id]),
      atHome(3, `${h.name} sintió un nudo en la barriga.`, [h.id]),
      atHome(2, `${f.name} le dijo que lo importante era intentarlo.`, [f.id]),
      atHome(3, 'El trofeo brillaba en la plaza, esperando al final de la carrera.', [], ['trophy']),
      atHome(1, `${h.name} y su ${friendWord(f)} ${f.name} decidieron entrenar con ${coach.name}, ${kind(coach)}.`, [...both, coach.id]),
    ],
    [
      there(1, `${coach.name} les enseñó a correr a su ritmo, sin cansarse demasiado.`, [coach.id, ...both]),
      there(2, `Usaba un cronómetro y un silbato para marcar cada vuelta.`, [coach.id], ['stopwatch', 'whistle']),
      there(3, `${f.name} se cayó una vez, pero se levantó riendo.`, [f.id]),
      there(1, 'También les enseñó a respirar hondo cuando estuvieran nerviosos.', [coach.id, ...both]),
      there(2, `${h.name} aprendió el camino de la carrera curva a curva.`, [h.id]),
      there(3, 'Entrenaron cada tarde, aunque a veces lloviera.', both),
      there(2, `${coach.name} les recordó que una carrera también se gana con el corazón.`, [coach.id]),
      there(3, `${h.name} dibujó el recorrido en un papel para no olvidarlo.`, [h.id]),
      there(1, 'Por fin llegó el día de la carrera.', both),
    ],
    [
      there(1, `En ${placeName(track)}, todos esperaban junto a la línea de salida.`, [...both, villain.id]),
      there(2, track.detail, [], ['finish-flag']),
      there(3, 'Los vecinos animaban desde los lados con pañuelos de colores.', [], ['handkerchief']),
      there(1, `${coach.name} tocó el silbato, y la carrera empezó.`, [coach.id], ['whistle']),
      there(2, `${cap(the)} salió disparad${gendered(villain, 'o', 'a')} y se puso delante.`, [villain.id]),
      there(3, `${h.name} corría a su ritmo, como había entrenado.`, [h.id]),
      there(1, `Pero ${the} ${cheat.cheat}.`, [villain.id], cheat.items),
      there(2, 'Varios corredores se pararon sin saber qué hacer.'),
      there(3, `${f.name} frunció el ceño, porque aquello no era justo.`, [f.id]),
    ],
    [
      there(1, `${pair} no se rindieron.`, both),
      there(2, `${h.name} respiró hondo, como les había enseñado ${coach.name}.`, [h.id]),
      there(3, `${f.name} le guiñó un ojo para darle ánimos.`, [f.id]),
      there(1, cheat.beat, both),
      there(2, 'Poco a poco, fueron adelantando a otros corredores.', both),
      there(3, 'Ya se veía la meta a lo lejos.', [], ['finish-flag']),
      there(1, `Entonces vieron que ${the} ${fall}.`, [villain.id]),
      there(2, `${cap(the)} intentaba levantarse, pero no podía ${gendered(villain, 'solo', 'sola')}.`, [villain.id]),
      there(3, 'Los demás corredores pasaban de largo sin mirar.'),
    ],
    [
      there(1, `${h.name} se detuvo y le tendió la mano ${toPhrase(the)}.`, [h.id, villain.id]),
      there(2, `${f.name} también se paró a ayudar.`, [f.id]),
      there(3, `${cap(the)} no podía creer lo que veía.`, [villain.id]),
      there(1, `Entre los dos, ayudaron ${toPhrase(the)} a ponerse de pie.`, [...both, villain.id]),
      there(2, `${cap(the)} les preguntó por qué lo hacían, si había hecho trampas.`, [villain.id]),
      there(3, `${h.name} se encogió de hombros y sonrió.`, [h.id]),
      there(1, `${h.name} le dijo que correr juntos era más divertido que ganar.`, [h.id, villain.id]),
      there(2, 'Así que siguieron los tres, a su ritmo, hasta el final.', [...both, villain.id]),
      there(3, 'Los vecinos aplaudieron al verlos llegar.', [], ['finish-flag']),
    ],
    [
      there(1, `Cruzaron la meta juntos, y todos recibieron una medalla.`, [...both, villain.id], ['medal']),
      there(2, `${coach.name} dijo que nunca había estado tan ${gendered(coach, 'orgulloso', 'orgullosa')}.`, [coach.id]),
      there(3, 'El trofeo brilló en la meta para todos los corredores.', [], ['trophy']),
      there(1, `${cap(the)} confesó que hacía trampas porque tenía miedo de perder y de que se rieran.`, [villain.id]),
      there(2, `${cap(the)} pidió perdón a todos los corredores.`, [villain.id]),
      there(3, `${f.name} le prestó su pañuelo para limpiarse el barro.`, [f.id], ['handkerchief']),
      there(1, `${h.name} aprendió que ayudar a alguien vale más que cualquier trofeo.`, [h.id], ['trophy']),
      there(2, `Desde entonces, ${the} entrenaba con ${pair} cada tarde.`, [villain.id, ...both]),
      there(3, 'Y nunca más volvió a hacer trampas.', [villain.id]),
    ],
  ];
  return {
    title: `${h.name} y la carrera tramposa`, place: track, mentor: coach, villain, questId: `race-${villainId}`, variantId: villainId, beats,
    items: ['whistle', 'stopwatch', 'medal', 'trophy', ...cheat.items],
    blockIds: { opening: home.id, goal: `race-${villainId}`, obstacle: villainId, strategy: coach.id, discovery: 'race-track', ending: home.id },
    roles: { home: home.id, destination: track.id, mentor: coach.id, villain: villainId },
  };
}

/** Lonely villains who take a baby home, and how to tiptoe past their sleeping lair. */
const KIDNAPPERS = {
  troll: 'troll-bridge', ogre: 'ogre-cave', giant: 'giant-house', spider: 'web-corner', crow: 'crow-nest', 'winter-witch': 'ice-castle', imp: 'imp-mushroom',
};
const BABIES = [
  { id: 'chick', parent: 'hen' }, { id: 'duckling', parentName: 'mamá pata' }, { id: 'fawn', parent: 'deer' },
  { id: 'bear-cub', parent: 'bear' }, { id: 'foal', parent: 'pony' }, { id: 'penguin-chick', parent: 'penguin', only: 'winter-witch' },
];
const SNEAKS = [
  { items: ['dry-leaves'], line: 'Pisaron con mucho cuidado para no hacer crujir las hojas secas.' },
  { items: ['creaky-door'], line: 'Abrieron la puerta que cruje muy despacito, centímetro a centímetro.' },
  { items: ['wind-chime'], line: 'Sujetaron la campanilla de viento para que no sonara.' },
];

/** B5 · El rescate en la guarida: a lonely villain takes a baby, the pair sneaks in and offers friendship. */
function lairRescue({ random, hero: h, companion: f }) {
  const cast = [h, f];
  // Only the winter witch keeps a penguin chick: her castle is the one cold enough for it.
  const babiesFor = villainId => BABIES.filter(entry => (!entry.only || entry.only === villainId) && entry.parent !== h.id && entry.parent !== f.id &&
    (villainId !== 'winter-witch' || entry.id === 'penguin-chick'));
  const villainId = choose(random, Object.keys(KIDNAPPERS).filter(id => fitsCast(cast, KIDNAPPERS[id]) && babiesFor(id).length));
  const lair = getScene(KIDNAPPERS[villainId]);
  const pick = choose(random, babiesFor(villainId));
  const baby = copySupporting(random, pick.id);
  const parent = pick.parent ? copyCharacter(random, pick.parent) : null;
  const parentName = parent ? parent.name : pick.parentName;
  const parentIds = parent ? [parent.id] : [];
  const villain = copyVillain(random, villainId);
  const home = getScene(choose(random, ['village', 'meadow', 'garden', 'farm', 'orchard', 'treehouse'].filter(id => fitsCast(cast, id))));
  const trial = abilityTrial(random, PLACE_INFO[lair.id].trials, [f, h]);
  const sneak = choose(random, SNEAKS);
  const { the, a, them } = villainWords(villain);
  const it = gendered(baby, 'lo', 'la');
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(lair.id);
  const { helper } = trial;
  const beats = [
    [
      atHome(1, `${named(h)} y su ${friendWord(f)} ${f.name} merendaban ${inPlace(home)}.`, both),
      atHome(2, home.detail),
      atHome(3, 'Todo estaba tranquilo, hasta que se oyó un grito.'),
      atHome(1, `${cap(parentName)} llegó corriendo: ${a} se había llevado a su ${baby.label} ${baby.name}.`, parentIds),
      atHome(2, `${cap(the)} ${it} había metido en un saco y se había ido muy deprisa.`, [], ['sack']),
      atHome(3, `${cap(parentName)} no podía dejar de llorar.`, parentIds),
      atHome(2, `${pair} sabían que ${the} vivía ${inPlace(lair)}.`, both),
      atHome(3, `${h.name} tragó saliva, porque nadie se acercaba nunca allí.`, [h.id]),
      atHome(1, `${pair} prometieron traer a ${baby.name} de vuelta.`, [...both, ...parentIds]),
    ],
    [
      there(1, travelTo(lair, cast, pair), both),
      there(2, lair.detail),
      there(3, `${f.name} caminaba de puntillas, aunque todavía estaban lejos.`, [f.id]),
      there(1, `Pero ${TRIALS[trial.id].intro[0].toLocaleLowerCase('es')}${TRIALS[trial.id].intro.slice(1)}`),
      there(2, trialReason(trial), helper ? [helper.id] : both),
      there(1, solveTrial(trial, pair), helper ? [helper.id] : both),
      there(3, TRIALS[trial.id].after),
      there(2, 'Desde allí ya se oían unos ronquidos muy fuertes.', both),
      there(3, 'Se miraron y asintieron sin decir nada.', both),
    ],
    [
      there(1, `${cap(the)} dormía profundamente ${spotOf(lair)}.`, [villain.id]),
      there(2, `Roncaba tan fuerte que temblaban las paredes.`, [villain.id]),
      there(3, `${f.name} tuvo que taparse la boca para no reírse.`, [f.id]),
      there(1, sneak.line, both, sneak.items),
      there(2, 'Cada paso parecía durar una eternidad.', both),
      there(3, `${h.name} contaba los pasos en silencio: uno, dos y tres.`, [h.id]),
      there(1, `Por fin encontraron a ${baby.name} en un rincón, ${gendered(baby, 'asustado', 'asustada')} pero bien.`, [...both, baby.id]),
      there(2, `${baby.name} los reconoció y casi gritó de alegría.`, [baby.id]),
      there(3, `${h.name} se llevó un dedo a los labios para pedirle silencio.`, [h.id, baby.id]),
    ],
    [
      there(1, `${pair} sacaron a ${baby.name} de allí con mucho cuidado.`, [...both, baby.id]),
      there(2, `${baby.name} se agarró fuerte a ${h.name}.`, [baby.id, h.id]),
      there(3, 'Ya casi estaban fuera cuando algo hizo ruido.', both),
      there(1, `${cap(the)} se despertó y los vio marcharse.`, [villain.id]),
      there(2, plotThreat(villainId), [villain.id]),
      there(3, `${f.name} quiso correr, pero sus piernas no se movían.`, [f.id]),
      there(1, `Pero entonces ${the} se sentó en el suelo y se echó a llorar.`, [villain.id]),
      there(2, 'Lloraba tanto que se le movían los hombros.', [villain.id]),
      there(3, `${baby.name} miró ${toPhrase(the)} con un poco de pena.`, [baby.id]),
    ],
    [
      there(1, `${h.name} respiró tres veces y le preguntó por qué se había llevado a ${baby.name}.`, [h.id, villain.id]),
      there(2, `${cap(the)} se limpió la nariz y tardó en contestar.`, [villain.id]),
      there(3, 'Todos esperaron en silencio a que hablara.', both),
      there(1, `${cap(the)} confesó que se sentía muy ${gendered(villain, 'solo', 'sola')} y quería un amigo con quien jugar.`, [villain.id]),
      there(2, `${pair} entendieron que no era malo, sino que estaba muy triste.`.replace('malo', gendered(villain, 'malo', 'mala')).replace('triste', 'triste'), both),
      there(3, `${baby.name} le dio un abrazo pequeñito.`, [baby.id, villain.id]),
      there(1, `${h.name} le prometió que vendrían a jugar con ${gendered(villain, 'él', 'ella')} todas las semanas, y ${the} sonrió.`, [h.id, villain.id]),
      there(2, `${cap(the)} pidió perdón y prometió no llevarse a nadie nunca más.`, [villain.id]),
      there(3, `${f.name} le dio la mano para sellar la promesa.`, [f.id, villain.id]),
    ],
    [
      atHome(1, `Volvieron ${toPlace(home)}, y ${parentName} abrazó a ${baby.name} con fuerza.`, [...parentIds, baby.id]),
      atHome(2, `${cap(parentName)} les dio las gracias una y otra vez.`, [...parentIds, ...both]),
      atHome(3, `${baby.name} se quedó dormido enseguida, muy cansado.`.replace('dormido', gendered(baby, 'dormido', 'dormida')).replace('cansado', gendered(baby, 'cansado', 'cansada')), [baby.id]),
      atHome(1, `Desde entonces, ${pair} visitaban ${toPhrase(the)} cada semana para jugar.`, [...both, villain.id]),
      atHome(2, `A veces llevaban también a ${baby.name}, que ya no le tenía miedo.`, [baby.id]),
      atHome(3, `${cap(the)} preparaba la merienda para todos.`, [villain.id]),
      atHome(1, `${h.name} aprendió que la soledad puede hacer que alguien se equivoque, y la amistad lo arregla.`, [h.id]),
      atHome(2, `${f.name} dijo que había sido la aventura más valiente de su vida.`, [f.id]),
      atHome(3, `Y ${the} nunca volvió a sentirse ${gendered(villain, 'solo', 'sola')}.`, [villain.id]),
    ],
  ];
  return {
    title: `${h.name} y la guarida ${ofPhrase(the)}`, place: lair, villain, extras: [...(parent ? [parent] : []), baby], questId: `lair-${villainId}`, variantId: trial.id, beats,
    items: ['sack', ...sneak.items],
    blockIds: { opening: home.id, goal: `lair-${villainId}`, obstacle: trial.id, strategy: pick.id, discovery: villainId, ending: home.id },
    roles: { home: home.id, destination: lair.id, villain: villainId, baby: baby.id, helper: helper?.id ?? null, ability: trial.ability ?? null },
  };
}
const plotThreat = id => VILLAIN_PLOTS[id].threat;

/** Strange events at home, the clues a magnifying glass finds, and their innocent cause. */
const INCIDENTS = [
  { id: 'apples', homes: ['orchard', 'farm', 'garden', 'village'], happen: 'Cada mañana faltaban manzanas en el huerto.', items: ['apple'], clue1: 'Junto al árbol había mordisquitos muy pequeños.', clue2: 'En la tierra había huellas diminutas de patitas.', culprit: 'squirrel', found: 'una ardilla que guardaba manzanas para el invierno', fix: 'Le prepararon una cesta solo para ella, y prometió pedir antes de tomar nada.', fixItems: ['basket'] },
  { id: 'holes', homes: ['garden', 'meadow', 'orchard', 'farm'], happen: 'Cada noche, alguien llenaba el jardín de agujeros.', items: ['shovel'], clue1: 'Los agujeros salían desde abajo, no desde arriba.', clue2: 'Junto a cada agujero había un montoncito de tierra fresca.', culprit: 'mole', found: 'un topo que buscaba lombrices bajo la tierra', fix: 'Le enseñaron un rincón donde podía cavar tranquilo sin estropear nada.' },
  { id: 'attic', homes: ['village', 'treehouse', 'farm'], happen: 'Cada noche se oían ruidos extraños en el desván.', items: [], clue1: 'Había cáscaras de nuez escondidas en un rincón.', clue2: 'Dentro de una caja de cartón había una camita hecha con calcetines.', clue2Items: ['cardboard-box'], culprit: 'dormouse', found: 'un lirón que se había hecho una camita', fix: 'Le hicieron una casita de verdad en el porche, con una manta suave.', fixItems: ['blanket'] },
  { id: 'laundry', homes: ['village', 'farm', 'meadow', 'treehouse'], happen: 'La ropa tendida aparecía en el suelo cada mañana.', items: [], clue1: 'Todas las prendas habían caído hacia el mismo lado.', clue2: 'Las pinzas estaban flojas, y cada noche soplaba un viento fuerte.', culprit: null, found: 'el viento, que soplaba fuerte cada noche', fix: 'Pusieron pinzas nuevas, y la ropa ya no se cayó.' },
  { id: 'flowers', homes: ['garden', 'village', 'meadow'], happen: 'Las flores del jardín amanecían mordisqueadas.', items: ['flower'], clue1: 'Las flores estaban mordidas solo por arriba, a la altura de un hocico.', clue2: 'Junto a la cerca había pelos blancos y una huella de pezuña.', culprit: 'goat', found: 'una cabra de la granja vecina que se escapaba de noche', fix: 'Arreglaron la cerca y le llevaron hierba fresca para que no tuviera hambre.' },
  { id: 'lights', homes: ['meadow', 'garden', 'village', 'farm'], happen: 'Unas luces extrañas flotaban cada noche junto a la casa.', items: [], clue1: 'Las luces se encendían y se apagaban, a saltitos.', clue2: 'No era una luz grande, sino muchas lucecitas pequeñas.', culprit: 'firefly', found: 'un grupo de luciérnagas que bailaban', fix: 'Desde entonces, todos salían cada noche a ver el baile de las luces.' },
];
const SUSPECTS = { troll: 'troll-bridge', ogre: 'ogre-cave', spider: 'web-corner', 'vain-snake': 'swamp', scarecrow: 'farm', crow: 'crow-nest', ghost: 'enchanted-tower', giant: 'giant-house' };

/** B6 · El falso villano: everyone blames the strange neighbor, but the clues point elsewhere. */
function falseVillain({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const incident = choose(random, INCIDENTS.filter(entry => entry.culprit !== h.id && entry.culprit !== f.id && entry.homes.some(id => fitsCast(cast, id))));
  const home = getScene(choose(random, incident.homes.filter(id => fitsCast(cast, id))));
  const suspectId = choose(random, Object.keys(SUSPECTS).filter(id => SUSPECTS[id] !== home.id));
  const suspect = copyVillain(random, suspectId);
  const lair = getScene(SUSPECTS[suspectId]);
  const culprit = incident.culprit ? copyCharacter(random, incident.culprit) : null;
  const { the, them } = villainWords(suspect);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const atHome = at(home.id), there = at(lair.id);
  const culpritIds = culprit ? [culprit.id] : [];
  const beats = [
    [
      atHome(1, `${named(h)} y su ${friendWord(f)} ${f.name} vivían ${inPlace(home)}.`, both),
      atHome(2, home.detail),
      atHome(3, 'Allí casi nunca pasaba nada raro.'),
      atHome(1, incident.happen, [], incident.items),
      atHome(2, 'Pasó una noche, y otra, y otra más.'),
      atHome(3, 'Los vecinos empezaron a murmurar en voz baja.'),
      atHome(2, 'Nadie había visto quién lo hacía.'),
      atHome(3, `${f.name} no podía dormir pensando en el misterio.`, [f.id]),
      atHome(1, `Pronto, todos culparon ${toPhrase(the)}, que vivía ${inPlace(lair)}.`),
    ],
    [
      there(1, `Decían que ${the} tenía cara de pocos amigos y que nadie ${them} conocía.`, [suspect.id]),
      there(2, lair.detail),
      there(3, `Nunca bajaba al pueblo, y eso hacía que hablaran todavía más.`),
      atHome(1, `Pero ${h.name} pensó que no era justo culpar a alguien sin pruebas.`, [h.id]),
      atHome(2, `${f.name} estuvo de acuerdo, aunque le daba un poco de miedo.`, [f.id]),
      atHome(3, 'Algunos vecinos se rieron de ellos.'),
      atHome(1, `${pair} decidieron investigar con una lupa.`, both, ['magnifying-glass']),
      atHome(2, 'Querían descubrir la verdad, fuera la que fuera.', both),
      atHome(3, `${h.name} se puso su gorro de investigar.`, [h.id]),
    ],
    [
      atHome(1, `Con la lupa encontraron la primera pista: ${incident.clue1[0].toLocaleLowerCase('es')}${incident.clue1.slice(1, -1)}.`, both, ['magnifying-glass']),
      atHome(2, `${f.name} lo apuntó todo en un cuaderno.`, [f.id], ['notebook']),
      atHome(3, `${h.name} miró de cerca, con un ojo cerrado.`, [h.id]),
      atHome(1, incident.clue2, both, incident.clue2Items || []),
      atHome(2, `Aquello no encajaba con ${the}, que era muy ${suspectId === 'vain-snake' ? 'larga' : 'diferente'}.`),
      atHome(3, 'Cada pista los acercaba un poco más a la verdad.', both),
      atHome(1, `${pair} decidieron vigilar esa noche para descubrir al culpable.`, both),
      atHome(2, 'Prepararon una lamparita de noche y una manta.', both, ['night-lamp', 'blanket']),
      atHome(3, 'Se escondieron detrás de unos arbustos, muy quietos.', both),
    ],
    [
      atHome(1, 'Al caer la noche, esperaron en silencio.', both),
      atHome(2, 'Las estrellas salieron una a una.'),
      atHome(3, `${f.name} bostezó, pero se pellizcó para no dormirse.`, [f.id]),
      atHome(1, `De pronto, ${h.name} vio algo moverse.`, [h.id]),
      atHome(2, `Encendieron la lamparita de noche muy despacio.`, both, ['night-lamp']),
      atHome(3, 'El corazón les latía muy deprisa.', both),
      atHome(1, `No era ${the}: era ${incident.found}.`, culpritIds),
      atHome(2, `${h.name} y ${f.name} se miraron con los ojos muy abiertos.`, both),
      atHome(3, 'Por fin habían resuelto el gran misterio.', both),
    ],
    [
      atHome(1, incident.fix, [...both, ...culpritIds], incident.fixItems || []),
      atHome(2, 'A la mañana siguiente, les contaron a todos lo que habían descubierto.', both),
      atHome(3, 'Los vecinos no podían creer lo que oían.'),
      atHome(1, `Entonces se dieron cuenta de que habían culpado ${toPhrase(the)} sin razón.`, both),
      atHome(2, 'Muchos bajaron la cabeza, un poco avergonzados.'),
      atHome(3, `${f.name} propuso ir a pedirle perdón todos juntos.`, [f.id]),
      there(1, `${pair} fueron hasta ${placeName(lair)} con un pastel de disculpas.`, both, ['birthday-cake']),
      there(2, `Al principio, ${the} no quería abrir la puerta.`, [suspect.id]),
      there(3, `${h.name} llamó tres veces, con mucha paciencia.`, [h.id]),
    ],
    [
      there(1, `Cuando por fin abrió, ${pair} le pidieron perdón.`, [...both, suspect.id]),
      there(2, `${cap(the)} les confesó que siempre había querido tener amigos en el pueblo.`, [suspect.id]),
      there(3, `Y que tenía cara de pocos amigos solo porque se sentía ${gendered(suspect, 'solo', 'sola')}.`, [suspect.id]),
      there(1, `${cap(the)} sonrió y aceptó compartir el pastel con ellos.`, [suspect.id, ...both], ['birthday-cake']),
      there(2, 'Resultó ser divertidísimo y sabía muchos chistes.', [suspect.id]),
      atHome(3, `Desde entonces, ${the} bajaba al pueblo cada domingo.`, [suspect.id]),
      atHome(1, `${h.name} aprendió que no hay que juzgar a nadie por su apariencia.`, [h.id]),
      atHome(2, 'Y que una buena pista vale más que mil rumores.', both),
      atHome(3, `${f.name} guardó la lupa para el próximo misterio.`, [f.id], ['magnifying-glass']),
    ],
  ];
  return {
    title: `${h.name} y el misterio ${ofPhrase(placeName(home))}`, place: home, villain: suspect, extras: culprit ? [culprit] : [], questId: incident.id, variantId: suspectId, beats,
    items: ['magnifying-glass', 'night-lamp', ...incident.items, ...(incident.fixItems || [])],
    blockIds: { opening: home.id, goal: `mystery-${incident.id}`, obstacle: suspectId, strategy: 'magnifying-glass', discovery: incident.culprit || 'wind', ending: lair.id },
    roles: { home: home.id, destination: lair.id, suspect: suspectId, culprit: incident.culprit },
  };
}

export const ACTION_STRUCTURES = Object.freeze([
  { id: 'theft', name: 'El robo y la redención', generate: theft },
  { id: 'defense', name: 'La defensa del hogar', accept: (h, f) => !needsWater([h, f]), generate: defense },
  { id: 'spell', name: 'El hechizo', accept: (h, f) => !needsWater([h, f]), generate: spell },
  { id: 'race', name: 'La carrera tramposa', accept: (h, f) => !needsWater([h, f]), generate: race },
  { id: 'lair-rescue', name: 'El rescate en la guarida', accept: (h, f) => !needsWater([h, f]), generate: lairRescue },
  { id: 'false-villain', name: 'El falso villano', accept: (h, f) => !needsWater([h, f]), generate: falseVillain },
]);
export const ACTION_GOALS = [...TARGETS.map(entry => entry.id), ...Object.keys(SPELLS).map(id => `spell-${id}`), ...Object.keys(CHEATS).map(id => `race-${id}`), ...Object.keys(KIDNAPPERS).map(id => `lair-${id}`), ...INCIDENTS.map(entry => `mystery-${entry.id}`)];
