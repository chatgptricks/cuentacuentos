/**
 * Secondary characters: they never lead a story, but fill roles such as a lost baby,
 * a neighbor who sends a parcel, or a pet left in the family's care.
 */
export const SUPPORTING_ATLASES = Object.freeze({
  'animals-babies': Object.freeze({ file: 'animals-babies.png', columns: 4, rows: 2 }),
  'town-folk': Object.freeze({ file: 'town-folk.png', columns: 4, rows: 2 }),
  pets: Object.freeze({ file: 'pets.png', columns: 4, rows: 2 }),
});

// Atlas order: top row left to right, then bottom row.
const sheets = [
  ['animals-babies', 'baby', [
    ['chick', 'pollito', 'm', ['Pío', 'Plumín', 'Amarillito']],
    ['duckling', 'patito', 'm', ['Cuac', 'Chapo', 'Patucho']],
    ['fawn', 'cervatillo', 'm', ['Motitas', 'Saltito', 'Ciervín']],
    ['bear-cub', 'osezno', 'm', ['Mielito', 'Peluso', 'Bolón']],
    ['foal', 'potrillo', 'm', ['Trotecito', 'Potri', 'Galopín']],
    ['penguin-chick', 'pingüinito', 'm', ['Pingo', 'Hielito', 'Frac']],
    ['sea-turtle-hatchling', 'tortuguita marina', 'f', ['Arenita', 'Olita', 'Conchita']],
    ['seal-pup', 'foquita', 'f', ['Bigotitos', 'Espumita', 'Lunita']],
  ]],
  ['town-folk', 'town', [
    ['mail-carrier', 'cartera', 'f', ['Marta', 'Paula', 'Remedios']],
    ['baker', 'panadero', 'm', ['Benito', 'Julián', 'Anselmo']],
    ['teacher', 'maestra', 'f', ['Lucía', 'Elena', 'Clara']],
    ['dentist', 'dentista', 'm', ['Gonzalo', 'Ernesto', 'Martín']],
    ['gardener', 'jardinera', 'f', ['Hortensia', 'Azucena', 'Gardenia']],
    ['train-driver', 'conductor de tren', 'm', ['Rogelio', 'Félix', 'Agustín']],
    ['market-seller', 'vendedora del mercado', 'f', ['Dolores', 'Pilar', 'Rosario']],
    ['lighthouse-keeper', 'guardián del faro', 'm', ['Fermín', 'Bartolo', 'Ulises']],
  ]],
  ['pets', 'pet', [
    ['puppy', 'perrito', 'm', ['Firulais', 'Bobi', 'Rayas']],
    ['kitten', 'gatito', 'm', ['Misi', 'Pelusa', 'Minino']],
    ['goldfish', 'pez', 'm', ['Burbuja', 'Nemo', 'Doradito']],
    ['hamster', 'hámster', 'm', ['Pipas', 'Galleta', 'Mofletes']],
    ['canary', 'canario', 'm', ['Piolín', 'Trino', 'Limón']],
    ['guinea-pig', 'cobaya', 'f', ['Patata', 'Rizitos', 'Cuqui']],
    ['tortoise', 'tortuga de tierra', 'f', ['Lechuga', 'Calma', 'Pasito']],
    ['lop-rabbit', 'conejito', 'm', ['Orejotas', 'Algodoncito', 'Zanahorio']],
  ]],
];

export const SUPPORTING_NAMES = Object.freeze(Object.fromEntries(sheets.flatMap(([, , rows]) => rows.map(([id, , , names]) => [id, Object.freeze(names)]))));
export const SUPPORTING = Object.freeze(sheets.flatMap(([sheet, category, rows]) => rows.map(([id, label, gender, names], index) => Object.freeze({
  id, name: names[0], label, article: gender === 'f' ? 'la' : 'el', gender, category,
  atlas: Object.freeze({ sheet, x: index % 4, y: Math.floor(index / 4) }), sound: id,
}))));
export const getSupporting = id => SUPPORTING.find(character => character.id === id);
