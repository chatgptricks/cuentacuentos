import { SCENES } from './world-catalog.js';

const locations = (...tags) => SCENES.filter(scene => tags.some(tag => scene.tags.includes(tag))).map(scene => scene.id);
const everywhere = SCENES.map(scene => scene.id);
const sheltered = locations('shelter');
const plants = locations('plants');
const openAir = locations('outdoors').filter(id => !['mangrove', 'rainbow-bridge'].includes(id));
const shores = ['lake', 'river', 'beach', 'waterfall', 'harbor', 'mangrove', 'desert-oasis'];
const noun = (id, word, gender = 'm', number = 's') => ({ id, noun: word, gender, number });
const verb = (id, past) => ({ id, past });

/** Adjectives carry their grammatical forms; no word is substituted blindly in finished prose. */
export const ACTION_ADJECTIVES = Object.freeze([
  { id: 'bright', m: 'brillante', f: 'brillante', mp: 'brillantes', fp: 'brillantes' },
  { id: 'golden', m: 'dorado', f: 'dorada', mp: 'dorados', fp: 'doradas' },
  { id: 'magic', m: 'mágico', f: 'mágica', mp: 'mágicos', fp: 'mágicas' },
  { id: 'little', m: 'pequeño', f: 'pequeña', mp: 'pequeños', fp: 'pequeñas' },
].map(Object.freeze));

// A plot defines a cause, a useful discovery and a repair. Lexical choices decorate that same mechanism.
const plots = [
  {
    id: 'wind-door', scenes: locations('fortress'), objects: ['key'], repairVerb: 'cerrar',
    subjectLexicon: [noun('door', 'puerta', 'f'), noun('gate', 'portón'), noun('portal', 'portal')],
    qualifiers: ['del viento', 'del cielo', 'del sol', 'de luz'],
    verbs: [verb('open', 'abrió'), verb('unlock', 'destrabó'), verb('unseal', 'liberó')],
    render: s => ({
      trigger: s.trigger, goal: `cerrar ${s.full}`,
      problem: 'el viento encantado revolvía las señales y nadie reconocía la salida',
      warning: 'Una nota pedía consultar al guardián antes de abrir aquel paso encantado.',
      concern: 'El viento seguía moviendo las señales aunque intentaran sujetarlas con mucho cuidado.',
      fact: 'la llave cerraba el paso al alinear dos marcas', model: 'una cerradura de juguete', spare: 'una llave guardada', mark: 'dos rayitas de la cerradura',
      delivery: 'Olmo entregó una llave y mostró la marca que indicaba el cierre correcto.',
      rehearsal: 'Olmo explicó que una vuelta pequeña bastaba cuando las dos marcas quedaban juntas.',
      repairAction: `giraron la llave y cerraron ${s.full} con cuidado`,
      assist: 'preparó un apoyo para mantener quieto el marco mientras trabajaban',
      outcome: 'El paso quedó cerrado y las señales dejaron de moverse con el viento.',
      aftercare: 'Comprobaron que la llave quedara guardada donde podían encontrarla quienes cuidaban el lugar.',
      check: 'Esperaron hasta reconocer que cada señal conservaba su sitio sin tener que sujetarla.',
      memory: 'Dibujaron las dos marcas para recordar cómo cerrar el paso sin apresurarse.',
    }),
  },
  {
    id: 'guiding-lantern', scenes: sheltered, objects: ['lantern'], repairVerb: 'orientar',
    subjectLexicon: [noun('lantern', 'farol'), noun('little-lantern', 'farolito'), noun('guide-lantern', 'farol guía')],
    qualifiers: ['del camino', 'de la plaza', 'de las visitas', 'de los saludos'],
    verbs: [verb('cover', 'cubrió'), verb('hide', 'ocultó'), verb('move-away', 'apartó')],
    render: s => ({
      trigger: s.trigger, goal: `orientar ${s.full}`,
      problem: 'las señales quedaron oscuras y las visitas no encontraban el rincón de descanso',
      warning: 'El farol necesitaba dejar visible el dibujo que señalaba el rincón de descanso.',
      concern: 'Una luz escondida no ayudaba aunque el farol todavía tuviera mucho brillo.',
      fact: 'el farol iluminaba las señales cuando miraba hacia ellas', model: 'un dibujo del camino', spare: 'un soporte pequeño', mark: 'una flecha en el soporte',
      delivery: 'Olmo señaló el soporte del farol y explicó hacia dónde debía mirar su luz.',
      rehearsal: 'Olmo mostró cómo descubrir la luz y dirigirla sin molestar a las visitas.',
      repairAction: 'descubrieron el farol y orientaron su luz hacia las señales',
      assist: 'preparó un soporte firme para sostener el farol sin tapar su luz',
      outcome: 'El farol iluminó las señales y cada visita reconoció dónde podía descansar.',
      aftercare: 'Dejaron libre el espacio delante del farol para que su luz siguiera ayudando.',
      check: 'Miraron las señales desde lejos para comprobar que todavía podían reconocerse con claridad.',
      memory: 'Dibujaron una flecha para recordar hacia dónde debía mirar el farol del camino.',
    }),
  },
  {
    id: 'listening-bell', scenes: [...sheltered, 'harbor', 'giant-tree'], objects: ['bell', 'flute'], repairVerb: 'afinar',
    subjectLexicon: [noun('bell', 'campana', 'f'), noun('little-bell', 'campanita', 'f'), noun('carillon', 'carillón')],
    qualifiers: ['de las visitas', 'de la plaza', 'de los encuentros', 'de los saludos'],
    verbs: [verb('ring', 'hizo sonar'), verb('shake', 'agitó'), verb('strike', 'tocó')],
    render: s => ({
      trigger: s.trigger, goal: `afinar ${s.full}`,
      problem: 'la campana repitió notas mezcladas y nadie distinguía el aviso de bienvenida',
      warning: 'La campana debía sonar después de escuchar una nota clara de bienvenida.',
      concern: 'Tocar más fuerte solo juntaba las notas y hacía menos claro el aviso.',
      fact: 'una nota de flauta afinaba el sonido de bienvenida', model: 'un dibujo de dos notas', spare: 'una flauta pequeña', mark: 'el dibujo del saludo',
      delivery: 'Olmo prestó una flauta para reconocer la nota que necesitaba la campana.',
      rehearsal: 'Olmo pidió escuchar una nota completa antes de probar el sonido de la campana.',
      repairAction: 'tocaron una nota de flauta y afinaron la campana de bienvenida',
      assist: 'preparó un silencio para que la nota de flauta pudiera escucharse completa',
      outcome: 'La campana dio un saludo claro y las visitas reconocieron el aviso de bienvenida.',
      aftercare: 'Dejaron un turno de silencio entre los avisos para que ninguno tapara al siguiente.',
      check: 'Escucharon desde otro rincón para comprobar que el saludo seguía sonando con claridad.',
      memory: 'Dibujaron la nota de flauta para recordar cómo afinar la campana de bienvenida.',
    }),
  },
  {
    id: 'steady-crossing', scenes: ['river', 'lake', 'waterfall', 'bamboo-grove', 'rainbow-bridge'], objects: ['rope'], repairVerb: 'sujetar',
    subjectLexicon: [noun('bridge', 'puente'), noun('walkway', 'pasarela', 'f'), noun('crossing', 'paso')],
    qualifiers: ['de los encuentros', 'del camino', 'de las visitas', 'de los saludos'],
    verbs: [verb('shift-board', 'movió una tabla de'), verb('loosen-board', 'aflojó una tabla de'), verb('lift-board', 'levantó una tabla de')],
    render: s => ({
      trigger: s.trigger, goal: `sujetar la tabla ${s.of}`,
      problem: 'una tabla quedó suelta y el paso debía esperar antes de recibir nuevas visitas',
      warning: 'Una señal pedía revisar las tablas con el guardián antes de moverlas.',
      concern: 'Nadie cruzó mientras la tabla siguiera suelta y las visitas esperaron en un rincón seguro.',
      fact: 'la cuerda sujetaba la tabla al pasar por dos anillas', model: 'una maqueta pequeña', spare: 'una cuerda suave', mark: 'dos anillas del borde',
      delivery: 'Olmo entregó una cuerda suave para sujetar la tabla desde un rincón seguro.',
      rehearsal: 'Olmo mostró en una maqueta cómo pasar la cuerda sin acercarse a ningún borde.',
      repairAction: 'pasaron la cuerda por las anillas y sujetaron la tabla desde un sitio seguro',
      assist: 'preparó la cuerda junto a las anillas sin acercarse al borde del paso',
      outcome: 'La tabla quedó firme y las visitas pudieron continuar por el camino con cuidado.',
      aftercare: 'Una revisión tranquila confirmó que la cuerda y las anillas estaban en su sitio.',
      check: 'Comprobaron desde un lugar seguro que la tabla ya no cambiaba de posición.',
      memory: 'Dibujaron las dos anillas para recordar cómo cuidar el paso de las visitas.',
    }),
  },
  {
    id: 'tangled-kite', scenes: openAir, objects: ['kite', 'rope'], repairVerb: 'recoger',
    subjectLexicon: [noun('kite', 'cometa', 'f'), noun('paper-kite', 'cometa viajera', 'f'), noun('barrilete', 'barrilete')],
    qualifiers: ['de los colores', 'del viento', 'de la tarde', 'de los deseos'],
    verbs: [verb('lift', 'levantó'), verb('launch', 'soltó'), verb('push-up', 'hizo subir')],
    render: s => ({
      trigger: s.trigger, goal: `recoger ${s.full}`,
      problem: 'la cuerda de la cometa se enredó entre adornos bajos y les quitó espacio',
      warning: 'La cometa debía probarse en un rincón libre de adornos y ramas bajas.',
      concern: 'Tirar de la cuerda podía apretar los lazos y estropear los adornos del rincón.',
      fact: 'aflojar primero el lazo permitía recoger la cometa despacio', model: 'un lazo de muestra', spare: 'una cuerda corta', mark: 'el lazo más cercano',
      delivery: 'Olmo señaló el lazo de la cuerda que debía aflojarse antes de recogerla.',
      rehearsal: 'Olmo explicó cómo aflojar un lazo de muestra antes de acercarse a la cometa.',
      repairAction: 'aflojaron el lazo de la cuerda y recogieron la cometa sin tirar de los adornos',
      assist: 'dejó libre un rincón donde guardar la cometa después de soltar su lazo',
      outcome: 'La cometa volvió al suelo y los adornos conservaron sus formas y colores.',
      aftercare: 'Enrollaron la cuerda sin apretarla y eligieron un rincón más amplio para otra tarde.',
      check: 'Compararon los adornos con sus dibujos para comprobar que todos seguían en su sitio.',
      memory: 'Dibujaron el lazo abierto para recordar que aflojar podía ayudar más que tirar.',
    }),
  },
  {
    id: 'singing-fountain', scenes: ['garden', 'village', 'greenhouse', 'flower-field', 'desert-oasis'], objects: ['drop', 'watering-can'], repairVerb: 'despejar',
    subjectLexicon: [noun('fountain', 'fuente', 'f'), noun('water-spout', 'surtidor'), noun('spring', 'manantial')],
    qualifiers: ['de las canciones', 'del jardín', 'de las gotas', 'de los susurros'],
    verbs: [verb('decorate', 'adornó'), verb('cover-water', 'cubrió con hojas'), verb('fill-water', 'llenó de hojas')],
    render: s => ({
      trigger: s.trigger, goal: `despejar ${s.full}`,
      problem: 'unas hojas taparon el camino del agua y las gotas dejaron de cantar',
      warning: 'Las hojas podían decorar el borde mientras dejaran libre el camino del agua.',
      concern: 'Las gotas esperaban junto a las hojas sin poder seguir su pequeña canción.',
      fact: 'retirar las hojas dejaba un camino libre para las gotas', model: 'un dibujo del agua', spare: 'una regadera pequeña', mark: 'la salida del agua',
      delivery: 'Olmo prestó una regadera para probar el camino del agua sin desperdiciarla.',
      rehearsal: 'Olmo explicó cómo probar el camino con unas gotas antes de añadir más agua.',
      repairAction: 'retiraron las hojas y probaron con la regadera el camino libre del agua',
      assist: 'preparó un rincón donde dejar las hojas lejos de la salida del agua',
      outcome: 'Las gotas volvieron a cantar y el agua encontró su camino sin desperdiciarse.',
      aftercare: 'La regadera quedó guardada y las hojas formaron un adorno lejos del agua.',
      check: 'Escucharon varias gotas para comprobar que ninguna quedaba detenida junto a las hojas.',
      memory: 'Dibujaron el camino libre del agua para recordar cómo cuidar su canción pequeña.',
    }),
  },
  {
    id: 'seed-labels', scenes: plants, objects: ['seed', 'watering-can'], repairVerb: 'clasificar',
    subjectLexicon: [noun('seedbed', 'semillero'), noun('little-garden', 'jardín'), noun('planter', 'maceta', 'f')],
    qualifiers: ['de las semillas', 'de los cuidados', 'de la primavera', 'de los brotes'],
    verbs: [verb('mix', 'mezcló las semillas de'), verb('change-labels', 'cambió los letreros de'), verb('rearrange', 'desordenó las semillas de')],
    render: s => ({
      trigger: s.trigger, goal: `clasificar las semillas ${s.of}`,
      problem: 'las semillas perdieron sus señales y nadie recordaba qué cuidado necesitaba cada maceta',
      warning: 'Cada maceta tenía un dibujo para recordar sus semillas y sus cuidados.',
      concern: 'Regar todas las macetas igual no ayudaba a las semillas que necesitaban menos agua.',
      fact: 'la forma de cada semilla coincidía con su dibujo', model: 'una tarjeta de semillas', spare: 'un dibujo guardado', mark: 'las formas de las semillas',
      delivery: 'Olmo mostró los dibujos de las semillas y cómo compararlos con cada maceta.',
      rehearsal: 'Olmo explicó que la regadera podía esperar hasta reconocer los cuidados de cada semilla.',
      repairAction: 'ordenaron las semillas con sus dibujos y devolvieron cada grupo a su maceta',
      assist: 'preparó un espacio para comparar las semillas sin perder ninguna en el camino',
      outcome: 'Cada maceta recuperó sus semillas y la regadera volvió a usarse según sus cuidados.',
      aftercare: 'Dejaron las semillas juntas a sus dibujos para que otra visita pudiera reconocerlas.',
      check: 'Revisaron cada señal antes de decidir qué maceta necesitaba un poquito de agua.',
      memory: 'Dibujaron las formas de las semillas para recordar que cada cuidado podía ser diferente.',
    }),
  },
  {
    id: 'turning-map', scenes: everywhere, objects: ['map', 'compass'], repairVerb: 'orientar',
    subjectLexicon: [noun('map', 'mapa'), noun('plan', 'plano'), noun('sketch-map', 'croquis')],
    qualifiers: ['de los caminos', 'de las visitas', 'del regreso', 'de los encuentros'],
    verbs: [verb('turn', 'giró'), verb('invert', 'puso al revés'), verb('rotate', 'dio media vuelta a')],
    render: s => ({
      trigger: s.trigger, goal: `orientar ${s.full}`,
      problem: 'las flechas del mapa parecían señalar lugares distintos y las visitas quedaron confundidas',
      warning: 'El mapa necesitaba mirar hacia el mismo norte que marcaba la brújula.',
      concern: 'Seguir una flecha sin revisar el mapa podía alejar las visitas de su destino.',
      fact: 'la brújula permitía alinear el norte del mapa', model: 'un mapa de muestra', spare: 'una brújula pequeña', mark: 'la flecha del norte',
      delivery: 'Olmo mostró cómo la brújula reconocía el norte aunque el mapa estuviera girado.',
      rehearsal: 'Olmo pidió comparar una flecha del mapa con la brújula antes de continuar.',
      repairAction: 'alinearon el mapa con la brújula y comprobaron las flechas del camino',
      assist: 'dejó la brújula junto al mapa para que pudieran comparar sus direcciones',
      outcome: 'El mapa recuperó su orientación y las visitas reconocieron cómo llegar a su destino.',
      aftercare: 'Guardaron la brújula junto al mapa para revisar otra dirección cuando hiciera falta.',
      check: 'Compararon un destino cercano con su señal para comprobar que la dirección coincidía.',
      memory: 'Dibujaron la flecha del norte para recordar cómo orientar el mapa antes de seguirlo.',
    }),
  },
  {
    id: 'scattered-puzzle', scenes: everywhere, objects: ['puzzle'], repairVerb: 'armar',
    subjectLexicon: [noun('puzzle', 'rompecabezas'), noun('mosaic', 'mosaico'), noun('jigsaw', 'puzle')],
    qualifiers: ['de los colores', 'de las figuras', 'del encuentro', 'de las formas'],
    verbs: [verb('scatter', 'desparramó las piezas de'), verb('mix-pieces', 'mezcló las piezas de'), verb('separate', 'separó las piezas de')],
    render: s => ({
      trigger: s.trigger, goal: `armar ${s.full}`,
      problem: 'el rompecabezas dejó de mostrar una señal y las visitas no reconocían su dibujo',
      warning: 'El dibujo del rompecabezas ayudaba a reconocer el rincón donde empezaban los encuentros.',
      concern: 'Juntar piezas sin mirar sus bordes escondía todavía más el dibujo de la señal.',
      fact: 'las piezas del borde formaban el marco del dibujo', model: 'un marco de muestra', spare: 'una pieza del borde', mark: 'los bordes rectos',
      delivery: 'Olmo explicó cómo reconocer los bordes antes de colocar cada pieza del rompecabezas.',
      rehearsal: 'Olmo pidió formar primero el marco y dejar espacio para las piezas del centro.',
      repairAction: 'ordenaron los bordes y armaron el rompecabezas hasta recuperar su dibujo',
      assist: 'preparó una superficie libre donde ordenar las piezas del borde sin perderlas',
      outcome: 'El rompecabezas mostró otra vez su dibujo y las visitas reconocieron el rincón del encuentro.',
      aftercare: 'Dejaron el rompecabezas sobre una superficie firme para que su dibujo siguiera visible.',
      check: 'Compararon las piezas del centro con el marco antes de dar el dibujo por terminado.',
      memory: 'Dibujaron un borde recto para recordar por dónde empezar un rompecabezas sin apresurarse.',
    }),
  },
  {
    id: 'hidden-colors', scenes: everywhere, objects: ['crayons', 'paintbrush'], repairVerb: 'restaurar',
    subjectLexicon: [noun('mural', 'mural'), noun('canvas', 'lienzo'), noun('drawing', 'dibujo')],
    qualifiers: ['de las señales', 'de los saludos', 'de los caminos', 'de las visitas'],
    verbs: [verb('paint-over', 'pintó encima de'), verb('cover-drawing', 'cubrió de manchas'), verb('smudge', 'llenó de rayas')],
    render: s => ({
      trigger: s.trigger, goal: `restaurar ${s.full}`,
      problem: 'unas rayas de crayones taparon los dibujos que ayudaban a reconocer cada señal',
      warning: 'Los dibujos de las señales debían conservarse aunque añadieran nuevos colores alrededor.',
      concern: 'Otra mancha grande podía esconder más dibujos en vez de ayudar a recuperarlos.',
      fact: 'un pincel limpio recuperaba las líneas bajo las manchas', model: 'un papel de prueba', spare: 'un pincel limpio', mark: 'las líneas originales',
      delivery: 'Olmo prestó un pincel limpio para recuperar las señales tapadas con crayones.',
      rehearsal: 'Olmo mostró en un papel cómo limpiar una línea sin borrar todo el dibujo.',
      repairAction: 'retiraron las manchas de crayones con el pincel y restauraron los dibujos de las señales',
      assist: 'preparó el pincel limpio y un rincón donde guardar los crayones mientras trabajaban',
      outcome: 'Los dibujos volvieron a verse y los nuevos colores encontraron espacio alrededor de las señales.',
      aftercare: 'Guardaron los crayones y limpiaron el pincel para cuidar otros dibujos otro día.',
      check: 'Miraron cada señal desde lejos para comprobar que su dibujo todavía podía reconocerse.',
      memory: 'Dibujaron una línea limpia para recordar cómo añadir color sin esconder otras ideas.',
    }),
  },
  {
    id: 'drifting-boat', scenes: shores, objects: ['boat', 'rope'], repairVerb: 'acercar',
    subjectLexicon: [noun('boat', 'barquito'), noun('little-sailboat', 'velero'), noun('dinghy', 'bote')],
    qualifiers: ['de las hojas', 'de los deseos', 'de la merienda', 'de los mensajes'],
    verbs: [verb('untie', 'desató'), verb('release', 'soltó'), verb('unmoor', 'aflojó la amarra de')],
    render: s => ({
      trigger: s.trigger, goal: `acercar ${s.full}`,
      problem: 'el barquito de juguete se alejó del rincón de juego con una cesta vacía',
      warning: 'La cuerda permitía cuidar el barquito de juguete sin tener que acercarse al agua.',
      concern: 'Las visitas se quedaron lejos de la orilla mientras buscaban cómo recuperar el juguete.',
      fact: 'la cuerda acercaba el barquito desde un sitio seguro', model: 'un dibujo del barquito', spare: 'una cuerda corta', mark: 'la anilla del juguete',
      delivery: 'Olmo prestó una cuerda para acercar el barquito sin meterse en el agua.',
      rehearsal: 'Olmo mostró en un dibujo cómo guiar el juguete manteniendo libre el camino.',
      repairAction: 'guiaron el barquito con la cuerda y lo acercaron desde un rincón seguro',
      assist: 'preparó un sitio seco y amplio donde recibir el barquito de juguete',
      outcome: 'El barquito volvió al rincón de juego y su cuerda quedó sujeta para cuidarlo.',
      aftercare: 'Dejaron el juguete lejos de la orilla y recogieron la cuerda sin apretar sus lazos.',
      check: 'Comprobaron que la cuerda siguiera sujeta antes de preparar otro juego con el barquito.',
      memory: 'Dibujaron la anilla del barquito para recordar cómo jugar sin acercarse al agua.',
    }),
  },
  {
    id: 'ribbon-knots', scenes: [...sheltered, ...plants], objects: ['yarn', 'basket'], repairVerb: 'desenredar',
    subjectLexicon: [noun('ribbons', 'cintas', 'f', 'p'), noun('garlands', 'guirnaldas', 'f', 'p'), noun('bows', 'lazos', 'm', 'p')],
    qualifiers: ['de la fiesta', 'de los colores', 'de los encuentros', 'de las visitas'],
    verbs: [verb('pull', 'tiró de'), verb('twist', 'retorció'), verb('tangle', 'enredó')],
    render: s => ({
      trigger: s.trigger, goal: `desenredar ${s.full}`,
      problem: 'los ovillos quedaron anudados sobre el camino y nadie podía preparar los adornos',
      warning: 'Los lazos debían aflojarse por partes antes de guardar los ovillos en la cesta.',
      concern: 'Tirar de todos los hilos juntos apretaba los nudos y escondía el inicio de cada ovillo.',
      fact: 'un hilo flojo dejaba espacio para deshacer cada nudo', model: 'un nudo de muestra', spare: 'un ovillo pequeño', mark: 'el hilo que quedaba flojo',
      delivery: 'Olmo acercó una cesta para guardar cada ovillo después de aflojar sus lazos.',
      rehearsal: 'Olmo pidió aflojar un solo hilo antes de intentar separar todos los ovillos.',
      repairAction: 'aflojaron cada nudo y desenredaron los ovillos antes de guardarlos en la cesta',
      assist: 'preparó la cesta y dejó espacio para apartar cada ovillo que quedara libre',
      outcome: 'Los ovillos quedaron ordenados y el camino tuvo espacio para preparar los adornos.',
      aftercare: 'Guardaron los ovillos separados para que sus hilos no volvieran a anudarse juntos.',
      check: 'Revisaron cada ovillo sin tirar de sus hilos para comprobar que todos estaban libres.',
      memory: 'Dibujaron un hilo flojo para recordar cómo deshacer un nudo sin apretarlo más.',
    }),
  },
  {
    id: 'folded-star', scenes: locations('sky', 'shelter'), objects: ['paper-star', 'lantern'], repairVerb: 'desplegar',
    subjectLexicon: [noun('star', 'estrella', 'f'), noun('decoration', 'adorno'), noun('figure', 'figura', 'f')],
    qualifiers: ['de papel', 'de los deseos', 'de los cuentos', 'de la bienvenida'],
    verbs: [verb('fold', 'dobló'), verb('crumple', 'arrugó'), verb('press-flat', 'aplastó')],
    render: s => ({
      trigger: s.trigger, goal: `desplegar ${s.full}`,
      problem: 'la estrella de papel perdió sus puntas y dejó de señalar el rincón de cuentos',
      warning: 'La estrella de papel necesitaba conservar sus puntas para que las visitas reconocieran su señal.',
      concern: 'Abrir todos los pliegues con fuerza podía romper el papel que querían recuperar.',
      fact: 'la luz del farol mostraba los pliegues de la estrella', model: 'una figura de muestra', spare: 'un farol suave', mark: 'las líneas del papel',
      delivery: 'Olmo prestó un farol para reconocer el doblez de la estrella de papel.',
      rehearsal: 'Olmo mostró cómo abrir un pliegue de muestra sin estirar ni romper el papel.',
      repairAction: 'miraron los pliegues con el farol y desplegaron la estrella de papel despacio',
      assist: 'preparó el farol junto a una superficie libre donde dejar la estrella de papel',
      outcome: 'La estrella de papel recuperó sus puntas y volvió a señalar el rincón de cuentos.',
      aftercare: 'El farol quedó apagado y la estrella tuvo un espacio donde guardar sus puntas.',
      check: 'Contaron las puntas de papel para comprobar que ninguna seguía escondida entre los pliegues.',
      memory: 'Dibujaron un pliegue abierto para recordar cómo recuperar una estrella de papel con cuidado.',
    }),
  },
  {
    id: 'missing-silences', scenes: everywhere, objects: ['flute', 'drum'], repairVerb: 'acompasar',
    subjectLexicon: [noun('melody', 'melodía', 'f'), noun('song', 'canción', 'f'), noun('tune', 'tonada', 'f')],
    qualifiers: ['de los saludos', 'de los encuentros', 'de la tarde', 'de la bienvenida'],
    verbs: [verb('speed-up', 'apresuró'), verb('change-rhythm', 'cambió el ritmo de'), verb('mix-notes', 'mezcló las notas de')],
    render: s => ({
      trigger: s.trigger, goal: `acompasar ${s.full}`,
      problem: 'la flauta y el tambor sonaron juntos sin dejar escuchar el saludo de la canción',
      warning: 'La canción necesitaba turnos para las notas de flauta y los sonidos del tambor.',
      concern: 'La canción tenía muchas notas pero ningún silencio donde reconocer otra voz.',
      fact: 'un silencio del tambor dejaba escuchar la nota de flauta', model: 'un dibujo del ritmo', spare: 'una señal de silencio', mark: 'los espacios entre las notas',
      delivery: 'Olmo explicó cómo el tambor podía marcar los silencios entre las notas de flauta.',
      rehearsal: 'Olmo pidió escuchar dos sonidos suaves y dejar un turno para la flauta.',
      repairAction: 'se turnaron con la flauta y el tambor y devolvieron sus silencios a la canción',
      assist: 'preparó las señales del ritmo para recordar dónde debía esperar cada instrumento',
      outcome: 'La canción recuperó sus turnos y cada voz encontró un espacio para saludar.',
      aftercare: 'Guardaron los instrumentos después de escuchar completo el último turno de la canción.',
      check: 'Escucharon el saludo entero para comprobar que ninguna nota escondía el turno de otra voz.',
      memory: 'Dibujaron un silencio entre dos notas para recordar el ritmo que cuidaba cada voz.',
    }),
  },
  {
    id: 'memory-pages', scenes: everywhere, objects: ['cloud', 'crayons'], repairVerb: 'ordenar',
    subjectLexicon: [noun('album', 'álbum'), noun('notebook', 'cuaderno'), noun('memory-book', 'libro')],
    qualifiers: ['de los recuerdos', 'de las visitas', 'de los encuentros', 'de las historias'],
    verbs: [verb('mix-pages', 'mezcló las páginas de'), verb('reorder-pages', 'cambió las páginas de'), verb('shuffle-pages', 'desordenó las páginas de')],
    render: s => ({
      trigger: s.trigger, goal: `ordenar ${s.full}`,
      problem: 'los recuerdos quedaron mezclados y ninguna visita reconocía el principio de su historia',
      warning: 'Las páginas guardaban señales para recordar qué había pasado antes y después.',
      concern: 'Inventar un principio distinto podía esconder el recuerdo que las visitas querían conservar.',
      fact: 'la nube mostraba los recuerdos al escuchar su historia', model: 'una página de muestra', spare: 'un dibujo guardado', mark: 'el dibujo del primer encuentro',
      delivery: 'Olmo acercó unos crayones para copiar los recuerdos que aparecían en la nube.',
      rehearsal: 'Olmo explicó cómo contar un recuerdo verdadero antes de decidir el orden de sus dibujos.',
      repairAction: 'contaron los recuerdos a la nube y ordenaron sus dibujos usando los crayones',
      assist: 'preparó los crayones y un espacio donde comparar las páginas sin volver a mezclarlas',
      outcome: 'Las historias recuperaron su principio y cada visita reconoció los recuerdos que había compartido.',
      aftercare: 'Guardaron las páginas juntas y dejaron una señal para encontrar de nuevo cada historia.',
      check: 'Contaron los recuerdos en orden para comprobar que ninguna página cambiaba lo que había pasado.',
      memory: 'Dibujaron el primer encuentro para recordar cómo una historia podía ayudar a ordenar recuerdos.',
    }),
  },
  {
    id: 'mixed-deliveries', scenes: everywhere, objects: ['backpack', 'map'], repairVerb: 'repartir',
    subjectLexicon: [noun('mail', 'correo'), noun('mailbox', 'buzón'), noun('delivery', 'reparto')],
    qualifiers: ['de los mensajes', 'de las visitas', 'de los saludos', 'de la amistad'],
    verbs: [verb('mix-letters', 'mezcló las cartas de'), verb('switch-letters', 'cambió las cartas de'), verb('shuffle-letters', 'desordenó las cartas de')],
    render: s => ({
      trigger: s.trigger, goal: 'repartir las cartas en sus destinos',
      problem: 'las cartas quedaron en rincones equivocados y sus destinatarios no recibieron los saludos',
      warning: 'Cada carta tenía una señal que coincidía con un destino dibujado en el mapa.',
      concern: 'Repartir las cartas deprisa podía llevar el saludo de una visita hasta un lugar diferente.',
      fact: 'los dibujos del mapa coincidían con las señales de las cartas', model: 'una carta de muestra', spare: 'un mapa doblado', mark: 'los dibujos de cada destino',
      delivery: 'Olmo mostró las divisiones de la mochila y las comparó con destinos del mapa.',
      rehearsal: 'Olmo pidió comparar una carta con el mapa antes de decidir dónde llevarla.',
      repairAction: 'ordenaron las cartas en la mochila y las repartieron siguiendo los destinos del mapa',
      assist: 'preparó la mochila y dejó el mapa visible para revisar el destino de cada carta',
      outcome: 'Cada destinatario recibió su carta y los saludos encontraron el rincón donde podían compartirse.',
      aftercare: 'La mochila quedó vacía y el mapa guardado para cuidar otro reparto de mensajes.',
      check: 'Compararon cada señal con su destino para comprobar que ninguna carta seguía cambiada de lugar.',
      memory: 'Dibujaron una señal del mapa para recordar cómo cuidar el destino de cada saludo.',
    }),
  },
];

export const ACTION_PLOTS = Object.freeze(plots.map(plot => Object.freeze({
  ...plot, scenes: Object.freeze([...new Set(plot.scenes)]), objects: Object.freeze(plot.objects),
  subjectLexicon: Object.freeze(plot.subjectLexicon.map(Object.freeze)),
  qualifiers: Object.freeze(plot.qualifiers), verbs: Object.freeze(plot.verbs.map(Object.freeze)),
})));

const choose = (random, choices) => choices[Math.floor(random() * choices.length)];

/** Choose words before writing sentences, so the noun, agreement and repair share one vocabulary. */
export function realizeActionPlot(plot, random) {
  const subject = choose(random, plot.subjectLexicon);
  const adjective = choose(random, ACTION_ADJECTIVES);
  const qualifierIndex = Math.floor(random() * plot.qualifiers.length);
  const verbChoice = choose(random, plot.verbs);
  const article = subject.number === 'p' ? subject.gender === 'f' ? 'las' : 'los' : subject.gender === 'f' ? 'la' : 'el';
  const adjectiveForm = adjective[`${subject.gender}${subject.number === 'p' ? 'p' : ''}`];
  const full = `${article} ${subject.noun} ${adjectiveForm} ${plot.qualifiers[qualifierIndex]}`;
  const of = article === 'el' ? `del ${full.slice(3)}` : `de ${full}`;
  const to = article === 'el' ? `al ${full.slice(3)}` : `a ${full}`;
  const trigger = verbChoice.past.endsWith(' de') ? `${verbChoice.past.slice(0, -3)} ${of}`
    : verbChoice.past.endsWith(' a') ? `${verbChoice.past.slice(0, -2)} ${to}` : `${verbChoice.past} ${full}`;
  const words = { full, of, trigger, verb: verbChoice.past, article, noun: subject.noun, adjective: adjectiveForm };
  return {
    ...plot, ...plot.render(words), title: full,
    lexicon: {
      subjectId: subject.id, adjectiveId: adjective.id, qualifierId: `${plot.id}-${qualifierIndex}`,
      verbId: verbChoice.id, subject: full, adjective: adjectiveForm, verb: verbChoice.past,
    },
  };
}

export function actionDiscovery(plot, discoveryId) {
  const lines = {
    'tiny-test': `Olmo mostró con ${plot.model} que ${plot.fact}.`,
    'new-angle': `Olmo les pidió mirar desde otro lado y así descubrieron que ${plot.fact}.`,
    'leftover-surprise': `Olmo encontró ${plot.spare} y recordó que ${plot.fact}.`,
    'remembered-idea': `Olmo recordó otra reparación y explicó que ${plot.fact}.`,
    'shared-question': `Olmo escuchó sus preguntas y aclaró que ${plot.fact}.`,
    'notice-pattern': `Olmo señaló ${plot.mark} y enseñó que ${plot.fact}.`,
  };
  return lines[discoveryId];
}
