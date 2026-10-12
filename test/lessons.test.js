const test=require('node:test');
const assert=require('node:assert/strict');
const {units,checkAnswer}=require('../lessons.js');
const {elements}=require('../app.js');
const {distractors}=require('../memory.js');

test('every bilingual mini-lesson has a rule, model and at least two valid checks',()=>{
  assert.equal(units.length,4);
  for(const unit of units){
    assert.equal(unit.title.length,2);assert.equal(unit.rule.length,2);assert.ok(unit.models.length);assert.ok(unit.questions.length>=2);
    for(const q of unit.questions){assert.equal(q.why.length,2);assert.ok(checkAnswer(q,q.answer));if(q.options)assert.ok(typeof q.answer==='number'?q.answer<q.options.length:q.options.includes(q.answer));}
  }
});
test('symbol correction distinguishes Cl from CL',()=>{
  const q=units[3].questions.find(q=>q.type==='input');
  assert.ok(checkAnswer(q,'Cl'));assert.equal(checkAnswer(q,'CL'),false);
});
test('distractors include the right answer and relevant confusing symbols without duplicates',()=>{
  const options=distractors(elements.find(e=>e.symbol==='Na'),elements);
  assert.equal(options.length,4);assert.equal(new Set(options.map(e=>e.symbol)).size,4);
  assert.ok(options.some(e=>e.symbol==='Na'));assert.ok(options.some(e=>e.symbol==='N'));
});
