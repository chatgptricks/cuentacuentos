# Cuentacuentos

Una biblioteca infantil para leer juntos en el teléfono o el iPad, en español y pensada para edades de 3 a 7 años.

**App:** https://chatgptricks.github.io/cuentacuentos/

Cinco libros en un estante: Aventura, Acción, Relax, Amigos y **Mi familia**. Una persona adulta elige 3, 6 o 9 minutos y genera un cuento con su propia portada. Cada página tiene una oración corta y una ilustración que se compone según su acción: paisaje, presentación de personajes, objetos compartidos o un detalle. La lectura llena la pantalla; en iPad horizontal se muestran dos páginas con el lomo en el centro. Los controles flotan en los márgenes y las ilustraciones tienen sonidos al tocarlas.

## Catálogo y cuentos

- 76 personajes protagonistas: 56 animales (granja, noche y bichitos incluidos) y 20 de fantasía, con nombres, género gramatical, habilidades y sonidos
- 24 personajes secundarios (crías, vecinos y mascotas) y 16 villanos suaves: 116 retratos en total
- 76 escenarios con tres encuadres cada uno (228 vistas): naturaleza, pueblo, casa, caminos, guaridas y paisajes de sueño
- 116 elementos: exploración, creación, tesoros, hora de dormir, cocina, fiestas, búsquedas, juegos, recuerdos, primeras veces, calma, ruidos de la noche y herramientas
- 18, 36 o 54 páginas, según la duración elegida
- 43 estructuras de seis partes: 8 de Aventura, 8 de Acción, 9 de Relax, 8 de Amigos y 10 de Mi familia, con huecos para protagonista, amigo, consejero, villano, lugares, pruebas, regalos, elixires y objetivos
- Cada hueco se llena con un valor compatible: las habilidades del amigo resuelven pruebas posibles en ese terreno, el regalo se usa después de entregarse, cada villano tiene un motivo y una redención que responde a él, y cada página dibuja solo lo que nombra
- La app evita repetir la misma estructura en dos cuentos seguidos del mismo libro
- Detalles en [docs/story-structures.md](docs/story-structures.md)
- Cada plan conserva su reparto, objetivo y continuidad hasta el final

Desde **Conoce a los 116 personajes**, la biblioteca abre una galería con las pestañas **Animales (56)**, **Fantasía (20)**, **Crías (8)**, **Mascotas (8)**, **Vecinos (8)** y **Villanos (16)**. Cada ficha muestra su dibujo, nombre y tipo de personaje; al tocar el dibujo suena un efecto suave. Los sonidos usan grabaciones locales de animales, naturaleza, objetos e instrumentos; todos los personajes, lugares y elementos tienen una asignación y los efectos de fantasía también usan instrumentos grabados. Los clips se sirven localmente, funcionan sin conexión y tienen niveles y fundidos ajustados; la música mantiene su control independiente.

**Explora escenarios y elementos** abre otra galería con **Escenarios (76)** y **Elementos (116)**. Permite conocer todos los lugares y objetos, ver las tres vistas de cada lugar y escuchar su sonido al tocarlos. Los cuentos alternan páginas con escenario y páginas centradas en personajes u objetos: aproximadamente la mitad muestra la locación. Se conserva contexto en la apertura y al cambiar de lugar; los primeros planos usan el papel como fondo. Las acuarelas pueden mostrar niebla, luciérnagas, lluvia, nieve, reflejos o luces suaves generadas en vivo. El build mide la pintura visible de cada celda: el lector encuadra esa área con margen de acuarela, conserva su proporción y equilibra personajes, humanos y objetos sin modificar ningún PNG. Las figuras se alinean por su base, cada especie tiene una escala propia y los insectos se dibujan más pequeños que el ratón. Los objetos se agrupan alrededor de la acción entre los protagonistas, sin iconos de sonido superpuestos. Los 36 lugares originales alternan panorámica, media y cercana; los 40 nuevos alternan frontal, desde la izquierda y desde la derecha. La vista se conserva al reanudar un cuento. Los recursos nuevos amplían las historias: faroles y brújulas para explorar, cometas e instrumentos para jugar, materiales de dibujo y pequeños tesoros para descubrir o cuidar.

**Mi familia** convierte al niño o la niña en protagonista de actividades cotidianas y aventuras pequeñas con un familiar por cuento. Su creador permite elegir un nombre, seis peinados, seis prendas, cinco tonos de piel y ocho colores favoritos para la ropa. Todas las opciones están disponibles para todos los personajes. Se puede agregar o quitar a papá, mamá, un bebé, un hermano o hermana de edad parecida y un adolescente; cada uno usa el mismo creador, con proporciones acordes a su edad. Antes de generar, se elige un familiar o **Un familiar sorpresa**. La configuración completa se conserva, pero la historia usa solo al protagonista y esa compañía. Si no hay familiares configurados, se añade Dani, hermano o hermana.

Cada objetivo tiene vocabulario ligado a lo que sucede: los sustantivos, calificativos y acciones se eligen antes de escribir las frases. Los calificativos y nombres amplían la redacción; los objetivos, dificultades y soluciones aportan la variedad de trama. La app recuerda los últimos ocho planes de cada libro y busca evitar los tres objetivos más recientes y las combinaciones de bloques repetidas.

Los tiempos son aproximados e incluyen leer, mirar las ilustraciones y detenerse para jugar. Acción incluye la muerte tranquila de un personaje secundario anciano, una despedida explícita, la redención del villano y esperanza. La pantalla de preparación lo avisa a la persona adulta.

La generación es local y procedural: no usa un servicio de IA en cada lectura. Los cuentos, las ilustraciones y los sonidos funcionan sin conexión tras la primera carga completa. La app guarda la familia, el último cuento y la página de lectura en ese dispositivo. No hay cuentas ni un backend.

## Desarrollo

Necesita Node.js 22 o posterior. No hace falta instalar dependencias para ejecutar o compilar.

```sh
npm test
npm run build
npm run dev
```

La vista local está en http://localhost:4173/cuentacuentos/. `npm run build` valida las cuadrículas y la transparencia de los 53 atlas, incluidos los ocho villanos, los nueve atlas originales de encuadres y los 27 nuevos atlas de arte, comprueba que las ilustraciones nuevas no crucen los bordes de sus celdas, copia las fuentes y recursos a `dist` y crea un service worker con una versión calculada a partir del contenido. Los identificadores, archivos y posiciones de los atlas originales se conservan para mantener la compatibilidad de los cuentos guardados.

El lote adicional de `public/art/` contiene 40 lugares nuevos desde tres ángulos (120 vistas), 56 personajes y 80 objetos. Los lugares usan `places-views-10.png` a `places-views-19.png`: cada columna conserva un lugar, con las filas frontal, desde la izquierda y desde la derecha a una escala comparable. Los personajes y objetos usan atlas 4×2 en orden de izquierda a derecha y de arriba abajo. Todo este arte ya participa en las historias; [scripts/art-expansion.mjs](scripts/art-expansion.mjs) conserva el inventario de sus celdas y el build exige los 27 archivos y márgenes sin pigmento de alfa ≥32 en sus bordes de celda. [docs/art-prompts.md](docs/art-prompts.md) recoge el inventario completo y los prompts de generación.

**Siempre desplegar las mejoras solicitadas a producción**, tras pasar `npm test`, `npm run build` y la revisión visual. El usuario ya autorizó ese despliegue. El workflow [.github/workflows/pages.yml](.github/workflows/pages.yml) ejecuta las pruebas, compila y publica `dist` en GitHub Pages al subir cambios a `main`; también permite ejecución manual. Comprueba que termine correctamente y verifica la app publicada. Esta preferencia está recogida en [AGENTS.md](AGENTS.md).

## Archivos

- `src/character-catalog.js`: los 76 personajes protagonistas, sus nombres y el registro compartido de atlas
- `src/supporting-catalog.js`: crías, vecinos y mascotas que ocupan papeles secundarios
- `src/world-catalog.js`: los 76 escenarios y 116 elementos, posiciones de atlas, vistas, sonidos y compatibilidad narrativa
- `src/story-engine.js`: elige la estructura con semilla y monta el cuento
- `src/story-kit.js`: herramientas comunes de las estructuras: frases por niveles, reparto, pruebas y planes
- `src/structures-adventure.js`, `structures-action.js`, `structures-relax.js`, `structures-social.js` y `structures-family.js`: las 43 estructuras narrativas
- `src/narrative-world.js`: habilidades de cada personaje, terreno y pruebas de cada lugar, regalos y gramática compartida
- `src/quest-catalog.js`: elixires de Aventura, fiestas y objetos de Acción, villanos con su motivo y su redención, consejeros y hogares
- `src/villain-catalog.js`: los 16 villanos, sus atlas y el registro de arte pendiente
- `src/story-blocks.js`: actividades de Relax, Amigos y Mi familia, con sus complicaciones
- `src/story-language.js`: calificativos y acciones coherentes para cada actividad
- `src/story-selection.js`: selección de cuentos nuevos con un historial limitado de planes recientes
- `src/family-characters.js`: perfiles de la familia y dibujos humanos compuestos con SVG
- `src/family-story.js`: protagonista y un familiar por historia, conservando la configuración completa
- `src/app.js`: estante, preparación, portada, lectura y composición de ilustraciones
- `src/style.css`: interfaz pastel y libro a pantalla completa
- `src/scene-effects.js`: atmósferas vivas sobre las acuarelas visibles
- `src/page-composition.js`: composición según la acción de cada página
- `src/illustration-scale.js`: proporciones relativas de especies y familiares
- `src/sound-library.js` y `src/music-library.js`: grabaciones y atribuciones
- `src/art-layout.js`: encuadre de los atlas y proporciones visibles a partir de los límites calculados por el build
- `src/audio.js`: efectos grabados, precarga, mezcla y música instrumental local
- `public/art/`: atlas de acuarela generados, con transparencia
- `public/manifest.webmanifest` y `public/icons/`: instalación como PWA
- `scripts/build.mjs`: build y caché offline
- `scripts/verify-stories.mjs`: variedad, continuidad, gramática estructural y formato de páginas
- `scripts/verify-family.mjs`: todas las combinaciones de apariencia, familias posibles, nombres y recuperación de datos guardados
- `scripts/verify-selection.mjs`: ausencia de repetición inmediata, límites del historial y selección acotada

Los prompts exactos y la validación de las ilustraciones están en [docs/art-prompts.md](docs/art-prompts.md). Las estructuras están en [docs/story-structures.md](docs/story-structures.md), y los detalles de audio y PWA en [docs/pwa.md](docs/pwa.md).

## Instalar

En iPhone o iPad, abre la app en Safari, toca Compartir y luego **Añadir a pantalla de inicio**. En Android, abre el menú de Chrome y elige **Instalar aplicación** o **Añadir a pantalla de inicio**. [Guía de instalación de PWA de MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing).

## Atribuciones

El paso realista de páginas usa [StPageFlip 2.0.7](https://github.com/Nodlik/StPageFlip), incluido localmente bajo licencia MIT en `public/vendor/page-flip.LICENSE.txt`. Todas las acuarelas del catálogo se generaron para este proyecto con imagegen. Los personajes humanos usan dibujos SVG locales de capas reutilizables. La música utiliza fragmentos instrumentales de Scott Buckley, además de «Luz de casa» para Relax y Mi familia y «De tu lado» para Amigos, dos composiciones originales interpretadas digitalmente con muestras de piano acústico de Alexander Holm. La atribución y las licencias están disponibles en la app y en [docs/music-sources.md](docs/music-sources.md). Los efectos físicos e instrumentales proceden de BigSoundBank, Wikimedia Commons y Freesound, con sus respectivas licencias y cambios en [docs/audio-sources.md](docs/audio-sources.md), [docs/sound-library-sources.md](docs/sound-library-sources.md) y `public/audio/LICENSES.md`. Web Audio solo reproduce y mezcla las grabaciones; no hay osciladores de respaldo.
