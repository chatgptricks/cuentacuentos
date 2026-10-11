# Cómo se construyen los cuentos

El generador funciona sin conexión, sin modelos de lenguaje y sin servicios externos. Cada libro tiene una **estructura fija de seis partes** con huecos (roles, lugares y elementos). Antes de escribir una sola frase, el motor llena cada hueco con un valor del catálogo **compatible** con los demás. Lo que cambia entre cuentos son los personajes, los lugares, las pruebas, los regalos y los objetivos; la lógica de causa y efecto se mantiene siempre.

## Huecos de cada historia

| Hueco | Qué es | Reglas de compatibilidad |
| --- | --- | --- |
| Protagonista y amigo | Dos personajes del catálogo | Cada personaje declara sus habilidades (`ABILITIES`): volar, nadar, trepar, fuerza, pequeño, alto, saltar, olfato, oído, luz o magia. Delfín, ballena, sirena y pulpo solo viven historias junto al agua o bajo ella. |
| Consejero | Abuela sabia, sabio, Merlín, maga, bruja amable, hada, espíritu del árbol o tortuga (Aventura); también panda, koala y elefanta (Relax); el búho Olmo (Acción) | Nunca coincide con el protagonista ni con el amigo. |
| Villano | Trol gruñón, fantasma miedoso, cuervo coleccionista, gata pirata, ogro glotón, duende travieso, araña tejedora y gigante despistado | Cada uno tiene guaridas posibles, lo que suele llevarse, un motivo comprensible y una solución que responde a ese motivo. |
| Lugar de inicio y final | El hogar | El problema o la fiesta pertenecen a ese hogar, y el cuento vuelve a él. |
| Lugar de aventura | El destino | Solo los destinos donde puede estar el elixir o la guarida del villano. |
| Pruebas | Agua ancha, corriente, grieta, altura, viento, hielo, niebla, laberinto, puerta cerrada, pasadizo oscuro, noche, zarzas, lluvia o desierto | Cada lugar declara qué pruebas permite su terreno (`PLACE_INFO`). No hay hielo en la playa ni grietas en el reino de las nubes. |
| Regalo | Cuerda, barquito, botas, brújula, mapa, ovillo, llave, farol, telescopio o paraguas | El consejero entrega el regalo que resuelve la primera prueba, y se usa después de entregarlo. |
| Elixir | Semilla de luz, cristal del sol, gota cantora, pluma de lluvia, campanita de luna, perla de las mareas, caracola de las canciones, manzana dorada, bellota del roble eterno, flor del arcoíris, nube de los sueños, miel de las abejas doradas y molinillo de los vientos | Cada elixir resuelve un problema concreto del hogar, pide una virtud para dejarse llevar y explica la enseñanza final. |

## Las cinco estructuras

| Libro | Partes |
| --- | --- |
| Aventura | 1. Hogar y problema · 2. Consejero, rumbo y regalo · 3. Viaje y primera prueba (resuelta con el regalo) · 4. Segunda prueba (resuelta con la habilidad del amigo) y hallazgo · 5. La virtud que gana el elixir y el regreso · 6. El elixir resuelve el problema y la enseñanza |
| Acción | 1. Fiesta en el hogar y robo del villano · 2. Olmo cuenta dónde vive el villano y da un regalo · 3. Olmo muere en paz y la despedida · 4. Viaje y prueba (resuelta con el regalo de Olmo) · 5. Encuentro, motivo del villano y redención · 6. Devolución, la fiesta y el recuerdo de Olmo |
| Relax | 1. Un deseo en un lugar tranquilo · 2. Un intento con prisa y el sentimiento que deja · 3. Respiración guiada · 4. Llega el consejero con una enseñanza · 5. Un intento con calma y su resultado · 6. Regreso a casa, la moraleja y dormir |
| Amigos | 1. La idea en casa y la invitación · 2. Preparación en el lugar · 3. Una complicación y una propuesta · 4. La propuesta funciona y el amigo aporta su idea · 5. El nombre, el disfrute y el recuerdo · 6. Regreso a casa y lo aprendido |
| Mi familia | Igual que Amigos, con el familiar elegido. Con un bebé, las frases se adaptan a lo que un bebé puede hacer. |

## Duración

Cada parte tiene nueve frases escritas en orden de lectura y marcadas en tres niveles. El cuento de 3 minutos usa el nivel 1 (tres frases por parte), el de 6 minutos añade el nivel 2 y el de 9 minutos añade el nivel 3. Las versiones cortas solo quitan frases; nunca cambian el orden de las que quedan. Por eso el cuento de 3 minutos ya cuenta la historia completa, y los largos añaden detalles sin romper la continuidad. Así salen 18, 36 o 54 páginas, cada una con una frase de 6 a 24 palabras.

## Ilustraciones

Cada página dibuja su escenario, los personajes que actúan y solo los elementos que su frase nombra. El villano aparece en las páginas donde actúa. Mientras falte `public/art/villains.png`, el lector oculta a los villanos (el texto se lee igual) y el build lo indica; cuando se añada el archivo, se quita de `PENDING_ART` en `src/villain-catalog.js`.

## Pruebas automáticas

`npm test` genera miles de cuentos y comprueba, entre otras cosas: que el regalo se entrega antes de usarse; que la habilidad que resuelve una prueba pertenece al personaje que la usa; que las pruebas son posibles en ese terreno; que el elixir resuelve el problema del inicio; que el villano cuenta su motivo y que la solución responde a él; que Olmo no reaparece después de su muerte; que los animales marinos no salen del agua; que cada página solo dibuja lo que nombra; que la gramática y las contracciones son correctas, y que las versiones cortas conservan el orden de las largas.
