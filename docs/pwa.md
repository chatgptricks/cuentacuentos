# PWA, efectos y música

La biblioteca se instala como PWA y permite leer sin conexión tras completar su primera descarga. El service worker generado por `scripts/build.mjs` precarga los módulos, atlas, efectos y música locales, verifica la instalación completa y mantiene una versión calculada del contenido. Una actualización conserva la biblioteca anterior hasta instalar la nueva. La app muestra si la biblioteca está preparada; perder conexión antes de completar la primera instalación no garantiza que todas las ilustraciones y sonidos estén disponibles.

En iPhone/iPad se instala desde Safari → Compartir → Añadir a pantalla de inicio. En Android se utiliza la opción de instalación de Chrome. La instalación depende de esa acción en el dispositivo.

## Efectos grabados

`src/sound-library.js` asigna una grabación física o instrumental a cada personaje, lugar y elemento, incluidos los identificadores de cuentos anteriores. Los animales con una vocalización disponible usan esa grabación; los demás usan foley apropiado y los personajes de fantasía usan instrumentos grabados. `src/audio.js` conserva la API y las preferencias originales, pero ya no genera sonidos mediante osciladores ni los utiliza como respaldo. Si un archivo falla o tarda demasiado, permanece en silencio.

Los originales CC0 del primer lote se documentan en [audio-sources.md](audio-sources.md). Las grabaciones adicionales, sus autores y licencias están en [sound-library-sources.md](sound-library-sources.md) y en `public/audio/LICENSES.md`, accesible desde los créditos de la app.

```js
import { unlockAudio, preloadSounds, playSound, stopSounds, setSoundEnabled } from './audio.js';
void preloadSounds(['owl', 'forest', 'bell', 'page']); // No reproduce ni desbloquea audio
await unlockAudio(); // Dentro de un gesto de la persona
await playSound('owl');
setSoundEnabled(false);
stopSounds();
```

La precarga solo prepara los sonidos del cuento, limita las cargas simultáneas a tres y espera como máximo 4,5 segundos. Cada descarga de efectos tiene un límite de cuatro segundos. Las grabaciones decodificadas se reutilizan. Tocar un mismo sonido muy rápido no lo apila; una nueva reproducción reemplaza suavemente la anterior, con un máximo de cuatro voces distintas. Silenciar, salir del cuento u ocultar la app invalida las reproducciones pendientes. Se mantiene `cuentacuentos:sound` como preferencia de efectos.

## Música instrumental

Cuatro pistas musicales grabadas sustituyen las composiciones de osciladores. Aventura usa *Castles in the Sky*, Acción *Childhood*, Relax y Mi familia *Luz de casa* (composición original con piano acústico grabado de Alexander Holm); Amigos usa *De tu lado* (otra composición original con ese piano). Las pistas locales de aproximadamente 83–96 segundos tienen una transición circular y se repiten mediante `AudioBufferSourceNode.loop`. Los créditos visibles incluyen autor, obra, licencia y cambios; fuentes y procesamiento en [music-sources.md](music-sources.md).

```js
import { unlockAudio, startAmbient, stopAmbient, setMusicEnabled } from './audio.js';
await unlockAudio();
startAmbient('adventure');
setMusicEnabled(false);
stopAmbient();
```

La música tiene una salida de volumen independiente y fundidos de entrada/salida. Descargar y decodificar una pista no obliga a reproducirla: el reproductor comprueba que el cuento siga abierto y la música activada antes de empezar. Se mantienen como máximo dos fragmentos decodificados para limitar memoria. La preferencia `cc-music-enabled` se conserva. Importar el módulo no descarga ni reproduce audio; se requiere un gesto de la persona para desbloquear el contexto.

## Presentación y efectos visuales

`page-composition.js` deriva un plan del cuento completo y alterna paisajes, retratos, objetos compartidos y detalles. Cerca de la mitad de las páginas muestra locación, con prioridad para la apertura y los cambios de lugar; una compra centrada en objetos puede conservar su primer plano. No cambia las escenas, texto o personajes del cuento guardado. `illustration-scale.js` establece tamaños relativos de cada especie y de los familiares; los atlas originales permanecen intactos. En el cuento, los humanos usan un marco ajustado que incluye todos los peinados, pies y sombra. Su tamaño se calcula a partir de la altura visible de la pintura: niños cerca de la mitad de esa altura, adultos mayores y bebés menores, con una unidad común que también respeta el ancho disponible. El editor y las portadas conservan su encuadre. Las ilustraciones se pueden tocar sin iconos superpuestos.

`scene-effects.js` genera niebla, luciérnagas, lluvia, nieve, reflejos, burbujas y luces sobre la pintura del escenario. La selección respeta el lugar y la frase; no llueve dentro de una casa. El canvas no captura pulsaciones, tiene resolución limitada y solo se dibuja en las hojas visibles, con un máximo de 30 fotogramas por segundo. Se pausa al ocultar la app y se desactiva con movimiento reducido. Salir del lector o reconstruirlo elimina la animación anterior.

## Comprobaciones

`npm test` incluye reproducción grabada para todo el catálogo, silencio ante fallos, límite de voces, independencia de música/efectos y cancelación de cargas pendientes. También comprueba tamaños relativos, composiciones, clima coherente y compatibilidad de cuentos guardados. FFmpeg/ffprobe verifican decodificación, duración y niveles. Esas verificaciones no sustituyen una evaluación subjetiva del sonido en el dispositivo.
