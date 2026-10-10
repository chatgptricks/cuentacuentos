import { FAMILY_ROLES, createFamilyMember, normalizeFamily } from './family-characters.js';

export const FAMILY_COMPANION_ROLES = Object.freeze(FAMILY_ROLES.filter(role => role.id !== 'child'));
const relativeRole = value => FAMILY_COMPANION_ROLES.some(role => role.id === value) ? value : undefined;

/** Keep the complete editable family, while one relative shares each story. */
export function prepareFamilyStory(input, { companionRole, random = () => 0 } = {}) {
  let family = normalizeFamily(input);
  const requested = relativeRole(companionRole);
  let addedCompanion = false;
  if (requested && !family.members.some(member => member.role === requested)) {
    const saved = Array.isArray(input?.members) ? input.members.find(member => member &&
      (member.role === requested || member.id === `family-${requested}`)) : undefined;
    const added = saved ? { ...saved, role: requested, enabled: true } : createFamilyMember(requested);
    family = normalizeFamily({ members: [...family.members, added] });
    addedCompanion = true;
  }
  let relatives = family.members.filter(member => member.role !== 'child');
  if (!relatives.length) {
    family = normalizeFamily({ members: [...family.members, createFamilyMember('sibling')] });
    relatives = family.members.filter(member => member.role !== 'child');
    addedCompanion = true;
  }
  // Consume one seeded draw even for an explicit choice, so a role change alone
  // does not shift all subsequent plot choices for the same seed and profile.
  const value = typeof random === 'function' ? Number(random()) : 0;
  const index = Math.max(0, Math.min(relatives.length - 1, Math.floor((Number.isFinite(value) ? value : 0) * relatives.length)));
  const companion = relatives.find(member => member.role === requested) || relatives[index];
  const hero = family.members[0];
  return { family, hero, companion, characters: [hero, companion], companionRole: companion.role, addedCompanion };
}

function activityKind(activity) {
  if (activity?.stationary === true) return 'stationary';
  const objects = Array.isArray(activity?.objects) ? activity.objects : [];
  const id = typeof activity?.id === 'string' ? activity.id.replace(/^family-/u, '') : '';
  if (objects.some(id => ['bell', 'drum', 'flute'].includes(id))) return 'music';
  if (objects.some(id => ['seed', 'acorn', 'watering-can'].includes(id))) return 'garden';
  if (objects.some(id => ['kite', 'pinwheel'].includes(id))) return 'wind';
  if (objects.includes('apple') || ['snack', 'picnic', 'apple-snack'].includes(id)) return 'food';
  if (objects.some(id => ['crayons', 'paintbrush', 'puzzle', 'paper-star', 'telescope', 'magnifying-glass', 'crystal', 'shell', 'pearl'].includes(id)) ||
    ['album', 'theatre', 'theater', 'puppets', 'treasure-map', 'star-map', 'flowers'].includes(id)) return 'create';
  return 'care';
}

const sharedMoments = {
  music: {
    prepare: (h, c) => `${c} marcó un ritmo suave y ${h} eligió los sonidos que quería añadir.`,
    progress: (h, c) => `${c} dejó un turno de silencio y ${h} respondió con otro sonido.`,
    finish: (h, c) => `${c} escuchó la canción con ${h} y repitieron el ritmo que habían creado.`,
  },
  garden: {
    prepare: (h, c) => `${c} preparó un espacio en la tierra y ${h} eligió dónde empezar los cuidados.`,
    progress: (h, c) => `${c} comprobó la humedad y ${h} decidió si hacía falta un poco de agua.`,
    finish: (h, c) => `${c} organizó los cuidados con ${h} y dejaron la tierra lista para otra visita.`,
  },
  wind: {
    prepare: (h, c) => `${c} sostuvo los materiales y ${h} escogió un rincón amplio para la prueba.`,
    progress: (h, c) => `${c} señaló un cambio de la brisa y ${h} decidió cómo ajustar su prueba.`,
    finish: (h, c) => `${c} recordó la prueba con ${h} y acordaron repetirla cuando hubiera otra brisa.`,
  },
  food: {
    prepare: (h, c) => `${c} acomodó una porción y ${h} dejó espacio para compartir la merienda.`,
    progress: (h, c) => `${c} eligió un lugar para la merienda y ${h} preparó el suyo cerca.`,
    finish: (h, c) => `${c} recordó la merienda con ${h} y eligieron qué preparar otro día.`,
  },
  create: {
    prepare: (h, c) => `${c} ordenó el espacio de trabajo y ${h} eligió qué detalle empezar.`,
    progress: (h, c) => `${c} señaló un detalle y ${h} decidió cómo combinarlo con su propia idea.`,
    finish: (h, c) => `${c} compartió su idea con ${h} y recordaron cómo habían creado el resultado.`,
  },
  stationary: {
    prepare: (h, c) => `${c} eligió un sitio para observar y ${h} empezó su dibujo sin mover los tesoros.`,
    progress: (h, c) => `${c} señaló un reflejo y ${h} lo añadió al dibujo sin mover los tesoros.`,
    finish: (h, c) => `${c} miró el dibujo con ${h} y dejaron los tesoros donde los habían encontrado.`,
  },
  care: {
    prepare: (h, c) => `${c} propuso una tarea y ${h} eligió cómo compartirla en el mismo plan.`,
    progress: (h, c) => `${c} completó una parte pequeña y ${h} la combinó con su propio trabajo.`,
    finish: (h, c) => `${c} escuchó el recuerdo de ${h} y añadió lo que más le había gustado.`,
  },
};

const babyMoments = {
  music: {
    prepare: (h, c) => `${c} hizo un sonido suave y ${h} lo convirtió en el primer ritmo.`,
    progress: (h, c) => `${c} repitió un sonido y ${h} dejó un silencio para escucharlo.`,
    finish: (h, c) => `${c} respondió con un sonido y ${h} cantó despacio a su lado.`,
  },
  garden: {
    prepare: (h, c) => `${c} hizo un sonido suave y ${h} preparó un lugar cómodo junto a la maceta.`,
    progress: (h, c) => `${c} miró la tierra y ${h} explicó cómo empezar los cuidados.`,
    finish: (h, c) => `${c} hizo un sonido alegre y ${h} preparó otra visita para revisar la tierra.`,
  },
  wind: {
    prepare: (h, c) => `${c} miró los colores y ${h} preparó una pausa para observarlos juntos.`,
    progress: (h, c) => `${c} hizo un sonido alegre y ${h} contó despacio lo que movía la brisa.`,
    finish: (h, c) => `${c} sonrió al ver los colores y ${h} recordó lo que habían observado.`,
  },
  food: {
    prepare: (h, c) => `${c} hizo un sonido alegre y ${h} dejó un sitio cómodo cerca.`,
    progress: (h, c) => `${c} sonrió al ver los colores y ${h} preparó la merienda a su lado.`,
    finish: (h, c) => `${c} hizo otro sonido suave y ${h} guardó ese momento como recuerdo.`,
  },
  create: {
    prepare: (h, c) => `${c} miró un color y ${h} le dio un lugar en su creación.`,
    progress: (h, c) => `${c} sonrió al ver un detalle y ${h} decidió conservarlo en su creación.`,
    finish: (h, c) => `${c} hizo un sonido alegre y ${h} compartió su creación desde un sitio cómodo.`,
  },
  stationary: {
    prepare: (h, c) => `${c} hizo un sonido suave y ${h} buscó un sitio cómodo para observar.`,
    progress: (h, c) => `${c} miró un reflejo y ${h} lo añadió a su dibujo sin mover los tesoros.`,
    finish: (h, c) => `${c} sonrió ante el dibujo y ${h} dejó los tesoros en su lugar.`,
  },
  care: {
    prepare: (h, c) => `${c} hizo un sonido suave y ${h} dejó un rincón cómodo para compartir.`,
    progress: (h, c) => `${c} respondió con otro sonido y ${h} adaptó el plan para escuchar con calma.`,
    finish: (h, c) => `${c} sonrió junto a ${h} y el momento compartido quedó guardado en su memoria.`,
  },
};

/** A relative contributes to the activity and the protagonist responds to that contribution. */
export function familyStoryMoment(hero, companion, activity, phase = 'prepare') {
  const role = relativeRole(companion?.role) || 'sibling';
  const profiles = normalizeFamily({ members: [{ ...hero, role: 'child' }, { ...companion, role, enabled: true }] });
  const h = profiles.members[0].name;
  const c = profiles.members.find(member => member.role === role).name;
  const moments = role === 'baby' ? babyMoments : sharedMoments;
  const selectedPhase = ['prepare', 'progress', 'finish'].includes(phase) ? phase : 'prepare';
  return moments[activityKind(activity)][selectedPhase](h, c);
}
