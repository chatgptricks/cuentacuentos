# Prompts de ilustración — Cuentacuentos

Generados con el `image_gen` integrado, con `transparent_background: true`. Los PNG finales conservan el alfa del generador y se usan directamente como atlas CSS, sin recortes ni composición posterior.

Validación: `characters.png` mide 1774 × 887 px (RGBA, proporción 2:1), con 57.02% de píxeles completamente transparentes. `places.png` mide 1254 × 1254 px (RGBA), con 36.08% completamente transparentes. Todos los sujetos están dentro de sus celdas; no hay píxeles de alfa >32 en los tres píxeles que delimitan cada celda. No se realizó ningún recorte, escalado o modificación de píxeles.

Uso CSS: personajes con `background-size: 400% 200%`, posición X `0%`, `33.3333%`, `66.6667%`, `100%` y Y `0%`, `100%`; lugares con `background-size: 200% 200%`, X e Y `0%`, `100%`. El contenedor de cada sprite tiene proporción 1:1.

## Personajes — `public/art/characters.png`

Cuadrícula: 4 columnas × 2 filas. Orden: zorro, ratón, conejo, oso; caballero, mago, dragón, búho.

```text
Use case: illustration-story
Asset type: production sprite atlas for a mobile children's storybook, ages 3–7.
Primary request: one precisely aligned 4-column × 2-row sprite atlas containing EIGHT distinct full-body watercolor characters. Wide landscape canvas, ideally aspect ratio 2:1. Four columns and two rows form eight exactly equal rectangular cells; no actual grid lines. Character centers must be exactly the centers of their cells: horizontal centers at 12.5%, 37.5%, 62.5%, 87.5% of canvas width, and vertical centers at 25% and 75% of canvas height. Each figure fits well inside its assigned cell with at least 15% cell margin around it. Characters must have consistent visual scale and appear separately, with no contact or overlap.
Subjects, exact reading order, left to right:
Top row: (1) a cute anthropomorphic fox in a sage green scarf; (2) a tiny friendly anthropomorphic mouse in a dusty mauve vest; (3) an anthropomorphic rabbit in cream overalls; (4) a gentle anthropomorphic bear in a dusty rose cardigan.
Bottom row: (5) a kind little human knight, rounded helmet, friendly face visible, small harmless shield; (6) a kind small human wizard in a lavender robe, gentle face, simple wooden staff; (7) a friendly tiny mint green dragon with rounded snout, little wings, smiling face; (8) a wise friendly owl.
Style/medium: traditional delicate children's book watercolor, muted real watercolor pigments with soft irregular pigment edges and subtle fine watercolor paper grain within the painted figures. Minimal elegant hand-painted illustration. Warm, gentle, charming expressions. Front or subtle three-quarter poses, feet visible.
Color palette: pastel sage, muted lavender, dusty peach, warm cream, pale blue; natural fox russet and mouse gray.
Scene/backdrop: genuinely transparent background, transparent negative space between all figures, isolated cutouts. No scenery, floor, frames or backdrop. No baked white or checkerboard backdrop. Do not paint any shadows beyond a figure's own feet.
Text: none.
Constraints: exact uniform 4×2 grid and exact subject order; all painting pixels stay inside their cell with generous margins. No duplicate characters, no typography, no cell lines, no harsh outlines, no plastic shiny surfaces, no 3D, no vector-flat style. Preserve real alpha transparency.
```

## Lugares — `public/art/places.png`

Cuadrícula: 2 columnas × 2 filas. Orden: bosque, castillo; lago nocturno, jardín.

```text
Use case: illustration-story
Asset type: production environment sprite atlas for a mobile watercolor children's storybook, ages 3–7.
Primary request: one precise 2-column × 2-row atlas of FOUR separate minimal watercolor landscape vignettes. Square canvas divided into four exactly equal square cells, with no visible dividing lines. Place each landscape entirely inside its own cell, horizontally and vertically centered. Vignette centers at (25%,25%), (75%,25%), (25%,75%), (75%,75%). Keep at least 10% cell margin on all sides; watercolor pigment must never cross into another cell.
Subjects, exact reading order:
Top left: softly enchanted forest with a curving path, rounded mossy trees, gentle pale green foliage and a few tiny flowers.
Top right: gentle distant fairy-tale castle with rounded friendly towers, peaceful meadow, and a path; warm cream, lavender, sage, peach.
Bottom left: calm moonlit lake, soft reeds at edge, simple crescent moon and sparse stars, serene pale blue and lavender night sky.
Bottom right: sunny garden with soft flowers, small shrubs and an inviting open grassy picnic patch, warm pastel yellow, peach, sage.
Style/medium: delicate real watercolor children's picture-book illustration, minimal hand-painted landscapes, soft pigment bleeds, subtle watercolor paper texture only within painted areas. Each landscape is its own softly feathered-edge watercolor island of paint; painted sky and ground gently dissolve into genuine alpha transparency around the vignette.
Composition/framing: Each vignette occupies approximately the central 75–80% of its cell, consistent visual scale. Quiet empty center spaces for a foreground character later in the app. Landscape scenes with softly irregular oval feathered bounds and generous breathing room.
Mood: warm, secure, magical and tender. Keep night scene gentle and friendly.
Scene/backdrop: FULLY TRANSPARENT outside the four vignettes and in gaps between them. True alpha channel, not a white sheet or checkerboard simulation.
Text: none.
Constraints: Exact uniform 2×2 placement and subject order; no characters, no animals, no people, no typography, no frames, no visible cell borders, no overlapping scenery, no scenery beyond cell boundaries, no photorealism, no 3D, no harsh outlines.
```

## Objetos — `public/art/objects.png`

Cuadrícula: 4 columnas × 3 filas, proporción del atlas 4:3 y celdas cuadradas. Orden: semilla mágica, campana lunar, gota de agua, pluma de lluvia; llave de cristal, paraguas amarillo, nube, ovillo; manta, cesta, flor rosa, barquito de papel. Las viñetas pequeñas acompañan una frase del cuento y admiten un sonido al tocarlas.

```text
Use case: illustration-story
Asset type: production mini-object sprite atlas for a mobile children's watercolor storybook, ages 3–7.
Primary request: one single 4-column × 3-row atlas with TWELVE separate watercolor story objects. Wide landscape canvas in EXACT aspect ratio 4:3, so all twelve cells are square. The canvas is divided into four exactly equal columns and three exactly equal rows with NO visible dividing lines. Each object is isolated, fully contained within its own cell, with generous transparent margins of at least 20% cell width and height. All object centers must be the exact centers of their assigned cells. Horizontal centers: 12.5%, 37.5%, 62.5%, 87.5% of canvas width. Vertical centers: 16.6667%, 50%, 83.3333% of canvas height. Consistent gentle visual scale, simple readable silhouettes, no contact or overlap.

Subjects, exact reading order:
Top row, left to right:
1. A golden magical seed, small oval golden seed with a tiny soft warm glimmer
2. A small silver moon bell, a simple friendly silver handbell with subtle crescent decoration
3. A blue singing waterdrop, single pale blue waterdrop with a tiny friendly smiling face
4. A blue rain feather, one simple soft pale blue feather with tiny blue droplets painted on it

Middle row, left to right:
5. A crystal key, one small transparent pale blue magical key, rounded simple silhouette
6. A yellow umbrella, one small open warm pastel yellow umbrella with a rounded handle
7. A small soft cloud, a single puffy pale blue white cloud
8. A colorful yarn ball, one small multicolor pastel ball of yarn with a short loose thread safely contained inside its cell

Bottom row, left to right:
9. A folded cream blanket, one small cozy folded cream blanket with a simple stitched edge
10. A woven basket, one small empty warm tan woven basket with a rounded handle
11. A little pink flower, one small soft pink flower with a short stem and two sage green leaves
12. A paper boat, one small folded cream paper boat with soft pale blue shaded folds

Style/medium: traditional delicate children's picture-book watercolor with fine real pigment grain and soft irregular watercolor paper edges within each painted object. Minimal elegant hand-painted objects, tender and clearly readable at a small size. Match muted natural children's storybook watercolor rather than shiny cartoon or 3D.
Color palette: muted pastel sage, lavender, cream, pale sky blue, warm peach, dusty pink, soft yellow, silver gray.
Scene/backdrop: TRUE TRANSPARENT alpha background everywhere outside the twelve painted objects. Transparent negative space between all objects. No painted backdrop, no paper sheet background, no white backdrop, no baked checkerboard. Shadows may only be extremely subtle inside the object silhouette, with no cast shadows beyond each object.
Text: none.
Constraints: EXACT 4×3 uniform grid, EXACT 4:3 canvas ratio, all objects stay in their assigned square cell with generous margins. Keep exact twelve objects and order. No frames, typography, dividers, logos, watermarks, additional objects, people, animals, scenery, harsh outlines, glow spilling beyond its cell, photorealism, shiny plastic or 3D. Preserve true alpha transparency.
```

Validación de objetos: 1448 × 1086 px, proporción exacta 4:3, RGBA, celdas cuadradas de 362 × 362 px y 66.90% de píxeles con alfa cero. No hay píxeles de alfa >32 en la banda de tres píxeles de los límites de cada celda. Cada objeto principal queda dentro de su celda; la manta y la cesta tienen menos margen que los demás. El archivo original se copió sin recortes ni composición posterior. Uso CSS: `background-size: 400% 300%`, X `0%`, `33.3333%`, `66.6667%`, `100%`; Y `0%`, `50%`, `100%` y contenedor cuadrado.


## Personajes extra — `public/art/characters-extra.png`

Cuadrícula: 2 columnas × 2 filas. Orden: ardilla, rana; tortuga, hada. El atlas original de personajes se proporcionó únicamente como referencia de estilo.

```text
Use case: illustration-story
Asset type: new production sprite atlas for a mobile children's watercolor storybook, ages 3–7.
Primary request: create ONE NEW image with four new full-body watercolor characters in an exact 2-column × 2-row atlas. This is a fresh atlas with entirely new subjects. The input image is a STYLE REFERENCE ONLY for the gentle watercolor treatment, pigment grain, and friendly proportions. Do not reproduce its characters or layout.
Input images: Image 1 is the existing watercolor character atlas, used only as a visual style reference.
Composition/framing: exact SQUARE canvas, divided into four equal SQUARE cells without visible grid lines. Character centers must be exactly at 25% and 75% of canvas width, and 25% and 75% of canvas height. Full bodies visible with at least 15% clear transparent margin around each figure inside its own cell. Each figure is isolated and must not touch or cross a cell boundary. Similar scale across figures.
Subjects, exact reading order:
Top left: a cute anthropomorphic squirrel in soft sage green overalls, warm russet fur, fluffy tail, friendly face.
Top right: a friendly anthropomorphic frog in a muted blue vest, pale natural green skin, round gentle face.
Bottom left: a kind anthropomorphic turtle with a warm muted yellow scarf, soft sage shell, friendly face.
Bottom right: a tiny kind fairy in a pastel peach dress, two delicate translucent wings, friendly face, full body, no wand or other props.
Style/medium: traditional delicate children's picture-book watercolor matching the style reference. Real softly layered pigments, subtle fine watercolor paper grain within painted forms, gently irregular soft pigment edges, minimal elegant hand-painted illustration. Warm, tender, charming expressions; front or gentle three-quarter pose; feet visible. No harsh outlines.
Color palette: muted natural watercolor pastel sage, pale blue, peach, warm cream, soft russet, lavender.
Scene/backdrop: TRUE TRANSPARENT alpha background. Fully transparent gaps between the four figures and around each figure. No scenery, paper sheet, floor, cast shadows, white backdrop, or baked checkerboard.
Text: none.
Constraints: exact 2×2 grid with exact subject order. All paint stays inside assigned square cells with clear margins; squirrel tail and fairy wings must be fully visible inside their cells. No duplicate characters, no additional objects, no typography, borders or grid lines. No shiny plastic, cartoon 3D, vector-flat style or photorealism. Preserve genuine alpha transparency.
```

## Lugares extra — `public/art/places-extra.png`

Cuadrícula: 4 columnas × 2 filas. Orden: playa, montaña, casa del árbol, aldea; pradera, cueva, río, castillo en las nubes. IDs: `beach`, `mountain`, `treehouse`, `village`, `meadow`, `cave`, `river`, `clouds`. El atlas original de lugares se proporcionó únicamente como referencia de estilo.

```text
Use case: illustration-story
Asset type: new production landscape sprite atlas for a mobile children's watercolor storybook, ages 3–7.
Primary request: create ONE NEW image of EIGHT separate minimal watercolor landscape vignettes in an exact 4-column × 2-row atlas. The input image is STYLE REFERENCE ONLY: match its real children's-book watercolor pigment, natural pastel palette, gently feathered edges and quiet inviting mood. Create the eight new scenes described below, not the original scenes.
Input images: Image 1 is the existing watercolor environment atlas, used only as a visual style reference.
Composition/framing: exact WIDE canvas in aspect ratio 2:1, divided into four equal columns and two equal rows so all eight cells are SQUARE. No visible grid lines. Vignette centers at horizontal 12.5%, 37.5%, 62.5%, 87.5% of canvas width and vertical 25%, 75% of canvas height. Each vignette fits completely inside its cell with at least 10% clear transparent margin around it. Consistent visual scale. Softly irregular circular or oval islands of watercolor paint, generous breathing room, empty welcoming centers that could later accommodate a small character in the app.
Subjects, exact reading order, left to right:
Top row:
1. A quiet beach, pale warm sand, gently rolling turquoise water, soft sky, distant horizon. No people, toys, boats or animals.
2. A snowy rounded mountain valley, soft friendly snow-covered hills and rounded distant peaks, a peaceful open valley, pale blue lavender and cream.
3. A cozy treehouse in a rounded leafy tree, small warm timber treehouse, simple entrance ladder, inviting green clearing, gentle sage foliage.
4. A little pastel village, a few rounded cream and peach cottages with muted blue roofs, a softly winding path and small flowering greenery.
Bottom row:
5. An open flower meadow, gentle pale green grass, scattered soft pastel wildflowers, low distant hills, warm light.
6. A warm welcoming crystal cave, a spacious friendly arched cave filled with softly glowing pastel lavender and peach crystals, warm pale cream interior. Bright, open, secure and enchanting, never dark or scary.
7. A winding river with small smooth stepping stones, pale blue clear water, soft grassy rounded banks and minimal sage foliage.
8. A gentle fairy-tale castle on soft clouds, small pastel cream castle with rounded lavender towers resting on puffy white pale-blue clouds in a warm gentle sky.
Style/medium: real traditional watercolor children's picture-book illustration, softly layered pigment, subtle watercolor paper grain within the paint, soft irregular watercolor edges. Minimal tasteful hand-painted scenery with muted natural pastels. Quiet, welcoming, safe magical atmosphere.
Scene/backdrop: TRUE TRANSPARENT alpha outside all eight vignettes and in all gaps between them. Watercolor edges dissolve into genuine transparency. No underlying white paper, background sheet, checkerboard, frame or cell border.
Text: none.
Constraints: Exact 4×2 uniform square-cell atlas and exact subject order. Every scenery pixel must stay inside its assigned cell with clear margins. No characters, people, animals, isolated story objects, typography, grid lines, frames, logos, watermarks, overlapping scenes, harsh outlines, photorealism, shiny 3D or vector-flat style. Preserve true alpha transparency.
```

### Revisión final de los atlas extra

La primera generación tocaba límites de celdas y la ardilla tenía rasgos parecidos al zorro. Se usó el generador integrado para corregir espaciado y especie, sin modificar los PNG con herramientas de recorte o composición.

Personajes:

```text
Use case: precise-object-edit
Asset type: production transparent 2×2 character sprite atlas.
Primary request: correct this NEW character atlas while preserving its warm children's watercolor style, sage squirrel overalls, blue frog vest, yellow turtle scarf, peach fairy dress, all four identities, expressions and subject order. TWO REQUIRED corrections:
(1) Make the top-left animal an UNMISTAKABLE SQUIRREL, not a fox. It must have small rounded squirrel ears, a short gentle squirrel muzzle, warm brown-russet squirrel fur, and a large upward-curving fluffy squirrel tail. Remove pointed fox ears and the fox-shaped long muzzle. Keep its sage overalls.
(2) Increase transparent margins. Keep an EXACT square canvas and EXACT 2×2 uniform square grid, but SHRINK EACH ENTIRE CHARACTER into the central 70% width and 70% height of its own cell. All character paint, feet, tails, wings and softly colored edge pixels must be inside this central area. This means at least 15% of each cell remains completely transparent on ALL four sides. Do not allow any pixels anywhere near the internal row or column boundary. Center each figure at EXACT (25%,25%), (75%,25%), (25%,75%), (75%,75%) of canvas.
Subject order invariant: top-left squirrel, top-right frog, bottom-left turtle, bottom-right fairy. Full bodies, tails and wings visible.
Background: genuinely transparent alpha everywhere between and around figures, no white background, no checkerboard. All watercolor islands are disjoint with broad clear transparent gaps. No other subjects, no text, no grid lines.
Style invariant: preserve the reference's delicate traditional watercolor pigmentation, subtle fine paper grain inside paint, soft natural edges, tender picture-book faces and pastel palette. No composited looking boxes or outlines. Do not add props or change the other three subjects.
```

Lugares:

```text
Use case: precise-object-edit
Asset type: production transparent 4×2 landscape sprite atlas.
Primary request: preserve the EIGHT pictured watercolor scenes exactly in this subject order and style, but correct their spacing so they do not touch or cross atlas cell boundaries.
Canvas: exact 2:1 wide canvas with EXACT four equal columns and two equal rows, so each cell is square.
CRITICAL correction: SHRINK EACH ENTIRE SCENE to fit into the central 72% width and 72% height of its own square cell. Leave at least 14% of each cell width as fully transparent margin on both left and right and 14% of cell height as fully transparent margin above and below. Every pigment edge pixel must fit in this central area. No vignette should touch another vignette or any cell boundary. Centers must be exactly at X12.5%,37.5%,62.5%,87.5% and Y25%,75% of canvas. The large clear transparent gaps are mandatory because CSS displays the scenes as individual square sprites.
Exact subject order invariant: row1 quiet beach, snowy rounded mountain valley, cozy treehouse in a tree, little pastel village; row2 open flower meadow, warm welcoming bright crystal cave, winding river with small stones, castle on soft clouds.
Keep each scene's internal composition, entire scene, delicate children's watercolor style, fine pigment grain, feathered watercolor edges, pastel colors and inviting safe mood. No characters, people, animals or extra story objects.
Background: genuine alpha transparency everywhere outside the eight individual vignettes. Transparent gaps must be visually empty and contain zero paint. No underlying paper, white canvas, checkerboard, framing rectangles, grid lines or text. Do not crop any scene or change its identity.
```

Validación final: `characters-extra.png` mide 1254 × 1254 px, RGBA, celdas de 627 × 627 px, 64.25% de píxeles con alfa cero. `places-extra.png` mide 1774 × 887 px, proporción exacta 2:1, RGBA y 47.23% de píxeles con alfa cero. Ambos atlas tienen cero píxeles de alfa >32 en las bandas de tres píxeles de los límites de celdas. Los sujetos y las escenas quedan completos en sus celdas. Los archivos finales se copiaron directamente de las salidas del generador, sin modificar píxeles.

CSS extra: personajes con `background-size: 200% 200%`, posiciones X e Y `0%` o `100%`; lugares con `background-size: 400% 200%`, X `0%`, `33.3333%`, `66.6667%`, `100%` e Y `0%` o `100%`. Los contenedores individuales son cuadrados.


## Expansion: 24 animals and 16 fantasy characters — October 2026

Generated with the built-in image generator, using `characters.png` solely as a watercolor style reference. Each file is a transparent 4×2 atlas with square cells, read left to right across the top row and then the bottom row. Original generated files are retained under the Codex generated-images folder; unmodified copies are saved in `public/art/`.

### animals-meadow.png

```text
Create a production sprite atlas for a gentle children's picturebook app. Use the attached reference ONLY for watercolor rendering style, warmth, tiny smiling faces and storybook appeal; draw entirely NEW subjects below. Exact WIDE 2:1 canvas, a precisely aligned invisible grid of FOUR EQUAL COLUMNS and TWO EQUAL ROWS, each cell SQUARE, eight sprites total. One separate complete full-body character per cell in the prescribed order. Each character centered in its own square, feet near 86% cell height, top no higher than 12%, width within 78%, with a generous fully transparent gutter all around each subject. Absolutely no overlapping, no elements outside the cell, no borders, no grid lines, no text, no labels, no cast shadows, no scenery, no white rectangle. True transparent alpha background. Delicate textured watercolor brushwork, subtle pencil edges, pastel earth tones, soft expressive faces, cozy and charming. Match the reference style closely. Keep silhouettes clearly recognizable and each subject distinct. Animals may have a tiny scarf or vest, but no distracting objects. TOP ROW left to right: (1) a round little hedgehog with tan face, brown soft spines, moss green scarf; (2) a friendly gray raccoon with a clearly dark eye mask and ringed tail, rust vest; (3) a young fawn deer with small antlers, speckled back and cream chest; (4) a playful brown river otter standing upright with an aqua scarf. BOTTOM ROW left to right: (5) a warm brown beaver with prominent broad flat paddle tail and two little teeth, ochre vest; (6) a sturdy charcoal badger with distinctive black and white striped face, plum scarf; (7) a smiling gray wolf with cream muzzle, fluffy tail and blue scarf, completely friendly; (8) a golden lynx with black ear tufts, spotted coat and tiny sage kerchief.
```

### animals-world.png

```text
Create a production sprite atlas for a gentle children's picturebook app. Use the attached reference ONLY for watercolor rendering style, warmth, tiny smiling faces and storybook appeal; draw entirely NEW subjects below. Exact WIDE 2:1 canvas, a precisely aligned invisible grid of FOUR EQUAL COLUMNS and TWO EQUAL ROWS, each cell SQUARE, eight sprites total. One separate complete full-body character per cell in the prescribed order. Each character centered in its own square, feet near 86% cell height, top no higher than 12%, width within 78%, with a generous fully transparent gutter all around each subject. Absolutely no overlapping, no elements outside the cell, no borders, no grid lines, no text, no labels, no cast shadows, no scenery, no white rectangle. True transparent alpha background. Delicate textured watercolor brushwork, subtle pencil edges, pastel earth tones, soft expressive faces, cozy and charming. Match the reference style closely. Keep silhouettes clearly recognizable and each subject distinct. Animals may have a tiny scarf or vest, but no distracting objects. TOP ROW left to right: (1) a friendly tawny lion with round russet mane, smiling; (2) a golden tiger with distinct dark stripes and cream muzzle; (3) a little gray elephant with large ears and gently curled trunk, mauve kerchief; (4) a friendly giraffe with long slender neck and golden patchwork spots, entire neck and feet visible and contained. BOTTOM ROW left to right: (5) a black and white zebra with round ears and striped body; (6) a little brown monkey with long curled tail, peach vest; (7) a round black and white giant panda with bamboo-green kerchief; (8) a soft gray koala with round fluffy ears, broad dark nose and pale belly.
```

### animals-wings-sea.png

```text
Create a production sprite atlas for a gentle children's picturebook app. Use the attached reference ONLY for watercolor rendering style, warmth, tiny smiling faces and storybook appeal; draw entirely NEW subjects below. Exact WIDE 2:1 canvas, a precisely aligned invisible grid of FOUR EQUAL COLUMNS and TWO EQUAL ROWS, each cell SQUARE, eight sprites total. One separate complete full-body character per cell in the prescribed order. Each character centered in its own square, feet near 86% cell height, top no higher than 12%, width within 78%, with a generous fully transparent gutter all around each subject. Absolutely no overlapping, no elements outside the cell, no borders, no grid lines, no text, no labels, no cast shadows, no scenery, no white rectangle. True transparent alpha background. Delicate textured watercolor brushwork, subtle pencil edges, pastel earth tones, soft expressive faces, cozy and charming. Match the reference style closely. Keep silhouettes clearly recognizable and each subject distinct. Animals may have a tiny scarf or vest, but no distracting objects. TOP ROW left to right: (1) a chubby emperor penguin with black and cream plumage and apricot throat, lilac scarf; (2) a pastel coral pink flamingo standing gently with long neck and both thin legs entirely in frame; (3) a cheerful little green parrot with multicolored blue-and-yellow wing tips and curved beak; (4) a proud friendly peacock with a compact, fully contained open fan of teal feathers with watercolor eye spots. BOTTOM ROW left to right: (5) a friendly blue-gray dolphin, whole body shown in a gentle curved swimming pose, no water or splashes; (6) a smiling pale silver seal sitting with two small flippers visible; (7) a lavender octopus with eight clear softly curled arms, smiling face, all arms within own cell; (8) a small friendly blue whale, complete horizontal body with visible tiny flipper and tail, no water, no spout, no scenery.
```

### fantasy-forest.png

```text
Create a production sprite atlas for a gentle children's picturebook app. Use the attached reference ONLY for watercolor rendering style, warmth, tiny smiling faces and storybook appeal; draw entirely NEW subjects below. Exact WIDE 2:1 canvas, a precisely aligned invisible grid of FOUR EQUAL COLUMNS and TWO EQUAL ROWS, each cell SQUARE, eight sprites total. One separate complete full-body character per cell in the prescribed order. Each character centered in its own square, feet near 86% cell height, top no higher than 12%, width within 78%, with a generous fully transparent gutter all around each subject. Absolutely no overlapping, no elements outside the cell, no borders, no grid lines, no text, no labels, no cast shadows, no scenery, no white rectangle. True transparent alpha background. Delicate textured watercolor brushwork, subtle pencil edges, pastel earth tones, soft expressive faces, cozy and charming. Match the reference style closely. Keep silhouettes clearly recognizable and each subject distinct. Animals may have a tiny scarf or vest, but no distracting objects. TOP ROW left to right: (1) a small pearly white unicorn with one golden horn, flowing peach and lilac mane, four hooves fully visible; (2) a kind male wizard with white beard, round glasses, muted blue pointed hat and robe, tiny wooden staff fully within cell; (3) a youthful friendly elf with pointed ears, green leaf cap and rust woodland tunic, full body; (4) a GOOD kindly witch with soft dark curly hair, plum pointed hat and lilac dress, a tiny friendly smile, no scary details. BOTTOM ROW left to right: (5) a serene wise elderly man with warm medium-brown skin, white beard and linen terracotta robe, wooden walking cane; (6) a brave smiling princess with deep brown skin, short curly hair, tiny golden crown and peach dress, full body; (7) a gentle king with tan skin, neat dark beard, simple gold crown and forest-green royal robe; (8) a friendly MALE knight with brown skin, curly dark hair visible under a soft blue-gray helmet, muted silver armor and small round shield, no sword, full body.
```

### fantasy-wonders.png

```text
Create a production sprite atlas for a gentle children's picturebook app. Use the attached reference ONLY for watercolor rendering style, warmth, tiny smiling faces and storybook appeal; draw entirely NEW subjects below. Exact WIDE 2:1 canvas, a precisely aligned invisible grid of FOUR EQUAL COLUMNS and TWO EQUAL ROWS, each cell SQUARE, eight sprites total. One separate complete full-body character per cell in the prescribed order. Each character centered in its own square, feet near 86% cell height, top no higher than 12%, width within 78%, with a generous fully transparent gutter all around each subject. Absolutely no overlapping, no elements outside the cell, no borders, no grid lines, no text, no labels, no cast shadows, no scenery, no white rectangle. True transparent alpha background. Delicate textured watercolor brushwork, subtle pencil edges, pastel earth tones, soft expressive faces, cozy and charming. Match the reference style closely. Keep silhouettes clearly recognizable and each subject distinct. Animals may have a tiny scarf or vest, but no distracting objects. TOP ROW left to right: (1) a kind wise elderly woman with warm brown skin, silver bun, round glasses, dusty rose dress and cream shawl; (2) a tiny FRIENDLY green goblin with long ears, mischievous gentle smile, ochre vest, no teeth or claws or weapons; (3) a cozy woodland gnome with white beard, red conical hat, blue tunic and little boots; (4) a cheerful mermaid with tan skin, wavy dark hair, modest lilac top and an entirely visible curved teal fish tail, no water. BOTTOM ROW left to right: (5) a magical phoenix bird with soft apricot, gold and coral feathers, gentle face and compact folded wings, no flames or scary expression; (6) a shy little friendly yeti with fluffy cream fur, pale blue face and hands, lavender scarf, no fangs; (7) a small soft peach PEGASUS winged horse, NO horn, entire wings and hooves contained, clearly distinct from unicorn; (8) a kindly living tree spirit with a round wooden face in its trunk, little branch arms, root feet, leafy moss-green crown, friendly smiling face, full body. All fantastic beings must feel kind, safe, warm and storybook-cozy.
```


### Final grid spacing correction (all five expansion atlases)

The first pass placed some silhouettes across cell borders. Each expansion atlas was edited with the built-in image generator using its own initial atlas as the reference, and the final unmodified output replaced its `public/art/` copy. Prompt:

```text
Edit this sprite atlas preserving ALL EIGHT exact characters, watercolor style, colors, identities, order, transparent background, and the wide 2:1 canvas. Fix sprite packing only: reduce EVERY character's whole silhouette by about 20% and position it at the CENTER of its own equal SQUARE grid cell. The invisible grid is exactly 4 columns x 2 rows. Centers as percent of whole canvas: TOP ROW (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%); BOTTOM ROW (12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Each COMPLETE sprite including head, hat, ears, feet, fins, wings, tails must fit strictly within the central 78% of its own cell. Leave completely transparent margins 11% on ALL four sides of EACH square cell. Absolutely ZERO paint along any cell border or at the horizontal midline (50% canvas height). The midline needs a visibly broad full-width transparent horizontal band, not painted feet touching heads below. Similarly leave broad empty transparent vertical bands at25%,50%,75%canvaswidth. Do not add bands of color or lines: gutters are TRANSPARENT. Keep allbodyparts completeanduncut, nooverlap, noscenery, nooutlines of cells, no labels, no text, no shadows. Do not fill the background. This is a technical correction to the grid layout of the same beautiful artwork.
```


## Expansion: 24 scenes and 24 objects — October 2026

Generated with the built-in image generator and `transparent_background: true`. `places.png` and `objects.png` were used only as style references. All six files live in `public/art/`; atlas order is top row left to right, followed by bottom row left to right.

### places-nature.png

```text
Use case: illustration-story. Asset type: production sprite atlas for a cozy children's picturebook app. Use attached image ONLY as reference for watercolor style, gentle organic edges, detailed pastel colors and brush texture. Create entirely NEW subjects listed below. Output is an EXACT WIDE 2:1 canvas with an INVISIBLE perfectly aligned grid of FOUR columns and TWO rows, eight SQUARE cells total. IMPORTANT: each COMPLETE isolated illustration MUST occupy only the CENTRAL 70% of its own cell. Do not fill or touch a cell border. Put the centers at top-row (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%) of the whole canvas; bottom-row(12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Subject bounding boxes within canvas: column1 x4%-21%, column2 x29%-46%, column3 x54%-71%, column4 x79%-96%; TOP row y8%-42%, BOTTOM row y58%-92%. Broad transparent gutters at every boundary, particularly the horizontal midline. Each subject is separate and centered, with ALL its edges/parts inside those bounds. True transparent alpha background OUTSIDE illustrations. No visible grid lines, no border, no background rectangle, no text, no labels, no numerals, no watermark, no cast shadows. Soft hand-painted watercolor with delicate pencil detailing, warm storybook charm. Match original style; all eight subjects must be distinct. Scene atlas: each scene is its own compact square-friendly watercolor vignette with organic softly painted edges, NOT a rectangle, and totally transparent outside. No people, no animals, no characters; foreground open space so the app can overlay separate characters. Eight different landscapes or rooms. TOP row left to right: (1) a gentle waterfall descending over mossy rocks into a tiny turquoise pool; (2) a bamboo grove with tall green bamboo stalks and a small winding path; (3) a golden sandy desert oasis with two palm trees and a little blue pond, distant soft dunes; (4) a peaceful snowy valley with white hills and a few snowy pine trees, pale lilac winter sky. BOTTOM row left to right: (5) a flower field of pastel daisies and wildflowers with a little open clearing, no forest; (6) a tranquil mangrove lagoon, distinctive exposed tree roots over still teal water; (7) an underwater coral reef of rounded pastel coral and blue-green water inside the vignette, no fish; (8) an enchanted mushroom grove with large red spotted and peach mushrooms nestled in soft moss.
```

### places-village.png

```text
Use case: illustration-story. Asset type: production sprite atlas for a cozy children's picturebook app. Use attached image ONLY as reference for watercolor style, gentle organic edges, detailed pastel colors and brush texture. Create entirely NEW subjects listed below. Output is an EXACT WIDE 2:1 canvas with an INVISIBLE perfectly aligned grid of FOUR columns and TWO rows, eight SQUARE cells total. IMPORTANT: each COMPLETE isolated illustration MUST occupy only the CENTRAL 70% of its own cell. Do not fill or touch a cell border. Put the centers at top-row (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%) of the whole canvas; bottom-row(12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Subject bounding boxes within canvas: column1 x4%-21%, column2 x29%-46%, column3 x54%-71%, column4 x79%-96%; TOP row y8%-42%, BOTTOM row y58%-92%. Broad transparent gutters at every boundary, particularly the horizontal midline. Each subject is separate and centered, with ALL its edges/parts inside those bounds. True transparent alpha background OUTSIDE illustrations. No visible grid lines, no border, no background rectangle, no text, no labels, no numerals, no watermark, no cast shadows. Soft hand-painted watercolor with delicate pencil detailing, warm storybook charm. Match original style; all eight subjects must be distinct. Scene atlas: each scene is its own compact square-friendly watercolor vignette with organic softly painted edges, NOT a rectangle, and totally transparent outside. No people, no animals, no characters; foreground open space so the app can overlay separate characters. Eight different landscapes or rooms. TOP row left to right: (1) a cozy library interior with low wooden bookshelves, warm rug and a round window, no writing on spines; (2) a friendly bakery storefront with a bread display, pastel awning, no lettering; (3) a cozy crafting workshop interior with a wooden workbench and tidy wall shelves, no dangerous sharp tools; (4) a glass-roofed greenhouse filled with gentle green seedlings and terracotta pots. BOTTOM row left to right: (5) a neighborhood playground with a small slide and a swing beside an open lawn, no children; (6) a sunny orchard of small round apple trees along a soft path; (7) a rustic pastel windmill with four wooden sails beside a grassy mound; (8) a quiet harbor with a wooden pier, tiny moored pastel sailboats, and calm blue water.
```

### places-wonder.png

```text
Use case: illustration-story. Asset type: production sprite atlas for a cozy children's picturebook app. Use attached image ONLY as reference for watercolor style, gentle organic edges, detailed pastel colors and brush texture. Create entirely NEW subjects listed below. Output is an EXACT WIDE 2:1 canvas with an INVISIBLE perfectly aligned grid of FOUR columns and TWO rows, eight SQUARE cells total. IMPORTANT: each COMPLETE isolated illustration MUST occupy only the CENTRAL 70% of its own cell. Do not fill or touch a cell border. Put the centers at top-row (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%) of the whole canvas; bottom-row(12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Subject bounding boxes within canvas: column1 x4%-21%, column2 x29%-46%, column3 x54%-71%, column4 x79%-96%; TOP row y8%-42%, BOTTOM row y58%-92%. Broad transparent gutters at every boundary, particularly the horizontal midline. Each subject is separate and centered, with ALL its edges/parts inside those bounds. True transparent alpha background OUTSIDE illustrations. No visible grid lines, no border, no background rectangle, no text, no labels, no numerals, no watermark, no cast shadows. Soft hand-painted watercolor with delicate pencil detailing, warm storybook charm. Match original style; all eight subjects must be distinct. Scene atlas: each scene is its own compact square-friendly watercolor vignette with organic softly painted edges, NOT a rectangle, and totally transparent outside. No people, no animals, no characters; foreground open space so the app can overlay separate characters. Eight different landscapes or rooms. TOP row left to right: (1) a welcoming crystal cave with pale lavender and blue crystal formations, softly luminous and never dark or frightening; (2) a floating grassy island with an entire rounded rock base suspended over small soft clouds, tiny waterfall inside vignette; (3) an enchanted slender stone tower with violet conical roof and an arched wooden door, small open lawn, clearly distinct from a whole castle; (4) a cozy domed star observatory with telescope visible through the opening, gentle starry blue sky entirely inside the vignette. BOTTOM row left to right: (5) a moonlit garden with silver flowers, curved benches and a little crescent moon inside its dusky violet sky; (6) a small arching rainbow bridge over two low soft clouds, the entire bridge fits inside its own cell; (7) a friendly underwater palace with coral-pink domes, shell arches and pale turquoise water contained within the vignette, no mermaids; (8) a magnificent giant old tree with a broad golden-brown trunk, huge mossy roots and rounded leafy crown, no houses or ladders.
```

### objects-explore.png

```text
Use case: illustration-story. Asset type: production sprite atlas for a cozy children's picturebook app. Use attached image ONLY as reference for watercolor style, gentle organic edges, detailed pastel colors and brush texture. Create entirely NEW subjects listed below. Output is an EXACT WIDE 2:1 canvas with an INVISIBLE perfectly aligned grid of FOUR columns and TWO rows, eight SQUARE cells total. IMPORTANT: each COMPLETE isolated illustration MUST occupy only the CENTRAL 70% of its own cell. Do not fill or touch a cell border. Put the centers at top-row (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%) of the whole canvas; bottom-row(12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Subject bounding boxes within canvas: column1 x4%-21%, column2 x29%-46%, column3 x54%-71%, column4 x79%-96%; TOP row y8%-42%, BOTTOM row y58%-92%. Broad transparent gutters at every boundary, particularly the horizontal midline. Each subject is separate and centered, with ALL its edges/parts inside those bounds. True transparent alpha background OUTSIDE illustrations. No visible grid lines, no border, no background rectangle, no text, no labels, no numerals, no watermark, no cast shadows. Soft hand-painted watercolor with delicate pencil detailing, warm storybook charm. Match original style; all eight subjects must be distinct. Object atlas: one clear full object per cell (only the specified tiny grouping if plural), complete uncropped silhouette, no scenery, no additional items, no decorations spilling into margins. Pastel storybook objects, gently angled for depth but easy to recognize even as small icons. TOP row left to right: (1) a small brass lantern with a warm golden glow contained within its own silhouette and handle; (2) a round little compass with a blue-and-red needle, decorative abstract points but NO letters or words; (3) an unfolded cream parchment map with a winding dotted trail, little abstract mountain and river shapes, NO text; (4) a small antique brass telescope on a short wooden three-legged stand, entirely complete and contained. BOTTOM row left to right: (5) a magnifying glass with wooden handle and pale blue clear lens; (6) a moss-green travel backpack with a small peach flap and two visible straps; (7) a neatly coiled honey-colored rope with both short ends contained inside own cell; (8) a tidy pair of small mustard-yellow rain boots as ONE paired item.
```

### objects-create.png

```text
Use case: illustration-story. Asset type: production sprite atlas for a cozy children's picturebook app. Use attached image ONLY as reference for watercolor style, gentle organic edges, detailed pastel colors and brush texture. Create entirely NEW subjects listed below. Output is an EXACT WIDE 2:1 canvas with an INVISIBLE perfectly aligned grid of FOUR columns and TWO rows, eight SQUARE cells total. IMPORTANT: each COMPLETE isolated illustration MUST occupy only the CENTRAL 70% of its own cell. Do not fill or touch a cell border. Put the centers at top-row (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%) of the whole canvas; bottom-row(12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Subject bounding boxes within canvas: column1 x4%-21%, column2 x29%-46%, column3 x54%-71%, column4 x79%-96%; TOP row y8%-42%, BOTTOM row y58%-92%. Broad transparent gutters at every boundary, particularly the horizontal midline. Each subject is separate and centered, with ALL its edges/parts inside those bounds. True transparent alpha background OUTSIDE illustrations. No visible grid lines, no border, no background rectangle, no text, no labels, no numerals, no watermark, no cast shadows. Soft hand-painted watercolor with delicate pencil detailing, warm storybook charm. Match original style; all eight subjects must be distinct. Object atlas: one clear full object per cell (only the specified tiny grouping if plural), complete uncropped silhouette, no scenery, no additional items, no decorations spilling into margins. Pastel storybook objects, gently angled for depth but easy to recognize even as small icons. TOP row left to right: (1) a pastel diamond-shaped kite with a short curled string and two small bows, EVERYTHING including string inside cell; (2) a little wooden drum with cream drumhead and muted terracotta rim, NO extra sticks; (3) a simple warm wooden flute with visible round holes; (4) a single short wooden paintbrush with soft blue bristles, no jar or paint splashes. BOTTOM row left to right: (5) three chunky pastel crayons arranged as one compact group, NO writing on wrappers; (6) a small four-piece interlocking jigsaw puzzle assembled into a square with a simple pastel sunrise design; (7) a cheerful pastel four-bladed pinwheel on a short wooden stick; (8) a single folded five-pointed golden paper star with subtle watercolor folds, no glitter spilling around it.
```

### objects-treasure.png

```text
Use case: illustration-story. Asset type: production sprite atlas for a cozy children's picturebook app. Use attached image ONLY as reference for watercolor style, gentle organic edges, detailed pastel colors and brush texture. Create entirely NEW subjects listed below. Output is an EXACT WIDE 2:1 canvas with an INVISIBLE perfectly aligned grid of FOUR columns and TWO rows, eight SQUARE cells total. IMPORTANT: each COMPLETE isolated illustration MUST occupy only the CENTRAL 70% of its own cell. Do not fill or touch a cell border. Put the centers at top-row (12.5%,25%),(37.5%,25%),(62.5%,25%),(87.5%,25%) of the whole canvas; bottom-row(12.5%,75%),(37.5%,75%),(62.5%,75%),(87.5%,75%). Subject bounding boxes within canvas: column1 x4%-21%, column2 x29%-46%, column3 x54%-71%, column4 x79%-96%; TOP row y8%-42%, BOTTOM row y58%-92%. Broad transparent gutters at every boundary, particularly the horizontal midline. Each subject is separate and centered, with ALL its edges/parts inside those bounds. True transparent alpha background OUTSIDE illustrations. No visible grid lines, no border, no background rectangle, no text, no labels, no numerals, no watermark, no cast shadows. Soft hand-painted watercolor with delicate pencil detailing, warm storybook charm. Match original style; all eight subjects must be distinct. Object atlas: one clear full object per cell (only the specified tiny grouping if plural), complete uncropped silhouette, no scenery, no additional items, no decorations spilling into margins. Pastel storybook objects, gently angled for depth but easy to recognize even as small icons. TOP row left to right: (1) one pink and cream scallop seashell; (2) a single luminous pale pearly round pearl with soft blue and rose reflections, no surrounding shell; (3) a little lavender faceted crystal with its full solid shape visible; (4) a single warm brown acorn with a textured cap and tiny stem. BOTTOM row left to right: (5) one rosy-red apple with a little green leaf; (6) a little rounded glass jar of golden honey with a cream cloth lid, NO label, no text, no extra spoon; (7) a small pastel blue teacup with a complete curved handle, NO saucer, no steam; (8) a sage-green metal watering can with rounded handle and short spout, no water spilling out.
```


### Final object packing correction — objects-explore.png

The built-in image generator edited the initial exploration atlas to separate the lantern and folded map from neighboring cells. The final unmodified RGBA file is saved as `public/art/objects-explore.png`.

```text
Edit this object atlas preserving ALL EIGHT exact watercolor objects, colors, details, order, true transparent background and wide2:1 canvas. Change ONLY the packing. Reduce each entire object (including handle,straps,rope ends and tripod) about20% and CENTER it inside its own square cell of a precise4columns×2rows grid. Top row centers:12.5%/25%,37.5%/25%,62.5%/25%,87.5%/25%; bottom:12.5%/75%,37.5%/75%,62.5%/75%,87.5%/75%. Every complete object must fit within central75%ofcell, with12.5%totally transparent marginonall4sides. Keep a BROAD FULL WIDTH TRANSPARENT GUTTER around the horizontal midline: the lantern base and folded map must not extend into magnifying glass/backpack cellsbelow. Keep totally transparent vertical gutters at25%,50%,75%ofcanvaswidth. Preserve original order: lantern,compass,map,telescope; magnifying glass,backpack,coiled rope,pair of rainboots. No text, no border, no grid lines, no backgrounds, no new objects. All silhouettes whole and uncut, isolated from neighboring cells.
```

## Villanos — `public/art/villains.png`

Cuadrícula: 4 columnas × 2 filas, proporción 2:1, celdas cuadradas. Orden: trol gruñón, fantasma miedoso, cuervo coleccionista, gata pirata; ogro glotón, duende travieso, araña tejedora, gigante despistado. Son antagonistas suaves de Acción que al final se reconcilian: deben verse traviesos o enfurruñados, nunca aterradores. Para registrar arte futuro antes de pintarlo, añade su archivo a `PENDING_ART` en `src/villain-catalog.js`: el lector lo oculta y el build avisa hasta que exista.

```text
Use case: illustration-story
Asset type: production sprite atlas for a mobile children's storybook, ages 3–7.
Primary request: one precisely aligned 4-column × 2-row sprite atlas containing EIGHT distinct full-body watercolor characters who play gentle, redeemable antagonists. Wide landscape canvas, aspect ratio exactly 2:1, so all eight cells are square. Four columns and two rows form eight exactly equal cells; no actual grid lines. Character centers must be exactly the centers of their cells: horizontal centers at 12.5%, 37.5%, 62.5%, 87.5% of canvas width, and vertical centers at 25% and 75% of canvas height. Each figure fits well inside its assigned cell with at least 15% cell margin around it; no pigment may touch a cell edge. Consistent visual scale (the giant is drawn the same size as the others, his size suggested by tiny clouds or pebbles at his feet), no contact or overlap.
Subjects, exact reading order, left to right:
Top row: (1) a grumpy but cuddly mossy-green troll with a big nose, small tusks, crossed arms and a pouty frown; (2) a small round white ghost under a soft sheet, wide nervous eyes, trembling a little, faint pale-blue glow; (3) a glossy black crow with a tiny shiny button in its beak and a proud puffed chest; (4) a ginger cat pirate standing on two legs, eye patch, small tricorn hat, striped shirt, cheeky grin, no weapons.
Bottom row: (5) a big-bellied friendly ogre in a patched brown tunic, rosy cheeks, holding his rumbling tummy, sheepish expression; (6) a tiny mischievous forest imp with leaf hat and pointed ears, sticking out his tongue mid-jump; (7) a round lavender spider with eight short fuzzy legs, big friendly eyes and a small ball of yarn; (8) a gentle clumsy giant with a scruffy beard and patched overalls, scratching his head, looking puzzled.
Style/medium: traditional delicate children's book watercolor, muted real watercolor pigments with soft irregular pigment edges and subtle watercolor paper grain within the painted figures. Minimal elegant hand-painted illustration matching an existing set of friendly animal and fantasy characters. Mischievous, grumpy or worried expressions that are clearly harmless and endearing. Front or subtle three-quarter poses, feet visible.
Color palette: pastel sage, muted lavender, dusty peach, warm cream, pale blue, soft moss green and charcoal for the crow.
Scene/backdrop: genuinely transparent background, transparent negative space between all figures, isolated cutouts. No scenery, floor, frames or backdrop. No baked white or checkerboard backdrop. Do not paint any shadows beyond a figure's own feet.
Text: none.
Constraints: exact uniform 4×2 grid and exact subject order; all painting pixels stay inside their cell with generous margins. No weapons, no sharp teeth, no blood, no scary faces, no duplicate characters, no typography, no cell lines, no harsh outlines, no plastic shiny surfaces, no 3D, no vector-flat style. Preserve real alpha transparency, 8-bit RGBA PNG.
```


## Locaciones — tres encuadres por lugar

Las 36 locaciones tienen 108 acuarelas: panorámica, media y cercana. Se añaden nueve atlas de 4 columnas × 3 filas, proporción 4:3 y celdas cuadradas. Cada columna conserva un lugar y sus elementos reconocibles; cada fila cambia el encuadre. Las pinturas originales y las posiciones de `scene.atlas` se conservan. `scene.views` añade las tres celdas nuevas sin cambiar los identificadores de los cuentos guardados.

| Atlas | Columnas de izquierda a derecha |
| --- | --- |
| `places-views-01.png` | bosque, lago, castillo, jardín |
| `places-views-02.png` | playa, montaña, casa del árbol, pueblo |
| `places-views-03.png` | prado, cueva, río, palacio de las nubes |
| `places-views-04.png` | cascada, bosque de bambú, oasis, valle nevado |
| `places-views-05.png` | campo de flores, manglar, arrecife, bosque de hongos |
| `places-views-06.png` | biblioteca, panadería, taller, invernadero |
| `places-views-07.png` | parque de juegos, huerto, molino, puerto |
| `places-views-08.png` | cueva de cristal, isla flotante, torre encantada, observatorio |
| `places-views-09.png` | jardín lunar, puente arcoíris, palacio submarino, árbol gigante |

Filas, de arriba abajo: panorámica, media y cercana. Las tres vistas son pinturas distintas del mismo lugar, con continuidad de colores y arquitectura. Se generaron con el `imagegen` integrado, usando los atlas existentes como referencia de identidad y estilo y pidiendo transparencia real. Las correcciones de separación también se hicieron en el generador; los PNG finales se copian sin modificar píxeles, recortar ni componer.

En el libro, cada lugar avanza por sus tres encuadres de manera independiente: se recalcula desde las páginas originales al reanudar o redimensionar. Los escenarios tienen más presencia y conservan el espacio de lectura; una máscara radial suave refuerza la disolución del pigmento sobre el papel. La galería permite comparar los tres encuadres. El build valida cada celda y el caché offline incluye todos los atlas nuevos.

### Validación de los nueve atlas de encuadres

Todos los PNG finales son RGBA de 8 bits, sin entrelazado, de 1448 × 1086 px: proporción exacta 4:3 y celdas de 362 × 362 px. Cada celda tiene pintura visible y transparencia real. Las fronteras no tienen trazos continuos de alfa ≥128 que recorten una escena o pasen a la vecina. Pueden quedar motas con alfa muy bajo; el render las desvanece con la máscara de acuarela. La resolución nativa del generador es menor que la resolución ideal solicitada en los prompts; no se reescalaron los PNG.

| Archivo | Píxeles con alfa cero |
| --- | ---: |
| `places-views-01.png` | 26.63% |
| `places-views-02.png` | 35.74% |
| `places-views-03.png` | 31.57% |
| `places-views-04.png` | 55.87% |
| `places-views-05.png` | 54.28% |
| `places-views-06.png` | 44.40% |
| `places-views-07.png` | 39.35% |
| `places-views-08.png` | 44.25% |
| `places-views-09.png` | 51.38% |

### Prompts exactos de generación y corrección

#### `public/art/places-views-01.png`

Prompt guardado en `01.txt`:

```text
Use case: illustration-story.
Asset type: production transparent watercolor environment sprite atlas for a gentle children's storybook, ages 3–7.
Primary request: create ONE NEW atlas containing EXACTLY TWELVE individually painted location views, for FOUR places at THREE camera distances each. EXACT 4:3 landscape canvas, ideally 2400 × 1800 pixels, four equal columns and three equal rows, so each of the twelve cells is perfectly square. Invisible grid only: no divider lines or labels.
Input image: the provided existing location atlas is a REFERENCE ONLY for the identities, their signature landmarks and palettes, traditional watercolor brush texture and charming children's-book atmosphere. Do not duplicate the input image or use its arrangement. Follow the new four-column, three-row structure below.
Grid organization: EACH COLUMN is ONE SAME PLACE throughout all three rows. TOP ROW = PANORAMIC establishing view, from a wide distance; MIDDLE ROW = MEDIUM view, the camera moves into the place and shows its signature landmarks from a different position; BOTTOM ROW = CLOSE view, the camera is among foreground features, still recognizably inside the same location. These must be TWELVE DISTINCT painted compositions and genuine camera changes, never digital crops, repetitions, mirroring or scaled copies.
Alignment: centers at X = 12.5%, 37.5%, 62.5%, 87.5% of the entire canvas, Y = 16.6667%, 50%, 83.3333%. Each complete scene occupies the central 80% of its own square cell. Leave AT LEAST 10% of each cell width as FULLY TRANSPARENT margin on every side. All pigment must fit inside that central area. Broad fully transparent gutters separate every cell. No paint may touch or cross a cell boundary.
Style and larger presence: delicate real traditional watercolor, soft layered translucent pigments, fine pencil details only within the scenery, nuanced natural pastel palette, watercolor paper grain ONLY inside painted pigment. Rich yet uncluttered scenery that fills its central area, large readable landmarks, quiet foreground space for the app to place its separate characters.
CRITICAL SOFTER WATERCOLOR EDGES: the outer 15–20% of every painted vignette GRADUALLY FEATHERS AND DISSOLVES into genuine transparent alpha, like a wet watercolor wash running out of pigment. Very soft, uneven airy pigment transitions, semi-transparent wisps and blurred gentle brush ends. No hard scalloped sticker-cutout edge, no outlined oval, no uniform border, no white fringe or white halo. Preserve real transparency everywhere outside painted scenery.
Mood: warm, safe, welcoming, quietly magical. Retain consistent signature landmarks, time of day, architecture, lighting and palette across the three views of each place.
Constraints: true RGBA 8-bit non-interlaced PNG alpha background. Exactly twelve views in the exact grid and place order below. No people, children, animals, creatures or characters. No lettering, numbers, labels, captions, typography, grid, frame, watermark, painted background paper, white rectangle, baked checkerboard, cast shadows, cut-off scenery, harsh outlines, photorealism, 3D or glossy vector look. The center and foreground must remain open and inviting for overlaid characters.

Place identities and camera compositions:
Column 1: FOREST, a cozy green forest of two ancient broad leafy trees, mossy rounded rocks, small white daisies and a winding pale ochre path; warm sage and olive canopy. Panoramic: the entire forest glade with the two landmark trees around the path. Medium: farther along the path, near a mossy trunk and curved opening between trees. Close: a foreground mossy root, tiny daisies and soft ferns beside the woodland path, with recognizable trunks receding behind.
Column 2: MOONLIT LAKE, tranquil blue-lavender lake, crescent moon above pine-covered shore, a silver moon reflection across water, soft lavender distant hills and reeds. Panoramic: broad whole lake with crescent and mountain silhouettes. Medium: from the gentle shoreline beside reeds and smooth rocks, closer water and the same crescent reflected. Close: low near smooth shore pebbles and reeds with softly rippled moonlit water and distant pine shore; retain the lavender night atmosphere.
Column 3: CASTLE ON A GRASSY HILL, ivory storybook castle with several lavender conical turrets and tiny muted peach flags, winding ochre path, small stone bridge over a soft blue river, gentle olive greenery under a peach-lilac sky. Panoramic: complete hill, castle, bridge and approach path. Medium: along the castle approach near bridge, castle larger behind. Close: near the friendly ivory arched castle gate, lavender turret roofs still recognizable above, small grassy landing for characters.
Column 4: SUNNY FLOWER GARDEN, pink climbing roses on a low wooden gate, broad leafy tree on the right, pastel daisies and lavender spikes, golden-green lawn and rounded foreground stepping stones. Panoramic: full welcoming garden with gate and right-side landmark tree. Medium: from beside the gate looking along the garden lawn, rose bushes closer. Close: amongst soft roses and lavender near a smooth stepping stone with a leafy tree branch and the little gate receding.
Read across EACH ROW in exactly this order: forest, moonlit lake, hillside castle, sunny flower garden.
```

Prompt guardado en `01-cleanup.txt`:

```text
Edit this 4-column × 3-row watercolor location atlas ONLY to repair transparent gutters and precise alignment. Keep all twelve existing scenes, all details, colors, camera views, watercolor style and subject order exactly unchanged. Keep the exact 4:3 canvas, 1448 × 1086 pixels, RGBA true alpha.

Each cell is 362 × 362 pixels. Exact centers of cells are x181,543,905,1267 and y181,543,905. Put each entire existing vignette centered precisely on its own cell center. Treat every scene as one whole unit, including its feathered watercolor edge. Do not change its internal painting. The first-row vignettes must move slightly UP, and last-row vignettes slightly DOWN to be centered.

TRANSPARENCY REPAIR: REMOVE ALL the faint gray/white wash, tiny colored speckles and stray brush residue BETWEEN scenes. The spaces between scenes currently contain low-opacity pigment and must become COMPLETELY TRANSPARENT ALPHA ZERO. Each scene including its soft edge must occupy only the central 76% width and 76% height of its own cell, no bigger. Outside that area there must be ABSOLUTELY ZERO pixels of paint, zero wash, zero speckles. Each square cell has at least 12% totally transparent margin on all four sides. All scene pigment fits in these exact canvas bounding boxes:
Column1 x43–319; Column2 x405–681; Column3 x767–1043; Column4 x1129–1405.
Row1 y43–319; Row2 y405–681; Row3 y767–1043.
Nothing outside these twelve boxes. These are invisible technical boxes, do not draw rectangles or lines.
Every vignette keeps its existing soft translucent watercolor fade INSIDE its own specified bounds, then becomes fully transparent. No white or gray halo outside the scene. No opaque paper. Transparent gutters must be completely empty, not decorative texture.

No new subjects, no background, no checkerboard, no outlines, grid, text, labels or frames. Preserve all scenery complete and readable. This is a technical cleanup of the exact same art, not a new style or redesign.
```

Prompt guardado en `01-correction.txt`:

```text
Edit this watercolor location atlas. Preserve ALL TWELVE painted scenes, their exact identities, colors, beautiful traditional watercolor details, and order. Keep the exact landscape 4:3 canvas with four columns and three rows of square cells. Column identities and three view distances remain exactly unchanged.

Change ONLY the packing and outer watercolor edges. The current scenes nearly fill their cells and sometimes overlap the crop boundaries. SHRINK EACH ENTIRE VIGNETTE by 25–30% around the exact center of its OWN cell and move it to the center of that cell if needed. This is mandatory for CSS atlas cropping. Every entire painted scene must fit WITHIN THE CENTRAL 72% WIDTH AND CENTRAL 72% HEIGHT of its assigned square cell. Leave at least 14% of the cell width as genuinely fully transparent margin on the left and right, and 14% of the cell height above and below. No painted specks outside this central region. All parts of each scenery remain whole and visible; do not crop. Scene centers are exactly X12.5%,37.5%,62.5%,87.5% and Y16.6667%,50%,83.3333% of the full canvas. There must be very clear broad fully transparent gutters around horizontal boundaries at33.333% and66.667%, and vertical boundaries at25%,50%,75%. NO pigment may cross those boundaries.

SOFT EDGES ARE EQUALLY MANDATORY: replace the current sharp dark cutout perimeter with a very soft airy watercolor wash fade. Within the outer 15–20% of EACH SHRUNK vignette, taper pigment opacity gradually down to zero, with gently blurred wispy watercolor brush edges and subtle translucent flecks contained within the vignette. Keep a detailed recognizable center, but let all outer foliage, sky, water and ground gently melt into GENUINE ALPHA TRANSPARENCY. Absolutely no hard scalloped edge, uniform oval boundary, outlined sticker silhouette, white fringe, dark fringe, white halo or opaque surrounding paper. The fully transparent 14% cell margins must be visually completely empty.

Keep each existing panoramic, medium and close camera view distinct and in its current correct row. Preserve the quiet foreground space for overlaid app characters. No new scenery subjects. No characters, animals, people, text, labels, numbers, grids, frames, backgrounds, checkerboard or white rectangles. Output RGBA 8-bit non-interlaced PNG with true transparent alpha, EXACT4:3 canvas.
```

#### `public/art/places-views-02.png`

Prompt guardado en `02.txt`:

```text
Use case: illustration-story.
Asset type: production transparent watercolor environment sprite atlas for a gentle children's storybook, ages 3–7.
Primary request: create ONE NEW atlas containing EXACTLY TWELVE individually painted location views, for FOUR places at THREE camera distances each. EXACT 4:3 landscape canvas, ideally 2400 × 1800 pixels, four equal columns and three equal rows, so each of the twelve cells is perfectly square. Invisible grid only: no divider lines or labels.
Input image: the provided existing location atlas is a REFERENCE ONLY for the identities, their signature landmarks and palettes, traditional watercolor brush texture and charming children's-book atmosphere. Do not duplicate the input image or use its arrangement. Follow the new four-column, three-row structure below.
Grid organization: EACH COLUMN is ONE SAME PLACE throughout all three rows. TOP ROW = PANORAMIC establishing view, from a wide distance; MIDDLE ROW = MEDIUM view, the camera moves into the place and shows its signature landmarks from a different position; BOTTOM ROW = CLOSE view, the camera is among foreground features, still recognizably inside the same location. These must be TWELVE DISTINCT painted compositions and genuine camera changes, never digital crops, repetitions, mirroring or scaled copies.
Alignment: centers at X = 12.5%, 37.5%, 62.5%, 87.5% of the entire canvas, Y = 16.6667%, 50%, 83.3333%. Each complete scene occupies the central 80% of its own square cell. Leave AT LEAST 10% of each cell width as FULLY TRANSPARENT margin on every side. All pigment must fit inside that central area. Broad fully transparent gutters separate every cell. No paint may touch or cross a cell boundary.
Style and larger presence: delicate real traditional watercolor, soft layered translucent pigments, fine pencil details only within the scenery, nuanced natural pastel palette, watercolor paper grain ONLY inside painted pigment. Rich yet uncluttered scenery that fills its central area, large readable landmarks, quiet foreground space for the app to place its separate characters.
CRITICAL SOFTER WATERCOLOR EDGES: the outer 15–20% of every painted vignette GRADUALLY FEATHERS AND DISSOLVES into genuine transparent alpha, like a wet watercolor wash running out of pigment. Very soft, uneven airy pigment transitions, semi-transparent wisps and blurred gentle brush ends. No hard scalloped sticker-cutout edge, no outlined oval, no uniform border, no white fringe or white halo. Preserve real transparency everywhere outside painted scenery.
Mood: warm, safe, welcoming, quietly magical. Retain consistent signature landmarks, time of day, architecture, lighting and palette across the three views of each place.
Constraints: true RGBA 8-bit non-interlaced PNG alpha background. Exactly twelve views in the exact grid and place order below. No people, children, animals, creatures or characters. No lettering, numbers, labels, captions, typography, grid, frame, watermark, painted background paper, white rectangle, baked checkerboard, cast shadows, cut-off scenery, harsh outlines, photorealism, 3D or glossy vector look. The center and foreground must remain open and inviting for overlaid characters.

Place identities and camera compositions:
Column 1: BEACH, warm sandy shore with gentle turquoise waves, rounded tan coastal rocks to the left, coastal greenery, tiny shells, distant soft blue hills and a pale sunny sky. Panoramic: broad bay with shore and rocky headland. Medium: from the shore toward the same headland, calm water and sandy foreground. Close: low beside a tiny shell and rounded shore rocks, gentle transparent turquoise shallows and the same coast behind.
Column 2: SNOWY MOUNTAIN, lavender-blue high mountain peaks capped with snow, soft snowy valley, blue-green fir trees, pale peach and lilac winter sky. Panoramic: whole mountain range above valley. Medium: from a winding snowy path among closer fir trees with the same peak behind. Close: sheltered foreground snowbank beside a fir trunk and a few snowy pine branches; recognizable lavender peak and open path beyond. Cozy, never dangerous.
Column 3: TREEHOUSE, warm wooden cottage with a triangular ochre roof, tiny round window, little balcony and friendly wooden ladder built around an ancient thick leafy tree, sage-green grass and tiny daisies. Panoramic: entire tree and cottage, ladder and grassy base. Medium: from near the grassy tree base looking up to cottage, ladder to one side. Close: friendly cottage balcony and round window at camera height, warm wooden planks, leafy branches and a broad calm landing; no characters.
Column 4: VILLAGE, charming cream and peach cottages with slate-blue roofs, one slender ivory tower with lavender roof in the distance, low rounded stone garden wall, pink flower bushes and a winding ochre pedestrian lane. Panoramic: complete cluster of cottages and landmark tower. Medium: from within the winding lane with nearer pastel house doors and the same distant tower. Close: beside a cream cottage doorway and pink flowers, warm stone threshold with the village lane and tower receding.
Read across EACH ROW in exactly this order: beach, snowy mountain, treehouse, village.
```

Prompt guardado en `02-correction.txt`:

```text
Edit this watercolor location atlas. Preserve ALL TWELVE painted scenes, their exact identities, colors, beautiful traditional watercolor details, and order. Keep the exact landscape 4:3 canvas with four columns and three rows of square cells. Column identities and three view distances remain exactly unchanged.

Change ONLY the packing and outer watercolor edges. The current scenes nearly fill their cells and sometimes overlap the crop boundaries. SHRINK EACH ENTIRE VIGNETTE by 25–30% around the exact center of its OWN cell and move it to the center of that cell if needed. This is mandatory for CSS atlas cropping. Every entire painted scene must fit WITHIN THE CENTRAL 72% WIDTH AND CENTRAL 72% HEIGHT of its assigned square cell. Leave at least 14% of the cell width as genuinely fully transparent margin on the left and right, and 14% of the cell height above and below. No painted specks outside this central region. All parts of each scenery remain whole and visible; do not crop. Scene centers are exactly X12.5%,37.5%,62.5%,87.5% and Y16.6667%,50%,83.3333% of the full canvas. There must be very clear broad fully transparent gutters around horizontal boundaries at33.333% and66.667%, and vertical boundaries at25%,50%,75%. NO pigment may cross those boundaries.

SOFT EDGES ARE EQUALLY MANDATORY: replace the current sharp dark cutout perimeter with a very soft airy watercolor wash fade. Within the outer 15–20% of EACH SHRUNK vignette, taper pigment opacity gradually down to zero, with gently blurred wispy watercolor brush edges and subtle translucent flecks contained within the vignette. Keep a detailed recognizable center, but let all outer foliage, sky, water and ground gently melt into GENUINE ALPHA TRANSPARENCY. Absolutely no hard scalloped edge, uniform oval boundary, outlined sticker silhouette, white fringe, dark fringe, white halo or opaque surrounding paper. The fully transparent 14% cell margins must be visually completely empty.

Keep each existing panoramic, medium and close camera view distinct and in its current correct row. Preserve the quiet foreground space for overlaid app characters. No new scenery subjects. No characters, animals, people, text, labels, numbers, grids, frames, backgrounds, checkerboard or white rectangles. Output RGBA 8-bit non-interlaced PNG with true transparent alpha, EXACT4:3 canvas.
```

#### `public/art/places-views-03.png`

Prompt guardado en `03.txt`:

```text
Use case: illustration-story.
Asset type: production transparent watercolor environment sprite atlas for a gentle children's storybook, ages 3–7.
Primary request: create ONE NEW atlas containing EXACTLY TWELVE individually painted location views, for FOUR places at THREE camera distances each. EXACT 4:3 landscape canvas, ideally 2400 × 1800 pixels, four equal columns and three equal rows, so each of the twelve cells is perfectly square. Invisible grid only: no divider lines or labels.
Input image: the provided existing location atlas is a REFERENCE ONLY for the identities, their signature landmarks and palettes, traditional watercolor brush texture and charming children's-book atmosphere. Do not duplicate the input image or use its arrangement. Follow the new four-column, three-row structure below.
Grid organization: EACH COLUMN is ONE SAME PLACE throughout all three rows. TOP ROW = PANORAMIC establishing view, from a wide distance; MIDDLE ROW = MEDIUM view, the camera moves into the place and shows its signature landmarks from a different position; BOTTOM ROW = CLOSE view, the camera is among foreground features, still recognizably inside the same location. These must be TWELVE DISTINCT painted compositions and genuine camera changes, never digital crops, repetitions, mirroring or scaled copies.
Alignment: centers at X = 12.5%, 37.5%, 62.5%, 87.5% of the entire canvas, Y = 16.6667%, 50%, 83.3333%. Each complete scene occupies the central 80% of its own square cell. Leave AT LEAST 10% of each cell width as FULLY TRANSPARENT margin on every side. All pigment must fit inside that central area. Broad fully transparent gutters separate every cell. No paint may touch or cross a cell boundary.
Style and larger presence: delicate real traditional watercolor, soft layered translucent pigments, fine pencil details only within the scenery, nuanced natural pastel palette, watercolor paper grain ONLY inside painted pigment. Rich yet uncluttered scenery that fills its central area, large readable landmarks, quiet foreground space for the app to place its separate characters.
CRITICAL SOFTER WATERCOLOR EDGES: the outer 15–20% of every painted vignette GRADUALLY FEATHERS AND DISSOLVES into genuine transparent alpha, like a wet watercolor wash running out of pigment. Very soft, uneven airy pigment transitions, semi-transparent wisps and blurred gentle brush ends. No hard scalloped sticker-cutout edge, no outlined oval, no uniform border, no white fringe or white halo. Preserve real transparency everywhere outside painted scenery.
Mood: warm, safe, welcoming, quietly magical. Retain consistent signature landmarks, time of day, architecture, lighting and palette across the three views of each place.
Constraints: true RGBA 8-bit non-interlaced PNG alpha background. Exactly twelve views in the exact grid and place order below. No people, children, animals, creatures or characters. No lettering, numbers, labels, captions, typography, grid, frame, watermark, painted background paper, white rectangle, baked checkerboard, cast shadows, cut-off scenery, harsh outlines, photorealism, 3D or glossy vector look. The center and foreground must remain open and inviting for overlaid characters.

Place identities and camera compositions:
Column 1: MEADOW, sunny soft golden-green wildflower meadow with white daisies, lilac flowers, distant lavender hills, a broad leafy tree at the left side and wide open grassy clearing. Panoramic: whole meadow with distant hills and left landmark tree. Medium: within the meadow, nearer patches of daisies flank a soft grassy path. Close: among a few foreground daisies and lilac flower stems, still an airy green meadow with the tree and hills behind, quiet open center.
Column 2: FRIENDLY CRYSTAL CAVE, welcoming warm-lilac rounded stone cave with glowing peach ambient light, lavender-blue crystal clusters, soft ochre sandy path and a broad safe opening. Panoramic: full cave entrance with pastel crystals framing it. Medium: from just inside the entrance, rounded walls and larger crystals beside a wide path. Close: a softly translucent lavender crystal cluster and smooth stone beside the path; recognizable warm glowing cave corridor beyond. No black darkness, fear or danger.
Column 3: RIVER, clear turquoise woodland stream with rounded stepping stones, low gentle waterfall in the distance, mossy riverbank rocks, sage leafy trees and small white daisies. Panoramic: river curving through the green landscape, waterfall and stepping stones visible. Medium: from near the stepping stones looking upstream toward the same tiny waterfall. Close: low beside a large smooth mossy bank stone and soft daisies, gentle water ripples and the recognizable same wooded stream receding. Open dry bank for the app's characters.
Column 4: CLOUD PALACE, ivory magical palace with lavender conical towers and small muted peach flags rising from pearly peach-lilac clouds under a soft sunset sky; safe rounded cloud paths. Panoramic: entire palace above broad drifting pastel clouds. Medium: on a welcoming cloud approach toward the larger palace gates, consistent towers. Close: from a soft cloud terrace beside an ivory arched palace window, lavender turret still visible and layered pastel clouds behind; wide quiet foreground cloud landing.
Read across EACH ROW in exactly this order: meadow, friendly crystal cave, river, cloud palace.
```

Prompt guardado en `03-cleanup.txt`:

```text
Edit this 4-column × 3-row watercolor location atlas ONLY to repair transparent gutters and precise alignment. Keep all twelve existing scenes, all details, colors, camera views, watercolor style and subject order exactly unchanged. Keep the exact 4:3 canvas, 1448 × 1086 pixels, RGBA true alpha.

Each cell is 362 × 362 pixels. Exact centers of cells are x181,543,905,1267 and y181,543,905. Put each entire existing vignette centered precisely on its own cell center. Treat every scene as one whole unit, including its feathered watercolor edge. Do not change its internal painting. The first-row vignettes must move slightly UP, and last-row vignettes slightly DOWN to be centered.

TRANSPARENCY REPAIR: REMOVE ALL the faint gray/white wash, tiny colored speckles and stray brush residue BETWEEN scenes. The spaces between scenes currently contain low-opacity pigment and must become COMPLETELY TRANSPARENT ALPHA ZERO. Each scene including its soft edge must occupy only the central 76% width and 76% height of its own cell, no bigger. Outside that area there must be ABSOLUTELY ZERO pixels of paint, zero wash, zero speckles. Each square cell has at least 12% totally transparent margin on all four sides. All scene pigment fits in these exact canvas bounding boxes:
Column1 x43–319; Column2 x405–681; Column3 x767–1043; Column4 x1129–1405.
Row1 y43–319; Row2 y405–681; Row3 y767–1043.
Nothing outside these twelve boxes. These are invisible technical boxes, do not draw rectangles or lines.
Every vignette keeps its existing soft translucent watercolor fade INSIDE its own specified bounds, then becomes fully transparent. No white or gray halo outside the scene. No opaque paper. Transparent gutters must be completely empty, not decorative texture.

No new subjects, no background, no checkerboard, no outlines, grid, text, labels or frames. Preserve all scenery complete and readable. This is a technical cleanup of the exact same art, not a new style or redesign.
```

Prompt guardado en `03-correction.txt`:

```text
Edit this watercolor location atlas. Preserve ALL TWELVE painted scenes, their exact identities, colors, beautiful traditional watercolor details, and order. Keep the exact landscape 4:3 canvas with four columns and three rows of square cells. Column identities and three view distances remain exactly unchanged.

Change ONLY the packing and outer watercolor edges. The current scenes nearly fill their cells and sometimes overlap the crop boundaries. SHRINK EACH ENTIRE VIGNETTE by 25–30% around the exact center of its OWN cell and move it to the center of that cell if needed. This is mandatory for CSS atlas cropping. Every entire painted scene must fit WITHIN THE CENTRAL 72% WIDTH AND CENTRAL 72% HEIGHT of its assigned square cell. Leave at least 14% of the cell width as genuinely fully transparent margin on the left and right, and 14% of the cell height above and below. No painted specks outside this central region. All parts of each scenery remain whole and visible; do not crop. Scene centers are exactly X12.5%,37.5%,62.5%,87.5% and Y16.6667%,50%,83.3333% of the full canvas. There must be very clear broad fully transparent gutters around horizontal boundaries at33.333% and66.667%, and vertical boundaries at25%,50%,75%. NO pigment may cross those boundaries.

SOFT EDGES ARE EQUALLY MANDATORY: replace the current sharp dark cutout perimeter with a very soft airy watercolor wash fade. Within the outer 15–20% of EACH SHRUNK vignette, taper pigment opacity gradually down to zero, with gently blurred wispy watercolor brush edges and subtle translucent flecks contained within the vignette. Keep a detailed recognizable center, but let all outer foliage, sky, water and ground gently melt into GENUINE ALPHA TRANSPARENCY. Absolutely no hard scalloped edge, uniform oval boundary, outlined sticker silhouette, white fringe, dark fringe, white halo or opaque surrounding paper. The fully transparent 14% cell margins must be visually completely empty.

Keep each existing panoramic, medium and close camera view distinct and in its current correct row. Preserve the quiet foreground space for overlaid app characters. No new scenery subjects. No characters, animals, people, text, labels, numbers, grids, frames, backgrounds, checkerboard or white rectangles. Output RGBA 8-bit non-interlaced PNG with true transparent alpha, EXACT4:3 canvas.
```

#### `public/art/places-views-04.png`

Prompt guardado en `04.txt`:

```text
Use case: illustration-story.
Asset type: production watercolor environment sprite atlas for Cuentacuentos, a cozy children's storybook app for ages 3–7.
Primary request: Generate ONE NEW atlas of exactly TWELVE separate scenery paintings, arranged in precisely FOUR equal COLUMNS and THREE equal ROWS. The output canvas must be EXACT aspect ratio 4:3, ideal 2400 × 1800 pixels, high-resolution PNG with real transparent alpha, 8-bit RGBA and non-interlaced. Every cell is square. The reference is STYLE AND PLACE IDENTITY REFERENCE ONLY. Do not reproduce its 4×2 layout. Do not merely duplicate, mirror, crop, digitally zoom or scale the original scenes: paint three distinct camera framings/perspectives of each of four same places.

Grid invariants: Every COLUMN depicts the SAME specific location in all three ROWS, with recognizable matching architecture/landmarks, materials and color palette. TOP ROW = PANORAMIC wide establishing view. MIDDLE ROW = MEDIUM view looking closer into the same place from a newly painted perspective. BOTTOM ROW = CLOSE view of the same place, foreground detail while its defining landmark remains recognizable in the background. All views must retain a quiet open foreground or center where separate app characters can stand. Exactly 12 views and no extra scenes.
Placement: centers at canvas X 12.5%, 37.5%, 62.5%, 87.5%; Y 16.6667%, 50%, 83.3333%. Each complete scene fits inside the CENTRAL 80% of its own square cell. At least 10% cell width and height must be fully transparent on ALL FOUR sides of EACH scene. Large legible scenes with consistent scale, generous transparent gutters, no overlap and zero paint at any cell border.

Style/medium: traditional delicate children's picture-book watercolor matching the reference's pastel natural colors, gentle detailed hand-painted brushwork and fine pigment grain ONLY within painted forms. Cozy, warm, safe and inviting.
Critical watercolor edge treatment: MUCH SOFTER EDGES than the reference. The outermost 15–20% of every vignette's paint should gradually feather and dissolve through translucent watercolor washes into GENUINE alpha. Soft diffuse pigment bleeds with no sharp cutout edges, no hard scalloped edge, no outlined oval, no white halo, no rectangular border. The transparency should look like softly fading watercolor and not a cut-out sticker. Sky, walls and ground feather into nothing around every vignette.
Scene/backdrop: entirely genuinely transparent outside all 12 isolated watercolor vignettes, including all gutters. NO painted sheet/paper background, white or colored rectangle, checkerboard simulation, frames, grid lines, captions, lettering, numbers, logos, watermark or cast shadows outside the scenes.
Constraints: no people, no characters, no animals, no fish. No harsh outlines, photorealism, 3D or flat vector appearance. No text anywhere. Preserve clear landmark identity across the three views in each column.

Input image: places-nature.png, used ONLY as watercolor style and identity reference for its TOP FOUR locations.
Column 1, Cascada de las Risitas / waterfall: the same gentle two-step waterfall descending over rounded mossy gray rocks into a tiny turquoise pool, green leafy banks, little white and blush daisies, and a wide calm path. TOP: wide view including both waterfall steps and quiet pool bank. MIDDLE: closer three-quarter view across the turquoise pool toward the mossy falls, the same two steps and daisies recognizable. BOTTOM: close foreground smooth mossy stones and pool edge, with the recognizable waterfall softly visible behind; quiet patch for a character.
Column 2, Bosque de Bambú Cantor / bamboo grove: the same tall green bamboo trunks, sage foliage, rounded rocks, tiny white flowers and warm ochre winding woodland path. TOP: broad establishing grove with full route between trunks. MIDDLE: look deeper along the same path from between two bamboo clusters, trunks and characteristic sage leaves. BOTTOM: close bamboo bases and rounded rocks flanking an open warm path, the same tall stalks rising in the background.
Column 3, Oasis de los Dátiles / desert oasis: the same two gently curved date palm trees, little turquoise-blue pond, golden dunes, smooth tan stones and warm pale sky. TOP: wide oasis with both palms and distant gentle dunes. MIDDLE: closer pond-bank view, both familiar palms placed coherently, clear quiet sandy foreground. BOTTOM: close smooth sand and pond rim with dates/palm foliage as subtle detail, turquoise water and the same two palms/dunes recognizable behind; no overlarge object blocking the open sand.
Column 4, Valle de los Copitos / snowy valley: the same peaceful rolling white snowy hills, small snow-covered pine trees, pale lilac mountains and gentle pink-lilac winter sky, a wide curved snow path. TOP: panoramic valley and several pines with open white path. MIDDLE: closer along the same snowy path between the familiar small pines. BOTTOM: close soft snowy bank with a little rounded stone and tiny pine branches at sides, lilac valley and pines still visible behind, generous quiet snow foreground.


Final correction prompt:
Use case: illustration-story. Edit the attached 12-view watercolor environment atlas. Preserve all twelve exact scene identities, the FOUR column order (waterfall, bamboo grove, desert oasis, snowy valley), each column's three distinct views, the THREE row order (panoramic, medium, close), colors and landmarks, genuine alpha and exact 4:3 output canvas. FIX ONLY SPRITE PACKING AND EDGE SOFTNESS: currently illustrations touch and nearly merge. Reduce EVERY WHOLE scene with all its landmarks, ground, sky and any edge pigment to fit entirely within the CENTRAL 70% of its individual square cell. Atlas invisible grid FOUR columns by THREE rows. Centers X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Mandatory large completely transparent margins of 15% of cell dimension on ALL FOUR sides of EACH scene; transparent horizontal bands along y33.333% and66.667%, transparent vertical bands along x25%,50%,75%, and transparent outer canvas edges. No paint should touch ANY cell border. Do not crop any scene, remove landmark or mix scenes. All twelve remain individual complete large watercolor paintings with broad transparent gaps. At the outermost 15–20% of every painting, gradually FEATHER the pigment through diffuse translucent watercolor washes until it DISSOLVES into genuine transparent alpha. No hard sharp or scalloped cutout edge, white halo, oval outline, paper sheet or painted background. Keep inside detail and composition intact, no grid lines, no text, no people/animals/characters, no shadow outside scenes. Save high-resolution PNG 8bitRGBA noninterlaced, ideal2400x1800, exact4:3.

Second final correction prompt:
TECHNICAL SPRITE ATLAS LAYOUT CORRECTION. Edit this same artwork preserving all twelve paintings, scene identities/colors and ordering. Most important mandatory change: SHRINK each complete painting by 40% in width and height around its own center. Every sprite currently looks too big: make every one visibly and substantially smaller with broad empty spaces between them. Reposition each smaller painting center exactly on the invisible FOUR columns THREE rows grid: X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333% of whole canvas. Output MUST be EXACT4:3 canvas,1448x1086 or2400x1800. Each of twelve cells is square. Top row wide views, middle medium views, bottom close views. Columns waterfall,bamboo grove,desert oasis,snowy valley. All three views per column are separate paintings. Keep each complete sky, ground, landmark and outer pigment strictly inside its individual cell CENTRAL60% square. Completely transparent margins20% on every side of every cell; the middle of every grid boundary MUST be an uninterrupted broad zero-alpha gap. No paint at x25%,50%,75% or y33.333%,66.667%. Even very translucent haze must stay within its own cell. All scene pixels must stay at least15%ofcell from any cell boundary. Keep lovely delicate watercolor brushwork and fine grain inside paint, dissolve the final edges gradually to transparent watercolor washes rather than outlined hard scallops. The visual result should be TWELVE small separated watercolor islands on a genuinely empty transparent canvas. Do not expand the canvases of the miniature scenes to fill the new gaps. Do not add a white or tinted paper background, haze bridges, outlines, text, labels, frame, gridlines, shadows, people or animals. Preserve transparent alpha8bitRGBA noninterlacedPNG.
```

#### `public/art/places-views-05.png`

Prompt guardado en `05.txt`:

```text
Use case: illustration-story.
Asset type: production watercolor environment sprite atlas for Cuentacuentos, a cozy children's storybook app for ages 3–7.
Primary request: Generate ONE NEW atlas of exactly TWELVE separate scenery paintings, arranged in precisely FOUR equal COLUMNS and THREE equal ROWS. The output canvas must be EXACT aspect ratio 4:3, ideal 2400 × 1800 pixels, high-resolution PNG with real transparent alpha, 8-bit RGBA and non-interlaced. Every cell is square. The reference is STYLE AND PLACE IDENTITY REFERENCE ONLY. Do not reproduce its 4×2 layout. Do not merely duplicate, mirror, crop, digitally zoom or scale the original scenes: paint three distinct camera framings/perspectives of each of four same places.

Grid invariants: Every COLUMN depicts the SAME specific location in all three ROWS, with recognizable matching architecture/landmarks, materials and color palette. TOP ROW = PANORAMIC wide establishing view. MIDDLE ROW = MEDIUM view looking closer into the same place from a newly painted perspective. BOTTOM ROW = CLOSE view of the same place, foreground detail while its defining landmark remains recognizable in the background. All views must retain a quiet open foreground or center where separate app characters can stand. Exactly 12 views and no extra scenes.
Placement: centers at canvas X 12.5%, 37.5%, 62.5%, 87.5%; Y 16.6667%, 50%, 83.3333%. Each complete scene fits inside the CENTRAL 80% of its own square cell. At least 10% cell width and height must be fully transparent on ALL FOUR sides of EACH scene. Large legible scenes with consistent scale, generous transparent gutters, no overlap and zero paint at any cell border.

Style/medium: traditional delicate children's picture-book watercolor matching the reference's pastel natural colors, gentle detailed hand-painted brushwork and fine pigment grain ONLY within painted forms. Cozy, warm, safe and inviting.
Critical watercolor edge treatment: MUCH SOFTER EDGES than the reference. The outermost 15–20% of every vignette's paint should gradually feather and dissolve through translucent watercolor washes into GENUINE alpha. Soft diffuse pigment bleeds with no sharp cutout edges, no hard scalloped edge, no outlined oval, no white halo, no rectangular border. The transparency should look like softly fading watercolor and not a cut-out sticker. Sky, walls and ground feather into nothing around every vignette.
Scene/backdrop: entirely genuinely transparent outside all 12 isolated watercolor vignettes, including all gutters. NO painted sheet/paper background, white or colored rectangle, checkerboard simulation, frames, grid lines, captions, lettering, numbers, logos, watermark or cast shadows outside the scenes.
Constraints: no people, no characters, no animals, no fish. No harsh outlines, photorealism, 3D or flat vector appearance. No text anywhere. Preserve clear landmark identity across the three views in each column.

Input image: places-nature.png, used ONLY as watercolor style and identity reference for its BOTTOM FOUR locations.
Column 1, Campo de las Mil Flores / flower field: the same open field of pastel white daisies and pink, peach and lavender wildflowers, distant green hedges, pale blue sky and an inviting grassy clearing; no forest. TOP: panoramic flower meadow with a curving clear grassy path. MIDDLE: viewpoint further along the same path, flower beds flanking a quiet center. BOTTOM: close daisies and pastel blooms around the edges with a broad open grassy foreground, the same meadow and distant hedge behind.
Column 2, Manglar de las Raíces / mangrove: the same tranquil teal lagoon surrounded by distinctive exposed brown mangrove roots, warm sage foliage and little shaded coves. TOP: wide lagoon framed by mangrove trees and branching exposed roots. MIDDLE: closer view through an arch of the same exposed roots toward quiet teal water. BOTTOM: close smooth shallow bank and a few clear mangrove roots at either side, lagoon and leafy trees recognizable behind; an open quiet foreground suitable for magical app characters.
Column 3, Arrecife de los Colores / coral reef: the same friendly underwater reef with rounded lavender, blush pink, peach and golden coral, a pale sandy path, clear turquoise-blue water and soft filtered light. TOP: wide open underwater reef with a calm pale sand clearing. MIDDLE: new viewpoint along the same sand path between rounded coral clusters. BOTTOM: close pastel rounded coral at the lateral edges of the foreground, quiet open sand in the center, matching reef formations and blue-green water behind. No fish or other sea creatures.
Column 4, Bosque de los Honguitos / mushroom grove: the same enchanted mossy woodland with a large red-capped white-spotted mushroom, smaller peach mushrooms, rounded rocks, little white daisies, soft leaves and a gentle woodland path. TOP: broad mushroom grove with large red cap as landmark and smaller peach caps. MIDDLE: new medium perspective near the same red-and-white mushroom and mossy path. BOTTOM: close soft moss and a small peach mushroom at the edge, large familiar red spotted cap recognizable behind; quiet open moss/path foreground. No scary features.

IMPORTANT LAYOUT EMPHASIS: All illustrations should be noticeably separated SMALL MINIATURE PAINTINGS inside the square cells, matching the second reference's wide empty spacing. Strict subject bounding boxes expressed as percentage of WHOLE canvas: column1 X5–20%; column2 X30–45%; column3 X55–70%; column4 X80–95%. TOP ROW all paint Y6.667–26.667%; MIDDLE ROW all paint Y40–60%; BOTTOM ROW all paint Y73.333–93.333%. Center each painting exactly at the grid's cell center. Keep scenes complete inside these boxes, no pigment or haze outside. Each scene covers CENTRAL60% of its square, with FULLY transparent20% margin per side. This technical sprite-packing rule takes priority over filling a scene cell. The separate scenes are individually displayed large in app; keep complete scenes packed at these bounds. Do not fill the negative space.
Input image 2: the already packed twelve-scene atlas, used ONLY as alignment/transparent-gutter spacing reference. Do not use its scene subjects for this new atlas.

Packing correction prompt:
TECHNICAL SPRITE ATLAS LAYOUT CORRECTION. Edit this same artwork preserving all twelve paintings, scene identities/colors and ordering. Most important mandatory change: SHRINK each complete painting by 40% in width and height around its own center. Every sprite currently looks too big: make every one visibly and substantially smaller with broad empty spaces between them. Reposition each smaller painting center exactly on the invisible FOUR columns THREE rows grid: X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333% of whole canvas. Output MUST be EXACT4:3 canvas,1448x1086 or2400x1800. Each of twelve cells is square. Top row wide views, middle medium views, bottom close views. Columns flower field,mangrove,coral reef,mushroom grove. All three views per column are separate paintings. Keep each complete sky, ground, landmark and outer pigment strictly inside its individual cell CENTRAL60% square. Completely transparent margins20% on every side of every cell; the middle of every grid boundary MUST be an uninterrupted broad zero-alpha gap. No paint at x25%,50%,75% or y33.333%,66.667%. Even very translucent haze must stay within its own cell. All scene pixels must stay at least15%ofcell from any cell boundary. Keep lovely delicate watercolor brushwork and fine grain inside paint, dissolve the final edges gradually to transparent watercolor washes rather than outlined hard scallops. The visual result should be TWELVE small separated watercolor islands on a genuinely empty transparent canvas. Do not expand the canvases of the miniature scenes to fill the new gaps. Do not add a white or tinted paper background, haze bridges, outlines, text, labels, frame, gridlines, shadows, people or animals. Preserve transparent alpha8bitRGBA noninterlacedPNG.

Centering correction prompt:
Use case: illustration-story. Make a PRECISE POSITION-ONLY technical edit to this same transparent FOUR columns THREE rows atlas. Keep all twelve separate watercolor paintings at their PRESENT SMALL SIZE, preserve scene identity, colors, all details and each distinct panoramic/medium/close view. Exact same4:3canvas,1448x1086preferred,8bitRGBA noninterlacedPNG. ONLY correct the centers of the twelve whole paintings. Current top row is too low inside its cell; MOVE ALL FOUR TOP ROW paintings UP by50pixels. Current middle row is slightly low; MOVE ALL FOUR MIDDLE ROW paintings UP by15pixels. Current bottom row is too high; MOVE ALL FOUR BOTTOM ROW paintings DOWN by30pixels. Horizontally, the firstcolumn is a little too far right;MOVE firstcolumn LEFT by20pixels, secondcolumn LEFT by8pixels,thirdcolumn RIGHT by2pixels,fourthcolumn RIGHT by10pixels. These shifts are on1448x1086canvas; proportionallyscale shiftsifresolutionchanges. Correct centers targetpixels: top(181,181),(543,181),(905,181),(1267,181); middle(181,543),(543,543),(905,543),(1267,543); bottom(181,905),(543,905),(905,905),(1267,905). Equivalently X12.5%,37.5%,62.5%,87.5%;Y16.6667%,50%,83.3333%. Keep EACH whole scene within its own360pxsquarecell CENTRAL70%;AT LEAST10%ofcell=36px fullytransparentclearance around ALL FOURSIDES ofEVERYscene. No pigment or haze bridges between scenes. Keep size presently~230pxpaintingwidth,do notenlarge,repaintorfillgaps. As an additional gentle finishing treatment, lightly feather the perimeter with diluted watercolor pigments dissolving into alpha but keep every faint edge within its owncentral70%cell. NOwhitehalo,papersheet,hardcutoutline,scallops,text,gridlines,borders,shadow,peopleoranimals. True transparentnegative space.
```

#### `public/art/places-views-06.png`

Prompt guardado en `06.txt`:

```text
Use case: illustration-story.
Asset type: production watercolor environment sprite atlas for Cuentacuentos, a cozy children's storybook app for ages 3–7.
Primary request: Generate ONE NEW atlas of exactly TWELVE separate scenery paintings, arranged in precisely FOUR equal COLUMNS and THREE equal ROWS. The output canvas must be EXACT aspect ratio 4:3, ideal 2400 × 1800 pixels, high-resolution PNG with real transparent alpha, 8-bit RGBA and non-interlaced. Every cell is square. The reference is STYLE AND PLACE IDENTITY REFERENCE ONLY. Do not reproduce its 4×2 layout. Do not merely duplicate, mirror, crop, digitally zoom or scale the original scenes: paint three distinct camera framings/perspectives of each of four same places.

Grid invariants: Every COLUMN depicts the SAME specific location in all three ROWS, with recognizable matching architecture/landmarks, materials and color palette. TOP ROW = PANORAMIC wide establishing view. MIDDLE ROW = MEDIUM view looking closer into the same place from a newly painted perspective. BOTTOM ROW = CLOSE view of the same place, foreground detail while its defining landmark remains recognizable in the background. All views must retain a quiet open foreground or center where separate app characters can stand. Exactly 12 views and no extra scenes.
Placement: centers at canvas X 12.5%, 37.5%, 62.5%, 87.5%; Y 16.6667%, 50%, 83.3333%. Each complete scene fits inside the CENTRAL 80% of its own square cell. At least 10% cell width and height must be fully transparent on ALL FOUR sides of EACH scene. Large legible scenes with consistent scale, generous transparent gutters, no overlap and zero paint at any cell border.

Style/medium: traditional delicate children's picture-book watercolor matching the reference's pastel natural colors, gentle detailed hand-painted brushwork and fine pigment grain ONLY within painted forms. Cozy, warm, safe and inviting.
Critical watercolor edge treatment: MUCH SOFTER EDGES than the reference. The outermost 15–20% of every vignette's paint should gradually feather and dissolve through translucent watercolor washes into GENUINE alpha. Soft diffuse pigment bleeds with no sharp cutout edges, no hard scalloped edge, no outlined oval, no white halo, no rectangular border. The transparency should look like softly fading watercolor and not a cut-out sticker. Sky, walls and ground feather into nothing around every vignette.
Scene/backdrop: entirely genuinely transparent outside all 12 isolated watercolor vignettes, including all gutters. NO painted sheet/paper background, white or colored rectangle, checkerboard simulation, frames, grid lines, captions, lettering, numbers, logos, watermark or cast shadows outside the scenes.
Constraints: no people, no characters, no animals, no fish. No harsh outlines, photorealism, 3D or flat vector appearance. No text anywhere. Preserve clear landmark identity across the three views in each column.

Input image: places-village.png, used ONLY as watercolor style and identity reference for its TOP FOUR locations.
Column 1, Biblioteca de los Cuentos / library: the same cozy room with low honey-colored wooden bookshelves, large round window with warm sunlight, muted sage upholstered reading chair, soft cream-and-peach round rug, little cushions and books with NO writing. TOP: wide library establishing interior showing round window, shelves, chair and rug with clear floor foreground. MIDDLE: new perspective across the rug toward the round window and chair, shelves still recognizable. BOTTOM: close cozy rug and low books at a side, familiar chair and round window in the background; spacious quiet floor for a character.
Column 2, Panadería de la Luna / bakery: the same friendly cream storefront with pink-and-cream striped pastel awning, blue-green door, warm golden bread display, terracotta flowerpots and pale stone paving; no lettering. TOP: wide bakery storefront and open pavement. MIDDLE: perspective nearer the blue-green door and warmly lit bread window beneath the same pink striped awning, quiet pavement. BOTTOM: closer shop threshold with a tidy basket of rounded bread to one side and visible bread counter, characteristic blue-green door/pink awning recognizable behind, clear floor foreground. No text/signs on walls.
Column 3, Taller de las Ideas / workshop: the same safe cozy crafting interior with low warm wooden workbench, sage-green cupboards, tidy wall shelves, colorful yarn spools and harmless materials in little colored boxes, soft sunny square window. TOP: wide workshop view with wooden table and shelves, generous open floor. MIDDLE: closer perspective looking toward the same workbench, colored boxes, pastel yarn and sunny window. BOTTOM: close low craft surface with soft fabric and colored boxes at sides, same shelves/cupboards/window recognizable behind, quiet open floor/center; no dangerous sharp tools.
Column 4, Invernadero de las Semillas / greenhouse: the same glass-roofed greenhouse with muted teal metal frame, warm terracotta pots, gentle green seedlings, pale stone path, little wooden potting table and flower baskets. TOP: broad view of the entire open greenhouse doorway/glass roof, clear path. MIDDLE: inside along the same stone path, teal frame and pots coherently repeated. BOTTOM: close terracotta seedlings at lateral edges of stone path, teal glass structure and potting table recognizable behind, clear sunny quiet foreground.

IMPORTANT LAYOUT EMPHASIS: All illustrations should be noticeably separated SMALL MINIATURE PAINTINGS inside the square cells, matching the second reference's wide empty spacing. Strict subject bounding boxes expressed as percentage of WHOLE canvas: column1 X5–20%; column2 X30–45%; column3 X55–70%; column4 X80–95%. TOP ROW all paint Y6.667–26.667%; MIDDLE ROW all paint Y40–60%; BOTTOM ROW all paint Y73.333–93.333%. Center each painting exactly at the grid's cell center. Keep scenes complete inside these boxes, no pigment or haze outside. Each scene covers CENTRAL60% of its square, with FULLY transparent20% margin per side. This technical sprite-packing rule takes priority over filling a scene cell. The separate scenes are individually displayed large in app; keep complete scenes packed at these bounds. Do not fill the negative space.
Input image 2: the already packed twelve-scene atlas, used ONLY as alignment/transparent-gutter spacing reference. Do not use its scene subjects for this new atlas.

Packing correction prompt(discarded for dimensions):
TECHNICAL SPRITE ATLAS LAYOUT CORRECTION. Edit this same artwork preserving all twelve paintings, scene identities/colors and ordering. Most important mandatory change: SHRINK each complete painting by 40% in width and height around its own center. Every sprite currently looks too big: make every one visibly and substantially smaller with broad empty spaces between them. Reposition each smaller painting center exactly on the invisible FOUR columns THREE rows grid: X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333% of whole canvas. Output MUST be EXACT4:3 canvas,1448x1086 or2400x1800. Each of twelve cells is square. Top row wide views, middle medium views, bottom close views. Columns library,bakery,workshop,greenhouse. All three views per column are separate paintings. Keep each complete sky, ground, landmark and outer pigment strictly inside its individual cell CENTRAL60% square. Completely transparent margins20% on every side of every cell; the middle of every grid boundary MUST be an uninterrupted broad zero-alpha gap. No paint at x25%,50%,75% or y33.333%,66.667%. Even very translucent haze must stay within its own cell. All scene pixels must stay at least15%ofcell from any cell boundary. Keep lovely delicate watercolor brushwork and fine grain inside paint, dissolve the final edges gradually to transparent watercolor washes rather than outlined hard scallops. The visual result should be TWELVE small separated watercolor islands on a genuinely empty transparent canvas. Do not expand the canvases of the miniature scenes to fill the new gaps. Do not add a white or tinted paper background, haze bridges, outlines, text, labels, frame, gridlines, shadows, people or animals. Preserve transparent alpha8bitRGBA noninterlacedPNG.
CENTERING EMPHASIS: top painting centers on1448x1086canvas must be181,181;543,181;905,181;1267,181. Middle centers181,543;543,543;905,543;1267,543. Bottom centers181,905;543,905;905,905;1267,905. Actual firstrow in reference is too low: when shrinking, move firstrow UP~60px,middle UP~10px,bottom DOWN~30px,andcenterhorizontalpositiontoo. Complete scenes at most230x230pixelboxes centered on those targets. Fullytransparentmarginatleast36px onALLsidesofEACH362pxsquarecell; nofaintspillingpaint. Feather perimeter from realcoloredpainttoalpha,nohardoutline,whitehalo orstickercutedge.

Final packing correction prompt:
TECHNICAL SPRITE ATLAS LAYOUT CORRECTION. Edit this same artwork preserving all twelve paintings, scene identities/colors and ordering. Most important mandatory change: SHRINK each complete painting by 40% in width and height around its own center. Every sprite currently looks too big: make every one visibly and substantially smaller with broad empty spaces between them. Reposition each smaller painting center exactly on the invisible FOUR columns THREE rows grid: X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333% of whole canvas. Output MUST be EXACT4:3 canvas,2400x1800 ideal, or any native resolution with strictly exact4:3 ratio. Each of twelve cells is square. Top row wide views, middle medium views, bottom close views. Columns library,bakery,workshop,greenhouse. All three views per column are separate paintings. Keep each complete sky, ground, landmark and outer pigment strictly inside its individual cell CENTRAL60% square. Completely transparent margins20% on every side of every cell; the middle of every grid boundary MUST be an uninterrupted broad zero-alpha gap. No paint at x25%,50%,75% or y33.333%,66.667%. Even very translucent haze must stay within its own cell. All scene pixels must stay at least15%ofcell from any cell boundary. Keep lovely delicate watercolor brushwork and fine grain inside paint, dissolve the final edges gradually to transparent watercolor washes rather than outlined hard scallops. The visual result should be TWELVE small separated watercolor islands on a genuinely empty transparent canvas. Do not expand the canvases of the miniature scenes to fill the new gaps. Do not add a white or tinted paper background, haze bridges, outlines, text, labels, frame, gridlines, shadows, people or animals. Preserve transparent alpha8bitRGBA noninterlacedPNG.
```

#### `public/art/places-views-07.png`

Prompt guardado en `07.txt`:

```text
Use case: illustration-story.
Asset type: production landscape sprite atlas for a cozy mobile children's picturebook app, ages 3–7.
Primary request: paint ONE new atlas of exactly TWELVE watercolor scene views on an EXACT 4:3 landscape canvas, ideally 2400×1800 pixels, PNG 8-bit RGBA with real alpha transparency, noninterlaced. Invisible precise grid: FOUR columns and THREE rows of equal SQUARE cells. Each COLUMN is ONE consistent location and each ROW is a different independently painted camera framing of that same place. Row 1: PANORAMIC wide establishing view; row 2: MEDIUM view closer inside the same environment; row 3: CLOSE view of a nearby landmark or detail with enough scene still visible to recognize the location. Paint distinct views with different spatial composition and depth, not repeated pictures, mirrored copies, or a simple enlarged crop.
Input image: reference atlas, STYLE AND PLACE IDENTITY REFERENCE ONLY. Preserve the original identifying landmarks and color palette, but create entirely new paintings and much softer watercolor perimeter.
Style/medium: traditional delicate children's book watercolor, fine soft pencil detailing, muted natural pastel pigments, subtly varied translucent pigment pools and authentic paper grain INSIDE paint only. Cozy, inviting, clearly legible, never frightening. Match the reference's detailed picturebook illustration style.
CRUCIAL SOFT EDGES: the outer 15–20% of each painted vignette gradually dissolves into TRUE ALPHA transparency with loose feathered wet-on-wet washes, fading softly from substantial painting to partial transparent pigment to wholly transparent negative space. NO hard scalloped silhouette, sharp cutout edge, opaque white halo, rigid oval rim, rectangular background, background paper or baked checkerboard.
Composition: precise cell centers at canvas x12.5%,37.5%,62.5%,87.5%, and y16.667%,50%,83.333%. Each scene and ALL its parts fit within central80% of its cell. Keep at least10% of each cell width/height completely transparent along all FOUR sides. Wholly transparent gutters at all cell boundaries. No overlaps. Scene scale consistent across all12 cells, full and clearly readable, with quiet open foreground space so app characters can be overlaid. Entire panoramas remain inside their cell. Blue or purple skies and water, when present, are painted ONLY inside each vignette and softly dissolve at edges.
Constraints: exactly12 views; no people, characters or animals; no lettering, text, labels, numerals, grid lines, frames, borders, watermark, cast shadows, giant plain background, white background or backdrop outside scenes. No plastic shine, 3D or vector-flat art. Final delivered PNG must have genuinely transparent background.
FOUR COLUMNS left to right; these are the FOUR lower-row places from the village reference:
COLUMN1 PLAYGROUND: a cheerful low wooden play tower with warm red pitched roof and blue slide, wooden swing frame with two small swings, safe open lawn, low fence, flowering shrubs and wooden bench. Keep red roof, blue slide and swing frame consistent across the3views. PANORAMIC: entire friendly playground and leafy park surrounds; MEDIUM: ground-level nearer red roof play tower, blue slide and swings behind, open lawn foreground; CLOSE: nearby blue slide foot and wooden support with swing frame, bench and flowering shrub readable behind, calm grassy foreground.
COLUMN2 APPLE ORCHARD: small round green apple trees holding rosy-red apples, golden winding path, a rustic low wooden fence and wicker harvest basket. Same orchard path and trees across3views. PANORAMIC: several low apple-tree rows with path leading through; MEDIUM: between two apple trees along path, basket and fence at the side; CLOSE: nearer apples and small leaf cluster at one side, tree trunk, wicker basket and orchard path still visible, clear path foreground.
COLUMN3 WINDMILL: rustic round cream stone windmill with warm terracotta conical roof and exactly four broad wooden sails, on gentle grassy mound, tiny stone wall, low fence and lavender flowers, distant pale hills. Same windmill across3views. PANORAMIC: complete windmill, gentle mound, low village plaza and hills; MEDIUM: nearer winding path to small arched mill door, four sails still readable above, quiet plaza foreground; CLOSE: arched wooden entrance and stone wall with lavender flowers, partial recognizable roof/sail construction at top, open cobbled foreground. Do not duplicate or deform sails.
COLUMN4 HARBOR: quiet calm blue-water harbor, safe wooden pier, small moored pastel sailboats with pale cream sails, warm cream coastal houses and tiny lighthouse in background. Same dock and boats across3views. PANORAMIC: harbor bay, entire small sailboats, pier and distant lighthouse; MEDIUM: view from safe pier toward nearby moored cream-sailed boat, farther lighthouse; CLOSE: nearby wooden pier planks and rounded mooring bollard at side, sailboat bow and mast, calm water and coastal houses still visible, open planked foreground. No people, no fish or birds.

CORRECTION PROMPT
Use case: precise-object-edit. Edit the supplied TWELVE-VIEW watercolor scene atlas. Preserve ALL12 exact scenes, all their details, place identities and exact4columns×3rows order, all camera views, existing colors and watercolor style. KEEP exact4:3 canvas shape and real alpha PNG transparency. Change ONLY scene packing and perimeter softness.
Critical mandatory layout repair: EVERY complete vignette must be reduced to 70% of its previous width and height and centered in its exact SQUARE4×3 grid cell. Do not crop scenes or combine them. Each cell needs15%ofcell COMPLETELY TRANSPARENT margin on ALL FOUR sides. The entire subject including feathered washes must lie INSIDE central70%ofeachcell. Exact centers x12.5%,37.5%,62.5%,87.5%; y16.667%,50%,83.333% ofcanvas. Fully transparent continuous vertical gutters at25%,50%,75%width and horizontal gutters at33.333%,66.667%height. Fully transparent outer canvas margin. REMOVE all stray pigment in margins. Existing paintings currently touch; SEPARATE them generously.
Edge correction: remove opaque white/cream halos, hard round or square vignette boundaries. Outer15%ofeachpainting's pigments softly disperse in authentic wet-on-wet watercolor washes to partially transparent pigment and then totally transparent alpha; extremely gentle fuzzy watercolor fading without a hard outline. Preserve detailed color and texture in central paintings and current open foreground for overlaid characters.
Do not repaint any place identity or change scene contents. Exactly12 separate vignettes, no added items, people, animals, backgrounds, paper, text, visible grid, border, or checkerboard. High-resolution output ideally2400×1800, exact4:3,8-bitRGBA PNG noninterlaced, genuinely transparent gutters.

SECOND PACKING CORRECTION
Use case: precise-object-edit. Production repair of this12-scene watercolor spriteatlas. Keep EXACT4:3 canvas and EXACT4columns×3rows and keep all12samepictures in the same cells. Each column is sameplace and rows retain panoramic,medium,close order.
Change ONLY packing and watercolorperimeters.
Make EVERY FULL painting dramatically SMALLER: reduce each complete scene to EXACT60%ofits current width and height. This is essential. The12paintings must be much more separated, surrounded by HUGE whollytransparentblankgutters. Each painting including anyfadedwash MUST fit inside a280×280 area if output2400×1800, or170×170area ifoutput1448×1086. Centers remain x12.5%,37.5%,62.5%,87.5%; y16.667%,50%,83.333%. No pigment at all outside these280px/170pxsquares. The transparent gutters must be roughly AS WIDE AS one-thirdofeachpainting. All12images complete and uncut. Keep quiet foreground for appcharacters.
Make each painting perimeter fluidandfeathery wet-on-wet watercolor: coloredpigments gently disappear into PARTIALALPHA, then TOTALALPHA, without ahardcircle/oval/rim. Remove ALLwhite/creamoutlineglows and allstraycoloredpixels outsidepainting. Background must be100%blankALPHA, no backgroundpaper,no grid,no shadow,no labels,no text. No newplaces, nopeopleoranimals. Keep richpastelpaintgrain and originaldetails inside, exactly12isolated scenes.
```

#### `public/art/places-views-08.png`

Prompt guardado en `08.txt`:

```text
Use case: illustration-story.
Asset type: production landscape sprite atlas for a cozy mobile children's picturebook app, ages 3–7.
Primary request: paint ONE new atlas of exactly TWELVE watercolor scene views on an EXACT 4:3 landscape canvas, ideally 2400×1800 pixels, PNG 8-bit RGBA with real alpha transparency, noninterlaced. Invisible precise grid: FOUR columns and THREE rows of equal SQUARE cells. Each COLUMN is ONE consistent location and each ROW is a different independently painted camera framing of that same place. Row 1: PANORAMIC wide establishing view; row 2: MEDIUM view closer inside the same environment; row 3: CLOSE view of a nearby landmark or detail with enough scene still visible to recognize the location. Paint distinct views with different spatial composition and depth, not repeated pictures, mirrored copies, or a simple enlarged crop.
Input image: reference atlas, STYLE AND PLACE IDENTITY REFERENCE ONLY. Preserve the original identifying landmarks and color palette, but create entirely new paintings and much softer watercolor perimeter.
Style/medium: traditional delicate children's book watercolor, fine soft pencil detailing, muted natural pastel pigments, subtly varied translucent pigment pools and authentic paper grain INSIDE paint only. Cozy, inviting, clearly legible, never frightening. Match the reference's detailed picturebook illustration style.
CRUCIAL SOFT EDGES: the outer 15–20% of each painted vignette gradually dissolves into TRUE ALPHA transparency with loose feathered wet-on-wet washes, fading softly from substantial painting to partial transparent pigment to wholly transparent negative space. NO hard scalloped silhouette, sharp cutout edge, opaque white halo, rigid oval rim, rectangular background, background paper or baked checkerboard.
Composition: precise cell centers at canvas x12.5%,37.5%,62.5%,87.5%, and y16.667%,50%,83.333%. Each scene and ALL its parts fit within central70% of its cell. Keep at least15% of each cell width/height completely transparent along all FOUR sides. Wholly transparent gutters at all cell boundaries. No overlaps. Scene scale consistent across all12 cells, full and clearly readable, with quiet open foreground space so app characters can be overlaid. Entire panoramas remain inside their cell. Blue or purple skies and water, when present, are painted ONLY inside each vignette and softly dissolve at edges.
Constraints: exactly12 views; no people, characters or animals; no lettering, text, labels, numerals, grid lines, frames, borders, watermark, cast shadows, giant plain background, white background or backdrop outside scenes. No plastic shine, 3D or vector-flat art. Final delivered PNG must have genuinely transparent background.
FOUR COLUMNS left to right; these are the FOUR top-row places from the wonder reference:
COLUMN1 CRYSTAL CAVE: welcoming open cavern with pale lavender and blue crystals, softly illuminated pale turquoise stream, mossy smooth rocks, a broad safe path and soft sunbeams from a high opening. Never dark or frightening. Preserve same lavender/blue crystal formations and stream across3views. PANORAMIC: broad cave chamber with arch, stream and full softly luminous crystal groups; MEDIUM: lower viewpoint within chamber nearer broad path and crystal group, cave arch behind; CLOSE: nearby softly faceted lavender crystals and smooth rock beside stream, wider cave opening and blue crystal groups recognizable beyond, quiet stone path foreground.
COLUMN2 FLOATING ISLAND: rounded complete floating rock base under grassy gardens, one spreading leafy green tree, gentle little waterfall flowing from turquoise stream and soft clouds beneath, safe garden path with magical low cloud railings. Keep exact same island, tree and waterfall identity. PANORAMIC: entire island suspended in clouds with complete rounded rock base; MEDIUM: ground-level view from island garden path with tree and tiny stream, cloud railings and far sky visible; CLOSE: near mossy stream bank and flower cluster, tree roots and small waterfall source visible, clouds beyond safe railing, open grassy/path foreground. Do not show an unsafe exposed cliff.
COLUMN3 ENCHANTED TOWER: slender cream stone tower with lavender/violet conical shingle roof, small arched wooden door, gentle rose vines, tiny windows, open lawn and stone path, distant pale mountains and tall narrow evergreens. This is one tower, not a castle. Preserve same roof, door and vine arrangement. PANORAMIC: complete tower with roof, lawn, tree surrounds and mountains; MEDIUM: closer ground-level tower and arched entrance beside roses, roof still apparent at top; CLOSE: friendly arched door, cream stones and roses, recognizable violet roof/window hints farther above, broad quiet stone threshold foreground.
COLUMN4 STAR OBSERVATORY: cozy cream stone observatory with rounded sage/teal metal dome open to a brass telescope, warm yellow arched windows, pale stone steps and terrace, gentle starry indigo-blue sky inside vignette, moon, soft evergreen hillside. Preserve same dome and telescope identity. PANORAMIC: full domed observatory on hill under starry sky; MEDIUM: nearer terrace and dome opening with telescope inside and warm windows, broad terrace foreground; CLOSE: near stone terrace and opened dome aperture with brass telescope, arched window and muted stars still visible beyond, quiet terrace floor foreground. No letters, no astronomical labels, no people.
Mandatory packing: scenes must be clearly isolated with broad transparent gutters. Put all paint inside exact cellbounds x3.75%-21.25%,28.75%-46.25%,53.75%-71.25%,78.75%-96.25%; rowbounds y5%-28.333%,38.333%-61.667%,71.667%-95%. Each complete feathered wash stays inside those bounds. DO NOT fill the canvas or let scenes touch each other. Exact4×3 grid has very visible empty transparent spacing, never paint outlines into margins.

SECOND PACKING CORRECTION
Use case: precise-object-edit. Production repair of this12-scene watercolor spriteatlas. Keep EXACT4:3 canvas and EXACT4columns×3rows and keep all12samepictures in the same cells. Each column is sameplace and rows retain panoramic,medium,close order.
Change ONLY packing and watercolorperimeters.
Make EVERY FULL painting dramatically SMALLER: reduce each complete scene to EXACT60%ofits current width and height. This is essential. The12paintings must be much more separated, surrounded by HUGE whollytransparentblankgutters. Each painting including anyfadedwash MUST fit inside a280×280 area if output2400×1800, or170×170area ifoutput1448×1086. Centers remain x12.5%,37.5%,62.5%,87.5%; y16.667%,50%,83.333%. No pigment at all outside these280px/170pxsquares. The transparent gutters must be roughly AS WIDE AS one-thirdofeachpainting. All12images complete and uncut. Keep quiet foreground for appcharacters.
Make each painting perimeter fluidandfeathery wet-on-wet watercolor: coloredpigments gently disappear into PARTIALALPHA, then TOTALALPHA, without ahardcircle/oval/rim. Remove ALLwhite/creamoutlineglows and allstraycoloredpixels outsidepainting. Background must be100%blankALPHA, no backgroundpaper,no grid,no shadow,no labels,no text. No newplaces, nopeopleoranimals. Keep richpastelpaintgrain and originaldetails inside, exactly12isolated scenes.
```

#### `public/art/places-views-09.png`

Prompt guardado en `09.txt`:

```text
Use case: illustration-story.
Asset type: production landscape sprite atlas for a cozy mobile children's picturebook app, ages 3–7.
Primary request: paint ONE new atlas of exactly TWELVE watercolor scene views on an EXACT 4:3 landscape canvas, ideally 2400×1800 pixels, PNG 8-bit RGBA with real alpha transparency, noninterlaced. Invisible precise grid: FOUR columns and THREE rows of equal SQUARE cells. Each COLUMN is ONE consistent location and each ROW is a different independently painted camera framing of that same place. Row 1: PANORAMIC wide establishing view; row 2: MEDIUM view closer inside the same environment; row 3: CLOSE view of a nearby landmark or detail with enough scene still visible to recognize the location. Paint distinct views with different spatial composition and depth, not repeated pictures, mirrored copies, or a simple enlarged crop.
Input image: reference atlas, STYLE AND PLACE IDENTITY REFERENCE ONLY. Preserve the original identifying landmarks and color palette, but create entirely new paintings and much softer watercolor perimeter.
Style/medium: traditional delicate children's book watercolor, fine soft pencil detailing, muted natural pastel pigments, subtly varied translucent pigment pools and authentic paper grain INSIDE paint only. Cozy, inviting, clearly legible, never frightening. Match the reference's detailed picturebook illustration style.
CRUCIAL SOFT EDGES: the outer 15–20% of each painted vignette gradually dissolves into TRUE ALPHA transparency with loose feathered wet-on-wet washes, fading softly from substantial painting to partial transparent pigment to wholly transparent negative space. NO hard scalloped silhouette, sharp cutout edge, opaque white halo, rigid oval rim, rectangular background, background paper or baked checkerboard.
Composition: precise cell centers at canvas x12.5%,37.5%,62.5%,87.5%, and y16.667%,50%,83.333%. Each scene and ALL its parts fit within central55% of its cell. Keep at least22.5% of each cell width/height completely transparent along all FOUR sides. Wholly transparent gutters at all cell boundaries. No overlaps. Scene scale consistent across all12 cells, full and clearly readable, with quiet open foreground space so app characters can be overlaid. Entire panoramas remain inside their cell. Blue or purple skies and water, when present, are painted ONLY inside each vignette and softly dissolve at edges.
Constraints: exactly12 views; no people, characters or animals; no lettering, text, labels, numerals, grid lines, frames, borders, watermark, cast shadows, giant plain background, white background or backdrop outside scenes. No plastic shine, 3D or vector-flat art. Final delivered PNG must have genuinely transparent background.
FOUR COLUMNS left to right; these are the FOUR lower-row places from the wonder reference:
COLUMN1 MOON GARDEN: gentle dusky violet garden with silver/white flowers and pale lavender blossoms, curved pale stone benches, flowering arch with small warm lantern, safe stone path and small crescent moon above distant peaceful hills. Preserve moon, benches and floral arch identity. PANORAMIC: whole garden clearing and two curved benches beneath floral arch and crescent; MEDIUM: nearer garden path between curved benches with silver flowers at sides, moon and arch behind; CLOSE: silver flowers and curved bench end at one side with lantern glow, arch and crescent still recognizable, quiet paving foreground. Calm and luminous, no dark ominous shadows.
COLUMN2 RAINBOW BRIDGE: safe wide small arching pale stone bridge with tall rounded balustrades, golden round finials, pink-green climbing flowers, arching pastel rainbow in soft blue sky and two low fluffy clouds beneath. Preserve same stone bridge, safety railings and rainbow identity. PANORAMIC: whole bridge with complete arch suspended above two gentle clouds and complete pastel rainbow; MEDIUM: viewpoint at start of wide walkway showing curved tall balustrades leading across clouds and rainbow above; CLOSE: near rounded stone balustrade and golden finial with small climbing flowers, bridge walkway and pastel rainbow still visible beyond, quiet safe paving foreground. Keep complete panorama inside cell; no gaps in protective railing.
COLUMN3 UNDERWATER PALACE: welcoming coral-pink domed palace with shell-shaped arches, pearl cream trim, pale blue columns, gently turquoise water, rounded coral gardens, glowing friendly entrance and safe broad sandy path. Same domes and shell entrance identity across3views. PANORAMIC: full friendly pink-domed palace in calm turquoise underwater environment and pastel coral sides; MEDIUM: closer broad sandy path approaching shell entrance beneath pink domes, softly rippled turquoise light above; CLOSE: nearer pearl shell arch and pink dome/columns, rounded pastel coral at side, open quiet pale sandy threshold foreground. Inviting magical breathable palace environment; no mermaids, fish, animals or people.
COLUMN4 GIANT TREE: magnificent ancient tree with immense broad golden-brown textured trunk, huge mossy roots, full rounded lush green leafy crown, soft yellow dappled light, open mossy clearing, tiny white and peach wildflowers. No tree houses or ladders. Preserve same giant tree root/trunk identity. PANORAMIC: entire giant tree and broad crown over mossy clearing, trunk huge relative to ordinary foliage; MEDIUM: closer ground-level broad trunk and curving moss-covered roots, canopy partly above, quiet clearing foreground; CLOSE: near massive warm bark and mossy root curve with small wildflower cluster, other roots/trunk still recognizable behind, soft open clearing foreground. No faces in the tree.
Mandatory packing: scenes must be clearly isolated with broad transparent gutters. Put all paint inside exact cellbounds x3.75%-21.25%,28.75%-46.25%,53.75%-71.25%,78.75%-96.25%; rowbounds y5%-28.333%,38.333%-61.667%,71.667%-95%. Each complete feathered wash stays inside those bounds. DO NOT fill the canvas or let scenes touch each other. Exact4×3 grid has very visible empty transparent spacing, never paint outlines into margins.

PACKING CORRECTION
Use case: precise-object-edit. Production repair of this12-scene watercolor spriteatlas. Keep EXACT4:3 canvas and EXACT4columns×3rows and keep all12samepictures in the same cells. Each column is sameplace and rows retain panoramic,medium,close order.
Change ONLY packing and watercolorperimeters.
Make EVERY FULL painting dramatically SMALLER: reduce each complete scene to EXACT60%ofits current width and height. This is essential. The12paintings must be much more separated, surrounded by HUGE whollytransparentblankgutters. Each painting including anyfadedwash MUST fit inside a280×280 area if output2400×1800, or170×170area ifoutput1448×1086. Centers remain x12.5%,37.5%,62.5%,87.5%; y16.667%,50%,83.333%. No pigment at all outside these280px/170pxsquares. The transparent gutters must be roughly AS WIDE AS one-thirdofeachpainting. All12images complete and uncut. Keep quiet foreground for appcharacters.
Make each painting perimeter fluidandfeathery wet-on-wet watercolor: coloredpigments gently disappear into PARTIALALPHA, then TOTALALPHA, without ahardcircle/oval/rim. Remove ALLwhite/creamoutlineglows and allstraycoloredpixels outsidepainting. Background must be100%blankALPHA, no backgroundpaper,no grid,no shadow,no labels,no text. No newplaces, nopeopleoranimals. Keep richpastelpaintgrain and originaldetails inside, exactly12isolated scenes.
```

## Ampliación de arte: 27 atlas (2026-10-11)
Lote creado con la herramienta integrada ImageGen: 10 atlas de lugares (40 lugares y 120 vistas), 7 de personajes (56) y 10 de objetos (80). Todos los PNG originales generados se guardan directamente en `public/art/`, sin recortar, redimensionar ni modificar sus píxeles mediante código. Los atlas y posiciones anteriores se conservan.
En los lugares, cada columna representa un mismo lugar. Las filas son **frontal, desde la izquierda y desde la derecha**, con escala y distancia de cámara comparables, edificios y elementos reconocibles entre las vistas. Esta elección de tres ángulos sustituye los encuadres panorámico, medio y cercano para el lote nuevo `10`–`19`. Los personajes y objetos se leen de izquierda a derecha, primero arriba y después abajo.
Los 40 escenarios del checklist final están repartidos en los diez atlas de tres ángulos, con los nombres exactos del pedido de 27 archivos:
| Grupo del checklist | Atlas entregados | Lugares |
| --- | --- | --- |
| Casa (`places-home.png`) | `places-views-10.png`, `places-views-11.png` | 8 |
| Pueblo (`places-town.png`) | `places-views-12.png`, `places-views-13.png` | 8 |
| Aventura (`places-journey.png`) | `places-views-14.png`, `places-views-15.png` | 8 |
| Guaridas (`places-lairs.png`) | `places-views-16.png`, `places-views-17.png` | 8 |
| Ensueño (`places-dream.png`) | `places-views-18.png`, `places-views-19.png` | 8 |
El checklist enumera diez atlas de objetos, aunque su encabezado dice nueve: se entregan los diez y sus 80 objetos. Los abuelos, tíos y primos de Mi familia siguen usando el creador SVG.
### Inventario y posiciones verificadas
| Archivo en `public/art/` | Cuadrícula | Columnas 1–4 o fila superior 1–4 | Fila inferior 5–8 |
| --- | --- | --- | --- |
| [places-views-10.png](../public/art/places-views-10.png) | 4×3 | Dormitorio infantil · Cocina · Baño · Sala de estar | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-11.png](../public/art/places-views-11.png) | 4×3 | Comedor · Desván · Cuarto de juegos · Porche de casa | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-12.png](../public/art/places-views-12.png) | 4×3 | Escuela · Consulta amable · Estación de tren · Mercado | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-13.png](../public/art/places-views-13.png) | 4×3 | Plaza de fiestas · Teatrito · Granja · Oficina de correos | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-14.png](../public/art/places-views-14.png) | 4×3 | Puente colgante · Cruce de caminos · Acantilado con faro · Pantano | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-15.png](../public/art/places-views-15.png) | 4×3 | Volcán dormido · Cañón · Pista de carreras con meta · Colina con vista | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-16.png](../public/art/places-views-16.png) | 4×3 | Puente del trol · Barco pirata · Nido gigante del cuervo · Cueva del ogro | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-17.png](../public/art/places-views-17.png) | 4×3 | Castillo de hielo · Rincón de telarañas · Casa del gigante en las nubes · Seta del duende | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-18.png](../public/art/places-views-18.png) | 4×3 | Mar de nubes al atardecer · Campo de luciérnagas · Estanque de nenúfares · Colina de estrellas fugaces | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [places-views-19.png](../public/art/places-views-19.png) | 4×3 | Bosque nevado de noche · Luna como barca · Playa al atardecer · Jardín de dientes de león | Las filas 2 y 3 repiten los cuatro lugares desde izquierda y derecha |
| [animals-babies.png](../public/art/animals-babies.png) | 4×2 | Pollito · Patito · Cervatillo · Osezno | Potrillo · Cría de pingüino · Tortuguita marina · Cría de foca |
| [villains-2.png](../public/art/villains-2.png) | 4×2 | Bruja del invierno · Tiburón refunfuñón · Cangrejo cascarrabias · Nube de tormenta | Rata ladrona · Espantapájaros enfadado · Mago envidioso · Serpiente presumida |
| [town-folk.png](../public/art/town-folk.png) | 4×2 | Cartera · Panadero · Maestra · Dentista amable | Jardinera · Conductor de tren · Vendedora del mercado · Guardián del faro |
| [tiny-creatures.png](../public/art/tiny-creatures.png) | 4×2 | Abeja · Mariposa · Mariquita · Hormiga | Caracol · Grillo · Luciérnaga · Libélula |
| [pets.png](../public/art/pets.png) | 4×2 | Perrito · Gatito · Pez en pecera · Hámster | Canario · Cobaya · Tortuga de tierra · Conejito de orejas caídas |
| [animals-farm.png](../public/art/animals-farm.png) | 4×2 | Vaca · Oveja · Cerdito · Gallina | Poni · Burro · Cabra · Perro pastor |
| [night-creatures.png](../public/art/night-creatures.png) | 4×2 | Murciélago · Polilla · Topo · Lirón | Oso perezoso · Zarigüeya · Armadillo · Zorro ártico |
| [objects-bedtime.png](../public/art/objects-bedtime.png) | 4×2 | Almohada · Osito de peluche · Lamparita de noche · Cepillo de dientes | Libro de cuentos · Vaso de leche · Reloj despertador · Zapatillas de casa |
| [objects-party.png](../public/art/objects-party.png) | 4×2 | Caja de regalo · Globo · Guirnalda de banderines · Carta en sobre | Corona de flores · Sombrero de fiesta · Confeti · Piñata |
| [objects-quest.png](../public/art/objects-quest.png) | 4×2 | Cofre del tesoro · Pergamino de pistas · Frasco de poción · Flor de hielo | Estrella caída · Piedra de luna · Reloj de arena · Señal de camino |
| [objects-kitchen.png](../public/art/objects-kitchen.png) | 4×2 | Tarta de cumpleaños · Galletas · Cuenco con masa · Cuchara de madera | Jarra de leche · Barra de pan · Sopa caliente · Delantal |
| [objects-sport.png](../public/art/objects-sport.png) | 4×2 | Medalla · Trofeo · Bandera de meta · Silbato | Pelota · Cuerda de saltar · Patinete · Cronómetro |
| [objects-memories.png](../public/art/objects-memories.png) | 4×2 | Baúl antiguo · Foto antigua · Peonza · Muñeca de trapo | Canicas · Caja de música · Gafas del abuelo · Avión de papel |
| [objects-firsts.png](../public/art/objects-firsts.png) | 4×2 | Bicicleta · Casco · Lonchera · Cuaderno con lápiz | Flotador · Zapatos nuevos · Pizarra pequeña · Estuche |
| [objects-calm.png](../public/art/objects-calm.png) | 4×2 | Caja de preocupaciones · Piedra lisa · Tarro de la calma · Bolsa de agua caliente | Pañuelo · Tirita · Termómetro · Flores en un vaso |
| [objects-night-sounds.png](../public/art/objects-night-sounds.png) | 4×2 | Cortina al viento · Grifo que gotea · Reloj de cuco · Campanilla de viento | Rama junto a la ventana · Puerta que cruje · Hojas secas · Tetera que silba |
| [objects-home-tools.png](../public/art/objects-home-tools.png) | 4×2 | Red · Cubo · Pala · Carretilla | Escoba · Escalera de mano · Saco · Caja de cartón |

La revisión visual del checklist incluye cama infantil, lavabo bajito, sofá y alfombra, mesa familiar, baúl y cajas en el desván, consulta acogedora, telón del teatrito, establo y buzón de correos. El puente colgante es de cuerdas y el del trol es de piedra. La cueva del ogro contiene sacos, mantas, migas y una cesta caída; el rincón tiene telarañas brillantes; la seta del duende tiene entrada al interior hueco; la luna creciente funciona como barca. Los personajes incluyen la rata con antifaz, la nube enfurruñada, el pez dentro de la pecera y el conejo de orejas caídas. Los objetos incluyen una estrella caída dorada y purpurina dentro del tarro de la calma. Todos mantienen un tono infantil amable.

### Prompts completos de los 27 atlas
Se guardan a continuación el prompt inicial y las correcciones de generación aplicadas a cada archivo. Las referencias de estilo son `places-views-01.png`, `villains.png` y `objects-explore.png`; `places-views-04.png` también orienta la separación de las viñetas de lugares.

#### `public/art/places-views-10.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Dormitorio infantil: one cozy child's bedroom with a small cream wooden bed, sage-and-peach patchwork quilt, low toy shelf, rounded window and star mobile. Keep exact bed/window/shelf arrangement continuous around three angles; roomy open floor, no child.
Column 2 — Cocina: one homey family kitchen with pastel sage lower cupboards, warm wood counter, pale blue sink under a square window, rounded little breakfast table and tidy crockery; same sink/window/cupboard arrangement at all angles, open safe floor.
Column 3 — Baño: one cheerful clean bathroom with cream freestanding rounded bathtub, powder-blue tile trim, little wooden washbasin cabinet, round mirror and fluffy peach towel; coherent room layout, no person and no lettering.
Column 4 — Sala de estar: one warm living room with a sage sofa, cream-and-peach rug, round low coffee table, bookcase and sunny window; keep identical furniture designs and their layout through front/left/right views, generous open foreground.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-11.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Comedor: one cozy dining room with a honey-colored oval family dining table, four rounded chairs, cream sideboard and sunny arched window, gentle terracotta and sage palette; same room/furniture from three angles, open foreground.
Column 2 — Desván: one welcoming bright attic under wooden sloping roof beams with a round skylight, two closed trunks, a rocking horse-shaped toy and folded blankets; warm honey and lavender, no spooky objects or creatures; same beams/skylight/trunks from three angles.
Column 3 — Cuarto de juegos: one friendly playroom with low pastel toy shelves, a little cloth play tent, wooden blocks, a cream round rug and large window; repeated recognizable designs and coherent spatial positions from three angles, broad free play floor.
Column 4 — Porche de casa: one peaceful cottage porch with cream walls, sage-green door, two wooden posts, a little bench and two terracotta flowerpots; maintain the same doorway/posts/bench design from front, left and right, quiet wide step or lawn in foreground.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.

Checklist boxes correction:
Edit this SAME transparent twelve-view watercolor atlas. Preserve all twelve small separated paintings, all THREE distinct camera angles (front top row, left middle row, right bottom row), same scene sizes/positions/colors/lighting, EXACT4:3canvas and FOUR columns×THREE rows layout. Change ONLY the attic scenes in COLUMN2: add two small closed pale cardboard storage boxes next to the familiar blue chest and wooden trunk, placed coherently in all three angles. The attic must visibly include an old chest AND storage boxes. Boxes stay entirely INSIDE the existing painted attic miniature, never in the transparent gutters; do not enlarge any vignette or spread pigment. Keep dining room, playroom and porch columns unchanged. Very soft watercolor edges, real genuine transparent alpha, absolutely NO pigment alpha>=32 on ANY cell boundary; preserve generous margins and all12vignettes complete. Transparent8bitRGBA noninterlacedPNG, exact4:3ratio, no text, labels, people, characters, added scenery or animals.
```

#### `public/art/places-views-12.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Escuela: one gentle small school building with cream plaster, coral-pink tiled roof, blue double doors, rounded windows, a tiny bell and open sunny courtyard; no signs/letters, no pupils; the same façade and entrance from three directions.
Column 2 — Consulta amable: one reassuring pastel medical room with a low rounded examination couch, warm wooden desk, pale blue cupboard, round window and a few simple harmless medical objects, no needle; no people or lettering; warm clean inviting room with clear floor, the same room from three directions.
Column 3 — Estación de tren: one charming small railway station with a sage-and-cream shelter, terracotta roof, rounded clock face without lettering, wooden platform bench and a little stationary pale blue train; same station/platform/train geometry from front, left, right; no people or text.
Column 4 — Mercado: one friendly outdoor market square with three little stalls and pastel cream, peach and sage awnings, baskets of apples, pears and bread, low stone paving and quiet open walkway; same stalls and awning designs from three directions, no merchants or letters.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-13.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Plaza de fiestas: one cheerful village party square with pale stone paving, a small round fountain, pastel bunting stretched between two poles, little flower beds and a distant cream cottage; no partygoers or text; preserve fountain/bunting/building layout from three directions, open foreground.
Column 2 — Teatrito: one cozy little open-air puppet-style theater stage with curved warm wooden proscenium, dusty-rose curtains, low benches and a little step, no puppets or performers; same stage/curtain design in front, left, right views, warm inviting mood.
Column 3 — Granja con establo: one gentle farm with a small cream stable barn with red-brown roof and an OPEN rounded doorway showing safe hay-lined wooden stalls inside, a wooden fence, tiny vegetable plot, haystack and open earthy courtyard; no animals or farmers; same barn/fence/plot geography from three angles.
Column 4 — Oficina de correos: one charming village post office with cream stone façade, a muted blue door, one red rounded mailbox, a little parcel counter visible through an open window and flowerpots; no signs, words, stamped labels or people; same mailbox/door/window layout from three angles.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-14.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Puente colgante: one safe gently curved hanging footbridge with warm wooden planks, thick tidy rope rails, strong rounded wooden posts over a shallow turquoise stream; mossy grassy banks and open approach; front/left/right angles of the same bridge, never precarious or frightening.
Column 2 — Cruce de caminos: one welcoming fork of three broad ochre paths through soft grassy countryside with a little blank wooden direction post, daisies and one rounded leafy tree; no writing on signs; preserve branching geometry and landmark tree from three angles.
Column 3 — Acantilado con faro: one peaceful grassy seaside cliff with rounded cream lighthouse topped by a coral roof and pale blue lantern, tiny stone path and calm turquoise sea; safe welcoming rounded landforms, no dangerous precipice foreground; same lighthouse/cliff from three angles.
Column 4 — Pantano: one gentle sunlit wetland with shallow sage-teal pools, reeds, rounded mossy stones, distant willow and a small safe wooden boardwalk; warm friendly pastel scenery, no scary fog or creatures; same pools/willow/boardwalk geography from three angles.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-15.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Volcán dormido: one peaceful dormant rounded volcanic mountain, warm ochre and dusty rose slopes, a green grassy foothill path and tiny closed crater, pale blue sky; no smoke, lava or eruption; same mountain/crater/path from front, left, right, gentle and safe.
Column 2 — Cañón: one calm pastel sandstone canyon with rounded terracotta and peach cliffs, a broad safe sandy floor and a shallow winding turquoise stream; gentle sage plants; same canyon curves and distinctive rounded rock arch from three angles, no frightening sharp drops.
Column 3 — Pista de carreras con meta: one cheerful small outdoor race track made from a wide ochre dirt loop on green lawn, a simple finish arch with a pastel checkered pennant, tiny rounded stands and open foreground; no words, numerals, competitors or vehicles; same loop and finish arch from three directions.
Column 4 — Colina con vista: one peaceful rounded grassy hill with a broad gentle path, low wooden bench and one small leafy tree overlooking pastel countryside and distant lilac mountains; same hilltop tree/bench/path from three angles, safe open grassy foreground.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-16.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Puente de piedra del trol: one cozy storybook rounded stone bridge over a little clear stream, mossy stone arch with a tiny arched dwelling door below its side, daisies and broad grassy approach; no troll or other character; same recognizable stone arch/door geography from three angles, never frightening.
Column 2 — Barco de la gata pirata: one friendly little wooden pirate sailing ship with rounded warm brown hull, cream patched sails, dusty-rose pennant without emblem, safe wooden deck, small rail and calm blue water; no people, weapons or skulls; front-left/right views of the exact same ship with hull/mast/sail arrangement continuous.
Column 3 — Nido gigante del cuervo: one giant cozy nest of twigs perched in the low branches of an enormous gentle old oak, with a few tiny shiny harmless colored pebbles among twigs, a broad path below; no crow or eggs with faces; same nest/tree branch geometry viewed from three directions, inviting and safe.
Column 4 — Cueva desordenada del ogro: one welcoming broad bright cave mouth in a rounded mossy hill, a slightly untidy wooden pantry shelf inside with pumpkins and bread, a few harmless empty sacks and rumpled soft blankets in the lateral corners, scattered tiny bread crumbs and a toppled empty rounded basket at one side, visibly charming messy den, soft warm light and wide open dirt clearing; no ogre, bones, weapons or darkness; exact same cave/food shelf design from three angles.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-17.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Castillo de hielo: one friendly small ice castle with three rounded pale blue icy towers, translucent lavender accents, a broad arched doorway, snowy rounded courtyard and soft sky; no sharp threatening spires or people; same tower count, gate and layout from three angles.
Column 2 — Rincón de telarañas brillantes: one friendly sunlit mossy woodland corner with a large delicate dew-spangled silvery spiderweb between two low curved branches, soft flowers and an open path; no spider or other creature; web and branch geometry continuous across three angles, not spooky.
Column 3 — Casa del gigante en las nubes: one large cozy cream cottage with a pastel peach rounded roof and oversized blue door on a soft grassy cloud island, gentle cloud puffs and tiny wide porch; no giant, faces or precarious scary ledge; same cottage/island/door design from three angles.
Column 4 — Seta hueca del duende: one cozy mushroom house shaped as a big coral-red mushroom cap with cream dots over a warm cream stem, tiny round sage OPEN door revealing a hollow warm interior and a little round window, moss, daisies and an open leaf path; no elf; same door/window positions and cap design from front/left/right, warm and magical.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

Packing correction:
Use case: illustration-story. Technical packing edit to this SAME transparent 12-scene atlas, not new scenery.
Preserve every exact place identity, all landmark designs and pastel colors, FOUR columns and THREE rows, and the twelve DISTINCT camera angles. TOP ROW remains front view, MIDDLE from the left, BOTTOM from the right, with the SAME camera distance. Do not mirror, zoom-crop, change the angle, simplify or discard scene details.
MANDATORY change: uniformly SHRINK EACH WHOLE PAINTING by 50% in BOTH width and height. The current paintings nearly fill their squares; they must become visibly much smaller, isolated miniature watercolor paintings with WIDE empty gutters. Each complete vignette, including all sky/ground/walls/soft edge pigment, must fit STRICTLY within the CENTRAL50% of its own equal square cell. Invisible grid EXACTLY FOUR equal columns × THREE equal rows on an EXACT4:3canvas, ideal2400×1800, or any native resolution with STRICTLY EXACT4:3ratio. Centers exactly X12.5%,37.5%,62.5%,87.5%; Y16.6667%,50%,83.3333%. Center EVERY whole painting, not its floor line. In particular, first row must be higher than currently, so its center is16.6667% ofcanvasheight, not22%.
Leave COMPLETELY CLEAR zero-alpha25%cell margins on all FOUR sides of each miniature. Mandatory continuous empty transparent bands along x25%,50%,75% and y33.333%,66.667% of canvas, with absolutely NOpaint at any cell border, including very faint diluted haze. No overlap or clipping. Do not add paint to fill empty gaps. Keep all12scenes complete.
Finish with very soft watercolor pigment edges that gradually dissolve into genuine alpha within each miniature's bounds, no hard scalloped cutout edge, white halo, oval border, sticker outline, paper or rectangular backdrop. Transparent PNG,8bitRGBA,noninterlaced. No text, labels, numerals, gridlines, frames, shadows outside scenes, people or creatures. Do not alter the canvas ratio.
```

#### `public/art/places-views-18.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Mar de nubes al atardecer: one tranquil sea of soft cream and lavender clouds beneath a peach-pink sunset, a small safe rounded grassy overlook with one little wooden bench; same overlook/cloud formations/sun direction coherently from front/left/right, gentle quiet foreground.
Column 2 — Campo de luciérnagas: one peaceful twilight meadow with rounded pale grass, little white and pink flowers, a curving path, distant leafy hedge and tiny warm golden firefly LIGHT DOTS floating softly within the scene; no visible insect bodies, no people; same meadow/path from three directions, inviting blue-lilac night.
Column 3 — Estanque de nenúfares: one calm small turquoise pond with round sage lily pads and peach/white waterlily blossoms, a few rounded bank stones, reeds and a soft curved grassy shore; preserve distinctive pads/shore/reeds identity from three angles, quiet bank foreground.
Column 4 — Colina de estrellas fugaces: one rounded safe grassy hill with a little curved bench and small tree under a gentle pale indigo night sky with three delicate golden shooting stars, distant lavender mountains; same hill/tree/bench and sky mood from three directions, peaceful and welcoming.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

CORRECTION PROMPT:
Edit ONLY atlas packing and transparent margins in this exact watercolor scenery atlas. Preserve ALL TWELVE existing paintings, their four place identities, landmarks, colors, lighting, soft watercolor details and row-major order. Each column is one place; retain row1 FRONT, row2 LEFT-SIDE, row3 RIGHT-SIDE views at the same camera distance. Do not change the internal scene composition, redraw a zoom series, mirror, duplicate, or lose any landmark. Exact 4:3 landscape canvas, four columns and three rows, RGBA8 PNG with genuine alpha.

MANDATORY PACKING CORRECTION: REDUCE EACH ENTIRE PAINTED VIGNETTE TO HALF ITS CURRENT WIDTH AND HALF ITS CURRENT HEIGHT, including ALL its outer translucent watercolor edges and speckles. Treat each painting as one whole unit, not a crop. Center the shrunken whole painting EXACTLY at its own cell center: X12.5%,37.5%,62.5%,87.5%, Y16.6667%,50%,83.3333% of the canvas. Each of the twelve paintings must be SMALL and completely isolated, occupying no more than the CENTRAL60% WIDTH AND CENTRAL60% HEIGHT of its own square cell. At least20% of each cell width and height is EMPTY FULLY TRANSPARENT ALPHA ZERO margin on every side. Do not expand the paintings to fill that empty space.

REMOVE ALL the low-opacity color wash, white or gray halo, bright colored fringes and stray pigment speckles BETWEEN the twelve vignettes. There must be broad uninterrupted EMPTY transparent gutters around every vertical boundary at X25%,50%,75%, and horizontal boundary at Y33.333%,66.667%. NO PIXEL of watercolor, even a faint speck, may touch a cell boundary or a canvas edge. No residue or background wash in these margins. Retain the beautiful soft watercolor fade INSIDE each reduced vignette, tapering pigment to transparent alpha before the empty margin.

Do not introduce any new objects, characters, animals, text, labels, numbers, frames, grid, shadows, white paper, opaque background or checkerboard. Preserve complete uncut scenery and all three real directions. This is technical spacing cleanup of the same art, not a redesign.
```

#### `public/art/places-views-19.png`

```text
Use case: illustration-story.
Asset: ONE production landscape sprite atlas for Cuentacuentos, ages 3–7.
Create EXACTLY TWELVE separate watercolor scenery paintings on one landscape canvas in EXACT aspect ratio 4:3, ideally 2400 × 1800. Transparent PNG, 8-bit RGBA, non-interlaced. The invisible layout is FOUR equal columns and THREE equal rows; every cell is square. No visible grid lines.
References: Image 1 is a layout reference ONLY: use its generous transparent spaces between small vignettes. Image 2 is a watercolor style reference ONLY: match its gentle hand-painted pigment grain, natural pastel colors, cozy storybook atmosphere. Create entirely NEW locations below.

The FOUR columns each show ONE specific place three times. TOP ROW: view from directly in front. MIDDLE ROW: new camera angle from the LEFT side, looking diagonally toward the same central landmark. BOTTOM ROW: new camera angle from the RIGHT side, looking diagonally toward the same central landmark. Camera distance, elevation, lens, and apparent scale must stay comparable between rows. These are THREE DIFFERENT ANGLES, never a panoramic/medium/close series, never zoom crops, duplicates, mirrored images or merely shifted details. Preserve the same location geometry, landmark designs, colors and spatial relationships coherently as the viewer moves around it. All landmarks remain recognizable in all three angles.

Critical packing: Paint SMALL complete vignettes, each inside the CENTRAL 60% of its own square cell, centered EXACTLY at cell center. At least 20% of cell width and height on EVERY side is completely transparent. Whole-canvas centers X:12.5%,37.5%,62.5%,87.5%; Y:16.6667%,50%,83.3333%. Strict paint bounds: column 1 X5–20%, column 2 X30–45%, column 3 X55–70%, column 4 X80–95%. Top row Y6.667–26.667%, middle row Y40–60%, bottom row Y73.333–93.333%. Even very faint paint stays inside these bounds. Broad uninterrupted transparent vertical and horizontal gutters; absolutely ZERO alpha on all cell boundaries. No painting or pigment touches or crosses a cell border. Complete uncut scenes; do not enlarge scenes to fill empty spaces. These vignettes will be displayed separately at large size in the app.

Style: traditional delicate children's picture-book watercolor, detailed but soft pastel pigment, gentle sunlight and fine grain only within paint. Very softly diluted, feathered outer edges: the outer 15–20% of each vignette gradually dissolves through translucent watercolor washes into true alpha. No sharp or hard scalloped cutout border, white halo, sticker edge or oval outline. Ground, sky and walls fade to transparency around each separate scene. Cozy, warm, safe and inviting, never frightening. Quiet clear foreground space inside each painting for app characters to stand.

Background: TRUE alpha transparency outside all twelve scenery paintings, including all gutters. No paper sheet, white rectangle, checkerboard, tinted backdrop, grid lines, frames, text, captions, numbers, logos, watermark or cast shadows beyond a vignette. No people, characters or animals unless a location explicitly requires tiny firefly light dots; no faces on objects. No photorealism, 3D, flat vector shapes or harsh outlines.

Subjects, exact column order:
Column 1 — Bosque nevado de noche: one gentle snowy woodland at night with small rounded snow-covered pine trees, a wide curved white path, pale lilac distant hills and soft indigo moonlit sky; tiny warm glints of light in snow, no danger or figures; same trees/path geometry from three angles.
Column 2 — Luna creciente como barca: one dreamy large pale golden crescent moon gently floating like a boat on a quiet lavender-blue cloud lake, a little smooth cloud dock and delicate distant stars; no person or face; the same crescent moon-boat and dock from front/left/right, comparable camera distance, safe tender magical mood.
Column 3 — Playa al atardecer: one peaceful sandy beach with calm turquoise waves, a softly curved cream shoreline, one small rounded driftwood piece and distant pastel lilac headland under peach-pink sunset; same shoreline/driftwood/headland from three angles, broad quiet sandy foreground.
Column 4 — Jardín de dientes de león: one sunny gentle garden with soft sage grass, fluffy white dandelion seed heads, tiny yellow flowers, a curved stepping-stone path and a low warm wooden gate; a few delicate seeds drifting only inside the vignette; same path/gate geometry from three directions, no people or animals.
Final reminder: ALL three rows must depict front / left / right ANGLES at the SAME camera distance, never a zoom sequence. Every scene is fully contained inside the CENTRAL60% of its cell; all painting edges gently fade into genuine alpha before the completely empty transparent gutters.

CORRECTION PROMPT:
Edit ONLY atlas packing and transparent margins in this exact watercolor scenery atlas. Preserve ALL TWELVE existing paintings, their four place identities, landmarks, colors, lighting, soft watercolor details and row-major order. Each column is one place; retain row1 FRONT, row2 LEFT-SIDE, row3 RIGHT-SIDE views at the same camera distance. Do not change the internal scene composition, redraw a zoom series, mirror, duplicate, or lose any landmark. Exact 4:3 landscape canvas, four columns and three rows, RGBA8 PNG with genuine alpha.

MANDATORY PACKING CORRECTION: REDUCE EACH ENTIRE PAINTED VIGNETTE TO HALF ITS CURRENT WIDTH AND HALF ITS CURRENT HEIGHT, including ALL its outer translucent watercolor edges and speckles. Treat each painting as one whole unit, not a crop. Center the shrunken whole painting EXACTLY at its own cell center: X12.5%,37.5%,62.5%,87.5%, Y16.6667%,50%,83.3333% of the canvas. Each of the twelve paintings must be SMALL and completely isolated, occupying no more than the CENTRAL60% WIDTH AND CENTRAL60% HEIGHT of its own square cell. At least20% of each cell width and height is EMPTY FULLY TRANSPARENT ALPHA ZERO margin on every side. Do not expand the paintings to fill that empty space.

REMOVE ALL the low-opacity color wash, white or gray halo, bright colored fringes and stray pigment speckles BETWEEN the twelve vignettes. There must be broad uninterrupted EMPTY transparent gutters around every vertical boundary at X25%,50%,75%, and horizontal boundary at Y33.333%,66.667%. NO PIXEL of watercolor, even a faint speck, may touch a cell boundary or a canvas edge. No residue or background wash in these margins. Retain the beautiful soft watercolor fade INSIDE each reduced vignette, tapering pigment to transparent alpha before the empty margin.

Do not introduce any new objects, characters, animals, text, labels, numbers, frames, grid, shadows, white paper, opaque background or checkerboard. Preserve complete uncut scenery and all three real directions. This is technical spacing cleanup of the same art, not a redesign.
```

#### `public/art/animals-babies.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

EXACT subjects top row left to right:
(1) a tiny fluffy yellow CHICK, little orange pointed beak, two short orange legs, small wings and rounded baby body, cheerful face;
(2) a fluffy cream-yellow DUCKLING, distinctly broad flat orange duck beak, two visible orange WEBBED feet and a short soft duck tail, sweet face, distinct from chick;
(3) a gentle brown FAWN, big soft ears, tiny white coat spots, four slender full legs with rounded hooves, no antlers, complete tail;
(4) a cuddly small honey-brown BEAR CUB, round ears, soft cream muzzle and chubby paws, full body sitting or standing, innocent expression.
Bottom row left to right:
(5) a little warm chestnut FOAL, short pale mane, four full slender legs with rounded hooves and full soft tail, no tack, tiny baby proportions;
(6) a fluffy gray-and-cream BABY PENGUIN, round head, short black beak, little flippers, two stubby visible feet, no adult dramatic markings;
(7) a cute very young SEA TURTLE, soft sage shell with muted cream pattern, rounded head and FOUR broad swimming flippers visibly distinct from land tortoise legs, all limbs complete;
(8) a cuddly BABY SEAL, soft cream-white fur, round muzzle, two short front flippers and softly paired back flippers, entire body visible. No water or surrounding ice.
Eight separate baby animals, no clothing or additional toys.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact baby animals, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current animals are too large and some touch the middle crop boundary. Make EVERY COMPLETE animal HALF its current width and HALF its current height, and CENTER each entire animal in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the animal. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire animal and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: chick, duckling, fawn, bear cub. Bottom row: foal, baby penguin, baby sea turtle, baby seal. Exactly eight separate full figures, no overlap. Keep the fawn and foal's four full legs; sea turtle has four flippers.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra animals. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.
```

#### `public/art/villains-2.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

Gentle redeemable antagonists: mischievous, grumpy or worried but harmless, never terrifying. Match villain reference expressions and watercolor quality.
EXACT subjects top row left to right:
(1) a female WINTER WITCH with pale silver hair, a soft icy-blue pointed hat, lavender-blue long cloak, rosy nose and pursed mildly grumpy smile, mittens, full feet visible, no weapons, no broom;
(2) a round pale blue-gray GRUMBLING SHARK, full friendly side/three-quarter body with complete fins and tail, tiny frown but NO visible sharp teeth or open predatory mouth, no water;
(3) a small warm coral-orange CRANKY CRAB, two rounded friendly claws, all short legs contained, tiny crossed expression, never realistic frightening;
(4) a fluffy blue-gray STORM CLOUD character with a small pouty friendly face and a compact few pale raindrops contained directly beneath, no lightning, everything wholly within its cell.
Bottom row left to right:
(5) a little gray THIEVING RAT with rounded ears, soft full tail curled close to body, a tiny plain fabric pouch held in its paws, cheeky apologetic smile, no weapon;
(6) a grumpy-but-friendly SCARECROW with floppy straw hat, patched moss-green shirt and warm brown trousers, soft straw tufts, simple face with an annoyed eyebrow, complete body and soft boots, no pole;
(7) a male ENVIOUS WIZARD, short soft beard, muted plum pointed hat and robe, folded arms and pouty lips, complete feet visible, no staff/weapon, never malicious;
(8) a proud PRETENTIOUS SNAKE, small sage-green rounded coiled full body with short head raised, pastel golden scarf held close around neck, smug-but-friendly smile, no fangs, no tongue sticking out.
No scary details or magic attacks. Each is full isolated character, consistent apparent size, no scenery.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact gentle antagonists, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current characters are too large and some touch the middle crop boundary. Make EVERY COMPLETE character HALF its current width and HALF its current height, and CENTER each entire character in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the character. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire character and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: female winter witch, grumbling shark, cranky crab, storm cloud. Bottom row: thieving rat, angry scarecrow, envious male wizard, pretentious snake. Exactly eight separate full figures, no overlap. Keep the shark's complete fins and tail, the cloud's complete raindrops, and every character's full hat, ears, feet and tail. Preserve the harmless grumpy/mischievous expressions. No fangs or weapons.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra characters. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.

RAT EYE MASK AND SULKY CLOUD DETAILS
Use case: precise-object-edit.
Edit ONLY TWO small character details in this transparent watercolor atlas. Preserve the exact 2:1 canvas, four columns and two rows, every character's position and full silhouette, all eight characters, their order, their colors, their sizes, generous existing transparent margins and genuine alpha background. Preserve the watercolor style.
In bottom-row FIRST cell, the small gray thieving rat must wear a simple soft CHARCOAL EYE MASK with two large eye openings: a tiny friendly cartoon burglar mask fitted around its existing eyes, with a fine strap around its head. Keep its sweet cheeky face, pouch, full tail, ears, clothes and body exactly as they are. The mask makes it a harmless storybook thief, never scary.
In top-row FOURTH cell, the blue-gray storm cloud must look MILDLY SULKY AND GRUMPY, with gently angled eyebrows and a little pout; keep the cute face, blush, rounded full cloud silhouette and contained raindrops. No lightning, no frightening expression.
ALL SIX other characters remain unchanged, including the female winter witch, full shark with no teeth, crab, scarecrow, male wizard and full coiled snake. No extra marks, scenery, backgrounds, shadows, text, grid or weapons. Keep PNG 8-bit RGBA noninterlaced and all cell boundaries fully transparent.
```

#### `public/art/town-folk.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

EXACT subjects top row left to right; preserve specified adult genders. Humans have gentle rounded picturebook proportions, natural modest clothes, complete arms and feet and cozy helpful expressions:
(1) a female MAIL CARRIER, dusty blue cardigan/jacket and soft cap, warm brown shoulder satchel, holding one blank envelope, smiling;
(2) a male BAKER, cream chef cap, warm cream shirt and dusty peach apron, holding one small loaf of bread, rosy cheeks;
(3) a female TEACHER, warm lavender cardigan and sage skirt/trousers, holding a little closed book with completely blank cover, friendly gentle smile;
(4) a male KIND DENTIST, pale blue coat over warm cream clothes, no mask hiding face, holding one little friendly tooth model as a prop, no frightening medical instruments.
Bottom row left to right:
(5) a female GARDENER, soft straw sunhat, sage-green apron, terracotta trousers, holding a small potted seedling, welcoming smile;
(6) a male TRAIN CONDUCTOR, muted navy cap and jacket with brass buttons, warm brown trousers, holding a small plain ticket/card with NO text, cheerful helpful face;
(7) a female MARKET VENDOR, dusty peach blouse and sage apron, holding one small basket of soft colorful produce, warm friendly face;
(8) a male LIGHTHOUSE KEEPER, pale cream cable-knit sweater, muted blue cap and warm boots, holding a small brass lantern, gentle beard and welcoming face.
No stand, backdrop, scenery or other people. Clothing diverse in soft natural colors, no logos or writing. Props stay close to each character and fit completely inside its own central 60% of the cell.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact town people, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current persons are too large and some touch the middle crop boundary. Make EVERY COMPLETE person HALF its current width and HALF its current height, and CENTER each entire person in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the person. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire person and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: female mail carrier, male baker, female teacher, male kind dentist. Bottom row: female gardener, male train conductor, female market vendor, male lighthouse keeper. Preserve all genders, complete props, full hands, hats, arms, legs and shoes; exactly eight separate full figures with no overlap.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra persons. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.
```

#### `public/art/tiny-creatures.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

EXACT subjects top row left to right, make each insect/creature a charming complete fullbody sprite at same apparent scale as others, all anatomy soft and friendly:
(1) a chubby honey-yellow BEE with soft charcoal stripes, two tiny translucent pale blue wings, six tiny legs and full rounded antennae, gentle friendly face, no stinger shown;
(2) a pastel peach-and-lavender BUTTERFLY with all FOUR rounded wings open, thin soft body, delicate curled antennae and friendly face;
(3) a round rosy-red LADYBUG with muted dark spots on closed wing covers, tiny black head, six short soft legs and contained antennae;
(4) a little warm terracotta ANT with recognizable head, thorax and rounded abdomen, six tiny legs and complete short curved antennae, friendly face, no carrying objects.
Bottom row left to right:
(5) a sage-and-cream SNAIL, complete soft body with warm brown spiral shell, two raised eye stalks and short second pair of feelers, no slime trail;
(6) a small moss-green CRICKET, complete rounded body, two folded long back jumping legs and four tiny front legs, short full antennae curving inside its cell, friendly eyes;
(7) a gentle FIREFLY, warm olive body, small complete wings and legs, pale golden glowing abdomen; all glow contained inside creature silhouette, no surrounding glow/cloud;
(8) a pastel blue-and-lavender DRAGONFLY, full long slender body, all FOUR translucent rounded wings and six tiny legs, short antennae, wide friendly eyes.
No leaves, branches, scenery, flowers, sky or additional objects. Each tiny creature enlarged consistently for recognizable friendly storybook scale, isolated on real alpha transparency.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact tiny creatures, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current creatures are too large and some touch the middle crop boundary. Make EVERY COMPLETE creature HALF its current width and HALF its current height, and CENTER each entire creature in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the creature. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire creature and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: bee, butterfly, ladybug, ant. Bottom row: snail, cricket, firefly, dragonfly. Preserve all complete wings, antennae, legs, body segments, eyes, snail stalks and shell. Exactly eight separate complete creatures with no overlap.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra creatures. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.
```

#### `public/art/pets.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

EXACT subjects top row left to right:
(1) a cuddly golden-brown PUPPY, floppy ears, cream muzzle and chest, complete short paws and tail, sweet gentle face, no collar tag writing;
(2) a small cream-and-ginger KITTEN, round face, little ears, complete paws and full tail curling close to body, friendly eyes;
(3) one small friendly orange GOLDFISH inside one small COMPLETE round clear glass FISHBOWL, pale turquoise water fully contained within bowl, one little soft aquatic sprig inside bowl, no stand or water outside; fish and bowl together are one sprite and entirely within own cell;
(4) a small golden-and-cream HAMSTER, soft round cheeks, round ears, complete little paws, full body sitting, no food props.
Bottom row left to right:
(5) a small yellow CANARY, pale orange short beak and two visible little feet, full wings and complete short tail, no cage, perch or scenery;
(6) a cuddly brown-and-cream GUINEA PIG, round full body, little rounded ears, complete small paws, no long tail;
(7) a little LAND TORTOISE, warm brown/sage domed shell and FOUR sturdy short walking legs with round toes, full head and small tail, clearly distinct from sea turtle;
(8) a cuddly cream-and-dusty-peach LOP-EARED RABBIT with two long ears hanging downward at the sides, complete chubby paws and small full tail, gentle baby face.
No clothing, cages, floor or toy props. All isolated full animals with consistent apparent scale, fishbowl wholly within margins.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact pets, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current pets are too large and some touch the middle crop boundary. Make EVERY COMPLETE pet HALF its current width and HALF its current height, and CENTER each entire pet in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the pet. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire pet and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: puppy, kitten, goldfish inside complete glass fishbowl, hamster. Bottom row: canary, guinea pig, land tortoise, lop-eared rabbit. Preserve all full tails, ears, legs, feet, shell, fins and entire fishbowl; exactly eight separate complete pet sprites with no overlap. The fishbowl stays one whole sprite, including all contained water and plants, with no separate surrounding water.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra pets. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.
```

#### `public/art/animals-farm.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

EXACT subjects top row left to right:
(1) a gentle cream COW with muted warm brown patches, soft small curved horns, rounded muzzle, FOUR full sturdy legs and complete tail held close;
(2) a cuddly white-and-cream SHEEP with fluffy round fleece, soft gray muzzle, four complete little legs, no large horns;
(3) a cheerful dusty-pink PIGLET, round little snout, short full ears, four complete short legs and contained curly tail, no clothing;
(4) a warm cream-and-terracotta HEN with soft red comb, complete closed feathered wings, full soft tail and two short legs, no nest or eggs.
Bottom row left to right:
(5) a friendly little chestnut PONY, short pale mane, four complete compact legs and full soft tail, round picturebook proportions, no saddle;
(6) a friendly soft gray DONKEY with long full upright ears, pale muzzle, four complete short legs and full tail tucked close, no tack;
(7) a friendly cream GOAT with small gentle curved horns, short beard, four complete small legs and contained full tail;
(8) a gentle black-white-and-tan SHEPHERD DOG, soft border-collie coloring, attentive eyes, four full paws and complete fluffy tail, no hat or human clothing.
All entire animals in soft natural three-quarter poses, same apparent scale even cow and hen, no grass, hay, barn, fences or scenery.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact farm animals, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current animals are too large and some touch the middle crop boundary. Make EVERY COMPLETE animal HALF its current width and HALF its current height, and CENTER each entire animal in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the animal. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire animal and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: cow, sheep, piglet, hen. Bottom row: pony, donkey, goat, shepherd dog. Preserve each animal's complete horns, long ears, four full legs/paws, mane and entire tail; hen has two complete feet. Exactly eight separate complete farm animals with no overlap.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra animals. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.
```

#### `public/art/night-creatures.png`

```text
Use case: illustration-story.
Asset type: production character sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: ONE precisely aligned FOUR-column × TWO-row atlas, EXACT landscape aspect ratio 2:1 and eight equal SQUARE cells, containing exactly EIGHT distinct COMPLETE FULL-BODY characters in the specified order. Deliver PNG 8-bit RGBA, genuine alpha transparency, noninterlaced. Create new subjects, not copies of reference characters.
Input reference: use the supplied existing character atlas ONLY for its traditional watercolor medium, pastel natural pigments, endearing expressive eyes and warm storybook charm. Match this established illustration set.
Mandatory invisible grid and packing: column centers are x12.5%,37.5%,62.5%,87.5% of canvas width; row centers y25%,75%. Each COMPLETE silhouette, including tails, ears, wings, antennae, props, hat and feet, fits ONLY within CENTRAL60% width and height of its own SQUARE cell. Leave at least20% of every cell FULLY TRANSPARENT on all four sides. No pigment may touch any cell edge or spill into its neighbors. Same apparent character scale throughout, full uncropped body and generous transparent gutters. Do not draw the grid. Exact eight distinct subjects, row-major order.
Style/medium: delicate traditional hand-painted children's book watercolor, soft irregular pigment edges, translucent color variation, subtle authentic watercolor paper grain ONLY inside painted figures, minimal fine pencil details, muted sage, dusty peach, warm cream, pale blue, lavender and natural soft browns. Friendly rounded proportions, gentle eyes and inviting expression, clearly legible at small size. Full front or subtle three-quarter poses, all feet/paws visible. Cozy ages 3–7.
Scene/backdrop: real transparent alpha background. Separate isolated figures with wholly transparent negative space and gutters. NO surrounding paper, white background, checkerboard, floor, scenery, vignette, frame, text, letters, labels, numbers or watermark. Do not paint cast shadows beyond the figures. No harsh outlines, plastic gloss, 3D, vector-flat style, realistic scary faces, weapons, blood or sharp exposed teeth.

EXACT subjects top row left to right, nocturnal and quiet animals must remain adorable, friendly and never frightening:
(1) a cuddly lavender-gray BAT, full rounded head and body, two fully visible small wings softly spread, big friendly ears, little feet, no visible sharp teeth, no cave;
(2) a warm cream-and-dusty-peach MOTH with four softly patterned fuzzy wings open and complete feathery antennae, gentle small body, no moon;
(3) a little taupe MOLE, velvety fur, round pink nose, tiny friendly eyes, complete soft broad front paws and full short legs, no sharp exposed claws or shovel;
(4) a cuddly small DORMOUSE, warm brown fur, round ears, cream belly, large sleepy kind eyes and a full fluffy tail curled close, distinct from hamster.
Bottom row left to right:
(5) a gentle gray-brown SLOTH, rounded cream face patch, full body sitting upright with all arms and legs visible, rounded paws and no sharp extended claws, no branch;
(6) a friendly pale gray OPOSSUM, cream face, pink round nose and complete long pale pink tail curled CLOSE around its full body, small ears and all paws visible, no scary teeth;
(7) a small warm sandy ARMADILLO, softly rounded segmented armor shell, long soft ears, full short legs and complete tail curled close, never sharp;
(8) a friendly white-and-pale-lavender ARCTIC FOX, fluffy winter coat, small ears, warm gentle eyes, four complete paws and full fluffy tail curving CLOSE around body, no snow scenery.
No clothing, night backgrounds, branches, scenery or moons. All eight complete and isolated, full tails/wings/antennae within generous margins.

PACKING CORRECTION
Use case: precise-object-edit.
Repair ONLY the layout of this eight-character watercolor atlas. Preserve all eight exact gentle night creatures, colors, details, friendly expressions and exact order. Preserve genuine PNG alpha transparency and the EXACT 2:1 landscape canvas with FOUR columns and TWO rows of equal SQUARE cells.
The current creatures are too large and some touch the middle crop boundary. Make EVERY COMPLETE creature HALF its current width and HALF its current height, and CENTER each entire creature in its exact cell. This substantial reduction is mandatory. No cropping and no change inside the creature. Include the entire ears, tail, flippers and feet in the resize.
Precise centers: x12.5%,37.5%,62.5%,87.5% of full canvas; y25%,75%. Every entire creature and all watercolor fringe must fit within central 55% of the cell, leaving 22.5% completely empty transparent margin above, below, left and right. Exact allowed painted bounds in canvas percentages: columns x5.625–19.375%,30.625–44.375%,55.625–69.375%,80.625–94.375%; rows y11.25–38.75%,61.25–88.75%. These are invisible technical bounds, DO NOT draw boxes. All background and gutters outside those eight boxes MUST be alpha zero, no speckles.
Top row left to right: bat, moth, mole, dormouse. Bottom row: sloth, opossum, armadillo, arctic fox. Preserve all complete wings, antennae, ears, shell/body segments, full arms/legs and entire tails. Exactly eight separate complete night creatures with no overlap. Keep the mole and sloth claws gentle and rounded, never frightening.
No scenery, floor, shadow, background paper, checkerboard, grid, lines, labels, letters, words, new objects or extra creatures. Preserve watercolor style and warm color. Keep PNG 8-bit RGBA, noninterlaced, ratio exactly 2:1.
```

#### `public/art/objects-bedtime.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Almohada: one plump cream sleeping pillow, soft pale blue piping, no bed.
2. Osito de peluche: one small warm brown teddy bear toy sitting, round ears and stitched gentle face, no additional toy.
3. Lamparita de noche: one little bedside night light with a simple golden crescent-shaped shade on a small sage base, gentle warm glow confined inside its silhouette.
4. Cepillo de dientes: one pastel aqua toothbrush, entire handle and soft white bristles shown, no tube.
BOTTOM ROW, left to right:
5. Libro de cuentos: one closed cozy terracotta storybook with a simple painted moon-and-star cover decoration, no letters or writing.
6. Vaso de leche: one small clear glass filled with white milk, no other food.
7. Reloj despertador: one round old-fashioned dusty rose alarm clock with two bells, plain clock hands and small abstract hour dots, no numerals or lettering.
8. Zapatillas de casa: one compact PAIR of soft sage-green slippers, side by side as a single sprite.

CORRECTION PROMPT:
Correct ONLY spacing and transparent margins in this watercolor 4-column × 2-row object atlas. Preserve all EIGHT exact objects, all details, colors, subjects and row-major order. Keep the exact wide 2:1 canvas, eight square cells, RGBA 8-bit non-interlaced PNG and true transparent background.

MANDATORY technical correction: shrink EACH ENTIRE object, including all straps, ribbons, bristles, cloth edges and attached parts, by approximately 25% around the exact center of its OWN square cell. CENTER each complete object exactly at top-row X12.5%,37.5%,62.5%,87.5% / Y25%, and bottom-row same X / Y75% of the whole canvas. Each object must fit in the CENTRAL60% width and CENTRAL60% height of its assigned cell, with at least20% cell width and height as COMPLETELY EMPTY ALPHA ZERO margin on ALL FOUR SIDES.

Remove every stray watercolor speck or low-opacity pigment from the margins. Absolutely no pixel of pigment, no dot, no ribbon tip, no edge fringe, nothing may touch any cell boundary. Make broad continuous fully transparent gutters at canvas X25%,50%,75% and Y50%. Every object and every attached part stays whole and complete, never cropped. Do not move anything into a neighboring cell.

Preserve the exact charming watercolor style and eight identities. Do not add any objects, text, numbers, borders, grid, background paper, shadows or checkerboard. This is the same art with safer packing, not a redesign.
```

#### `public/art/objects-party.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Caja de regalo: one peach gift box with a soft sage ribbon and bow, complete lid, no letters.
2. Globo: one pale lavender inflated party balloon with a short curved ribbon, the ENTIRE ribbon contained in its central cell area.
3. Guirnalda de banderines: one short curved string of FIVE pastel triangular bunting flags, all complete, no lettering, both short string ends visible and contained.
4. Carta en sobre: one cream envelope with a pale peach letter partly peeking out, no text or address.
BOTTOM ROW, left to right:
5. Corona de flores: one ring-shaped flower crown of small pink blossoms and green leaves, no head or person.
6. Sombrero de fiesta: one small striped peach-and-sage cone party hat with a soft pompom, no lettering.
7. Confeti: one compact centered CLUSTER of a few pastel confetti paper squares and curls, no particles outside the central cell area.
8. Piñata: one colorful papier-mâché FIVE-POINTED STAR piñata with gentle pastel fringe and very short ribbons, complete star and all fringe contained, no people or stick.

CORRECTION PROMPT:
Correct ONLY spacing and transparent margins in this watercolor 4-column × 2-row object atlas. Preserve all EIGHT exact objects, all details, colors, subjects and row-major order. Keep the exact wide 2:1 canvas, eight square cells, RGBA 8-bit non-interlaced PNG and true transparent background.

MANDATORY technical correction: shrink EACH ENTIRE object, including all straps, ribbons, bristles, cloth edges and attached parts, by approximately 25% around the exact center of its OWN square cell. CENTER each complete object exactly at top-row X12.5%,37.5%,62.5%,87.5% / Y25%, and bottom-row same X / Y75% of the whole canvas. Each object must fit in the CENTRAL60% width and CENTRAL60% height of its assigned cell, with at least20% cell width and height as COMPLETELY EMPTY ALPHA ZERO margin on ALL FOUR SIDES.

Remove every stray watercolor speck or low-opacity pigment from the margins. Absolutely no pixel of pigment, no dot, no ribbon tip, no edge fringe, nothing may touch any cell boundary. Make broad continuous fully transparent gutters at canvas X25%,50%,75% and Y50%. Every object and every attached part stays whole and complete, never cropped. Do not move anything into a neighboring cell.

Preserve the exact charming watercolor style and eight identities. Do not add any objects, text, numbers, borders, grid, background paper, shadows or checkerboard. This is the same art with safer packing, not a redesign.
```

#### `public/art/objects-quest.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Cofre del tesoro: one small wooden treasure chest with brass edging and lid slightly open, a few golden coins visibly INSIDE the chest, no scattered coins outside.
2. Pergamino de pistas: one short cream parchment scroll partially unrolled, simple abstract dotted path and tiny mountain symbols, NO letters or words, entire rolled ends contained.
3. Frasco de poción: one little round glass potion bottle with cork and pale lilac liquid, no label, no bubbles outside.
4. Flor de hielo: one delicate crystalline pale blue flower on a very short translucent stem, all petals and stem contained.
BOTTOM ROW, left to right:
5. Estrella caída: one small five-pointed warm golden fallen star with subtly rounded corners, no trailing comet tail or extra sparkles.
6. Piedra lunar: one smooth rounded pearly lavender moonstone with a subtle crescent marking, no stars around it.
7. Reloj de arena: one small antique wooden hourglass with golden sand, full top and bottom shown.
8. Señal de camino: one small short wooden wayfinding post with two arrow-shaped boards pointing opposite directions, NO text or letters, complete base.
```

#### `public/art/objects-kitchen.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Tarta de cumpleaños: one little round cream birthday cake with peach frosting and three short pastel candles, complete cake, flames tiny and fully contained.
2. Galletas: one compact GROUP of three round golden cookies with tiny dark chocolate dots, no plate, no other food.
3. Cuenco de masa: one simple sage ceramic mixing bowl holding soft golden dough, no extra whisk.
4. Cuchara de madera: one complete short wooden cooking spoon with round bowl and warm brown grain, no pot.
BOTTOM ROW, left to right:
5. Jarra de leche: one small cream ceramic milk jug with a rounded handle and tiny spout, milk visible at the mouth, no lettering.
6. Barra de pan: one complete golden crusty baguette with three soft scoring lines, horizontal or gently diagonal, no cut slices.
7. Sopa caliente: one small terracotta soup bowl filled with golden soup and two SHORT gentle steam curls close above it, all steam contained well inside the central cell area, no spoon.
8. Delantal: one small folded-friendly pale blue cooking apron fully spread, straps and waist ties SHORT and fully contained, no person.
```

#### `public/art/objects-sport.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Medalla: one small golden medal on a SHORT folded sage-and-peach ribbon, a simple star relief, no letters or numbers, entire ribbon contained.
2. Trofeo: one small golden trophy cup with two rounded handles and a short wooden base, no engraving.
3. Bandera de meta: one small black-and-cream checkered finish flag on a short complete wooden pole with rounded base, no scenery.
4. Silbato: one little silver-blue whistle with a small ring, no long lanyard.
BOTTOM ROW, left to right:
5. Pelota: one soft blue-and-peach child's rubber ball with simple broad panels, no logo.
6. Cuerda de saltar: one COMPLETE short jumping rope arranged in a neat compact oval loop with two small wooden handles alongside it, all rope contained in its central square area.
7. Patinete: one complete small sage kick scooter with two wheels, a short upright peach handlebar and deck, NO rider, full handlebar and both wheels visible.
8. Cronómetro: one small round brass stopwatch with a top button, plain dark hands and abstract tick marks, no numerals or letters.
```

#### `public/art/objects-memories.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Baúl antiguo: one small antique dark honey-colored wooden trunk with curved lid and brass latch, complete closed trunk.
2. Foto antigua: one small sepia vintage photograph with softly scalloped cream paper edge, showing a tiny recognizable OLD FAMILY HOUSE and a tree, no people, no lettering, no frame beyond the photo itself.
3. Peonza: one complete old-fashioned wooden spinning top with muted peach and sage painted bands, tiny spindle and pointed base.
4. Muñeca de trapo: one small cloth rag doll toy with yarn hair, stitched gentle face, simple peach dress and short fabric arms and legs, complete body.
BOTTOM ROW, left to right:
5. Canicas: one compact GROUP of four rounded translucent glass marbles with subtle blue and gold swirls, all grouped at the cell center.
6. Caja de música: one small wooden music box with lid raised, tiny simple brass musical mechanism INSIDE, no extra dancer figure and no floating notes.
7. Gafas del abuelo: one pair of gently worn gold-rimmed round grandfather spectacles, temples partly folded and fully contained, no person.
8. Avión de papel: one complete folded cream paper airplane with delicate fold lines, gently diagonal, no motion trail.
```

#### `public/art/objects-firsts.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Bicicleta: one COMPLETE small sage-green child's bicycle with peach saddle and handlebars, two wheels, all parts visible, no rider and no background.
2. Casco: one small rounded pale blue bicycle helmet with a few ventilation slots and SHORT chin straps contained, no head or person.
3. Lonchera: one small peach lunchbox with a tiny sage handle and latch, closed, no writing.
4. Cuaderno con lápiz: one closed cream-and-sage school notebook and one SHORT ochre pencil resting diagonally on it, a compact paired object, no text.
BOTTOM ROW, left to right:
5. Flotador: one small round peach inflatable swimming ring with a subtle sage stripe, no person, no water.
6. Zapatos nuevos: one compact PAIR of little tan-and-cream children's shoes, short laces, side by side, full shoes.
7. Pizarra pequeña: one little sage-framed rectangular school chalkboard, plain dark green surface with a tiny simple star drawing, no lettering or numbers, no easel.
8. Estuche: one small pale blue zippered pencil case, closed, short zipper tab, no extra pens outside.

CORRECTION PROMPT:
Correct ONLY spacing and transparent margins in this watercolor 4-column × 2-row object atlas. Preserve all EIGHT exact objects, all details, colors, subjects and row-major order. Keep the exact wide 2:1 canvas, eight square cells, RGBA 8-bit non-interlaced PNG and true transparent background.

MANDATORY technical correction: shrink EACH ENTIRE object, including all straps, ribbons, bristles, cloth edges and attached parts, by approximately 25% around the exact center of its OWN square cell. CENTER each complete object exactly at top-row X12.5%,37.5%,62.5%,87.5% / Y25%, and bottom-row same X / Y75% of the whole canvas. Each object must fit in the CENTRAL60% width and CENTRAL60% height of its assigned cell, with at least20% cell width and height as COMPLETELY EMPTY ALPHA ZERO margin on ALL FOUR SIDES.

Remove every stray watercolor speck or low-opacity pigment from the margins. Absolutely no pixel of pigment, no dot, no ribbon tip, no edge fringe, nothing may touch any cell boundary. Make broad continuous fully transparent gutters at canvas X25%,50%,75% and Y50%. Every object and every attached part stays whole and complete, never cropped. Do not move anything into a neighboring cell.

Preserve the exact charming watercolor style and eight identities. Do not add any objects, text, numbers, borders, grid, background paper, shadows or checkerboard. This is the same art with safer packing, not a redesign.
```

#### `public/art/objects-calm.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Caja de preocupaciones: one small reassuring peach cardboard keepsake box with a lid and simple little heart drawing, no text, no floating thoughts.
2. Piedra lisa: one smooth oval sage-gray river stone, softly rounded, no background.
3. Tarro de calma: one clear small glass calming jar with a sage lid, pale blue water and a few tiny gold flecks INSIDE, no particles outside the jar.
4. Bolsa de agua caliente: one soft dusty rose hot-water bottle with a ribbed knitted cover and tiny cap, complete full bottle, no cord.
BOTTOM ROW, left to right:
5. Pañuelo: one small cream handkerchief folded into a soft triangular shape with pale blue edging.
6. Tirita: one friendly little peach adhesive bandage strip with a cream padded center and tiny perforation dots, complete rounded ends.
7. Termómetro: one small white-and-sage digital thermometer with a short rounded tip and blank pale blue display, no numbers or letters, no fever indicators.
8. Flores en vaso: one small clear glass holding three short-stemmed pink and lavender flowers with a few green leaves, complete grouped arrangement, no petals outside.
```

#### `public/art/objects-night-sounds.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Cortina al viento: one COMPLETE SMALL MINI-OBJECT VIGNETTE of a little square cream window frame, a short curtain rod and TWO pale blue curtains billowing gently inward. No wall, room or exterior scenery. Entire window, curtain rod and all cloth contained well inside its own cell.
2. Grifo que gotea: one isolated small brass water faucet with a SHORT spout and two tiny blue droplets close below it, all contained; no sink, wall or room.
3. Reloj de cuco: one small complete wooden cuckoo clock with a triangular roof, round clock face, plain hands and abstract hour dots, one tiny decorative wooden cuckoo peeking from its door, SHORT pendulum, no numbers or letters.
4. Campanilla de viento: one short compact wind chime with a small wooden top, THREE tiny brass tubes and a sage leaf-shaped wind catcher, all strings short and all parts contained.
BOTTOM ROW, left to right:
5. Rama junto a ventana: one COMPLETE SMALL MINI-OBJECT VIGNETTE of a little rectangular cream window frame with a short leafy branch brushing its outer edge. No surrounding wall, house or full scene, all leaves and branch ends contained in this one cell.
6. Puerta que cruje: one COMPLETE SMALL MINI-OBJECT VIGNETTE of a small honey-colored wooden door slightly ajar in its simple freestanding cream frame, tiny brass handle, no wall, hallway, room or sound text. Full door and frame contained.
7. Hojas secas: one compact centered GROUP of three warm ochre, rust and brown dried autumn leaves, complete stems and edges, no scattered debris outside.
8. Tetera que silba: one little sage tea kettle with a complete curved handle and short spout, two SHORT soft steam curls directly above the spout, all steam contained in central cell area, no stovetop.

CORRECTION PROMPT:
Correct ONLY spacing and transparent margins in this watercolor 4-column × 2-row object atlas. Preserve all EIGHT exact objects, all details, colors, subjects and row-major order. Keep the exact wide 2:1 canvas, eight square cells, RGBA 8-bit non-interlaced PNG and true transparent background.

MANDATORY technical correction: shrink EACH ENTIRE object, including all straps, ribbons, bristles, cloth edges and attached parts, by approximately 25% around the exact center of its OWN square cell. CENTER each complete object exactly at top-row X12.5%,37.5%,62.5%,87.5% / Y25%, and bottom-row same X / Y75% of the whole canvas. Each object must fit in the CENTRAL60% width and CENTRAL60% height of its assigned cell, with at least20% cell width and height as COMPLETELY EMPTY ALPHA ZERO margin on ALL FOUR SIDES.

Remove every stray watercolor speck or low-opacity pigment from the margins. Absolutely no pixel of pigment, no dot, no ribbon tip, no edge fringe, nothing may touch any cell boundary. Make broad continuous fully transparent gutters at canvas X25%,50%,75% and Y50%. Every object and every attached part stays whole and complete, never cropped. Do not move anything into a neighboring cell.

Preserve the exact charming watercolor style and eight identities. Do not add any objects, text, numbers, borders, grid, background paper, shadows or checkerboard. This is the same art with safer packing, not a redesign.
Keep the curtain billowing visibly, the tap droplets, the cuckoo and pendulum, the three wind-chime tubes, the branch beside its entire window, the ajar door inside its complete frame, the dry leaves, and the whistling kettle steam; EVERY attached part belongs INSIDE its object's same central60% area. No surrounding rooms or scenery.
```

#### `public/art/objects-home-tools.png`

```text
Use case: illustration-story.
Asset type: production watercolor object sprite atlas for a cozy children's picturebook app, ages 3–7.
Primary request: create ONE NEW image with EXACTLY EIGHT distinct complete isolated objects, in an EXACT WIDE 2:1 canvas, FOUR equal columns and TWO equal rows, eight SQUARE cells, no visible grid. Ideal 2400 × 1200 pixels; exact 2:1 aspect ratio is mandatory.
Input image: the provided objects-explore.png atlas is ONLY a STYLE REFERENCE for delicate hand-painted watercolor, nuanced natural colors, subtle pencil details, fine paper grain inside the paint, softness and warm storybook charm. Create the NEW objects specified below. Do not reproduce the reference objects.
Composition: each entire complete object, including handles, straps, ropes, tassels, antennae, steam, droplets and other attached parts, must fit entirely INSIDE THE CENTRAL 60% WIDTH AND CENTRAL 60% HEIGHT of its own square cell. Keep at least 20% of the cell width and height as FULLY TRANSPARENT empty margin on all four sides. Nothing touches a cell boundary. No part crosses into another cell, and no overlapping objects. Exact cell centers: X12.5%,37.5%,62.5%,87.5% of the full canvas and Y25%,75%. Objects centered at these points, consistent readable scale. Small paired/grouped items requested below are ONE compact sprite centered together.
Background: TRUE transparent alpha, fully transparent alpha-zero space around every object and in broad continuous horizontal and vertical gutters. No white paper, no gray wash, no checkerboard, no backdrop, no floor, no frame, no grid, no text, letters, numbers or watermark. NO cast shadows, no stray specks outside an object's silhouette. Subtle natural watercolor softness remains inside the isolated object edges.
Style: traditional watercolor picturebook illustration, gentle warm natural pastel colors, delicate pigment grain and restrained pencil details, lovingly painted and readable even as small icons. Objects softly angled for depth, never flat vector, 3D plastic or photorealism. Cozy, reassuring and safe.
Constraints: RGBA 8-bit non-interlaced PNG with actual transparency. EXACTLY eight specified subjects in the exact row-major order. No extra objects or people, except a requested toy doll or the complete minimal object grouping stated below. All silhouettes and all attached parts are completely visible and uncut. Generous margins are essential for CSS atlas cropping. No scenery or full rooms; a window/curtain/door requested below must be a SMALL COMPLETE INDEPENDENT MINI-OBJECT VIGNETTE contained in one cell.

Exact subjects and cell order:
TOP ROW, left to right:
1. Red: one small friendly catching net with a SHORT wooden handle and pale cream mesh in a round sage rim, complete rim and handle, no animals.
2. Cubo: one small sage metal bucket with a complete arched handle and softly rounded base, empty, no water splashes.
3. Pala: one small garden shovel with a SHORT honey-colored wooden shaft, rounded grip and pale blue metal blade, complete whole tool.
4. Carretilla: one COMPLETE small sage garden wheelbarrow with ONE front wheel, two SHORT wooden handles and two rear supports, empty basin, no person or background.
BOTTOM ROW, left to right:
5. Escoba: one complete SHORT traditional broom with an ochre wooden handle and soft golden bundled straw bristles, no dust or trail.
6. Escalera de mano: one small COMPLETE portable wooden stepladder, four broad rungs and gently spread rear support, compact, all legs and top contained, no person.
7. Saco: one small softly rounded cream burlap sack gathered and tied at the top with a SHORT brown string, no spilled contents and no lettering.
8. Caja de cartón: one small warm tan cardboard box with its four flaps partly open, empty, complete corners, no label or tape text.

CORRECTION PROMPT:
Correct ONLY spacing and transparent margins in this watercolor 4-column × 2-row object atlas. Preserve all EIGHT exact objects, all details, colors, subjects and row-major order. Keep the exact wide 2:1 canvas, eight square cells, RGBA 8-bit non-interlaced PNG and true transparent background.

MANDATORY technical correction: shrink EACH ENTIRE object, including all straps, ribbons, bristles, cloth edges and attached parts, by approximately 25% around the exact center of its OWN square cell. CENTER each complete object exactly at top-row X12.5%,37.5%,62.5%,87.5% / Y25%, and bottom-row same X / Y75% of the whole canvas. Each object must fit in the CENTRAL60% width and CENTRAL60% height of its assigned cell, with at least20% cell width and height as COMPLETELY EMPTY ALPHA ZERO margin on ALL FOUR SIDES.

Remove every stray watercolor speck or low-opacity pigment from the margins. Absolutely no pixel of pigment, no dot, no ribbon tip, no edge fringe, nothing may touch any cell boundary. Make broad continuous fully transparent gutters at canvas X25%,50%,75% and Y50%. Every object and every attached part stays whole and complete, never cropped. Do not move anything into a neighboring cell.

Preserve the exact charming watercolor style and eight identities. Do not add any objects, text, numbers, borders, grid, background paper, shadows or checkerboard. This is the same art with safer packing, not a redesign.
```

### Comprobación de los PNG finales
Los diez atlas de lugares miden 1448×1086 (4:3); los otros diecisiete miden 1774×887 (2:1). Los 27 son PNG de 8 bits RGBA, no entrelazados, con alfa cero real y todas las figuras completas dentro de su celda. El margen siguiente es la menor distancia de cualquier pigmento con alfa ≥32 al borde de su celda, calculada sobre todas las celdas de cada archivo. Todos los márgenes son positivos.

| Archivo | Transparencia total (alfa 0) | Margen mínimo (alfa ≥32) |
| --- | --- | --- |
| `places-views-10.png` | 30.13 % | 27 px |
| `places-views-11.png` | 54.74 % | 14 px |
| `places-views-12.png` | 36.3 % | 20 px |
| `places-views-13.png` | 48.07 % | 15 px |
| `places-views-14.png` | 59.26 % | 24 px |
| `places-views-15.png` | 50.94 % | 15 px |
| `places-views-16.png` | 64.31 % | 32 px |
| `places-views-17.png` | 61.96 % | 23 px |
| `places-views-18.png` | 58.33 % | 2 px |
| `places-views-19.png` | 49.78 % | 31 px |
| `animals-babies.png` | 80.44 % | 34 px |
| `villains-2.png` | 76.59 % | 36 px |
| `town-folk.png` | 80.39 % | 44 px |
| `tiny-creatures.png` | 80.74 % | 52 px |
| `pets.png` | 76.93 % | 49 px |
| `animals-farm.png` | 80.97 % | 62 px |
| `night-creatures.png` | 75.46 % | 27 px |
| `objects-bedtime.png` | 81.93 % | 53 px |
| `objects-party.png` | 81.4 % | 40 px |
| `objects-quest.png` | 69.81 % | 17 px |
| `objects-kitchen.png` | 67.55 % | 30 px |
| `objects-sport.png` | 70.1 % | 11 px |
| `objects-memories.png` | 65.12 % | 20 px |
| `objects-firsts.png` | 76.79 % | 41 px |
| `objects-calm.png` | 70.15 % | 24 px |
| `objects-night-sounds.png` | 80.6 % | 29 px |
| `objects-home-tools.png` | 83.68 % | 61 px |

La revisión visual coteja las 256 celdas nuevas con el pedido y el checklist final. `npm test` comprueba las historias y preferencias; `npm run build` exige y valida los 53 atlas totales, incluyendo este lote completo, y copia los nuevos PNG al contenido publicado y al caché sin conexión.
