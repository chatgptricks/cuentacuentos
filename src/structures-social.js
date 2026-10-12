import { getScene } from './world-catalog.js';
import { ABILITIES, AQUATIC, fitsCast, friendWord, inPlace, named, needsWater, toPlace } from './narrative-world.js';
import { CHARACTERS } from './character-catalog.js';
import { FAMILY_HOMES, FRIEND_HOMES } from './quest-catalog.js';
import { FRIEND_GOALS, FAMILY_GOALS, SOCIAL_OBSTACLES } from './story-blocks.js';
import { applyStoryLanguage } from './story-language.js';
import { familyStoryMoment } from './family-story.js';
import { at, choose, sayer, copyCharacter, copySupporting, gendered } from './story-kit.js';

/** D1/E1 · El plan compartido: an idea at home, preparation, a complication, a shared solution and the way back. */
function activity({ random, hero: h, companion: c, family, bookId }) {
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
      there(1, `${h.name} probó la idea, y funcionó.`, [h.id], things),
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
  return {
    title: `${h.name} y ${c.name}: ${g.title}`, place, questId: g.id, variantId: o.id, beats, items: things, lexicon, drawnOnly: true,
    blockIds: { opening: home.id, goal: g.id, obstacle: o.id, strategy: o.id, discovery: g.id, ending: home.id },
    roles: { home: home.id, destination: place.id },
  };
}

/** Things two children can share; each one tells what they look like doing it. */
const INTERESTS = [
  { item: 'ball', offer: 'jugar a la pelota', doing: 'botaba una pelota en un rincón', together: 'Jugaron a pasarse la pelota sin que tocara el suelo.' },
  { item: 'kite', offer: 'hacer volar una cometa', doing: 'miraba una cometa con mucha atención', together: 'Hicieron volar la cometa entre los dos.' },
  { item: 'crayons', offer: 'dibujar con crayones', doing: 'dibujaba en silencio con unos crayones', together: 'Dibujaron juntos un mural lleno de animales con los crayones.' },
  { item: 'storybook', offer: 'leer un libro de cuentos', doing: 'leía un libro de cuentos a escondidas', together: 'Leyeron el libro de cuentos haciendo voces graciosas.' },
  { item: 'puzzle', offer: 'armar un rompecabezas', doing: 'armaba un rompecabezas pieza a pieza', together: 'Terminaron el rompecabezas juntos, entre muchas risas.' },
  { item: 'marbles', offer: 'jugar a las canicas', doing: 'hacía rodar unas canicas por el suelo', together: 'Inventaron un circuito de curvas para las canicas.' },
  { item: 'spinning-top', offer: 'hacer bailar una peonza', doing: 'hacía bailar una peonza sin parar', together: 'Hicieron bailar dos peonzas a la vez.' },
  { item: 'paper-plane', offer: 'lanzar aviones de papel', doing: 'doblaba un avión de papel con cuidado', together: 'Lanzaron aviones de papel para ver cuál volaba más lejos.' },
  { item: 'jump-rope', offer: 'saltar a la cuerda de saltar', doing: 'saltaba a la cuerda de saltar sin cansarse', together: 'Saltaron a la cuerda de saltar contando hasta cien.' },
];
const ORIGINS = ['mountain', 'beach', 'snowy-valley', 'desert-oasis', 'harbor', 'forest', 'river', 'bamboo-grove'];

/** D2 · El amigo nuevo: a shy newcomer, a first try that fails, a shared interest and a friendship. */
function newFriend({ random, hero: h, companion: c }) {
  const first = choose(random, INTERESTS);
  const shared = choose(random, INTERESTS.filter(entry => entry !== first));
  const origin = getScene(choose(random, ORIGINS));
  const home = getScene(choose(random, FRIEND_HOMES.filter(id => fitsCast([h, c], id))));
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const school = at('school'), yard = at('playground'), atHome = at(home.id);
  const shy = gendered(c, 'tímido', 'tímida');
  const newcomer = gendered(c, 'un compañero nuevo', 'una compañera nueva');
  const beats = [
    [
      school(1, `Aquella mañana, llegó a la escuela ${newcomer}: ${named(c)} que venía ${ofOrigin(origin)}.`, [c.id]),
      school(2, getScene('school').detail),
      school(3, `${h.name} le hizo un saludo pequeño desde su sitio.`, both),
      school(1, `${c.name} era muy ${shy} y casi no levantaba la vista del suelo.`, [c.id]),
      school(2, `${named(h)} l${gendered(c, 'o', 'a')} miró con curiosidad desde su pupitre.`, [h.id]),
      school(3, `${c.name} se sentó en el último pupitre, solito.`.replace('solito', gendered(c, 'solito', 'solita')), [c.id]),
      school(2, `${h.name} pensó que debía de ser difícil llegar a un sitio nuevo.`, [h.id]),
      school(3, 'La mañana pasó entre números y canciones.'),
      school(1, `${h.name} decidió que en el recreo intentaría hablar con ${c.name}.`, [h.id]),
    ],
    [
      yard(1, `En el recreo, ${h.name} le propuso a ${c.name} ${first.offer}.`, both, [first.item]),
      yard(2, getScene('playground').detail),
      yard(3, `${h.name} le enseñó su juguete con mucha ilusión.`, [h.id], [first.item]),
      yard(1, `Pero ${c.name} negó con la cabeza y se quedó en un rincón.`, [c.id]),
      yard(2, `${h.name} se sintió un poco desanimad${gendered(h, 'o', 'a')}.`, [h.id]),
      yard(3, 'Los demás seguían jugando y gritando por todo el patio.'),
      yard(2, `Aun así, no quiso rendirse tan pronto.`, [h.id]),
      yard(3, `Miró a ${c.name} de lejos, pensando qué hacer.`, [h.id]),
      yard(1, `Entonces ${h.name} vio que ${c.name} ${shared.doing}.`, [c.id], [shared.item]),
    ],
    [
      yard(1, `A ${h.name} también le encantaba aquello, así que se acercó despacito.`, both),
      yard(2, `Le dijo a ${c.name} que era su juego favorito del mundo.`, both),
      yard(3, `${c.name} levantó la vista del suelo, sorprendid${gendered(c, 'o', 'a')}.`, [c.id]),
      yard(1, `Por primera vez en todo el día, ${c.name} sonrió.`, [c.id]),
      yard(2, `${c.name} le hizo un sitio a su lado sin decir nada.`, both),
      yard(3, 'A veces, una sonrisa vale más que muchas palabras.'),
      yard(1, shared.together, both, [shared.item]),
      yard(2, 'Se rieron tanto que se les olvidó el resto del recreo.', both),
      yard(3, `Ya hablaban con confianza mientras seguían jugando juntos.`, both),
    ],
    [
      yard(1, `Mientras jugaban, ${c.name} le contó que echaba de menos a sus antiguos amigos.`, [c.id]),
      yard(2, 'Por eso le costaba tanto hablar con gente nueva.', [c.id]),
      yard(3, `${h.name} escuchó con mucha atención, sin interrumpir.`, [h.id]),
      yard(1, `${h.name} le dijo que podía contar con su amistad desde ese momento.`, both),
      yard(2, `A ${c.name} le brillaron los ojos.`, [c.id]),
      yard(3, 'Sonó el timbre, pero ya no tenían ganas de separarse.', both),
      school(1, `De vuelta en clase, ${h.name} le presentó a sus otros amigos.`, both),
      school(2, `Todos le hicieron preguntas sobre el lugar de donde venía.`, [c.id]),
      school(3, `${c.name} les contó cosas ${ofOrigin(origin)} que nadie conocía.`, [c.id]),
    ],
    [
      school(1, 'Al final del día, ya parecía que se conocían de siempre.', both),
      school(2, `Se despidieron de la escuela con ganas de seguir jugando.`, both),
      school(3, 'Salieron juntos de la escuela, hablando sin parar.', both),
      atHome(1, `${h.name} invitó a ${c.name} a merendar en su casa.`, both),
      atHome(2, `Su casa estaba ${inPlace(home)}, a pocos pasos de la escuela.`, both),
      atHome(3, 'Siguieron con su juego compartido hasta el atardecer.', both, [shared.item]),
      atHome(1, `${h.name} le enseñó sus juguetes, y ${c.name} sus historias.`, both),
      atHome(2, 'Se dieron cuenta de que tenían muchas cosas en común.', both),
      atHome(3, `${c.name} prometió traer algo ${ofOrigin(origin)} al día siguiente.`, [c.id]),
    ],
    [
      atHome(1, `${h.name} aprendió que dar el primer paso puede cambiarle el día a alguien.`, [h.id]),
      atHome(2, 'Y que la timidez se va cuando alguien nos hace un sitio.', [h.id]),
      atHome(3, `${c.name} volvió a casa dando saltitos.`, [c.id]),
      atHome(1, `Desde entonces, ${pair} fueron inseparables.`, both),
      atHome(2, 'Cada recreo jugaban juntos a algo nuevo.', both),
      atHome(3, 'Y a veces, también al juego del primer día.', both, [shared.item]),
      atHome(2, `${h.name} se durmió pensando en su ${gendered(c, 'nuevo amigo', 'nueva amiga')}.`, [h.id]),
      atHome(3, 'Afuera, las estrellas brillaban como siempre.'),
      atHome(1, `Y ${c.name} ya no se sintió ${gendered(c, 'solo', 'sola')} en su nuevo hogar.`, [c.id]),
    ],
  ];
  return {
    title: `${h.name} y ${gendered(c, 'el amigo nuevo', 'la amiga nueva')}`, place: getScene('school'), questId: `new-${shared.item}`, variantId: first.item, beats,
    items: [first.item, shared.item],
    blockIds: { opening: 'school', goal: `new-${shared.item}`, obstacle: first.item, strategy: origin.id, discovery: shared.item, ending: home.id },
    roles: { home: home.id, destination: 'playground' },
  };
}
const ofOrigin = place => `${place.article === 'la' ? 'de la' : 'del'} ${place.name}`;

/** What two friends can argue about, the fair fix and what they make together afterwards. */
const QUARRELS = [
  { item: 'ball', about: 'quién jugaba con la pelota', fix: 'jugar con la pelota por turnos', create: 'Inventaron un juego de pases en el que ganaban los dos.' },
  { item: 'scooter', about: 'a quién le tocaba el patinete', fix: 'usar el patinete por turnos, tres vueltas cada uno', create: 'Inventaron una carrera de relevos con el patinete.' },
  { item: 'cookies', about: 'quién se comía la última galleta', fix: 'partir la última galleta por la mitad', create: 'Prepararon juntos una bandeja de galletas nuevas para compartir.' },
  { item: 'kite', about: 'quién sujetaba la cometa', fix: 'sujetar la cuerda de la cometa entre los dos', create: 'Pintaron una cometa nueva con dos colas, una para cada uno.' },
  { item: 'crayons', about: 'quién usaba el crayón azul', fix: 'compartir el crayón azul por turnos', create: 'Pintaron un cielo enorme con todos los azules de los crayones.' },
  { item: 'jump-rope', about: 'quién saltaba primero a la cuerda de saltar', fix: 'turnarse para saltar y para dar a la cuerda', create: 'Inventaron una canción para saltar a la cuerda de saltar.' },
];

/** D3 · La pelea: a quarrel, time apart, missing each other, an apology and something made together. */
function quarrel({ random, hero: h, companion: c }) {
  const fight = choose(random, QUARRELS);
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const yard = at('playground'), room = at('bedroom'), other = at('living-room'), porch = at('porch');
  const beats = [
    [
      yard(1, `${named(h)} y su ${friendWord(c)} ${c.name} jugaban en el parque, como cada tarde.`, both),
      yard(2, getScene('playground').detail),
      yard(3, 'El sol calentaba, y se oían risas por todas partes.'),
      yard(1, `Pero de pronto empezaron a discutir por ${fight.about}.`, both, [fight.item]),
      yard(2, `${h.name} dijo que le tocaba a ${gendered(h, 'él', 'ella')}, y ${c.name} dijo que no.`, both),
      yard(3, 'Las voces se hicieron cada vez más fuertes.', both),
      yard(2, `${c.name} se cruzó de brazos, muy ${gendered(c, 'enfadado', 'enfadada')}.`, [c.id]),
      yard(3, 'Los demás dejaron de jugar para mirarlos.'),
      yard(1, `Al final, cada uno se fue a su casa sin despedirse.`, both),
    ],
    [
      room(1, `${h.name} se tumbó en su cama, con el ceño fruncido.`, [h.id]),
      room(2, getScene('bedroom').detail),
      room(3, 'Ni siquiera tenía ganas de jugar con sus juguetes.', [h.id]),
      room(1, 'Al principio estaba muy enfadad' + gendered(h, 'o', 'a') + ', pero poco a poco se puso triste.', [h.id]),
      room(2, `Echaba de menos a ${c.name}, aunque no quería admitirlo.`, [h.id]),
      room(3, 'La tarde se le hizo larguísima.', [h.id]),
      other(1, `En su casa, ${c.name} también estaba triste, mirando por la ventana.`, [c.id]),
      other(2, getScene('living-room').detail),
      other(3, `${c.name} echaba de menos las risas de ${h.name}.`, [c.id]),
    ],
    [
      room(1, `${h.name} respiró hondo tres veces para calmarse.`, [h.id]),
      room(2, 'Con la calma, empezó a pensar con más claridad.', [h.id]),
      room(3, 'Se acordó de todas las veces que se habían reído juntos.', [h.id]),
      room(1, `Entonces entendió que ${c.name} también tenía razón en algo.`, [h.id]),
      room(2, `Los dos habían querido lo mismo al mismo tiempo.`, [h.id]),
      room(3, 'Y ninguno había escuchado al otro.', [h.id]),
      room(1, `${h.name} decidió ir a pedirle perdón.`, [h.id]),
      room(2, 'Le temblaban un poco las piernas, pero era lo correcto.', [h.id]),
      room(3, 'Pensó bien lo que iba a decirle.', [h.id]),
    ],
    [
      porch(1, `A mitad de camino, se encontró con ${c.name}, que venía a buscarl${gendered(h, 'o', 'a')}.`, both),
      porch(2, 'Se pararon frente a frente, un poco nerviosos.', both),
      porch(3, 'Los dos se quedaron quietos, sin saber quién hablaría primero.', both),
      porch(1, `${h.name} le pidió perdón por haber gritado.`, both),
      porch(2, `${c.name} sonrió y le pidió perdón también.`, both),
      porch(3, 'Se rieron, porque los dos habían salido a buscarse.', both),
      porch(1, `Juntos decidieron ${fight.fix}.`, both, [fight.item]),
      porch(2, 'Era justo para los dos, y así nadie se quedaba fuera.', both),
      porch(3, 'Se dieron un abrazo enorme y muy largo.', both),
    ],
    [
      yard(1, `Volvieron al parque y lo probaron enseguida.`, both, [fight.item]),
      yard(2, 'Funcionaba de maravilla, mucho mejor que discutir.', both),
      yard(3, 'Hasta parecía más divertido que antes.', both),
      yard(1, fight.create, both, [fight.item]),
      yard(2, 'Los demás se acercaron a jugar con ellos.'),
      yard(3, `${c.name} se rio tanto que le dolía la barriga.`, [c.id]),
      yard(1, `${pair} jugaron hasta que se hizo de noche.`, both),
      yard(2, 'Ya nadie se acordaba de la pelea.', both),
      yard(3, 'Solo quedaban las ganas de volver al día siguiente.', both),
    ],
    [
      room(1, `Esa noche, ${h.name} aprendió que pedir perdón es de valientes.`, [h.id]),
      room(2, 'Y que escuchar al otro arregla casi todo.', [h.id]),
      room(3, `Se acordó de la cara de ${c.name} al encontrarse.`, [h.id]),
      room(1, `Desde entonces, cuando discutían, ${pair} respiraban hondo y hablaban.`, both),
      room(2, 'A veces todavía se enfadaban, como todos los amigos.', both),
      room(3, 'Pero siempre encontraban la manera de arreglarlo.', both),
      room(2, 'Se tapó con la manta hasta la nariz.', [h.id]),
      room(3, 'Afuera, la luna brillaba sobre el parque vacío.'),
      room(1, `Y se durmió con una sonrisa, pensando en su ${friendWord(c)} ${c.name}.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: la pelea`, place: getScene('playground'), questId: `quarrel-${fight.item}`, variantId: fight.item, beats, items: [fight.item],
    blockIds: { opening: 'playground', goal: `quarrel-${fight.item}`, obstacle: fight.item, strategy: 'porch', discovery: 'bedroom', ending: 'bedroom' },
    roles: { home: 'bedroom', destination: 'playground' },
  };
}

/** Surprises: why, what they need, what goes wrong and how the surprise is saved. */
const SURPRISES = [
  { id: 'birthday', why: c => `era el cumpleaños de ${c.name}`, buy: ['birthday-cake', 'balloon'], buyText: 'una tarta y dos globos', mishap: 'Uno de los globos se desinfló antes de empezar la fiesta.', fix: 'Infló otra vez el globo y lo dejó junto a la tarta.', fixItems: ['balloon', 'birthday-cake'] },
  { id: 'cheer-up', why: c => `${c.name} estaba triste porque se le había roto su juguete favorito`, buy: ['gift-box', 'garland'], buyText: 'una caja de regalo y una guirnalda', mishap: 'La guirnalda se enredó y no pudo colgarla como quería.', fix: 'Desenredó la guirnalda despacio y puso el regalo debajo.', fixItems: ['garland', 'gift-box'] },
  { id: 'thank-you', why: c => `${c.name} siempre ayudaba a todo el mundo y nadie le daba las gracias`, buy: ['flower-crown', 'letter'], buyText: 'una carta de agradecimiento y una corona de flores', mishap: 'La carta se arrugó un poquito mientras preparaba la sorpresa.', fix: 'Alisó la carta con cuidado y puso la corona a su lado.', fixItems: ['letter', 'flower-crown'] },
];

/** D4 · La sorpresa: a reason to celebrate a friend, secret preparations, a mishap saved and the big moment. */
function surprise({ random, hero: h, companion: c }) {
  const say = sayer(random);
  const plan = choose(random, SURPRISES);
  const party = getScene(plan.id === 'cheer-up' ? 'living-room' : 'festival-square');
  const both = [h.id, c.id];
  const team = [h.id];
  const market = at('market'), there = at(party.id), porch = at('porch');
  const beats = [
    [
      porch(1, `${named(h)} se dio cuenta de que ${plan.why(c)}.`, [h.id]),
      porch(2, 'Estaba en el porche, mirando el cielo, cuando lo pensó.', [h.id]),
      porch(3, `${h.name} se quedó pensando qué podía hacer.`, [h.id]),
      porch(1, say([`Así que decidió preparar una sorpresa sencilla para ${c.name}.`, `Así que decidió darle una sorpresa a ${c.name}.`, `Así que pensó en preparar una sorpresa secreta para ${c.name}.`]), team),
      porch(2, `${h.name} pensó en lo que más le gustaría a ${c.name}.`, [h.id]),
      porch(3, 'Guardó el secreto para que la sorpresa fuera especial.', team),
      porch(2, `Preparó una lista corta para recordar su idea.`, team),
      porch(3, `${h.name} la escribió con letra grande y clara.`, [h.id]),
      porch(1, say([`${c.name} no podía enterarse de nada.`, `Sería un secreto hasta el último momento.`])),
    ],
    [
      market(1, `Fue al mercado a buscar ${plan.buyText}.`, team, plan.buy),
      market(2, getScene('market').detail),
      market(3, 'Encontró enseguida justo lo que buscaba.', team),
      market(1, say(['Volvió con sus cosas, procurando mantener la sorpresa en secreto.', 'Volvió con sus compras escondidas, mirando a un lado y a otro.']), team),
      market(2, `Casi se encontró con ${c.name} al doblar una esquina.`, [...team, c.id]),
      market(3, `${h.name} saludó disimulando, y ${c.name} siguió su camino.`, both),
      there(1, party.id === 'living-room' ? 'Volvió a su casa y preparó la sorpresa en la sala de estar.' : `Llegó ${toPlace(party)} y empezó a preparar la sorpresa.`, team),
      there(2, party.detail),
      there(3, 'Había que darse prisa, pero sin hacer ruido.', team),
    ],
    [
      there(1, `Colocó las dos cosas donde ${c.name} pudiera verlas al entrar.`, team, plan.buy),
      there(2, `${h.name} dejó libre la entrada para recibir a ${c.name}.`, [h.id]),
      there(3, `${h.name} comprobó que la sorpresa seguía bien preparada.`, [h.id]),
      there(1, plan.mishap, team, plan.buy),
      there(2, `${h.name} se asustó, porque ya casi no quedaba tiempo.`, [h.id]),
      there(3, `${h.name} miró el pequeño problema y pensó cómo resolverlo.`, [h.id]),
      there(1, plan.fix, team, plan.fixItems),
      there(2, 'Al final, todo estaba listo justo a tiempo.', team),
      there(3, 'Se quedó cerca de la entrada, aguantando una sonrisa.', team),
    ],
    [
      there(1, `Entonces ${h.name} fue a buscar a ${c.name} con una excusa.`, both),
      there(2, `Le dijo que quería enseñarle una cosa muy rara.`, both),
      there(3, `${c.name} l${gendered(h, 'o', 'a')} siguió, sin sospechar nada.`, [c.id]),
      there(1, `Cuando ${c.name} entró, ${h.name} gritó sorpresa con una sonrisa.`, [c.id, ...team]),
      there(2, `${c.name} se quedó con la boca abierta.`, [c.id]),
      there(3, 'Por un momento, no supo qué decir.', [c.id]),
      there(1, `Luego se le escapó una sonrisa enorme, y abrazó a ${h.name}.`, both),
      there(2, `${c.name} le dijo a ${h.name} que aquel detalle le hacía mucha ilusión.`, both),
      there(3, 'Hasta se le escapó una lagrimita de alegría.', [c.id]),
    ],
    [
      there(1, say([`${c.name} dijo que era la mejor sorpresa de su vida.`, `${c.name} dijo que nunca le habían preparado nada tan bonito.`]), [c.id]),
      there(2, `${h.name} le contó cómo lo había preparado todo, y lo del susto.`, both),
      there(3, 'Se rieron mucho con la historia.', both),
      there(1, `Celebraron juntos con todo lo que ${h.name} había preparado.`, both, plan.buy),
      there(2, 'Bailaron, cantaron y jugaron hasta cansarse.', both),
      there(3, `${c.name} quiso saber cómo se le había ocurrido la idea.`, [c.id]),
      there(1, plan.id === 'birthday' ? `${c.name} no podía pensar en nada que no fuera aquella fiesta.` : `${c.name} sintió que aquel pequeño detalle tenía mucho cariño dentro.`, [c.id]),
      there(2, 'Al final, recogieron juntos las cosas de la sorpresa.', both),
      there(3, 'Todo quedó tan limpio como antes.', both),
    ],
    [
      porch(1, say([`${h.name} aprendió que hacer feliz a un amigo también nos hace felices.`, `${h.name} aprendió que preparar una alegría para alguien también llena de alegría.`]), [h.id]),
      porch(2, 'Y que las sorpresas salen bien aunque algo salga mal.', [h.id]),
      porch(3, `${h.name} recordó la sonrisa que había despertado su detalle.`, [h.id]),
      porch(1, `${c.name} le dio las gracias a ${h.name} una vez más antes de irse.`, both),
      porch(2, 'Prometió prepararle una sorpresa algún día.', [c.id]),
      porch(3, `${h.name} se quedó mirando cómo se alejaba.`, [h.id]),
      porch(2, 'Esa noche, durmió con una sonrisa.', [h.id]),
      porch(3, 'Soñó con la sonrisa que había recibido aquella tarde.', [h.id]),
      porch(1, say([`Y desde entonces, ${h.name} y ${c.name} fueron todavía más amigos.`, `Y aquella sorpresa se convirtió en uno de sus recuerdos favoritos.`]), both),
    ],
  ];
  return {
    title: `${h.name} y la sorpresa para ${c.name}`, place: party, questId: `surprise-${plan.id}`, variantId: party.id, beats,
    items: [...plan.buy, ...plan.fixItems],
    blockIds: { opening: 'porch', goal: `surprise-${plan.id}`, obstacle: plan.id, strategy: 'thoughtful-detail', discovery: party.id, ending: 'porch' },
    roles: { home: 'porch', destination: party.id, helper: h.id },
  };
}

/** Games that need one ability; a hunt where every ability finds something. */
const ABILITY_GAMES = {
  climb: { game: 'trepar al árbol más alto del parque', place: 'playground' },
  fly: { game: 'volar en círculos alrededor del molino', place: 'windmill' },
  jump: { game: 'saltar de charco en charco sin mojarse', place: 'meadow' },
  strong: { game: 'empujar troncos para construir un fuerte', place: 'forest' },
  tall: { game: 'alcanzar las manzanas más altas del huerto', place: 'orchard' },
  swim: { game: 'nadar hasta la roca grande', place: 'beach' },
};
const HUNT_USES = {
  fly: 'buscaba desde el aire', swim: 'buscaba bajo el agua', climb: 'buscaba entre las ramas', small: 'buscaba en los rincones más pequeños',
  tall: 'miraba por encima de los arbustos', strong: 'movía las piedras más pesadas', jump: 'saltaba de piedra en piedra para mirar',
  nose: 'seguía los olores', listen: 'escuchaba cada ruidito', glow: 'iluminaba los rincones oscuros', magic: 'hacía brillar las pistas escondidas',
};
const missingAbility = (h, c) => (ABILITIES[h.id] || []).filter(ability => ABILITY_GAMES[ability] && !(ABILITIES[c.id] || []).includes(ability) && fitsCast([h, c], ABILITY_GAMES[ability].place));

/** D5 · Todos juegan: a game one friend cannot play, a pause, and a new game made for both. */
function everyonePlays({ random, hero: h, companion: c }) {
  const say = sayer(random);
  const ability = choose(random, missingAbility(h, c));
  const game = ABILITY_GAMES[ability];
  const place = getScene(game.place);
  const mine = (ABILITIES[h.id] || []).find(entry => HUNT_USES[entry]) || ability;
  const theirs = (ABILITIES[c.id] || []).find(entry => HUNT_USES[entry]);
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const there = at(place.id);
  const beats = [
    [
      there(1, `${named(h)} invitó a su ${friendWord(c)} ${c.name} a ${game.game}.`, both),
      there(2, place.detail),
      there(3, 'Era el juego favorito de ' + h.name + ', y estaba deseando empezar.', [h.id]),
      there(1, say([`${h.name} lo hizo enseguida, riendo de alegría.`, `${h.name} lo consiguió a la primera, dando saltitos de alegría.`, `${h.name} lo hizo enseguida, como si fuera lo más fácil del mundo.`]), [h.id]),
      there(2, `Le gritó a ${c.name} que lo intentara también.`, [h.id]),
      there(3, 'Todo parecía perfecto para jugar juntos.'),
      there(1, say([`Pero ${c.name} lo intentó una y otra vez, y no podía.`, `Pero, por más que lo intentaba, ${c.name} no podía.`]), [c.id]),
      there(2, `${c.name} era ${gendered(c, 'un', 'una')} ${c.label}, y aquello no era lo suyo.`, [c.id]),
      there(3, 'Cada intento le salía peor que el anterior.', [c.id]),
    ],
    [
      there(1, say([`${c.name} se sentó en el suelo, con la cabeza baja.`, `${c.name} se quedó en un rincón, muy ${gendered(c, 'callado', 'callada')}.`]), [c.id]),
      there(2, `Pensaba que no servía para jugar con ${h.name}.`, [c.id]),
      there(3, 'Una lagrimita le rodó por la mejilla.', [c.id]),
      there(1, `${h.name} se dio cuenta y dejó de jugar enseguida.`, [h.id]),
      there(2, `Se sentó al lado de ${c.name} y le preguntó qué le pasaba.`, both),
      there(3, 'Esperó con paciencia a que contestara.', [h.id]),
      there(1, `${c.name} le dijo que aquel juego no era para ${gendered(c, 'él', 'ella')}.`, [c.id]),
      there(2, `${h.name} entendió que no todos sabemos hacer las mismas cosas.`, [h.id]),
      there(3, `Y que ${gendered(h, 'él', 'ella')} había elegido un juego solo para sí.`, [h.id]),
    ],
    [
      there(1, `${h.name} pensó un momento y tuvo una idea: inventar un juego para los dos.`, [h.id]),
      there(2, `Le preguntó a ${c.name} qué era lo que mejor sabía hacer.`, both),
      there(3, `${c.name} se secó los ojos y se lo pensó.`, [c.id]),
      there(1, `Decidieron jugar a buscar un tesoro escondido, donde cada uno usaría lo que mejor sabía hacer.`, both, ['treasure-chest']),
      there(2, 'Cada uno escondería canicas para que el otro las buscara.', both),
      there(3, 'Algunas en lo alto, otras en lo bajo y otras muy escondidas.', [], ['marbles']),
      there(1, 'Cada uno escondió tres canicas de colores, y empezó la búsqueda.', both, ['marbles']),
      there(2, `${c.name} ya sonreía otra vez, con ganas de jugar.`, [c.id]),
      there(3, 'Se dieron la mano para empezar.', both),
    ],
    [
      there(1, `${h.name} ${HUNT_USES[mine]}, y encontró las tres canicas de ${c.name}.`, [h.id], ['marbles']),
      there(2, 'Las levantó en alto, muy orgullos' + gendered(h, 'o', 'a') + '.', [h.id]),
      there(3, `Ahora le tocaba buscar a ${c.name}.`, [c.id]),
      there(1, theirs ? `${c.name} ${HUNT_USES[theirs]}, y encontró las tres de ${h.name}.` : `${c.name} buscaba con mucha paciencia, y encontró las tres de ${h.name}.`, [c.id], ['marbles']),
      there(2, `${h.name} no podía creer lo rápido que las había encontrado.`, [h.id]),
      there(3, `${c.name} se rio, feliz de ser útil.`, [c.id]),
      there(1, 'Luego vieron brillar una canica perdida, y la sacaron juntos, ayudándose.', both, ['marbles']),
      there(2, 'Estaba en un sitio donde solo podían llegar entre los dos.', both),
      there(3, 'Chocaron las manos, muertos de risa y de alegría.', both),
    ],
    [
      there(1, `${pair} contaron las canicas: las habían encontrado todas.`, both, ['marbles']),
      there(2, 'Nadie había ganado, porque habían ganado los dos.', both),
      there(3, `${c.name} explicó las reglas, muy ${gendered(c, 'orgulloso', 'orgullosa')}.`, [c.id]),
      there(1, 'Pronto, otros amigos quisieron jugar también, y cada uno aportaba lo que mejor sabía hacer.'),
      there(2, 'Unos buscaban arriba, otros abajo y otros escuchaban.'),
      there(3, 'El juego se hizo cada vez más divertido.'),
      there(1, `${c.name} le dio las gracias a ${h.name} por pensar en ${gendered(c, 'él', 'ella')}.`, both),
      there(2, `${h.name} le dijo que jugar juntos era lo mejor del juego.`, both),
      there(3, 'El sol empezaba a bajar poco a poco.'),
    ],
    [
      there(1, say([`${h.name} aprendió que cada uno es bueno en algo distinto.`, `${h.name} aprendió que cada uno sabe hacer algo distinto, y que todo cuenta.`]), [h.id]),
      there(2, 'Y que un buen juego es aquel en el que todos pueden jugar.', [h.id]),
      there(3, `${c.name} guardó una canica como recuerdo.`, [c.id], ['marbles']),
      there(1, `Desde entonces, ${pair} inventaban juegos para todos.`, both),
      there(2, 'Cada día probaban un juego nuevo, y a veces dos.', both),
      there(3, 'Algunos salían fatal, y se reían igual.', both),
      there(2, 'Al atardecer, se despidieron con un abrazo.', both),
      there(3, 'Se fueron a casa contando las canicas por el camino.', both, ['marbles']),
      there(1, say([`Y nadie volvió a quedarse sentado mirando cómo jugaban los demás.`, 'Y desde aquel día, en sus juegos siempre hubo sitio para todos.'])),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: todos juegan`, place, questId: `game-${ability}`, variantId: mine, beats, items: ['marbles', 'treasure-chest'],
    blockIds: { opening: place.id, goal: `game-${ability}`, obstacle: ability, strategy: mine, discovery: theirs || 'patience', ending: place.id },
    roles: { home: place.id, destination: place.id, ability, mine, theirs: theirs ?? null },
  };
}

/** Contests: where they happen, what they need, how a friend stumbles and how to help. */
const CONTESTS = [
  { id: 'drawing', scene: 'festival-square', items: ['crayons', 'paintbrush'], what: 'el concurso de dibujo', ready: 'Cada participante tenía su sitio, su papel y sus crayones.', mishap: c => `Una ráfaga de viento tiró el dibujo de ${c.name} a un charco.`, help: 'le dio la mitad de su papel y le prestó sus crayones' },
  { id: 'sack-race', scene: 'race-track', items: ['sack'], what: 'la carrera de sacos', ready: 'Cada corredor se metió en su saco, en la línea de salida.', mishap: c => `${c.name} tropezó dentro de su saco y se cayó al suelo.`, help: 'se paró a ayudarle a levantarse y a meterse otra vez en el saco' },
  { id: 'sandcastle', scene: 'beach', items: ['bucket', 'shovel'], what: 'el concurso de castillos de arena', ready: 'Cada participante tenía su trozo de playa, un cubo y una pala.', mishap: c => `Una ola deshizo el castillo de ${c.name}.`, help: 'le ayudó a construir uno nuevo con su cubo y su pala' },
  { id: 'kites', scene: 'lookout-hill', items: ['kite'], what: 'el concurso de cometas', ready: 'Cada participante sujetaba su cometa, esperando el viento.', mishap: c => `La cometa de ${c.name} se enredó en un arbusto.`, help: 'bajó su propia cometa para ayudarle a desenredarla' },
  { id: 'cookies', scene: 'festival-square', items: ['cookies', 'dough-bowl'], what: 'el concurso de galletas', ready: 'Cada participante tenía su mesa, su bol y su masa.', mishap: c => `Las galletas de ${c.name} se cayeron al suelo.`, help: 'compartió la mitad de su masa para hacer otras galletas' },
];

/** D6 · La competición amistosa: wanting to win, a friend's stumble, choosing to help, and a different prize. */
function contest({ random, hero: h, companion: c }) {
  const say = sayer(random);
  const event = choose(random, CONTESTS.filter(entry => fitsCast([h, c], entry.scene)));
  const judge = copySupporting(random, choose(random, ['teacher', 'baker', 'market-seller', 'gardener']));
  const place = getScene(event.scene);
  const home = getScene(choose(random, FRIEND_HOMES.filter(id => id !== place.id && fitsCast([h, c], id))));
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const atHome = at(home.id), there = at(place.id);
  const beats = [
    [
      atHome(1, `En el pueblo anunciaron ${event.what}, y ${named(h)} quiso participar.`, [h.id]),
      atHome(2, `La noticia llegó enseguida ${toPlace(home)}.`),
      atHome(3, 'Habría aplausos, medallas y un premio para el ganador.'),
      atHome(1, `Su ${friendWord(c)} ${c.name} también se apuntó, muy ${gendered(c, 'contento', 'contenta')}.`, [c.id]),
      atHome(2, `${h.name} pensaba en ganar cada vez que practicaba.`, [h.id]),
      atHome(3, 'Hasta soñaba con recibir el premio delante de todos.', [h.id]),
      atHome(2, 'Practicaron muchas tardes, cada uno a su manera.', both, event.items),
      atHome(3, `${c.name} se reía cuando algo le salía mal, y volvía a empezar.`, [c.id]),
      atHome(1, say([`${h.name} quería ganar como fuera, costara lo que costara.`, `${h.name} solo pensaba en una cosa: ganar el primer premio.`, `${h.name} quería ganar más que nada en el mundo.`]), [h.id]),
    ],
    [
      there(1, `Por fin llegó el día, y fueron ${toPlace(place)}.`, both),
      there(2, place.detail),
      there(3, 'Había muchos participantes, mucho público y muchos nervios.'),
      there(1, `${judge.name}, ${judge.article} ${judge.label}, explicó las reglas del concurso.`, [judge.id]),
      there(2, event.ready, both, event.items),
      there(3, `${c.name} le guiñó un ojo a ${h.name} para desearle suerte.`, both),
      there(1, `${judge.name} tocó un silbato, y el concurso empezó.`, [judge.id], ['whistle']),
      there(2, `${h.name} se concentró muchísimo, sin mirar a nadie más.`, [h.id]),
      there(3, 'Se oían risas, gritos de ánimo y nervios por todas partes.'),
    ],
    [
      there(1, say([`A ${h.name} le estaba saliendo de maravilla.`, `${h.name} iba mejor que nunca, sin un solo fallo.`]), [h.id], event.items),
      there(2, 'Iba por delante de los demás y ya casi había terminado.', [h.id]),
      there(3, 'El público aplaudía con fuerza al verl' + gendered(h, 'o', 'a') + '.', [h.id]),
      there(1, event.mishap(c), [c.id], event.items),
      there(2, `${c.name} se quedó mirando, con los ojos llenos de lágrimas.`, [c.id]),
      there(3, 'Nadie se paraba a ayudarle, porque todos querían ganar.', [c.id]),
      there(1, say([`${h.name} dudó un momento, porque quería ganar.`, `${h.name} se detuvo un segundo, pensando en el premio.`]), [h.id]),
      there(2, 'Si se paraba a ayudar, seguramente perdería aquella ventaja.', [h.id]),
      there(3, `${h.name} miró a ${c.name} y comprendió que necesitaba compañía.`, both),
    ],
    [
      there(1, `Al final, ${h.name} ${event.help}.`, both, event.items),
      there(2, `${c.name} no podía creerlo, y se le iluminó la cara.`, [c.id]),
      there(3, 'El público se quedó en silencio, mirando sin entender nada.'),
      there(1, `Siguieron juntos, y ${c.name} volvió a sonreír.`, both),
      there(2, 'Ya no importaba quién ganara, solo terminar juntos.', both),
      there(3, 'Se estaban divirtiendo como nunca, riéndose de los errores.', both),
      there(1, `${judge.name} tocó el silbato para terminar.`, [judge.id], ['whistle']),
      there(2, 'Ninguno de los dos había ganado el concurso, y no les importó.', both),
      there(3, 'Otro participante se llevó el primer puesto, y ellos le aplaudieron.'),
    ],
    [
      there(1, `Pero ${judge.name} dijo que había un premio especial para ${pair}.`, [judge.id, ...both]),
      there(2, 'Era el premio a la amistad, el más especial de todos.', both),
      there(3, 'El público aplaudió con muchas ganas, de pie.'),
      there(1, `${judge.name} les colgó a cada uno una medalla.`, [judge.id, ...both], ['medal']),
      there(2, `La medalla recordaba lo que habían conseguido ayudándose, pensó ${h.name}.`, [h.id], ['medal']),
      there(3, `${c.name} abrazó a ${h.name} con mucha fuerza.`, both),
      there(1, `${c.name} le dio las gracias por haberse parado a ayudar.`, both),
      there(2, `${h.name} le dijo que lo volvería a hacer mil veces.`, [h.id]),
      there(3, 'Volvieron a casa con las medallas puestas.', both, ['medal']),
    ],
    [
      atHome(1, say([`${h.name} aprendió que ayudar a un amigo vale más que ganar.`, `${h.name} aprendió que ayudar a un amigo vale más que cualquier premio.`]), [h.id]),
      atHome(2, 'Y que compartir el esfuerzo también merece celebrarse.', [h.id]),
      atHome(3, `${c.name} colgó su medalla junto a la ventana.`, [c.id], ['medal']),
      atHome(1, `Al año siguiente, ${pair} se apuntaron otra vez, juntos.`, both),
      atHome(2, 'Esta vez decidieron participar en equipo.', both),
      atHome(3, 'Y se divirtieron todavía más que la primera vez.', both),
      atHome(2, `Esa noche, ${h.name} se durmió acariciando su medalla.`, [h.id], ['medal']),
      atHome(3, 'Afuera, las estrellas brillaban como medallas en el cielo.'),
      atHome(1, say([`Y desde entonces, ${pair} nunca dejaron a nadie atrás.`, `Y la medalla de la amistad fue siempre su favorita.`]), both),
    ],
  ];
  return {
    title: `${h.name} y ${event.what}`, place, extras: [judge], questId: `contest-${event.id}`, variantId: judge.id, beats, items: [...event.items, 'medal', 'whistle'],
    blockIds: { opening: home.id, goal: `contest-${event.id}`, obstacle: event.id, strategy: judge.id, discovery: place.id, ending: home.id },
    roles: { home: home.id, destination: place.id, judge: judge.id },
  };
}

/** Toys a friend can lend: how they are played with, how they break and how to mend them together. */
const LENT_TOYS = [
  { id: 'kite', item: 'kite', name: 'su cometa nueva', play: 'La hizo volar muy alto, cada vez más alto.', breaks: 'Un golpe de viento enredó la cometa en una rama, y la tela se rasgó.', fix: 'Pegaron un parche de papel de colores en la tela rasgada de la cometa.', after: 'La cometa volvió a volar, con su parche como una medalla.' },
  { id: 'scooter', item: 'scooter', name: 'su patinete rojo', play: 'Dio vueltas y más vueltas por el camino del parque.', breaks: 'Fue tan deprisa que el patinete chocó con un banco, y una rueda se soltó.', fix: 'Buscaron la tuerca entre la hierba y apretaron la rueda del patinete con cuidado.', after: 'El patinete volvió a rodar, recto y sin ruidos.' },
  { id: 'spinning-top', item: 'spinning-top', name: 'su peonza de madera', play: 'La hizo bailar una y otra vez sobre el suelo.', breaks: 'Lanzó la peonza tan fuerte que la cuerda se rompió por la mitad.', fix: 'Ataron un cordón nuevo a la peonza con un nudo bien fuerte.', after: 'La peonza volvió a bailar, más contenta que nunca.' },
  { id: 'music-box', item: 'music-box', name: 'su caja de música', play: 'Giró la llave muchas veces para escuchar la canción.', breaks: 'La giró tanto que la caja de música dejó de sonar.', fix: 'Esperaron un rato y giraron la llave de la caja de música muy despacio.', after: 'La canción volvió a sonar, suave como siempre.' },
  { id: 'ball', item: 'ball', name: 'su pelota favorita', play: 'La botó y la lanzó hasta cansarse.', breaks: 'La pelota cayó sobre un rosal y se desinfló con un silbido.', fix: 'Taparon el agujerito de la pelota con un parche y la inflaron otra vez.', after: 'La pelota volvió a botar, alta y redonda.' },
  { id: 'paper-plane', item: 'paper-plane', name: 'su avión de papel favorito', play: 'Lo lanzó una y otra vez, para ver lo lejos que llegaba.', breaks: 'El avión de papel cayó en un charco y se quedó arrugado y mojado.', fix: 'Doblaron juntos un avión de papel nuevo, con las alas bien rectas.', after: 'El avión nuevo voló todavía más lejos que el viejo.' },
];

/** D7 · El juguete prestado: a lent toy breaks, the wish to hide it, the truth, forgiveness and a repair together. */
function borrowedToy({ random, hero: h, companion: c }) {
  const say = sayer(random);
  const toy = choose(random, LENT_TOYS);
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const yard = at('playground'), porch = at('porch'), room = at('bedroom');
  const it = [toy.item];
  const beats = [
    [
      yard(1, say([`Una tarde, ${named(h)} y su ${friendWord(c)} ${c.name} jugaban en el parque.`, `Una tarde de sol, ${named(h)} se encontró con su ${friendWord(c)} ${c.name} en el parque.`]), both),
      yard(2, getScene('playground').detail),
      yard(3, 'Se oían risas por todas partes.'),
      yard(1, `${c.name} había traído ${toy.name}, y ${h.name} no podía dejar de mirarlo.`.replace('mirarlo', 'mirar el juguete'), both, it),
      yard(2, `${h.name} le preguntó si se lo prestaba un rato.`, both),
      yard(3, `${c.name} dudó un momento, porque era su juguete favorito.`, [c.id]),
      yard(1, `Al final, ${c.name} le prestó el juguete mientras iba a merendar, y le pidió que lo cuidara mucho.`, both, it),
      yard(2, `${h.name} prometió cuidarlo como si fuera un tesoro.`, [h.id]),
      yard(3, `${c.name} dijo que volvería en cuanto terminara de merendar.`, [c.id]),
    ],
    [
      yard(1, `${h.name} ${toy.play[0].toLocaleLowerCase('es')}${toy.play.slice(1)}`, [h.id], it),
      yard(2, `${h.name} se lo estaba pasando de maravilla.`, [h.id]),
      yard(3, 'Cada vez jugaba con más prisa y menos cuidado.', [h.id]),
      yard(1, toy.breaks, [h.id], it),
      yard(2, `${h.name} se quedó sin moverse, con la boca abierta.`, [h.id]),
      yard(3, 'El corazón le latía muy deprisa.', [h.id]),
      yard(1, `${h.name} pensó en esconderlo y no decir nada.`, [h.id]),
      yard(2, `Quizá ${c.name} no se daría cuenta.`, [h.id]),
      yard(3, 'Pero solo de pensarlo, le dolía la barriga.', [h.id]),
    ],
    [
      yard(1, `${h.name} se sentó en un banco, con el juguete roto en las manos.`, [h.id], it),
      yard(2, `Se acordó de la cara de ${c.name} al prestárselo.`, [h.id]),
      yard(3, 'Esconderlo sería como romperlo dos veces.', [h.id]),
      yard(1, `Respiró hondo y decidió contarle la verdad a ${c.name}.`, [h.id]),
      yard(2, 'Le temblaban un poco las piernas, pero se levantó.', [h.id]),
      yard(3, 'Caminó despacio, buscando las palabras justas.', [h.id]),
      porch(1, `Llegó a casa de ${c.name} y le enseñó lo que había pasado.`, both, it),
      porch(2, getScene('porch').detail),
      porch(3, `${c.name} se quedó mirando el juguete, sin decir nada.`, [c.id]),
    ],
    [
      porch(1, `${h.name} le pidió perdón y le dijo que no había tenido cuidado.`, both),
      porch(2, `A ${c.name} se le llenaron los ojos de lágrimas.`, [c.id]),
      porch(3, 'Era su juguete favorito, y le daba mucha pena.', [c.id]),
      porch(1, `${c.name} estaba triste, pero le dio las gracias por decirle la verdad.`, both),
      porch(2, 'Le dijo que eso era lo más importante.', [c.id]),
      porch(3, `${h.name} sintió que se le quitaba un peso enorme de encima.`, [h.id]),
      porch(1, `Entonces ${pair} decidieron intentar arreglarlo juntos.`, both),
      porch(2, 'Buscaron todo lo necesario y se sentaron en el escalón.', both),
      porch(3, 'Pensaron un buen rato cómo hacerlo.', both),
    ],
    [
      porch(1, toy.fix, both, it),
      porch(2, `${c.name} sujetaba, y ${h.name} trabajaba con mucho cuidado.`, both),
      porch(3, 'Les costó varios intentos, pero no se rindieron.', both),
      yard(1, toy.after, both, it),
      yard(2, `${c.name} dio un salto de alegría.`, [c.id]),
      yard(3, `${h.name} sonrió de oreja a oreja.`, [h.id]),
      yard(1, 'Esta vez jugaron juntos, por turnos y sin ninguna prisa.', both),
      yard(2, 'Era mucho más divertido jugar los dos.', both),
      yard(3, 'Jugaron hasta que empezó a anochecer.', both),
    ],
    [
      room(1, say([`Esa noche, ${h.name} aprendió que decir la verdad cuesta, pero alivia.`, `Esa noche, ${h.name} aprendió que la verdad, aunque cueste, arregla más que esconder.`]), [h.id]),
      room(2, 'Y que lo prestado se cuida todavía más que lo propio.', [h.id]),
      room(3, `Pensó en lo valiente que había sido al contárselo a ${c.name}.`, [h.id]),
      room(1, `Desde entonces, ${pair} se prestaban sus juguetes sin miedo.`, both),
      room(2, 'Porque sabían que los dos los cuidarían.', both),
      room(3, 'Y si algo se rompía, lo arreglaban juntos.', both),
      room(2, `${h.name} se tapó con la manta, ya tranquil${gendered(h, 'o', 'a')}.`, [h.id]),
      room(3, 'La luna brillaba sobre el parque vacío.'),
      room(1, `Y se durmió pensando en la próxima tarde de juegos con ${c.name}.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y el juguete prestado`, place: getScene('playground'), questId: `borrow-${toy.id}`, variantId: toy.id, beats, items: it,
    blockIds: { opening: 'playground', goal: `borrow-${toy.id}`, obstacle: toy.id, strategy: 'truth', discovery: 'porch', ending: 'bedroom' },
    roles: { home: 'porch', destination: 'playground', toy: toy.id },
  };
}

/** Clubs two friends might found, and what their members do. */
const CLUBS = [
  { id: 'explorers', name: 'el club de los exploradores', items: ['magnifying-glass'], activity: 'Buscaban huellas con la lupa y las dibujaban en un cuaderno.' },
  { id: 'stars', name: 'el club de las estrellas', items: ['telescope'], activity: 'Miraban el cielo con el telescopio y ponían nombre a las estrellas.' },
  { id: 'painters', name: 'el club de los pintores', items: ['paintbrush'], activity: 'Pintaban con el pincel todo lo que veían desde la ventana.' },
  { id: 'music', name: 'el club de la música', items: ['drum'], activity: 'Tocaban el tambor e inventaban canciones con palmas.' },
  { id: 'readers', name: 'el club de los cuentos', items: ['storybook'], activity: 'Leían un libro de cuentos e inventaban finales nuevos.' },
];
/** What a newcomer can bring to the club, from their own abilities. */
const CLUB_GIFTS = {
  fly: 'podía ver desde el aire lo que nadie veía', climb: 'trepaba hasta los rincones más altos', listen: 'oía sonidos que los demás no oían',
  nose: 'encontraba cosas solo con el olfato', strong: 'podía cargar las cosas más pesadas', glow: 'iluminaba los rincones oscuros',
  jump: 'saltaba más alto que nadie', small: 'cabía por los huecos más pequeños', magic: 'sabía hacer trucos de magia', tall: 'alcanzaba las ramas más altas',
};
const newcomersFor = (h, c) => CHARACTERS.filter(person => ![h.id, c.id].includes(person.id) && !AQUATIC.includes(person.id)
  && (ABILITIES[person.id] || []).some(ability => CLUB_GIFTS[ability]));

/** D8 · El club secreto: two friends found a club, close it to a newcomer, miss what they lose and open it. */
function secretClub({ random, hero: h, companion: c }) {
  const say = sayer(random);
  const club = choose(random, CLUBS);
  const place = getScene(choose(random, ['treehouse', 'garden'].filter(id => fitsCast([h, c], id))));
  const newcomer = copyCharacter(random, choose(random, newcomersFor(h, c)).id);
  const gift = CLUB_GIFTS[(ABILITIES[newcomer.id] || []).find(ability => CLUB_GIFTS[ability])];
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const all = [...both, newcomer.id];
  const there = at(place.id), yard = at('playground');
  const beats = [
    [
      there(1, say([`Un día, ${named(h)} y su ${friendWord(c)} ${c.name} decidieron fundar ${club.name}.`, `Una mañana, ${named(h)} y su ${friendWord(c)} ${c.name} inventaron ${club.name}.`]), both),
      there(2, place.detail),
      there(3, 'Sería el club más secreto del mundo.', both),
      there(1, club.activity, both, club.items),
      there(2, 'Inventaron una contraseña que solo sabían ellos dos.', both),
      there(3, `${c.name} la escribió en un papelito y la escondió.`, [c.id]),
      there(1, 'También escribieron las reglas: en el club solo había sitio para dos.', both),
      there(2, `${h.name} firmó con letra grande, y ${c.name} dibujó una estrella.`, both),
      there(3, 'Se sintieron los dos muy importantes.', both),
    ],
    [
      there(1, `Una tarde, ${named(newcomer)} se acercó y preguntó qué hacían.`, [newcomer.id]),
      there(2, `${newcomer.name} miraba todo con mucha curiosidad.`, [newcomer.id]),
      there(3, 'Se notaba que le apetecía muchísimo quedarse.', [newcomer.id]),
      there(1, `${newcomer.name} preguntó si podía entrar en ${club.name}.`, [newcomer.id]),
      there(2, `${pair} se miraron, sin saber qué decir.`, both),
      there(3, 'Las reglas estaban escritas, y eran muy claras.', both),
      there(1, `${h.name} le dijo que no, porque en el club solo había sitio para dos.`, [h.id, newcomer.id]),
      there(2, `${newcomer.name} bajó la cabeza y se fue despacito.`, [newcomer.id]),
      there(3, 'Nadie dijo nada durante un buen rato.', both),
    ],
    [
      there(1, 'Después de aquello, el club ya no era tan divertido.', both, club.items),
      there(2, `${c.name} jugaba sin ganas, mirando hacia el camino.`, [c.id]),
      there(3, `${h.name} tampoco se reía como antes.`, [h.id]),
      there(1, `${h.name} se acordó de la cara triste de ${newcomer.name}.`, [h.id]),
      there(2, `Pensó en cómo se sentiría si le dijeran que no a ${gendered(h, 'él', 'ella')}.`, [h.id]),
      there(3, 'Le dio un pellizco por dentro.', [h.id]),
      there(1, `${pair} decidieron que aquella regla no era justa.`, both),
      there(2, 'Las reglas se pueden cambiar si hacen daño a alguien.', both),
      there(3, `${c.name} tachó la regla con un crayón, muy decidid${gendered(c, 'o', 'a')}.`, [c.id]),
    ],
    [
      yard(1, `Fueron a buscar a ${newcomer.name}, que jugaba ${gendered(newcomer, 'solo', 'sola')} en el parque.`, all),
      yard(2, getScene('playground').detail),
      yard(3, `${newcomer.name} los miró, un poco sorprendid${gendered(newcomer, 'o', 'a')}.`, [newcomer.id]),
      yard(1, `${h.name} le pidió perdón y lo invitó a entrar en el club.`.replace('lo invitó', `l${gendered(newcomer, 'o', 'a')} invitó`), [h.id, newcomer.id]),
      yard(2, `A ${newcomer.name} se le iluminó la cara.`, [newcomer.id]),
      yard(3, 'Volvieron juntos, charlando por el camino.', all),
      there(1, `Le enseñaron la contraseña secreta a ${newcomer.name}.`, all),
      there(2, `${newcomer.name} la repitió tres veces para no olvidarla.`, [newcomer.id]),
      there(3, `${c.name} le hizo un sitio en el rincón más cómodo.`, [c.id]),
    ],
    [
      there(1, `Enseguida descubrieron que ${newcomer.name} ${gift}.`, [newcomer.id]),
      there(2, `Con su ayuda, el club hizo cosas que antes eran imposibles.`, all, club.items),
      there(3, `${h.name} no podía creer lo mucho que se divertían.`, [h.id]),
      there(1, 'Los tres escribieron una regla nueva: en este club siempre hay sitio para uno más.', all),
      there(2, 'Y la firmaron con tres estrellas de colores.', all),
      there(3, 'Era la mejor regla que habían escrito nunca.', all),
      there(1, 'Pronto, el club tuvo más amigos que nunca.', all),
      there(2, 'Cada uno traía algo distinto que enseñar.'),
      there(3, 'Y nadie se quedaba mirando desde fuera.'),
    ],
    [
      there(1, say([`${h.name} aprendió que un club es mejor cuando tiene la puerta abierta.`, `${h.name} aprendió que hacer sitio a alguien hace más grande la alegría.`]), [h.id]),
      there(2, 'Y que una regla que deja a alguien fuera se puede cambiar.', [h.id]),
      there(3, `${newcomer.name} se convirtió en uno de sus mejores amigos.`.replace('uno de', gendered(newcomer, 'uno de', 'una de')), [newcomer.id]),
      there(1, `Al atardecer, ${pair} se despidieron de ${newcomer.name} hasta el día siguiente.`, all),
      there(2, 'Ya estaban pensando qué harían en la próxima reunión.', all),
      there(3, 'El sol se escondía detrás de los árboles.'),
      there(2, `Esa noche, ${h.name} soñó con un club enorme, lleno de amigos.`, [h.id]),
      there(3, 'Y con una puerta que nunca se cerraba.'),
      there(1, `Y desde entonces, en ${club.name} siempre hubo sitio para uno más.`),
    ],
  ];
  return {
    title: `${h.name} y el club secreto`, place, extras: [newcomer], questId: `club-${club.id}`, variantId: newcomer.id, beats, items: club.items,
    blockIds: { opening: place.id, goal: `club-${club.id}`, obstacle: 'closed-rule', strategy: newcomer.id, discovery: 'open-door', ending: place.id },
    roles: { home: place.id, destination: place.id, newcomer: newcomer.id },
  };
}

export const FRIEND_STRUCTURES = Object.freeze([
  { id: 'activity', name: 'El plan compartido', generate: activity },
  { id: 'new-friend', name: 'El amigo nuevo', accept: (h, c) => !needsWater([h, c]), generate: newFriend },
  { id: 'quarrel', name: 'La pelea', accept: (h, c) => !needsWater([h, c]), generate: quarrel },
  { id: 'surprise', name: 'La sorpresa', accept: (h, c) => !needsWater([h, c]), generate: surprise },
  { id: 'everyone-plays', name: 'Todos juegan', accept: (h, c) => missingAbility(h, c).length > 0, generate: everyonePlays },
  { id: 'contest', name: 'La competición amistosa', accept: (h, c) => !needsWater([h, c]), generate: contest },
  { id: 'borrowed-toy', name: 'El juguete prestado', accept: (h, c) => !needsWater([h, c]), generate: borrowedToy },
  { id: 'secret-club', name: 'El club secreto', accept: (h, c) => !needsWater([h, c]) && newcomersFor(h, c).length > 0, generate: secretClub },
]);
export const FRIEND_GOAL_IDS = [...FRIEND_GOALS.map(goal => goal.id), ...INTERESTS.map(entry => `new-${entry.item}`), ...QUARRELS.map(entry => `quarrel-${entry.item}`),
  ...SURPRISES.map(entry => `surprise-${entry.id}`), ...Object.keys(ABILITY_GAMES).map(id => `game-${id}`), ...CONTESTS.map(entry => `contest-${entry.id}`),
  ...LENT_TOYS.map(entry => `borrow-${entry.id}`), ...CLUBS.map(entry => `club-${entry.id}`)];
export { activity as familyActivity };
