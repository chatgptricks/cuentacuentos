/** Gentle antagonists for Acción. Each one has a motive and changes by the end of the story. */
export const VILLAIN_ATLASES = Object.freeze({
  villains: Object.freeze({ file: 'villains.png', columns: 4, rows: 2 }),
  'villains-2': Object.freeze({ file: 'villains-2.png', columns: 4, rows: 2 }),
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
  ['winter-witch', 'bruja del invierno', 'f', ['Escarcha', 'Nevisca', 'Gélida']],
  ['shark', 'tiburón refunfuñón', 'm', ['Dentón', 'Aletazo', 'Morrudo']],
  ['crab', 'cangrejo cascarrabias', 'm', ['Pinzas', 'Tenazas', 'Gruñipinza']],
  ['storm-cloud', 'nube de tormenta', 'f', ['Nubarrona', 'Tronera', 'Chaparrona']],
  ['thief-rat', 'rata ladrona', 'f', ['Ratilda', 'Rapiña', 'Escurridiza']],
  ['scarecrow', 'espantapájaros enfadado', 'm', ['Pajarón', 'Paja', 'Remiendo']],
  ['envious-wizard', 'mago envidioso', 'm', ['Celosín', 'Morbecio', 'Envidiano']],
  ['vain-snake', 'serpiente presumida', 'f', ['Siseña', 'Escamita', 'Presumida']],
];

export const VILLAIN_NAMES = Object.freeze(Object.fromEntries(rows.map(([id, , , names]) => [id, Object.freeze(names)])));
export const VILLAINS = Object.freeze(rows.map(([id, label, gender, names], index) => Object.freeze({
  id, name: names[0], label, article: gender === 'f' ? 'la' : 'el', gender, category: 'villain',
  atlas: Object.freeze({ sheet: index < 8 ? 'villains' : 'villains-2', x: index % 4, y: Math.floor(index % 8 / 4) }), sound: id,
})));
export const getVillain = id => VILLAINS.find(villain => villain.id === id);
