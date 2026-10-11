/** Locally served excerpts; complete sources and edits are in docs/music-sources.md. */
export const MUSIC_TRACKS = Object.freeze({
  adventure: 'music-adventure.mp3',
  action: 'music-action.mp3',
  relax: 'music-relax.mp3',
  friends: 'music-friends.mp3',
  family: 'music-relax.mp3',
});

export const MUSIC_CREDITS = Object.freeze([
  { title: 'Castles in the Sky', author: 'Scott Buckley', url: 'https://www.scottbuckley.com.au/library/castles-in-the-sky/' },
  { title: 'Childhood', author: 'Scott Buckley', url: 'https://www.scottbuckley.com.au/library/childhood/' },
  { title: 'Reverie', author: 'Scott Buckley', url: 'https://www.scottbuckley.com.au/library/reverie/' },
  { title: 'Carefree', author: 'Kevin MacLeod (incompetech.com)', url: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037' },
].map(credit => Object.freeze({ ...credit, license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' })));
