# Cuentacuentos

Una biblioteca infantil para leer juntos en el teléfono o el iPad, en español y pensada para edades de 3 a 7 años.

**App:** https://chatgptricks.github.io/cuentacuentos/

Cuatro libros en un estante: Aventura, Acción, Relax y Amigos. Mamá o papá elige 3, 6 o 9 minutos y genera un cuento con su propia portada. Cada página tiene una oración corta y una pequeña ilustración compuesta con piezas reutilizables. La lectura llena la pantalla; en iPad horizontal se muestran dos páginas con el lomo en el centro. Los controles flotan en los márgenes y las ilustraciones tienen sonidos al tocarlas.

## Catálogo y cuentos

- 12 personajes, con nombres, género gramatical y sonidos
- 12 lugares de acuarela
- 12 elementos que se combinan con personajes y lugares
- 18, 36 o 54 páginas, según la duración elegida
- Cuatro estructuras distintas y planes coherentes que conservan personajes, lugares, objetivo y objetos hasta el final

Los tiempos son aproximados e incluyen leer, mirar las ilustraciones y detenerse para jugar. Acción incluye la muerte tranquila de un personaje secundario anciano, una despedida explícita, redención y esperanza. La pantalla de preparación lo avisa a la persona adulta.

La generación es local y procedural: no usa un servicio de IA en cada lectura. Los cuentos, las ilustraciones y los sonidos funcionan sin conexión tras la primera carga completa. La app guarda el último cuento y la página de lectura en ese dispositivo. No hay cuentas ni un backend.

## Desarrollo

Necesita Node.js 22 o posterior. No hace falta instalar dependencias para ejecutar o compilar.

```sh
npm test
npm run build
npm run dev
```

La vista local está en http://localhost:4173/cuentacuentos/. `npm run build` copia las fuentes y recursos a `dist` y crea un service worker con una versión calculada a partir del contenido. El workflow de GitHub Actions ejecuta las pruebas, compila y publica `dist` en GitHub Pages al subir cambios a `main`.

## Archivos

- `src/story-engine.js`: catálogo, selección con semilla y estructuras narrativas
- `src/app.js`: estante, preparación, portada, lectura y composición de ilustraciones
- `src/style.css`: interfaz pastel y libro a pantalla completa
- `src/audio.js`: efectos suaves y música ambiental original sintetizada
- `public/art/`: atlas de acuarela generados, con transparencia
- `public/manifest.webmanifest` y `public/icons/`: instalación como PWA
- `scripts/build.mjs`: build y caché offline
- `scripts/verify-stories.mjs`: variedad, continuidad, gramática estructural y formato de páginas

Los prompts exactos y la validación de las ilustraciones están en [docs/art-prompts.md](docs/art-prompts.md). Las estructuras están en [docs/story-structures.md](docs/story-structures.md), y los detalles de audio y PWA en [docs/pwa.md](docs/pwa.md).

## Instalar

En iPhone o iPad, abre la app en Safari, toca Compartir y luego **Añadir a pantalla de inicio**. En Android, abre el menú de Chrome y elige **Instalar aplicación** o **Añadir a pantalla de inicio**. [Guía de instalación de PWA de MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing).

## Atribuciones

El paso realista de páginas usa [StPageFlip 2.0.7](https://github.com/Nodlik/StPageFlip), incluido localmente bajo licencia MIT en `public/vendor/page-flip.LICENSE.txt`. Todas las acuarelas del catálogo se generaron para este proyecto con imagegen. La música y los efectos se sintetizan localmente con Web Audio; no son grabaciones de animales ni audio de terceros.
