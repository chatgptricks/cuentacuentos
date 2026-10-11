/** Gentle antagonists for Acción. Each one has a motive and changes by the end of the story. */
export const VILLAIN_ATLASES = Object.freeze({
  villains: Object.freeze({ file: 'villains.png', columns: 4, rows: 2 }),
});

/**
 * Art files that are registered but not yet painted. The build skips them while they are
 * missing and the reader shows no sprite for them; remove a file here once it is added.
 */
export const PENDING_ART = Object.freeze([]);

// Atlas order: top row left to right, then bottom row.
const rows = [
  ['troll', 'trol gruñón', 'm', ['Gruñón', 'Pedrusco', 'Rocón']],
  ['ghost', 'fantasma miedoso', 'm', ['Susurro', 'Bruma', 'Ulular']],
  ['crow', 'cuervo coleccionista', 'm', ['Azabache', 'Graznido', 'Tizne']],
  ['pirate-cat', 'gata pirata', 'f', ['Bigotes', 'Zarpa', 'Garfia']],
  ['ogre', 'ogro glotón', 'm', ['Tragón', 'Zampón', 'Barrigón']],
  ['imp', 'duende travieso', 'm', ['Pillín', 'Trasto', 'Revoltijo']],
  ['spider', 'araña tejedora', 'f', ['Hilacha', 'Madeja', 'Ovillina']],
  ['giant', 'gigante despistado', 'm', ['Torreón', 'Grandullón', 'Peñasco']],
];

export const VILLAIN_NAMES = Object.freeze(Object.fromEntries(rows.map(([id, , , names]) => [id, Object.freeze(names)])));
export const VILLAINS = Object.freeze(rows.map(([id, label, gender, names], index) => Object.freeze({
  id, name: names[0], label, article: gender === 'f' ? 'la' : 'el', gender, category: 'villain',
  atlas: Object.freeze({ sheet: 'villains', x: index % 4, y: Math.floor(index / 4) }), sound: id,
})));
export const getVillain = id => VILLAINS.find(villain => villain.id === id);
