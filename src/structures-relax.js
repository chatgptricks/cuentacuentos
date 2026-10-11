import { getScene } from './world-catalog.js';
import { getCharacter } from './character-catalog.js';
import { PLACE_INFO, fitsCast, friendWord, goesTo, inPlace, kind, low, named, needsWater, placeName, toPlace } from './narrative-world.js';
import { RELAX_HOMES } from './quest-catalog.js';
import { RELAX_GOALS, RELAX_OBSTACLES } from './story-blocks.js';
import { applyStoryLanguage } from './story-language.js';
import { at, choose, copyCharacter, gendered } from './story-kit.js';

// The feeling a fable names must match its trouble: a shadow brings fear, a still boat anger.
const RELAX_FEELINGS = {
  'shadow-courage': ['un poco de miedo', 'el miedo', 'pequeñito'], feelings: ['mucho enfado', 'el enfado', 'pequeñito'],
  comparison: ['un poco de tristeza', 'la tristeza', 'pequeñita'], 'uncertain-route': ['mucha confusión', 'la confusión', 'pequeñita'],
  rest: ['mucho cansancio', 'el cansancio', 'pequeñito'],
};
/** Land creatures fall asleep in a bedroom; sea creatures in their home by the water. */
const bedFor = (cast, home) => fitsCast(cast, 'bedroom') ? 'bedroom' : home.id;

/** C1 · La prisa: a wish, an impatient attempt, a breathing pause, a wise word, a calmer try and bedtime. */
function hurry({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const base = choose(random, RELAX_GOALS.filter(goal => goal.scenes.some(id => fitsCast(cast, id))));
  const { goal: g, lexicon } = applyStoryLanguage(random, 'relax', base);
  const place = getScene(choose(random, g.scenes.filter(id => fitsCast(cast, id))));
  const home = getScene(choose(random, RELAX_HOMES.filter(id => id !== place.id && fitsCast(cast, id))));
  const o = choose(random, RELAX_OBSTACLES);
  const mentor = f;
  const night = PLACE_INFO[place.id].night;
  const [feel, feeling, smaller] = RELAX_FEELINGS[g.id] || ['mucha frustración', 'la frustración', 'pequeñita'];
  const both = [h.id, f.id];
  const there = at(place.id), atHome = at(home.id), bed = at(bedFor(cast, home));
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
      there(1, `Entonces ${f.name} le ayudó a pensar en un paso pequeño.`, [mentor.id]),
      there(2, `${f.name} siguió a su lado, escuchando con mucha atención.`, [mentor.id, ...both]),
      there(3, 'No hacía falta resolverlo todo de una vez.', [mentor.id]),
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
      there(3, `${f.name} sonrió al ver que aquel pequeño paso había funcionado.`, [mentor.id]),
    ],
    [
      atHome(1, `${night ? 'Cuando la luna estuvo alta' : 'Cuando empezó a oscurecer'}, ${h.name} volvió ${toPlace(home)}.`, [h.id]),
      atHome(3, `${f.name} se despidió con un abrazo y se fue a su casa.`, both),
      atHome(2, 'Se prepararon para descansar y dejaron atrás las prisas del día.'),
      bed(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      bed(1, `Antes de dormir, recordó lo que había aprendido: ${low(g.moral)}.`, [h.id]),
      bed(3, 'Afuera, todo estaba en silencio y las estrellas brillaban.'),
      bed(2, 'Respiró despacio una vez más, como si oliera una flor.', [h.id]),
      bed(3, 'Los ojos se le fueron cerrando poquito a poco.', [h.id]),
      bed(1, `Y así, con una sonrisa, ${h.name} se durmió tranquilamente.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${g.title}`, place, moral: `${g.moral}.`, questId: g.id, variantId: o.id, beats, items: things, lexicon,
    blockIds: { opening: home.id, goal: g.id, obstacle: o.id, strategy: mentor.id, discovery: g.id, ending: home.id },
    roles: { home: home.id, destination: place.id, mentor: mentor.id },
  };
}

/** Night visitors who can be wished good night. */
const NIGHT_FRIENDS = [
  { id: 'cricket', line: (who, it) => `${who} le dio las buenas noches a ${it.name}, el grillo, que cantaba una nana muy bajito.` },
  { id: 'firefly', line: (who, it) => `${who} saludó a ${it.name}, la luciérnaga, que apagó su lucecita para dormir.` },
  { id: 'bat', line: (who, it) => `${who} le dio las buenas noches a ${it.name}, el murciélago, que salía a dar su paseo.` },
  { id: 'moth', line: (who, it) => `${who} le dijo buenas noches a ${it.name}, la polilla, que revoloteaba junto a la lamparita.`, items: ['night-lamp'] },
  { id: 'dormouse', line: (who, it) => `${who} le dio las buenas noches a ${it.name}, el lirón, que ya roncaba en su rama.` },
];
const GOODNIGHT_THINGS = [
  { line: who => `${who} le dio las buenas noches a las flores, que cerraban sus pétalos.`, items: ['flower'] },
  { line: who => `${who} le dio las buenas noches a la luna, que brillaba como una lamparita.` },
  { line: who => `${who} le dio las buenas noches al viento, que se fue a dormir entre los árboles.` },
  { line: who => `${who} les dio las buenas noches a las estrellas, que parpadeaban despacio.` },
  { line: who => `${who} le dio las buenas noches a la campanilla de viento, que tintineó una última vez.`, items: ['wind-chime'] },
];

/** C2 · Buenas noches a todo: a sleepover, no sleep, good night to everything outside, and sleep. */
function goodnight({ random, hero: h, companion: f }) {
  const home = getScene(choose(random, ['village', 'treehouse', 'garden', 'meadow', 'farm']));
  const friends = NIGHT_FRIENDS.filter(entry => entry.id !== h.id && entry.id !== f.id);
  const visitors = [];
  for (let i = 0; i < 1; i += 1) visitors.push(choose(random, friends.filter(entry => !visitors.includes(entry))));
  const guests = visitors.map(entry => copyCharacter(random, entry.id));
  const things = [];
  for (let i = 0; i < 3; i += 1) things.push(choose(random, GOODNIGHT_THINGS.filter(entry => !things.includes(entry))));
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const bed = at('bedroom'), porch = at('porch'), outside = at(home.id);
  const greet = (index, who) => index === 0 ? visitors[0].line(who, guests[0])
    : index === 1 ? `${who} le deseó una noche tranquila a ${guests[0].name}, con una sonrisa.`
      : `${who} escuchó el último saludo de ${guests[0].name} antes de volver a descansar.`;
  const beats = [
    [
      bed(1, `Esa noche, ${named(f)} se quedó a dormir en casa de ${h.name}.`, both),
      bed(2, getScene('bedroom').detail),
      bed(3, 'Habían terminado el día y ya podían descansar sin ninguna prisa.'),
      bed(1, 'Terminaron de prepararse y se metieron en la cama con calma.', both),
      bed(2, 'Recordaron su momento favorito y se quedaron con aquella sensación agradable.'),
      bed(3, 'La lamparita de noche dibujaba estrellas en el techo.', [], ['night-lamp']),
      bed(1, `Pero ${pair} no tenían nada de sueño.`, both),
      bed(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      bed(3, `${f.name} contó ovejas, pero se le olvidó por cuál iba.`, [f.id]),
    ],
    [
      bed(1, `${h.name} propuso darle las buenas noches a todo lo que había fuera.`, [h.id]),
      porch(2, 'Se movieron despacio, procurando no romper aquella calma tan agradable.'),
      porch(3, getScene('porch').detail),
      porch(1, things[0].line(h.name), [h.id], things[0].items || []),
      porch(2, 'El aire de la noche olía a hierba fresca.', both),
      porch(3, `${f.name} bostezó un poquito, aunque no quería admitirlo.`, [f.id]),
      outside(1, greet(0, f.name), [f.id, guests[0].id], visitors[0].items || []),
      outside(2, `${guests[0].name} les deseó dulces sueños con una sonrisa.`, [guests[0].id]),
      outside(3, 'Todo se movía cada vez más despacio.'),
    ],
    [
      outside(1, things[1].line(f.name), [f.id], things[1].items || []),
      outside(2, 'Cada buenas noches los dejaba un poco más tranquilos.', both),
      outside(3, `${h.name} se frotó los ojos con las manos.`, [h.id]),
      outside(1, greet(1, h.name), [h.id, guests[0].id], visitors[0].items || []),
      outside(2, `${guests[0].name} les dijo que la noche era para descansar.`, [guests[0].id]),
      outside(3, 'A lo lejos, una lechuza ululó suavemente.'),
      outside(1, greet(2, f.name), [f.id, guests[0].id], visitors[0].items || []),
      outside(2, `${guests[0].name} les sonrió y se acurrucó en su rincón.`, [guests[0].id]),
      outside(3, 'Ya casi todo a su alrededor estaba dormido.'),
    ],
    [
      porch(1, things[2].line(h.name), [h.id], things[2].items || []),
      porch(2, `Luego, ${pair} volvieron a entrar muy despacito.`, both),
      porch(3, 'Entraron despacio y dejaron los saludos de la noche atrás.'),
      bed(1, `${h.name} le dio las buenas noches al rincón donde iba a descansar.`, [h.id]),
      bed(2, 'El cuerpo se fue aflojando un poquito más con cada respiración.'),
      bed(3, 'Ya no había nada pendiente que les impidiera descansar.'),
      bed(1, `${h.name} apagó la lamparita de noche y le dio las gracias por su luz.`, [h.id], ['night-lamp']),
      bed(2, 'La habitación quedó en una penumbra suave.'),
      bed(3, 'Solo se oía el tictac lejano del reloj.'),
    ],
    [
      bed(1, `${pair} respiraron hondo, como si olieran una flor.`, both),
      bed(2, 'Soltaron el aire muy despacio, como si apagaran una vela.', both),
      bed(3, 'Lo hicieron una, dos y tres veces.', both),
      bed(1, `${f.name} le dio las buenas noches a ${h.name} en voz muy bajita.`, both),
      bed(2, `${h.name} le contestó con un bostezo enorme.`, [h.id]),
      bed(3, 'Los dos se rieron sin hacer ruido.', both),
      bed(1, 'Los párpados les pesaban cada vez más.', both),
      bed(2, 'Los pies se relajaron, luego las piernas, y luego la barriga.', both),
      bed(3, 'El cansancio del día se fue quedando muy lejos de allí.'),
    ],
    [
      bed(1, `${h.name} recordó aquel último saludo a ${guests[0].name} con una sonrisa.`, [h.id]),
      bed(2, 'Todos estaban a salvo y calentitos.'),
      bed(3, 'Afuera, la luna vigilaba el jardín.'),
      bed(1, `${h.name} aprendió que la noche es más bonita cuando le decimos buenas noches con calma.`, [h.id]),
      bed(2, `${f.name} ya respiraba despacito, con la boca entreabierta.`, [f.id]),
      bed(3, 'Todo lo que habían vivido seguía acompañándolos de una forma agradable.'),
      bed(2, `${h.name} susurró buenas noches una última vez.`, [h.id]),
      bed(3, 'Y la casa entera se quedó en silencio.'),
      bed(1, `Y así, ${pair} se durmieron por fin, muy tranquilos.`, both),
    ],
  ];
  return {
    title: `${h.name} y las buenas noches`, place: getScene('bedroom'), extras: guests, moral: 'La noche es más bonita cuando le decimos buenas noches con calma.',
    questId: 'goodnight', variantId: visitors.map(entry => entry.id).join('-'), beats, items: ['night-lamp', ...things.flatMap(thing => thing.items || [])],
    blockIds: { opening: home.id, goal: 'goodnight', obstacle: visitors[0].id, strategy: 'quiet-greeting', discovery: 'slow-breaths', ending: 'bedroom' },
    roles: { home: home.id, destination: 'bedroom', guests: guests.map(guest => guest.id) },
  };
}

/** Night noises: what they sound like, what they seem to be and what they really are. */
const NOISES = [
  { id: 'curtain', scene: 'bedroom', items: ['curtain'], sound: 'algo se movía junto a la ventana', seems: 'Parecía un fantasma que bailaba en la oscuridad.', truth: 'Era la cortina, que se movía con la brisa.', fix: 'Cerraron un poco la ventana, y la cortina se quedó quieta.' },
  { id: 'tap', scene: 'bathroom', items: ['dripping-tap'], sound: 'se oía un plic, plic, plic que no paraba', seems: 'Parecían pasitos pequeños que se acercaban.', truth: 'Era el grifo del baño, que goteaba.', fix: 'Cerraron bien el grifo, y el plic se acabó.' },
  { id: 'cuckoo', scene: 'living-room', items: ['cuckoo-clock'], sound: 'sonó un cucú en mitad de la noche', seems: 'Parecía que alguien los llamaba desde la oscuridad.', truth: 'Era el pajarito del reloj de cuco, que daba la hora.', fix: 'Contaron juntos los cucús, y se rieron bajito.' },
  { id: 'chime', scene: 'porch', items: ['wind-chime'], sound: 'se oía un tintineo misterioso', seems: 'Parecían las campanitas de unos duendes traviesos.', truth: 'Era la campanilla de viento del porche.', fix: 'La escucharon un rato, porque sonaba muy bonita.' },
  { id: 'branch', scene: 'bedroom', items: ['window-branch'], sound: 'algo daba golpecitos en el cristal', seems: 'Parecían unos dedos largos que llamaban.', truth: 'Era una rama del árbol, que tocaba la ventana con el viento.', fix: 'Decidieron cortarla al día siguiente, con ayuda.' },
  { id: 'door', scene: 'living-room', items: ['creaky-door'], sound: 'se oyó un crujido largo', seems: 'Parecía que alguien entraba sin hacer ruido.', truth: 'Era la puerta, que crujía al moverse con el aire.', fix: 'La cerraron con suavidad, y dejó de crujir.' },
  { id: 'leaves', scene: 'porch', items: ['dry-leaves'], sound: 'se oía un ras, ras, ras afuera', seems: 'Parecían los pasos de un monstruo enorme.', truth: 'Eran hojas secas que el viento arrastraba por el porche.', fix: 'Las miraron bailar un rato desde la ventana.' },
  { id: 'bat', scene: 'porch', creature: 'bat', sound: 'algo aleteaba junto a la ventana', seems: 'Parecía un dragón pequeño volando en la noche.', truth: 'Era un murciélago que buscaba mosquitos para cenar.', fix: 'Lo saludaron con la mano, y siguió su vuelo.' },
];

/** C3 · El ruido de la noche: a sound, a scary guess, breathing, a look together and the real cause. */
function nightNoise({ random, hero: h, companion: f }) {
  const noise = choose(random, NOISES.filter(entry => entry.creature !== h.id && entry.creature !== f.id));
  const creature = noise.creature ? copyCharacter(random, noise.creature) : null;
  const items = noise.items || [];
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const bed = at('bedroom'), where = at(noise.scene), bath = at('bathroom');
  const beats = [
    [
      bed(1, `Esa noche, ${named(f)} se quedó a dormir en casa de ${h.name}.`, both),
      bed(2, getScene('bedroom').detail),
      bed(3, 'El cuerpo se fue aflojando un poquito más con cada respiración.'),
      bath(1, 'Se lavaron los dientes con el cepillo, uno al lado del otro.', both, ['toothbrush']),
      bath(2, `${f.name} hizo burbujas con la pasta de dientes y se rieron.`, [f.id]),
      bath(3, getScene('bathroom').detail),
      bed(1, 'Luego se metieron en la cama y apagaron la luz grande.', both),
      bed(2, 'Solo quedó encendida la lamparita de noche.', [], ['night-lamp']),
      bed(3, 'Recordaron su momento favorito y se quedaron con aquella sensación agradable.'),
    ],
    [
      bed(1, `De pronto, ${noise.sound}.`),
      bed(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      bed(3, 'El sonido se repitió una vez más.'),
      bed(1, noise.seems),
      bed(2, `${h.name} sintió que el corazón le latía muy deprisa.`, [h.id]),
      bed(3, 'Ninguno de los dos se atrevía a moverse.', both),
      bed(1, `Entonces ${h.name} recordó un truco para cuando tenía miedo: respirar despacio.`, [h.id]),
      bed(2, `Se lo explicó a ${f.name} en voz muy bajita.`, both),
      bed(3, 'Era mejor que quedarse quietos imaginando cosas.', both),
    ],
    [
      bed(1, 'Tomaron aire por la nariz, como si olieran una flor.', both),
      bed(2, 'Lo soltaron por la boca, como si apagaran una vela.', both),
      bed(3, 'Lo hicieron tres veces, contando bajito.', both),
      bed(1, `Poco a poco, el miedo de ${pair} se hizo más pequeño.`, both),
      bed(2, 'Ya podían pensar con más calma.', both),
      bed(3, `${f.name} se destapó la nariz, aunque no la boca.`, [f.id]),
      bed(1, 'Decidieron ir a mirar juntos qué era aquel ruido.', both),
      bed(2, 'Juntos, todo daba un poco menos de miedo.', both),
      bed(3, `${h.name} tomó la mano de ${f.name}.`, both),
    ],
    [
      bed(1, `${h.name} tomó la lamparita de noche para iluminar el camino.`, [h.id], ['night-lamp']),
      bed(2, 'Se movieron despacio, procurando no romper aquella calma tan agradable.'),
      bed(3, 'El suelo estaba fresquito bajo sus pies.', both),
      where(1, `Siguieron el sonido hasta ${placeName(getScene(noise.scene))}.`, both),
      where(2, ['bedroom', 'bathroom'].includes(noise.scene) ? 'A oscuras, todo parecía distinto de como era por el día.' : getScene(noise.scene).detail),
      where(3, 'El sonido se oía cada vez más cerca.', both),
      where(1, 'Levantaron la lamparita de noche para ver mejor.', both, ['night-lamp']),
      where(2, `${f.name} cerró los ojos un segundo y luego los abrió.`, [f.id]),
      where(3, 'Y entonces, por fin, lo vieron.', both),
    ],
    [
      where(1, noise.truth, creature ? [creature.id] : both, items),
      where(2, `${pair} se miraron y se echaron a reír.`, both),
      where(3, 'No era nada de lo que habían imaginado.', both),
      where(1, noise.fix, creature ? [...both, creature.id] : both, items),
      where(2, `${h.name} dijo que la noche tenía muchos sonidos, pero casi todos eran amigos.`, [h.id]),
      where(3, `${f.name} estuvo de acuerdo, bostezando sin parar.`, [f.id]),
      bed(1, 'Volvieron a la cama de puntillas.', both),
      bed(2, 'El cansancio del día se fue quedando muy lejos de allí.'),
      bed(3, 'Un último bostezo anunció que ya podían descansar sin miedo.'),
    ],
    [
      bed(1, `${h.name} aprendió que mirar con calma hace pequeños los miedos de la noche.`, [h.id]),
      bed(2, `${f.name} se acurrucó y cerró los ojos.`, [f.id]),
      bed(3, 'La lamparita de noche brillaba suave en un rincón.', [], ['night-lamp']),
      bed(1, 'Respiraron despacio una última vez, juntos.', both),
      bed(2, 'Ya no había ningún ruido que diera miedo.', both),
      bed(3, 'Solo se oía la respiración tranquila de los dos.', both),
      bed(2, `${h.name} le susurró a ${f.name} que había sido muy valiente.`, both),
      bed(3, 'Afuera, la luna lo vigilaba todo.'),
      bed(1, `Y así, ${pair} se durmieron hasta la mañana.`, both),
    ],
  ];
  return {
    title: `${h.name} y el ruido de la noche`, place: getScene(noise.scene), extras: creature ? [creature] : [], moral: 'Mirar con calma hace pequeños los miedos de la noche.',
    questId: `noise-${noise.id}`, variantId: noise.scene, beats, items: ['night-lamp', 'teddy-bear', 'toothbrush', ...items],
    blockIds: { opening: 'bedroom', goal: `noise-${noise.id}`, obstacle: noise.id, strategy: 'night-lamp', discovery: noise.scene, ending: 'bedroom' },
    roles: { home: 'bedroom', destination: noise.scene, creature: creature?.id ?? null },
  };
}

/** Classic contrast fables with pairs whose nature makes each one true. */
const FABLES = {
  race: { heroes: ['rabbit', 'deer', 'lynx', 'pony', 'zebra', 'tiger', 'goat'], friends: ['turtle', 'snail', 'sloth', 'armadillo'], place: 'meadow', goal: 'la carrera' },
  winter: { heroes: ['cricket', 'butterfly', 'ladybug', 'dragonfly'], friends: ['ant', 'bee', 'squirrel', 'beaver'], place: 'meadow', goal: 'el invierno' },
  'small-big': { heroes: ['lion', 'elephant', 'bear', 'tiger'], friends: ['mouse', 'ant', 'ladybug', 'hedgehog'], place: 'forest', goal: 'la red' },
};
function fableCast(random) {
  const id = choose(random, Object.keys(FABLES));
  const fable = FABLES[id];
  const pairs = fable.heroes.flatMap(hero => fable.friends.map(friend => [hero, friend]))
    .filter(([hero, friend]) => getCharacter(hero).gender === 'm' || getCharacter(friend).gender === 'm');
  const [heroId, friendId] = choose(random, pairs);
  return { fable: id, hero: copyCharacter(random, heroId), companion: copyCharacter(random, friendId) };
}

/** C4 · La fábula de contraste: two natures, one test, a turn of events and a moral before sleep. */
function fable({ random, hero: h, companion: f, fable: id }) {
  const place = getScene(FABLES[id].place);
  const there = at(place.id), snow = at('snowy-night-forest'), bed = at(fitsCast([h, f], 'bedroom') ? 'bedroom' : place.id);
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const fast = gendered(h, 'rápido', 'rápida');
  const big = gendered(h, 'grande', 'grande');
  const stories = {
    race: {
      moral: 'Despacio y sin parar, también se llega a la meta',
      beats: [
        [
          there(1, `${named(h)} presumía de ser ${gendered(h, 'el más rápido', 'la más rápida')} ${ofScene(place)}.`, [h.id]),
          there(2, place.detail),
          there(3, 'Cada mañana corría de un lado a otro sin parar.', [h.id]),
          there(1, `Un día se rio de ${f.name}, ${gendered(f, 'el', 'la')} ${f.label}, porque caminaba muy despacio.`, both),
          there(2, `${f.name} no se enfadó, y le propuso hacer una carrera.`, [f.id]),
          there(3, 'Todos los animales del prado se acercaron a mirar.'),
          there(2, `${h.name} se rio tanto que casi se cae al suelo.`, [h.id]),
          there(3, 'Pensaba que ganaría sin ningún esfuerzo.', [h.id]),
          there(1, 'Acordaron correr hasta el árbol grande del otro lado del prado.', both),
        ],
        [
          there(1, 'La carrera empezó, y ' + h.name + ` salió disparad${gendered(h, 'o', 'a')}.`, [h.id]),
          there(2, `En un momento, ${f.name} se quedó muy atrás.`, [f.id]),
          there(3, 'El polvo del camino se levantaba a su paso.', [h.id]),
          there(1, `${f.name} siguió caminando a su ritmo, paso a paso.`, [f.id]),
          there(2, 'No miraba atrás ni se preocupaba por ir despacio.', [f.id]),
          there(3, 'Respiraba tranquilamente con cada paso que daba.', [f.id]),
          there(1, `${h.name} miró atrás y no vio a nadie.`, [h.id]),
          there(2, 'Pensó que tenía tiempo de sobra para descansar.', [h.id]),
          there(3, 'El sol calentaba, y la hierba estaba blandita.'),
        ],
        [
          there(1, `${h.name} se tumbó bajo un árbol a dormir una siesta.`, [h.id]),
          there(2, 'Cerró los ojos, y empezó a soñar con su victoria.', [h.id]),
          there(3, 'Una mariposa se posó en su nariz, y ni se enteró.', [h.id]),
          there(1, `Mientras tanto, ${f.name} seguía avanzando, sin parar.`, [f.id]),
          there(2, `Pasó junto al árbol donde dormía ${h.name}, sin hacer ruido.`, both),
          there(3, 'Ni siquiera se detuvo a mirarlo.', [f.id]),
          there(1, 'Poco a poco, el árbol grande de la meta estaba cada vez más cerca.', [f.id]),
          there(2, 'Los animales del prado empezaron a animar en voz baja.'),
          there(3, 'Algunos no podían creer lo que veían.'),
        ],
        [
          there(1, `De pronto, ${h.name} se despertó y vio que el sol ya bajaba.`, [h.id]),
          there(2, 'Se levantó de un salto y corrió más rápido que nunca.', [h.id]),
          there(3, 'Sus patas casi no tocaban el suelo.', [h.id]),
          there(1, `Pero ${f.name} llegó primero a la meta.`, [f.id]),
          there(2, 'Los animales del prado aplaudieron con alegría.'),
          there(3, `${f.name} sonrió, cansad${gendered(f, 'o', 'a')} pero muy feliz.`, [f.id]),
          there(1, `${h.name} llegó un momento después, sin aliento.`, [h.id]),
          there(2, `Se quedó mirando a ${f.name} sin saber qué decir.`, both),
          there(3, 'Todavía tenía hierba en el pelo de la siesta.', [h.id]),
        ],
        [
          there(1, `${h.name} le pidió perdón a ${f.name} por haberse reído.`, both),
          there(2, `${f.name} le dio un abrazo y le dijo que no pasaba nada.`, both),
          there(3, 'Los dos se rieron de la siesta tan larga.', both),
          there(1, `${h.name} entendió que ser ${fast} no sirve de mucho si uno se detiene.`, [h.id]),
          there(2, `Y que ${f.name} había ganado porque nunca se rindió.`, [f.id]),
          there(3, 'Desde entonces, a veces paseaban juntos, cada uno a su ritmo.', both),
          bed(1, 'Esa noche, el cielo se llenó de estrellas.'),
          bed(2, `${h.name} pensó en la carrera antes de dormir.`, [h.id]),
          bed(3, 'Respiró hondo, despacio, como caminaba su amigo.'.replace('su amigo', gendered(f, 'su amigo', 'su amiga')), [h.id]),
        ],
      ],
    },
    winter: {
      moral: 'Hay tiempo para jugar y tiempo para prepararse, y compartir abriga más que una manta',
      beats: [
        [
          there(1, `Durante todo el verano, ${named(h)} solo quería jugar y cantar.`, [h.id]),
          there(2, place.detail),
          there(3, 'El sol calentaba, y las flores olían a miel.'),
          there(1, `Mientras tanto, ${f.name}, ${gendered(f, 'el', 'la')} ${f.label}, guardaba comida para el invierno.`, [f.id]),
          there(2, `${f.name} trabajaba desde la mañana hasta la noche.`, [f.id]),
          there(3, 'Llevaba semillas y granos a su casita, uno a uno.', [f.id], ['seed']),
          there(2, `${h.name} se reía y le decía que el invierno estaba muy lejos.`, [h.id]),
          there(3, `${f.name} sonreía y seguía trabajando sin parar.`, [f.id]),
          there(1, `${f.name} invitó a ${h.name} a ayudar, pero prefirió seguir jugando.`, both),
        ],
        [
          there(1, 'Llegó el otoño, y las hojas empezaron a caer.'),
          there(2, 'El viento soplaba cada vez más frío.'),
          there(3, `${h.name} tuvo que ponerse una bufanda para seguir jugando.`, [h.id]),
          there(1, `${f.name} terminó de llenar su despensa justo a tiempo.`, [f.id]),
          there(2, 'Su casita quedó calentita y llena de comida.', [f.id]),
          there(3, `${f.name} miró al cielo gris y pensó en ${h.name}.`, [f.id]),
          there(1, `${h.name} seguía cantando, pero cada vez con menos ganas.`, [h.id]),
          there(2, 'Ya no quedaban flores ni semillas en el prado.'),
          there(3, 'El suelo empezaba a cubrirse de escarcha.'),
        ],
        [
          snow(1, 'Por fin llegó el invierno, y todo se cubrió de nieve.'),
          snow(2, getScene('snowy-night-forest').detail),
          snow(3, 'Los copos caían sin hacer ningún ruido.'),
          snow(1, `${h.name} tenía frío y hambre, y no tenía nada guardado.`, [h.id]),
          snow(2, 'Buscó comida por todas partes, sin encontrar nada.', [h.id]),
          snow(3, 'Hasta sus alas temblaban de frío.'.replace('alas', ['cricket'].includes(h.id) ? 'patitas' : 'alas'), [h.id]),
          snow(1, `Entonces se acordó de ${f.name} y fue a llamar a su puerta.`, [h.id]),
          snow(2, 'Le daba un poco de vergüenza, pero no sabía qué más hacer.', [h.id]),
          snow(3, 'La ventanita de la casa brillaba con una luz cálida.'),
        ],
        [
          there(1, `${f.name} abrió la puerta y lo invitó a pasar.`.replace(' lo ', ` ${gendered(h, 'lo', 'la')} `), both),
          there(2, 'Dentro hacía calor y olía a pan recién hecho.', both),
          there(3, `${h.name} se sacudió la nieve de encima.`, [h.id]),
          there(1, `${f.name} compartió su comida con ${h.name}, sin reprocharle nada.`, both),
          there(2, `${h.name} le dio las gracias con los ojos brillantes.`, [h.id]),
          there(3, 'Se sentaron juntos junto al fuego.', both),
          there(1, `Para agradecerlo, ${h.name} cantó sus canciones más bonitas.`, [h.id]),
          there(2, `${f.name} cerró los ojos y escuchó con una sonrisa.`, [f.id]),
          there(3, 'Afuera nevaba, pero dentro todo era alegría.'),
        ],
        [
          there(1, `${h.name} prometió ayudar a ${f.name} el próximo verano.`, both),
          there(2, `${f.name} prometió guardarle un rato para jugar.`, [f.id]),
          there(3, 'Y los dos se rieron de la promesa doble.', both),
          there(1, `${h.name} entendió que hay tiempo para jugar y tiempo para prepararse.`, [h.id]),
          there(2, `Y ${f.name} entendió que la música también abriga el corazón.`, [f.id]),
          there(3, 'Pasaron el invierno juntos, contándose cuentos.', both),
          bed(1, 'Esa noche, se acurrucaron bajo una manta calentita.', both, ['blanket']),
          bed(2, `${h.name} tarareó una nana muy bajito.`, [h.id]),
          bed(3, `${f.name} ya tenía los ojos cerrados.`, [f.id]),
        ],
      ],
    },
    'small-big': {
      moral: 'Nadie es demasiado pequeño para ayudar',
      beats: [
        [
          there(1, `${named(h)} dormía la siesta a la sombra de un árbol.`, [h.id]),
          there(2, place.detail),
          there(3, 'Roncaba tan fuerte que las hojas temblaban.', [h.id]),
          there(1, `${f.name}, ${gendered(f, 'el', 'la')} ${f.label}, pasó corriendo y sin querer le hizo cosquillas en la nariz.`, both),
          there(2, `${h.name} se despertó y atrapó a ${f.name} con una pata.`, both),
          there(3, `${f.name} temblaba como una hoja en el viento.`, [f.id]),
          there(2, `${f.name} le pidió que l${gendered(f, 'o', 'a')} soltara y le prometió ayudarle algún día.`, [f.id]),
          there(3, `A ${h.name} le hizo mucha gracia aquella promesa.`, [h.id]),
          there(1, `${h.name} se rio, porque alguien tan pequeño no podría ayudarle, pero ${gendered(f, 'lo', 'la')} soltó.`, both),
        ],
        [
          there(1, `Unos días después, ${h.name} paseaba por ${placeName(place)}.`, [h.id]),
          there(2, 'Iba distraído, mirando las nubes del cielo.'.replace('distraído', gendered(h, 'distraído', 'distraída')), [h.id]),
          there(3, 'Los pájaros cantaban en las ramas altas.'),
          there(1, `De pronto, ${h.name} se enredó en una red vieja que alguien había olvidado.`, [h.id], ['net']),
          there(2, 'Cuanto más se movía, más se enredaba.', [h.id], ['net']),
          there(3, 'La red era fuerte, y los nudos estaban muy apretados.', [], ['net']),
          there(1, `${h.name} pidió ayuda con todas sus fuerzas.`, [h.id]),
          there(2, 'Pero nadie lo oía en aquella parte del bosque.'.replace(' lo ', ` ${gendered(h, 'lo', 'la')} `), [h.id]),
          there(3, `${h.name} se sintió muy ${gendered(h, 'solo', 'sola')}, sin poder hacer nada.`, [h.id]),
        ],
        [
          there(1, `${f.name} oyó la voz de ${h.name} y fue corriendo.`, [f.id]),
          there(2, `Cuando llegó, vio a ${h.name} atrapad${gendered(h, 'o', 'a')} en la red.`, both, ['net']),
          there(3, `${f.name} respiró hondo para no asustarse.`, [f.id]),
          there(1, `${f.name} empezó a mordisquear las cuerdas de la red, una a una.`, [f.id], ['net']),
          there(2, 'Era un trabajo lento, pero no se rindió.', [f.id]),
          there(3, `${h.name} se quedó muy quiet${gendered(h, 'o', 'a')} para ayudar.`, [h.id]),
          there(1, 'Por fin, la red se rompió, y quedó libre.', both, ['net']),
          there(2, `${h.name} se estiró, aliviad${gendered(h, 'o', 'a')}, sintiéndose libre otra vez.`, [h.id]),
          there(3, 'Los pájaros volvieron a cantar en las ramas.'),
        ],
        [
          there(1, `${h.name} le dio las gracias a ${f.name} con los ojos llenos de lágrimas.`, both),
          there(2, `Le pidió perdón por haberse reído de su promesa.`, [h.id]),
          there(3, `${f.name} se encogió de hombros, contento.`.replace('contento', gendered(f, 'contento', 'contenta')), [f.id]),
          there(1, `${f.name} le dijo que los amigos se ayudan, sean del tamaño que sean.`, [f.id]),
          there(2, `${h.name} se agachó para mirarle a los ojos.`, [h.id]),
          there(3, 'Por primera vez, se vieron como iguales.', both),
          there(1, 'Desde aquel día, fueron los mejores amigos del bosque.', both),
          there(2, `${h.name} llevaba a ${f.name} sobre su lomo para enseñarle el mundo desde arriba.`, both),
          there(3, `${f.name} le enseñaba los caminos pequeños que nadie veía.`, [f.id]),
        ],
        [
          there(1, `${h.name} aprendió que nadie es demasiado pequeño para ayudar.`, [h.id]),
          there(2, 'Y que una promesa vale lo mismo venga de quien venga.', [h.id]),
          there(3, 'Los demás animales también aprendieron la lección.'),
          there(1, 'Al caer la tarde, volvieron juntos a casa.', both),
          there(2, 'El sol pintaba el bosque de color naranja.'),
          there(3, `${f.name} se quedó dormid${gendered(f, 'o', 'a')} sobre el lomo de ${h.name}.`, both),
          bed(1, 'Esa noche, el bosque entero se quedó en calma.'),
          bed(2, `${h.name} pensó en su nuevo amigo antes de cerrar los ojos.`.replace('su nuevo amigo', gendered(f, 'su nuevo amigo', 'su nueva amiga')), [h.id]),
          bed(3, 'Respiró despacio, una, dos y tres veces.', [h.id]),
        ],
      ],
    },
  };
  const story = stories[id];
  story.beats.push([
    bed(1, `${h.name} recordó la enseñanza del día: ${low(story.moral)}.`, [h.id]),
    bed(2, 'La lamparita de noche brillaba suave en un rincón.', [], ['night-lamp']),
    bed(3, 'Afuera, un grillo cantaba una nana.'),
    bed(1, `${f.name} también estaba descansando, muy cerca.`, [f.id]),
    bed(2, 'Todo estaba en silencio y en calma.'),
    bed(3, 'Los ojos se le cerraron poquito a poco.', [h.id]),
    bed(2, `${h.name} se tapó con su manta favorita.`, [h.id], ['blanket']),
    bed(3, 'El viento se quedó quieto entre las ramas.'),
    bed(1, `Y así, con una sonrisa, ${h.name} se durmió tranquilamente.`, [h.id]),
  ]);
  return {
    title: `${h.name} y ${f.name}: una fábula`, place, moral: `${story.moral}.`, questId: `fable-${id}`, variantId: `${h.id}-${f.id}`, beats: story.beats,
    items: id === 'small-big' ? ['net'] : id === 'winter' ? ['seed', 'blanket'] : ['night-lamp'],
    blockIds: { opening: place.id, goal: `fable-${id}`, obstacle: h.id, strategy: f.id, discovery: id, ending: 'bedroom' },
    roles: { home: place.id, destination: place.id, fable: id },
  };
}
const ofScene = place => `${place.article === 'la' ? 'de la' : 'del'} ${place.name}`;

/** Dream journeys: what carries the dreamer, and how each dream place feels and breathes. */
const VEHICLES = [
  { item: 'cloud', text: 'una nube suave como un cojín' },
  { item: 'boat', text: 'un barquito que navegaba por el aire' },
  { item: 'paper-plane', text: 'un avión de papel enorme y silencioso' },
  { scene: 'moon-boat', text: 'la luna, que se había convertido en barca' },
];
const DREAMS = {
  'cloud-sea': { feel: 'Las nubes eran blanditas y olían a algodón dulce.', breathe: 'Respiraron hondo, y el aire sabía a fresa.' },
  'firefly-field': { feel: 'Las luciérnagas encendían caminitos de luz sobre la hierba.', breathe: 'Contaron diez lucecitas mientras respiraban despacio.' },
  'lily-pond': { feel: 'Los nenúfares se mecían sobre el agua quieta.', breathe: 'Respiraron al ritmo de las ondas del agua.' },
  'shooting-star-hill': { feel: 'Las estrellas fugaces cruzaban el cielo sin hacer ruido.', breathe: 'Por cada estrella, soltaron el aire muy despacio.' },
  'snowy-night-forest': { feel: 'La nieve caía tan suave que no hacía ningún ruido.', breathe: 'Respiraron el aire frío y limpio del bosque.' },
  'moon-boat': { feel: 'La barca de la luna se mecía entre nubes y estrellas.', breathe: 'Se mecieron con ella, respirando despacito.' },
  'sunset-beach': { feel: 'Las olas llegaban a la orilla y se iban, una y otra vez.', breathe: 'Respiraron como las olas: llegar, quedarse y volver.' },
  'dandelion-garden': { feel: 'Las semillas de diente de león flotaban como plumitas.', breathe: 'Soplaron muy suave, y las semillas bailaron a su alrededor.' },
};

/** C5 · El viaje del sueño: in bed, a gentle vehicle visits three dream places, one breath at a time. */
function dreamJourney({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const vehicle = choose(random, VEHICLES);
  const pool = Object.keys(DREAMS).filter(id => id !== vehicle.scene && fitsCast(cast, id));
  const stops = [];
  for (let i = 0; i < 3; i += 1) stops.push(choose(random, pool.filter(id => !stops.includes(id))));
  const both = [h.id, f.id];
  const home = getScene(choose(random, RELAX_HOMES.filter(id => fitsCast(cast, id))));
  const bed = at(bedFor(cast, home)), ride = at(vehicle.scene || stops[0]);
  const [one, two, three] = stops.map(id => at(id));
  const place = id => getScene(id);
  const vehicleItems = vehicle.item ? [vehicle.item] : [];
  const beats = [
    [
      bed(1, `Esa noche, ${named(h)} se metió en la cama con mucho sueño.`, [h.id]),
      bed(3, 'Se prepararon para descansar y dejaron atrás las prisas del día.'),
      bed(2, 'Su osito de peluche estaba en la almohada, esperándolo.'.replace('esperándolo', `esperándo${gendered(h, 'lo', 'la')}`), [], ['teddy-bear', 'pillow']),
      bed(3, `Cerró los ojos y respiró despacio tres veces.`, [h.id]),
      bed(2, 'Con cada respiración, el cuerpo se le volvía más blandito.', [h.id]),
      bed(3, 'La habitación estaba en calma y todo invitaba a descansar.'),
      ride(1, `Entonces soñó que llegaba ${vehicle.text}.`, [h.id], vehicleItems),
      ride(2, `Allí ya esperaba su ${friendWord(f)} ${f.name}, sonriendo.`, [f.id]),
      ride(1, `${h.name} se subió junto a su ${friendWord(f)} ${f.name}, y empezaron un viaje muy tranquilo.`, both, vehicleItems),
    ],
    [
      one(1, `Primero llegaron ${toPlace(place(stops[0]))}.`, both),
      one(2, place(stops[0]).detail),
      one(3, 'Todo se movía muy despacio, como en cámara lenta.'),
      one(1, DREAMS[stops[0]].feel, both),
      one(2, `${f.name} señaló algo bonito, y ${h.name} sonrió.`, both),
      one(3, 'No hacía falta hablar para estar a gusto.', both),
      one(1, DREAMS[stops[0]].breathe, both),
      one(2, 'El cuerpo de los dos se sentía ligero como una pluma.', both),
      one(3, 'Se quedaron allí un ratito, sin ninguna prisa.', both),
    ],
    [
      two(1, `Después, el viaje los llevó ${toPlace(place(stops[1]))}.`, both),
      two(2, place(stops[1]).detail),
      two(3, 'Una brisa tibia les acariciaba la cara.', both),
      two(1, DREAMS[stops[1]].feel, both),
      two(2, `${h.name} sintió los brazos pesados y calentitos.`, [h.id]),
      two(3, `${f.name} bostezó despacio, y ${h.name} también.`, both),
      two(1, DREAMS[stops[1]].breathe, both),
      two(2, 'Cada vez se sentían más tranquilos.', both),
      two(3, 'Los sonidos se volvieron suaves y lejanos.'),
    ],
    [
      three(1, `Por último, llegaron ${toPlace(place(stops[2]))}.`, both),
      three(2, place(stops[2]).detail),
      three(3, 'Era el lugar más tranquilo de todos.', both),
      three(1, DREAMS[stops[2]].feel, both),
      three(2, `${h.name} sintió las piernas pesadas y relajadas.`, [h.id]),
      three(3, 'Hasta los dedos de los pies estaban tranquilos.', [h.id]),
      three(1, DREAMS[stops[2]].breathe, both),
      three(2, `${f.name} le dijo que era hora de volver a casa.`, [f.id]),
      three(3, 'Se despidieron del lugar con la mano.', both),
    ],
    [
      ride(1, `El viaje los llevó de vuelta, muy despacito.`, both, vehicleItems),
      ride(2, 'Abajo se veían las casas dormidas y las luces apagadas.'),
      ride(3, 'Las estrellas los acompañaban por el camino.'),
      ride(1, `${f.name} le dio las buenas noches a ${h.name} con un abrazo.`, both),
      ride(2, 'Le prometió que volverían a viajar otra noche.', [f.id]),
      ride(3, 'Luego se fue flotando hacia su propia casa.', [f.id]),
      bed(1, `${h.name} volvió a su cama, que estaba calentita.`, [h.id]),
      bed(2, 'El cuerpo se fue aflojando un poquito más con cada respiración.'),
      bed(3, 'Recordaron su momento favorito y se quedaron con aquella sensación agradable.'),
    ],
    [
      bed(1, `${h.name} respiró hondo una última vez.`, [h.id]),
      bed(2, 'Soltó el aire muy despacio, como si apagara una vela.', [h.id]),
      bed(3, 'Afuera, la noche estaba en silencio.'),
      bed(1, `${h.name} aprendió que la calma también puede llevarnos de viaje.`, [h.id]),
      bed(2, 'Y que los mejores viajes empiezan con los ojos cerrados.', [h.id]),
      bed(3, 'Afuera, el mundo también parecía descansar un poquito con ellos.'),
      bed(2, 'Todo su cuerpo descansaba, del pelo a los pies.', [h.id]),
      bed(3, 'Los sueños bonitos ya lo esperaban.'.replace(' lo ', ` ${gendered(h, 'lo', 'la')} `), [h.id]),
      bed(1, `Y así, muy tranquilamente, ${h.name} se durmió.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y el viaje del sueño`, place: getScene(stops[0]), moral: 'La calma también puede llevarnos de viaje.',
    questId: `dream-${vehicle.item || vehicle.scene}`, variantId: stops.join('-'), beats, items: [...vehicleItems, 'pillow', 'teddy-bear'],
    blockIds: { opening: home.id, goal: `dream-${vehicle.item || vehicle.scene}`, obstacle: stops[0], strategy: stops[1], discovery: stops[2], ending: 'bedroom' },
    roles: { home: home.id, destination: stops[0], stops },
  };
}

/** Moments of an ordinary day worth remembering at night. */
const MOMENTS = [
  { scene: 'kitchen', text: 'cuando hicieron galletas y la masa se les pegó en la nariz', items: ['cookies'] },
  { scene: 'meadow', text: 'cuando hicieron volar la cometa en el prado', items: ['kite'] },
  { scene: 'lily-pond', text: 'cuando vieron una rana saltar al estanque' },
  { scene: 'playroom', text: 'cuando construyeron una torre con cajas de cartón', items: ['cardboard-box'] },
  { scene: 'market', text: 'cuando probaron una manzana nueva en el mercado', items: ['apple'] },
  { scene: 'porch', text: 'cuando miraron caer la lluvia desde el porche' },
  { scene: 'living-room', text: 'cuando leyeron un libro de cuentos en el sofá', items: ['storybook'] },
  { scene: 'garden', text: 'cuando regaron las flores con la regadera', items: ['watering-can', 'flower'] },
  { scene: 'playground', text: 'cuando jugaron a la pelota hasta cansarse', items: ['ball'] },
];

/** C6 · Tres cosas bonitas: at bedtime, two friends remember three good moments and fall asleep grateful. */
function threeThings({ random, hero: h, companion: f }) {
  const moment = choose(random, MOMENTS);
  const picks = [moment,
    { scene: moment.scene, text: 'cuando compartieron una sonrisa mientras disfrutaban de aquel momento' },
    { scene: moment.scene, text: 'cuando se dieron las gracias por haberse hecho compañía' },
  ];
  const both = [h.id, f.id];
  const pair = `${h.name} y ${f.name}`;
  const bed = at('bedroom');
  const [one, two, three] = picks.map(moment => at(moment.scene));
  const remember = (index, who) => `${who} recordó ${picks[index].text}.`;
  const beats = [
    [
      bed(1, `Al final de un día largo, ${named(f)} se quedó a dormir en casa de ${h.name}.`, both),
      bed(2, getScene('bedroom').detail),
      bed(3, 'Se prepararon para descansar y dejaron atrás las prisas del día.'),
      bed(1, `${h.name} propuso un juego: recordar tres cosas bonitas del día.`, [h.id]),
      bed(2, `A ${f.name} le pareció una idea estupenda.`, [f.id]),
      bed(3, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      bed(2, 'La habitación estaba en calma y todo invitaba a descansar.'),
      bed(3, `${h.name} cerró los ojos para pensar mejor.`, [h.id]),
      bed(1, 'Cerraron los ojos y empezaron a recordar.', both),
    ],
    [
      one(1, remember(0, h.name), both, picks[0].items || []),
      one(2, getScene(picks[0].scene).detail),
      one(3, 'Solo de pensarlo, les dio la risa.', both),
      one(1, `${f.name} dijo que esa había sido su parte favorita.`, [f.id]),
      one(2, 'Lo recordaron con todos los detalles, despacito.', both),
      one(3, 'Hasta parecía que podían oler el momento.', both),
      bed(1, 'Respiraron hondo, dando las gracias por aquel ratito.', both),
      bed(2, 'Sus cuerpos se fueron relajando poco a poco.', both),
      bed(3, 'Afuera, la noche estaba muy tranquila.'),
    ],
    [
      two(1, remember(1, f.name), both, picks[1].items || []),
      two(2, `${f.name} había compartido ese rato sin pedir nada a cambio.`, [f.id]),
      two(3, `${h.name} sonrió con los ojos cerrados.`, [h.id]),
      two(1, `${h.name} dijo que se había sentido muy feliz en ese momento.`, [h.id]),
      two(2, 'Recordaron los colores, los sonidos y las risas.', both),
      two(3, `${f.name} imitó un sonido de aquel rato, muy bajito.`, [f.id]),
      bed(1, 'Volvieron a respirar hondo, despacio y sin prisa.', both),
      bed(2, 'Las manos y los pies se quedaron quietos y calentitos.', both),
      bed(3, 'El cuerpo se fue aflojando un poquito más con cada respiración.'),
    ],
    [
      three(1, remember(2, h.name), both, picks[2].items || []),
      three(2, 'Aquel mismo lugar parecía más especial al recordarlo juntos.', both),
      three(3, `${f.name} dijo que era la tercera cosa más bonita del día.`, [f.id]),
      three(1, `${pair} se dieron cuenta de que el día había estado lleno de cosas pequeñas y buenas.`, both),
      three(2, 'Ninguna era enorme, pero todas eran especiales.', both),
      three(3, `${h.name} pensó que mañana buscaría más cosas así.`, [h.id]),
      bed(1, 'Entonces dieron las gracias por esas tres cosas, en voz bajita.', both),
      bed(2, 'Sintieron el corazón calentito y tranquilo.', both),
      bed(3, 'Ya casi no podían mantener los ojos abiertos.', both),
    ],
    [
      bed(1, `${f.name} le dio las buenas noches a ${h.name}.`, both),
      bed(2, `${h.name} le contestó con un bostezo.`, [h.id]),
      bed(3, 'Los dos se rieron sin hacer ruido.', both),
      bed(1, 'Respiraron hondo por última vez, como si olieran una flor.', both),
      bed(2, 'Y soltaron el aire despacio, como si apagaran una vela.', both),
      bed(3, 'Recordaron su momento favorito y se quedaron con aquella sensación agradable.'),
      bed(1, 'Afuera, la luna brillaba sobre las casas dormidas.'),
      bed(2, 'Afuera, el mundo también parecía descansar un poquito con ellos.'),
      bed(3, 'El reloj hacía tictac, tictac, muy lejos.'),
    ],
    [
      bed(1, `${h.name} aprendió que un día lleno de cosas pequeñas y buenas es un gran día.`, [h.id]),
      bed(2, 'Y que dar las gracias ayuda a dormir con una sonrisa.', [h.id]),
      bed(3, `${f.name} ya respiraba muy despacito, con los ojos cerrados.`, [f.id]),
      bed(1, `${h.name} pensó en las tres cosas una última vez.`, [h.id]),
      bed(2, 'Una, dos y tres, como tres estrellitas.', [h.id]),
      bed(3, 'Y cada una brillaba un poquito.', [h.id]),
      bed(2, 'Los párpados le pesaban como cortinas suaves.', [h.id]),
      bed(3, 'Todo estaba en calma en la habitación.'),
      bed(1, `Y así, ${pair} se durmieron muy tranquilos.`, both),
    ],
  ];
  return {
    title: `${h.name} y las tres cosas bonitas`, place: getScene('bedroom'), moral: 'Un día lleno de cosas pequeñas y buenas es un gran día.',
    questId: 'three-things', variantId: picks.map(moment => moment.scene).join('-'), beats, items: picks.flatMap(moment => moment.items || []),
    blockIds: { opening: 'bedroom', goal: 'three-things', obstacle: picks[0].scene, strategy: picks[1].scene, discovery: picks[2].scene, ending: 'bedroom' },
    roles: { home: 'bedroom', destination: picks[0].scene, moments: picks.map(moment => moment.scene) },
  };
}

/** Worries for tomorrow, where they happen and a small plan that makes them lighter. */
const WORRIES = [
  { id: 'school', scene: 'school', worry: 'al día siguiente empezaba en una escuela nueva', fear: 'Le daba miedo no conocer a nadie.', plan: 'saludar a alguien con una sonrisa y llevar su estuche favorito', items: ['pencil-case'] },
  { id: 'clinic', scene: 'clinic', worry: 'al día siguiente tenía que ir a la consulta', fear: 'Le daba miedo no saber qué iban a hacerle.', plan: 'llevar su osito de peluche y preguntar todo lo que quisiera', items: ['teddy-bear'] },
  { id: 'train', scene: 'train-station', worry: 'al día siguiente iba a viajar en tren por primera vez', fear: 'Le daba miedo el ruido y perderse en la estación.', plan: 'darle la mano a alguien y mirar el paisaje por la ventanilla', items: [] },
  { id: 'theater', scene: 'little-theater', worry: 'al día siguiente tenía que actuar en el teatrito', fear: 'Le daba miedo olvidarse de su frase.', plan: 'decir su frase despacio, mirando a alguien de confianza', items: [] },
  { id: 'race', scene: 'race-track', worry: 'al día siguiente era la carrera de la escuela', fear: 'Le daba miedo llegar al final, detrás de todos.', plan: 'correr a su ritmo y disfrutar del camino', items: [] },
  { id: 'swim', scene: 'beach', worry: 'al día siguiente iba a aprender a nadar', fear: 'Le daba miedo el agua profunda.', plan: 'usar el flotador y quedarse cerca de la orilla', items: ['float-ring'] },
];
const CALM_TOOLS = [
  { item: 'worry-box', gift: 'una caja de las preocupaciones', definite: 'la caja de las preocupaciones', ritual: who => `${who} susurró su preocupación dentro de la caja de las preocupaciones y la cerró.` },
  { item: 'smooth-stone', gift: 'una piedra lisa para frotarla cuando sintiera nervios', definite: 'la piedra lisa', ritual: who => `${who} frotó la piedra lisa despacito y notó cómo se calmaba.` },
  { item: 'calm-jar', gift: 'un tarro de la calma lleno de purpurina', definite: 'el tarro de la calma', ritual: who => `${who} agitó el tarro de la calma y miró caer la purpurina hasta el fondo.` },
];

/** C7 · La preocupación que se encoge: a worry for tomorrow, a wise visitor, a calm ritual and a small plan. */
function worry({ random, hero: h, companion: f }) {
  const cast = [h, f];
  const item = choose(random, WORRIES.filter(entry => fitsCast(cast, entry.scene)));
  const tool = choose(random, CALM_TOOLS);
  const mentor = f;
  const both = [h.id, f.id];
  const bed = at('bedroom'), there = at(item.scene);
  const beats = [
    [
      bed(1, `Esa noche, ${named(h)} no conseguía dormirse.`, [h.id]),
      bed(2, getScene('bedroom').detail),
      bed(3, 'Daba vueltas y más vueltas en la cama.', [h.id]),
      there(1, `${h.name} pensaba que ${item.worry}.`, [h.id], item.items),
      there(2, getScene(item.scene).detail),
      there(3, item.fear, [h.id]),
      bed(1, 'La preocupación le pesaba en la barriga como una piedra.', [h.id]),
      bed(2, 'Cuanto más pensaba en ella, más grande se hacía.', [h.id]),
      bed(3, 'La habitación estaba en calma y todo invitaba a descansar.'),
    ],
    [
      bed(1, `Entonces llegó ${named(mentor)} que había venido a darle las buenas noches.`, [mentor.id]),
      bed(2, `${mentor.name} se sentó en el borde de la cama.`, [mentor.id]),
      bed(3, `Notó enseguida que algo le pasaba a ${h.name}.`, [mentor.id]),
      bed(1, `${h.name} le contó su preocupación, muy bajito.`, [h.id, mentor.id]),
      bed(2, `${mentor.name} escuchó sin interrumpir, asintiendo despacio.`, [mentor.id]),
      bed(3, 'Afuera, el viento movía las hojas suavemente.'),
      bed(1, `${mentor.name} le dijo que todas las preocupaciones se encogen cuando las compartimos.`, [mentor.id]),
      bed(2, 'Y que hablar de ellas ya era un paso muy valiente.', [mentor.id]),
      bed(3, `${h.name} sintió que la piedra de la barriga pesaba un poco menos.`, [h.id]),
    ],
    [
      bed(1, `${mentor.name} le regaló ${tool.gift}.`, [mentor.id, h.id], [tool.item]),
      bed(2, 'Le explicó que podía usarla siempre que lo necesitara.', [mentor.id]),
      bed(3, `${h.name} miró el regalo con mucha curiosidad.`, [h.id]),
      bed(1, tool.ritual(h.name), [h.id], [tool.item]),
      bed(2, 'Luego respiraron juntos, despacio, tres veces.', [h.id, mentor.id]),
      bed(3, 'El aire entraba fresco y salía tibio.', [h.id]),
      bed(1, `Poco a poco, la preocupación de ${h.name} se hizo pequeñita.`, [h.id]),
      bed(2, 'Ya no ocupaba toda la barriga, solo un rinconcito.', [h.id]),
      bed(3, `${mentor.name} sonrió al ver su cara más tranquila.`, [mentor.id]),
    ],
    [
      bed(1, `Después, pensaron juntos un plan pequeño: ${item.plan}.`, [h.id, mentor.id], item.items),
      bed(2, 'Un plan pequeño era más fácil que una preocupación grande.', [h.id]),
      bed(3, `${h.name} lo repitió dos veces para no olvidarlo.`, [h.id]),
      bed(1, `${f.name} prometió acompañar a ${h.name} cuando llegara el momento.`, [mentor.id]),
      bed(2, `${f.name} siempre sabía cómo hacerle reír.`, [f.id]),
      bed(3, 'Solo de pensarlo, se le escapó una sonrisa.', [h.id]),
      there(1, `${h.name} imaginó el día de mañana, y esta vez salía bien.`, [h.id, f.id], item.items),
      there(2, `En su imaginación, ${f.name} le daba la mano y todo era más fácil.`, [h.id, f.id]),
      there(3, 'Hasta el lugar parecía más amable que antes.'),
    ],
    [
      bed(1, `${mentor.name} le dio un beso en la frente y apagó la luz grande.`, [mentor.id, h.id]),
      bed(2, 'Le dijo que estaría cerca si lo necesitaba.'.replace(' lo ', ` ${gendered(h, 'lo', 'la')} `), [mentor.id]),
      bed(3, 'La puerta quedó entreabierta, con un hilito de luz.'),
      bed(1, `${h.name} se acomodó para descansar, con la respiración más tranquila.`, [h.id]),
      bed(2, 'Respiró hondo, como si oliera una flor.', [h.id]),
      bed(3, 'Y soltó el aire, como si apagara una vela.', [h.id]),
      bed(1, 'La preocupación se había quedado quietecita en su rincón.', [h.id]),
      bed(2, 'Ya no daba miedo; solo era una cosita pequeña.', [h.id]),
      bed(3, 'Afuera, el mundo también parecía descansar un poquito con ellos.'),
    ],
    [
      bed(1, `${h.name} aprendió que las preocupaciones se encogen cuando las compartimos.`, [h.id]),
      bed(2, 'Y que un plan pequeño puede con un miedo grande.', [h.id]),
      bed(3, `Dejó ${tool.definite} junto a la cama, por si acaso.`, [h.id], [tool.item]),
      bed(1, 'Afuera, la noche estaba tranquila y llena de estrellas.'),
      bed(2, 'Mañana sería un día nuevo, y estaría preparado.'.replace('preparado', gendered(h, 'preparado', 'preparada')), [h.id]),
      bed(3, 'Los ojos se le cerraron poquito a poco.', [h.id]),
      bed(2, 'Su respiración se volvió lenta y suave.', [h.id]),
      bed(3, 'Recordaron su momento favorito y se quedaron con aquella sensación agradable.'),
      bed(1, `Y así, más tranquilo que nunca, ${h.name} se durmió.`.replace('tranquilo', gendered(h, 'tranquilo', 'tranquila')), [h.id]),
    ],
  ];
  return {
    title: `${h.name} y la preocupación que se encogió`, place: getScene(item.scene), moral: 'Las preocupaciones se encogen cuando las compartimos.',
    questId: `worry-${item.id}`, variantId: tool.item, beats, items: [tool.item, ...item.items],
    blockIds: { opening: 'bedroom', goal: `worry-${item.id}`, obstacle: item.scene, strategy: tool.item, discovery: mentor.id, ending: 'bedroom' },
    roles: { home: 'bedroom', destination: item.scene, mentor: mentor.id },
  };
}

const land = (h, f) => !needsWater([h, f]);
export const RELAX_STRUCTURES = Object.freeze([
  { id: 'hurry', name: 'La prisa', generate: hurry },
  { id: 'goodnight', name: 'Buenas noches a todo', accept: land, generate: goodnight },
  { id: 'night-noise', name: 'El ruido de la noche', accept: land, generate: nightNoise },
  { id: 'fable', name: 'La fábula de contraste', cast: fableCast, generate: fable },
  { id: 'dream-journey', name: 'El viaje del sueño', accept: land, generate: dreamJourney },
  { id: 'three-things', name: 'Tres cosas bonitas', accept: land, generate: threeThings },
  { id: 'worry', name: 'La preocupación que se encoge', accept: land, generate: worry },
]);
export const RELAX_GOAL_IDS = [...RELAX_GOALS.map(goal => goal.id), 'goodnight', ...NOISES.map(entry => `noise-${entry.id}`), ...Object.keys(FABLES).map(id => `fable-${id}`),
  ...VEHICLES.map(entry => `dream-${entry.item || entry.scene}`), 'three-things', ...WORRIES.map(entry => `worry-${entry.id}`)];
