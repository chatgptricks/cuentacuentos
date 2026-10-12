import assert from 'node:assert/strict';
import { CHARACTERS, SUPPORTING, VILLAINS, BOOKS, generateStory } from '../src/story-engine.js';
import { composePage } from '../src/page-composition.js';
import { CHARACTER_SCALES, characterScale } from '../src/illustration-scale.js';
import { getSceneEffect } from '../src/scene-effects.js';
import { getSceneViewIndex } from '../src/world-catalog.js';

for(const person of [...CHARACTERS,...SUPPORTING,...VILLAINS]) assert(Object.hasOwn(CHARACTER_SCALES,person.id),`${person.id}: explicit illustration scale`);
assert(characterScale('cricket') < characterScale('mouse') / 2);
assert(characterScale('ant') < characterScale('mouse') / 2);
assert(characterScale('mouse') < characterScale('rabbit'));
assert(characterScale('rabbit') < characterScale('bear'));
assert(characterScale({kind:'human',role:'baby'}) < characterScale({kind:'human',role:'child'}));
assert(characterScale({kind:'human',role:'child'}) < characterScale({kind:'human',role:'dad'}));
const market = {scene:'market',characters:['mouse','cricket'],objects:['birthday-cake','balloon'],paragraphs:['Fueron al mercado a buscar una tarta y globos.']};
assert.deepEqual(composePage(market),{kind:'shared',showScene:false,characters:['mouse','cricket'],objects:['birthday-cake','balloon']});
assert.equal(composePage({scene:'forest',characters:['mouse'],paragraphs:['Tino sonrió y respiró tranquilo.']}).kind,'portrait');
assert.equal(composePage({scene:'forest',characters:['mouse'],paragraphs:['El bosque tenía árboles muy altos.']}).showScene,true);
assert.equal(composePage({scene:'bedroom',characters:['family-child'],objects:['teddy-bear'],paragraphs:['Sam tenía un osito de peluche.']}).kind,'shared');
assert.equal(composePage({scene:'forest',characters:[],objects:['key'],paragraphs:['La llave brilló entre sus manos.']}).kind,'detail');
assert.equal(getSceneEffect('kitchen',0,['La lluvia golpeaba la ventana.']),'light','No rain indoors');
assert.equal(getSceneEffect('forest',0,['Una lluvia suave caía sobre el camino.']),'rain');
assert.equal(getSceneEffect('firefly-field'),'fireflies');
assert.equal(getSceneEffect('snowy-night-forest'),'snow');
assert.equal(getSceneEffect('swamp',1),'fog');
const composeStory = pages => pages.map((page,index) => composePage(page,{pages,index,previousScene:pages[index-1]?.scene}));
const sceneRatio = compositions => compositions.filter(composition=>composition.showScene).length/compositions.length;
const quietPages = Array.from({length:18},()=>({scene:'forest',characters:['mouse'],objects:[],paragraphs:['Tino sonrió y respiró tranquilo.']}));
const quietComposition = composeStory(quietPages);
assert(sceneRatio(quietComposition)>=.4 && sceneRatio(quietComposition)<=.6,'An emotional story must retain its setting and also have close-ups');
assert(quietComposition[0].showScene,'Introduce the opening place even when its first sentence is emotional');
const marketPages = quietPages.map(page=>structuredClone(page));
marketPages[5]=structuredClone(market);
assert.equal(composeStory(marketPages)[5].kind,'shared','The market shopping action stays focused on its characters and objects within a balanced story');

let stories=0,illustratedPages=0,minRatio=1,maxRatio=0;
for(const book of BOOKS) for(const duration of [3,6,9]) for(let i=0;i<60;i++){
 const story=generateStory(book.id,duration,`illustration-${duration}-${i}`);
 const before=JSON.stringify(story),compositions=composeStory(story.pages);
 const ratio=sceneRatio(compositions);
 assert(ratio>=.4 && ratio<=.6,`${book.id}/${duration}/${i}: each story needs 40–60% location pages (got ${(ratio*100).toFixed(1)}%)`);
 assert(compositions[0].showScene,`${book.id}/${duration}/${i}: show the opening place`);
 const shownPlaces=new Set(story.pages.filter((page,index)=>compositions[index].showScene).map(page=>page.scene));
 for(const scene of new Set(story.pages.map(page=>page.scene))){
  assert(shownPlaces.has(scene),`${book.id}/${duration}/${i}: preserve a visual introduction to ${scene}`);
  const frames=story.pages.flatMap((page,index)=>page.scene===scene && compositions[index].showScene?[getSceneViewIndex(story.pages,index)]:[]);
  if(frames.length>=3) assert(new Set(frames).size>=2,`${book.id}/${duration}/${i}: repeated visits to ${scene} must vary their painting view`);
 }
 for(const [index,composition] of compositions.entries()){
  const page=story.pages[index];
  const empty=!page.characters.length&&!page.objects.length;
  // Only a page with nothing of its own borrows the nearest cast already in the story.
  assert(composition.characters.every(id=>page.characters.includes(id)||(empty&&story.pages.some(other=>other.characters.includes(id)))));
  assert(composition.showScene||composition.characters.length||composition.objects.length,`${book.id}/${duration}/${i}: page ${index+1} needs an illustration`);
  assert(composition.objects.every(id=>page.objects.includes(id)));
 }
 assert.equal(JSON.stringify(story),before,'Presentation must not mutate saved stories');
 assert.deepEqual(composeStory(JSON.parse(before).pages),compositions,'Restoring a saved story preserves its illustration plan');
 const reverse=story.pages.map((_,index)=>index).reverse().map(index=>composePage(story.pages[index],{pages:story.pages,index})).reverse();
 assert.deepEqual(reverse,compositions,'Resuming at a later page or resizing cannot shift the illustration plan');
 minRatio=Math.min(minRatio,ratio);maxRatio=Math.max(maxRatio,ratio);
 stories++;illustratedPages+=story.pages.length;
}
console.log(`Illustrations verified: ${stories} stories / ${illustratedPages} pages, each with ${(minRatio*100).toFixed(1)}–${(maxRatio*100).toFixed(1)}% locations, all original places shown, focused actions, relative sizes, weather and saved-story compatibility`);
