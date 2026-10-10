# Cómo se construyen los cuentos

El generador funciona sin conexión, sin modelos de lenguaje y sin servicios externos. Primero elige personajes, nombres y lugar, y construye un plan con bloques intercambiables de apertura, objetivo, dificultad, estrategia, descubrimiento y cierre. Después completa una estructura con frases escritas en español. El plan y el reparto permanecen iguales durante todo el cuento.

Los bloques aportan acciones y frases propias: cambian la dificultad, cómo se resuelve, qué se descubre y cómo termina el cuento. Los objetivos mantienen unidos los objetos, las tareas y sus resultados. Una semilla no se resuelve con la frase de una campana, ni una actividad empieza con unos materiales y termina usando otros. Las estrategias y los gestos compartidos se pueden combinar con distintos objetivos sin perder ese hilo.

Cada historia tiene seis partes completas. La duración de 3 minutos usa tres páginas por parte; 6 minutos usa seis; 9 minutos usa nueve. Así aparecen 18, 36 o 54 páginas originales. Cada página contiene una sola frase breve y una ilustración pequeña relacionada con ella. Las escenas adicionales se insertan antes de terminar cada parte, para conservar la continuidad.

El límite comprobado es de 24 palabras por página con los nombres del catálogo. Los nombres de la familia se limitan a tres palabras y 24 caracteres. Las duraciones incluyen pausas para mirar las ilustraciones, tocar los personajes y escuchar sonidos. La lectura sin pausas puede ser más corta.

| Libro | Estructura | Variación narrativa |
| --- | --- | --- |
| Aventura | Llamada, umbral, prueba, descubrimiento, magia y regreso, cuidado del jardín | 24 regalos y herramientas con problemas y soluciones propios, ocho obstáculos y 35 destinos posibles |
| Acción | Error y problema, batalla de ingenio, sabio, despedida, reparación, esperanza | 16 objetivos con causas, pistas y reparaciones propias, combinados con 14 amenazas juguetonas |
| Relax | Deseo, dificultad, pausa, aprendizaje, resultado, enseñanza | 16 fábulas sobre paciencia, escucha, descanso, reparto, errores, ayuda, sentimientos, preocupaciones, atención, flexibilidad y gustos propios |
| Amigos | Invitación, preparación, dificultad, solución, actividad, recuerdo | 20 actividades: las ocho originales y doce nuevas de música, cometas, dibujo, rompecabezas, visitas, exploración y cuidados |
| Mi familia | Invitación, preparación, dificultad, solución, actividad, recuerdo | 20 actividades: merienda, refugio, canción, teatro, maceta, álbum, paseo, recuerdos del día y las doce nuevas; entre el protagonista y un familiar por cuento |

Todos los libros tienen seis aperturas, cuatro estrategias, seis formas de descubrir algo y seis cierres. Los bloques se seleccionan por separado; `STORY_BLOCK_COUNTS` expone el catálogo disponible.

| Libro | Objetivos | Dificultades | Combinaciones nominales de bloques |
| --- | ---: | ---: | ---: |
| Aventura | 24 | 8 | 165.888 |
| Acción | 16 | 14 | 193.536 |
| Relax | 16 | 5 | 69.120 |
| Amigos | 20 | 6 | 103.680 |
| Mi familia | 20 | 6 | 103.680 |

Los productos del catálogo suman 635.904 combinaciones nominales: apertura × objetivo × dificultad × estrategia × descubrimiento × cierre. No son cuentos originales escritos uno a uno ni un recuento exacto de todos los resultados alcanzables. El motor aplica restricciones de compatibilidad; por ejemplo, Aventura usa el obstáculo de la señal borrosa en destinos interiores. Tampoco se cuentan aquí nombres, escenarios, apariencias, duración o variantes de vocabulario como tramas adicionales.

Los 16 objetivos nuevos de Aventura buscan ocho herramientas de exploración y ocho tesoros o artículos de cuidado. Las doce actividades nuevas de Amigos y Mi familia son cometa bajita, tambor y flauta, mural, rompecabezas estrellado, molinillo, cielo de papel, tesoros del mar, merienda del huerto, mesa de visitas, bellota y regadera, mapa de estrellas y lupa con cristal. Las fábulas nuevas usan esos recursos para comprender sombras, mirar detalles, cambiar planes, escuchar turnos, probar otra perspectiva, elegir gustos, hacer preguntas concretas y reconocer lo suficiente.

Acción puede tratar de una puerta, un farol, una campana, un puente, una cometa, una fuente, unas semillas, un mapa, un rompecabezas, un mural, un barquito, unas cintas, una estrella de papel, una melodía, un álbum o un reparto de correo. Cada arco tiene un error inicial, una explicación útil de Olmo y una reparación propia: una brújula orienta el mapa, una cuerda acerca el barquito desde un sitio seguro, y los silencios permiten escuchar la flauta y el tambor por turnos. La puerta del viento conserva su arco como una de las opciones.

El léxico se elige dentro de cada objetivo, antes de redactar. Aventura, Relax, Amigos y Mi familia tienen tres calificativos y tres acciones coherentes por objetivo; esas acciones aparecen incluso en el cuento de tres minutos. Acción tiene tres sustantivos, cuatro adjetivos con formas de género y número, cuatro complementos y tres verbos iniciales por arco. Cambiar una campana por un carillón o un adjetivo no se cuenta como otro objetivo. Los objetos dibujados siguen siendo los recursos reales del catálogo, y el mecanismo de reparación se conserva.

En Acción, Olmo es un búho muy anciano. Muere en paz al terminar su vida. El texto dice claramente que no volverá; los personajes lloran, se acompañan y recuerdan su consejo. La reparación ocurre después de la despedida. No hay daño gráfico, resurrección ni un sonido de Olmo después de su muerte.

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

El lago se llama «Lago de la Luna» y sus frases corresponden a su ilustración nocturna. Los otros once lugares originales son bosque, castillo, jardín, playa, montaña, casita del árbol, pueblo, prado, cueva, río y reino de nubes. Los lugares nuevos aportan descripciones propias y etiquetas de compatibilidad: las actividades de familia usan sitios cotidianos, y cada arco de Acción elige sus destinos compatibles. La puerta requiere una fortaleza; el barquito usa orillas y el puente usa pasos apropiados. Aventura parte del jardín, visita cualquiera de los otros 35 escenarios y regresa a casa. Relax y Amigos alcanzan los 36 destinos mediante actividades compatibles. Los elementos se eligen junto con el objetivo o actividad, y se nombran y usan en sus acciones; no se agregan como accesorios aleatorios.

## Mi familia

El protagonista humano se conserva en todas las historias de este libro. Se pueden configurar papá, mamá, bebé, hermano o hermana de edad parecida y adolescente, con un perfil de cada rol. Cada cuento reúne al protagonista con un familiar: se puede escoger la compañía o dejar que sea una sorpresa. Los otros perfiles permanecen guardados para historias siguientes, pero no aparecen por nombre ni en los dibujos de ese cuento. Si no hay familiares configurados, se añade Dani, hermano o hermana, con el mismo creador de personajes.

Cada personaje comparte el mismo creador:

- Seis peinados: cortito, rizos, flequillo, melena, coleta y trenzas
- Seis prendas: camiseta, overol, suéter, sudadera, túnica y pijama
- Cinco tonos de piel
- Ocho colores favoritos que cambian la ropa y sus detalles
- Un nombre de hasta tres palabras y 24 caracteres, sin signos que rompan las frases

Todos los rasgos están disponibles para todos los roles. Las proporciones del dibujo dependen de la edad: bebé, infancia, adolescencia o persona adulta. Los dibujos se componen localmente con SVG; no se genera ni descarga una imagen nueva al cambiar un rasgo. La familia se guarda únicamente en el almacenamiento del dispositivo.

## API

`generateStory(bookId, duration = 3, seed?, options = {})` acepta `adventure`, `action`, `relax`, `friends` o `family`, y duraciones de 3, 6 o 9 minutos. Una semilla explícita y la misma familia reproducen el mismo contenido con la misma versión del catálogo. Cambiar la duración conserva los personajes, el título, el plan, el objetivo y el lugar, y añade escenas. `createdAt` registra el momento de generación y no forma parte de la reproducción determinista. Los cuentos ya guardados conservan su contenido; los identificadores y las posiciones de los personajes originales permiten seguir leyéndolos.

Para `family`, se pasa `options.family = { members: [...] }`. `options.companionRole` permite escoger `dad`, `mom`, `baby`, `sibling` o `teen`; su valor predeterminado `auto` elige entre los familiares configurados. `createDefaultFamily()` crea un protagonista, papá, mamá y un hermano o hermana. El normalizador conserva un personaje por rol, descarta roles desconocidos, recupera opciones dañadas y limpia los nombres guardados. `prepareFamilyStory()` conserva ese perfil completo y prepara el reparto de dos; añade Dani si solo hay un protagonista, o un perfil del rol solicitado si falta en la configuración.

```js
import { generateStory } from './src/story-engine.js';
import { createFamilyMember, normalizeFamily } from './src/family-characters.js';

const family = normalizeFamily({ members: [
  { ...createFamilyMember('child'), name: 'Sam', hair: 'braids', outfit: 'overalls', skin: 'honey', color: 'blue' },
  { ...createFamilyMember('teen'), name: 'Noa', hair: 'crop', outfit: 'dress', color: 'green' },
] });
const story = generateStory('family', 6, 'una-tarde-juntos', { family, companionRole: 'teen' });
```

La respuesta incluye `format: 'picturebook-v2'`, el título, los personajes completos, el lugar, las páginas, el número de palabras y los identificadores de las variantes. `plan.blockIds` identifica los bloques elegidos; `plan.world` conserva el escenario de destino y los elementos del objetivo. `plan.lexicon` registra `nounId`, `modifierId`, `verbId`, `title` y `action` en los libros distintos de Acción. `plan.action` registra el arco, las palabras elegidas, los objetos usados y la etapa de reparación de Acción; `ACTION_PLOTS` exporta los 16 arcos y sus escenarios y objetos compatibles. `characters` contiene el reparto activo, incluidos los perfiles humanos cuando corresponde; `family` conserva la configuración completa. En Mi familia, `hero` es el protagonista y `companion` el familiar elegido. Las páginas contienen exactamente una frase en `paragraphs[0]`, además de `scene`, `characters` y `objects`. Este formato permite descartar cuentos guardados con el diseño anterior de párrafos largos.

`generateFreshStory(bookId, duration, options, history)` conserva la API determinista de `generateStory()` y elige qué cuento nuevo aceptar. El historial contiene solo identificadores de planes: los últimos ocho por libro, hasta 40 en total. Intenta evitar los tres objetivos recientes y repetir la combinación objetivo, dificultad, estrategia y descubrimiento. Evalúa como máximo 20 candidatos; si todos repiten, devuelve el menos parecido. Los nombres, la duración y los adjetivos no sirven para disfrazar una repetición. `rememberStory()` añade el plan aceptado y `normalizeStoryHistory()` recupera datos dañados del almacenamiento local.

`CHARACTER_ATLASES` exporta el registro compartido de archivos, columnas y filas. Las posiciones de cada personaje están en `atlas.x` y `atlas.y`; `atlas.sheet` elige el atlas y su ausencia corresponde al principal. El atlas principal conserva su cuadrícula de 4 × 2 y el original `extra` conserva la de 2 × 2. Los cinco atlas nuevos usan 4 × 2 celdas cuadradas con fondo transparente. `CHARACTER_NAMES` contiene cinco nombres para cada personaje.

`WORLD_ATLASES` registra los nueve atlas de escenarios y elementos. Conserva los originales `main-places` de 2 × 2, `extra-places` de 4 × 2 y `main-objects` de 4 × 3; los seis nuevos usan 4 × 2. `SCENES` exporta las 36 identidades de lugar con nombre, etiqueta, artículo cuando corresponde, descripción, etiquetas de compatibilidad, atlas y sonido. `ITEMS` exporta los 36 elementos con etiqueta, artículo, atlas y sonido; `OBJECTS` mantiene la API de elementos y sus doce entradas originales al comienzo. `getScene(id)` y `getItem(id)` devuelven esos registros. Las listas y sus metadatos anidados son inmutables y se comparten entre generador, dibujos, sonidos y build.

`npm test` comprueba 18.000 cuentos de los cinco libros: una sola frase por página, límites de texto, determinismo, longitud, cobertura de los 124 recursos reutilizables, bloques alcanzables, ausencia de frases duplicadas, reparto estable, artículos y continuidad de la muerte del guardián. Comprueba los 52 personajes mediante generación con semillas, sus 260 nombres distintos, la proporción de animales y fantasía, cada posición del atlas y la conservación de las identidades originales. Comprueba que los 36 destinos se seleccionen y describan junto a su dibujo, y que los 36 elementos participen en objetivos; exige varios usos redactados distintos para cada elemento nuevo. La variedad se mide también después de quitar nombres, especies, lugares y léxico elegido del texto. Se comparan estrategias y descubrimientos con el mismo objetivo y dificultad para comprobar que cada bloque cambia la prosa. En Acción, verifica que la causa, la pista y la reparación correspondan al arco elegido, además de títulos y resoluciones diferentes; en los demás libros, exige los tres calificativos y las tres acciones realmente narradas por cada objetivo.

La verificación de familia recorre sus 8.640 combinaciones de apariencia, repartidas entre todos los roles, y comprueba los distintos perfiles familiares y objetivos con nombres de tres palabras. Comprueba perfiles dañados, nombres seguros, límites de cada frase, dibujos diferentes para cada opción, identidad del familiar elegido, conservación de los perfiles fuera del reparto y continuidad al aumentar la duración. La prueba del historial comprueba secuencias reales, libros independientes, recuperación de datos dañados, ausencia de cambios en la entrada y el límite de 20 candidatos con su selección de respaldo.

`npm run build` valida los 16 atlas del proyecto: PNG de ocho bits con RGBA, celdas cuadradas, tamaño compatible con su cuadrícula y píxeles visibles y transparentes en cada celda. Para los once atlas nuevos, rechaza trazos de ocho o más píxeles con alfa de al menos 128 seguidos sobre el borde de una celda, para evitar figuras cortadas o fragmentos de la ilustración vecina. La comprobación permite puntos sueltos de la textura de acuarela y conserva los atlas originales. La cuadrícula admite celdas de tamaño fraccionario, como los atlas de 1774 × 887 píxeles. El build incluye todos los atlas registrados en la caché offline.
