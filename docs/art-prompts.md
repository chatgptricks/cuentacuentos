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
