# Música instrumental de Cuentacuentos

Cuatro grabaciones musicales compuestas y publicadas por sus autores reemplazan la música generada mediante osciladores. Los fragmentos se eligieron para acompañar la lectura: piano y cuerdas para Aventura y Acción, piano ambiental para Relax, y ukelele con guitarra para Amigos. Mi familia comparte la pista tranquila de Relax.

## Fuentes y atribución

Fuentes oficiales y licencias verificadas el 11 de octubre de 2026. Todas las pistas están publicadas bajo [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/), que permite copiar y adaptar con atribución, enlace a la licencia e indicación de los cambios.

| Uso | Archivo | Obra y autor | Fuente oficial |
| --- | --- | --- | --- |
| Aventura | `public/audio/music-adventure.mp3` | Castles in the Sky — Scott Buckley | [Ficha y licencia](https://www.scottbuckley.com.au/library/castles-in-the-sky/) · [MP3 original](https://www.scottbuckley.com.au/library/wp-content/uploads/2021/11/sb_castlesinthesky.mp3) |
| Acción | `public/audio/music-action.mp3` | Childhood — Scott Buckley | [Ficha y licencia](https://www.scottbuckley.com.au/library/childhood/) · [MP3 original](https://www.scottbuckley.com.au/library/wp-content/uploads/2019/01/sb_childhood.mp3) |
| Relax / Mi familia | `public/audio/music-relax.mp3` | Reverie — Scott Buckley | [Ficha y licencia](https://www.scottbuckley.com.au/library/reverie/) · [MP3 original](https://www.scottbuckley.com.au/library/wp-content/uploads/2020/03/sb_reverie.mp3) |
| Amigos | `public/audio/music-friends.mp3` | Carefree — Kevin MacLeod | [Ficha y licencia](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037) · [MP3 original](https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3) |

Créditos que deben conservarse y estar disponibles desde la app:

- “Castles in the Sky” by Scott Buckley — released under CC-BY 4.0. [www.scottbuckley.com.au](https://www.scottbuckley.com.au/library/castles-in-the-sky/)
- “Childhood” by Scott Buckley — released under CC-BY 4.0. [www.scottbuckley.com.au](https://www.scottbuckley.com.au/library/childhood/)
- “Reverie” by Scott Buckley — released under CC-BY 4.0. [www.scottbuckley.com.au](https://www.scottbuckley.com.au/library/reverie/)
- “Carefree” Kevin MacLeod ([incompetech.com](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037)). Licensed under Creative Commons: By Attribution 4.0 License
- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Fragmentos recortados, normalizados y adaptados para repetición

Scott Buckley confirma expresamente la adaptación y el uso en [Using This Music](https://www.scottbuckley.com.au/library/using-this-music/) y contempla apps y música de fondo web en su [página de licencias](https://www.scottbuckley.com.au/library/licensing/). Estas grabaciones acompañan cuentos e ilustraciones; no se presentan como un servicio de distribución musical. No deben enviarse a servicios de identificación automática como Content ID ni redistribuirse mediante plataformas de música. La atribución de Kevin MacLeod se verificó en la ficha oficial y en el [catálogo oficial](https://incompetech.com/music/royalty-free/pieces.json), ISRC `USUAN1400037`. FreePD ya está cerrado, por lo que no se utilizó como fuente.

## Preparación de los fragmentos

Los MP3 originales se descargaron directamente desde los dominios de los autores. No hay voces ni pistas creadas mediante síntesis adicional. Las fichas oficiales describen piano, cuerdas y vibráfono en Scott Buckley; Carefree incluye ukelele, guitarra, marimba, glockenspiel y percusión ligera.

Los originales se decodificaron a PCM estéreo de 32 kHz. Se compararon perfiles armónicos y niveles de los extremos de fragmentos de 85–90 segundos, evitando entradas casi silenciosas. Los últimos 2,5 segundos de cada fragmento se mezclaron con los primeros 2,5 mediante una transición de potencia constante. El archivo empieza inmediatamente después del tramo inicial mezclado; así, el final enlaza con ese mismo punto al repetirlo. Un fundido de 8 ms en cada extremo elimina saltos de muestra sin introducir una pausa perceptible. El reproductor debe hacer su propia entrada y salida gradual al encender o apagar la música.

FFmpeg realizó normalización EBU R128 en dos pasadas, objetivo −23 LUFS, máximo −3 dBTP y LRA 9, seguida de codificación MP3 a 160 kbps estéreo y 32 kHz. El máximo es un límite, no un pico que haya que alcanzar. La medición final después de codificar queda aproximadamente en −23,4 LUFS. No se añadieron compresión agresiva, cambios de tono ni una nueva instrumentación.

| Archivo | Intervalo original | Transición circular | Duración / `loopEnd` | LUFS finales | Pico real final |
| --- | --- | --- | --- | --- | --- |
| `music-adventure.mp3` | 34,0–119,0 s | 2,5 s | 82,5 s | −23,44 | −9,59 dBTP |
| `music-action.mp3` | 8,5–93,5 s | 2,5 s | 82,5 s | −23,44 | −9,48 dBTP |
| `music-relax.mp3` | 23,5–111,0 s | 2,5 s | 85,0 s | −23,45 | −9,97 dBTP |
| `music-friends.mp3` | 20,5–105,5 s | 2,5 s | 82,5 s | −23,44 | −8,64 dBTP |

`loopStart` es `0` en las cuatro pistas. FFprobe y la decodificación PCM confirman estas duraciones sin silencios añadidos. Los cuatro archivos ocupan 6.657.300 bytes en conjunto, aproximadamente 6,35 MiB; cada pista requiere unos 20–21 MiB al decodificarla a estéreo de 32 kHz y flotantes de 32 bits. Conviene mantener decodificada solo la pista activa.

## Verificación y alcance

Se verificaron la correcta decodificación, estéreo, frecuencia, tasa de bits, duración, nivel integrado y picos de los archivos finales. La selección se apoyó en las descripciones de los autores y el análisis armónico y de nivel. No se dispuso de una escucha humana durante la preparación; la evaluación subjetiva del timbre y la transición debe hacerse reproduciendo la app o estos archivos.

SHA-256 de los archivos finales:

```text
14126b438cb00823d5367138a74c7ffc000f90f52a164e0ae62b3947f8e4b2b4  music-adventure.mp3
cdc539d6552d44e1de03e150f82862f73f2dc46b5031cad323e347bf5cd7cfbd  music-action.mp3
d5b18d51a6c42c21bab7d5911359a1fdca0ca33140ecd599c155e76a13b32b81  music-relax.mp3
beb8951a6ce23bd1e3e77ebf79ff3ec8d25d06a5f3eb804e5b400d6dcb6bb9ca  music-friends.mp3
```
