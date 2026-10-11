import { getScene } from './world-catalog.js';
import { inPlace, toPlace } from './narrative-world.js';
import { FAMILY_HOMES } from './quest-catalog.js';
import { FAMILY_GOALS } from './story-blocks.js';
import { familyActivity } from './structures-social.js';
import { at, choose, copySupporting } from './story-kit.js';

/**
 * Mi familia: the child leads, one relative shares the story. A baby cannot talk or help
 * with tools, so every sentence a baby takes part in has its own baby version.
 */
const homeOf = random => getScene(choose(random, FAMILY_HOMES));

/** First times, where they happen, what scares and what the relative does to help. */
const FIRSTS = [
  { id: 'bike', scene: 'playground', items: ['bicycle', 'helmet'], first: 'montar en bicicleta sin rueditas', fear: 'Le daba miedo caerse y hacerse daño.', ready: 'Se puso el casco y se subió a la bicicleta.', help: c => `${c.name} sujetó el sillín y corrió a su lado.`, wobble: 'La primera vez se tambaleó y puso un pie en el suelo.', success: 'Al tercer intento, la bicicleta avanzó recta, sin que nadie la sujetara.' },
  { id: 'school', scene: 'school', items: ['pencil-case', 'chalkboard'], first: 'ir a la escuela nueva', fear: 'Le daba miedo no conocer a nadie.', ready: 'Preparó su estuche favorito con muchas ganas de aprender.', help: c => `${c.name} le acompañó hasta la puerta y le dio un abrazo.`, wobble: 'Al principio no se atrevía a hablar con nadie.', success: 'Antes del recreo, ya dibujaba en la pizarra con dos compañeros nuevos.' },
  { id: 'dentist', scene: 'clinic', items: ['toothbrush', 'teddy-bear'], first: 'ir a la consulta del dentista', fear: 'Le daba miedo el sillón y las luces.', ready: 'Llevó su osito de peluche para que le hiciera compañía.', help: c => `${c.name} le tomó de la mano en la sala de espera.`, wobble: 'Al sentarse en el sillón, le temblaron un poco las rodillas.', success: 'El dentista contó sus dientes y dijo que estaban muy limpios.', person: 'dentist' },
  { id: 'swim', scene: 'beach', items: ['float-ring'], first: 'nadar con flotador en el mar', fear: 'Le daba miedo el agua fría y las olas.', ready: 'Se puso el flotador, bien ajustado.', help: c => `${c.name} se quedó a su lado, en el agua bajita.`, wobble: 'La primera ola le salpicó la cara y le hizo toser.', success: 'Pataleó con fuerza y flotó como un barquito feliz.' },
  { id: 'train', scene: 'train-station', items: ['lunchbox'], first: 'viajar en tren', fear: 'Le daba miedo el ruido del tren al llegar.', ready: 'Preparó una lonchera con fruta para el viaje.', help: c => `${c.name} le tapó los oídos cuando el tren silbó.`, wobble: 'Cuando el tren llegó, dio un paso atrás.', success: 'El tren arrancó, y el paisaje empezó a correr por la ventanilla.' },
  { id: 'shoes', scene: 'porch', items: ['new-shoes'], first: 'atarse los zapatos nuevos', fear: 'Los cordones se le escapaban de los dedos.', ready: 'Se sentó en el escalón con sus zapatos nuevos.', help: c => `${c.name} le enseñó el truco de las orejas de conejo.`, wobble: 'El primer lazo se deshizo en cuanto dio un paso.', success: 'Por fin hizo un lazo con dos orejas de conejo bien fuertes.' },
  { id: 'sleep', scene: 'bedroom', items: ['night-lamp', 'teddy-bear'], first: 'dormir en su cama nueva', fear: 'Le daba miedo la oscuridad de la habitación.', ready: 'Colocó su osito de peluche y su lamparita de noche.', help: c => `${c.name} le leyó un cuento sentado en el borde de la cama.`, wobble: 'Al apagar la luz grande, sintió un poco de miedo.', success: 'Con la lamparita encendida, la habitación parecía un lugar amable.' },
];

/** E2 · La primera vez: something new, the fear, the relative's company, a wobble and a success. */
function firstTime({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const first = choose(random, FIRSTS);
  const person = first.person ? copySupporting(random, first.person) : null;
  const home = homeOf(random);
  const both = [h.id, c.id];
  const atHome = at(home.id), there = at(first.scene);
  const extra = person ? [person.id] : [];
  const help = baby ? `${c.name} miraba desde su cochecito y aplaudía con sus manitas.` : first.help(c);
  const beats = [
    [
      atHome(1, `Aquel día, ${h.name} iba a ${first.first} por primera vez.`, [h.id], first.items),
      atHome(2, home.detail),
      atHome(3, `${h.name} se despertó muy temprano, con un cosquilleo en la barriga.`, [h.id]),
      atHome(1, first.fear, [h.id]),
      atHome(2, `${h.name} se lo contó a ${c.name} en voz bajita.`, both),
      atHome(3, baby ? `${c.name} le agarró un dedo con su manita.` : `${c.name} le escuchó sin interrumpir ni una vez.`, both),
      atHome(2, baby ? `${c.name} le sonrió, y eso le dio ánimos.` : `${c.name} le contó que a todo el mundo le pasa la primera vez.`, both),
      atHome(3, `${h.name} respiró hondo tres veces, despacio, como le habían enseñado.`, [h.id]),
      atHome(1, baby ? `${h.name} decidió intentarlo, y ${c.name} iría con ${h.name}.` : `${c.name} prometió acompañarle todo el tiempo.`, both),
    ],
    [
      atHome(1, first.ready, [h.id], first.items),
      atHome(2, 'Lo preparó todo con mucho cuidado, revisándolo dos veces.', [h.id]),
      atHome(3, baby ? `${c.name} balbuceó, como si diera consejos.` : `${c.name} le ayudó a revisar que no faltara nada.`, both),
      there(1, `Llegó el momento, y juntos fueron ${toPlace(getScene(first.scene))}.`, both),
      there(2, getScene(first.scene).detail),
      there(3, 'Había mucha gente, muchos ruidos y algunas caras nuevas.', extra),
      there(1, help, both),
      there(2, `Con esa ayuda, ${h.name} se sintió un poco más valiente.`, [h.id]),
      there(3, person ? `${person.name}, ${person.article} ${person.label}, les saludó con una gran sonrisa.` : 'Una brisa suave les despeinó un poquito.', extra),
    ],
    [
      there(1, `${h.name} lo intentó por primera vez.`, [h.id], first.items),
      there(2, 'El corazón le latía muy deprisa, como un tambor pequeñito.', [h.id]),
      there(3, baby ? `${c.name} lo miraba con los ojos muy abiertos.` : `${c.name} no le quitaba los ojos de encima.`, [c.id]),
      there(1, first.wobble, [h.id]),
      there(2, `Por un momento, ${h.name} quiso volver a casa.`, [h.id]),
      there(3, 'Se le escapó un suspiro largo, de esos que salen solos.', [h.id]),
      there(1, baby ? `Pero ${c.name} se rio, y ${h.name} se rio también.` : `Pero ${c.name} le recordó que equivocarse es parte de aprender.`, both),
      there(2, `${h.name} respiró hondo una vez más y se secó las manos.`, [h.id]),
      there(3, 'Y decidió intentarlo otra vez, con más calma que antes.', [h.id]),
    ],
    [
      there(1, `Esta vez, ${h.name} fue más despacio y con más calma.`, [h.id], first.items),
      there(2, 'Se concentró en un solo paso cada vez, sin pensar en el siguiente.', [h.id]),
      there(3, baby ? `${c.name} dio un gritito de emoción.` : `${c.name} le animaba en voz baja.`, [c.id]),
      there(1, first.success, [h.id], first.items),
      there(2, `${h.name} no podía creerlo, y se pellizcó por si estaba soñando.`, [h.id]),
      there(3, 'Se le escapó una carcajada enorme que se oyó por todas partes.', [h.id]),
      there(1, baby ? `${c.name} aplaudió con sus manitas, con mucha alegría.` : `${c.name} aplaudió y le dio un abrazo enorme.`, both),
      there(2, 'Lo repitieron una y otra vez, y cada vez salía un poco mejor.', both),
      there(3, person ? `${person.name} les guiñó un ojo desde lejos.` : 'El cielo parecía más bonito que nunca.', extra),
    ],
    [
      there(1, `${h.name} sintió un orgullo enorme dentro del pecho.`, [h.id]),
      there(2, 'Ya no quedaba ni rastro del miedo que había sentido por la mañana.', [h.id]),
      there(3, `${h.name} quería contárselo a todo el mundo.`, [h.id]),
      atHome(1, `Volvieron ${toPlace(home)} dando saltitos de alegría.`, both),
      atHome(2, baby ? `${c.name} se durmió por el camino, muy a gusto.` : `Por el camino, ${c.name} le preguntó qué había sido lo mejor.`, both),
      atHome(3, `${h.name} dijo que lo mejor había sido no rendirse.`, [h.id]),
      atHome(1, `En casa, ${h.name} dibujó aquel momento para no olvidarlo nunca.`, [h.id]),
      atHome(2, 'Colgó el dibujo en la nevera, bien a la vista de todos.', [h.id]),
      atHome(3, baby ? `${c.name} lo miró y balbuceó muy feliz.` : `${c.name} dijo que era el mejor dibujo de la casa.`, [c.id]),
    ],
    [
      atHome(1, `${h.name} aprendió que el miedo se hace pequeño cuando lo intentamos acompañados.`, [h.id]),
      atHome(2, 'Y que las primeras veces solo pasan una vez.', [h.id]),
      atHome(3, 'Por eso son tan especiales y hay que disfrutarlas.', [h.id]),
      atHome(1, baby ? `Esa noche, ${h.name} le contó la aventura a ${c.name} antes de dormir.` : `Esa noche, ${h.name} le dio las gracias a ${c.name} por acompañarle.`, both),
      atHome(2, baby ? `${c.name} se quedó en calma escuchando.` : `${c.name} le dijo que había sido pura valentía.`, both),
      atHome(3, 'Afuera, las estrellas brillaban como pequeños aplausos.'),
      atHome(2, `${h.name} se tapó con su manta favorita.`, [h.id], ['blanket']),
      atHome(3, 'Pensó en todo lo que le gustaría intentar la próxima vez.', [h.id]),
      atHome(1, `Y se durmió con una sonrisa, soñando con su próxima primera vez.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: la primera vez`, place: getScene(first.scene), extras: person ? [person] : [], questId: `first-${first.id}`, variantId: first.scene, beats, items: first.items,
    blockIds: { opening: home.id, goal: `first-${first.id}`, obstacle: first.id, strategy: first.scene, discovery: first.id, ending: home.id },
    roles: { home: home.id, destination: first.scene },
  };
}

/** Chores a child can share, a mistake each one invites and how to fix it together. */
const CHORES = [
  { id: 'cookies', scene: 'kitchen', items: ['apron', 'dough-bowl', 'wooden-spoon', 'cookies'], task: 'hacer galletas', start: 'Se pusieron el delantal y se lavaron las manos.', step: 'Mezclaron la masa con la cuchara de madera.', mistake: 'Echaron demasiada harina, y la cocina se llenó de una nube blanca.', fix: 'Se rieron, limpiaron juntos y volvieron a medir con cuidado.', result: 'Las galletas salieron doraditas y olían de maravilla.' },
  { id: 'bread', scene: 'kitchen', items: ['apron', 'dough-bowl', 'bread'], task: 'hacer pan', start: 'Se pusieron el delantal y prepararon la harina.', step: 'Amasaron la masa hasta que quedó suave.', mistake: 'La masa no subía, porque la ventana abierta dejaba entrar frío.', fix: 'Cerraron la ventana y taparon la masa con un paño.', result: 'La barra de pan salió crujiente y calentita.' },
  { id: 'soup', scene: 'kitchen', items: ['apron', 'soup', 'wooden-spoon'], task: 'preparar una sopa', start: 'Se pusieron el delantal y lavaron las verduras.', step: 'Echaron las verduras y removieron con la cuchara de madera.', mistake: 'Se olvidaron de la sal, y la sopa sabía a agua.', fix: 'La probaron, añadieron una pizca y removieron despacio.', result: 'La sopa caliente quedó deliciosa, y la casa olía de maravilla.' },
  { id: 'leaves', scene: 'porch', items: ['broom', 'dry-leaves', 'sack'], task: 'barrer las hojas del porche', start: 'Tomaron una escoba cada uno y se pusieron manos a la obra.', step: 'Barrieron las hojas secas hasta hacer un montón enorme.', mistake: 'Cuando terminaron el montón, el viento lo deshizo de un soplo.', fix: 'Esta vez metieron las hojas secas en un saco antes de que volviera el viento.', result: 'El porche quedó limpio, y las hojas sirvieron para abonar el huerto.' },
  { id: 'garden', scene: 'garden', items: ['shovel', 'watering-can', 'seed'], task: 'plantar semillas en el jardín', start: 'Prepararon la pala y la regadera.', step: 'Hicieron agujeritos en la tierra con la pala.', mistake: 'Plantaron las semillas demasiado juntas, todas en el mismo hoyo.', fix: 'Las separaron con cuidado para que cada una tuviera su sitio.', result: 'Días después, salieron brotes verdes en una fila perfecta.' },
  { id: 'tidy', scene: 'playroom', items: ['cardboard-box'], task: 'ordenar el cuarto de juegos', start: 'Trajeron unas cajas de cartón vacías.', step: 'Recogieron los juguetes del suelo, uno a uno.', mistake: 'Lo metieron todo en la misma caja, y luego no encontraban nada.', fix: 'Dibujaron en cada caja de cartón lo que había dentro.', result: 'El cuarto quedó ordenado, y cada juguete tenía su casa.' },
];

/** E3 · Ayudantes de casa: a chore shared, a mistake, laughing it off and a result to enjoy. */
function helpers({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const selectedChore = choose(random, CHORES);
  const babyActions = {
    cookies: { start: 'se lavó las manos y preparó la masa de galletas.', step: 'mezcló la masa con la cuchara de madera.', mistake: 'echó demasiada harina y vio una nube blanca en la cocina.', fix: 'limpió con calma y volvió a medir la harina con cuidado.' },
    bread: { start: 'se puso el delantal y preparó la harina.', step: 'amasó la masa hasta que quedó suave.', mistake: 'vio que la masa no subía porque entraba frío por la ventana.', fix: 'cerró la ventana y tapó la masa con un paño.' },
    soup: { start: 'se lavó las manos y preparó las verduras.', step: 'removió las verduras con la cuchara de madera.', mistake: 'probó la sopa y notó que había olvidado la sal.', fix: 'añadió una pizca de sal y removió despacio.' },
    leaves: { start: 'tomó la escoba y empezó a barrer el porche.', step: 'barrió las hojas secas hasta formar un montón.', mistake: 'vio cómo el viento deshacía su montón de hojas.', fix: 'metió las hojas secas en un saco antes de que volviera el viento.' },
    garden: { start: 'preparó la pala y la regadera para plantar.', step: 'hizo agujeritos en la tierra con la pala.', mistake: 'plantó varias semillas demasiado juntas en el mismo hoyo.', fix: 'separó las semillas con cuidado para que cada una tuviera sitio.' },
    tidy: { start: 'trajo unas cajas de cartón para ordenar los juguetes.', step: 'recogió los juguetes del suelo, uno a uno.', mistake: 'metió todo en una sola caja y luego no encontraba nada.', fix: 'dibujó en cada caja de cartón los juguetes que había dentro.' },
  };
  const chore = baby ? { ...selectedChore, ...Object.fromEntries(Object.entries(babyActions[selectedChore.id]).map(([key, text]) => [key, `${h.name} ${text}`])) } : selectedChore;
  const home = homeOf(random);
  const both = [h.id, c.id];
  const there = at(chore.scene), atHome = at(home.id);
  const watch = chore.scene === 'kitchen' ? 'desde su trona' : 'desde su mantita';
  const beats = [
    [
      atHome(1, `Un sábado, ${h.name} y ${c.name} decidieron ${chore.task}.`, both),
      atHome(2, home.detail),
      atHome(3, `${h.name} se frotó las manos, con muchísimas ganas de empezar cuanto antes.`, [h.id]),
      there(1, chore.start, both, chore.items),
      there(2, chore.scene === home.id ? 'Eligieron el mejor rincón para trabajar cómodos.' : getScene(chore.scene).detail),
      there(3, baby ? `${c.name} miraba ${watch}, sin perderse nada.` : `${c.name} explicó cada paso con paciencia.`, [c.id]),
      there(2, baby ? `${h.name} le explicaba cada paso a ${c.name}, con mucha paciencia.` : `${h.name} escuchaba con mucha atención cada explicación.`, both),
      there(3, 'Todo estaba preparado y ordenado para empezar a trabajar juntos.'),
      there(1, chore.step, both, chore.items),
    ],
    [
      there(1, baby ? `${c.name} hizo palmas cada vez que ${h.name} terminaba algo.` : `${c.name} hacía una parte, y ${h.name} hacía la otra.`, both),
      there(2, baby ? `${h.name} trabajaba sin prisa mientras ${c.name} miraba con curiosidad.` : 'Trabajaban a buen ritmo, sin prisa y sin dejar de sonreír.', both),
      there(3, baby ? `${h.name} cantaba bajito para hacer compañía a ${c.name}.` : 'De vez en cuando, cantaban una canción sobre lo que estaban haciendo.', both),
      there(1, chore.mistake, both, chore.items),
      there(2, `${h.name} se quedó sin moverse, sin saber qué decir.`, [h.id]),
      there(3, baby ? `${c.name} soltó una risita muy graciosa.` : `${c.name} se tapó la boca para no reírse.`, [c.id]),
      there(1, 'Y al final, los dos se echaron a reír.', both),
      there(2, 'Equivocarse también podía ser divertido, si se hacía en buena compañía.', both),
      there(3, baby ? `${h.name} respiró hondo y volvió a empezar con calma.` : 'Se limpiaron la cara, respiraron hondo y volvieron a empezar.', both),
    ],
    [
      there(1, chore.fix, both, chore.items),
      there(2, `${h.name} pensó que así tenía mucho más sentido.`, [h.id]),
      there(3, baby ? `${c.name} balbuceó, como si estuviera de acuerdo.` : `${c.name} le felicitó por la idea.`, [c.id]),
      there(1, baby ? `${h.name} lo hizo más despacio y con más cuidado.` : 'Esta vez lo hicieron más despacio y con más cuidado.', both),
      there(2, 'Cada paso salía un poco mejor que el anterior, y eso les animaba.', both),
      there(3, 'El tiempo pasó volando, como pasa siempre que algo nos gusta.', both),
      there(1, `${h.name} se sintió capaz de hacer cosas de mayores.`, [h.id]),
      there(2, baby ? `${c.name} parecía muy feliz de verle.` : `${c.name} le dijo que era una gran ayuda.`, [c.id]),
      there(3, baby ? `${h.name} terminó el trabajo mientras ${c.name} hacía palmas.` : 'Hasta silbaron una melodía alegre mientras terminaban.', both),
    ],
    [
      there(1, chore.result, both, chore.items),
      there(2, `${h.name} no podía dejar de mirarlo, con los ojos muy abiertos.`, [h.id]),
      there(3, 'Era el resultado de su trabajo en equipo, y se notaba.', both),
      there(1, `${h.name} y ${c.name} ${baby ? 'se sonrieron, muy orgullosos del trabajo' : 'chocaron las manos, muy orgullosos'}.`, both),
      there(2, 'Lo habían conseguido juntos, paso a paso y sin rendirse.', both),
      there(3, 'Hasta la casa entera parecía más contenta que por la mañana.'),
      there(1, baby ? `${h.name} recogió todo para dejar el rincón ordenado.` : 'Después recogieron todo, para dejarlo como estaba.', both),
      there(2, baby ? `${h.name} lo recogió todo mientras ${c.name} miraba.` : 'Uno lavaba y el otro secaba.', both),
      there(3, 'Recoger también formaba parte de ayudar, aunque fuera la parte menos divertida.', both),
    ],
    [
      atHome(1, `Por la tarde, compartieron el resultado con toda la casa.`, both),
      atHome(2, `${h.name} contó la historia del error, y todos se rieron.`, [h.id]),
      atHome(3, 'La risa se oía desde la calle, y algún vecino se asomó a mirar.'),
      atHome(1, baby ? `${c.name} se quedó en calma en su cuna, muy a gusto.` : `${c.name} dijo que había sido la mejor tarde en mucho tiempo.`, both),
      atHome(2, `${h.name} pensó exactamente lo mismo, y sonrió.`, [h.id]),
      atHome(3, 'Ya estaban pensando qué cosa nueva harían la próxima vez.', both),
      atHome(1, `${h.name} aprendió que ayudar en casa es una forma de cuidar a la familia.`, [h.id]),
      atHome(2, 'Y que los errores, compartidos, se arreglan mejor.', [h.id]),
      atHome(3, 'Afuera, el sol se escondía despacio detrás de los tejados.'),
    ],
    [
      atHome(1, 'Esa noche, cenaron juntos alrededor de la mesa.', both),
      atHome(2, `${h.name} tenía las manos cansadas, pero el corazón contento.`, [h.id]),
      atHome(3, 'Hasta bostezó en mitad de la cena, y todos se rieron con cariño.', [h.id]),
      atHome(1, `Antes de dormir, ${h.name} le dio un abrazo a ${c.name}.`, both),
      atHome(2, baby ? `${c.name} le respondió con un sonido muy dulce.` : `${c.name} le dio las gracias por toda su ayuda.`, both),
      atHome(3, 'La casa quedó en silencio, y solo se oía el tictac del reloj.'),
      atHome(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      atHome(3, 'Soñó con más tareas, más errores divertidos y más risas.', [h.id]),
      atHome(1, `Y se durmió pensando en lo bien que se trabaja en familia.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: ayudantes de casa`, place: getScene(chore.scene), questId: `chore-${chore.id}`, variantId: chore.scene, beats, items: chore.items,
    blockIds: { opening: home.id, goal: `chore-${chore.id}`, obstacle: chore.id, strategy: chore.scene, discovery: chore.id, ending: home.id },
    roles: { home: home.id, destination: chore.scene },
  };
}

/** When the relative needs care: what happened and three small acts of care. */
const CARES = [
  { id: 'cold', scene: 'living-room', what: c => `${c.name} se había resfriado y necesitaba descansar`, acts: [['Le llevó un pañuelo limpio, doblado con cuidado.', ['handkerchief']], ['Le trajo el termómetro, como hacían con todos en casa.', ['thermometer']], ['Le dejó descansar y se quedó cerca para acompañarle.', []]], better: 'Al día siguiente, ya estornudaba mucho menos.' },
  { id: 'tired', scene: 'living-room', what: c => `${c.name} había trabajado mucho y estaba sin energía`, acts: [['Le llevó un vaso de leche para tomar despacio.', ['glass-of-milk']], ['Le leyó su libro de cuentos favorito.', ['storybook']], ['Le preguntó si quería seguir el cuento o descansar.', []]], better: 'Después de descansar, volvió a tener ganas de jugar.' },
  { id: 'sad', scene: 'living-room', what: c => `${c.name} estaba triste porque se le había roto su taza favorita`, acts: [['Le hizo un dibujo de una taza nueva, llena de colores.', []], ['Le sirvió leche en otra taza, la más bonita de la casa.', ['teacup']], ['Le contó su chiste más gracioso, dos veces.', []]], better: 'Al rato, la tristeza se convirtió en una sonrisa.' },
  { id: 'sleepy', scene: 'bedroom', what: c => `${c.name} había dormido muy poco y tenía mucho sueño`, acts: [['Le llevó su almohada más blandita.', ['pillow']], ['Le habló muy bajito para mantener la calma del dormitorio.', []], ['Le leyó un libro de cuentos en voz muy bajita.', ['storybook']]], better: 'Después de una buena siesta, se despertó con mucha energía.' },
  { id: 'scrape', scene: 'porch', what: c => `${c.name} se había raspado la rodilla en el jardín`, acts: [['Le trajo una tirita y se la puso con mucho cuidado.', ['bandage']], ['Le sopló en la rodilla para que no doliera.', []], ['Le prestó su pañuelo favorito para secarse las lágrimas.', ['handkerchief']]], better: 'Al rato, la rodilla ya casi no dolía.' },
];
const BABY_CARE = { id: 'teeth', scene: 'bedroom', what: c => `a ${c.name} le estaban saliendo los dientes y no paraba de llorar`, acts: [['Le cantó una canción muy suave.', []], ['Le dio cuerda a la caja de música.', ['music-box']], ['Le acercó su osito de peluche.', ['teddy-bear']]], better: `Al rato, el llanto se convirtió en una sonrisa.` };

/** E4 · El día al revés: the child cares for the relative, and discovers how it feels to care. */
function reversedDay({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const care = baby ? BABY_CARE : choose(random, CARES);
  const home = homeOf(random);
  const both = [h.id, c.id];
  const there = at(care.scene), atHome = at(home.id);
  const [[act1, items1], [act2, items2], [act3, items3]] = care.acts;
  const beats = [
    [
      atHome(1, `Aquella mañana, ${h.name} se despertó con ganas de jugar.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, 'Afuera, los pájaros cantaban muy contentos.'),
      there(1, `Pero ${care.what(c)}.`, [c.id]),
      there(2, getScene(care.scene).detail),
      there(3, 'La casa estaba más silenciosa que de costumbre.'),
      there(2, `${h.name} se quedó mirando un momento, sin saber qué hacer.`, [h.id]),
      there(3, 'Pensó en todas las veces que le habían cuidado.', [h.id]),
      there(1, `Entonces decidió que ese día cuidaría de ${c.name}.`, [h.id]),
    ],
    [
      there(1, `Primero, ${h.name} hizo algo pequeño: ${act1[0].toLocaleLowerCase('es')}${act1.slice(1, -1)}.`, both, items1),
      there(2, baby ? `${c.name} dejó de llorar un momento para mirarle.` : `${c.name} le sonrió con mucho cariño.`, [c.id]),
      there(3, `${h.name} sintió algo calentito en el pecho.`, [h.id]),
      there(1, act2, both, items2),
      there(2, 'Lo hizo con mucho cuidado y sin hacer ruido.', [h.id]),
      there(3, 'Hasta caminaba de puntillas para no hacer ningún ruido.', [h.id]),
      there(1, act3, both, items3),
      there(2, `${c.name} cerró los ojos un momento, con calma.`, [c.id]),
      there(3, `${h.name} se sentó a su lado y le tomó la mano.`, both),
    ],
    [
      there(1, `${h.name} se quedó cerca todo el tiempo, por si ${c.name} necesitaba algo.`, both),
      there(2, 'Cuidar a alguien era más difícil de lo que parecía.', [h.id]),
      there(3, 'Había que estar pendiente a muchas cosas a la vez.', [h.id]),
      there(1, `Entonces entendió todo lo que ${c.name} hacía por su familia cada día.`, [h.id]),
      there(2, 'Los cuidados pequeños se notaban mucho.', [h.id]),
      there(3, 'Y se hacían con el corazón, sin esperar nada a cambio.', [h.id]),
      there(1, `${h.name} le dio un beso suave en la frente a ${c.name}.`, both),
      there(2, baby ? `${c.name} soltó un suspiro largo y tranquilo.` : `${c.name} le dijo que era el mejor cuidado del mundo.`, [c.id]),
      there(3, 'Afuera, una nube tapó el sol un momento.'),
    ],
    [
      there(1, care.better, both),
      there(2, `${h.name} sintió una alegría enorme dentro del pecho.`, [h.id]),
      there(3, 'Todo el esfuerzo del día había valido la pena.', [h.id]),
      there(1, baby ? `${c.name} le agarró el dedo con fuerza, como dando las gracias.` : `${c.name} le dio las gracias con un abrazo largo.`, both),
      there(2, 'Fue un abrazo de los que no se olvidan.', both),
      there(3, 'Se quedaron así un buen rato, sin decir nada.', both),
      there(1, `Por la tarde, jugaron a algo tranquilo los dos juntos.`, both),
      there(2, 'Un juego de mirar las nubes por la ventana.', both),
      there(3, 'Encontraron un dragón, un barco y una tortuga.', both),
    ],
    [
      atHome(1, `${h.name} aprendió que cuidar a quien queremos es una forma de quererle.`, [h.id]),
      atHome(2, 'Y que los cuidados pequeños hacen sentir muy grande.', [h.id]),
      atHome(3, 'Recordó los cuidados pequeños que habían ayudado a descansar.'),
      atHome(1, `Desde entonces, ${h.name} buscaba cada día un pequeño cuidado para regalar.`, [h.id]),
      atHome(2, 'A veces era un dibujo, y a veces un abrazo.', [h.id]),
      atHome(3, 'Nadie en la casa se quedaba sin su pequeño regalo.'),
      atHome(2, 'La casa se llenó de detalles bonitos.'),
      atHome(3, 'Y de abrazos a todas horas, también sin motivo.'),
      atHome(1, baby ? `${c.name} sonreía al notar aquel cuidado tan cercano.` : `${c.name} decía que tenía el cariño más grande del mundo a su lado.`, [c.id]),
    ],
    [
      atHome(1, `Esa noche, ${h.name} se metió en la cama con el corazón lleno.`, [h.id]),
      atHome(2, baby ? `${c.name} dormía ya, en paz por fin.` : `${c.name} vino a darle las buenas noches.`, [c.id]),
      atHome(3, 'La habitación estaba en calma y todo invitaba a descansar.'),
      atHome(1, baby ? `${h.name} le susurró buenas noches a ${c.name} desde la puerta.` : `Esta vez, fue ${c.name} quien arropó a ${h.name}.`, both),
      atHome(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      atHome(3, 'Todo estaba en calma, y la luna asomaba por la ventana.'),
      atHome(2, `${h.name} respiró hondo y despacio, una vez más.`, [h.id]),
      atHome(3, 'Los ojos se le cerraron poquito a poco.', [h.id]),
      atHome(1, `Y se durmió feliz, sabiendo que en su casa todos se cuidaban.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: el día al revés`, place: getScene(care.scene), questId: `care-${care.id}`, variantId: care.scene, beats, items: [...items1, ...items2, ...items3],
    blockIds: { opening: home.id, goal: `care-${care.id}`, obstacle: care.id, strategy: care.scene, discovery: care.id, ending: home.id },
    roles: { home: home.id, destination: care.scene },
  };
}

/** Old things in the attic trunk, the memory each one keeps and the game it starts. */
const MEMORIES = [
  { item: 'spinning-top', what: 'una peonza de madera', memory: () => 'hace muchos años, se pasaba las tardes haciendo bailar aquella peonza', game: 'Hicieron bailar la peonza por turnos, a ver quién aguantaba más.' },
  { item: 'rag-doll', what: 'una muñeca de trapo', memory: () => 'aquella muñeca le había acompañado en sus primeras noches', game: 'Le inventaron un nombre nuevo y una casita de cartón.', extra: ['cardboard-box'] },
  { item: 'marbles', what: 'una bolsita de canicas', memory: () => 'había ganado aquellas canicas en un juego, hace mucho tiempo', game: 'Dibujaron un círculo en el suelo y jugaron a las canicas.' },
  { item: 'music-box', what: 'una caja de música', memory: () => 'aquella canción había sonado en su habitación muchos años atrás', game: 'Bailaron despacito al ritmo de la caja de música.' },
  { item: 'paper-plane', what: 'un avión de papel muy viejo', memory: () => 'había hecho aquel avión de papel en su primer día de escuela', game: 'Doblaron aviones de papel nuevos y los lanzaron desde el porche.' },
  { item: 'old-photo', what: 'una foto antigua', memory: () => 'en aquella foto aparecía jugando en el mismo jardín, hace muchos años', game: 'Se hicieron una foto nueva en el mismo lugar que la antigua.' },
  { item: 'old-glasses', what: 'unas gafas del abuelo', memory: () => 'el abuelo se ponía aquellas gafas para leer cuentos en voz alta', game: 'Se turnaron las gafas para leer un cuento con voces graciosas.', extra: ['storybook'] },
];

/** E5 · Cuando era pequeño: an old trunk, a family memory and an old game played again. */
function longAgo({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const memory = choose(random, MEMORIES);
  const home = homeOf(random);
  const both = [h.id, c.id];
  const attic = at('attic'), porch = at('porch'), atHome = at(home.id);
  // A baby has no memories yet: the child tells the baby about their own little days instead.
  const story = baby ? `aquello era de cuando ${h.name} era un bebé, como ${c.name}` : memory.memory(c);
  const extra = memory.extra || [];
  const beats = [
    [
      atHome(1, `Un día de lluvia, ${h.name} y ${c.name} subieron al desván a curiosear.`, both),
      atHome(2, home.detail),
      atHome(3, 'Las gotas golpeaban el tejado como un tambor suave.'),
      attic(1, 'Allí encontraron un baúl antiguo cubierto de polvo.', both, ['old-trunk']),
      attic(2, getScene('attic').detail),
      attic(3, baby ? `${c.name} estornudó con el polvo, y se rieron.` : `${c.name} sopló el polvo, y se rieron al estornudar.`, both),
      attic(2, 'El baúl crujió al abrirse, como un viejo que bosteza.', [], ['old-trunk']),
      attic(3, 'Dentro había ropa antigua, cartas y juguetes.'),
      attic(1, `Entre todas las cosas, ${h.name} encontró ${memory.what}.`, [h.id], [memory.item]),
    ],
    [
      attic(1, baby ? `${h.name} se acordó enseguida: ${story}.` : `${c.name} se emocionó al verlo: ${story}.`, both, [memory.item]),
      attic(2, baby ? `${h.name} se lo enseñó a ${c.name}, que lo miró con ojos enormes.` : `${h.name} escuchaba con la boca abierta.`, both),
      attic(3, 'Afuera, la lluvia seguía cayendo sobre el tejado.'),
      attic(1, baby ? `Le contó a ${c.name} cómo jugaba con aquello cuando era del tamaño de ${c.name}.` : `${c.name} le contó cómo jugaba con aquello cuando tenía su edad.`, both),
      attic(2, 'Cada detalle sonaba a cuento antiguo.', both),
      attic(3, baby ? `${c.name} agarró el borde del baúl con su manita.` : `${c.name} sonreía mientras recordaba aquellos días.`, [c.id]),
      attic(1, baby ? `${h.name} propuso jugar como cuando era bebé.` : `${h.name} le pidió que le enseñara a jugar como antes.`, both),
      attic(2, 'Bajaron con mucho cuidado la escalera del desván.', both),
      attic(3, 'El tesoro iba bien sujeto entre las manos.', both, [memory.item]),
    ],
    [
      porch(1, memory.game, both, [memory.item, ...extra]),
      porch(2, getScene('porch').detail),
      porch(3, 'La lluvia había parado, y olía a tierra mojada.'),
      porch(1, baby ? `${c.name} se reía cada vez que algo se movía.` : `Al principio, a ${h.name} no le salía nada bien.`, both),
      porch(2, baby ? `${h.name} lo repetía para oírle reír otra vez.` : `${c.name} le enseñó el truco, paso a paso.`, both),
      porch(3, 'Probaron una y otra vez, sin cansarse.', both),
      porch(1, baby ? `Al final, ${c.name} aplaudió con las dos manitas.` : `Al final, ${h.name} lo consiguió, y los dos lo celebraron.`, both),
      porch(2, 'Era un juego viejo, pero parecía nuevo.', both),
      porch(3, 'El sol volvió a salir entre las nubes.'),
    ],
    [
      porch(1, `Entonces ${h.name} tuvo una idea: mezclar aquel juego antiguo con uno de ahora.`, [h.id]),
      porch(2, 'Inventaron reglas nuevas, entre muchas risas.', both),
      porch(3, 'Algunas eran muy raras, pero divertidas.', both),
      porch(1, 'El juego nuevo tenía un poco de antes y un poco de ahora.', both, [memory.item]),
      porch(2, baby ? `${c.name} participaba a su manera, moviendo los brazos.` : `${c.name} dijo que era mejor que el original.`, both),
      porch(3, 'Le pusieron un nombre muy largo y gracioso.', both),
      porch(1, 'Jugaron hasta que se hizo de noche.', both),
      porch(2, 'Las primeras estrellas salieron para mirarlos.', both),
      porch(3, `${h.name} no quería que acabara el día.`, [h.id]),
    ],
    [
      atHome(1, 'Guardaron el tesoro en un lugar especial de la casa.', both, [memory.item]),
      atHome(2, 'Ya no volvería a quedarse olvidado en el desván.', both),
      atHome(3, 'Ahora lo verían todos los días.', both),
      atHome(1, `${h.name} pensó que los objetos viejos guardan historias dentro.`, [h.id]),
      atHome(2, 'Solo hay que preguntar a quien las conoce.', [h.id]),
      atHome(3, baby ? `${c.name} bostezó, muy a gusto en su manta.` : `${c.name} prometió contarle más historias otro día.`, [c.id]),
      atHome(2, 'Esa noche, cenaron juntos y siguieron hablando del baúl.', both, ['old-trunk']),
      atHome(3, 'Cada uno recordó algo distinto del día.', both),
      atHome(1, `${h.name} aprendió que la familia guarda tesoros que no se compran.`, [h.id]),
    ],
    [
      atHome(1, `Antes de dormir, ${h.name} pidió una historia más.`, [h.id]),
      atHome(2, baby ? `${h.name} le contó a ${c.name} una historia inventada, muy bajito.` : `${c.name} le contó una historia de hacía mucho tiempo.`, both),
      atHome(3, 'La habitación estaba en calma y todo invitaba a descansar.'),
      atHome(2, baby ? `${c.name} ya dormía, con el puñito cerrado.` : `${c.name} apagó la luz y le dio un beso de buenas noches.`, [c.id]),
      atHome(3, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      atHome(3, 'Afuera, la noche estaba tranquila y estrellada.'),
      atHome(1, `${h.name} se durmió pensando en todas las historias que aún le quedaban por descubrir.`, [h.id]),
      atHome(2, 'Todo estaba en calma en la casa.'),
      atHome(1, 'Y el desván, allá arriba, esperaba en silencio otra tarde de lluvia.'),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: el baúl de los recuerdos`, place: getScene('attic'), questId: `memory-${memory.item}`, variantId: memory.item, beats, items: ['old-trunk', memory.item, ...extra],
    blockIds: { opening: home.id, goal: `memory-${memory.item}`, obstacle: 'attic', strategy: memory.item, discovery: 'porch', ending: home.id },
    roles: { home: home.id, destination: 'attic' },
  };
}

/** Things worth waiting for, how to fill the wait and how they finally arrive. */
const WAITS = [
  { id: 'visit', what: 'la visita de los abuelos', scene: 'porch', prepare: 'Hornearon galletas y pusieron la tetera al fuego con cuidado.', items: ['cookies', 'kettle'], arrive: 'Por fin sonó el timbre: eran los abuelos, con los brazos abiertos.' },
  { id: 'snow', what: 'la primera nevada del invierno', scene: 'porch', prepare: 'Prepararon gorros, bufandas y una bolsa de agua caliente para después.', items: ['hot-water-bottle'], arrive: 'Por fin, empezaron a caer copos de nieve grandes y lentos.' },
  { id: 'birthday', what: 'la fiesta de cumpleaños', scene: 'living-room', prepare: 'Prepararon dos globos para recibir la tarta de cumpleaños.', items: ['balloon'], arrive: 'Por fin llegó la hora, y la tarta de cumpleaños apareció con sus velas.', arriveItems: ['birthday-cake'] },
  { id: 'stars', what: 'la noche de las estrellas fugaces', scene: 'shooting-star-hill', prepare: 'Prepararon una manta para mirar el cielo sin pasar frío.', items: ['blanket'], arrive: 'Por fin, una estrella fugaz cruzó el cielo, y luego otra, y otra más.' },
  { id: 'letter', what: 'una carta de su prima, que vivía lejos', scene: 'post-office', prepare: 'Escribieron una carta de respuesta para tenerla preparada.', items: ['letter'], arrive: 'Por fin, la cartera les entregó la carta con una sonrisa.', person: 'mail-carrier' },
  { id: 'train', what: 'el tren que traía a su tía', scene: 'train-station', prepare: 'Prepararon un cartel de bienvenida y una lonchera con fruta.', items: ['lunchbox'], arrive: 'Por fin, el tren entró en la estación, y la tía bajó saludando.' },
];

/** E6 · La espera: a long wait, impatience, activities to fill it and the joy of arrival. */
function theWait({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const wait = choose(random, WAITS);
  const person = wait.person === 'mail-carrier' ? copySupporting(random, wait.person) : null;
  const home = homeOf(random);
  const both = [h.id, c.id];
  const atHome = at(home.id), there = at(wait.scene), inside = at('living-room');
  const extra = person ? [person.id] : [];
  const beats = [
    [
      atHome(1, `${h.name} llevaba muchos días esperando ${wait.what}.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, 'Había tachado los días en un calendario, uno a uno.', [h.id]),
      atHome(1, 'Pero aquel último día parecía que no terminaba nunca.', [h.id]),
      atHome(2, `${h.name} miraba el despertador cada dos minutos.`, [h.id], ['alarm-clock']),
      atHome(3, 'Las agujas del despertador parecían no moverse nunca.', [], ['alarm-clock']),
      atHome(2, baby ? `${c.name} lo miraba desde su manta, sin entender tanta prisa.` : `${c.name} le dijo que esperar también podía ser divertido.`, both),
      atHome(3, `${h.name} suspiró, sin creérselo mucho todavía.`, [h.id]),
      atHome(1, baby ? `${h.name} decidió preparar la espera con ${c.name}.` : `${c.name} le propuso preparar juntos la llegada.`, both),
    ],
    [
      inside(1, wait.prepare, both, wait.items),
      inside(2, getScene('living-room').detail),
      inside(3, baby ? `${c.name} aplaudía cada vez que algo quedaba listo.` : `${c.name} le dejó hacer la parte más importante.`, both),
      inside(1, 'Después repasaron juntos lo que aún faltaba para la llegada.', both),
      inside(2, 'Hicieron una pequeña tarea cada vez, sin volver a mirar la hora.', both),
      inside(3, 'Estaban tan concentrados en preparar la llegada que olvidaron las prisas.', both),
      inside(1, `${h.name} inventó una canción corta para continuar con alegría.`, both),
      inside(2, 'La canción recordaba las pequeñas cosas que estaban preparando.', [h.id]),
      inside(3, baby ? `${c.name} se rio al escuchar aquella canción tan divertida.` : `${c.name} repitió la canción para acompañar el trabajo.`, [c.id]),
    ],
    [
      inside(1, 'Cuando volvieron a mirar el despertador, había pasado casi toda la tarde.', both, ['alarm-clock']),
      inside(2, `${h.name} no podía creer que la tarde hubiera volado.`, [h.id]),
      inside(3, 'Esperar en compañía hacía que el tiempo volara.', both),
      inside(1, `${h.name} se dio cuenta de que la espera también había sido bonita.`, [h.id]),
      inside(2, 'Preparar juntos la llegada había sido un pequeño regalo.', both),
      inside(3, baby ? `${c.name} bostezaba, pero no quería perderse nada.` : `${c.name} le guiñó un ojo, como diciendo que tenía razón.`, [c.id]),
      inside(1, 'Entonces llegó el momento de ir a esperar en el sitio exacto.', both),
      inside(2, 'Se abrigaron bien y salieron juntos.', both),
      inside(3, `${h.name} sentía mariposas en la barriga.`, [h.id]),
    ],
    [
      there(1, wait.scene === 'porch' ? 'Así que salieron juntos al porche a esperar.' : `Así que, juntos, fueron ${toPlace(getScene(wait.scene))}.`, both),
      there(2, wait.scene === 'living-room' ? 'Se sentaron junto a la ventana para verlo todo.' : getScene(wait.scene).detail),
      there(3, 'Todo estaba en silencio, como si también esperara.'),
      there(1, `${h.name} contó hasta diez, muy despacio.`, [h.id]),
      there(2, 'Y luego otra vez, por si acaso.', [h.id]),
      there(3, baby ? `${c.name} miraba en la misma dirección que ${h.name}.` : `${c.name} le apretó la mano para darle ánimos.`, both),
      there(1, wait.arrive, [...both, ...extra], wait.arriveItems || wait.items),
      there(2, `${h.name} dio un salto de alegría.`, [h.id]),
      there(3, baby ? `${c.name} gritó de alegría también, aunque no sabía por qué.` : `${c.name} se rio al ver su cara.`, [c.id]),
    ],
    [
      there(1, 'Fue todavía mejor de lo que había imaginado.', both),
      there(2, `${h.name} se lo contó todo a ${c.name}, hablando sin parar.`, both),
      there(3, person ? `${person.name} les deseó un día precioso antes de seguir su camino.` : 'Hasta el aire parecía más alegre.', extra),
      there(1, `${h.name} pensó que había merecido la pena esperar tanto.`, [h.id]),
      there(2, 'Las cosas que se esperan con ilusión saben mejor.', [h.id]),
      there(3, 'Y las que se esperan en compañía, todavía más.', both),
      atHome(1, wait.scene === 'porch' ? 'Entraron en casa con el corazón lleno.' : `Volvieron ${toPlace(home)} con el corazón lleno.`, both),
      atHome(2, 'Toda la casa olía a fiesta y a alegría.', both),
      atHome(3, 'El despertador ya no importaba para nada.', [], ['alarm-clock']),
    ],
    [
      atHome(1, `${h.name} aprendió que la espera se hace corta cuando la llenamos de cosas bonitas.`, [h.id]),
      atHome(2, `Y que ${c.name} era la mejor compañía para esperar.`, [h.id]),
      atHome(3, baby ? `${c.name} ya dormía, con una sonrisa.` : `${c.name} le dio un abrazo antes de dormir.`, [c.id]),
      atHome(2, 'Esa noche, se durmió repasando cada momento del día.', [h.id]),
      atHome(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      atHome(3, 'La habitación estaba en calma y todo invitaba a descansar.'),
      atHome(1, 'Mañana ya no habría que esperar, pero quizá llegaría algo nuevo.', [h.id]),
      atHome(3, 'Las estrellas parpadeaban, como si guardaran un secreto.'),
      atHome(1, `Y ${h.name} soñó con todas las cosas bonitas que todavía estaban por llegar.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: la gran espera`, place: getScene(wait.scene), extras: person ? [person] : [], questId: `wait-${wait.id}`, variantId: wait.scene, beats,
    items: [...wait.items, ...(wait.arriveItems || []), 'alarm-clock'],
    blockIds: { opening: home.id, goal: `wait-${wait.id}`, obstacle: wait.id, strategy: 'living-room', discovery: wait.scene, ending: home.id },
    roles: { home: home.id, destination: wait.scene },
  };
}

/** Reasons a child gets angry with a relative, what the relative meant and how they make up. */
const ANGERS = [
  { id: 'bedtime', cause: c => `${c.name} dijo que era hora de dormir justo en lo mejor del juego`, reason: 'Le explicó que dormir bien hace que mañana el juego sea todavía mejor.', repair: 'Dejaron el juego preparado para seguir al despertar.', items: ['alarm-clock'] },
  { id: 'rain', cause: c => `${c.name} canceló el paseo porque estaba lloviendo muchísimo`, reason: 'Le explicó que con tormenta el camino era peligroso.', repair: 'Inventaron un picnic dentro de casa, sobre una manta.', items: ['blanket'] },
  { id: 'share', cause: c => `${c.name} le pidió que compartiera su juguete favorito`, reason: 'Le explicó que compartir no significa perderlo para siempre.', repair: 'Jugaron con el juguete por turnos, y fue más divertido.', items: ['teddy-bear'] },
  { id: 'cookie', cause: c => `${c.name} se comió la última galleta sin preguntar`, reason: 'Le explicó que no sabía que la estaba guardando, y que lo sentía.', repair: 'Hicieron juntos una bandeja de galletas nuevas para compartir.', items: ['cookies'] },
  { id: 'hurry', cause: c => `${c.name} le metió prisa para salir y no le dejó terminar su dibujo`, reason: 'Le explicó que llegaban tarde, pero que el dibujo podía esperar.', repair: 'Al volver, terminaron el dibujo juntos con los crayones, sin ninguna prisa.', items: ['crayons'] },
  { id: 'tower', cause: c => `${c.name} derribó sin querer la torre que había construido`, reason: 'Le explicó que había sido sin querer, y que lo sentía mucho.', repair: 'Construyeron juntos una torre todavía más alta con cajas de cartón.', items: ['cardboard-box'] },
];

/** E7 · El enfado y el abrazo: anger, a pause with the calm jar, listening, repairing and a hug. */
function angerHug({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const anger = baby ? ANGERS.find(entry => entry.id === 'tower') : choose(random, ANGERS);
  const home = homeOf(random);
  const both = [h.id, c.id];
  const room = at('playroom'), bed = at('bedroom'), atHome = at(home.id);
  const reason = baby ? `${h.name} se dio cuenta de que ${c.name} era un bebé y no lo había hecho a propósito.` : `${c.name} ${anger.reason[0].toLocaleLowerCase('es')}${anger.reason.slice(1)}`;
  const beats = [
    [
      room(1, `${h.name} estaba jugando muy a gusto en el cuarto de juegos.`, [h.id]),
      room(2, getScene('playroom').detail),
      room(3, 'Todo iba de maravilla, y la torre crecía y crecía.', [h.id]),
      room(1, `Pero de pronto, ${anger.cause(c)}.`, [c.id], anger.items),
      room(2, `${h.name} sintió que se le calentaba la cara.`, [h.id]),
      room(3, 'Apretó los puños sin darse cuenta, con mucha fuerza.', [h.id]),
      room(2, `${h.name} gritó que no era justo.`, [h.id]),
      room(3, baby ? `${c.name} se asustó con el grito.` : `${c.name} se quedó sin moverse, sin saber qué decir.`, [c.id]),
      bed(1, `${h.name} se fue a su habitación con mucho enfado.`, [h.id]),
    ],
    [
      bed(1, `${h.name} se sentó en la cama con los brazos cruzados.`, [h.id]),
      bed(2, getScene('bedroom').detail),
      bed(3, 'El enfado le daba vueltas por dentro como un remolino.', [h.id]),
      bed(1, 'Entonces vio el tarro de la calma en la estantería.', [h.id], ['calm-jar']),
      bed(2, 'Lo agitó, y la purpurina empezó a girar como su enfado.', [h.id], ['calm-jar']),
      bed(3, 'Se quedó mirándola un buen rato, sin decir nada.', [h.id]),
      bed(1, 'Mientras la purpurina caía despacio, respiró hondo tres veces.', [h.id]),
      bed(2, 'Poco a poco, el remolino de dentro también se calmó.', [h.id]),
      bed(3, 'Cuando la purpurina llegó al fondo, ya pensaba con más claridad.', [h.id], ['calm-jar']),
    ],
    [
      bed(1, baby ? `Entonces oyó a ${c.name} llorar en el pasillo.` : `Entonces ${c.name} llamó a la puerta con suavidad.`, both),
      bed(2, baby ? `${h.name} salió a ver qué le pasaba.` : `${c.name} le preguntó si podían hablar.`, both),
      bed(3, baby ? `${h.name} se encogió de hombros y abrió la puerta.` : `${h.name} se encogió de hombros, pero le dejó pasar.`, [h.id]),
      bed(1, `${h.name} explicó por qué se había enfadado tanto.`, [h.id]),
      bed(2, baby ? `${c.name} lo miraba con los ojos llenos de lágrimas.` : `${c.name} le escuchó sin interrumpir ni una vez.`, [c.id]),
      bed(3, 'Decirlo en voz alta ya le hizo sentir mejor.', [h.id]),
      bed(1, reason, both),
      bed(2, `${h.name} no lo había pensado así.`, [h.id]),
      bed(3, 'A veces, el enfado no deja ver lo que piensan los demás.', [h.id]),
    ],
    [
      bed(1, `${h.name} pidió perdón por haber gritado.`, [h.id]),
      bed(2, baby ? `${c.name} dejó de llorar y le tendió los bracitos.` : `${c.name} también le pidió perdón por no haberle avisado antes.`, both),
      bed(3, 'Los dos sonrieron un poquito, todavía con los ojos húmedos.', both),
      bed(1, `Se dieron un abrazo largo, de esos que lo arreglan todo.`, both),
      bed(2, 'El abrazo duró un buen rato, y nadie quería soltarse.', both),
      bed(3, `${h.name} notó que el enfado ya se había ido del todo.`, [h.id]),
      room(1, anger.repair, both, anger.items),
      room(2, 'Fue mucho más divertido de lo que esperaban.', both),
      room(3, baby ? `${c.name} se reía cada vez que algo se caía.` : `${c.name} propuso hacerlo así a partir de entonces.`, [c.id]),
    ],
    [
      room(1, `${h.name} pensó que hablar había sido mucho mejor que gritar.`, [h.id]),
      room(2, 'Y que el tarro de la calma era un gran amigo.', [h.id], ['calm-jar']),
      room(3, 'Decidió dejarlo siempre a mano, por si volvía el remolino.', [h.id]),
      room(1, baby ? `${h.name} le enseñó a ${c.name} cómo caía la purpurina del tarro.` : `${c.name} le contó que a veces también usaba trucos para calmarse.`, both, ['calm-jar']),
      room(2, 'Se rieron imaginando a toda la familia con un tarro de la calma.', both),
      room(3, 'Cada uno con un color distinto de purpurina, según su humor.', both),
      room(1, 'Jugaron juntos el resto de la tarde.', both),
      room(2, 'Ya nadie se acordaba del enfado de la mañana.', both),
      room(3, 'Solo de las risas y del abrazo largo.', both),
    ],
    [
      atHome(1, `${h.name} aprendió que enfadarse es normal, y que hablar con calma lo arregla mejor.`, [h.id]),
      atHome(2, home.detail),
      atHome(3, 'Afuera, la tarde se volvía naranja.'),
      atHome(1, `Esa noche, ${h.name} y ${c.name} se dieron un abrazo de buenas noches.`, both),
      atHome(2, baby ? `${c.name} se durmió enseguida, después de tanto jugar.` : `${c.name} le dijo que estaba feliz por cómo lo habían arreglado.`, both),
      atHome(3, 'La casa quedó en silencio, tranquila y en paz.'),
      atHome(2, 'El tarro de la calma brillaba junto a la cama.', [], ['calm-jar']),
      atHome(3, 'Su purpurina descansaba en el fondo.', [], ['calm-jar']),
      atHome(1, `Y ${h.name} se durmió tranquilamente, en paz con todos.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: el enfado y el abrazo`, place: getScene('playroom'), questId: `anger-${anger.id}`, variantId: anger.id, beats, items: ['calm-jar', ...anger.items],
    blockIds: { opening: 'playroom', goal: `anger-${anger.id}`, obstacle: anger.id, strategy: 'calm-jar', discovery: 'bedroom', ending: home.id },
    roles: { home: home.id, destination: 'playroom' },
  };
}

/** Pets a neighbor leaves for a day, how to care for them and where they hide or wander. */
const PETS = [
  { id: 'puppy', care: 'lo sacaron a pasear y le dieron su comida', items: [], slip: name => `De pronto, ${name} salió corriendo detrás de una mariposa.`, search: 'living-room', found: 'Lo encontraron debajo del sofá, mordisqueando una zapatilla.', foundItems: ['slippers'] },
  { id: 'kitten', care: 'jugaron con él usando un ovillo de lana', items: ['yarn'], slip: name => `De pronto, ${name} desapareció sin hacer ruido.`, search: 'playroom', found: 'Lo encontraron dormido dentro de una caja de cartón.', foundItems: ['cardboard-box'] },
  { id: 'hamster', care: 'le dieron semillas y le cambiaron el agua', items: ['seed'], slip: name => `De pronto, vieron que la jaula de ${name} estaba abierta y vacía.`, search: 'bedroom', found: 'Lo encontraron hecho una bolita dentro de una zapatilla.', foundItems: ['slippers'] },
  { id: 'canary', care: 'le pusieron alpiste y agua fresca', items: [], slip: name => `De pronto, ${name} salió volando por la ventana abierta.`, search: 'garden', found: 'Lo encontraron cantando en la rama más baja del jardín.' },
  { id: 'guinea-pig', care: 'le dieron hojas de lechuga y le cepillaron el pelo', items: [], slip: name => `De pronto, ${name} se escabulló por el pasillo.`, search: 'playroom', found: 'La encontraron escondida detrás de unas cajas de cartón.', foundItems: ['cardboard-box'] },
  { id: 'tortoise', care: 'le dieron hojas frescas y un baño de sol', items: [], slip: name => `De pronto, se dieron cuenta de que ${name} ya no estaba en su rincón.`, search: 'garden', found: 'La encontraron entre las flores del jardín, comiendo tranquilamente.', foundItems: ['flower'] },
  { id: 'lop-rabbit', care: 'le dieron zanahorias y le dejaron saltar por la sala', items: [], slip: name => `De pronto, ${name} dio un gran salto y se perdió de vista.`, search: 'garden', found: 'Lo encontraron en el huerto, con una hoja de lechuga en la boca.' },
  { id: 'goldfish', care: 'le echaron una pizca de comida en la pecera', items: [], slip: name => `De pronto, vieron que ${name} nadaba muy despacio, como aburrido.`, search: 'living-room', found: 'Le pusieron una planta nueva en la pecera, y volvió a nadar contento.' },
];

/** E8 · El huésped peludo: a neighbor's pet for a day, careful care, a scare and a happy return. */
function petGuest({ random, hero: h, companion: c }) {
  const baby = c.role === 'baby';
  const care = choose(random, PETS);
  const pet = copySupporting(random, care.id);
  const owner = { name: 'la vecina', gender: 'f' };
  const home = homeOf(random);
  const both = [h.id, c.id];
  const atHome = at(home.id), search = at(care.search), inside = at('living-room');
  const it = pet.gender === 'f' ? 'la' : 'lo';
  const fish = care.id === 'goldfish';
  const beats = [
    [
      atHome(1, `Una vecina pidió ayuda porque debía salir de viaje.`, both),
      atHome(2, home.detail),
      atHome(3, `Explicó los cuidados que necesitaba ${pet.name} durante aquella tarde.`, [pet.id]),
      atHome(1, `Les pidió a ${h.name} y a ${c.name} que cuidaran de su ${pet.label} ${pet.name}.`, [pet.id]),
      atHome(2, `${h.name} prometió cuidar${it} como si fuera ${pet.gender === 'f' ? 'suya' : 'suyo'}.`, [h.id]),
      atHome(3, `${h.name} repitió los cuidados para recordarlos durante aquella tarde.`, [h.id]),
      atHome(2, `La vecina se despidió de ${pet.name} con un beso.`, [pet.id]),
      atHome(3, 'Dijo que volvería antes de la cena.', []),
      atHome(1, `${h.name} se sintió ${'importante'}, porque era la primera vez que cuidaba una mascota.`, [h.id]),
    ],
    [
      inside(1, `Por la mañana, ${care.care}.`, [...both, pet.id], care.items),
      inside(2, getScene('living-room').detail),
      inside(3, `${pet.name} parecía muy a gusto con ellos.`, [pet.id]),
      inside(1, baby ? `${c.name} se reía cada vez que ${pet.name} se movía.` : `${c.name} le enseñó a ${h.name} cómo tratar${it} con suavidad.`, [c.id, pet.id]),
      inside(2, `${h.name} ${fish ? 'saludó' : 'acarició'} a ${pet.name} con mucho cuidado.`, [h.id, pet.id]),
      inside(3, 'Todo iba de maravilla, mucho mejor de lo que esperaban.', both),
      inside(1, `Después de comer, todos se tumbaron a descansar un rato.`, both),
      inside(2, 'La casa estaba tranquila, y solo se oía el reloj.'),
      inside(3, `${h.name} cerró los ojos solo un momento.`, [h.id]),
    ],
    [
      inside(1, care.slip(pet.name), [pet.id]),
      inside(2, `${h.name} se levantó de un salto.`, [h.id]),
      inside(3, baby ? `${c.name} miró a ${h.name} con los ojos muy abiertos.` : `${c.name} se puso de pie también.`, [c.id]),
      inside(1, fish ? `${h.name} se preocupó muchísimo por ${pet.name}.` : `Buscaron a ${pet.name} por todas partes.`, both),
      inside(2, 'Miraron cerca con atención, sin dejar de ayudarse durante la búsqueda.'),
      inside(3, `${h.name} sentía un nudo en la barriga.`, [h.id]),
      inside(1, `${h.name} respiró hondo tres veces para pensar con calma.`, [h.id]),
      inside(2, `${h.name} recordó los cuidados antes de continuar con la búsqueda.`, [h.id]),
      inside(3, 'Entonces se le ocurrió una idea muy buena.', [h.id]),
    ],
    [
      search(1, care.found, [...both, pet.id], care.foundItems || []),
      search(2, care.search === 'living-room' || care.search === home.id ? `Allí estaba, tan ${pet.gender === 'f' ? 'tranquila' : 'tranquilo'} como si nada.` : getScene(care.search).detail),
      search(3, `${h.name} soltó un suspiro enorme de alivio.`, [h.id]),
      search(1, fish ? `${h.name} miró a ${pet.name} nadar feliz.` : `${h.name} tomó a ${pet.name} con mucho cariño.`, [h.id, pet.id]),
      search(2, baby ? `${c.name} aplaudió con sus manitas, muy feliz.` : `${c.name} le dio un abrazo, con alivio.`, [c.id]),
      search(3, 'El susto ya había pasado, y todos respiraron tranquilos.', both),
      search(1, 'Desde entonces, no le quitaron el ojo de encima.', both),
      search(2, `Jugaron con ${pet.name} el resto de la tarde.`, [...both, pet.id]),
      search(3, `${pet.name} parecía haberse divertido con la aventura.`, [pet.id]),
    ],
    [
      atHome(1, `Antes de la cena, la vecina volvió de su viaje.`, []),
      atHome(2, `${pet.name} ${fish ? 'nadó deprisa' : 'corrió'} a saludar${owner.gender === 'f' ? 'la' : 'lo'} con mucha alegría.`, [pet.id]),
      atHome(3, `La vecina se rio de alegría al ver a ${pet.name}.`, []),
      atHome(1, `${h.name} le contó la verdad: ${pet.name} les había dado un pequeño susto.`, [h.id]),
      atHome(2, `La vecina dijo que a ${gendered(owner, 'él', 'ella')} también le había pasado muchas veces.`, []),
      atHome(3, 'Y que decir la verdad era lo más importante.', []),
      atHome(1, `La vecina les dio las gracias y les dijo que podían visitar a ${pet.name} cuando quisieran.`, both),
      atHome(2, `${h.name} prometió ir a ver${it} muy pronto.`, [h.id]),
      atHome(3, baby ? `${c.name} balbuceó al ver que todo estaba en calma.` : `${c.name} recordó lo que habían aprendido cuidando a ${pet.name}.`, [c.id]),
    ],
    [
      atHome(1, `${h.name} aprendió que cuidar de un animal es una gran responsabilidad.`, [h.id]),
      atHome(2, 'Y que la calma ayuda a encontrar lo que se pierde.', [h.id]),
      atHome(3, baby ? `${c.name} balbuceó, todavía pendiente de su nueva compañía.` : `${c.name} le dijo que había sido una gran tarde.`, [c.id]),
      atHome(1, `Esa noche, ${h.name} dibujó a ${pet.name} para no olvidar${it}.`, [h.id]),
      atHome(2, 'Colgó el dibujo junto a su cama.', [h.id]),
      atHome(3, 'La habitación estaba en calma y todo invitaba a descansar.'),
      atHome(2, 'Aquel rincón se sentía cómodo, tranquilo y lleno de cariño.'),
      atHome(3, `Y soñó que ${pet.name} venía a visitar su casa.`, [h.id]),
      atHome(1, `Y se durmió pensando en su nuevo amigo ${fish ? 'de la pecera' : 'peludo'}.`, [h.id]),
    ],
  ];
  return {
    title: `${h.name} y ${c.name}: una tarde con ${pet.name}`, place: getScene(care.search), extras: [pet], questId: `pet-${care.id}`, variantId: care.search, beats,
    items: [...care.items, ...(care.foundItems || [])],
    blockIds: { opening: home.id, goal: `pet-${care.id}`, obstacle: care.search, strategy: 'gentle-care', discovery: care.id, ending: home.id },
    roles: { home: home.id, destination: care.search, owner: null, pet: pet.id },
  };
}
const gendered = (character, masculine, feminine) => character.gender === 'f' ? feminine : masculine;

export const FAMILY_STRUCTURES = Object.freeze([
  { id: 'activity', name: 'Actividad juntos', generate: familyActivity },
  { id: 'first-time', name: 'La primera vez', generate: firstTime },
  { id: 'helpers', name: 'Ayudantes de casa', generate: helpers },
  { id: 'reversed-day', name: 'El día al revés', generate: reversedDay },
  { id: 'long-ago', name: 'Cuando era pequeño', generate: longAgo },
  { id: 'the-wait', name: 'La espera', generate: theWait },
  { id: 'anger-hug', name: 'El enfado y el abrazo', generate: angerHug },
  { id: 'pet-guest', name: 'El huésped peludo', generate: petGuest },
]);
export const FAMILY_GOAL_IDS = [...FAMILY_GOALS.map(goal => goal.id), ...FIRSTS.map(entry => `first-${entry.id}`), ...CHORES.map(entry => `chore-${entry.id}`),
  ...CARES.map(entry => `care-${entry.id}`), `care-${BABY_CARE.id}`, ...MEMORIES.map(entry => `memory-${entry.item}`), ...WAITS.map(entry => `wait-${entry.id}`),
  ...ANGERS.map(entry => `anger-${entry.id}`), ...PETS.map(entry => `pet-${entry.id}`)];
