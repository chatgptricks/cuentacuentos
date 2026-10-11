/** Local recordings and original scores; sources and edits are in docs/music-sources.md. */
export const MUSIC_TRACKS = Object.freeze({
  adventure: 'music-adventure.mp3',
  action: 'music-action.mp3',
  relax: 'music-relax-original.mp3',
  friends: 'music-friends-original.mp3',
  family: 'music-relax-original.mp3',
});

export const MUSIC_CREDITS = Object.freeze([
  { title: 'Castles in the Sky', author: 'Scott Buckley', url: 'https://www.scottbuckley.com.au/library/castles-in-the-sky/' },
  { title: 'Childhood', author: 'Scott Buckley', url: 'https://www.scottbuckley.com.au/library/childhood/' },
  { title: 'Luz de casa', author: 'Cuentacuentos · Piano: Alexander Holm (Salamander Grand Piano)', url: 'https://github.com/sfzinstruments/SalamanderGrandPiano', license: 'CC BY 3.0 (muestras de piano)', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' },
  { title: 'De tu lado', author: 'Cuentacuentos · Piano: Alexander Holm (Salamander Grand Piano)', url: 'https://github.com/sfzinstruments/SalamanderGrandPiano', license: 'CC BY 3.0 (muestras de piano)', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' },
].map(credit => Object.freeze({ license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', ...credit })));
