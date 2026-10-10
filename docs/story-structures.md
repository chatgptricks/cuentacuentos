# Cómo se construyen los cuentos

El generador funciona sin conexión, sin modelos de lenguaje y sin servicios externos. Primero elige una combinación de personajes, nombres, lugar, objetivo y variante. Después completa una estructura con frases escritas en español. Esos datos permanecen iguales durante todo el cuento.

Cada historia tiene seis partes completas. La duración de 3 minutos usa tres páginas por parte; 6 minutos usa seis; 9 minutos usa nueve. Así aparecen 18, 36 o 54 páginas originales. Cada página contiene una sola frase breve y una ilustración pequeña relacionada con ella. Las escenas adicionales se insertan antes de terminar cada parte, para conservar la continuidad.

El límite comprobado es de 24 palabras por página; los textos actuales llegan a un máximo de 20. Las duraciones incluyen pausas para mirar las ilustraciones, tocar los personajes y escuchar sonidos. La lectura sin pausas puede ser más corta.

| Libro | Estructura | Variación narrativa |
| --- | --- | --- |
| Aventura | Llamada, umbral, prueba, pista, regalo, regreso | Cuatro regalos con problemas y soluciones propios, tres obstáculos y once destinos posibles |
| Acción | Error y problema, batalla de ingenio, sabio, despedida, reparación, esperanza | Tres amenazas juguetonas con estrategias diferentes, llaves y recuerdos; se repara el error inicial |
| Relax | Deseo, dificultad, pausa, aprendizaje, resultado, enseñanza | Cuatro fábulas: paciencia con una semilla, escucha en el lago, descanso al dibujar y reparto de moras |
| Amigos | Invitación, preparación, desacuerdo, solución, actividad, despedida | Merienda, barquitos de hojas, flores de papel y casita de manta; cada actividad tiene materiales, conflicto y solución propios |

En Acción, Olmo es un búho muy anciano. Muere en paz al terminar su vida. El texto dice claramente que no volverá; los personajes lloran, se acompañan y recuerdan su consejo. No hay daño gráfico, resurrección ni un sonido de Olmo después de su muerte.

Hay doce personajes, doce lugares y doce elementos que se combinan sin generar una ilustración nueva para cada cuento. Cada página indica el escenario, los personajes activos y los elementos pertinentes. Por ejemplo, puede mostrar una coneja en el bosque con una campanita, y otra página puede reutilizar ese bosque con un ratón y una cesta. Una frase sobre un objeto o un paisaje puede mostrar cero personajes.

Los nombres se eligen de listas asociadas a cada personaje. Los artículos y las contracciones de los lugares respetan la gramática española. «Hada» tiene género femenino y usa «el hada» por su vocal inicial tónica. Las parejas incluyen al menos un sustantivo masculino para conservar las concordancias plurales de los textos.

El lago se llama «Lago de la Luna» y sus frases corresponden a su ilustración nocturna. Los otros lugares son bosque, castillo, jardín, playa, montaña, casita del árbol, pueblo, prado, cueva, río y reino de nubes. Todos aparecen en combinaciones válidas del generador.

## API

`generateStory(bookId, duration = 3, seed?)` acepta `adventure`, `action`, `relax` o `friends`, y duraciones de 3, 6 o 9 minutos. Una semilla explícita reproduce el mismo contenido. Cambiar la duración conserva los personajes, el título, el objetivo y el lugar, y añade escenas. `createdAt` registra el momento de generación y no forma parte de la reproducción determinista.

La respuesta incluye `format: 'picturebook-v2'`, el título, los personajes completos, el lugar, las páginas, el número de palabras y los identificadores de las variantes. Las páginas contienen exactamente una frase en `paragraphs[0]`, además de `scene`, `characters` y `objects`. Este formato permite descartar cuentos guardados con el diseño anterior de párrafos largos.

Las posiciones del atlas principal de personajes están en `atlas.x` y `atlas.y`, sobre una cuadrícula de 4 × 2. Los cuatro personajes adicionales usan `atlas.sheet: 'extra'` y una cuadrícula de 2 × 2. `OBJECTS` exporta los doce elementos en el orden del atlas de 4 × 3: semilla, campana, gota, pluma, llave, paraguas, nube, lana, manta, cesta, flor y barquito.

Ejecutar `node scripts/verify-stories.mjs` comprueba 12.000 cuentos: una sola frase por página, límites de texto, determinismo, longitud, cobertura de los 36 recursos reutilizables, variedad alcanzable, ausencia de frases duplicadas, reparto estable, artículos y continuidad de la muerte del guardián.
