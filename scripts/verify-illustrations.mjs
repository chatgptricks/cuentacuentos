import assert from 'node:assert/strict';
import { CHARACTERS, SUPPORTING, VILLAINS, BOOKS, generateStory } from '../src/story-engine.js';
import { composePage } from '../src/page-composition.js';
import { CHARACTER_SCALES, characterScale } from '../src/illustration-scale.js';
import { getSceneEffect } from '../src/scene-effects.js';

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
for(const book of BOOKS){
 let scenery=0,pages=0;
 for(let i=0;i<20;i++) for(const page of generateStory(book.id,9,`illustration-${i}`).pages){
  const before=JSON.stringify(page),composition=composePage(page);
  assert.equal(JSON.stringify(page),before,'Presentation must not mutate saved stories');
  assert(composition.characters.every(id=>page.characters.includes(id)));
  assert(composition.objects.every(id=>page.objects.includes(id)));
  pages++;scenery+=Number(composition.showScene);
 }
 assert(scenery>0 && scenery<pages*.7,`${book.id}: varied narrative staging`);
}
console.log('Illustrations verified: relative species sizes, focused compositions, weather semantics and saved-story compatibility');
