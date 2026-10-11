# Cómo se construyen los cuentos

El generador funciona sin conexión, sin modelos de lenguaje y sin servicios externos. Cada libro ofrece varias **estructuras de seis partes**. Al generar un cuento, el motor elige una estructura y llena sus huecos (roles, lugares y elementos) con valores del catálogo **compatibles** entre sí. Cambian los personajes, los lugares, las pruebas, los regalos y los objetivos, pero la cadena de causa y efecto se mantiene siempre. La app evita repetir la misma estructura en dos cuentos seguidos del mismo libro.

## Huecos y reglas

| Hueco | Valores | Reglas |
| --- | --- | --- |
| Protagonista y amigo | 76 personajes (56 animales y 20 de fantasía) | Cada uno declara sus habilidades (`ABILITIES`): volar, nadar, trepar, fuerza, pequeño, alto, saltar, olfato, oído, luz o magia. Delfín, ballena, sirena y pulpo solo viven historias junto al agua. Las parejas incluyen al menos un nombre masculino para que «los dos» concuerde. |
| Consejero | Abuela sabia, sabio, Merlín, maga, bruja amable, hada, espíritu del árbol, tortuga, panda, koala, elefanta; Olmo en «El robo» | Nunca coincide con la pareja protagonista. |
| Villano | 16 villanos suaves | Cada uno tiene guaridas, lo que suele llevarse, un motivo comprensible y una oferta que responde a ese motivo. |
| Secundarios | 8 crías, 8 vecinos y 8 mascotas | Las crías tienen madre o padre en el catálogo y un hábitat; los vecinos, un lugar de trabajo; las mascotas, cuidados y escondites propios. |
| Lugares | 76 escenarios | Cada lugar declara el terreno y las pruebas que permite (`PLACE_INFO`). Las habitaciones de la casa y los paisajes de sueño no tienen pruebas. |
| Pruebas y regalos | 14 pruebas, 10 regalos | Un regalo solo se usa después de entregarse; una habilidad solo la usa quien la tiene. |
| Elementos | 116 objetos | Una página dibuja únicamente los objetos que nombra su frase (`ITEM_WORDS`). |

## Las 33 estructuras

### Aventura (6)

| Estructura | Partes |
| --- | --- |
| El elixir | Problema en casa · consejero, rumbo y regalo · viaje y prueba con el regalo · prueba con la habilidad del amigo y hallazgo · la virtud que gana el elixir y el regreso · el elixir resuelve el problema |
| El rescate | Una madre o padre pide ayuda · rastro de la cría · prueba con el regalo · se oye a la cría y una habilidad la alcanza · consuelo y regreso · reencuentro |
| El mapa de tres pistas | Mapa en el baúl del desván · pergamino con una adivinanza · prueba y piedra de luna · tercera adivinanza · la piedra abre el cofre · el tesoro se comparte |
| El encargo | Un vecino pide llevar algo frágil · el camino y el cruce · una prueba · el objeto corre peligro y se salva · entrega a otro vecino · regreso y gratitud |
| Lejos de casa | Una criatura lejos de su hábitat · cómo transportarla · prueba en el camino · su familia la recibe · un regalo de su mundo · cartas y amistad |
| La gran pregunta | Una pregunta en casa · el consejero indica dónde mirar · prueba · observación · respuesta sencilla y verdadera · una pregunta nueva |

### Acción (6)

| Estructura | Partes |
| --- | --- |
| El robo y la redención | Fiesta y robo · Olmo y su regalo · Olmo muere en paz y la despedida · viaje y prueba · motivo y redención · la fiesta y el recuerdo de Olmo |
| La defensa del hogar | Aviso de un vecino · trampa inofensiva · llegada del villano · la trampa falla a medias y alguien habla con calma · motivo y redención · fiesta |
| El hechizo | Un hechizo sobre el hogar · receta del consejero · viaje y prueba · el ingrediente · la poción rompe el hechizo y el villano cuenta su motivo · redención |
| La carrera tramposa | Reto de un rival presumido · entrenamiento · la trampa · la trampa se vuelve contra quien la hizo · el héroe se para a ayudar · medallas para todos |
| El rescate en la guarida | Un villano solitario se lleva a una cría · viaje y prueba · entrar sin hacer ruido · la huida y el llanto del villano · una amistad prometida · reencuentro |
| El falso villano | Algo raro pasa en casa · todos culpan al vecino «raro» · pistas con la lupa · vigilancia nocturna · la causa real · disculpas y amistad |

### Relax (7)

| Estructura | Partes |
| --- | --- |
| La prisa | Deseo · intento con prisa · respiración · consejo · intento con calma · moraleja y sueño |
| Buenas noches a todo | Pijamada sin sueño · buenas noches a las cosas y a los animales de la noche · de vuelta a la cama · respiración · sueño |
| El ruido de la noche | Rutina de dormir · un ruido y lo que parece · respiración · ir a mirar juntos · la causa inofensiva · sueño |
| La fábula de contraste | Liebre y tortuga, la cigarra y la hormiga, o el león y el ratón, con parejas del catálogo que encajan · moraleja · sueño |
| El viaje del sueño | En la cama · una nube, un barquito, un avión de papel o la luna llevan a tres paisajes de sueño, con una respiración en cada uno · de vuelta a la cama |
| Tres cosas bonitas | Pijamada · tres recuerdos del día, cada uno en su lugar · gratitud · sueño |
| La preocupación que se encoge | Una preocupación para mañana · visita del consejero · caja, piedra lisa o tarro de la calma · un plan pequeño · sueño |

### Amigos (6)

| Estructura | Partes |
| --- | --- |
| El plan compartido | Idea · preparación · complicación · solución · disfrute · recuerdo |
| El amigo nuevo | Llega alguien tímido · el primer intento falla · algo en común · juegan · invitación a casa · amistad |
| La pelea | Discusión · cada uno en su casa · calma y reflexión · se buscan y se piden perdón · solución justa · algo creado juntos |
| La sorpresa | Un motivo para celebrar a un amigo · compras en secreto · un imprevisto salvado · la sorpresa · fiesta · gratitud |
| Todos juegan | Un juego que necesita una habilidad que el amigo no tiene · tristeza · un juego nuevo donde cada habilidad encuentra algo · todos juegan |
| La competición amistosa | Concurso · ventaja · tropieza el amigo · ayudar en vez de ganar · premio a la amistad |

### Mi familia (8)

Actividad juntos · La primera vez · Ayudantes de casa · El día al revés · Cuando era pequeño · La espera · El enfado y el abrazo · El huésped peludo (la mascota de un vecino). Si el familiar elegido es un bebé, cada frase en la que participa tiene su versión de bebé.

## Duración

Cada parte tiene nueve frases en orden de lectura y en tres niveles. Los cuentos de 3 minutos usan el nivel 1; los de 6 añaden el 2, y los de 9, el 3. Las versiones cortas solo quitan frases, nunca cambian el orden de las que quedan. Cada página tiene una frase de 6 a 24 palabras, y cada minuto de lectura suma entre 50 y 90 palabras.

## Pruebas automáticas

`npm test` genera más de 40.000 cuentos y comprueba, entre otras cosas, lo siguiente:

- Las 33 estructuras y todos sus objetivos son alcanzables.
- Cada estructura cuenta sus causas antes que sus efectos.
- El regalo se entrega antes de usarse, y las habilidades pertenecen a quien las usa.
- Los villanos aparecen en las páginas donde actúan y cuentan su motivo.
- Olmo solo muere en «El robo» y no reaparece después.
- Los animales marinos no salen del agua.
- Cada página dibuja solo lo que nombra.
- No hay errores de concordancia ni de contracciones, y no aparecen nombres repetidos.
- Las versiones cortas conservan el orden de las largas.
- Todo el arte del catálogo aparece en algún cuento.
