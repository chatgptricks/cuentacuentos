// Vocabulary belongs to an objective: changing an action must preserve its cause and outcome.
// Each profile has a grammatical noun, three modifiers, and two alternatives to the original action.
const adventure = {
  seed: ['la semilla', ['luminosa', 'del amanecer', 'de los colores'], ['preparó la tierra con ayuda antes de sembrar', 'preguntó cómo cuidar el primer brote antes de plantarlo']],
  bell: ['la campanita', ['susurrante', 'de la luna', 'del silencio'], ['esperó sin tocar la campana hasta escuchar a las luciérnagas', 'cerró los ojos para distinguir el canto entre las hojas']],
  drop: ['la gota', ['cantora', 'del eco', 'de las voces'], ['cantó una nota y escuchó la respuesta de su compañía', 'compartió una melodía dejando silencios para otras voces']],
  feather: ['la pluma', ['protectora', 'de la lluvia', 'del rocío'], ['apartó una rama pequeña que rozaba una flor', 'acomodó la tierra que protegía el tallo de una flor']],
  key: ['la llave', ['amistosa', 'del encuentro', 'de la bienvenida'], ['preparó una invitación donde todas las visitas tenían sitio', 'ensayó un saludo y reservó un turno para escuchar']],
  cloud: ['la nube', ['memoriosa', 'de las historias', 'del recuerdo'], ['describió una tarde del jardín tal como la recordaba', 'dibujó un recuerdo verdadero y explicó cada detalle']],
  flower: ['la flor', ['orientadora', 'del sendero', 'de los caminos'], ['humedeció la tierra y retiró una hoja que la tapaba', 'pidió ayuda para cuidar sus raíces sin arrancarlas']],
  boat: ['el barquito', ['viajero', 'de los deseos', 'de las semillas'], ['dibujó un viaje donde las semillas llegarían sin pisar flores', 'describió cómo protegería las semillas durante el viaje']],
  lantern: ['el farol', ['acogedor', 'del refugio', 'de las luciérnagas'], ['preparó un rincón tranquilo para las visitas cansadas', 'dibujó una señal hacia un banco cómodo del jardín']],
  compass: ['la brújula', ['curiosa', 'de las preguntas', 'del regreso'], ['nombró a las visitas que necesitaban ayuda en el jardín', 'eligió regresar para acompañar a quienes buscaban orientación']],
  map: ['el mapa', ['detallista', 'de las visitas', 'del descubrimiento'], ['dibujó una flor que había observado junto al camino', 'contó los pétalos de una flor sin separarla del tallo']],
  telescope: ['el telescopio', ['soñador', 'de las estrellas', 'de la noche'], ['buscó un dibujo de estrellas por el telescopio mágico', 'comparó dos figuras celestes mirando por el telescopio']],
  'magnifying-glass': ['la lupa', ['curiosa', 'del detalle', 'de las preguntas'], ['observó las líneas de una hoja sin arrancarla', 'comparó dos pétalos que seguían unidos a su flor']],
  backpack: ['la mochila', ['generosa', 'de las meriendas', 'del descanso'], ['preparó una lista de quienes necesitaban descansar del trabajo', 'recordó a los vecinos que habían cuidado el jardín']],
  rope: ['la cuerda', ['cuidadosa', 'del sendero', 'de las raíces'], ['dibujó un paso amplio alrededor de los brotes pequeños', 'señaló las raíces que el nuevo sendero debía respetar']],
  boots: ['las botas', ['viajeras', 'del jardinero', 'del regreso'], ['preguntó dónde estaba quien necesitaba recuperar las botas', 'preparó una nota para devolver las botas a su dueño']],
  shell: ['la concha', ['melodiosa', 'de las olas', 'del silencio'], ['escuchó sin hablar hasta distinguir el rumor del mar', 'dejó un turno tranquilo para escuchar las olas']],
  pearl: ['la perla', ['serena', 'de la noche', 'del descanso'], ['guardó silencio y esperó mientras el rincón descansaba', 'preparó una pausa sin ruido antes de continuar']],
  crystal: ['el cristal', ['luminoso', 'de los colores', 'del reflejo'], ['eligió un lugar estable donde entraba luz suave', 'señaló un rincón iluminado que protegería el cristal']],
  acorn: ['la bellota', ['paciente', 'de la sombra', 'del mañana'], ['dibujó cómo regaría y protegería el brote nuevo', 'pidió ayuda para preparar tierra y cuidar sus raíces']],
  apple: ['la manzana', ['generosa', 'del encuentro', 'de la merienda'], ['dibujó porciones para que cada visita tuviera una', 'preguntó cuántas visitas compartirían la merienda']],
  'honey-jar': ['el tarrito', ['cuidadoso', 'de miel', 'del encuentro'], ['buscó el nombre de quien había dejado el tarrito', 'preguntó a los vecinos quién podía recoger su miel']],
  teacup: ['la taza', ['florida', 'de las visitas', 'del recuerdo'], ['dibujó la flor de la taza y contó sus pétalos', 'comparó la flor dibujada con las flores del jardín']],
  'watering-can': ['la regadera', ['paciente', 'de los cuidados', 'del jardín'], ['comprobó la humedad de cada maceta antes de regar', 'señaló las macetas secas y dejó descansar las húmedas']],
};

const relax = {
  patience: ['la semilla', ['paciente', 'del mañana', 'sin prisa'], ['comprobó la tierra y dejó tiempo para que brotara', 'dibujó una marca para recordar cuándo revisar la maceta']],
  listening: ['la canción', ['susurrante', 'del silencio', 'más bajita'], ['cerró los ojos y distinguió un sonido por vez', 'escuchó primero el agua y después las hojas']],
  rest: ['las nubes', ['tranquilas', 'del descanso', 'sin carrera'], ['guardó el lápiz y miró las nubes desde la manta', 'estiró los brazos y descansó antes de seguir dibujando']],
  sharing: ['la cesta', ['generosa', 'del encuentro', 'compartida'], ['separó las moras en porciones y compartió el peso', 'pidió compañía para repartir las moras y llevar la cesta']],
  mistakes: ['el pétalo', ['diferente', 'del intento', 'sorprendente'], ['convirtió el pétalo distinto en el comienzo de otra flor', 'añadió un pétalo nuevo y conservó su primer dibujo']],
  comparison: ['los pasos', ['propios', 'del paseo', 'tranquilos'], ['dejó pasar la carrera y observó una flor del camino', 'acortó el paseo para disfrutar cada detalle cercano']],
  'asking-help': ['el ovillo', ['enredado', 'de las preguntas', 'paciente'], ['mostró el nudo y pidió ayuda para aflojarlo', 'escuchó una sugerencia y soltó el hilo más cercano']],
  feelings: ['el barquito', ['paciente', 'del respiro', 'sereno'], ['contó su enfado y esperó antes de volver a soplar', 'dejó descansar el barquito mientras respiraba despacio']],
  'shadow-courage': ['el farol', ['tranquilo', 'de las sombras', 'del valor'], ['se acercó con compañía para observar qué formaba la sombra', 'preguntó por la sombra y comprobó su forma desde lejos']],
  'small-wonder': ['la lupa', ['curiosa', 'del detalle', 'sin prisa'], ['observó un pétalo con la lupa y contó sus líneas', 'apoyó la lupa y comparó despacio dos detalles cercanos']],
  'changing-wind': ['la cometa', ['paciente', 'de la brisa', 'del respiro'], ['esperó una brisa mirando los giros del molinillo', 'guardó la cometa baja hasta que el molinillo girara']],
  'musical-turns': ['la canción', ['compartida', 'del silencio', 'de los turnos'], ['tocó una nota y reservó otra para la flauta', 'contó una pausa entre el tambor y la flauta']],
  'puzzle-angle': ['la pieza', ['curiosa', 'del rompecabezas', 'del otro lado'], ['comparó las esquinas antes de girar la pieza', 'probó otra orientación sin forzar el borde de la pieza']],
  'own-colors': ['los colores', ['propios', 'del dibujo', 'elegidos'], ['dibujó con un crayón y añadió otro color con el pincel', 'eligió un crayón y preparó el pincel para probar otro color']],
  'uncertain-route': ['la brújula', ['curiosa', 'de las preguntas', 'del primer paso'], ['señaló un destino y preguntó qué flecha de la brújula seguir', 'comparó el mapa con la brújula antes de avanzar']],
  'enough-honey': ['la taza', ['sencilla', 'del encuentro', 'de lo suficiente'], ['dibujó una taza pequeña y un tarrito cerrado a su lado', 'dejó de añadir detalles y disfrutó su dibujo sencillo']],
};

const social = {
  picnic: ['la merienda', ['compartida', 'del encuentro', 'entre flores'], ['ordenó las frutas por colores y preparó los cuencos', 'puso la cesta en medio y repartió frutas lavadas']],
  boats: ['los barquitos', ['viajeros', 'del arroyo', 'de las hojas'], ['dobló una hoja firme y probó una vela pequeña', 'dibujó una vela y eligió hojas para hacer barcos']],
  flowers: ['las flores', ['inventadas', 'del saludo', 'de papel'], ['recortó pétalos de papel y dibujó un tallo', 'plegó papel en pétalos y eligió una hoja para cada flor']],
  blanket: ['la casita', ['acogedora', 'del descanso', 'de manta'], ['acomodó los cojines y tendió la manta sin tapar la entrada', 'dibujó la entrada y preparó un refugio con la manta']],
  music: ['la orquesta', ['susurrante', 'del encuentro', 'diminuta'], ['inventó un ritmo con la cesta y una nota de campana', 'tocó la campanita y preparó una pausa entre notas']],
  'treasure-map': ['el mapa', ['curioso', 'del detalle', 'de los hallazgos'], ['dibujó la pluma y una señal hacia la flor cercana', 'marcó un sendero de dibujos entre la flor y la pluma']],
  puppets: ['el teatro', ['inventado', 'del saludo', 'de las hojas'], ['preparó dos caras de hojas junto al escenario de manta', 'dibujó una expresión y ensayó un saludo detrás de la manta']],
  garden: ['el jardín', ['diminuto', 'del cuidado', 'del mañana'], ['marcó un sitio para las semillas y preparó la tierra', 'dibujó una etiqueta y dejó sitio para las raíces']],
  kite: ['la cometa', ['viajera', 'de la brisa', 'bajita'], ['revisó la cuerda y eligió un rincón para la cometa', 'probó la cometa cerca del suelo con la cuerda sujeta']],
  duet: ['la melodía', ['compartida', 'del encuentro', 'de los turnos'], ['ensayó dos notas de flauta y un toque de tambor', 'inventó un ritmo de tambor dejando sitio para la flauta']],
  mural: ['el mural', ['colorido', 'del encuentro', 'de las ideas'], ['dibujó un círculo con crayones y pintó con el pincel', 'pintó una franja con el pincel y preparó los crayones']],
  puzzle: ['el rompecabezas', ['estrellado', 'del descubrimiento', 'del otro lado'], ['agrupó las piezas por forma junto a la estrella de papel', 'comparó dos esquinas y empezó a ordenar las piezas']],
  'wind-colors': ['el molinillo', ['giratorio', 'de los colores', 'de la brisa'], ['probó el giro del molinillo con la cometa baja', 'acomodó el soporte y observó las aspas del molinillo']],
  'paper-sky': ['el cielo', ['inventado', 'del deseo', 'de papel'], ['preparó la estrella de papel y encendió una luz suave', 'acomodó el farol para iluminar la estrella de papel']],
  'sea-collection': ['los tesoros', ['brillantes', 'del mar', 'del detalle'], ['dibujó la concha y la perla sin moverlas de su sitio', 'comparó los reflejos y dibujó los tesoros donde estaban']],
  'apple-snack': ['la merienda', ['generosa', 'del huerto', 'del encuentro'], ['pidió ayuda para dividir la manzana en porciones', 'contó las visitas y preparó porciones de manzana con ayuda']],
  'tea-visit': ['la mesa', ['acogedora', 'de las visitas', 'del saludo'], ['preparó una invitación junto a la taza y el tarrito cerrado', 'dibujó una tarjeta y acomodó la taza junto a la miel']],
  'acorn-care': ['la bellota', ['paciente', 'del mañana', 'del cuidado'], ['comprobó la tierra y preparó la regadera junto a la bellota', 'eligió un sitio para la bellota y revisó la humedad']],
  'star-map': ['el mapa', ['celeste', 'de las estrellas', 'del descubrimiento'], ['comparó una figura del mapa con el dibujo del telescopio', 'dibujó dos estrellas del mapa después de mirar por el telescopio']],
  'crystal-details': ['el reflejo', ['luminoso', 'de los colores', 'del cristal'], ['observó el cristal con la lupa y dibujó sus líneas', 'comparó dos reflejos con la lupa antes de dibujarlos']],
  album: ['el álbum', ['memorioso', 'del encuentro', 'de los recuerdos'], ['dibujó una tarde especial y dejó espacio para otra historia', 'escogió dos recuerdos y preparó un dibujo de cada uno']],
  walk: ['el paseo', ['curioso', 'del detalle', 'del descubrimiento'], ['dibujó una flor cercana y marcó un sendero corto', 'eligió dos detalles para observar durante un paseo pequeño']],
  bedtime: ['la noche', ['tranquila', 'del recuerdo', 'de las palabras'], ['dibujó su momento favorito y eligió una palabra para contarlo', 'recordó un gesto de cariño y preparó un dibujo sencillo']],
};

const familyAliases = { snack: 'picnic', den: 'blanket', song: 'music', theatre: 'puppets', garden: 'garden', album: 'album', walk: 'walk', bedtime: 'bedtime' };
const pickIndex = random => Math.floor(random() * 3);

export function applyStoryLanguage(random, bookId, original) {
  const socialId = original.id.replace(/^family-/, '');
  const profile = bookId === 'adventure' ? adventure[original.id]
    : bookId === 'relax' ? relax[original.id]
      : social[bookId === 'family' ? (familyAliases[socialId] || socialId) : original.id];
  if (!profile) throw new Error(`Missing vocabulary for ${bookId}:${original.id}`);
  const [noun, modifiers, alternatives] = profile;
  const modifierIndex = pickIndex(random), verbIndex = pickIndex(random);
  const field = bookId === 'adventure' ? 'activation' : bookId === 'relax' ? 'change' : 'task';
  const title = `${noun} ${modifiers[modifierIndex]}`;
  const action = [original[field], ...alternatives][verbIndex];
  const goal = { ...original, title, [field]: action };
  if (bookId === 'adventure') {
    goal.object = title;
    // Keep the same named magical object in its clue and consequence.
    for (const [key, value] of Object.entries(goal)) {
      if (typeof value !== 'string' || key === 'id' || key === 'title' || key === 'object') continue;
      goal[key] = value.replaceAll(original.object, title)
        .replaceAll(original.object[0].toUpperCase() + original.object.slice(1), title[0].toUpperCase() + title.slice(1));
    }
  }
  return { goal, lexicon: { nounId: original.id, modifierId: `${original.id}-${modifierIndex}`, verbId: `${original.id}-${verbIndex}`, title, action: goal[field] } };
}
