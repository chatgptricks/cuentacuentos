/** Atlas cells and story identities share one immutable catalogue. */
export const CHARACTER_ATLASES = Object.freeze(Object.fromEntries([
  ['main', 'characters.png', 4, 2],
  ['extra', 'characters-extra.png', 2, 2],
  ['animals-meadow', 'animals-meadow.png', 4, 2],
  ['animals-world', 'animals-world.png', 4, 2],
  ['animals-wings-sea', 'animals-wings-sea.png', 4, 2],
  ['fantasy-forest', 'fantasy-forest.png', 4, 2],
  ['fantasy-wonders', 'fantasy-wonders.png', 4, 2],
].map(([id, file, columns, rows]) => [id, Object.freeze({ file, columns, rows })])));

const originals = [
  { id: 'fox', name: 'Lila', label: 'zorrita', article: 'la', gender: 'f', category: 'animal', atlas: { x: 0, y: 0 }, sound: 'fox', names: ['Lila', 'Alba', 'Mora', 'Mila', 'Duna'] },
  { id: 'mouse', name: 'Tino', label: 'ratón', article: 'el', gender: 'm', category: 'animal', atlas: { x: 1, y: 0 }, sound: 'mouse', names: ['Tino', 'Teo', 'Nico', 'Milo', 'Pipo'] },
  { id: 'rabbit', name: 'Nube', label: 'coneja', article: 'la', gender: 'f', category: 'animal', atlas: { x: 2, y: 0 }, sound: 'rabbit', names: ['Nube', 'Luna', 'Ada', 'Lola', 'Nina'] },
  { id: 'bear', name: 'Bruno', label: 'oso', article: 'el', gender: 'm', category: 'animal', atlas: { x: 3, y: 0 }, sound: 'bear', names: ['Bruno', 'Beto', 'Taro', 'Rulo', 'Leo'] },
  { id: 'knight', name: 'Vera', label: 'caballera', article: 'la', gender: 'f', category: 'fantasy', atlas: { x: 0, y: 1 }, sound: 'knight', names: ['Vera', 'Inés', 'Cora', 'Eva', 'Sara'] },
  { id: 'wizard', name: 'Luma', label: 'maga', article: 'la', gender: 'f', category: 'fantasy', atlas: { x: 1, y: 1 }, sound: 'wizard', names: ['Luma', 'Celia', 'Iris', 'Elia', 'Violeta'] },
  { id: 'dragon', name: 'Chispa', label: 'dragón', article: 'el', gender: 'm', category: 'fantasy', atlas: { x: 2, y: 1 }, sound: 'dragon', names: ['Chispa', 'Tizón', 'Toto', 'Sol', 'Fuego'] },
  { id: 'owl', name: 'Olmo', label: 'búho', article: 'el', gender: 'm', category: 'animal', atlas: { x: 3, y: 1 }, sound: 'owl', names: ['Olmo', 'Abel', 'Oto', 'Sabio', 'Bú'] },
  { id: 'squirrel', name: 'Tila', label: 'ardilla', article: 'la', gender: 'f', category: 'animal', atlas: { sheet: 'extra', x: 0, y: 0 }, sound: 'squirrel', names: ['Tila', 'Avellana', 'Canela', 'Nela', 'Pina'] },
  { id: 'frog', name: 'Rita', label: 'rana', article: 'la', gender: 'f', category: 'animal', atlas: { sheet: 'extra', x: 1, y: 0 }, sound: 'frog', names: ['Rita', 'Brisa', 'Gota', 'Lina', 'Tina'] },
  { id: 'turtle', name: 'Tula', label: 'tortuga', article: 'la', gender: 'f', category: 'animal', atlas: { sheet: 'extra', x: 0, y: 1 }, sound: 'turtle', names: ['Tula', 'Menta', 'Uma', 'Oliva', 'Lenta'] },
  { id: 'fairy', name: 'Aura', label: 'hada', article: 'el', gender: 'f', category: 'fantasy', atlas: { sheet: 'extra', x: 1, y: 1 }, sound: 'fairy', names: ['Aura', 'Estela', 'Flora', 'Alina', 'Vela'] },
];

// Each row is in atlas order: the top four cells, then the bottom four cells.
const sheets = [
  { id: 'animals-meadow', category: 'animal', characters: [
    ['hedgehog', 'erizo', 'm', ['Pincho', 'Púas', 'Naranjo', 'Bram', 'Abeto']],
    ['raccoon', 'mapache', 'm', ['Antifaz', 'Nuez', 'Canelo', 'Murmi', 'Rabi']],
    ['deer', 'cierva', 'f', ['Celeste', 'Aria', 'Zelia', 'Belisa', 'Malva']],
    ['otter', 'nutria', 'f', ['Ola', 'Nadina', 'Marisa', 'Liria', 'Senda']],
    ['beaver', 'castor', 'm', ['Tronco', 'Nudo', 'Ramiro', 'Dorio', 'Bambú']],
    ['badger', 'tejón', 'm', ['Copo', 'Mosto', 'Musgo', 'Erdo', 'Bajo']],
    ['wolf', 'lobo', 'm', ['Aullín', 'Roco', 'Lupín', 'Gris', 'Ulmo']],
    ['lynx', 'lince', 'f', ['Vega', 'Miska', 'Nara', 'Licya', 'Tesela']],
  ] },
  { id: 'animals-world', category: 'animal', characters: [
    ['lion', 'león', 'm', ['Leoncio', 'Rayo', 'Bronce', 'Regal', 'Ambaro']],
    ['tiger', 'tigresa', 'f', ['Rayita', 'Zarina', 'Tigria', 'Fresa', 'Telma']],
    ['elephant', 'elefanta', 'f', ['Trompa', 'Elea', 'Enara', 'Pompa', 'Bimba']],
    ['giraffe', 'jirafa', 'f', ['Alta', 'Alicia', 'Dalia', 'Jirina', 'Filipa']],
    ['zebra', 'cebra', 'f', ['Zeta', 'Zuri', 'Blanca', 'Veta', 'Zebina']],
    ['monkey', 'mono', 'm', ['Coco', 'Nacho', 'Banana', 'Macu', 'Mico']],
    ['panda', 'panda', 'm', ['Pancho', 'Manchón', 'Chao', 'Mei', 'Pompón']],
    ['koala', 'koala', 'm', ['Euca', 'Eucalipto', 'Koali', 'Kimbo', 'Yuki']],
  ] },
  { id: 'animals-wings-sea', category: 'animal', characters: [
    ['penguin', 'pingüino', 'm', ['Polo', 'Pingu', 'Fresquito', 'Kiro', 'Nival']],
    ['flamingo', 'flamenco', 'm', ['Coral', 'Flami', 'Rojo', 'Zanco', 'Melón']],
    ['parrot', 'loro', 'm', ['Pico', 'Lorito', 'Papayo', 'Colorín', 'Plumi']],
    ['peacock', 'pavo real', 'm', ['Abanico', 'Pavín', 'Azulito', 'Iridio', 'Ocelio']],
    ['dolphin', 'delfín', 'm', ['Dilo', 'Marino', 'Nautilo', 'Salti', 'Brinco']],
    ['seal', 'foca', 'f', ['Espuma', 'Aleta', 'Isla', 'Marea', 'Perla']],
    ['octopus', 'pulpo', 'm', ['Ocho', 'Tentín', 'Pulpi', 'Octavio', 'Pachi']],
    ['whale', 'ballena', 'f', ['Azul', 'Oceana', 'Balina', 'Profunda', 'Aurora']],
  ] },
  { id: 'fantasy-forest', category: 'fantasy', characters: [
    ['unicorn', 'unicornio', 'm', ['Destello', 'Unio', 'Zafiro', 'Prisma', 'Claro']],
    ['merlin', 'mago', 'm', ['Merlín', 'Arcanio', 'Cedrón', 'Folio', 'Sortilio']],
    ['elf', 'elfo', 'm', ['Silvio', 'Eldo', 'Arbolio', 'Verderín', 'Arendel']],
    ['good-witch', 'bruja amable', 'f', ['Melisa', 'Amelia', 'Hierba', 'Rosalía', 'Glenda']],
    ['wise-elder', 'sabio', 'm', ['Amadeo', 'Sereno', 'Eloy', 'Silvano', 'Tomás']],
    ['princess', 'princesa', 'f', ['Elisa', 'Amara', 'Leonora', 'Olena', 'Isadora']],
    ['king', 'rey', 'm', ['Aurelio', 'Leandro', 'Ramón', 'Honorio', 'Valerio']],
    ['royal-knight', 'caballero', 'm', ['Darío', 'Galo', 'Tristán', 'Baldo', 'Arnau']],
  ] },
  { id: 'fantasy-wonders', category: 'fantasy', characters: [
    ['wise-grandmother', 'abuela sabia', 'f', ['Rosita', 'Amparo', 'Matilde', 'Carmela', 'Josefa']],
    ['goblin', 'goblin amistoso', 'm', ['Brote', 'Grumo', 'Pepín', 'Tocón', 'Zumo']],
    ['gnome', 'gnomo', 'm', ['Tobi', 'Borlín', 'Seto', 'Grano', 'Dindo']],
    ['mermaid', 'sirena', 'f', ['Marina', 'Nerea', 'Sirena', 'Salina', 'Nácar']],
    ['phoenix', 'fénix', 'm', ['Ascua', 'Rubio', 'Renuevo', 'Brián', 'Áureo']],
    ['yeti', 'yeti suave', 'm', ['Copito', 'Nevado', 'Peluche', 'Nivo', 'Suavín']],
    ['pegasus', 'pegaso', 'm', ['Alado', 'Pegui', 'Vuelo', 'Celino', 'Aerín']],
    ['tree-spirit', 'espíritu del árbol', 'm', ['Raíces', 'Raigal', 'Trébol', 'Frondo', 'Savia']],
  ] },
];

const entries = [...originals, ...sheets.flatMap(sheet => sheet.characters.map(([id, label, gender, names], index) => ({
  id, name: names[0], label, article: gender === 'f' ? 'la' : 'el', gender, category: sheet.category,
  atlas: { sheet: sheet.id, x: index % 4, y: Math.floor(index / 4) }, sound: id, names,
})))];

export const CHARACTER_NAMES = Object.freeze(Object.fromEntries(entries.map(character => [character.id, Object.freeze([...character.names])])));
export const CHARACTERS = Object.freeze(entries.map(({ names, ...character }) => Object.freeze({ ...character, atlas: Object.freeze(character.atlas) })));
export const getCharacter = id => CHARACTERS.find(character => character.id === id);
