import { BOOKS, CHARACTERS, generateStory } from './story-engine.js';
import { unlockAudio, playSound, setSoundEnabled, getSoundEnabled, stopSounds, startAmbient, stopAmbient, setMusicEnabled, getMusicEnabled } from './audio.js';

const app = document.querySelector('#app');
const dialog = document.querySelector('#dialog');
const palettes = {
  adventure: { color: '#b9c9b2', ink: '#435b46', icon: 'compass', hero: 'fox', scene: 'forest', copy: 'Un pequeño paso. Una gran aventura.', note: 'Viajes, descubrimientos y un poquito de magia' },
  action: { color: '#e8b69f', ink: '#824b38', icon: 'shield', hero: 'knight', scene: 'castle', copy: 'La valentía también vive en los pequeños.', note: 'Valor, obstáculos y segundas oportunidades' },
  relax: { color: '#c5bfd9', ink: '#605779', icon: 'moon', hero: 'rabbit', scene: 'lake', copy: 'Historias para bajar el ritmo.', note: 'Fábulas suaves para terminar el día' },
  friends: { color: '#e9d29b', ink: '#78632f', icon: 'heart', hero: 'bear', scene: 'garden', copy: 'Las cosas bonitas se hacen juntos.', note: 'Amistad en las pequeñas cosas' },
};
const scenes = { forest: [0, 0, 'el bosque'], castle: [1, 0, 'el castillo'], lake: [0, 1, 'el lago'], garden: [1, 1, 'el jardín'], beach: [0, 0, 'la playa', true], mountain: [1, 0, 'la montaña', true], treehouse: [2, 0, 'la casa del árbol', true], village: [3, 0, 'el pueblo', true], meadow: [0, 1, 'el prado', true], cave: [1, 1, 'la cueva', true], river: [2, 1, 'el río', true], clouds: [3, 1, 'el palacio de las nubes', true] };
const objects = { seed: [0, 0, 'la semilla de luz'], bell: [1, 0, 'la campanita'], drop: [2, 0, 'la gota cantora'], feather: [3, 0, 'la pluma'], key: [0, 1, 'la llave de cristal'], umbrella: [1, 1, 'el paraguas'], cloud: [2, 1, 'la nube'], yarn: [3, 1, 'el ovillo de lana'], blanket: [0, 2, 'la manta'], basket: [1, 2, 'la cesta'], flower: [2, 2, 'la flor'], boat: [3, 2, 'el barquito'] };
const sounds = { fox: 'Un saludo del zorro', mouse: '¡Pip, pip!', rabbit: 'Un saltito de conejo', bear: 'Un ronroneo de oso', knight: 'La campanita del caballero', wizard: 'Un poquito de magia', dragon: 'Un dragoncito contento', owl: '¡Uuuh, uuuh!', forest: 'El bosque susurra', castle: 'Suena el castillo', lake: 'El agua canta', garden: 'Un jardín con vida' };
const state = { screen: 'home', story: null, displayPages: null, page: 0, duration: Number(readSetting('cc-duration', '3')), bookId: 'adventure', flip: null, observer: null, renderTimer: null, wakeLock: null };
if (![3, 6, 9].includes(state.duration)) state.duration = 3;
let installPrompt = null;
let toastTimer;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
function readSetting(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }
function saveSetting(key, value) { try { localStorage.setItem(key, value); } catch {} }
const iconPaths = {
  book: '<path d="M12 6C9 3 5 3 2 4v14c4-1 7 0 10 2m0-14c3-3 7-3 10-2v14c-4-1-7 0-10 2V6Z"/>',
  volume: '<path d="m11 4-6 5H2v6h3l6 5V4Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5V4Z"/><path d="m16 9 6 6m0-6-6 6"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  back: '<path d="M19 12H5m5-5-5 5 5 5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart: '<path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z"/>',
  moon: '<path d="M20 14A8.5 8.5 0 0 1 10 4a9 9 0 1 0 10 10Z"/><path d="M17 3v4m-2-2h4"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>',
  shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m9 12 2 2 4-5"/>',
  sparkle: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',
  leaf: '<path d="M20 3C8 2 2 8 5 15c4 8 15 5 15-12Z"/><path d="M3 21 15 9"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  music: '<path d="M9 17V5l11-2v12"/><ellipse cx="6" cy="17" rx="3" ry="2"/><ellipse cx="17" cy="15" rx="3" ry="2"/>',
  'music-off': '<path d="M9 17V5l11-2v12"/><ellipse cx="6" cy="17" rx="3" ry="2"/><ellipse cx="17" cy="15" rx="3" ry="2"/><path d="m3 3 18 18"/>',
};
function icon(name, cls = '') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.sparkle}</svg>`; }
function sprite(id, { interactive = false, extra = '', label } = {}) {
  const char = CHARACTERS.find(c => c.id === id);
  if (!char) return '';
  const extraSheet = char.atlas.sheet === 'extra';
  const position = `${(char.atlas.x / (extraSheet ? 1 : 3)) * 100}% ${char.atlas.y * 100}%`;
  const style = `background-position:${position}`;
  return interactive
    ? `<button type="button" class="character-sprite ${extraSheet ? 'extra-character' : ''} ${extra}" style="${style}" data-sound="${escape(id)}" aria-label="Escuchar a ${escape(label || char.name)}"><span class="sound-dot">${icon('volume')}</span></button>`
    : `<span class="character-sprite ${extraSheet ? 'extra-character' : ''} ${extra}" style="${style}" role="img" aria-label="${escape(label || char.label)}"></span>`;
}
function place(scene, interactive = false) {
  const [x, y, label, extraSheet] = scenes[scene] || scenes.forest;
  const classes = `scene-sprite ${extraSheet ? 'extra-scene' : ''}`;
  const pos = `${x / (extraSheet ? 3 : 1) * 100}% ${y * 100}%`;
  return interactive
    ? `<button class="${classes}" style="background-position:${pos}" data-sound="${escape(scene)}" aria-label="Escuchar ${label}"></button>`
    : `<span class="${classes}" style="background-position:${pos}" role="img" aria-label="Ilustración de ${label}"></span>`;
}
function objectSprite(id) {
  const obj = objects[id];
  if (!obj) return '';
  return `<button class="object-sprite" style="background-position:${obj[0] / 3 * 100}% ${obj[1] / 2 * 100}%" data-sound="${escape(id)}" aria-label="Escuchar ${obj[2]}"><span class="sound-dot">${icon('volume')}</span></button>`;
}
function soundButton() { return `<button class="icon-button sound-toggle" data-action="sound" aria-label="${getSoundEnabled() ? 'Silenciar efectos' : 'Activar efectos'}" aria-pressed="${getSoundEnabled()}">${icon(getSoundEnabled() ? 'volume' : 'mute')}</button>`; }
function musicButton() { return `<button class="icon-button music-toggle" data-action="music" aria-label="${getMusicEnabled() ? 'Pausar música' : 'Activar música'}" aria-pressed="${getMusicEnabled()}">${icon(getMusicEnabled() ? 'music' : 'music-off')}</button>`; }
function header(reader = false) {
  return `<header class="app-header ${reader ? 'reader-header' : ''}">
    ${reader ? `<button class="icon-button" data-action="home" aria-label="Volver a la biblioteca">${icon('back')}</button><div class="reader-title">${escape(state.story.title)}<span>${escape(BOOKS.find(b => b.id === state.story.bookId)?.title)} · ${state.story.duration} min</span></div>` : `<a class="brand" href="./" data-action="home">${icon('book')}<span>cuentacuentos<span class="brand-dot">.</span></span></a>`}
    <div class="header-actions">${reader ? musicButton() : ''}${soundButton()}${reader ? '' : `<button class="icon-button" data-action="install" aria-label="Instalar Cuentacuentos">${icon('download')}</button>`}</div>
  </header>`;
}
function getLastStory() {
  try {
    const s = JSON.parse(readSetting('cc-last-story', 'null'));
    if (!s || s.format !== 'picturebook-v2' || !palettes[s.bookId] || !s.hero?.id || !Array.isArray(s.pages) || !s.pages.length || s.pages.length > 120 || !s.pages.every(p => Array.isArray(p.paragraphs) && p.paragraphs.every(t => typeof t === 'string') && Array.isArray(p.characters))) return null;
    return s;
  } catch { return null; }
}
function renderHome() {
  destroyReader();
  state.screen = 'home';
  document.body.classList.remove('reading');
  const last = getLastStory();
  app.innerHTML = `${header()}
    <main class="library">
      <div class="home-heading"><span class="eyebrow">PEQUEÑAS HISTORIAS, GRANDES MOMENTOS</span><h1>Un cuento distinto.<br><em>Un momento juntos.</em></h1><p>Elige un libro y deja que empiece la magia.</p></div>
      <section class="bookcase" aria-label="Elige uno de nuestros cuatro libros">
        <div class="bookcase-arch" aria-hidden="true"><span class="arch-star one">✧</span><span class="arch-star two">✦</span><span class="arch-star three">✧</span><span class="arch-dash"></span></div>
        <div class="books-on-shelf">${BOOKS.map((book, index) => {
          const p = palettes[book.id];
          return `<button class="shelf-book book-${book.id}" style="--book-color:${p.color};--book-ink:${p.ink};--tilt:${[-5, 0, -2, 6][index]}deg" data-action="choose" data-book="${book.id}" aria-label="Elegir ${escape(book.title)}. ${escape(p.note)}">
            <span class="spine-top" aria-hidden="true"></span><span class="spine-symbol">${icon(p.icon)}</span><span class="spine-title">${escape(book.title)}</span><span class="spine-mark" aria-hidden="true">c.</span><span class="spine-bottom" aria-hidden="true"></span>
          </button>`;
        }).join('')}</div>
        <div class="wooden-shelf" aria-hidden="true"></div><span class="shelf-shadow" aria-hidden="true"></span>
        <div class="shelf-caption">Cuatro mundos por descubrir ${icon('sparkle')}</div>
      </section>
      <div class="little-note"><div class="note-illustration">${sprite('mouse')}<span class="little-flower" aria-hidden="true">✳</span></div><div><h2>La misma magia.<br>Siempre un cuento nuevo.</h2><p>De 3, 6 o 9 minutos.<br>Para leer despacito y muy cerquita.</p></div></div>
      ${last ? `<button class="resume-story" data-action="resume">${icon('book')}<span>Seguir leyendo<small>${escape(last.title)}</small></span>${icon('arrow')}</button>` : ''}
      <footer class="library-footer">${icon('heart')} Hecho para compartir con los que más quieres</footer>
      <div class="offline-status" id="offline-status"></div>
    </main>`;
  updateOfflineStatus();
}
function chooseBook(bookId) {
  state.bookId = bookId;
  const book = BOOKS.find(b => b.id === bookId);
  const p = palettes[bookId];
  dialog.className = 'setup-dialog';
  dialog.innerHTML = `<button class="icon-button dialog-close" data-action="close-dialog" aria-label="Cerrar">${icon('close')}</button>
    <div class="setup-art" style="--book-color:${p.color};--book-ink:${p.ink}"><span class="setup-orbit"></span>${sprite(p.hero)}<span class="setup-category">${icon(p.icon)} ${escape(book.title)}</span></div>
    <div class="setup-body"><span class="eyebrow">UN RATITO PARA LEER JUNTOS</span><h2 id="dialog-title">¿Cuánto dura<br><em>la magia de hoy?</em></h2><p>${escape(p.copy)}</p>
    <fieldset class="duration-options"><legend class="sr-only">Duración aproximada del cuento</legend>${[3, 6, 9].map((duration, i) => `<label class="duration-option"><input type="radio" name="duration" value="${duration}" ${state.duration === duration ? 'checked' : ''}><span class="duration-number">${duration}<small>minutos</small></span><span class="duration-label">${['Un cuentito', 'Un ratito más', 'Una gran historia'][i]}</span></label>`).join('')}</fieldset>
    <span class="duration-footnote">Tiempo aproximado de lectura en voz alta</span>
    ${bookId === 'action' ? `<p class="action-note">Una historia sobre el valor y la pérdida: un personaje querido muere, tratado con delicadeza y sin violencia gráfica.</p>` : ''}
    <button class="primary-button" data-action="generate">${icon('sparkle')} Generar cuento ${icon('arrow')}</button></div>`;
  dialog.showModal();
}
async function generate() {
  const selected = dialog.querySelector('input[name="duration"]:checked');
  if (selected) state.duration = Number(selected.value);
  saveSetting('cc-duration', state.duration);
  dialog.close();
  destroyReader();
  state.screen = 'loading';
  const p = palettes[state.bookId];
  app.innerHTML = `${header()}<main class="loading-screen"><div class="loading-orbit"><span class="loading-star one">✦</span><span class="loading-star two">✧</span><div class="loading-book" style="--book-color:${p.color}">${icon('book')}</div></div><span class="eyebrow">ÉRASE UNA VEZ…</span><h1>Un cuento está<br><em>a punto de nacer.</em></h1><p id="loading-message" role="status">Eligiendo a nuestros protagonistas…</p><div class="loading-dots" aria-hidden="true"><i></i><i></i><i></i></div></main>`;
  try {
    await unlockAudio();
    await new Promise(resolve => setTimeout(resolve, 350));
    state.story = generateStory(state.bookId, state.duration);
    document.querySelector('#loading-message').textContent = 'Preparando las páginas y sus ilustraciones…';
    await Promise.all(['./art/characters.png', './art/characters-extra.png', './art/places.png', './art/places-extra.png', './art/objects.png'].map(src => { const img = new Image(); img.src = src; return img.decode().catch(() => {}); }));
    await new Promise(resolve => setTimeout(resolve, 650));
    saveSetting('cc-last-story', JSON.stringify(state.story));
    saveSetting('cc-last-page', '0');
    state.page = 0;
    state.displayPages = null;
    renderReader();
  } catch (error) {
    console.error('No se pudo generar el cuento', error);
    renderHome();
    showToast('No se pudo preparar el cuento. Inténtalo de nuevo.');
  }
}
function coverHTML() {
  const s = state.story;
  const p = palettes[s.bookId];
  return `<div class="storybook-page story-cover" data-density="hard" style="--book-color:${p.color};--book-ink:${p.ink}"><div class="cover-border"><span class="cover-collection">${icon(p.icon)} ${escape(BOOKS.find(b => b.id === s.bookId)?.title)}</span><h1>${escape(s.title)}</h1><div class="cover-portrait">${sprite(s.hero.id, { interactive: true, label: s.hero.name })}<span class="cover-star one">✧</span><span class="cover-star two">✦</span></div><span class="cover-once">Un cuento para leer juntos</span><button class="cover-open" data-action="next">Abrir el cuento ${icon('arrow')}</button></div></div>`;
}
function pageHTML(page, i) {
  const s = state.story;
  const characters = [...new Set(page.characters)].filter(id => CHARACTERS.some(c => c.id === id)).slice(0, 3);
  const labelFor = id => [s.hero, s.companion].find(c => c?.id === id)?.name || CHARACTERS.find(c => c.id === id)?.name;
  const elements = (page.objects || []).filter(id => objects[id]).slice(0, 2);
  return `<article class="storybook-page paper-page" data-page-index="${i + 1}"><div class="page-inner"><div class="page-art ${characters.length > 2 ? 'three-characters' : ''} ${elements.length ? 'has-objects' : ''} ${characters.length ? '' : 'no-characters'}">${page.scene ? place(page.scene, true) : ''}<div class="page-characters">${characters.map(id => sprite(id, { interactive: true, label: labelFor(id) })).join('')}</div><div class="page-objects">${elements.map(objectSprite).join('')}</div></div><div class="page-copy">${page.paragraphs.map(text => `<p>${escape(text)}</p>`).join('')}</div><span class="page-number">${i + 1}</span></div></article>`;
}
function endHTML() {
  const p = palettes[state.story.bookId];
  return `<div class="storybook-page story-cover end-cover" data-density="hard" style="--book-color:${p.color};--book-ink:${p.ink}"><div class="cover-border"><span class="cover-collection">${icon('heart')} FIN</span><h1>Colorín, colorado…<br><em>qué bonito<br>haberlo compartido.</em></h1><div class="end-characters">${sprite(state.story.hero.id)}${sprite(state.story.companion?.id)}</div><button class="cover-open" data-action="new-story">Otro cuento ${icon('sparkle')}</button><button class="text-button" data-action="home">Volver a la biblioteca</button></div></div>`;
}
function renderReader() {
  state.screen = 'reader';
  document.body.classList.add('reading');
  app.innerHTML = `${header(true)}<main class="reader"><div class="book-stage" id="book-stage"><div id="storybook" class="storybook"></div></div><nav class="reading-controls" aria-label="Páginas del cuento"><button class="page-nav" data-action="prev" aria-label="Página anterior">${icon('back')}</button><div class="reading-progress"><span id="page-status" aria-live="polite">Portada</span><div class="progress-track"><span id="progress-bar"></span></div></div><button class="page-nav" data-action="next" aria-label="Página siguiente">${icon('arrow')}</button></nav><div class="reader-hint sr-only" id="reader-hint">Toca las ilustraciones para escuchar sus sonidos.</div></main>`;
  createBook();
  state.observer = new ResizeObserver(() => {
    clearTimeout(state.renderTimer);
    state.renderTimer = setTimeout(() => { if (state.screen === 'reader') rebuildBook(); }, 180);
  });
  state.observer.observe(document.querySelector('#book-stage'));
  requestWakeLock();
  if (getMusicEnabled()) startAmbient(state.story.bookId);
}
function createBook() {
  const stage = document.querySelector('#book-stage');
  const el = document.querySelector('#storybook');
  if (!stage || !el) return;
  const w = stage.clientWidth;
  const h = stage.clientHeight;
  const spread = w >= 700 && w > h && h > 400;
  const width = Math.round(spread ? w / 2 : w);
  const height = Math.round(h);
  const current = state.displayPages?.[state.page - 1];
  const atEnd = state.displayPages && state.page > state.displayPages.length;
  state.displayPages = state.story.pages.map((page, sourceIndex) => ({ ...page, sourceIndex, partIndex: 0 }));
  if (atEnd) state.page = state.displayPages.length + 1;
  else if (current) state.page = Math.max(1, state.displayPages.findIndex(p => p.sourceIndex === current.sourceIndex && p.partIndex === current.partIndex) + 1);
  el.innerHTML = coverHTML() + state.displayPages.map(pageHTML).join('') + endHTML();
  el.style.setProperty('--page-width', `${width}px`);
  el.style.setProperty('--page-height', `${height}px`);
  el.style.setProperty('--book-color', palettes[state.story.bookId].color);
  el.style.setProperty('--book-ink', palettes[state.story.bookId].ink);
  el.style.setProperty('--copy-size', `${Math.max(20, Math.min(29, width / 16.5))}px`);
  el.style.setProperty('--page-padding', `${Math.max(28, Math.min(65, width * 0.11))}px`);
  el.style.setProperty('--art-height', `${Math.max(120, Math.min(245, height * 0.3))}px`);
  // Measure every page before PageFlip hides and clones the inactive sheets.
  fitPageText();
  state.flip = new window.St.PageFlip(el, {
    width, height, size: 'fixed', usePortrait: !spread, showCover: true,
    autoSize: false, flippingTime: matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 780,
    maxShadowOpacity: 0.22, drawShadow: true, mobileScrollSupport: false,
    clickEventForward: true, disableFlipByClick: true, showPageCorners: false, swipeDistance: 35,
    startPage: Math.min(state.page, state.displayPages.length + 1),
  });
  state.flip.on('flip', e => {
    state.page = e.data;
    saveSetting('cc-last-page', String(state.page));
    playSound('page');
    updateProgress();
    fitPageText();
  });
  state.flip.on('init', updateProgress);
  state.flip.loadFromHTML(el.querySelectorAll('.storybook-page'));
  stage.classList.toggle('spread-mode', spread);
  updateProgress();
  fitPageText();
}
function fitPageText() {
    document.querySelectorAll('.page-copy').forEach(copy => {
      const inner = copy.closest('.page-inner');
      if (!inner || !inner.offsetHeight) return;
      const art = inner.querySelector('.page-art');
      // Hidden pages still have intrinsic CSS dimensions; fit to the fixed paper height.
      const pageHeight = parseFloat(document.querySelector('#storybook')?.style.getPropertyValue('--page-height') || '540');
      const padding = parseFloat(document.querySelector('#storybook')?.style.getPropertyValue('--page-padding') || '24');
      let available = pageHeight - padding * 2 - art.offsetHeight - 28;
      let size = parseFloat(getComputedStyle(copy).fontSize);
      while (copy.scrollHeight > available && size > 14.5) { size -= 0.5; copy.style.fontSize = `${size}px`; }
      if (copy.scrollHeight > available) {
        const shrink = Math.min(art.offsetHeight - 60, copy.scrollHeight - available + 8);
        if (shrink > 0) {
          const nextHeight = art.offsetHeight - shrink;
          art.style.height = `${nextHeight}px`;
          art.style.setProperty('--sprite-limit', `${nextHeight}px`);
        }
      }
    });
}
function rebuildBook() {
  const old = state.flip;
  state.flip = null;
  old?.destroy();
  const stage = document.querySelector('#book-stage');
  if (!stage) return;
  stage.innerHTML = '<div id="storybook" class="storybook"></div>';
  createBook();
}
function updateProgress() {
  if (!state.flip || state.screen !== 'reader') return;
  const index = state.flip.getCurrentPageIndex();
  state.page = index;
  const n = state.displayPages.length;
  const spread = state.flip.getOrientation() === 'landscape';
  const label = index === 0 ? 'Portada' : index > n ? 'Fin del cuento' : spread && index < n ? `Páginas ${index}–${index + 1} de ${n}` : `Página ${index} de ${n}`;
  document.querySelector('.reader').classList.toggle('on-cover', index === 0);
  document.querySelector('#page-status').textContent = label;
  document.querySelector('#progress-bar').style.width = `${(index / (n + 1)) * 100}%`;
  document.querySelector('[data-action="prev"]').disabled = index === 0;
  document.querySelector('.reading-controls [data-action="next"]').disabled = index >= n + 1;
  document.querySelector('#reader-hint').innerHTML = index === 0 ? `${icon('book')} Abre el cuento y acomódate cerquita.` : index > n ? `${icon('heart')} Los mejores cuentos se leen juntos.` : `${icon('volume')} Toca a los personajes. Tienen algo que decir.`;
}
async function requestWakeLock() {
  try { if ('wakeLock' in navigator && document.visibilityState === 'visible') state.wakeLock = await navigator.wakeLock.request('screen'); } catch {}
}
function destroyReader() {
  state.observer?.disconnect(); state.observer = null;
  clearTimeout(state.renderTimer);
  state.flip?.destroy(); state.flip = null;
  state.wakeLock?.release().catch(() => {}); state.wakeLock = null;
  stopSounds();
  stopAmbient();
}
function turn(next) {
  if (!state.flip) return;
  unlockAudio().then(() => { if (getMusicEnabled() && state.screen === 'reader') startAmbient(state.story.bookId); });
  try { next ? state.flip.flipNext('bottom') : state.flip.flipPrev('bottom'); } catch {}
}
function showToast(text) {
  const toast = document.querySelector('#toast');
  toast.textContent = text;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2100);
}
async function install() {
  if (installPrompt) { await installPrompt.prompt(); installPrompt = null; return; }
  dialog.className = 'install-dialog';
  dialog.innerHTML = `<button class="icon-button dialog-close" data-action="close-dialog" aria-label="Cerrar">${icon('close')}</button><div class="install-mark">${icon('book')}</div><span class="eyebrow">TU BIBLIOTECA, SIEMPRE A MANO</span><h2 id="dialog-title">La magia también<br><em>vive en tu teléfono.</em></h2><p>Guarda Cuentacuentos en tu pantalla de inicio para abrirlo como una app.</p><ol class="install-steps"><li><strong>En iPhone o iPad</strong><span>Abre esta página en Safari, toca Compartir y elige «Añadir a pantalla de inicio».</span></li><li><strong>En Android</strong><span>Abre el menú de Chrome y toca «Añadir a pantalla de inicio» o «Instalar aplicación».</span></li></ol><p class="install-offline">${icon('leaf')} Después de la primera carga completa, los cuentos y sus ilustraciones están disponibles sin conexión.</p><button class="primary-button" data-action="close-dialog">Entendido ${icon('check')}</button>`;
  dialog.showModal();
}
function updateOfflineStatus() {
  const el = document.querySelector('#offline-status');
  if (!el) return;
  el.innerHTML = navigator.onLine ? '' : `${icon('leaf')} La magia sigue, incluso sin internet`;
}
document.addEventListener('click', async e => {
  const sound = e.target.closest('[data-sound]');
  if (sound) {
    e.stopPropagation();
    if (!getSoundEnabled()) { showToast('Activa los sonidos con el botón de arriba.'); return; }
    await unlockAudio();
    if (state.screen === 'reader' && getMusicEnabled()) startAmbient(state.story.bookId);
    playSound(sound.dataset.sound);
    sound.classList.remove('sound-bounce');
    void sound.offsetWidth;
    sound.classList.add('sound-bounce');
    showToast(sounds[sound.dataset.sound] || (objects[sound.dataset.sound] ? `Suena ${objects[sound.dataset.sound][2]}` : 'Un poquito de magia'));
    return;
  }
  const action = e.target.closest('[data-action]');
  if (!action) return;
  e.preventDefault();
  switch (action.dataset.action) {
    case 'choose': chooseBook(action.dataset.book); break;
    case 'home': if (dialog.open) dialog.close(); renderHome(); break;
    case 'close-dialog': dialog.close(); break;
    case 'generate': if (state.screen !== 'loading') generate(); break;
    case 'next': turn(true); break;
    case 'prev': turn(false); break;
    case 'new-story': chooseBook(state.story.bookId); break;
    case 'sound': {
      const enabled = !getSoundEnabled(); setSoundEnabled(enabled);
      document.querySelectorAll('.sound-toggle').forEach(button => { button.innerHTML = icon(enabled ? 'volume' : 'mute'); button.setAttribute('aria-label', enabled ? 'Silenciar efectos' : 'Activar efectos'); button.setAttribute('aria-pressed', enabled); });
      if (enabled) { await unlockAudio(); playSound('wizard'); }
      showToast(enabled ? 'Sonidos activados' : 'Un cuento en silencio');
      break;
    }
    case 'music': {
      const enabled = !getMusicEnabled(); setMusicEnabled(enabled);
      document.querySelectorAll('.music-toggle').forEach(button => { button.innerHTML = icon(enabled ? 'music' : 'music-off'); button.setAttribute('aria-label', enabled ? 'Pausar música' : 'Activar música'); button.setAttribute('aria-pressed', enabled); });
      if (enabled) { await unlockAudio(); startAmbient(state.story.bookId); }
      showToast(enabled ? 'Música ambiental activada' : 'Música en pausa');
      break;
    }
    case 'install': install(); break;
    case 'resume': {
      state.story = getLastStory();
      if (state.story) { state.displayPages = null; state.page = Math.max(0, Number(readSetting('cc-last-page', '0')) || 0); await unlockAudio(); renderReader(); }
      break;
    }
  }
}, true);
dialog.addEventListener('click', e => { if (e.target === dialog && (e.clientX < dialog.getBoundingClientRect().left || e.clientX > dialog.getBoundingClientRect().right || e.clientY < dialog.getBoundingClientRect().top || e.clientY > dialog.getBoundingClientRect().bottom)) dialog.close(); });
document.addEventListener('keydown', e => { if (state.screen === 'reader' && !dialog.open) { if (e.key === 'ArrowRight') turn(true); if (e.key === 'ArrowLeft') turn(false); } });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') { stopSounds(); stopAmbient(); }
  else if (state.screen === 'reader') { requestWakeLock(); unlockAudio().then(() => { if (getMusicEnabled() && state.screen === 'reader') startAmbient(state.story.bookId); }); }
});
window.addEventListener('online', updateOfflineStatus);
window.addEventListener('offline', updateOfflineStatus);
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; });
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./sw.js', { scope: './' });
      await navigator.serviceWorker.ready;
      const el = document.querySelector('#offline-status');
      if (el && navigator.onLine) el.innerHTML = `${icon('check')} Tu biblioteca está lista para leer sin conexión`;
    } catch (error) { console.warn('No se pudo preparar la biblioteca sin conexión', error); }
  });
}
renderHome();
