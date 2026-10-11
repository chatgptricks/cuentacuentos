import { getScene } from './world-catalog.js';
import { ABILITIES, fitsCast, friendWord, inPlace, named, needsWater, toPlace } from './narrative-world.js';
import { FAMILY_HOMES, FRIEND_HOMES } from './quest-catalog.js';
import { FRIEND_GOALS, FAMILY_GOALS, SOCIAL_OBSTACLES } from './story-blocks.js';
import { applyStoryLanguage } from './story-language.js';
import { familyStoryMoment } from './family-story.js';
import { CHARACTERS } from './character-catalog.js';
import { at, choose, copyCharacter, copySupporting, gendered } from './story-kit.js';

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
  const teacher = copySupporting(random, 'teacher');
  const origin = getScene(choose(random, ORIGINS));
  const home = getScene(choose(random, FRIEND_HOMES.filter(id => fitsCast([h, c], id))));
  const both = [h.id, c.id];
  const pair = `${h.name} y ${c.name}`;
  const school = at('school'), yard = at('playground'), atHome = at(home.id);
  const shy = gendered(c, 'tímido', 'tímida');
  const newcomer = gendered(c, 'un compañero nuevo', 'una compañera nueva');
  const beats = [
    [
      school(1, `Aquella mañana, llegó a la escuela ${newcomer}: ${named(c)} que venía ${ofOrigin(origin)}.`, [c.id, teacher.id]),
      school(2, getScene('school').detail),
      school(3, `${teacher.name}, la maestra, l${gendered(c, 'o', 'a')} presentó con una sonrisa.`, [teacher.id, c.id]),
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
      yard(3, `Hasta ${teacher.name} los miró, contenta, desde la puerta.`, [teacher.id]),
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
      school(2, `${teacher.name} les sonrió al despedirse en la puerta.`, [teacher.id]),
      school(3, 'Salieron juntos de la escuela, hablando sin parar.', both),
      atHome(1, `${h.name} invitó a ${c.name} a merendar en su casa.`, both),
      atHome(2, home.detail),
      atHome(3, 'Merendaron pan con miel y jugaron hasta el atardecer.', both, ['bread']),
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
    title: `${h.name} y ${gendered(c, 'el amigo nuevo', 'la amiga nueva')}`, place: getScene('school'), extras: [teacher], questId: `new-${shared.item}`, variantId: first.item, beats,
    items: [first.item, shared.item],
    blockIds: { opening: 'school', goal: `new-${shared.item}`, obstacle: first.item, strategy: origin.id, discovery: shared.item, ending: home.id },
    roles: { home: home.id, destination: 'playground', teacher: teacher.id },
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
      room(3, 'Ni siquiera quiso merendar, aunque había galletas.', [h.id], ['cookies']),
      room(1, 'Al principio estaba muy enfadad' + gendered(h, 'o', 'a') + ', pero poco a poco se puso triste.', [h.id]),
      room(2, `Abrazó su osito de peluche y suspiró.`, [h.id], ['teddy-bear']),
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
      room(3, `Se puso los zapatos y salió de casa.`, [h.id], ['new-shoes']),
    ],
    [
      porch(1, `A mitad de camino, se encontró con ${c.name}, que venía a buscarl${gendered(h, 'o', 'a')}.`, both),
      porch(2, getScene('porch').detail),
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
      room(2, `${h.name} se tapó con la manta, ${gendered(h, 'tranquilo', 'tranquila')}.`, [h.id], ['blanket']),
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
  { id: 'birthday', why: c => `era el cumpleaños de ${c.name}`, buy: ['birthday-cake', 'balloon', 'party-hat'], buyText: 'una tarta, globos y sombreros de fiesta', mishap: 'Uno de los globos explotó con un pum enorme.', fix: 'Lo llenaron de confeti, y la sorpresa quedó todavía más alegre.', fixItems: ['confetti'] },
  { id: 'cheer-up', why: c => `${c.name} estaba triste porque se le había roto su juguete favorito`, buy: ['gift-box', 'garland', 'cookies'], buyText: 'una caja de regalo, una guirnalda y galletas', mishap: 'Empezó a llover justo cuando iban a colgar la guirnalda.', fix: 'Llevaron toda la sorpresa a la sala de estar, y quedó preciosa.', fixItems: ['garland'] },
  { id: 'thank-you', why: c => `${c.name} siempre ayudaba a todo el mundo y nadie le daba las gracias`, buy: ['flower-crown', 'letter', 'pinata'], buyText: 'una corona de flores, una carta y una piñata', mishap: 'La piñata quedó colgada tan alto que nadie la alcanzaba.', fix: 'La bajaron un poco con una escalera de mano, y quedó perfecta.', fixItems: ['ladder', 'pinata'] },
];

/** D4 · La sorpresa: a reason to celebrate a friend, secret preparations, a mishap saved and the big moment. */
function surprise({ random, hero: h, companion: c }) {
  const plan = choose(random, SURPRISES);
  const helperId = choose(random, CHARACTERS.map(entry => entry.id).filter(id => id !== h.id && id !== c.id && !needsWater([{ id }])));
  const helper = copyCharacter(random, helperId);
  const party = getScene(plan.id === 'cheer-up' ? 'living-room' : 'festival-square');
  const both = [h.id, c.id];
  const team = [h.id, helper.id];
  const market = at('market'), there = at(party.id), porch = at('porch');
  const beats = [
    [
      porch(1, `${named(h)} se dio cuenta de que ${plan.why(c)}.`, [h.id]),
      porch(2, getScene('porch').detail),
      porch(3, `${h.name} se quedó pensando qué podía hacer.`, [h.id]),
      porch(1, `Así que decidió prepararle una sorpresa con ayuda de ${helper.name}, ${helper.article} ${helper.label}.`, team),
      porch(2, `${helper.name} dijo que sí enseguida, muy ${gendered(helper, 'emocionado', 'emocionada')}.`, [helper.id]),
      porch(3, 'Se prometieron no contar nada a nadie.', team),
      porch(2, `Hicieron una lista con todo lo que necesitaban.`, team),
      porch(3, `${h.name} la escribió con letra grande y clara.`, [h.id]),
      porch(1, `${c.name} no podía enterarse de nada.`),
    ],
    [
      market(1, `Fueron al mercado a buscar ${plan.buyText}.`, team, plan.buy),
      market(2, getScene('market').detail),
      market(3, 'La vendedora les regaló unas fresas para la fiesta.', team),
      market(1, 'Volvieron cargados, escondiendo todo bajo una manta.', team, ['blanket']),
      market(2, `Casi se tropiezan con ${c.name} al doblar una esquina.`, [...team, c.id]),
      market(3, `${helper.name} silbó disimulando, y ${c.name} siguió su camino.`, [helper.id, c.id]),
      there(1, `Llegaron ${toPlace(party)} y empezaron a prepararlo todo.`, team),
      there(2, party.detail),
      there(3, 'Había que darse prisa, pero sin hacer ruido.', team),
    ],
    [
      there(1, `Colgaron los adornos y colocaron cada cosa en su sitio.`, team, plan.buy),
      there(2, `${helper.name} se subió a una silla para llegar a lo más alto.`, [helper.id]),
      there(3, `${h.name} sujetaba la silla con las dos manos.`, [h.id]),
      there(1, plan.mishap, team, plan.buy),
      there(2, `${h.name} se asustó, porque ya casi no quedaba tiempo.`, [h.id]),
      there(3, `${helper.name} se rascó la cabeza, pensando.`, [helper.id]),
      there(1, plan.fix, team, plan.fixItems),
      there(2, 'Al final, todo estaba listo justo a tiempo.', team),
      there(3, 'Se escondieron detrás de una cortina, aguantando la risa.', team, ['curtain']),
    ],
    [
      there(1, `Entonces ${h.name} fue a buscar a ${c.name} con una excusa.`, both),
      there(2, `Le dijo que quería enseñarle una cosa muy rara.`, both),
      there(3, `${c.name} l${gendered(h, 'o', 'a')} siguió, sin sospechar nada.`, [c.id]),
      there(1, `Cuando ${c.name} entró, todos gritaron sorpresa a la vez.`, [c.id, ...team]),
      there(2, `${c.name} se quedó con la boca abierta.`, [c.id]),
      there(3, 'Por un momento, no supo qué decir.', [c.id]),
      there(1, `Luego se le escapó una sonrisa enorme, y abrazó a ${h.name}.`, both),
      there(2, `También abrazó a ${helper.name}, que no paraba de reírse.`, [c.id, helper.id]),
      there(3, 'Hasta se le escapó una lagrimita de alegría.', [c.id]),
    ],
    [
      there(1, `${c.name} dijo que era la mejor sorpresa de su vida.`, [c.id]),
      there(2, `${h.name} le contó cómo lo habían preparado todo, y lo del susto.`, both),
      there(3, 'Se rieron mucho con la historia.', [...both, helper.id]),
      there(1, `Celebraron juntos con todo lo que habían preparado.`, [...both, helper.id], plan.buy),
      there(2, 'Bailaron, cantaron y jugaron hasta cansarse.', [...both, helper.id]),
      there(3, `${helper.name} contó chistes que no tenían ninguna gracia, y aun así se rieron.`, [helper.id]),
      there(1, plan.id === 'birthday' ? `${c.name} no podía pensar en nada que no fuera aquella fiesta.` : `${c.name} ya no se acordaba de por qué había estado triste ese día.`, [c.id]),
      there(2, 'Al final, recogieron todo entre los tres.', [...both, helper.id]),
      there(3, 'Todo quedó tan limpio como antes.', [...both, helper.id]),
    ],
    [
      porch(1, `${h.name} aprendió que hacer feliz a un amigo también nos hace felices.`, [h.id]),
      porch(2, 'Y que las sorpresas salen bien aunque algo salga mal.', [h.id]),
      porch(3, `${helper.name} se despidió con un saludo enorme.`, [helper.id]),
      porch(1, `${c.name} le dio las gracias a ${h.name} una vez más antes de irse.`, both),
      porch(2, 'Prometió prepararle una sorpresa algún día.', [c.id]),
      porch(3, `${h.name} se quedó mirando cómo se alejaba.`, [h.id]),
      porch(2, 'Esa noche, durmió con una sonrisa.', [h.id]),
      porch(3, 'Soñó con globos, tartas y abrazos.', [h.id]),
      porch(1, `Y desde entonces, ${h.name} y ${c.name} fueron todavía más amigos.`, both),
    ],
  ];
  return {
    title: `${h.name} y la sorpresa para ${c.name}`, place: party, extras: [helper], questId: `surprise-${plan.id}`, variantId: party.id, beats,
    items: [...plan.buy, ...plan.fixItems],
    blockIds: { opening: 'porch', goal: `surprise-${plan.id}`, obstacle: plan.id, strategy: helper.id, discovery: party.id, ending: 'porch' },
    roles: { home: 'porch', destination: party.id, helper: helper.id },
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
      there(1, `${h.name} lo hizo enseguida, riendo de alegría.`, [h.id]),
      there(2, `Le gritó a ${c.name} que lo intentara también.`, [h.id]),
      there(3, 'El viento movía las hojas y todo parecía perfecto.'),
      there(1, `Pero ${c.name} lo intentó una y otra vez, y no podía.`, [c.id]),
      there(2, `${c.name} era ${gendered(c, 'un', 'una')} ${c.label}, y aquello no era lo suyo.`, [c.id]),
      there(3, 'Cada intento le salía peor que el anterior.', [c.id]),
    ],
    [
      there(1, `${c.name} se sentó en el suelo, con la cabeza baja.`, [c.id]),
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
      there(2, `${h.name} escondió unas canicas de colores por todas partes.`, [h.id], ['marbles']),
      there(3, 'Algunas en lo alto, otras en lo bajo y otras muy escondidas.', [], ['marbles']),
      there(1, 'Cuando terminaron de esconderlas, empezó la búsqueda.', both),
      there(2, `${c.name} ya sonreía otra vez, con ganas de jugar.`, [c.id]),
      there(3, 'Se dieron la mano para empezar.', both),
    ],
    [
      there(1, `${h.name} ${HUNT_USES[mine]}, y encontró tres canicas.`, [h.id], ['marbles']),
      there(2, 'Las levantó en alto, muy orgullos' + gendered(h, 'o', 'a') + '.', [h.id]),
      there(3, 'Pero quedaban muchas más por encontrar.'),
      there(1, theirs ? `${c.name} ${HUNT_USES[theirs]}, y encontró otras tres.` : `${c.name} buscaba con mucha paciencia, y encontró otras tres.`, [c.id], ['marbles']),
      there(2, `${h.name} nunca habría encontrado aquellas canicas sin su ayuda.`, [h.id]),
      there(3, `${c.name} se rio, feliz de ser útil.`, [c.id]),
      there(1, 'La última canica la encontraron juntos, ayudándose.', both, ['marbles']),
      there(2, 'Estaba en un sitio donde solo podían llegar entre los dos.', both),
      there(3, 'Chocaron las manos, muertos de risa y de alegría.', both),
    ],
    [
      there(1, `${pair} contaron las canicas: las habían encontrado todas.`, both, ['marbles']),
      there(2, 'Nadie había ganado, porque habían ganado los dos.', both),
      there(3, 'Otros amigos se acercaron a preguntar a qué jugaban.'),
      there(1, `Pronto jugaban todos, y cada uno aportaba lo que mejor sabía hacer.`),
      there(2, 'Unos buscaban arriba, otros abajo y otros escuchaban.'),
      there(3, 'El juego se hizo cada vez más divertido.'),
      there(1, `${c.name} le dio las gracias a ${h.name} por pensar en ${gendered(c, 'él', 'ella')}.`, both),
      there(2, `${h.name} le dijo que jugar juntos era lo mejor del juego.`, both),
      there(3, 'El sol empezaba a bajar sobre el campo.'),
    ],
    [
      there(1, `${h.name} aprendió que cada uno es bueno en algo distinto.`, [h.id]),
      there(2, 'Y que un buen juego es aquel en el que todos pueden jugar.', [h.id]),
      there(3, `${c.name} guardó una canica como recuerdo.`, [c.id], ['marbles']),
      there(1, `Desde entonces, ${pair} inventaban juegos para todos.`, both),
      there(2, 'Cada día probaban un juego nuevo, y a veces dos.', both),
      there(3, 'Algunos salían fatal, y se reían igual.', both),
      there(2, 'Al atardecer, se despidieron con un abrazo.', both),
      there(3, 'Se fueron a casa contando las canicas por el camino.', both, ['marbles']),
      there(1, `Y nadie volvió a quedarse sentado mirando cómo jugaban los demás.`),
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
  { id: 'drawing', scene: 'festival-square', items: ['crayons', 'paintbrush'], what: 'el concurso de dibujo', mishap: c => `Una ráfaga de viento tiró el dibujo de ${c.name} a un charco.`, help: 'le dio la mitad de su papel y le prestó sus crayones' },
  { id: 'sack-race', scene: 'race-track', items: ['sack'], what: 'la carrera de sacos', mishap: c => `${c.name} tropezó dentro de su saco y se cayó al suelo.`, help: 'se paró a ayudarle a levantarse y a meterse otra vez en el saco' },
  { id: 'sandcastle', scene: 'beach', items: ['bucket', 'shovel'], what: 'el concurso de castillos de arena', mishap: c => `Una ola deshizo el castillo de ${c.name}.`, help: 'le ayudó a construir uno nuevo con su cubo y su pala' },
  { id: 'kites', scene: 'lookout-hill', items: ['kite'], what: 'el concurso de cometas', mishap: c => `La cometa de ${c.name} se enredó en un arbusto.`, help: 'bajó su propia cometa para ayudarle a desenredarla' },
  { id: 'cookies', scene: 'festival-square', items: ['cookies', 'dough-bowl'], what: 'el concurso de galletas', mishap: c => `Las galletas de ${c.name} se cayeron al suelo.`, help: 'compartió la mitad de su masa para hacer otras galletas' },
];

/** D6 · La competición amistosa: wanting to win, a friend's stumble, choosing to help, and a different prize. */
function contest({ random, hero: h, companion: c }) {
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
      atHome(2, home.detail),
      atHome(3, 'El premio era un trofeo brillante que se veía desde lejos.', [], ['trophy']),
      atHome(1, `Su ${friendWord(c)} ${c.name} también se apuntó, muy ${gendered(c, 'contento', 'contenta')}.`, [c.id]),
      atHome(2, `${h.name} pensaba en el trofeo día y noche.`, [h.id], ['trophy']),
      atHome(3, 'Hasta soñaba con él por las noches, levantándolo en alto.', [h.id]),
      atHome(2, 'Practicaron muchas tardes, cada uno a su manera.', both, event.items),
      atHome(3, `${c.name} se reía cuando algo le salía mal, y volvía a empezar.`, [c.id]),
      atHome(1, `${h.name} quería ganar como fuera, costara lo que costara.`, [h.id]),
    ],
    [
      there(1, `Por fin llegó el día, y fueron ${toPlace(place)}.`, both),
      there(2, place.detail),
      there(3, 'Había muchos participantes, mucho público y muchos nervios.'),
      there(1, `${judge.name}, ${judge.article} ${judge.label}, explicó las reglas del concurso.`, [judge.id]),
      there(2, 'Cada uno tenía su sitio y sus materiales preparados.', both, event.items),
      there(3, `${c.name} le guiñó un ojo a ${h.name} para desearle suerte.`, both),
      there(1, `${judge.name} tocó un silbato, y el concurso empezó.`, [judge.id], ['whistle']),
      there(2, `${h.name} se concentró muchísimo, sin mirar a nadie más.`, [h.id]),
      there(3, 'Se oían risas, gritos de ánimo y nervios por todas partes.'),
    ],
    [
      there(1, `A ${h.name} le estaba saliendo de maravilla.`, [h.id], event.items),
      there(2, 'Iba por delante de todos, y ya casi tocaba el trofeo.', [h.id], ['trophy']),
      there(3, 'El público aplaudía con fuerza al verl' + gendered(h, 'o', 'a') + '.', [h.id]),
      there(1, event.mishap(c), [c.id], event.items),
      there(2, `${c.name} se quedó mirando, con los ojos llenos de lágrimas.`, [c.id]),
      there(3, 'Nadie se paraba a ayudarle, porque todos querían ganar.', [c.id]),
      there(1, `${h.name} dudó un momento, porque quería ganar.`, [h.id]),
      there(2, 'Si se paraba, perdería su ventaja y quizá el trofeo.', [h.id], ['trophy']),
      there(3, 'Miró el trofeo, y luego miró a su amigo.'.replace('su amigo', gendered(c, 'su amigo', 'su amiga')), [h.id], ['trophy']),
    ],
    [
      there(1, `Al final, ${h.name} ${event.help}.`, both, event.items),
      there(2, `${c.name} no podía creerlo, y se le iluminó la cara.`, [c.id]),
      there(3, 'El público se quedó en silencio, mirando sin entender nada.'),
      there(1, `Trabajaron juntos, y ${c.name} volvió a sonreír.`, both),
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
      there(2, `La medalla brillaba más que cualquier trofeo, pensó ${h.name}.`, [h.id], ['medal', 'trophy']),
      there(3, `${c.name} abrazó a ${h.name} con mucha fuerza.`, both),
      there(1, `${c.name} le dio las gracias por haberse parado a ayudar.`, both),
      there(2, `${h.name} le dijo que lo volvería a hacer mil veces.`, [h.id]),
      there(3, 'Volvieron a casa con las medallas puestas.', both, ['medal']),
    ],
    [
      atHome(1, `${h.name} aprendió que ayudar a un amigo vale más que ganar.`, [h.id]),
      atHome(2, 'Y que los mejores premios no siempre son trofeos.', [h.id], ['trophy']),
      atHome(3, `${c.name} colgó su medalla junto a la ventana.`, [c.id], ['medal']),
      atHome(1, `Al año siguiente, ${pair} se apuntaron otra vez, juntos.`, both),
      atHome(2, 'Esta vez decidieron participar en equipo.', both),
      atHome(3, 'Y se divirtieron todavía más que la primera vez.', both),
      atHome(2, `Esa noche, ${h.name} se durmió acariciando su medalla.`, [h.id], ['medal']),
      atHome(3, 'Afuera, las estrellas brillaban como medallas en el cielo.'),
      atHome(1, `Y desde entonces, ${pair} nunca dejaron a nadie atrás.`, both),
    ],
  ];
  return {
    title: `${h.name} y ${event.what}`, place, extras: [judge], questId: `contest-${event.id}`, variantId: judge.id, beats, items: [...event.items, 'medal', 'trophy', 'whistle'],
    blockIds: { opening: home.id, goal: `contest-${event.id}`, obstacle: event.id, strategy: judge.id, discovery: place.id, ending: home.id },
    roles: { home: home.id, destination: place.id, judge: judge.id },
  };
}

export const FRIEND_STRUCTURES = Object.freeze([
  { id: 'activity', name: 'El plan compartido', generate: activity },
  { id: 'new-friend', name: 'El amigo nuevo', accept: (h, c) => !needsWater([h, c]), generate: newFriend },
  { id: 'quarrel', name: 'La pelea', accept: (h, c) => !needsWater([h, c]), generate: quarrel },
  { id: 'surprise', name: 'La sorpresa', accept: (h, c) => !needsWater([h, c]), generate: surprise },
  { id: 'everyone-plays', name: 'Todos juegan', accept: (h, c) => missingAbility(h, c).length > 0, generate: everyonePlays },
  { id: 'contest', name: 'La competición amistosa', accept: (h, c) => !needsWater([h, c]), generate: contest },
]);
export const FRIEND_GOAL_IDS = [...FRIEND_GOALS.map(goal => goal.id), ...INTERESTS.map(entry => `new-${entry.item}`), ...QUARRELS.map(entry => `quarrel-${entry.item}`),
  ...SURPRISES.map(entry => `surprise-${entry.id}`), ...Object.keys(ABILITY_GAMES).map(id => `game-${id}`), ...CONTESTS.map(entry => `contest-${entry.id}`)];
export { activity as familyActivity };
