/** Presentation bounds remove atlas gutters without changing artwork or saved coordinates. */
let geometry = {};

export async function loadArtGeometry() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(new URL('../art/atlas-geometry.json', import.meta.url), { signal: controller.signal });
    if (response.ok) geometry = await response.json();
  } catch { /* Original cell framing remains usable if an old cache is still updating. */ }
  finally { clearTimeout(timer); }
}

export function atlasPresentation(cell, registry) {
  const atlas = registry[cell.sheet || 'main'];
  const image = geometry[atlas.file];
  const bounds = image?.cells?.[cell.y * atlas.columns + cell.x];
  if (!bounds) {
    const position = `${cell.x / (atlas.columns - 1) * 100}% ${cell.y / (atlas.rows - 1) * 100}%`;
    return `background-image:url('./art/${atlas.file}');background-size:${atlas.columns * 100}% ${atlas.rows * 100}%;background-position:${position};--art-ratio:1`;
  }
  const [left, top, width, height] = bounds;
  const x = image.width === width ? 0 : left / (image.width - width) * 100;
  const y = image.height === height ? 0 : top / (image.height - height) * 100;
  return `background-image:url('./art/${atlas.file}');background-size:${image.width / width * 100}% ${image.height / height * 100}%;background-position:${x}% ${y}%;--art-ratio:${width / height}`;
}
