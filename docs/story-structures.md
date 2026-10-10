# Cómo se construyen los cuentos

El generador funciona sin conexión, sin modelos de lenguaje y sin servicios externos. Primero elige personajes, nombres y lugar, y construye un plan con bloques intercambiables de apertura, objetivo, dificultad, estrategia, descubrimiento y cierre. Después completa una estructura con frases escritas en español. El plan y el reparto permanecen iguales durante todo el cuento.

Los bloques aportan acciones y frases propias: cambian la dificultad, cómo se resuelve, qué se descubre y cómo termina el cuento. Los objetivos mantienen unidos los objetos, las tareas y sus resultados. Una semilla no se resuelve con la frase de una campana, ni una actividad empieza con unos materiales y termina usando otros. Las estrategias y los gestos compartidos se pueden combinar con distintos objetivos sin perder ese hilo.

Cada historia tiene seis partes completas. La duración de 3 minutos usa tres páginas por parte; 6 minutos usa seis; 9 minutos usa nueve. Así aparecen 18, 36 o 54 páginas originales. Cada página contiene una sola frase breve y una ilustración pequeña relacionada con ella. Las escenas adicionales se insertan antes de terminar cada parte, para conservar la continuidad.

El límite comprobado es de 24 palabras por página con los nombres del catálogo. Los nombres de la familia se limitan a tres palabras y 24 caracteres. Las duraciones incluyen pausas para mirar las ilustraciones, tocar los personajes y escuchar sonidos. La lectura sin pausas puede ser más corta.

| Libro | Estructura | Variación narrativa |
| --- | --- | --- |
| Aventura | Llamada, umbral, prueba, descubrimiento, magia y regreso, cuidado del jardín | 24 regalos y herramientas con problemas y soluciones propios, ocho obstáculos y 35 destinos posibles |
| Acción | Error y problema, batalla de ingenio, sabio, despedida, reparación, esperanza | 14 amenazas juguetonas; las seis nuevas usan flechas de mapa, estrellas de papel, piezas de rompecabezas, cometas, manchas de crayón y molinillos |
| Relax | Deseo, dificultad, pausa, aprendizaje, resultado, enseñanza | 16 fábulas sobre paciencia, escucha, descanso, reparto, errores, ayuda, sentimientos, preocupaciones, atención, flexibilidad y gustos propios |
| Amigos | Invitación, preparación, dificultad, solución, actividad, recuerdo | 20 actividades: las ocho originales y doce nuevas de música, cometas, dibujo, rompecabezas, visitas, exploración y cuidados |
| Mi familia | Invitación, preparación, dificultad, solución, actividad, recuerdo | 20 actividades: merienda, refugio, canción, teatro, maceta, álbum, paseo, recuerdos del día y las doce nuevas; con los familiares elegidos o el protagonista a solas |

Todos los libros tienen seis aperturas, cuatro estrategias, seis formas de descubrir algo y seis cierres. Los bloques se seleccionan por separado; `STORY_BLOCK_COUNTS` expone el catálogo disponible.

| Libro | Objetivos | Dificultades | Planes de bloques posibles |
| --- | ---: | ---: | ---: |
| Aventura | 24 | 8 | 165.888 |
| Acción | 1, cerrar la puerta del viento | 14 | 12.096 |
| Relax | 16 | 5 | 69.120 |
| Amigos | 20 | 6 | 103.680 |
| Mi familia | 20 | 6 | 103.680 |

Los totales multiplican apertura × objetivo × dificultad × estrategia × descubrimiento × cierre. No incluyen la variación adicional de personajes, nombres, escenarios, apariencias ni duración.

Los 16 objetivos nuevos de Aventura buscan ocho herramientas de exploración y ocho tesoros o artículos de cuidado. Las doce actividades nuevas de Amigos y Mi familia son cometa bajita, tambor y flauta, mural, rompecabezas estrellado, molinillo, cielo de papel, tesoros del mar, merienda del huerto, mesa de visitas, bellota y regadera, mapa de estrellas y lupa con cristal. Las fábulas nuevas usan esos recursos para comprender sombras, mirar detalles, cambiar planes, escuchar turnos, probar otra perspectiva, elegir gustos, hacer preguntas concretas y reconocer lo suficiente.

En Acción, Olmo es un búho muy anciano. Muere en paz al terminar su vida. El texto dice claramente que no volverá; los personajes lloran, se acompañan y recuerdan su consejo. No hay daño gráfico, resurrección ni un sonido de Olmo después de su muerte.

Hay 52 personajes, 36 escenarios y 36 elementos: 124 recursos reutilizables que se combinan sin generar una ilustración nueva para cada cuento. El catálogo conserva los doce personajes originales y agrega 24 animales y 16 personajes de fantasía, para un total de 32 animales y 20 de fantasía. Los doce lugares y doce elementos originales conservan también sus identificadores, nombres y posiciones; se agregan 24 de cada tipo. Los perfiles humanos personalizados de Mi familia se componen aparte con SVG.

| Atlas nuevo | Personajes, en orden de izquierda a derecha y de arriba abajo |
| --- | --- |
| `animals-meadow.png` | Erizo, mapache, cierva, nutria, castor, tejón, lobo y lince |
| `animals-world.png` | León, tigresa, elefanta, jirafa, cebra, mono, panda y koala |
| `animals-wings-sea.png` | Pingüino, flamenco, loro, pavo real, delfín, foca, pulpo y ballena |
| `fantasy-forest.png` | Unicornio, mago Merlín, elfo, bruja amable, sabio, princesa, rey y caballero |
| `fantasy-wonders.png` | Abuela sabia, goblin amistoso, gnomo, sirena, fénix, yeti suave, pegaso y espíritu del árbol |

| Atlas de mundo nuevo | Escenarios o elementos, en orden de izquierda a derecha y de arriba abajo |
| --- | --- |
| `places-nature.png` | Cascada, bosque de bambú, oasis, valle nevado, campo de flores, manglar, arrecife y bosque de hongos |
| `places-village.png` | Biblioteca, panadería, taller, invernadero, parque de juegos, huerto, molino y puerto |
| `places-wonder.png` | Cueva de cristal, isla flotante, torre encantada, observatorio, jardín lunar, puente arcoíris, palacio submarino y árbol gigante |
| `objects-explore.png` | Farol, brújula, mapa, telescopio, lupa, mochila, cuerda y botas |
| `objects-create.png` | Cometa, tambor, flauta, pincel, crayones, rompecabezas, molinillo y estrella de papel |
| `objects-treasure.png` | Concha, perla, cristal, bellota, manzana, tarrito de miel, taza y regadera |

Cada página indica el escenario, los personajes activos y los elementos pertinentes. Por ejemplo, puede mostrar una coneja en el bosque con una campanita, y otra página puede reutilizar ese bosque con un unicornio y una cesta. Una frase sobre un objeto o un paisaje puede mostrar cero personajes. Aventura, Relax y Amigos permiten todo el catálogo; en Acción, Olmo conserva su papel de guardián y los otros 51 personajes pueden formar la pareja protagonista.

La galería de la biblioteca permite ver los 32 animales y los 20 personajes de fantasía. Cada dibujo se puede tocar para escuchar un efecto sintetizado suave. Los personajes nuevos reutilizan efectos por familia de sonido, incluidos agua, aves, pasos, ronroneos y magia, y funcionan sin archivos de audio externos.

La galería **Explora escenarios y elementos** muestra las 36 identidades de cada tipo en sus dos pestañas. Sus sonidos también se sintetizan localmente; los 48 recursos nuevos tienen una asociación de sonido propia, aunque pueden compartir un timbre. El tambor y la flauta agregan efectos musicales suaves.

Los nombres se eligen de listas asociadas a cada personaje. Los artículos y las contracciones de los lugares respetan la gramática española. «Hada» tiene género femenino y usa «el hada» por su vocal inicial tónica. Las parejas incluyen al menos un sustantivo masculino para conservar las concordancias plurales de los textos.

El lago se llama «Lago de la Luna» y sus frases corresponden a su ilustración nocturna. Los otros once lugares originales son bosque, castillo, jardín, playa, montaña, casita del árbol, pueblo, prado, cueva, río y reino de nubes. Los lugares nuevos aportan descripciones propias y etiquetas de compatibilidad: las actividades de familia usan sitios cotidianos, y la puerta del viento de Acción necesita un escenario con una fortaleza. Aventura parte del jardín, visita cualquiera de los otros 35 escenarios y regresa a casa. Relax y Amigos alcanzan los 36 destinos mediante actividades compatibles. Los elementos se eligen junto con el objetivo o actividad, y se nombran y usan en sus acciones; no se agregan como accesorios aleatorios.

## Mi familia

El protagonista humano se conserva en todas las historias de este libro. Los familiares son opcionales: papá, mamá, bebé, hermano o hermana de edad parecida y adolescente. Se puede elegir un personaje de cada rol, quitar cualquiera de los familiares y generar un cuento con el protagonista a solas. El cuento usa los nombres configurados y solo muestra los personajes elegidos.

Cada personaje comparte el mismo creador:

- Seis peinados: cortito, rizos, flequillo, melena, coleta y trenzas
- Seis prendas: camiseta, overol, suéter, sudadera, túnica y pijama
- Cinco tonos de piel
- Ocho colores favoritos que cambian la ropa y sus detalles
- Un nombre de hasta tres palabras y 24 caracteres, sin signos que rompan las frases

Todos los rasgos están disponibles para todos los roles. Las proporciones del dibujo dependen de la edad: bebé, infancia, adolescencia o persona adulta. Los dibujos se componen localmente con SVG; no se genera ni descarga una imagen nueva al cambiar un rasgo. La familia se guarda únicamente en el almacenamiento del dispositivo.

## API

`generateStory(bookId, duration = 3, seed?, options = {})` acepta `adventure`, `action`, `relax`, `friends` o `family`, y duraciones de 3, 6 o 9 minutos. Una semilla explícita y la misma familia reproducen el mismo contenido con la misma versión del catálogo. Cambiar la duración conserva los personajes, el título, el plan, el objetivo y el lugar, y añade escenas. `createdAt` registra el momento de generación y no forma parte de la reproducción determinista. Los cuentos ya guardados conservan su contenido; los identificadores y las posiciones de los personajes originales permiten seguir leyéndolos.

Para `family`, se pasa `options.family = { members: [...] }`. `createDefaultFamily()` crea un protagonista, papá, mamá y un hermano o hermana; `normalizeFamily({ members: [] })` crea solo al protagonista. El normalizador conserva un personaje por rol, descarta roles desconocidos, recupera opciones dañadas y limpia los nombres guardados.

```js
import { generateStory } from './src/story-engine.js';
import { createFamilyMember, normalizeFamily } from './src/family-characters.js';

const family = normalizeFamily({ members: [
  { ...createFamilyMember('child'), name: 'María', hair: 'braids', outfit: 'overalls', skin: 'honey', color: 'blue' },
  { ...createFamilyMember('teen'), name: 'Sam', hair: 'crop', outfit: 'dress', color: 'green' },
] });
const story = generateStory('family', 6, 'una-tarde-juntos', { family });
```

La respuesta incluye `format: 'picturebook-v2'`, el título, los personajes completos, el lugar, las páginas, el número de palabras y los identificadores de las variantes. `plan.blockIds` identifica los bloques elegidos; `plan.world` conserva el escenario de destino y los elementos del objetivo. `characters` contiene el reparto completo, incluidos los perfiles humanos cuando corresponde; `family` conserva su configuración. En un cuento de familia a solas, `companion` apunta al propio protagonista y `characters` contiene un solo perfil. Las páginas contienen exactamente una frase en `paragraphs[0]`, además de `scene`, `characters` y `objects`. Este formato permite descartar cuentos guardados con el diseño anterior de párrafos largos.

`CHARACTER_ATLASES` exporta el registro compartido de archivos, columnas y filas. Las posiciones de cada personaje están en `atlas.x` y `atlas.y`; `atlas.sheet` elige el atlas y su ausencia corresponde al principal. El atlas principal conserva su cuadrícula de 4 × 2 y el original `extra` conserva la de 2 × 2. Los cinco atlas nuevos usan 4 × 2 celdas cuadradas con fondo transparente. `CHARACTER_NAMES` contiene cinco nombres para cada personaje.

`WORLD_ATLASES` registra los nueve atlas de escenarios y elementos. Conserva los originales `main-places` de 2 × 2, `extra-places` de 4 × 2 y `main-objects` de 4 × 3; los seis nuevos usan 4 × 2. `SCENES` exporta las 36 identidades de lugar con nombre, etiqueta, artículo cuando corresponde, descripción, etiquetas de compatibilidad, atlas y sonido. `ITEMS` exporta los 36 elementos con etiqueta, artículo, atlas y sonido; `OBJECTS` mantiene la API de elementos y sus doce entradas originales al comienzo. `getScene(id)` y `getItem(id)` devuelven esos registros. Las listas y sus metadatos anidados son inmutables y se comparten entre generador, dibujos, sonidos y build.

`npm test` comprueba 15.000 cuentos de los cinco libros: una sola frase por página, límites de texto, determinismo, longitud, cobertura de los 124 recursos reutilizables, bloques alcanzables, ausencia de frases duplicadas, reparto estable, artículos y continuidad de la muerte del guardián. Comprueba los 52 personajes mediante generación con semillas, sus 260 nombres distintos, la proporción de animales y fantasía, cada posición del atlas y la conservación de las identidades originales. Comprueba que los 36 destinos se seleccionen y describan junto a su dibujo, y que los 36 elementos participen en objetivos; exige varios usos redactados distintos para cada elemento nuevo. La variedad se mide también después de quitar nombres, especies y lugares del texto. Además, se comparan estrategias y descubrimientos con el mismo objetivo y dificultad para comprobar que cada bloque cambia la prosa.

La verificación de familia recorre sus 8.640 combinaciones de apariencia, repartidas entre todos los roles, y 1.788 cuentos: las 32 combinaciones posibles de familiares y todos los objetivos con nombres de tres palabras, tanto con reparto completo como con el protagonista a solas. Comprueba perfiles dañados, nombres seguros, límites de cada frase, dibujos diferentes para cada opción, identidad de los personajes elegidos y continuidad al aumentar la duración.

`npm run build` valida los 16 atlas del proyecto: PNG de ocho bits con RGBA, celdas cuadradas, tamaño compatible con su cuadrícula y píxeles visibles y transparentes en cada celda. Para los once atlas nuevos, rechaza trazos de ocho o más píxeles con alfa de al menos 128 seguidos sobre el borde de una celda, para evitar figuras cortadas o fragmentos de la ilustración vecina. La comprobación permite puntos sueltos de la textura de acuarela y conserva los atlas originales. La cuadrícula admite celdas de tamaño fraccionario, como los atlas de 1774 × 887 píxeles. El build incluye todos los atlas registrados en la caché offline.
