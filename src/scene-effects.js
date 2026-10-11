import { getScene } from './world-catalog.js';

const groups = {
  snow: new Set(['snowy-valley', 'snowy-night-forest', 'ice-castle']),
  fireflies: new Set(['firefly-field', 'moon-garden', 'mushroom-grove', 'lily-pond']),
  fog: new Set(['mountain', 'mangrove', 'swamp', 'clouds', 'cloud-sea', 'floating-island', 'volcano']),
  water: new Set(['lake', 'river', 'beach', 'harbor', 'waterfall', 'desert-oasis', 'sunset-beach', 'lighthouse-cliff', 'pirate-ship', 'troll-bridge', 'rope-bridge']),
  sparkles: new Set(['crystal-cave', 'cave', 'star-observatory', 'shooting-star-hill', 'moon-boat', 'rainbow-bridge', 'enchanted-tower']),
  light: new Set(['library', 'bakery', 'workshop', 'greenhouse', 'treehouse', 'castle', 'bedroom', 'kitchen', 'bathroom', 'living-room', 'dining-room', 'attic', 'playroom', 'school', 'clinic', 'little-theater', 'post-office', 'giant-house', 'ogre-cave']),
};
const counts = { rain: 36, snow: 24, fireflies: 18, fog: 5, water: 8, bubbles: 14, sparkles: 12, light: 14, pollen: 16 };
const wrap = value => ((value % 1) + 1) % 1;

function hash(value) {
  let seed = 2166136261;
  for (const character of String(value)) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  return seed >>> 0;
}

function seededRandom(seed) {
  return () => {
    seed += 0x6D2B79F5;
    let value = Math.imul(seed ^ seed >>> 15, seed | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

/** Presentation only: choosing an atmosphere never changes a saved story or its world. */
export function getSceneEffect(sceneId, pageIndex = 0, paragraphs = []) {
  const scene = getScene(sceneId);
  if (!scene) return null;
  if (groups.snow.has(sceneId)) return 'snow';
  if (scene.tags.includes('underwater')) return 'bubbles';
  // Weather belongs outside. A rainy passage can override a landscape's usual atmosphere.
  const rainyPassage = /(?:la lluvia|una lluvia|llovizna|empez[oó] a llover|segu[ií]a lloviendo|ca[ií]an gotas)/iu.test(paragraphs.join(' '));
  if (scene.tags.includes('outdoors') && !groups.light.has(sceneId) && rainyPassage) return 'rain';
  if (groups.fireflies.has(sceneId)) return 'fireflies';
  if (groups.fog.has(sceneId)) return 'fog';
  if (groups.water.has(sceneId)) return 'water';
  if (groups.sparkles.has(sceneId)) return 'sparkles';
  if (groups.light.has(sceneId)) return 'light';
  if (scene.tags.includes('plants') || scene.tags.includes('outdoors')) return 'pollen';
  return null;
}

export function sceneEffectHTML(sceneId, pageIndex, paragraphs) {
  const effect = getSceneEffect(sceneId, pageIndex, paragraphs);
  return effect ? `<canvas class="scene-effect-canvas" data-scene-effect="${effect}" data-effect-seed="${hash(`${sceneId}:${pageIndex}`)}" aria-hidden="true"></canvas>` : '';
}

function glow(ctx, x, y, radius, color, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${color},${alpha})`);
  gradient.addColorStop(0.25, `rgba(${color},${alpha * 0.5})`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawEffect(record, time) {
  const { ctx, width: w, height: h, particles, effect } = record;
  ctx.clearRect(0, 0, w, h);
  const scale = Math.min(w, h);
  for (const p of particles) {
    const phase = time * p.speed + p.phase;
    let x, y, alpha;
    if (effect === 'fog') {
      x = (wrap(p.x + time * 0.012 * p.speed) * 1.6 - 0.3) * w;
      y = (0.42 + p.y * 0.42 + Math.sin(phase) * 0.03) * h;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(2.8, 0.65);
      glow(ctx, 0, 0, scale * (0.2 + p.size * 0.12), '238,243,238', 0.1 + p.size * 0.07);
      ctx.restore();
    } else if (effect === 'rain') {
      x = wrap(p.x - time * 0.028 * p.speed) * w;
      y = wrap(p.y + time * (0.32 + p.speed * 0.16)) * h;
      const length = 8 + p.size * 12;
      const gradient = ctx.createLinearGradient(x, y, x - 3, y + length);
      gradient.addColorStop(0, 'rgba(151,182,195,0)');
      gradient.addColorStop(1, `rgba(126,164,179,${0.18 + p.size * 0.2})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 0.65 + p.size * 0.45;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 3, y + length);
      ctx.stroke();
    } else if (effect === 'snow') {
      x = wrap(p.x + Math.sin(phase * 0.55) * 0.035 + time * 0.007) * w;
      y = wrap(p.y + time * (0.035 + p.speed * 0.018)) * h;
      glow(ctx, x, y, 2.2 + p.size * 2.2, '246,251,255', 0.45);
      ctx.fillStyle = `rgba(255,255,255,${0.35 + p.size * 0.45})`;
      ctx.beginPath();
      ctx.arc(x, y, 0.6 + p.size * 1.35, 0, Math.PI * 2);
      ctx.fill();
    } else if (effect === 'fireflies') {
      x = (0.09 + p.x * 0.82 + Math.sin(phase * 0.6) * 0.035) * w;
      y = (0.32 + p.y * 0.5 + Math.cos(phase * 0.47) * 0.025) * h;
      alpha = 0.18 + 0.72 * ((Math.sin(phase * 1.4) + 1) / 2) ** 2;
      glow(ctx, x, y, 5 + p.size * 6, '242,225,126', alpha * 0.38);
      ctx.fillStyle = `rgba(255,246,182,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 0.8 + p.size * 0.65, 0, Math.PI * 2);
      ctx.fill();
    } else if (effect === 'water') {
      const age = wrap(time * 0.14 * p.speed + p.phase);
      x = (0.12 + p.x * 0.76) * w;
      y = (0.61 + p.y * 0.19) * h;
      ctx.strokeStyle = `rgba(171,208,211,${Math.sin(age * Math.PI) * 0.23})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.ellipse(x, y, (3 + age * 18) * (0.7 + p.size), 1 + age * 4, 0, 0, Math.PI * 2);
      ctx.stroke();
      glow(ctx, x, y, 2 + p.size * 3, '235,246,234', Math.sin(age * Math.PI) * 0.2);
    } else if (effect === 'bubbles') {
      x = (0.1 + p.x * 0.8 + Math.sin(phase) * 0.018) * w;
      y = wrap(p.y - time * (0.025 + p.speed * 0.012)) * h;
      const radius = 1.5 + p.size * 3;
      ctx.strokeStyle = 'rgba(224,245,247,0.35)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(244,255,255,0.55)';
      ctx.beginPath();
      ctx.arc(x - radius * 0.32, y - radius * 0.32, 0.6, 0, Math.PI * 2);
      ctx.fill();
    } else if (effect === 'sparkles') {
      x = (0.12 + p.x * 0.76) * w;
      y = (0.09 + p.y * 0.65) * h;
      alpha = ((Math.sin(phase * 0.9) + 1) / 2) ** 4 * 0.55;
      const radius = 1.7 + p.size * 2.4;
      glow(ctx, x, y, radius * 3, '225,222,251', alpha * 0.3);
      ctx.strokeStyle = `rgba(255,248,223,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - radius, y); ctx.lineTo(x + radius, y);
      ctx.moveTo(x, y - radius); ctx.lineTo(x, y + radius);
      ctx.stroke();
    } else {
      x = wrap(p.x + time * 0.009 * p.speed + Math.sin(phase * 0.4) * 0.018) * w;
      y = wrap(p.y - time * 0.006 * p.speed) * h;
      alpha = 0.1 + ((Math.sin(phase * 0.7) + 1) / 2) * 0.24;
      const color = effect === 'light' ? '245,207,131' : '240,222,169';
      glow(ctx, x, y, 2.2 + p.size * 2.2, color, alpha * 0.6);
      ctx.fillStyle = `rgba(${color},${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 0.7 + p.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** One bounded animation loop per reader; hidden sheets never allocate or draw a canvas. */
export function mountSceneEffects(root) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const records = new WeakMap();
  let active = [], frame = 0, timer = 0, previous = 0, painted = 0, scanned = -Infinity, elapsed = 0, disposed = false;

  function visibleRecords() {
    const next = [];
    for (const canvas of root.querySelectorAll('[data-scene-effect]')) {
      const page = canvas.closest('.storybook-page');
      if (!page || page.style.display !== 'block' || !canvas.isConnected) continue;
      const width = canvas.clientWidth, height = canvas.clientHeight;
      if (!width || !height) continue;
      let record = records.get(canvas);
      if (!record) {
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) continue;
        const random = seededRandom(Number(canvas.dataset.effectSeed) || 1);
        const effect = canvas.dataset.sceneEffect;
        record = { canvas, page, ctx, effect, width: 0, height: 0, particles: Array.from({ length: counts[effect] || 12 }, () => ({
          x: random(), y: random(), size: random(), speed: 0.5 + random(), phase: random() * Math.PI * 2,
        })) };
        records.set(canvas, record);
      }
      if (record.width !== width || record.height !== height) {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5, 720 / Math.max(width, height));
        canvas.width = Math.max(1, Math.round(width * ratio));
        canvas.height = Math.max(1, Math.round(height * ratio));
        record.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        record.width = width;
        record.height = height;
      }
      next.push(record);
    }
    active = next;
  }

  function stop() {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    frame = 0;
    timer = 0;
    previous = 0;
  }

  function schedule() {
    if (disposed || document.hidden || reducedMotion.matches || frame || timer) return;
    frame = requestAnimationFrame(tick);
  }

  function tick(now) {
    frame = 0;
    if (disposed || document.hidden || reducedMotion.matches || !root.isConnected) return;
    if (now - scanned >= 120) { visibleRecords(); scanned = now; }
    elapsed += previous ? Math.min((now - previous) / 1000, 0.06) : 0;
    previous = now;
    if (active.length && now - painted >= 1000 / 30) {
      for (const record of active) if (record.page.style.display === 'block' && record.canvas.isConnected) drawEffect(record, elapsed);
      painted = now;
    }
    if (active.length) schedule();
    else timer = setTimeout(() => { timer = 0; schedule(); }, 180);
  }

  function sync() {
    scanned = -Infinity;
    clearTimeout(timer);
    timer = 0;
    schedule();
  }

  function visibility() { document.hidden ? stop() : sync(); }
  function motion() { reducedMotion.matches ? stop() : sync(); }
  document.addEventListener('visibilitychange', visibility);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', motion);
  else reducedMotion.addListener(motion);
  schedule();
  return {
    sync,
    destroy() {
      disposed = true;
      stop();
      active = [];
      document.removeEventListener('visibilitychange', visibility);
      if (reducedMotion.removeEventListener) reducedMotion.removeEventListener('change', motion);
      else reducedMotion.removeListener(motion);
    },
  };
}
