/** Inclusive, offline character profiles and layered storybook illustrations. */
const freezeOptions = options => Object.freeze(options.map(option => Object.freeze(option)));

// Every hairstyle and garment is available to every member of the family.
export const HAIRSTYLES = freezeOptions([
  { id: 'crop', label: 'Cortito' },
  { id: 'curls', label: 'Rizos' },
  { id: 'fringe', label: 'Flequillo' },
  { id: 'bob', label: 'Melena' },
  { id: 'pony', label: 'Coleta' },
  { id: 'braids', label: 'Trenzas' },
]);

export const OUTFITS = freezeOptions([
  { id: 'tee', label: 'Camiseta' },
  { id: 'overalls', label: 'Overol' },
  { id: 'sweater', label: 'Suéter' },
  { id: 'hoodie', label: 'Sudadera' },
  { id: 'dress', label: 'Túnica' },
  { id: 'pajamas', label: 'Pijama' },
]);

export const SKIN_TONES = freezeOptions([
  { id: 'porcelain', label: 'Piel clara', color: '#F3D8C2' },
  { id: 'peach', label: 'Piel durazno', color: '#E9BD97' },
  { id: 'honey', label: 'Piel miel', color: '#C68F65' },
  { id: 'cinnamon', label: 'Piel canela', color: '#9C674B' },
  { id: 'cocoa', label: 'Piel cacao', color: '#694638' },
]);

export const FAVORITE_COLORS = freezeOptions([
  { id: 'rose', label: 'Rosa', color: '#CF8D9A' },
  { id: 'orange', label: 'Naranja', color: '#DB9E78' },
  { id: 'yellow', label: 'Amarillo', color: '#DDB969' },
  { id: 'green', label: 'Verde', color: '#A0B77D' },
  { id: 'mint', label: 'Menta', color: '#82AA98' },
  { id: 'blue', label: 'Azul', color: '#82A7C0' },
  { id: 'purple', label: 'Morado', color: '#A594BD' },
  { id: 'red', label: 'Rojo', color: '#C47772' },
]);

export const FAMILY_ROLES = freezeOptions([
  { id: 'child', label: 'Protagonista', defaultName: 'Alex', ageGroup: 'child' },
  { id: 'dad', label: 'Papá', defaultName: 'Papá', ageGroup: 'adult' },
  { id: 'mom', label: 'Mamá', defaultName: 'Mamá', ageGroup: 'adult' },
  { id: 'baby', label: 'Bebé', defaultName: 'Bebé', ageGroup: 'baby' },
  { id: 'sibling', label: 'Hermano o hermana', defaultName: 'Dani', ageGroup: 'child' },
  { id: 'teen', label: 'Adolescente', defaultName: 'Sam', ageGroup: 'teen' },
]);

const ROLE_DEFAULTS = Object.freeze({
  child: { hair: 'fringe', outfit: 'overalls', skin: 'peach', color: 'mint' },
  dad: { hair: 'curls', outfit: 'sweater', skin: 'peach', color: 'blue' },
  mom: { hair: 'bob', outfit: 'tee', skin: 'peach', color: 'rose' },
  baby: { hair: 'crop', outfit: 'pajamas', skin: 'peach', color: 'yellow' },
  sibling: { hair: 'braids', outfit: 'hoodie', skin: 'peach', color: 'purple' },
  teen: { hair: 'pony', outfit: 'tee', skin: 'peach', color: 'orange' },
});

const memberRole = member => {
  if (!member || typeof member !== 'object' || Array.isArray(member)) return undefined;
  const candidate = typeof member.role === 'string' ? member.role :
    typeof member.id === 'string' && member.id.startsWith('family-') ? member.id.slice(7) : undefined;
  return FAMILY_ROLES.find(role => role.id === candidate);
};

const choice = (options, value, fallback) => options.some(option => option.id === value) ? value : fallback;
const cleanName = (name, fallback) => {
  if (typeof name !== 'string') return fallback;
  const plain = name.normalize('NFKC').replace(/[^\p{L}\p{M}\p{N} '-]/gu, '').replace(/\s+/g, ' ').trim().split(' ').slice(0, 3).join(' ');
  return Array.from(plain).slice(0, 24).join('').trim() || fallback;
};

function normalizeMember(input, role) {
  const defaults = ROLE_DEFAULTS[role.id];
  return {
    id: `family-${role.id}`,
    role: role.id,
    name: cleanName(input?.name, role.defaultName),
    hair: choice(HAIRSTYLES, input?.hair, defaults.hair),
    outfit: choice(OUTFITS, input?.outfit, defaults.outfit),
    skin: choice(SKIN_TONES, input?.skin, defaults.skin),
    color: choice(FAVORITE_COLORS, input?.color, defaults.color),
    ageGroup: role.ageGroup,
    kind: 'human',
    sound: 'human',
    label: role.label,
    article: '',
    gender: 'neutral',
  };
}

export function createFamilyMember(roleId = 'child') {
  const role = FAMILY_ROLES.find(item => item.id === roleId) || FAMILY_ROLES[0];
  return normalizeMember({}, role);
}

export function createDefaultFamily() {
  return { members: ['child', 'dad', 'mom', 'sibling'].map(createFamilyMember) };
}

/** Missing/corrupt storage restores defaults; a valid empty family keeps only the protagonist. */
export function normalizeFamily(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.members)) return createDefaultFamily();
  const byRole = new Map();
  for (const member of input.members) {
    const role = memberRole(member);
    if (!role || byRole.has(role.id)) continue;
    byRole.set(role.id, member);
  }
  return {
    members: FAMILY_ROLES.filter(role => role.id === 'child' || (byRole.has(role.id) && byRole.get(role.id).enabled !== false))
      .map(role => normalizeMember(byRole.get(role.id), role)),
  };
}

const HAIR_COLOR = '#5E443A';
const HAIR_LIGHT = '#78594A';
const INK = '#473B35';
const CREAM = '#F4EAD6';

function blend(hex, toward, amount) {
  const channel = (value, index) => parseInt(value.slice(index, index + 2), 16);
  return `#${[1, 3, 5].map(index => Math.round(channel(hex, index) * (1 - amount) + channel(toward, index) * amount).toString(16).padStart(2, '0')).join('')}`;
}

const PROPORTIONS = Object.freeze({
  adult: { faceY: 49, head: 25, bodyY: 79, bodyBottom: 142, bodyWidth: 43, legsY: 138, legsBottom: 184 },
  teen: { faceY: 56, head: 27, bodyY: 89, bodyBottom: 147, bodyWidth: 43, legsY: 143, legsBottom: 185 },
  child: { faceY: 69, head: 30, bodyY: 105, bodyBottom: 155, bodyWidth: 45, legsY: 151, legsBottom: 184 },
  baby: { faceY: 86, head: 32, bodyY: 122, bodyBottom: 165, bodyWidth: 45, legsY: 160, legsBottom: 181 },
});

function backHair(hair, accent) {
  switch (hair) {
    case 'bob':
      return `<path d="M-30-4Q-36-29-13-33Q10-41 28-22Q37-10 33 35Q19 42-30 33Z" fill="${HAIR_COLOR}"/><path d="M-29 9Q-32 28-23 33M28 7Q32 24 23 34" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.2"/>`;
    case 'pony':
      return `<path d="M23-21Q42-31 47-12Q50 1 41 13Q48 30 35 42Q39 21 30 11Q29 2 23-5Z" fill="${HAIR_COLOR}"/><ellipse cx="31" cy="-15" rx="8" ry="5" fill="${accent}"/><path d="M38-17Q43-5 37 9" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2"/>`;
    case 'braids':
      return `<path d="M-24 0Q-35 18-27 39M24 0Q35 18 27 39" fill="none" stroke="${HAIR_COLOR}" stroke-width="13" stroke-linecap="round"/><path d="M-31 9l9 8-9 8 8 9M31 9l-9 8 9 8-8 9" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="-27" cy="38" rx="7" ry="4" fill="${accent}"/><ellipse cx="27" cy="38" rx="7" ry="4" fill="${accent}"/>`;
    default: return '';
  }
}

function frontHair(hair) {
  switch (hair) {
    case 'crop':
      return `<path d="M-29-6Q-31-30-7-33Q18-37 28-16L29-4Q22-7 19-17Q5-11-3-19Q-14-11-25-14Z" fill="${HAIR_COLOR}"/><path d="M-14-26Q-1-32 13-26" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.3" stroke-linecap="round"/>`;
    case 'curls':
      return `<path d="M-28-6Q-33-29-9-34Q17-39 30-13L28-1Q20-15 17-15Q10-9 4-17Q-5-9-12-17Q-21-11-28-6Z" fill="${HAIR_COLOR}"/>${[[-26,-18,9],[-19,-28,10],[-7,-32,11],[7,-31,11],[21,-25,10],[28,-13,8]].map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${HAIR_COLOR}"/>`).join('')}<path d="M-20-27q4-5 9-1M0-32q5-4 10 0M19-25q5 0 6 5" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.4" stroke-linecap="round"/>`;
    case 'fringe':
      return `<path d="M-29-5Q-32-30-7-34Q18-36 30-17L29-1L21-8L19-20L11-9L8-19L0-6L-5-17L-16-7L-18-18L-27-4Z" fill="${HAIR_COLOR}"/><path d="M-16-27Q-1-33 15-26" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.2" stroke-linecap="round"/>`;
    case 'bob':
      return `<path d="M-30 2Q-32-28-8-34Q15-38 29-19L30 6Q20-2 14-20Q-2-3-26-10L-26 14Z" fill="${HAIR_COLOR}"/><path d="M-18-25Q-6-31 9-28" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.2" stroke-linecap="round"/>`;
    case 'pony':
      return `<path d="M-30-2Q-34-26-11-33Q12-40 29-21L30 0Q16-9 10-22Q-5-5-26-9L-27 9Z" fill="${HAIR_COLOR}"/><path d="M-16-25Q-6-32 10-29" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.2" stroke-linecap="round"/>`;
    case 'braids':
      return `<path d="M-30 1Q-31-29-9-34Q11-38 28-21L30 2Q13-5 1-22Q-11-6-28 1Z" fill="${HAIR_COLOR}"/><path d="M0-31v8M-18-24q6-4 12-5M8-28q8 2 12 7" fill="none" stroke="${HAIR_LIGHT}" stroke-width="2.1" stroke-linecap="round"/>`;
    default: return '';
  }
}

function clothes(outfit, p, color, skin) {
  const top = p.bodyY, bottom = p.bodyBottom, half = p.bodyWidth / 2;
  const left = 80 - half, right = 80 + half, dark = blend(color, '#4F5557', .28);
  const pale = blend(color, CREAM, .63), trousers = outfit === 'pajamas' ? pale : '#82938D';
  const armEnd = bottom - 5;
  const bodyPath = `M${left+3} ${top}Q80 ${top-9} ${right-3} ${top}L${right+3} ${bottom-6}Q80 ${bottom+6} ${left-3} ${bottom-6}Z`;
  const sleeves = (fill, long = true) => `<path d="M${left+5} ${top+2}Q${left-7} ${top+10} ${left-12} ${long ? armEnd-5 : top+19}L${left-1} ${long ? armEnd : top+24}L${left+11} ${top+10}M${right-5} ${top+2}Q${right+7} ${top+10} ${right+12} ${long ? armEnd-5 : top+19}L${right+1} ${long ? armEnd : top+24}L${right-11} ${top+10}" fill="${fill}"/>`;
  let garment;
  switch (outfit) {
    case 'overalls':
      garment = `${sleeves(CREAM, false)}<path d="${bodyPath}" fill="${CREAM}"/><path d="M${left+4} ${top+16}H${right-4}L${right+2} ${bottom-4}Q80 ${bottom+6} ${left-2} ${bottom-4}Z" fill="${color}"/><path d="M${left+8} ${top+2}V${top+24}M${right-8} ${top+2}V${top+24}" stroke="${color}" stroke-width="7"/><circle cx="${left+8}" cy="${top+19}" r="2.2" fill="${CREAM}"/><circle cx="${right-8}" cy="${top+19}" r="2.2" fill="${CREAM}"/><path d="M71 ${top+30}h18v10q-9 6-18 0Z" fill="${pale}"/><path d="M74 ${top+33}h12" stroke="${dark}" stroke-width="1.2" opacity=".5"/>`;
      break;
    case 'sweater':
      garment = `${sleeves(color)}<path d="${bodyPath}" fill="${color}"/><path d="M${left+2} ${bottom-8}Q80 ${bottom-2} ${right-2} ${bottom-8}" fill="none" stroke="${dark}" stroke-width="5"/><path d="M70 ${top+16}l5 5 5-5 5 5 5-5M68 ${top+25}l6 5 6-5 6 5 6-5" fill="none" stroke="${pale}" stroke-width="2" stroke-linecap="round"/>`;
      break;
    case 'hoodie':
      garment = `<path d="M64 ${top+7}Q58 ${top-12} 80 ${top-14}Q102 ${top-12} 96 ${top+7}" fill="${dark}"/>${sleeves(color)}<path d="${bodyPath}" fill="${color}"/><path d="M71 ${top+3}l9 9 9-9M75 ${top+10}v12M85 ${top+10}v12" fill="none" stroke="${pale}" stroke-width="2" stroke-linecap="round"/><path d="M68 ${bottom-22}l5-9h14l5 9v10H68Z" fill="${pale}"/><path d="M74 ${bottom-29}l-4 8m16-8 4 8" stroke="${dark}" stroke-width="1.2" opacity=".6"/>`;
      break;
    case 'dress':
      garment = `${sleeves(color, false)}<path d="M${left+4} ${top}Q80 ${top-8} ${right-4} ${top}L${right-1} ${top+21}L${right+12} ${bottom+7}Q80 ${bottom+18} ${left-12} ${bottom+7}L${left+1} ${top+21}Z" fill="${color}"/><path d="M${left+2} ${top+24}Q80 ${top+29} ${right-2} ${top+24}" fill="none" stroke="${pale}" stroke-width="4"/><path d="M${left-8} ${bottom+5}Q80 ${bottom+12} ${right+8} ${bottom+5}" fill="none" stroke="${dark}" stroke-width="2"/><path d="M76 ${top+25}l-6 5 5 4 5-6 5 6 5-4-6-5Z" fill="${pale}"/>`;
      break;
    case 'pajamas':
      garment = `${sleeves(color)}<path d="${bodyPath}" fill="${color}"/><path d="M80 ${top+5}V${bottom-4}" stroke="${pale}" stroke-width="2"/><path d="M69 ${top+2}l11 8 11-8" fill="none" stroke="${pale}" stroke-width="3"/><circle cx="82" cy="${top+17}" r="1.5" fill="${CREAM}"/><circle cx="82" cy="${top+27}" r="1.5" fill="${CREAM}"/><path d="M69 ${top+20}l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5Z" fill="${CREAM}"/><path d="M91 ${bottom-17}l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5Z" fill="${CREAM}"/>`;
      break;
    default:
      garment = `${sleeves(color, false)}<path d="${bodyPath}" fill="${color}"/><path d="M70 ${top+2}q10 12 20 0" fill="none" stroke="${dark}" stroke-width="2.8"/><path d="M80 ${top+20}l2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9Z" fill="${pale}"/>`;
  }
  const shoe = outfit === 'pajamas' ? dark : '#706158';
  const feetY = p.legsBottom;
  return `<path d="M${left+4} ${top+12}Q${left-6} ${top+28} ${left-9} ${armEnd}M${right-4} ${top+12}Q${right+6} ${top+28} ${right+9} ${armEnd}" fill="none" stroke="${skin}" stroke-width="11" stroke-linecap="round"/>
    <path d="M70 ${p.legsY}L69 ${feetY}M90 ${p.legsY}L91 ${feetY}" stroke="${trousers}" stroke-width="15" stroke-linecap="round"/>
    <path d="M69 ${feetY-1}q-12 0-14 8q8 5 22 1v-7Z" fill="${shoe}"/><path d="M91 ${feetY-1}q12 0 14 8q-8 5-22 1v-7Z" fill="${shoe}"/>
    ${garment}<ellipse cx="${left-9}" cy="${armEnd+1}" rx="6" ry="7" fill="${skin}"/><ellipse cx="${right+9}" cy="${armEnd+1}" rx="6" ry="7" fill="${skin}"/>`;
}

/** SVG contains only validated palette values and fixed paths; profile names never enter its markup. */
export function renderHuman(character, { className = '', portrait = false } = {}) {
  const role = memberRole(character) || FAMILY_ROLES[0];
  const profile = normalizeMember(character, role);
  const skin = SKIN_TONES.find(item => item.id === profile.skin).color;
  const color = FAVORITE_COLORS.find(item => item.id === profile.color).color;
  const p = PROPORTIONS[profile.ageGroup];
  const skinShadow = blend(skin, '#64443A', .12);
  const faceInk = profile.skin === 'cocoa' ? '#352D2A' : INK;
  const blush = blend(skin, '#DD8985', .34);
  const classes = typeof className === 'string' ? className.replace(/[^a-zA-Z0-9_\- ]/g, '').trim().slice(0, 120) : '';
  const scale = p.head / 30;
  // A head-and-shoulders crop keeps all six hairstyles legible in small chooser buttons.
  const portraitTop = p.faceY - p.head * 1.5;
  const viewBox = portrait === true ? `${80 - p.head * 1.8} ${portraitTop} ${p.head * 3.6} ${p.bodyY + 18 - portraitTop}` : '0 0 160 210';
  return `<svg xmlns="http://www.w3.org/2000/svg" class="human-character${classes ? ` ${classes}` : ''}" viewBox="${viewBox}" ${portrait === true ? 'overflow="hidden" ' : ''}fill="none" aria-hidden="true" focusable="false">
    <ellipse cx="80" cy="197" rx="43" ry="6" fill="#7C7762" opacity=".12"/>
    <g transform="translate(80 ${p.faceY}) scale(${scale})">${backHair(profile.hair, color)}</g>
    <path d="M73 ${p.faceY+p.head-6}v17q7 7 14 0v-17" fill="${skinShadow}"/>
    ${clothes(profile.outfit, p, color, skin)}
    <g transform="translate(80 ${p.faceY}) scale(${scale})">
      <ellipse cx="-29" cy="4" rx="6" ry="8" fill="${skin}"/><ellipse cx="29" cy="4" rx="6" ry="8" fill="${skin}"/>
      <ellipse cx="-30" cy="5" rx="2" ry="4" fill="${skinShadow}"/><ellipse cx="30" cy="5" rx="2" ry="4" fill="${skinShadow}"/>
      <path d="M-29-6Q-30-31 0-31Q30-31 29-6L28 13Q24 33 0 34Q-24 33-28 13Z" fill="${skin}"/>
      <ellipse cx="-17" cy="15" rx="6.5" ry="3.3" fill="${blush}"/><ellipse cx="17" cy="15" rx="6.5" ry="3.3" fill="${blush}"/>
      <path d="M-16-1q4-3 8-1M8-2q4-2 8 1" stroke="${HAIR_COLOR}" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="-11" cy="7" rx="2.5" ry="3.4" fill="${faceInk}"/><ellipse cx="11" cy="7" rx="2.5" ry="3.4" fill="${faceInk}"/>
      <circle cx="-10.3" cy="6" r=".7" fill="${CREAM}"/><circle cx="11.7" cy="6" r=".7" fill="${CREAM}"/>
      <path d="M0 10l-2 6h4" stroke="${skinShadow}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-6 22q6 6 12 0" stroke="${faceInk}" stroke-width="1.8" stroke-linecap="round"/>
      ${frontHair(profile.hair)}
    </g>
  </svg>`;
}
