# Cómo se construyen los cuentos

El generador funciona sin conexión, sin modelos de lenguaje y sin servicios externos. Cada libro ofrece varias **estructuras de seis partes**. Al generar un cuento, el motor elige una estructura y llena sus huecos (roles, lugares y elementos) con valores del catálogo **compatibles** entre sí. Cambian los personajes, los lugares, las pruebas, los regalos y los objetivos, pero la cadena de causa y efecto se mantiene siempre. La app evita repetir la misma estructura en dos cuentos seguidos del mismo libro.

Cada cuento nuevo mantiene una pareja protagonista y un objetivo central. Los secundarios solo se añaden cuando cumplen una función: quien necesita un rescate, quien encarga o recibe algo, un consejero necesario o el antagonista. Hay como máximo cuatro personajes, dos objetos por página y cuatro objetos distintos en la lectura completa. El mapa conserva cinco elementos porque las pistas y el tesoro forman parte de su causa y efecto. El catálogo amplio ofrece variedad **entre cuentos**, sin obligar a incluir todos sus accesorios en cada historia. Los cuentos guardados conservan sus páginas y sus identificadores.

## Huecos y reglas

| Hueco | Valores | Reglas |
| --- | --- | --- |
| Protagonista y amigo | 76 personajes (56 animales y 20 de fantasía) | Cada uno declara sus habilidades (`ABILITIES`): volar, nadar, trepar, fuerza, pequeño, alto, saltar, olfato, oído, luz o magia. Delfín, ballena, sirena y pulpo solo viven historias junto al agua. Las parejas incluyen al menos un nombre masculino para que «los dos» concuerde. |
| Consejero | Consejeros del catálogo en Aventura y El hechizo; Olmo en «El robo» | Solo aparece si la trama necesita ese papel. En La prisa, La preocupación y La carrera ayuda el compañero protagonista. |
| Villano | 16 villanos suaves | Cada uno tiene guaridas, lo que suele llevarse, un motivo comprensible y una oferta que responde a ese motivo. |
| Secundarios | 8 crías, 8 vecinos y 8 mascotas | Las crías tienen madre o padre en el catálogo y un hábitat; los vecinos, un lugar de trabajo; las mascotas, cuidados y escondites propios. |
| Lugares | 76 escenarios | Cada lugar declara el terreno y las pruebas que permite (`PLACE_INFO`). Las habitaciones de la casa y los paisajes de sueño no tienen pruebas. |
| Pruebas y regalos | 14 pruebas, 10 regalos | Un regalo solo se usa después de entregarse; una habilidad solo la usa quien la tiene. |
| Elementos | 116 objetos | Una página dibuja únicamente los objetos que nombra su frase (`ITEM_WORDS`). |

## Las 60 estructuras

### Aventura (12)

| Estructura | Partes |
| --- | --- |
| El elixir | Problema en casa · consejero, rumbo y regalo · viaje y prueba con el regalo · prueba con la habilidad del amigo y hallazgo · la virtud que gana el elixir y el regreso · el elixir resuelve el problema |
| El rescate | Una madre o padre pide ayuda · rastro de la cría · prueba con el regalo · se oye a la cría y una habilidad la alcanza · consuelo y regreso · reencuentro |
| El mapa de tres pistas | Mapa en el desván · pergamino con una adivinanza · prueba y piedra de luna · letras de la piedra con la tercera adivinanza · la piedra abre el cofre · el tesoro se comparte |
| El encargo | Un vecino pide llevar algo frágil · el camino y el cruce · una prueba · el objeto corre peligro y se salva · entrega a otro vecino · regreso y gratitud |
| Lejos de casa | Una criatura lejos de su hábitat · cómo transportarla · prueba en el camino · su familia la recibe · un regalo de su mundo · cartas y amistad |
| La gran pregunta | Una pregunta en casa · el consejero indica dónde mirar · prueba · observación · respuesta sencilla y verdadera · una pregunta nueva |
| La estrella caída | Una estrella cae cerca de casa · la promesa de llevarla al lugar más alto · prueba en el camino · no puede subir sola · una cometa, una nana, un farol, un deseo o el vuelo de un amigo la devuelven · cada noche la buscan en el cielo |
| El faro apagado | El guardián pide ayuda · la llave, el farol, el cristal o la campana · prueba en el acantilado · la luz vuelve · los barcos regresan · visitas cada domingo |
| La carta perdida | El viento se lleva una carta de la cartera · la promesa · el viaje y la prueba · la carta aparece · la entrega a quien la esperaba · cartas propias |
| La flor de hielo | Un verano sin agua · el consejo · el viaje al frío y la prueba · la flor que nunca se derrite · el agua vuelve · el verano fresco |
| La nube perdida | Sequía · una nubecita enganchada cerca de casa · viaje al Reino de las Nubes · la familia de nubes · la lluvia como regalo · el saludo desde el cielo |
| El huevo misterioso | Un huevo sin dueño · dos visitas equivocadas · la pista · la familia correcta · el huevo se abre · visitas a la cría |

### Acción (12)

| Estructura | Partes |
| --- | --- |
| El robo y la redención | Fiesta y robo · Olmo y su regalo · Olmo muere en paz y la despedida · viaje y prueba · motivo y redención · la fiesta y el recuerdo de Olmo |
| La defensa del hogar | Aviso del compañero · trampa inofensiva · llegada del villano · la trampa falla a medias y alguien habla con calma · motivo y redención · fiesta |
| El hechizo | Un hechizo sobre el hogar · receta del consejero · viaje y prueba · el ingrediente · la poción rompe el hechizo y el villano cuenta su motivo · redención |
| La carrera tramposa | Reto de un rival presumido · entrenamiento · la trampa · la trampa se vuelve contra quien la hizo · el héroe se para a ayudar · medallas para todos |
| El rescate en la guarida | Un villano solitario se lleva a una cría · viaje y prueba · entrar sin hacer ruido · la huida y el llanto del villano · una amistad prometida · reencuentro |
| El falso villano | Algo raro pasa en casa · todos culpan al vecino «raro» · pistas con la lupa · vigilancia nocturna · la causa real · disculpas y amistad |
| La tormenta | Sin villano: la señal del cielo · avisar a los vecinos y prepararse · refugio · rescatar a una cría o mascota · el arcoíris y recoger juntos · calma |
| Las tres adivinanzas | Un recado al otro lado · un villano cierra el paso · tres adivinanzas resueltas por cada uno y por los dos · el villano confiesa su soledad · un camino abierto para todos |
| La balsa a la deriva | Sin villano: una cría río abajo · carrera por la orilla y una cuerda · prueba junto a la cascada · el rescate · el reencuentro · jugar seguros junto al río |
| La rata ladrona | Desaparecen cosas brillantes · el rastro con la lupa · la madriguera y la prueba · la rata explica su casa fría y oscura · lo devuelve todo · un farol para su casa |
| El gigante dormido | El río inunda el camino · un gigante dormido hace de presa · el ruido falla · una pluma, una flauta o un rayo de sol lo despiertan · por qué no podía dormir · un regalo para sus noches |
| La nube enfadada | Una nube de tormenta llueve sobre cada fiesta · subida a las nubes y prueba · su soledad · llover donde la esperan · invitada a la fiesta con un arcoíris |

### Relax (12)

| Estructura | Partes |
| --- | --- |
| La prisa | Deseo · intento con prisa · respiración · consejo · intento con calma · moraleja y sueño |
| Buenas noches a todo | Pijamada sin sueño · saludos tranquilos con un solo visitante recurrente · de vuelta a la cama · respiración · sueño |
| El ruido de la noche | Rutina de dormir · un ruido y lo que parece · respiración · ir a mirar juntos · la causa inofensiva · sueño |
| La fábula de contraste | Liebre y tortuga, la cigarra y la hormiga, o el león y el ratón, con parejas del catálogo que encajan · moraleja · sueño |
| El viaje del sueño | En la cama · una nube, un barquito, un avión de papel o la luna llevan a tres paisajes de sueño, con una respiración en cada uno · de vuelta a la cama |
| Tres cosas bonitas | Pijamada · una actividad compartida, su sonrisa y su gratitud, en el mismo lugar · gratitud · sueño |
| La preocupación que se encoge | Una preocupación para mañana · compañía del amigo · una caja, piedra lisa o tarro de la calma · un plan pequeño · sueño |
| Cómo duermen los demás | Una noche sin sueño · tres animales que duermen a su manera, imaginados y copiados en la cama · cada uno descansa a su manera · sueño |
| La tarde de lluvia | Un plan al aire libre que se estropea · escuchar la lluvia · dos juegos tranquilos dentro · charcos y la primera estrella · dormir con la lluvia |
| El paseo del atardecer | Un paseo lento · tres seres que vuelven a casa a dormir · respiración · la primera estrella · la vuelta a casa · sueño |
| La nana del mar | Atardecer junto al mar (también para los animales marinos) · respirar como las olas · una concha, los barquitos o el camino de la luna · el shhh del mar · sueño |
| El baño de burbujas | Pijamada · un baño con dos juegos de espuma · pijama y dientes · un cuento · respiración · sueño |

### Amigos (12)

| Estructura | Partes |
| --- | --- |
| El plan compartido | Idea · preparación · complicación · solución · disfrute · recuerdo |
| El amigo nuevo | Llega alguien tímido · el primer intento falla · algo en común · juegan · invitación a casa · amistad |
| La pelea | Discusión · cada uno en su casa · calma y reflexión · se buscan y se piden perdón · solución justa · algo creado juntos |
| La sorpresa | Un motivo para celebrar al compañero · solo dos cosas elegidas para ese motivo · un imprevisto con esas mismas cosas · la sorpresa · celebración juntos · gratitud |
| Todos juegan | Un juego que necesita una habilidad que el amigo no tiene · tristeza · un juego nuevo donde cada habilidad encuentra algo · todos juegan |
| La competición amistosa | Concurso · ventaja · tropieza el amigo · ayudar en vez de ganar · premio a la amistad |
| El juguete prestado | Un préstamo · el juguete se rompe · la tentación de esconderlo · la verdad · perdón · lo arreglan juntos |
| El club secreto | Fundan un club solo para dos · alguien quiere entrar y se va triste · la regla no es justa · lo buscan · su talento ayuda al club · siempre hay sitio para uno más |
| El partido | Amigos en equipos rivales · una derrota ajustada · el enfado · el amigo se acerca · felicitar al otro equipo · un partido con equipos mezclados |
| El amigo en cama | Un amigo resfriado, con tos o con fiebre · no se puede entrar · regalos por la ventana · un idioma secreto · se cura · vuelven a jugar |
| La mudanza | Un amigo se muda · el último día en dos lugares favoritos · un regalo · despedida en la estación · cartas · una visita en verano |
| El huerto compartido | Plantar juntos · cuidados diarios · pájaros, caracoles o sequía resueltos con cariño · la cosecha · compartir con los vecinos · semillas para la próxima primavera |

### Mi familia (12)

Actividad juntos · La primera vez · Ayudantes de casa · El día al revés · Cuando era pequeño · La espera · El enfado y el abrazo · El huésped peludo (la mascota de un vecino) · Acampada en el jardín (un ruido en la noche que resulta ser un vecino pequeño) · El regalo hecho a mano (un pequeño desastre salvado y una entrega feliz) · La visita a los abuelos (en tren, con dos planes en su casa) · El cuento inventado (un cuento por turnos cuyas escenas se ilustran). Si el familiar elegido es un bebé, cada frase en la que participa tiene su versión de bebé.

## La voz de cada cuento

Además de la trama, cada cuento elige su propia manera de contarse (`src/story-variation.js`): una descripción para cada lugar entre varias y una versión de las fórmulas que más se repiten («caminaron un largo rato», «como si olieran una flor», «Desde entonces»). Las estructuras de Relax, Amigos y Mi familia también tienen varias versiones de sus frases principales. La voz se elige antes de recortar la duración, así que las lecturas de 3, 6 y 9 minutos de una misma semilla dicen lo mismo con las mismas palabras. Las actividades tranquilas solo ocurren en lugares cotidianos: nunca en guaridas, fortalezas, sueños o pasos peligrosos.

## Duración

Cada parte tiene nueve frases en orden de lectura y en tres niveles. Los cuentos de 3 minutos usan el nivel 1; los de 6 añaden el 2, y los de 9, el 3. Las versiones cortas solo quitan frases, nunca cambian el orden de las que quedan. Cada página tiene una frase de 6 a 24 palabras, y cada minuto de lectura suma entre 50 y 90 palabras.

## Pruebas automáticas

`npm test` genera más de 40.000 cuentos y comprueba, entre otras cosas, lo siguiente:

- Las 60 estructuras y todos sus objetivos son alcanzables.
- Cada estructura cuenta sus causas antes que sus efectos.
- El regalo se entrega antes de usarse, y las habilidades pertenecen a quien las usa.
- Los villanos aparecen en las páginas donde actúan y cuentan su motivo.
- Olmo solo muere en «El robo» y no reaparece después.
- Los animales marinos no salen del agua.
- Cada página dibuja solo lo que nombra.
- La pareja y el objetivo siguen siendo los mismos; no se superan los presupuestos de personajes y objetos.
- Los cuentos cortos introducen las canicas y las letras de la piedra antes de usarlas.
- Un bebé acompaña y observa mientras el protagonista realiza las tareas con herramientas.
- No hay errores de concordancia ni de contracciones, y no aparecen nombres repetidos.
- Las versiones cortas conservan el orden de las largas.
- Los identificadores y posiciones originales de todo el catálogo siguen siendo válidos; los accesorios opcionales no se fuerzan dentro de las tramas nuevas.
