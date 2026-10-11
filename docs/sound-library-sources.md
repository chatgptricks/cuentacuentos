# Biblioteca de sonidos grabados

Se añadieron **36 grabaciones físicas** (1,80 MiB de MP3) y se conservan las 31 anteriores. `src/sound-library.js` asigna grabaciones a todos los personajes, escenarios, objetos e identificadores de efectos anteriores; no contiene osciladores. El mapa usa `{ file, gain }`, con `file` relativo a `public/audio/` e incluyendo `.mp3`.

## Criterio de sonido

- Zorro, oso, lobo, elefante, león, cerdo, burro, cabra, ardilla, pingüino y pavo real tienen vocalizaciones físicas. La grabación del mono es una llamada de chimpancé; la del loro, una cacatúa ninfa: son representantes declarados del grupo, no afirmaciones sobre la especie exacta del dibujo.
- Conejos usan sus pisadas reales. Animales sin una vocalización representativa disponible usan movimiento asociado —agua, roce, alas o pisadas—. Se evita asignar el ronroneo de gato al león o el canto del petirrojo al pingüino y al loro.
- Los humanos usan pasos, ropa o su actividad: lápiz para la maestra, papel para el cartero, agua para el jardinero y el dentista, tren para el conductor.
- Los objetos silenciosos usan un sonido de material o de manejo. La mochila y el estuche usan cremallera; el tambor, djembé; la flauta, una flauta tocada y grabada; la caja de música, su mecanismo acústico. El reloj de cuco utiliza ahora un reloj mecánico real.
- La fantasía usa tres grabaciones diferentes de campanillas reales. El dragón usa fuego y las criaturas grandes usan pisadas o metal; no se imitan gruñidos mediante tonos electrónicos.

## Preparación y niveles

Los WAV/OGG originales y los MP3 públicos de calidad alta de Freesound se prepararon con FFmpeg. Cada corte conserva el evento y su cola; tiene un fundido de entrada de 20 ms y uno de salida de 80 ms. Se usa mono a 44,1 kHz y 160 kb/s, sin desplazamiento de tono ni velocidad. Objetivo de normalización: −20 LUFS, techo −3,5 dBTP antes de codificar. Para el impulso del cerdo inferior a 400 ms se usa RMS con límite de pico, porque la medida integrada no resulta válida.

Las grabaciones anteriores no se recodificaron. El mapa aplica una ganancia de hasta 1,58 (+4 dB) y reduce ligeramente los sonidos ambientales o metálicos. El volumen final depende de la salida de efectos del reproductor.

Las nuevas pistas se verificaron mediante decodificación completa y medición de señal, duración y picos. Esto confirma archivos válidos y evita recortes; no sustituye una audición subjetiva en los altavoces de teléfono/iPad.

## Atribuciones y modificaciones

La lista que acompaña el build está en [`public/audio/LICENSES.md`](../public/audio/LICENSES.md). Su tabla de nuevas grabaciones se reproduce a continuación para auditar fuentes, autor, licencia y recorte. Las licencias de cada adaptación se conservan como se indica; el código mantiene su propia licencia.

| Archivo distribuido | Sonido físico | Autor y fuente | Licencia | Fragmento (inicio + duración) |
|---|---|---|---|---|
| `sfx-bear.mp3` | Gruñido de oso grizzly comiendo | Nivatius / National Park Service · [ficha](https://freesound.org/people/Nivatius/sounds/519599/) · [audio fuente](https://cdn.freesound.org/previews/519/519599_7143328-hq.mp3) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 9.600 s + 3.200 s |
| `sfx-cloth.mp3` | Frotar una chaqueta de tejido sintético | Joseph SARDIN · [ficha](https://bigsoundbank.com/synthetic-coat-rubbed-s1104.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/1104.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 3.150 s + 2.200 s |
| `sfx-cuckoo.mp3` | Cuco mecánico de reloj de madera | Monkay · [ficha](https://freesound.org/people/Monkay/sounds/81971/) · [audio fuente](https://cdn.freesound.org/previews/81/81971_557478-hq.mp3) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.050 s + 2.500 s |
| `sfx-donkey.mp3` | Rebuzno de burro | Joseph SARDIN · [ficha](https://bigsoundbank.com/donkey-braying-1-s1549.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/1549.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.050 s + 3.800 s |
| `sfx-drum.mp3` | Golpe de mano en el borde de un djembé | Joseph SARDIN · [ficha](https://bigsoundbank.com/djembe-hand-on-the-edge-s0561.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0561.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 1.100 s |
| `sfx-elephant.mp3` | Barrito de elefante | தகவலுழவன் · [ficha](https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/4/40/Elephant_voice_-_trumpeting.ogg) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 1.439 s |
| `sfx-fantasy-chime.mp3` | Campanillas de atrapasueños | Joseph SARDIN · [ficha](https://bigsoundbank.com/chimes-dream-8-s2086.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/2086.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 2.585 s |
| `sfx-fantasy-sparkle.mp3` | Pequeñas campanillas decorativas | Joseph SARDIN · [ficha](https://bigsoundbank.com/chimes-butterfly-1-s2087.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/2087.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 2.076 s |
| `sfx-fantasy-sweep.mp3` | Campanillas reales movidas por el viento | Pierre SIBANARCO · [ficha](https://bigsoundbank.com/cluster-chimes-1-s2687.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/2687.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 174.500 s + 3.500 s |
| `sfx-fire.mp3` | Chasquidos de chimenea | Joseph SARDIN · [ficha](https://bigsoundbank.com/fireplace-5-s2857.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/2857.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 10.500 s + 3.100 s |
| `sfx-flute.mp3` | Nota de flauta real con vibrato | hellska · [ficha](https://freesound.org/people/hellska/sounds/328727/) · [audio fuente](https://cdn.freesound.org/previews/328/328727_113801-hq.mp3) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 4.730 s |
| `sfx-footsteps.mp3` | Pasos sobre parqué | Joseph SARDIN · [ficha](https://bigsoundbank.com/footsteps-shoe-on-parquet-s0376.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0376.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 11.150 s + 2.300 s |
| `sfx-fox.mp3` | Ladridos de zorro rojo | Aubrey John Williams / The British Library Board · [ficha](https://commons.wikimedia.org/wiki/File:Red_Fox_%28Vulpes_vulpes%29_%28W1CDR0001529_BD12%29.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/7/79/Red_Fox_%28Vulpes_vulpes%29_%28W1CDR0001529_BD12%29.ogg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 1.800 s + 2.000 s |
| `sfx-glass.mp3` | Dos vasos chocando suavemente | Joseph SARDIN · [ficha](https://bigsoundbank.com/cheers-table-glass-1-s1323.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/1323.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 0.428 s |
| `sfx-goat.mp3` | Balido de cabra | DenisChardonnet · [ficha](https://bigsoundbank.com/bleating-goat-1-s0279.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0279.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 1.153 s |
| `sfx-hoof.mp3` | Galope: foley físico de cascos | Joseph SARDIN · [ficha](https://bigsoundbank.com/horse-gallop-s0611.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0611.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.200 s + 2.300 s |
| `sfx-keys.mp3` | Llaves moviéndose en una mano | Joseph SARDIN · [ficha](https://bigsoundbank.com/keys-in-a-hand-s0445.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0445.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 18.400 s + 2.000 s |
| `sfx-lion.mp3` | Rugido de león | த*உழவன் · [ficha](https://commons.wikimedia.org/wiki/File:Lion_raring-sound1TamilNadu178.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/7/7d/Lion_raring-sound1TamilNadu178.ogg) | [Dominio público](https://commons.wikimedia.org/wiki/File:Lion_raring-sound1TamilNadu178.ogg) | 0.000 s + 3.000 s |
| `sfx-metal-chain.mp3` | Cadena metálica en movimiento | DenisChardonnet · [ficha](https://bigsoundbank.com/heavy-chain-s0359.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0359.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.050 s + 2.300 s |
| `sfx-monkey.mp3` | Llamada de chimpancé (primate representativo) | Pawel Fedurek et al. · [ficha](https://commons.wikimedia.org/wiki/File:Pant-hoot_call_made_by_a_male_chimpanzee.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/5/56/Pant-hoot_call_made_by_a_male_chimpanzee.ogg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 1.350 s + 3.800 s |
| `sfx-music-box.mp3` | Nota do de caja de música mecánica | Joseph SARDIN · [ficha](https://bigsoundbank.com/music-box-c-1-s1867.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/1867.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 3.100 s |
| `sfx-parrot.mp3` | Canto de cacatúa ninfa (familia de los loros) | Joseph SARDIN · [ficha](https://bigsoundbank.com/cockatiel-parakeet-1-s2769.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/2769.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 1.359 s |
| `sfx-peacock.mp3` | Llamada de pavo real | Ke4roh · [ficha](https://commons.wikimedia.org/wiki/File:Pavo_cristatus_%28call%29.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/0/05/Pavo_cristatus_%28call%29.ogg) | [Dominio público](https://commons.wikimedia.org/wiki/File:Pavo_cristatus_%28call%29.ogg) | 0.750 s + 2.600 s |
| `sfx-pencil.mp3` | Lápiz dibujando sobre papel | Joseph SARDIN · [ficha](https://bigsoundbank.com/pencil-s0221.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0221.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 7.900 s + 2.200 s |
| `sfx-penguin.mp3` | Llamadas de pingüino pequeño | Benchill · [ficha](https://commons.wikimedia.org/wiki/File:Little_Penguin_%28Eudyptula_minor%29.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/2/2c/Little_Penguin_%28Eudyptula_minor%29.ogg) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | 0.050 s + 3.000 s |
| `sfx-pig.mp3` | Oink de cerdo | Secretlondon · [ficha](https://commons.wikimedia.org/wiki/File:Mudchute_pig_1.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/7/73/Mudchute_pig_1.ogg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | 0.000 s + 0.359 s |
| `sfx-rabbit.mp3` | Pisadas y movimientos reales de conejos en su conejera | Joseph SARDIN · [ficha](https://bigsoundbank.com/bunny-hutch-s1376.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/1376.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 1.350 s + 3.000 s |
| `sfx-rope.mp3` | Fricción y manejo de cuerda | Joseph SARDIN · [ficha](https://bigsoundbank.com/rope-s0554.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0554.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 13.800 s + 2.500 s |
| `sfx-squirrel.mp3` | Llamadas de ardilla gris | Aubrey John Williams / The British Library Board · [ficha](https://commons.wikimedia.org/wiki/File:Grey_Squirrel_%28Sciurus_carolinensis%29_%28W1CDR0001470_BD12%29.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/d/d8/Grey_Squirrel_%28Sciurus_carolinensis%29_%28W1CDR0001470_BD12%29.ogg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 0.750 s + 2.500 s |
| `sfx-train.mp3` | Silbato real de tren | GlaneurDeSons · [ficha](https://bigsoundbank.com/whistling-train-1-s0225.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0225.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 3.800 s |
| `sfx-water-bubbles.mp3` | Burbujas de agua: foley con pajita en taza | Joseph SARDIN · [ficha](https://bigsoundbank.com/water-bubbles-s0150.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0150.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 5.100 s + 2.600 s |
| `sfx-water-pour.mp3` | Agua vertida en una taza | Joseph SARDIN · [ficha](https://bigsoundbank.com/cold-water-in-mug-s1156.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/1156.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.100 s + 4.000 s |
| `sfx-wings.mp3` | Paloma desplegando las alas | Joseph SARDIN · [ficha](https://bigsoundbank.com/flight-of-a-pigeon-s0840.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0840.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 2.200 s |
| `sfx-wolf.mp3` | Aullidos de lobo | U.S. Fish and Wildlife Service · [ficha](https://commons.wikimedia.org/wiki/File:Wolf_howls.ogg) · [audio fuente](https://upload.wikimedia.org/wikipedia/commons/8/87/Wolf_howls.ogg) | [Dominio público](https://commons.wikimedia.org/wiki/File:Wolf_howls.ogg) | 0.000 s + 4.800 s |
| `sfx-wood-tap.mp3` | Golpes con llamador en una puerta ligera | Joseph SARDIN · [ficha](https://bigsoundbank.com/knock-on-a-light-door-s0374.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0374.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 2.350 s + 3.650 s |
| `sfx-zipper.mp3` | Cremallera | DenisChardonnet · [ficha](https://bigsoundbank.com/zipper-2-s0270.html) · [audio fuente](https://bigsoundbank.com/UPLOAD/bwf-en/0270.wav) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 0.000 s + 0.906 s |

## Huellas de los archivos nuevos

```text
76a32939919e9d25ca3ab79c51213c198a8bfcccc0de761cb6bc828bee395b56  sfx-bear.mp3
1eb89e4cfaca14816b0a3763022ae46543dd1aace353d3ded9307d98880bd02d  sfx-cloth.mp3
d287a9787a8cc85bf122bc402b53f5bf21d144ec3944f2f9237e678f37217e0e  sfx-cuckoo.mp3
8d4593d12a67286986e97ff15174e0880fc1fdb6ad3f12f414625094e1528f50  sfx-donkey.mp3
1b2c08a29bd10429fd9eb9c7196c4a7bc019d538e5494253342523264ea10963  sfx-drum.mp3
9785b857376dcd1bc6f2c7f211c56f38f954759eacda4576f12f863adc5ab725  sfx-elephant.mp3
b2ef8c6fbdd53296fe7818e312e21770df5c139082342654e6026d9657e776d1  sfx-fantasy-chime.mp3
27db47e8a7859d92b80ffd06f3e8a9857abccb9c1b7ecf849fc9023a18310aa2  sfx-fantasy-sparkle.mp3
8667658984e9372a296e11a4d9c16d323ad407e240f28832f4b8398ed639436f  sfx-fantasy-sweep.mp3
b3aadb398afcc7c7ca636404f4eb97f4c14752f1cb889f2cc899ea2fe14303ae  sfx-fire.mp3
d7de7aec2644dbc461b2444daf25a72e73332e83c6ed3ae444eb06947ec644a6  sfx-flute.mp3
5343a5818b2d50e024b5804045de80aad090c12fd6a078b190c92aa3f426d3a0  sfx-footsteps.mp3
409d3c2f8ea65adf1338e989a912239847f9103b29bb42cb23a88727369df159  sfx-fox.mp3
8c7b5f04a1b2a24d951d2eea6d5d852247ba18c346270ba4f36eb3582eaa678a  sfx-glass.mp3
56a7d67f77c43bfcdd534ad0bc85a327913cbeb8209b686d202e6e19409f688c  sfx-goat.mp3
6a42399710a9c637e2bacf48350565f86ad31b93f74fdfe9c75b3509304019b7  sfx-hoof.mp3
55f2792cb1ae1b227aed15e1e4d0eb6037c0ccb71e226023e2390962d3acb64b  sfx-keys.mp3
af6221815d6d8f2050277ae5ddac075ced4cbbb960cb1e6db1b4441fadfa94e0  sfx-lion.mp3
3645bf3e1a0d08516121b6da3b72c4c68a3836464974689228703f6756ae3012  sfx-metal-chain.mp3
fea18ef32e833809e0dfcbb236a4e3258f9d493f9d223753c23c46bb7ab422ed  sfx-monkey.mp3
dcb0a610f7e3a0db75620c7fc281d19eda31bc0e67c98749e4e8d74f39a0b31f  sfx-music-box.mp3
6b770dde1994db4c86bd228d3fdf39bc0f36776fe85cca707897979f7e0282ec  sfx-parrot.mp3
3e79b4d2cb3e1850f725c17f364e6a464c41848ab939025e6903422c421b75d7  sfx-peacock.mp3
4d64e63d9ea2515563ab108195f6453fc23ae840591459091b81805c50ee4825  sfx-pencil.mp3
b6626727ae66b6eddacf51c418096123c5a401df2fed594ffb0205d9fa87238b  sfx-penguin.mp3
2bc283e8d76c0df2b5f2ab9fc915f0c552fdf3d2ed9166d68205e49dc1d37834  sfx-pig.mp3
727f2d7b787839899126ab9b1b10a71a7dd9b8686dac7c41a6ffab4a3f5f5da4  sfx-rabbit.mp3
79d35043a29aff177ca6e606443752065ba5f585f0a2d196d1bd93edc1952ef8  sfx-rope.mp3
8cd1a106a6783c7e6e5d7f2890d47fd8389b8140a6d8edc1f3e8b1fc44b993e7  sfx-squirrel.mp3
a5625da9df7330bd8e5ecc194ee9e93f4d1c2b2ce9e7740868b0ebfff63b6806  sfx-train.mp3
997f39d820b510314626d8afeb1974fd8a78522627422d8b9c586b5b13f1b587  sfx-water-bubbles.mp3
f80d4b6799e37b201760cabca55b1b755c482d23e4458540fed1c729e016fc8a  sfx-water-pour.mp3
d7b86e2e55023b684697a35e036f15f1e27653b6db86fba192b7dccfb58eeba8  sfx-wings.mp3
25889ae2df59f388b66f40ff4fa51c449aff39cc7ebae9bf24ee5bb10ff511a4  sfx-wolf.mp3
bfac8f65cb02cc47eef64f9bacde9971275617c521debb14e4d4ce0f54b8f6a0  sfx-wood-tap.mp3
1811e25b1a44846d939b0ee8e26341ba51686afeabbd648cef03e45f38ef1cfa  sfx-zipper.mp3
```
