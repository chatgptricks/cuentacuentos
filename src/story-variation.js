import { SCENES } from './world-catalog.js';
import { namedItems } from './narrative-world.js';

/**
 * A storyteller's voice for each story. The structure fixes what happens; the voice picks,
 * once per story, how recurring formulas and places are told. The first option is always
 * the original wording, so every variant keeps the same meaning, length and named items.
 */

/** Two more ways to paint the places that appear most often. */
const PLACE_VARIANTS = {
  bedroom: ['En el dormitorio, la almohada esperaba bien mullida y las cortinas dejaban pasar una luz suave.', 'El dormitorio olía a ropa limpia y tenía un rincón con cuentos apilados.'],
  'living-room': ['En la sala de estar, los cojines formaban una montaña blanda junto al sofá verde.', 'La sala de estar era el rincón favorito para charlar al final del día.'],
  playroom: ['En el cuarto de juegos, cada juguete tenía su estante y su caja.', 'El cuarto de juegos guardaba torres a medio hacer y una alfombra con caminos dibujados.'],
  kitchen: ['En la cocina siempre había algo rico al fuego y una mesa redonda para todos.', 'La cocina tenía una ventana soleada y olía a pan tostado.'],
  attic: ['En el desván, el polvo bailaba en un rayo de luz que entraba por la ventanita redonda.', 'El desván crujía un poco y estaba lleno de cajas con historias antiguas.'],
  porch: ['En el porche había un banco de madera y unas macetas con flores rojas.', 'Desde el porche se veía todo el camino hasta la cerca.'],
  playground: ['En el parque había columpios, un tobogán bajito y mucho sitio para correr.', 'El parque se llenaba de risas en cuanto salía el sol.'],
  school: ['En la escuela había dibujos de colores en las paredes y un patio lleno de sol.', 'La escuela olía a lápices nuevos y tenía ventanas muy grandes.'],
  market: ['En el mercado, los puestos ofrecían fruta brillante bajo toldos de colores.', 'El mercado estaba lleno de voces que anunciaban fruta fresca y pan recién hecho.'],
  'festival-square': ['En la plaza, los farolillos de colores colgaban de un lado a otro.', 'La plaza tenía una fuente en medio y mucho sitio para bailar.'],
  village: ['En el pueblo, las casas tenían puertas de colores y flores en las ventanas.', 'Por las calles del pueblo siempre olía a pan y se oían saludos.'],
  garden: ['En el jardín, las flores formaban caminos de colores entre bancos pequeños.', 'El jardín zumbaba de abejas y olía a hierba recién regada.'],
  meadow: ['En el prado, la hierba suave se movía como un mar verde.', 'El prado estaba lleno de flores pequeñas y mariposas que iban de una a otra.'],
  treehouse: ['La casita del árbol se mecía un poquito cuando soplaba el viento.', 'Desde la casita del árbol se veían las copas de todos los árboles.'],
  forest: ['En el bosque, la luz se colaba entre las hojas y dibujaba manchas doradas.', 'El bosque olía a musgo y a tierra mojada.'],
  beach: ['En la playa, la arena estaba tibia y las olas llegaban despacio.', 'La playa brillaba al sol, llena de conchitas y huellas pequeñas.'],
  lake: ['En el lago, el agua estaba tan quieta que parecía un espejo.', 'El lago tenía un muelle pequeño y patos que nadaban en fila.'],
  river: ['En el río, el agua corría cantando entre piedras redondas.', 'El río era ancho y tranquilo, con juncos en las orillas.'],
  orchard: ['En el huerto, los árboles estaban cargados de fruta madura.', 'El huerto olía a manzanas y tenía caminos entre los árboles bajos.'],
  farm: ['En la granja, las gallinas picoteaban junto al establo y los girasoles miraban al sol.', 'La granja tenía una cerca de madera y un establo lleno de heno.'],
  harbor: ['En el puerto, los barcos de velas pequeñas se mecían junto al muelle.', 'El puerto olía a mar y se oían las gaviotas.'],
  windmill: ['El molino movía sus aspas despacio, como si saludara al viento.', 'Junto al molino había una plaza amplia donde el viento jugaba con las hojas.'],
  mountain: ['En la montaña, el aire era fresco y el camino subía en curvas suaves.', 'La montaña tenía la cima blanca y senderos entre las rocas.'],
  'snowy-valley': ['En el valle nevado, cada paso dejaba una huella redonda en la nieve.', 'El valle estaba blanco y silencioso, con árboles pequeños llenos de nieve.'],
  'flower-field': ['En el campo, las flores de colores llegaban hasta donde alcanzaba la vista.', 'El campo de flores olía tan bien que daban ganas de quedarse allí.'],
};

/** Recurring formulas and their equivalents; each story keeps one choice for all its pages. */
const FORMULAS = [
  [/caminaron un largo rato hasta llegar/u, ['caminaron un largo rato hasta llegar', 'anduvieron sin prisa hasta llegar', 'siguieron el sendero hasta llegar']],
  [/^Entonces (.+) tuvo una idea, porque/u, ['Entonces $1 tuvo una idea, porque', 'En ese momento, a $1 se le ocurrió algo, porque', 'Entonces $1 dio un paso adelante, porque']],
  [/como si olieran una flor/u, ['como si olieran una flor', 'como si olieran un pastel recién hecho', 'como si olieran la hierba mojada']],
  [/como si oliera una flor/u, ['como si oliera una flor', 'como si oliera un pastel recién hecho', 'como si oliera la hierba mojada']],
  [/como si apagaran una vela/u, ['como si apagaran una vela', 'como si soplaran una pluma', 'como si soplaran un molinillo']],
  [/como si apagara una vela/u, ['como si apagara una vela', 'como si soplara una pluma', 'como si soplara un molinillo']],
  [/^Desde entonces, /u, ['Desde entonces, ', 'Desde aquel día, ', 'A partir de entonces, ']],
  [/^Esa noche, /u, ['Esa noche, ', 'Aquella noche, ']],
  [/^Poco a poco, /u, ['Poco a poco, ', 'Poquito a poco, ']],
  [/con los ojos muy abiertos/u, ['con los ojos muy abiertos', 'con los ojos como platos']],
  [/sin saber qué hacer/u, ['sin saber qué hacer', 'sin saber muy bien qué hacer']],
  [/^Todo estaba en calma/u, ['Todo estaba en calma', 'Todo estaba tranquilo']],
  [/le dio un abrazo enorme/u, ['le dio un abrazo enorme', 'le dio un abrazo de oso']],
  [/se echaron a reír/u, ['se echaron a reír', 'se rieron a carcajadas']],
];

const DESCRIBED = new Map(SCENES.map(scene => [scene.detail, scene.id]));

/** Every way a place may be described: its original sentence first. */
export const sceneDescriptions = id => [SCENES.find(scene => scene.id === id)?.detail, ...(PLACE_VARIANTS[id] || [])].filter(Boolean);

function voiceRandom(seed) {
  let value = 2166136261;
  for (const letter of String(seed)) value = Math.imul(value ^ letter.codePointAt(0), 16777619);
  return () => {
    value = Math.imul(value ^ (value >>> 15), 2246822507) + 0x9E3779B9 | 0;
    value = Math.imul(value ^ (value >>> 13), 3266489909);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
  };
}

/**
 * Retells every sentence of the beats in this story's voice before the duration is applied,
 * so 3, 6 and 9 minutes share the same wording. A variant that would hide a drawn item is skipped.
 */
export function voiceBeats(beats, seed) {
  const random = voiceRandom(`voice:${seed}`);
  const formulas = FORMULAS.map(([pattern, options]) => [pattern, options[Math.floor(random() * options.length)]]);
  const places = new Map();
  const placeFor = id => {
    if (!places.has(id)) {
      const options = sceneDescriptions(id);
      places.set(id, options[Math.floor(random() * options.length)]);
    }
    return places.get(id);
  };
  return beats.map(beat => beat.map(entry => {
    const original = entry.page.paragraphs[0];
    let text = DESCRIBED.has(original) ? placeFor(DESCRIBED.get(original)) : original;
    for (const [pattern, replacement] of formulas) text = text.replace(pattern, replacement);
    if (text === original || namedItems(text, entry.page.objects).length !== entry.page.objects.length) return entry;
    return { ...entry, page: { ...entry.page, paragraphs: [text] } };
  }));
}
