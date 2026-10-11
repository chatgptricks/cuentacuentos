# PWA y sonidos

La interfaz y el lector están pensados para teléfono. `orientation: any` permite
leer el libro en horizontal cuando se utiliza una tableta.

## Instalación y uso sin conexión

- Enlazar `./manifest.webmanifest` desde el HTML.
- Usar `./icons/apple-touch-icon.png` para `rel="apple-touch-icon"` (180 × 180).
- Añadir `apple-mobile-web-app-capable=yes`,
  `apple-mobile-web-app-status-bar-style=default`,
  `apple-mobile-web-app-title=Cuentacuentos` y `theme-color=#f6efe5`.
- Servir por HTTPS o `localhost`; registrar el service worker con una URL relativa
  al despliegue y una ruta de alcance correspondiente.
- Precachear el HTML, CSS, módulos, manifiesto, iconos y todas las ilustraciones
  para que generar y leer cuentos funcione sin conexión después de la primera
  carga. La generación y el audio no requieren peticiones externas.
- Generar una nueva versión del caché cuando cambien archivos y eliminar los
  cachés anteriores durante `activate`. Un fallo en una ilustración no debe
  dejar un service worker instalado con un precaché incompleto.

En iPhone/iPad, abrir el sitio en Safari y utilizar Compartir → Añadir a pantalla
de inicio. La instalación requiere esa acción de la persona que usa el teléfono.

## Efectos de sonido

`src/audio.js` reproduce 31 grabaciones locales CC0 para sonidos reconocibles:
animales, bosque, viento, agua, páginas, hojas, puertas, campanas y relojes.
Los MP3 breves ocupan 1.16 MiB en conjunto; sus fuentes, autores, licencias y
preparación están en [audio-sources.md](audio-sources.md). Los efectos de
fantasía siguen siendo sintetizados. No se reproduce audio al cargar el app.

```js
import { unlockAudio, preloadSounds, playSound, setSoundEnabled, getSoundEnabled, stopSounds } from './audio.js';

// Al preparar o reanudar el cuento: sólo los ids que aparecen en él.
// La precarga no crea/reanuda AudioContext ni reproduce audio.
void preloadSounds(['owl', 'forest', 'bell', 'page']);

// Dentro del gesto de abrir/generar el libro (compatible con Safari en iOS).
await unlockAudio();

// Dentro del gesto de tocar una ilustración.
await playSound('mouse');

// El estado del control de sonido se recuerda en este dispositivo.
setSoundEnabled(!getSoundEnabled());

// Al cerrar el lector o cambiar de cuento.
stopSounds();
```

Identificadores de personajes: `fox`, `mouse`, `rabbit`, `bear`, `knight`,
`wizard`, `dragon`, `owl`, `squirrel`, `frog`, `turtle` y `fairy`.

Los lugares usan `forest`, `castle`, `lake`, `garden`, `beach`, `mountain`,
`treehouse`, `village`, `meadow`, `cave`, `river` y `clouds`.
`page` es una página real al pasarla. Los identificadores originales de
personajes, lugares y objetos siguen funcionando, incluidos los de cuentos
guardados. `SOUND_RECORDINGS` resuelve grabaciones concretas antes de aplicar
los alias compartidos: por ejemplo, vaca, oveja, perro, abeja y grillo tienen
su grabación propia. Los ids sin grabación mantienen su efecto sintetizado.

`preloadSounds(ids)` reutiliza datos y audio decodificado, limita las cargas
simultáneas a tres y devuelve tras un máximo de 4.5 segundos. Cada solicitud
de archivo se cancela si supera cuatro segundos. La app prepara sólo los
sonidos del cuento y `page`; no descarga todo el catálogo al abrir la biblioteca.
Los archivos se sirven desde `./audio/`, sin peticiones a servicios externos
durante la lectura, y el build los incluye automáticamente en el precaché del
service worker para uso sin conexión después de la primera carga completa.

Si un clip no carga, no decodifica o tarda más de 700 ms al tocar una ilustración,
`playSound()` usa el respaldo sintetizado. Cuando la carga termina tarde no se
reproduce un segundo sonido. El lector no depende de que la precarga tenga éxito.

El módulo limita la ganancia y los efectos simultáneos a cuatro, ignora repeticiones muy
rápidas, detiene los sonidos al ocultar el app y funciona silenciosamente si
el navegador no admite Web Audio. El control visual de silencio debe mostrar
el estado persistido y exponer `aria-pressed` y un nombre accesible.
Silenciar, salir del lector u ocultar la app cancela también las reproducciones
que todavía estén esperando un archivo. La preferencia de efectos se conserva
en `cuentacuentos:sound`.

`node scripts/verify-audio.mjs` verifica precarga sin reproducción, caché,
grabaciones, respaldo, límite de voces, cancelación de cargas pendientes y
preferencias independientes. Los 31 MP3 también se verificaron con FFmpeg y
ffprobe: decodificación, duración, canales, tamaño y picos sin recorte. No se
realizó una audición subjetiva porque el entorno del agente no admite entrada de audio.

## Música de los libros

El módulo también incluye cuatro composiciones originales sintetizadas de
dieciséis compases. Sus bucles duran entre 40 y 57 segundos, con melodía,
acompañamiento y progresiones armónicas propias:

- `adventure`: flauta suave y kalimba, melodía pentatónica, 80 pulsos por minuto
- `action`: cuerdas suaves y pulsos graves en re menor, 76 pulsos por minuto
- `relax`: acordes cálidos y campanillas espaciadas, 68 pulsos por minuto
- `friends`: notas pulsadas, ritmo ligero y armonía mayor, 96 pulsos por minuto

El libro `family` comparte la composición tranquila de `relax`. La música
conserva sus composiciones originales y no carga grabaciones externas.

```js
import { unlockAudio, startAmbient, stopAmbient, getMusicEnabled, setMusicEnabled } from './audio.js';

// Abrir o generar el cuento: ejecutar desde el gesto de la persona.
await unlockAudio();
startAmbient('adventure');

// El control de música es independiente del control de efectos.
setMusicEnabled(!getMusicEnabled());
if (getMusicEnabled()) {
  await unlockAudio();
  startAmbient('adventure');
}

// Al cerrar el lector o abrir otra pantalla.
stopAmbient();
```

La música empieza y termina con un fundido, conserva un volumen de fondo bajo
y programa sus notas con anticipación para unir los compases sin cortes. El
estado se guarda como `cc-music-enabled`; por defecto está activado. Guardar
esa preferencia no inicia audio: primero se necesita el gesto y `unlockAudio()`.

`stopSounds()` detiene únicamente los efectos; `stopAmbient()` detiene únicamente
la música. Silenciar efectos permite seguir oyendo la música y viceversa. Al
ocultar el app, ambos se detienen. La interfaz puede volver a llamar a
`startAmbient(bookId)` al recuperar visibilidad si todavía hay un cuento abierto,
la música está activada y el contexto sigue en ejecución; si Safari lo suspendió,
el próximo gesto debe llamar a `unlockAudio()` antes de reanudar.
