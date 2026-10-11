# De tu lado — piano original para Amigos

`public/audio/music-friends-original.mp3` contiene **De tu lado**, una composición nueva para Cuentacuentos. Sus frases breves se contestan entre sí: una pregunta en el registro medio y una respuesta que cambia el final. El pulso es algo más juguetón que en Luz de casa, con descansos y sin un arpegio constante. No reutiliza Carefree ni otra canción de una biblioteca musical.

## Fuente y crédito

El instrumento es el mismo piano acústico real de [Salamander Grand Piano V3](https://github.com/sfzinstruments/SalamanderGrandPiano), grabado por **Alexander Holm** y publicado bajo [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). La procedencia y las catorce muestras suaves ya están documentadas en [Luz de casa](music-original-relax.md). Se usa el mismo commit `3382bf9496bba2486f5ab0de55a264d1dfc38404`, capas `v1` y `v2`, afinación de `Data/tune_ret.txt` y transposiciones de un semitono como máximo.

Crédito accesible desde la app:

> De tu lado — composición original para Cuentacuentos. Piano acústico: Salamander Grand Piano V3, Alexander Holm, CC BY 3.0. Muestras adaptadas, afinadas y mezcladas para esta composición

La secuencia se creó programando notas grabadas, sin osciladores, sintetizadores, ukelele, percusión ni voces. No representa una nueva interpretación grabada por un pianista.

## Partitura y ciclo

El renderer `scripts/render-friends-music.py` incluye 16 frases de dos compases a **80 bpm**, con 89 ataques distribuidos en **96 segundos**. Las preguntas y respuestas alternan ritmo, registro y final; el apoyo grave aparece solo en algunas frases. El registro va de Re3 a La4. Las pequeñas diferencias de momento y amplitud tienen semilla fija.

Las notas conservan su ataque y caída acústicos. La salida habitual dura 1,75 segundos; la última respuesta usa 2,8 segundos. La resonancia que supera el segundo 96 envuelve el comienzo del ciclo. Después de normalizar se aplican guardas de 8 ms en ambos extremos para evitar un clic producido por las ventanas del MP3, sin una pausa larga. No se añadió reverberación artificial.

| Dato | Valor |
| --- | --- |
| Duración / `loopEnd` | 96,0 s |
| `loopStart` | 0 |
| Formato | MP3, 160 kbps, estéreo, 32 kHz |
| Nivel integrado final | −24,91 LUFS |
| Pico real final | −8,43 dBTP |
| Rango de sonoridad | 5,30 LU |
| Tamaño | 1.921.725 bytes, aproximadamente 1,83 MiB |
| SHA-256 | `08aa7ea27dd375a5386832786f8a2944b95100c41ebbad0ffc9185df15a93232` |

## Reproducción del render

Con Python 3, NumPy, SciPy y FFmpeg, desde la carpeta real del proyecto:

```sh
python3 scripts/render-friends-music.py
```

El script importa únicamente fuente, notas de referencia y afinación de `render-relax-music.py`; no altera su partitura ni el MP3 de Luz de casa. Los samples se reutilizan desde `cuentacuentos-piano-samples` en el directorio temporal del sistema. El caché conserva `de-tu-lado-loop.wav` y `de-tu-lado-metadata.json`, incluyendo todos los eventos, URLs, hashes y mediciones. Puede elegirse otro caché con `--samples-dir /tmp/cuentacuentos-piano-samples`.

Se verificaron formato, duración, niveles y continuidad del ciclo. La valoración subjetiva del timbre requiere escuchar el resultado.
