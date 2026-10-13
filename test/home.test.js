const test=require('node:test');const assert=require('node:assert/strict');
const {filterTopics,verifiedCount}=require('../home');const {topicGroups,elements}=require('../app');
test('course search finds both languages and Polish names without diacritics',()=>{assert.equal(filterTopics(topicGroups,'gestosc')[0].id,'density');assert.equal(filterTopics(topicGroups,'элементы')[0].id,'elements');assert.equal(filterTopics(topicGroups,'missing').length,0);});
test('course filter preserves future topics and category boundaries',()=>{const topics=filterTopics(topicGroups,'','1');assert.equal(topics.length,2);assert.equal(topics.filter(t=>t.available).length,1);assert.ok(topics.every(t=>t.groupIndex===1));});
test('home progress counts only verified known element symbols',()=>{assert.equal(verifiedCount(elements,{Fe:{verified:true},Cu:{verified:false},fake:{verified:true}}),1);assert.equal(verifiedCount(elements,null),0);});
