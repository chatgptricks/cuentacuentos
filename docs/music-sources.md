# Música de Cuentacuentos

Relax y Mi familia usan **Luz de casa**; Amigos usa **De tu lado**. Ambas son composiciones creadas para la app con muestras de piano acústico real. Sustituyen a Reverie y Carefree; sus melodías y arreglos anteriores no se reutilizan. Aventura y Acción conservan sus pistas instrumentales.

## Composiciones originales

| Libro | Obra | Archivo | Partitura, fuentes y proceso |
| --- | --- | --- | --- |
| Relax y Mi familia | Luz de casa | `music-relax-original.mp3` | [music-original-relax.md](music-original-relax.md) |
| Amigos | De tu lado | `music-friends-original.mp3` | [music-original-friends.md](music-original-friends.md) |

- Composición y arreglo: Cuentacuentos; interpretación digital mediante notas grabadas
- Instrumento: **Salamander Grand Piano v3**, de **Alexander Holm**, piano acústico Yamaha C5
- Fuente del instrumento: [repositorio sfzinstruments](https://github.com/sfzinstruments/SalamanderGrandPiano), revisión `3382bf9496bba2486f5ab0de55a264d1dfc38404`
- Licencia de las muestras: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
- Las notas se distribuyen en nuevas secuencias, con dinámica, afinación, mezcla y repetición preparadas para esta app. No se distribuye el instrumento completo

Luz de casa deja espacios amplios entre notas; De tu lado usa frases cortas que se responden. Las pistas usan nombres de archivo nuevos para que la biblioteca no confunda el audio anterior con el nuevo. Relax y Mi familia comparten el mismo buffer; los cuentos y las preferencias guardadas no se modifican.

## Otras pistas instrumentales

Las siguientes grabaciones están bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Los créditos visibles enlazan la obra, autor, licencia e indican que los fragmentos se recortaron, normalizaron y adaptaron para repetición.

| Libro | Archivo | Obra y autor | Fuente oficial |
| --- | --- | --- | --- |
| Aventura | `music-adventure.mp3` | Castles in the Sky — Scott Buckley | [Ficha](https://www.scottbuckley.com.au/library/castles-in-the-sky/) · [Original](https://www.scottbuckley.com.au/library/wp-content/uploads/2021/11/sb_castlesinthesky.mp3) |
| Acción | `music-action.mp3` | Childhood — Scott Buckley | [Ficha](https://www.scottbuckley.com.au/library/childhood/) · [Original](https://www.scottbuckley.com.au/library/wp-content/uploads/2019/01/sb_childhood.mp3) |

Créditos:

- “Castles in the Sky” by Scott Buckley — released under CC-BY 4.0. www.scottbuckley.com.au
- “Childhood” by Scott Buckley — released under CC-BY 4.0. www.scottbuckley.com.au
- Fragmentos recortados, normalizados y adaptados para repetición

Las dos pistas conservadas son estéreo de 32 kHz a 160 kb/s y duran 82,5 segundos. Sus últimos 2,5 segundos se mezclaron con el inicio para formar una transición circular. FFmpeg realizó normalización en dos pasadas a −23 LUFS, máximo −3 dBTP y LRA 9; el resultado codificado está cerca de −23,4 LUFS.

| Archivo | Intervalo original | Duración | LUFS finales | Pico real |
| --- | --- | --- | --- | --- |
| `music-adventure.mp3` | 34,0–119,0 s | 82,5 s | −23,44 | −9,59 dBTP |
| `music-action.mp3` | 8,5–93,5 s | 82,5 s | −23,44 | −9,48 dBTP |

Scott Buckley documenta el uso en apps y adaptaciones en [Using This Music](https://www.scottbuckley.com.au/library/using-this-music/) y [Licensing](https://www.scottbuckley.com.au/library/licensing/). No se presentan estas pistas como un servicio de distribución musical.

## Reproducción y verificación

`AudioBufferSourceNode.loop` repite los buffers completos; cada inicio y parada tiene un fundido. El reproductor mantiene la salida de música separada de los efectos y retiene como máximo dos pistas decodificadas. El módulo no descarga ni reproduce audio al importarse: requiere el gesto de la persona para desbloquear Web Audio.

FFmpeg/ffprobe comprueban decodificación, duración y niveles. Las pruebas comprueban la reutilización de la pista tranquila en Mi familia y que silenciar, salir o cancelar una descarga no provoque música tardía. Las mediciones técnicas no certifican el gusto musical; las pistas se ofrecen para escuchar en la app y como archivos locales.
