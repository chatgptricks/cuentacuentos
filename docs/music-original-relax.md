# Luz de casa — piano original para Relax

`public/audio/music-relax-original.mp3` es una composición nueva para Cuentacuentos, creada como acompañamiento discreto de la lectura. La secuencia y sus variaciones se escribieron para este proyecto; no se recortó ni se reutilizó una canción de una biblioteca musical.

El sonido procede de grabaciones de un piano acústico real. El render no utiliza osciladores, percusión, voces, caja de música ni capas de sintetizador. El título de la composición es **Luz de casa**.

## Instrumento, fuente y licencia

Se utilizó [Salamander Grand Piano V3](https://github.com/sfzinstruments/SalamanderGrandPiano), de **Alexander Holm**: muestras de un Yamaha C5, grabadas a 48 kHz y 24 bits, con dos micrófonos AKG C414. El [README oficial](https://github.com/sfzinstruments/SalamanderGrandPiano/blob/master/README.md) identifica al autor y el proceso de grabación; la [licencia del repositorio](https://github.com/sfzinstruments/SalamanderGrandPiano/blob/master/LICENSE) es [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/). Se permiten las adaptaciones conservando atribución, referencia a la licencia e indicación de los cambios.

El paquete original también está referenciado por los mantenedores en [Internet Archive](https://archive.org/details/SalamanderGrandPianoV3). El render toma directamente FLAC individuales del repositorio del instrumento, sin descargar el paquete completo.

Versión fijada para reproducibilidad: commit `3382bf9496bba2486f5ab0de55a264d1dfc38404`. Se utilizan las notas `D#3`, `F#3`, `A3`, `C4`, `D#4`, `F#4` y `A4`, en las capas suaves `v1` y `v2`: catorce archivos, aproximadamente 19 MB. Cada grabación conserva entre 12 y 15 segundos de resonancia natural. Las notas intermedias se obtienen con transposiciones de un semitono como máximo; las pequeñas correcciones de afinación siguen `Data/tune_ret.txt`, atribuido por el paquete a Markus Fiedler. El empaquetado y mapeo SFZ del repositorio son de kinwie.

Crédito que debe permanecer accesible desde la app:

> Luz de casa — composición original para Cuentacuentos. Piano acústico: Salamander Grand Piano V3, Alexander Holm, CC BY 3.0. Muestras adaptadas, afinadas y mezcladas para esta composición

Enlazar **Salamander Grand Piano V3** con su repositorio y **CC BY 3.0** con la licencia anterior. La composición se realizó mediante programación de notas grabadas; no representa una interpretación nueva grabada por un pianista.

## Composición y tratamiento

La pieza dura **88 segundos** y tiene 39 ataques, aproximadamente uno cada 2,3 segundos. El pulso de referencia es 60 bpm. Los acordes son variaciones de Re mayor, Si menor, Sol mayor y La con novena, con inversiones y cambios pequeños de registro. No hay un arpegio constante: cada frase incluye espacios para respirar y finales diferentes. El registro va de Re3 a Sol4.

Se alternan las dos capas suaves, con diferencias pequeñas y deterministas en momento y amplitud. Las grabaciones mantienen su ataque y su caída natural. El levantamiento de pedal se representa con una salida gradual de 2,2 segundos; la última frase usa 3,3 segundos. No se añadió reverberación artificial ni se igualó el volumen de cada nota por separado.

Las resonancias que sobrepasan el segundo 88 se suman al inicio del ciclo. Esto conserva las colas reales al repetir, sin cortar la última nota ni introducir una pausa mediante un fundido largo. Después de normalizar se protege el borde con un fundido de solo 8 ms, para evitar una discontinuidad causada por las ventanas de codificación del MP3. El reproductor realiza su propia entrada y salida de volumen cuando la persona enciende o apaga la música.

La mezcla completa se mide y ajusta con EBU R128, objetivo −24,5 LUFS y límite −8 dBTP. Se permite el ajuste de picos necesario para mantener ese techo; no se busca eliminar la dinámica del piano. Medición del MP3 final:

| Dato | Valor |
| --- | --- |
| Duración y `loopEnd` | 88,0 s |
| `loopStart` | 0 |
| Codificación | MP3, 160 kbps, estéreo, 32 kHz |
| Nivel integrado | −25,20 LUFS |
| Pico real | −8,43 dBTP |
| Rango de sonoridad | 9,30 LU |
| Tamaño | 1.761.885 bytes, aproximadamente 1,68 MiB |
| SHA-256 | `a4153cb71f390dd9624440a67352f852d283d87afde0d9ab9203e376dfbac6f6` |

## Render reproducible

El programa `scripts/render-relax-music.py` contiene la partitura, capas, afinación, tiempos, amplitudes, salidas y semilla fija. Requiere Python 3, NumPy, SciPy y FFmpeg. No utiliza un servicio de generación musical.

Desde la carpeta real del proyecto:

```sh
python3 scripts/render-relax-music.py
```

Los samples se guardan en el directorio temporal del sistema, dentro de `cuentacuentos-piano-samples`; en macOS puede estar bajo `/var/folders`. Si aún no existen, se descargan desde la versión fijada del repositorio. No se incluyen catorce grabaciones completas dentro de la PWA. Para utilizar un caché concreto:

```sh
python3 scripts/render-relax-music.py --samples-dir /tmp/cuentacuentos-piano-samples
```

El caché conserva `luz-de-casa-loop.wav` y `luz-de-casa-metadata.json`, con la lista de eventos, URLs de cada sample, SHA-256, duración y mediciones. Solo el MP3 terminado se distribuye con la aplicación. Se verificaron decodificación, duración, formato, nivel y continuidad del ciclo; la valoración subjetiva del timbre debe hacerse escuchando el resultado.
